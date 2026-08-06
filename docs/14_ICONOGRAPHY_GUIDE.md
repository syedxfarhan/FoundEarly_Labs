# 14 — Iconography Guide

**Owner:** Design System Architect / Principal Product Designer
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md` §7, `09_DESIGN_TOKENS.md` §8, `04_COMPONENT_SYSTEM.md`
**Status:** Official icon handbook. Icons are meaning carriers, never decoration.

---

## 1. Philosophy

Icons exist to accelerate recognition of actions, statuses, document types, and navigation destinations. An icon that does not reduce cognitive load — or that requires a legend to be understood and still adds no speed — should not exist on the screen.

**Hard rule:** Icons must never be decorative. If removing an icon does not reduce clarity or speed of recognition, remove it.

## 2. Primary Icon Library

**Decision: Lucide (or Lucide-compatible outline set) as the primary library.**

| Attribute | Spec |
|---|---|
| Style | Outline / stroke-based |
| Default stroke width | 1.5px at 24px canvas |
| Join / cap | Round joins, round caps |
| Optical grid | Designed on a 24×24 viewBox with consistent optical padding |

**Why Lucide (or equivalent):** consistent stroke language, broad coverage of enterprise UI metaphors, tree-shakeable, and visually quiet enough for dense dashboards. Alternatives considered: Phosphor (also acceptable if locked as the single primary — do not mix), Heroicons (slightly more marketing-flavored), Font Awesome (rejected — mixed styles and weight inconsistency across the set).

Once chosen in Phase 1 scaffolding, the library name is locked in `DECISIONS.md` and never mixed with another set on the same screen.

**Phase 1.1 lock:** Lucide (`lucide-react`) — see `DECISIONS.md` D-006.

## 3. Secondary Icon Library

**None, by default.** A secondary library creates the exact inconsistency this guide exists to prevent.

**Exception path:** If a construction-specific metaphor has no adequate representation in the primary library (e.g., a distinctive "pipe rack" or "rebar" glyph needed on a credibility surface), create a **custom SVG** under the rules in §4 — do not import a second icon pack for one glyph.

## 4. Custom SVG Strategy

Custom icons are rare, expensive, and permanent once shipped.

Rules:
1. Drawn on the same 24×24 viewBox as the primary library.
2. Stroke width 1.5px (or optical equivalent if the metaphor requires a filled mark — prefer stroke).
3. Corner radius and join style match the primary library.
4. Stored in `src/assets/icons/` (per `10_PROJECT_STRUCTURE.md`), named `icon-{semantic-name}.svg`.
5. Reviewed by the Design System Architect before merge.
6. Documented in this file's inventory appendix when first introduced (append a row: name, meaning, where used).

## 5. Stroke, Optical Balance, Corner Radius

| Property | Value | Why |
|---|---|---|
| Stroke width | 1.5px at `icon-lg` (24px), scaling proportionally | Matches Lucide defaults; thicker strokes muddy at small sizes; thinner strokes fail on projectors |
| Optical balance | Icons must look the same visual weight next to each other even if geometric bounds differ | Geometric centering ≠ optical centering; adjust viewBox padding per glyph if needed |
| Corner radius | Match library default (typically slight rounding) | Mixing sharp and soft corners in one toolbar reads as two different products |

## 6. Sizing & Padding

From `09_DESIGN_TOKENS.md` §8:

| Token | Size | Typical use |
|---|---|---|
| `icon-sm` | 16px | Inline with `text-body-sm` / `text-label`; table cell icons |
| `icon-md` | 20px | Default button icon; inline with `text-body` |
| `icon-lg` | 24px | Nav items; standalone UI icons |
| `icon-xl` | 32px | Empty states; credibility surface iconography only |

**Padding rule:** When an icon sits inside a hit target (`IconButton`), the visual icon may be `icon-md` / `icon-lg` but the hit area must still be ≥ 40×40px (`02_PRODUCT_DESIGN_MANUAL.md` §9).

**Gap to label:** `space-2` (8px) between icon and adjacent text label — never less, never a raw pixel value.

## 7. Alignment

- Icons inline with text align to the text's optical middle (flex `align-items: center`), not to the text baseline unless a rare typographic case requires it.
- In tables, status icons align consistently in a dedicated column — never free-floating mid-cell without a grid.
- Nav icons share a common left edge; labels share a common left edge one gap away.

## 8. Color Usage

| Context | Color rule |
|---|---|
| Default UI / nav icons | `neutral-600` (light) / corresponding dark-token equivalent |
| Active / selected nav | `brand-primary` |
| Status icons | Semantic token only (`semantic-info` / `success` / `warning` / `danger` / `neutral`) — never brand accent for status |
| Disabled | `neutral-400` |
| On primary buttons | Inherit inverse/on-brand text color |

**Never:** multi-color duotone icons in Phase 1, gradient fills on icons, or brand-accent (`brand-accent` brass) used as a status color.

## 9. Placement Rules by Context

### Navigation icons
Required for primary left-nav destinations. Always paired with a text label. Same icon for a destination everywhere it appears (Workspace Switcher, breadcrumbs if iconified, etc.).

### Dashboard icons
Used sparingly inside `KPIStat` trend indicators and section headers. Prefer semantic status icons over decorative "theme" icons (no crane icon on a budget KPI).

### Status icons
Mandatory companion to every `StatusChip` and status cell — color alone is forbidden (`02_PRODUCT_DESIGN_MANUAL.md` §9). Mapping of status → icon is defined once (implementation time) and reused everywhere.

### Action icons
Leading/trailing icons on `Button` / `IconButton` only when they accelerate recognition (e.g., export, filter, approve). Never more than one icon per side (`04_COMPONENT_SYSTEM.md` §3.1). Destructive actions may use a warning icon in the confirmation `Dialog`, not as decoration on the triggering button unless space-constrained.

### Analytics icons
Trend up / trend down / flat only — from the primary library. No ornamental chart icons.

### Document icons
Generic document / drawing / PDF metaphors from the primary library for registers. Discipline-specific drawing icons only if custom SVGs are approved (§4).

### AI icons
One consistent "assistant" glyph used by `AIResponsePanel` (`04_COMPONENT_SYSTEM.md` §3.20`). Never a sparkle/magic-wand cluster that reads as consumer AI chrome. Quiet, geometric, single-color.

### Workflow icons
Used in `Timeline` nodes for approval history — each node type (submitted, approved, rejected, commented) maps to one icon permanently.

## 10. When Icons Should NOT Be Used

- Next to every heading "for visual interest."
- As a substitute for a missing layout idea.
- In dense BOQ/financial tables where numerals already carry the meaning (except status columns).
- On narrative/credibility surfaces as industry decoration if they do not aid scanning.
- Animated icons that loop (contradicts `05_MOTION_SYSTEM.md` §1.3 — no idle/ambient animation).

## 11. Consistency Rules (Summary)

1. One primary library. No mixing.
2. One stroke width family. No mixing filled and outline except the documented active/inactive nav pattern (`02_PRODUCT_DESIGN_MANUAL.md` §7.2).
3. One icon per semantic meaning across the entire product.
4. Always paired with text for status and navigation.
5. Sized only via tokens.
6. Colored only via tokens.
7. Custom SVGs are exceptional and reviewed.
8. Decorative use is a review failure (`12_DESIGN_REVIEW_CHECKLIST.md` §4, §16).
