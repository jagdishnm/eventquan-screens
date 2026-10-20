import { D2Plays } from './D2Plays'
import { D3Crew } from './D3Crew'
import { D4OrderToSeat } from './D4OrderToSeat'
import { E2Posted } from './E2Posted'
import { E3EditSheet } from './E3EditSheet'
import { E4InviteeView } from './E4InviteeView'
import { F2Evening } from './F2Evening'
import { F3SheetPulled } from './F3SheetPulled'
import { F4ShapeStraw } from './F4ShapeStraw'
import type { FlowScreen } from './types'

/** Flow screens for explorations D–F. */
export const FLOWS_DEF: FlowScreen[] = [
  { id: 'D2', name: 'D2 · Plays', Component: D2Plays, dark: true },
  { id: 'D3', name: 'D3 · Your crew', Component: D3Crew, dark: true },
  { id: 'D4', name: 'D4 · Order to seat', Component: D4OrderToSeat, dark: true },
  { id: 'E2', name: 'E3 · Posted', Component: E2Posted },
  { id: 'E3', name: 'E2 · Edit sheet', Component: E3EditSheet },
  { id: 'E4', name: 'E4 · Invitee view', Component: E4InviteeView },
  { id: 'F2', name: 'F4 · 6:30 PM', Component: F2Evening },
  { id: 'F3', name: 'F2 · A sheet pulled out', Component: F3SheetPulled },
  { id: 'F4', name: 'F3 · Shape your straw', Component: F4ShapeStraw },
]
