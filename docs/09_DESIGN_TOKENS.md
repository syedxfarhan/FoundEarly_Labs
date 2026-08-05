# 09 — Design Token Specification

**Owner:** Design System Architect / Principal Product Designer
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md`, `05_MOTION_SYSTEM.md`
**Feeds into:** `07_IMPLEMENTATION_RULES.md` (Tailwind config generation), `04_COMPONENT_SYSTEM.md`

> Tokens are the only legal source of visual/motion values in this product (`07_IMPLEMENTATION_RULES.md` §7.1). This document is the canonical value table. Implementation must generate its theme config from these values, never invent parallel ones.

---

## 1. Color

### 1.1 Neutral scale (both themes derive surfaces/text from this ramp)

| Token | Light value | Dark value |
|---|---|---|
| `neutral-0` | `#FFFFFF` | `#0A0B0D` |
| `neutral-50` | `#F7F8F9` | `#121417` |
| `neutral-100` | `#EEF0F2` | `#181B1F` |
| `neutral-200` | `#E2E5E9` | `#232629` |
| `neutral-300` | `#CBD0D6` | `#2E3237` |
| `neutral-400` | `#9AA2AC` | `#4A4F56` |
| `neutral-500` | `#6B7280` | `#6B7280` |
| `neutral-600` | `#4B5261` | `#9AA2AC` |
| `neutral-700` | `#333A45` | `#C6CBD1` |
| `neutral-800` | `#1E232B` | `#E2E5E9` |
| `neutral-900` | `#0F1216` | `#F7F8F9` |

**Why a single neutral ramp reused across both themes (inverted), rather than two independently authored palettes:** independently authored dark/light palettes are the most common source of a design system where dark mode "feels different" instead of feeling like the same product — a mechanical inversion with a small number of manually-tuned midpoints guarantees visual parity.

### 1.2 Brand color

| Token | Value | Usage |
|---|---|---|
| `brand-primary` | `#0F4C5C` (deep teal-slate) | Primary actions, active nav state, key brand moments |
| `brand-primary-hover` | `#0C3E4B` | Hover state of the above |
| `brand-accent` | `#C08A3E` (muted brass/gold) | Rare, high-value emphasis only: hero highlight text, key stat callouts — never buttons/status |

**Why deep teal-slate, not a saturated "tech blue" or purple:** saturated blue/purple is the default palette of nearly every SaaS/AI startup (`02_PRODUCT_DESIGN_MANUAL.md` §1 anti-reference) — a deeper, desaturated, almost industrial teal reads as deliberate, serious, and distinct in a pitch room, while the brass accent nods (subtly, not literally) at the region without resorting to literal desert/gold clichés.

### 1.3 Semantic colors (status vocabulary mapping — see `06_COPY_GUIDELINES.md` §6)

| Token | Value (light) | Value (dark) | Maps to statuses |
|---|---|---|---|
| `semantic-neutral` | `neutral-500` | `neutral-500` | `Draft`, `Superseded`, generic |
| `semantic-info` | `#2563A6` | `#5B9BD9` | `Pending Response`, `Under Review`, `Pending Approval` |
| `semantic-success` | `#1E7B4D` | `#4CAF7D` | `Approved`, `On Track`, `Within Budget`, `Complete`, `Answered` |
| `semantic-warning` | `#B4791B` | `#D99A3D` | `At Risk`, `Watch`, `Approved with Comments`, `Pending Submission` |
| `semantic-danger` | `#B3261E` | `#E05A52` | `Overdue`, `Delayed`, `Over Budget`, `Rejected — Resubmit` |

**Rule:** these five semantic tokens are the *only* colors permitted to carry status meaning anywhere in the system. No component/screen introduces a sixth semantic hue — a sixth color immediately raises "what does this mean" ambiguity that the whole closed-vocabulary approach (`06_COPY_GUIDELINES.md` §6) exists to prevent.

## 2. Typography Tokens

Values as specified in `02_PRODUCT_DESIGN_MANUAL.md` §4, restated here as the canonical implementation table (rem, 16px root):

| Token | Font size | Line height | Weight | Letter spacing |
|---|---|---|---|---|
| `text-display` | 2.5rem | 2.75rem | 600 | -0.01em |
| `text-h1` | 2rem | 2.5rem | 600 | -0.01em |
| `text-h2` | 1.5rem | 2rem | 600 | 0 |
| `text-h3` | 1.125rem | 1.625rem | 600 | 0 |
| `text-body-lg` | 1rem | 1.5rem | 400 | 0 |
| `text-body` | 0.875rem | 1.25rem | 400 | 0 |
| `text-body-sm` | 0.8125rem | 1.125rem | 400 | 0 |
| `text-label` | 0.75rem | 1rem | 600 | 0.02em, uppercase transform |
| `text-numeric-lg` | 1.75rem | 2rem | 600 | 0, tabular-nums |
| `text-numeric` | 0.875rem | 1.25rem | 500 | 0, tabular-nums |

Font family tokens: `font-sans` (primary UI typeface, per `02_PRODUCT_DESIGN_MANUAL.md` §4), no `font-mono` token in Phase 1 (no use case per component spec) and no `font-display` (single-typeface rule, §4 rationale in the design manual).

## 3. Spacing Scale

| Token | Value |
|---|---|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-24` | 96px |
| `space-32` | 128px |

Matches `02_PRODUCT_DESIGN_MANUAL.md` §3 exactly. No intermediate values exist — a gap that doesn't fit this scale is a sign the layout needs rethinking, not a sign the scale needs a new entry.

## 4. Radius

| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 6px | Chips, badges, small controls |
| `radius-md` | 10px | Buttons, inputs, default control radius |
| `radius-lg` | 16px | Cards, dialogs, drawers |
| `radius-full` | 9999px | Avatars, pill-shaped chips |

**Why modest radii, not the very rounded "friendly SaaS" look:** sharper, smaller radii (6–16px) read as precise/technical; very large radii (24px+) read as consumer-app playful — this is a direct, deliberate application of `02_PRODUCT_DESIGN_MANUAL.md` §1's "quiet, confident" philosophy to a single, easily-overlooked variable.

## 5. Elevation (Shadow)

| Token | Value (light) | Usage |
|---|---|---|
| `elevation-0` | none | Flat/inline elements |
| `elevation-1` | `0 1px 2px rgba(15,18,22,0.06), 0 1px 1px rgba(15,18,22,0.04)` | Default card resting state |
| `elevation-2` | `0 4px 8px rgba(15,18,22,0.08), 0 1px 2px rgba(15,18,22,0.04)` | Card hover (`interactive` variant), dropdowns |
| `elevation-3` | `0 12px 24px rgba(15,18,22,0.12), 0 2px 4px rgba(15,18,22,0.06)` | Dialogs, drawers |

Dark mode uses the same shadow shapes with increased opacity (roughly 1.4×) and a slightly lighter ambient border (`neutral-300` at 8% opacity) layered underneath, since shadows alone read poorly against dark surfaces — this is a standard, deliberate dark-mode-specific adjustment, not a bug in the light-mode values.

## 6. Grid & Breakpoints

| Token | Value | Notes |
|---|---|---|
| `breakpoint-sm` | 640px | Minimum supported — "must not be broken," per `01_PROJECT_SSOT.md` §8.4 |
| `breakpoint-md` | 1024px | Tablet landscape — first-class presentation device |
| `breakpoint-lg` | 1440px | Primary target — presenter laptop |
| `breakpoint-xl` | 1920px | Large external display / projector |
| `grid-columns` | 12 | Per `02_PRODUCT_DESIGN_MANUAL.md` §5 |
| `grid-gutter` | `space-6` (24px) | |
| `content-max-width` | 1280px | Narrative/credibility surfaces only; workspaces are fluid within the shell |
| `sidebar-width` | 280px | Fixed, per `02_PRODUCT_DESIGN_MANUAL.md` §5 |

## 7. Motion Tokens

Restated from `05_MOTION_SYSTEM.md` §2–3 as the canonical implementation values:

| Token | Value |
|---|---|
| `motion-instant` | 0ms |
| `motion-fast` | 120ms |
| `motion-base` | 200ms |
| `motion-moderate` | 320ms |
| `motion-slow` | 450ms |
| `motion-deliberate` | 600–800ms (sequence budget) |
| `ease-enter` | `cubic-bezier(0.2, 0, 0, 1)` |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` |

`prefers-reduced-motion` resolution: all tokens above `motion-fast` collapse to `motion-fast` (or `motion-instant` for pure positional offsets), per `05_MOTION_SYSTEM.md` §10 — implemented as a single resolver function consuming these tokens, never per-component conditionals.

## 8. Icon Sizing

| Token | Value | Usage |
|---|---|---|
| `icon-sm` | 16px | Inline with `text-body-sm`/`text-label`, table cell icons |
| `icon-md` | 20px | Inline with `text-body`, default button icon |
| `icon-lg` | 24px | Standalone icons, nav items |
| `icon-xl` | 32px | Empty states, credibility surface iconography |

Stroke width fixed at `1.5px` at the `icon-lg` base size, scaling proportionally — never mixed stroke weights within one screen (`02_PRODUCT_DESIGN_MANUAL.md` §7).

## 9. Table & Dashboard-Specific Spacing

Because tables and dashboards are first-class, high-stakes surfaces (`02_PRODUCT_DESIGN_MANUAL.md` §10.7), they get dedicated spacing tokens rather than reusing generic component padding, to keep density decisions explicit and centrally tunable:

| Token | Value | Usage |
|---|---|---|
| `table-row-height-default` | 44px | `DataTable` `default` variant |
| `table-row-height-dense` | 36px | `DataTable` `dense` variant (long logs) |
| `table-cell-padding-x` | `space-4` (16px) | |
| `table-cell-padding-y-default` | `space-3` (12px) | |
| `table-cell-padding-y-dense` | `space-2` (8px) | |
| `dashboard-card-padding` | `space-6` (24px) | Standard `Card`/`KPIStat` internal padding |
| `dashboard-section-gap` | `space-12` (48px) | Vertical gap between dashboard sections |
| `dashboard-card-gap` | `space-6` (24px) | Gap between cards within a KPI row/grid |

## 10. Semantic Color Usage Contract

This restates §1.3 as a strict contract for implementers: a semantic token's color value may change between light/dark themes, but its **meaning** (which status maps to it, per `06_COPY_GUIDELINES.md` §6) never changes, and no component may apply a semantic token to anything other than the workflow-status meaning it's assigned. Brand tokens (§1.2) are never used for status; semantic tokens are never used for pure brand decoration. This separation is what keeps "why is this button teal but that badge is also teal" from ever becoming an ambiguous question.

## 11. Dark Mode & Light Mode

- **Light mode is the default and primary mode for live presentations** — it reads better on a shared laptop screen or projector in a typical daylight meeting room, and matches the "printed report" mental model this audience already trusts (BOQs, RFI logs are traditionally paper/PDF-based).
- **Dark mode is a fully supported, equally polished second mode**, useful for lower-light settings and for signaling technical sophistication to a more technical stakeholder in the room (an engineering consultant is more likely to expect and appreciate a well-executed dark mode) — it is not an afterthought or a simple CSS filter inversion; every token in this document has an explicit dark value or an explicit derivation rule (§1.1, §5).
- **The two modes never mix on screen.** No component hardcodes a light-only or dark-only value that ignores the active theme — enforced by the Tailwind/token generation pipeline (`07_IMPLEMENTATION_RULES.md` §7.1) making raw hex values unavailable to component code entirely.

## 12. RTL Considerations

Per `01_PROJECT_SSOT.md` Goal G7 and `06_COPY_GUIDELINES.md` §11, tokens must not encode directional assumptions that block a future Arabic/RTL pass:

1. **No `left`/`right` token names.** Directional spacing/position tokens use logical naming (`inline-start`, `inline-end`, `block-start`, `block-end`) at the implementation layer (CSS logical properties), even though Phase 1 ships LTR-only — retrofitting this naming later would touch every component, whereas adopting it now costs nothing extra today.
2. **Icons that imply direction** (e.g., a "next/forward" chevron) must be defined as a semantic icon (`icon-direction-forward`) resolved to the correct visual glyph per text direction, never hardcoded to a specific rotation in component code.
3. **The 12-column grid and spacing scale are direction-agnostic by construction** — no token in this document has an inherent "left-ness," which is exactly why this section can stay short: the real RTL work is a components/implementation-layer concern (`04_COMPONENT_SYSTEM.md`, `07_IMPLEMENTATION_RULES.md`), and this token layer already avoids blocking it.
