# 02 — Product Design Manual

**Owner:** Principal Product Designer / Design System Architect / UX Director
**Depends on:** `01_PROJECT_SSOT.md`
**Feeds into:** `04_COMPONENT_SYSTEM.md`, `05_MOTION_SYSTEM.md`, `09_DESIGN_TOKENS.md`

> This is the design constitution. It is opinionated on purpose. Where a rule below feels restrictive, that is intentional — restriction is what makes a large, multi-contributor UI look like it came from one hand.

---

## 1. Visual Philosophy

**"Enterprise-grade, not enterprise-boring."** We are designing for an audience that already trusts dense, serious tools (Primavera P6, SAP, Aconex) but has never seen one that is also *beautiful*. The opportunity is to be the first vendor in the room whose software looks like it was designed, not merely built. That differentiation comes from craft in restraint — precise spacing, real typographic hierarchy, purposeful color, calm motion — not from decoration.

Three words govern every visual decision, in priority order:

1. **Precise** — everything aligns to a grid, every number is formatted consistently, nothing is "close enough."
2. **Quiet** — color, motion, and ornamentation are used sparingly and only to carry meaning (status, priority, action), never for decoration.
3. **Confident** — generous whitespace, strong hierarchy, no defensive clutter (no unnecessary borders/shadows "just in case," no tooltip-everything).

**Anti-references (what we are explicitly not):** consumer SaaS marketing sites (oversized gradients, blob shapes, playful illustration), AI-startup "glassmorphism + purple gradient" aesthetic (instantly reads as templated and disposable to a technical buyer), and legacy enterprise UI (dense, ugly, low-contrast, Windows-95-descended tables). We are the calm, precise middle: think Linear, Vercel, Stripe Dashboard, and Palantir Foundry as the aesthetic register — applied to a construction-industry vocabulary.

## 2. Enterprise UX Rules

1. **Never make the user (or the rep) guess system state.** Every async action has a visible loading, success, or error state defined before it ships (see `04_COMPONENT_SYSTEM.md` States sections). "It probably worked" is a defect in a live sales context.
2. **Density is earned, not accidental.** Enterprise density (more information per screen than a consumer app) is desirable *only* when hierarchy and spacing remain impeccable. Dense-and-messy reads as amateur; dense-and-precise reads as powerful. Every dense screen must pass the Quality Checklist (§9) before merge.
3. **Primary action clarity.** Every screen has exactly one primary action, visually distinct (per `09_DESIGN_TOKENS.md` semantic color rules), and it must be the action the narrative wants the client to take next.
4. **No dead ends.** Every screen must have an obvious way forward (next step in the narrative) and back (return to a known-good state). This matters more here than in a typical product because the rep must be able to recover instantly if a client clicks somewhere unplanned.
5. **Numbers are sacred.** Currency, dates, quantities, and percentages must be formatted identically everywhere they appear (see `09_DESIGN_TOKENS.md` and `08_DEMO_DATA_GUIDE.md`). A construction executive will notice SAR 1,250,000 formatted one way on one screen and another way on the next — this is one of the fastest trust-killers available and must be treated as a P0 bug class, not a polish item.
6. **Empty states are designed, not defaulted.** Because this is fixture-driven and rehearsed, most "empty state" risk is eliminated by ensuring data always exists — but any genuinely empty state (e.g., an unselected filter result) must have a deliberate, on-brand message, never a blank white rectangle.
7. **Every interactive element looks interactive.** Cursor affordances, hover states, and focus states are mandatory, not optional polish, because clients will touch the screen/trackpad and any dead-feeling control reads as unfinished software.

## 3. Spacing

We use an **8-point spacing scale** as the base rhythm, with a 4pt half-step available only for icon-to-label gaps and dense table cells where 8pt is too coarse.

- Base unit: `4px`. Primary scale multiples of `8px`: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- **Why 8pt, not 4pt-only or a arbitrary scale:** 8pt is the industry-converged standard (Material, Apple HIG spacing conventions, most enterprise design systems) because it divides cleanly across common screen/display densities and keeps every spacing decision a lookup, not an invention. A constrained scale is what prevents "spacing drift" across a team of contributors over time.
- Component-internal padding uses the scale directly (e.g., a card uses `24px` padding, a dense table cell uses `12px` vertical / `16px` horizontal).
- Section-to-section spacing on a page uses the larger end of the scale (`48`–`96`) to create the "confident whitespace" required by §1.
- **Rule:** no hand-typed pixel values in implementation. Every spacing value must resolve to a token defined in `09_DESIGN_TOKENS.md`. This is enforced at code review (`07_IMPLEMENTATION_RULES.md` review checklist).

## 4. Typography

- **Typeface strategy:** one primary UI typeface, geometric-humanist sans-serif (e.g., Inter or an equivalent grotesque with excellent number/tabular support), used for all UI, headings, and body copy. One **monospace/tabular numeral face is not a separate font** — instead, all numeric/data-table content uses the primary typeface's tabular-figure OpenType feature, so digits align in columns. This is a hard requirement for BOQ/financial tables (§6, construction-specific rules).
- **Why one typeface, not a display+body pairing:** a second display font is the single most common way a "designed" product tips into "templated startup landing page" territory. Enterprise trust is built through disciplined hierarchy (size/weight/color), not font pairing.
- **Type scale** (rem-based, 16px root):

| Token | Size | Weight | Usage |
|---|---|---|---|
| `display` | 40 / 44 | 600 | Hero/credibility surface headline only. Used at most once per screen. |
| `h1` | 32 / 40 | 600 | Page-level title. |
| `h2` | 24 / 32 | 600 | Section title. |
| `h3` | 18 / 26 | 600 | Card/panel title. |
| `body-lg` | 16 / 24 | 400 | Primary reading copy. |
| `body` | 14 / 20 | 400 | Default UI copy, table body. |
| `body-sm` | 13 / 18 | 400 | Metadata, captions, helper text. |
| `label` | 12 / 16 | 600, uppercase, +2% tracking | Field labels, table headers, status chips. |
| `numeric-lg` | 28 / 32 | 600, tabular | KPI figures. |
| `numeric` | 14 / 20 | 500, tabular | Table/financial figures. |

- **Line length:** body copy target 60–80 characters per line; never exceed ~90.
- **Weight discipline:** only three weights are permitted in the entire system — 400 (regular), 500 (medium, for numeric/emphasis), 600 (semibold, for headings/labels). No 300, no 700+. Fewer weights, applied consistently, reads as more deliberate than a wide weight range applied loosely.

## 5. Grid

- **12-column responsive grid** at desktop breakpoints, with a `24px` gutter and fluid margins (see `09_DESIGN_TOKENS.md` breakpoints table).
- **Why 12 columns:** divisible by 2, 3, 4, and 6 — the only column count that lets us build both a 3-panel workspace layout and a 4-card KPI row from the same grid without fractional hacks.
- Dashboards/workspaces use a **fixed-sidebar + fluid-content** shell (sidebar `280px` fixed, content area on the 12-col grid) — not a fully fluid grid — because workspace navigation must never reflow or jump during a live demo.
- Content max-width on non-workspace (credibility/marketing-style) surfaces: `1280px`, centered, to keep line lengths and visual density controlled on large presentation displays/projectors.

## 6. Layout Principles

1. **F-pattern for dashboards, Z-pattern for narrative/credibility screens.** Dashboards place primary KPIs top-left/top-row (highest scan priority); narrative screens use classic hero → proof → CTA vertical flow.
2. **Cards are the primary content container.** A card has one job. If a card needs an internal scroll to show its own content at a normal viewport, it's two cards.
3. **Sidebars are for navigation and context, never for primary content.** Primary content always lives in the main canvas so it reads correctly when screen-shared or projected.
4. **Consistent shell across all workspaces.** Every workspace (Dashboard, future Procurement, future Document Control, etc.) shares the same shell: top bar (context + global actions) + left nav (workspace switch + section nav) + main canvas. New workspaces must not invent a new shell shape — see `03_INFORMATION_ARCHITECTURE.md`.
5. **Presentation Mode strips chrome.** When in Presentation Mode, non-essential navigation affordances are visually quieted (not removed — the rep may still need them) so the room's attention stays on content, not on UI scaffolding. See `05_MOTION_SYSTEM.md` for the transition behavior.

## 7. Icons

- **Single icon library, outline-first.** One consistent icon set (e.g., an outline-style set such as Phosphor/Lucide-equivalent), stroke-based, 1.5px stroke at 24px base size, scaled via token (`09_DESIGN_TOKENS.md` icon sizing table: `16 / 20 / 24 / 32`).
- **No mixed styles.** Never combine outline and filled icons in the same view except to encode a deliberate state (e.g., filled = active/selected, outline = inactive) — and that pairing must be defined once in `04_COMPONENT_SYSTEM.md` and reused everywhere, not reinvented per screen.
- **Icons never carry meaning alone.** Every status/action icon pairs with a text label or is documented in a legend, because color-blind accessibility and translation into Arabic both require it.
- **Construction-specific iconography** (crane, blueprint, hard hat, rebar, etc.) is permitted only in the credibility/marketing surfaces to establish industry context — never inside dense data workspaces, where generic UI icons (status, document, calendar, flag) are correct and industry icons would read as decorative noise.

## 8. Motion (Summary — full spec in `05_MOTION_SYSTEM.md`)

Motion in this product exists to (a) explain state changes, (b) direct attention during a rehearsed narrative, and (c) feel calm and expensive. It never exists to entertain. Defaults: 150–250ms for micro-interactions, 300–450ms for page/section transitions, standard easing curve `cubic-bezier(0.2, 0, 0, 1)` ("ease-out-expo-lite"), never bounce/elastic easing. Full rules, including reduced-motion behavior, live in `05_MOTION_SYSTEM.md` — this manual defers to it as the single source of truth for motion.

## 9. Accessibility

Accessibility is treated as an enterprise-credibility signal, not a compliance checkbox — Aramco-approved vendors and engineering consultants in the room are exactly the kind of technically literate audience who will notice (or test) contrast and keyboard behavior.

- **Contrast:** all text meets WCAG 2.1 AA at minimum (4.5:1 body text, 3:1 large text/headings); primary CTAs and status colors are additionally checked against both light and dark surface tokens.
- **Keyboard:** every interactive control must be reachable and operable via keyboard alone, with a visible focus ring using the dedicated `focus` token (never relying on browser default outline, never `outline: none` without a replacement).
- **Color is never the sole signal.** Status must be encoded with color + icon + text (see §7).
- **Motion respects `prefers-reduced-motion`.** See `05_MOTION_SYSTEM.md` §7.
- **Semantic structure:** proper heading order, landmark regions, and labelled form controls — even though this is a "sales tool," it is expected to survive a screen-reader spot check without embarrassment.
- **Touch targets:** minimum `40px × 40px` hit area for any tappable control, since a tablet is a first-class presentation device.

## 10. Construction-Industry-Specific Design Rules

These rules exist because generic enterprise UI conventions occasionally clash with how this specific industry reads data. Get these wrong and a construction professional notices in the first thirty seconds.

1. **Currency is Saudi Riyal (SAR) by default**, formatted as `SAR 1,250,000` (currency code prefix, not symbol-first, thousands-separated, no decimals for values over 10,000 unless the field is explicitly a unit rate). Unit rates (e.g., cost per m²) retain 2 decimals: `SAR 145.50 / m²`.
2. **Dates use `DD MMM YYYY`** (e.g., `14 Mar 2026`) everywhere — never ambiguous numeric-only formats (`03/14/2026` is actively wrong for this audience, since the region reads DD/MM). This single rule prevents a very common, very damaging credibility failure.
3. **Project/document identifiers follow real industry conventions**, not generic app IDs: RFIs as `RFI-XXXX`, BOQ line items numbered per CSI/discipline-style hierarchy, drawing numbers following an architectural/engineering numbering convention (see `08_DEMO_DATA_GUIDE.md` for the exact schemes). Generic IDs like `#1042` read as a to-do app, not a construction platform.
4. **Units of measure are explicit and correct** — m², m³, LM (linear meter), MT (metric ton), EA (each) — never left unitless, never using imperial units (this is a metric-standard market).
5. **Status vocabulary matches real workflow language**: "Pending Approval," "Under Review," "Approved with Comments," "Rejected — Resubmit," not generic SaaS statuses like "Draft/Published." See `06_COPY_GUIDELINES.md` for the canonical status vocabulary list.
6. **Org charts and approval chains must reflect real hierarchy depth** (site engineer → project engineer → project manager → client PM), not a flattened two-step "requested/approved" toy version — this is one of the clearest signals of whether the vendor understands the industry.
7. **Tables are a first-class UI pattern, not an afterthought.** This industry lives in spreadsheets and tabular reports (BOQs, RFI logs, submittal registers). Our tables must be the best-designed surface in the product — see `04_COMPONENT_SYSTEM.md` Table component spec — because a mediocre table here undoes strong work everywhere else.

## 11. Quality Checklist (Design Review Gate)

No screen ships to the demo build without passing every item below. This checklist is copied into the PR template referenced in `CONTRIBUTING.md`.

- [ ] Every spacing value maps to a token (§3); no raw pixel values.
- [ ] Type scale used exactly as specified (§4); no ad hoc font sizes/weights.
- [ ] All currency values formatted per §10.1; spot-checked against `08_DEMO_DATA_GUIDE.md`.
- [ ] All dates formatted per §10.2.
- [ ] Primary action is singular and visually unambiguous (§2.3).
- [ ] Every async control has loading/success/error states designed (§2.1).
- [ ] Color used for status is paired with icon + text (§9).
- [ ] Keyboard navigation and focus states verified.
- [ ] Contrast checked against both light and dark token sets.
- [ ] No mixed icon styles on the same screen (§7).
- [ ] Motion durations/easing match `05_MOTION_SYSTEM.md`; reduced-motion fallback verified.
- [ ] Screen reviewed at the three core breakpoints (`09_DESIGN_TOKENS.md`) with no layout breakage.
- [ ] Screen makes narrative sense inside its flow per `03_INFORMATION_ARCHITECTURE.md` (why does this screen exist right now?).
- [ ] No console errors/warnings when the screen is opened, interacted with, and left idle for 60 seconds.

## 12. Design Review Process

1. **Spec first.** Every new screen or component variant is specified in the relevant `/docs` file (updating `04_COMPONENT_SYSTEM.md` if it introduces a new component/variant) *before* implementation begins. Implementation without a spec update is a review blocker.
2. **Design review happens on a build, not a static mock**, wherever feasible — because motion, real data density, and real interaction latency are part of what's being judged, and static mocks hide exactly the risks this product cares most about (§1, §2).
3. **Two-person review minimum**: one reviewer evaluates against this manual's checklist (§11); a second reviewer role-plays the client persona from `01_PROJECT_SSOT.md` §2.1 and tries to break the happy path.
4. **Any exception to this manual requires a written rationale** recorded in `/DECISIONS.md`, not a silent deviation. Silent deviations are how design systems rot.
