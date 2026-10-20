# EventQuan screens

## UI building blocks
Before building or changing UI, reuse what exists:
- **Tokens** live in `src/index.css` (`@theme`): colors (skin, status, tile tints, avatars), the type scale (`text-tab` → `text-headline`, then `text-display-sm|md|lg|xl` at 26/30/34/52px for large type), radii (`rounded-tag` → `rounded-sheet`), elevation (`shadow-raised|floating|overlay|control`), letter spacing and durations. Don't add raw hex, px font sizes or radii in screens; add a token if something is genuinely missing.
- **Components** live in `src/components/`: `Button` (primary/secondary/tonal, one gold primary per screen), `Badge` (live/going/soon/node/neutral/brand), `Chip`, `SwitchRow`, `Sheet`, `Timeline`, `Tile`, `EventCard`/`EventRow`, `Avatar`/`Faces`, `Eyebrow`, `IconButton`, `SectionHeader`, `TabBar`, `StatusBar`.
- Keep accessibility intact: 44pt tap areas, `aria-pressed` on toggles, no buttons nested in links (use `Button as="span"`), and the two-tone focus ring from `index.css`.
