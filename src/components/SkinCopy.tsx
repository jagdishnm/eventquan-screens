import { useLayoutEffect, type RefObject } from 'react'
import type { Phrases } from '../data/skins/lsu'

/** Attributes that carry readable copy. `value` covers the static attribute; the live input value is handled separately. */
const ATTRS = ['aria-label', 'alt', 'placeholder', 'title', 'value'] as const

/** A subtree that renders its own skin-aware copy (the team marks) opts out with `translate="no"`. */
const OPT_OUT = '[translate="no"]'

/** Private-use characters stand in for matches between the two phases; they never occur in copy. */
const MARK = ''
const FIRST_SLOT = 0xe100

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const isWordChar = (c: string) => /[A-Za-z0-9]/.test(c)

/** Every spelling of an entry: as written, with the other apostrophe, and in upper case. */
function variants([from, to]: readonly [string, string]): [string, string][] {
  const out: [string, string][] = [[from, to]]
  if (/['’]/.test(from)) {
    out.push([from.replaceAll('’', "'"), to.replaceAll('’', "'")])
    out.push([from.replaceAll("'", '’'), to.replaceAll("'", '’')])
  }
  for (const [f, t] of [...out]) if (f.toUpperCase() !== f) out.push([f.toUpperCase(), t.toUpperCase()])
  return out
}

type Localize = (s: string) => string

/** Compiles a phrase map into a function: longest phrase first, whole words only, in two phases. */
function compile(phrases: Phrases): Localize {
  const map = new Map<string, string>()
  for (const entry of phrases) for (const [f, t] of variants(entry)) if (!map.has(f)) map.set(f, t)
  const entries = [...map].sort((a, b) => b[0].length - a[0].length)
  const rules = entries.map(([from, to], i) => {
    const head = isWordChar(from[0]) ? '(?<![A-Za-z0-9])' : ''
    const tail = isWordChar(from[from.length - 1]) ? '(?![A-Za-z0-9])' : ''
    return { from, re: new RegExp(head + escape(from) + tail, 'g'), slot: MARK + String.fromCharCode(FIRST_SLOT + i), to }
  })
  // One cheap test first: most text nodes contain none of the phrases.
  const any = new RegExp(entries.map(([f]) => escape(f)).join('|'))
  const back = new RegExp(`${MARK}([\\s\\S])`, 'g')
  return (s) => {
    if (!s || !any.test(s)) return s
    let out = s
    // Phase one: each match becomes a placeholder, so no later (shorter) phrase can match inside it.
    for (const r of rules) if (out.includes(r.from)) out = out.replace(r.re, r.slot)
    // Phase two: placeholders become the skin's wording.
    return out.replace(back, (_, c: string) => rules[c.charCodeAt(0) - FIRST_SLOT].to)
  }
}

const compiled = new WeakMap<Phrases, Localize>()
const localizerFor = (phrases: Phrases) => {
  let fn = compiled.get(phrases)
  if (!fn) compiled.set(phrases, (fn = compile(phrases)))
  return fn
}

/**
 * Rewrites the copy under `root` into a skin's wording, in place: text nodes get a new `nodeValue`
 * and attributes a new value, so React keeps owning every node. It runs in a layout effect, before
 * the first paint, and a MutationObserver keeps whatever React renders later in the skin's wording.
 * On unmount (or a switch back to Texas A&M) the original copy is put back.
 */
export function SkinCopy({ root, phrases }: { root: RefObject<HTMLElement | null>; phrases: Phrases }) {
  useLayoutEffect(() => {
    const el = root.current
    // A skin frame inside another one is already covered by the outer frame's pass.
    if (!el || el.parentElement?.closest('[data-skin-copy]')) return
    const localize = localizerFor(phrases)

    /** What we wrote, keyed by node, with the original to restore. */
    const texts = new Map<Text, { orig: string; out: string }>()
    const attrs = new Map<Element, Map<string, { orig: string; out: string }>>()
    const inputs = new Map<HTMLInputElement | HTMLTextAreaElement, { orig: string; out: string }>()

    const optedOut = (n: Node) => {
      const e = n.nodeType === Node.ELEMENT_NODE ? (n as Element) : n.parentElement
      return !e || e.closest(OPT_OUT) !== null || e.closest('script,style') !== null
    }

    /**
     * A node's source copy: what React wrote. If the node still shows what we wrote, that is the
     * original we stored; `fresh` means a mutation record says React just wrote it, even if it
     * happens to equal our earlier output. Rewriting from the source makes every pass idempotent.
     */
    const source = (t: Text, fresh: boolean) => {
      const done = texts.get(t)
      return !fresh && done && done.out === t.nodeValue ? done.orig : (t.nodeValue ?? '')
    }
    const write = (t: Text, orig: string, out: string) => {
      if (out === orig) texts.delete(t)
      else texts.set(t, { orig, out })
      if (t.nodeValue !== out) t.nodeValue = out
    }

    /**
     * Rewrites one text node. JSX like `of {total} hours` renders as sibling text nodes ("of ",
     * "90", " hours"), so when an element holds only text, its text is matched as one string; if
     * that finds a phrase the single nodes miss, the result goes in the first node and the rest
     * are emptied.
     */
    const text = (t: Text, fresh: ReadonlySet<Text>, seen: Set<Node>) => {
      const p = t.parentElement
      if (!p || seen.has(p) || seen.has(t) || optedOut(t)) return
      const kids = [...p.childNodes]
      if (kids.length > 1 && kids.every((k) => k.nodeType === Node.TEXT_NODE)) {
        seen.add(p)
        const nodes = kids as Text[]
        const origs = nodes.map((k) => source(k, fresh.has(k)))
        const parts = origs.map(localize)
        const whole = localize(origs.join(''))
        if (whole === parts.join('')) nodes.forEach((k, i) => write(k, origs[i], parts[i]))
        else nodes.forEach((k, i) => write(k, origs[i], i === 0 ? whole : ''))
        return
      }
      seen.add(t)
      const orig = source(t, fresh.has(t))
      write(t, orig, localize(orig))
    }

    const attr = (e: Element, name: string, force: boolean) => {
      const v = e.getAttribute(name)
      if (v == null) return
      const done = attrs.get(e)?.get(name)
      if (!force && done && done.out === v) return
      if (optedOut(e)) return
      const out = localize(v)
      if (out === v) return
      let m = attrs.get(e)
      if (!m) attrs.set(e, (m = new Map()))
      m.set(name, { orig: v, out })
      e.setAttribute(name, out)
    }

    /** Live input values aren't attributes, so they're checked on every pass; a field being typed in is left alone. */
    const fields = () => {
      for (const f of el.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea')) {
        if (f === document.activeElement || inputs.get(f)?.out === f.value || optedOut(f)) continue
        const out = localize(f.value)
        if (out === f.value) continue
        inputs.set(f, { orig: f.value, out })
        f.value = out
      }
    }

    const NONE: ReadonlySet<Text> = new Set()
    const ATTR_SELECTOR = ATTRS.map((a) => `[${a}]`).join(',')
    const subtree = (n: Node, seen: Set<Node>) => {
      if (n.nodeType === Node.TEXT_NODE) return text(n as Text, NONE, seen)
      if (n.nodeType !== Node.ELEMENT_NODE) return
      const e = n as Element
      for (const a of ATTRS) if (e.hasAttribute(a)) attr(e, a, false)
      for (const c of e.querySelectorAll(ATTR_SELECTOR)) for (const a of ATTRS) attr(c, a, false)
      const walk = document.createTreeWalker(e, NodeFilter.SHOW_TEXT)
      for (let t = walk.nextNode(); t; t = walk.nextNode()) text(t as Text, NONE, seen)
    }

    // First pass, before paint.
    subtree(el, new Set())
    fields()

    let busy = false
    let passes = 0
    let resetQueued = false
    const observer = new MutationObserver((records) => {
      if (busy) return
      // A runaway loop (something fighting the rewrite) stops after 200 passes in one task.
      if (++passes > 200) {
        observer.disconnect()
        console.warn('SkinCopy: stopped after repeated rewrites in one task')
        return
      }
      if (!resetQueued) {
        resetQueued = true
        setTimeout(() => ((passes = 0), (resetQueued = false)))
      }
      busy = true
      try {
        // Each changed node once: React's new value is the source, so it is rewritten even if it
        // happens to equal what we wrote before.
        const fresh = new Set<Text>()
        const changedAttr = new Map<Element, Set<string>>()
        const added: Node[] = []
        for (const r of records) {
          if (r.type === 'characterData') fresh.add(r.target as Text)
          else if (r.type === 'attributes' && r.attributeName) {
            const s = changedAttr.get(r.target as Element) ?? new Set<string>()
            changedAttr.set(r.target as Element, s.add(r.attributeName))
          } else {
            added.push(...r.addedNodes)
            // A text-only element that lost or gained a node is matched again as a whole.
            for (const k of r.target.childNodes) if (k.nodeType === Node.TEXT_NODE) added.push(k)
          }
        }
        const seen = new Set<Node>()
        for (const t of fresh) text(t, fresh, seen)
        for (const [e, names] of changedAttr) for (const a of names) attr(e, a, true)
        // Added nodes may be moved ones we already rewrote; `source` recognises those by our output.
        for (const n of added) subtree(n, seen)
        fields()
      } finally {
        // Our own writes queued records too; drop them so they never come back as React's.
        observer.takeRecords()
        busy = false
      }
      if (texts.size > 4000) for (const t of texts.keys()) if (!t.isConnected) texts.delete(t)
    })
    observer.observe(el, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRS],
    })

    return () => {
      observer.disconnect()
      for (const [t, { orig, out }] of texts) if (t.nodeValue === out) t.nodeValue = orig
      for (const [e, m] of attrs) for (const [a, { orig, out }] of m) if (e.getAttribute(a) === out) e.setAttribute(a, orig)
      for (const [f, { orig, out }] of inputs) if (f.value === out) f.value = orig
    }
  }, [root, phrases])

  return null
}
