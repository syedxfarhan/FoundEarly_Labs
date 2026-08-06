# 04 — Component System Specification

**Owner:** Design System Architect / Staff Frontend Engineer
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md`, `09_DESIGN_TOKENS.md`
**Status:** Specification only. **No implementation in Phase 0.**

> This document specifies every reusable component the design system needs for Phase 1. It defines contracts (props/variants/states), not code. When Phase 1 implementation begins, each component here becomes a ticket; the spec is the acceptance criteria.

---

## 1. Naming Conventions

- **Component names are PascalCase, noun-based, and unprefixed** (`Button`, `StatusChip`, `DataTable`) — no `Fe` or `App` prefix. A prefix is only useful when a design system might collide with another library in the same codebase; this system is the only one, so a prefix is pure noise.
- **Variant names are lowercase, hyphen-free, single-word where possible** (`primary`, `secondary`, `ghost`, `danger`) — consistent across every component that has that variant concept (a `primary` Button and a `primary` Badge mean "same visual weight tier," not unrelated concepts).
- **Boolean props are affirmative, not negated** (`disabled`, not `notEnabled`; `loading`, not `notReady`).
- **Compound components use dot-notation naming in usage, not in the spec file names**: e.g., `Table` composes with `Table.Row`, `Table.Cell` — documented under the parent component's section, not as separate top-level entries.
- **Every component name used here is a reservation.** Once specified, that name is locked; if implementation needs a materially different shape, the spec must be updated first (per `02_PRODUCT_DESIGN_MANUAL.md` §12.1), not silently renamed in code.

## 2. Composition Rules

1. **Primitives compose into patterns; patterns never reimplement primitives.** A `Card` never hand-rolls its own button styling — it composes `Button`. This is the mechanism that guarantees system-wide consistency without manual policing.
2. **No component reaches outside its own props for styling context**, except documented theme tokens (`09_DESIGN_TOKENS.md`) and layout props explicitly defined below. A component must render correctly in isolation, in a Storybook-equivalent environment, with only its documented props.
3. **Every component that displays a status must consume the shared status vocabulary** defined in §6 of `06_COPY_GUIDELINES.md` and the semantic color tokens in `09_DESIGN_TOKENS.md` — never an ad hoc color/label pairing invented at the call site.
4. **Layout components (`Stack`, `Grid`, `Cluster`) own spacing between children; content components never add their own external margin.** This single rule prevents the most common design-system rot pattern: spacing drift from components adding "just a little margin" locally.

## 3. Component Inventory

Organized by tier, per `10_PROJECT_STRUCTURE.md` ownership model (Primitives → Patterns → Features).

### TIER 1 — Primitives

#### 3.1 `Button`
- **Purpose:** Every clickable action in the system.
- **Variants:** `primary` (one per screen, per `02_PRODUCT_DESIGN_MANUAL.md` §2.3), `secondary`, `ghost`, `danger`, `link`.
- **Sizes:** `sm` (32px height), `md` (40px, default), `lg` (48px, used only on credibility/narrative surfaces).
- **States:** `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading` (shows inline spinner, label remains visible but dimmed, control is non-interactive).
- **Composition:** optional leading/trailing icon slot (from the shared icon set per `14_ICONOGRAPHY_GUIDE.md` and `02_PRODUCT_DESIGN_MANUAL.md` §7); never more than one icon per side.
- **Accessibility:** minimum 40×40 hit area even at `sm` size via padding, not visual size, to satisfy `02_PRODUCT_DESIGN_MANUAL.md` §9 touch target rule; `aria-busy` when `loading`.
- **Usage rule:** `danger` variant requires a confirmation step (via `Dialog`, §3.9) before the destructive action fires — no single-click destructive actions anywhere in the system, because an accidental destructive click during a live demo is unrecoverable in the room.

#### 3.2 `IconButton`
- Same variant/size/state matrix as `Button`, icon-only, always requires an `aria-label` prop (enforced at the type level, not optional) — icon-only controls are otherwise an accessibility failure mode that's easy to forget.

#### 3.3 `Input` (text)
- **Variants:** `default`, `with-leading-icon`, `with-trailing-action` (e.g., clear button).
- **States:** `default`, `focus`, `filled`, `disabled`, `error`, `read-only`.
- **Error state:** always paired with inline helper text below the field (never a tooltip-only error — tooltips are easy to miss and this is a data-entry-heavy product).
- **Note:** given `01_PROJECT_SSOT.md` §8 (no real backend), most Phase 1 usage is inside illustrative forms (e.g., Discovery Simulator context capture uses `Select`/`ChipSelect`, not free `Input`, per `03_INFORMATION_ARCHITECTURE.md` §5.3) — `Input` is still fully specified for Phase 2 workspace features (e.g., search, RFI drafting).

#### 3.4 `Select` / `ChipSelect`
- `Select`: standard dropdown, single-select, keyboard-navigable, searchable variant for long option lists (e.g., city selection from `08_DEMO_DATA_GUIDE.md`).
- `ChipSelect`: a row of tappable chips representing mutually exclusive or multi-select options — the primary input pattern for the Discovery Simulator's Step 0 (per IA §5.3), because chip-tap is faster and more theatrical on stage than opening a dropdown.

#### 3.5 `Badge` / `StatusChip`
- `Badge`: neutral labeling (counts, categories) — variants `neutral`, `info`, following semantic token tiers only (no arbitrary colors).
- `StatusChip`: workflow status specifically — always renders icon + label + semantic color together (never color alone, per design manual §9). Its allowed label set is sourced from `06_COPY_GUIDELINES.md` §6 status vocabulary — this is a closed enum, not free text, to guarantee consistency across every table/workspace that shows status.

#### 3.6 `Avatar` / `AvatarGroup`
- `Avatar`: initials-based by default (no fictional headshots — see `08_DEMO_DATA_GUIDE.md` rationale on avoiding stock-photo uncanny valley for fictional employees), photo slot supported for future real-team-member usage (e.g., an "About the Team" surface in a later phase).
- `AvatarGroup`: overlapping stack with a `+N` overflow indicator, used for project team rosters.

#### 3.7 `Tooltip`
- Hover/focus-triggered, never the sole carrier of critical information (supplements, never replaces, visible text per design manual §9).

#### 3.8 `Skeleton`
- Used only where an intentional async simulation exists (`03_INFORMATION_ARCHITECTURE.md` §4, the AI Moment step) — never used to paper over real unhandled loading, since Phase 1 has no real network latency to mask.

### TIER 2 — Patterns

#### 3.9 `Dialog` / `Drawer`
- `Dialog`: centered, modal, used for confirmations and focused single-task flows (e.g., confirming a destructive action per §3.1).
- `Drawer`: right-anchored, non-modal-feeling contextual detail (e.g., "view RFI detail" without leaving the log table) — preferred over `Dialog` whenever the user should retain a sense of place in the underlying list (a construction PM reviewing a log expects to return to the same scroll position, not lose context).
- **Rule:** never stack a `Dialog` on top of another `Dialog`. If a nested decision is needed, redesign the flow — this is a UX smell, not a component limitation to solve technically.

#### 3.10 `Card`
- The primary content container (`02_PRODUCT_DESIGN_MANUAL.md` §6.2). Variants: `default`, `interactive` (hover elevation + cursor pointer, used when the whole card navigates somewhere), `kpi` (specialized internal layout for a headline number + trend + label — see `3.14 KPIStat`).
- **Rule:** a `Card` never contains another `Card` (no nested cards). Sub-groupings inside a card use `Divider` or spacing, not nested containers — nested cards are a common but wrong pattern that muddies visual hierarchy.

#### 3.11 `DataTable`
The single most important component in the system, per `02_PRODUCT_DESIGN_MANUAL.md` §10.7.

- **Composition:** `Table.Header`, `Table.Row`, `Table.Cell`, `Table.SortableHeaderCell`.
- **Variants:** `default` (comfortable, 44px row height), `dense` (36px row height, used for long logs like RFI registers).
- **Features (Phase 1 required):** column sort, sticky header on scroll, right-aligned numeric/currency columns with tabular figures (per design manual §4), row-level status via `StatusChip`, empty-state slot (per design manual §2.6).
- **Features (Phase 2, specified now to avoid rework):** column filtering, row selection with bulk actions, expandable row detail.
- **Accessibility:** full `role="table"` semantics, sortable headers exposed via `aria-sort`, keyboard-navigable row focus.
- **Data rule:** every numeric column must declare its unit/format explicitly via column config (currency, percentage, date, count) — the component, not the caller, is responsible for applying the correct format per `09_DESIGN_TOKENS.md`, which is precisely what prevents the "inconsistent formatting" failure mode called out in the design manual as a P0 bug class.

#### 3.12 `Tabs`
- In-page secondary navigation only (per `03_INFORMATION_ARCHITECTURE.md` §4 — never a substitute for real navigation levels). Underline style, not boxed/pill style, to keep visual weight subordinate to the left nav.

#### 3.13 `Timeline`
- Vertical, used for project milestone history, approval-chain visualization (design manual §10.6), and RFI status history. Each node: icon + label + timestamp (`DD MMM YYYY`, per design manual §10.2) + optional actor (`Avatar`).

#### 3.14 `KPIStat`
- Headline numeric figure (`numeric-lg` type token) + trend indicator (up/down/flat, semantic color + icon, never color alone) + label + optional sparkline slot. The Overview section of the Project Command Dashboard (`03_INFORMATION_ARCHITECTURE.md` §3.1) is built primarily from a grid of these.

#### 3.15 `ProgressBar` / `ProgressRing`
- Used for schedule/budget completion visualization. Always paired with a numeric label (`68% complete`) — never a bare bar, since precise numbers matter more to this audience than abstract visualization (design manual §1).

#### 3.16 `EmptyState`
- Icon/illustration slot (generic UI icon only, per design manual §7.4) + heading + supporting copy + optional action button. Every list/table component must accept an `EmptyState` override rather than silently rendering nothing.

#### 3.17 `Toast` / `InlineAlert`
- `Toast`: transient, non-blocking system feedback (bottom-anchored, auto-dismiss, per `05_MOTION_SYSTEM.md` timing).
- `InlineAlert`: persistent, contextual messaging embedded in page flow (e.g., "This capability is illustrative in this build" — the Presentation Mode boundary messaging referenced in `03_INFORMATION_ARCHITECTURE.md` §6/§7). Variants: `info`, `success`, `warning`, `danger`, mapped to semantic tokens.

### TIER 3 — Feature Composites (Phase 1 scope, specified at a high level; detailed specs are written per-feature when that feature's ticket is opened)

#### 3.18 `WorkspaceShell`
- The persistent shell described in `03_INFORMATION_ARCHITECTURE.md` §3 — top bar + left nav + main canvas + optional side panel. Owns the Presentation Mode display state (`03_INFORMATION_ARCHITECTURE.md` §6) as a single source of truth so no page has to independently implement "quiet chrome" behavior.

#### 3.19 `SimulatorStepFrame`
- The wrapper every Discovery Simulator step (`03_INFORMATION_ARCHITECTURE.md` §5) renders inside — owns the persistent rep controls (Next/Back/Skip/Restart, per IA §5.4) so individual step content never has to reimplement navigation.

#### 3.20 `AIResponsePanel`
- The visual/interaction pattern for the AI Moment step (IA §5.2 Step 4) — a constrained-input control (buttons/chips, not free text, per IA §5.3 rationale extended to this feature) plus a response surface that always renders through the `06_COPY_GUIDELINES.md` §8 AI voice rules, including a persistent "illustrative AI response" micro-label to preserve the transparency principle from IA §7.

## 4. Variant Composition Rule Summary

| Concept | Governs | Allowed values (closed set) |
|---|---|---|
| Emphasis tier | `Button`, `Badge` weight | `primary`, `secondary`, `ghost`, `danger`, `link` |
| Semantic intent | `StatusChip`, `InlineAlert`, `Toast` | `neutral`, `info`, `success`, `warning`, `danger` (maps 1:1 to `09_DESIGN_TOKENS.md` semantic colors) |
| Density | `DataTable`, list layouts | `default`, `dense` |
| Size | `Button`, `IconButton`, `Avatar` | `sm`, `md`, `lg` |

No component may introduce a variant name outside a relevant closed set above without a spec update — this is what keeps "primary" meaning the same thing everywhere in the product.

## 5. States Matrix (Applies to All Interactive Components Unless Noted)

Every interactive component must define behavior for: `default`, `hover`, `focus-visible`, `active/pressed`, `disabled`, `loading` (if it performs async work), `error` (if it can fail), and `read-only` (if it can be non-editable but visible). A component spec is incomplete if any applicable state is undefined — this is checked in the design review process (`02_PRODUCT_DESIGN_MANUAL.md` §12).

## 6. Accessibility Requirements (Component-Level, Supplementing Design Manual §9)

- Every component's interactive root is a real semantic element or carries the correct ARIA role — never a bare `div` with a click handler.
- Every form-adjacent component (`Input`, `Select`, `ChipSelect`) has a programmatically associated label — no placeholder-as-label pattern.
- Every component exposes a documented `aria-label`/`aria-describedby` escape hatch for cases the default semantics don't cover.

## 7. Interaction Rules (Cross-Component)

1. **Hover is a hint, not a requirement.** Every hover-revealed action must have an equivalent always-visible or keyboard-reachable path — this product will be used on touch devices (tablets) where hover doesn't exist.
2. **Double interaction guard.** Any action that triggers navigation or mutation must debounce/disable itself for the duration of its own transition, so a nervous rep double-clicking doesn't trigger a state twice.
3. **Escape always closes the topmost overlay** (`Dialog`, `Drawer`, `Tooltip`) and never navigates away from the underlying page — consistent, predictable "undo my last action" behavior across the whole system.
4. **Consistent iconography per action across all components** (e.g., the same "edit" icon everywhere `Button`/`IconButton`/table row actions expose an edit affordance) — defined once as a mapping table when implementation begins, not decided per call site.

## 8. Explicit Non-Goals for This Document

This document does not specify pixel-level visual styling (colors, exact spacing values) — that is `09_DESIGN_TOKENS.md`'s job — nor does it contain implementation code, prop TypeScript signatures, or file locations — that is `07_IMPLEMENTATION_RULES.md`'s and `10_PROJECT_STRUCTURE.md`'s job. This document is the contract those two layers must satisfy.
