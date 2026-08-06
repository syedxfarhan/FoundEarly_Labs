# 12 — Design Review Checklist

**Owner:** Principal Product Designer / UX Director / Design System Architect
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md`, `04_COMPONENT_SYSTEM.md`, `05_MOTION_SYSTEM.md`, `09_DESIGN_TOKENS.md`, `14_ICONOGRAPHY_GUIDE.md`, `15_DATA_VISUALIZATION_GUIDE.md`
**Status:** Official gate. No screen is considered complete until every applicable item below is checked and signed off by a design reviewer.

> This is the expanded, production-facing gate that supersedes the shorter Quality Checklist in `02_PRODUCT_DESIGN_MANUAL.md` §11 for final screen approval. The shorter checklist remains the author's self-check before requesting review; this document is what the design reviewer runs. Both must pass.

---

## How to Use This Checklist

1. Author completes the short checklist in `02_PRODUCT_DESIGN_MANUAL.md` §11 and attaches screenshots/recording to the PR.
2. Design reviewer walks this document top-to-bottom against a running build (not a static mock — see `02_PRODUCT_DESIGN_MANUAL.md` §12.2).
3. Any failed item blocks merge. Exceptions require a `DECISIONS.md` entry, not a verbal waiver.
4. Items marked **N/A** must state why (e.g., "no charts on this screen") — blank skips are not allowed.

---

## 1. Visual Hierarchy

- [ ] One primary focal point is immediately clear within 2 seconds of looking at the screen.
- [ ] Heading levels follow the type scale in `09_DESIGN_TOKENS.md` §2 without skipping (no `h1` → `h3` jumps).
- [ ] Primary action is the strongest visual weight on the screen (`02_PRODUCT_DESIGN_MANUAL.md` §2.3).
- [ ] Secondary content is visually subordinate (smaller type, quieter color, lower elevation) — never competing with primary.

**Why:** Construction executives scan, they do not read. If hierarchy is unclear, they will look at the wrong thing while the rep is talking — and the narrative dies.

## 2. Whitespace

- [ ] Section-to-section gaps use `space-12` / `space-16` / `space-24` only (`09_DESIGN_TOKENS.md` §3).
- [ ] No region feels cramped (content colliding with edges or neighboring elements).
- [ ] No region feels sparse in a way that suggests unfinished content (large empty areas without intentional compositional purpose).
- [ ] Card/panel internal padding matches `dashboard-card-padding` or the component's defined token — never ad hoc.

**Why:** Whitespace is the primary signal of "this was designed." Accidental cramping or accidental sparseness both read as junior work to this audience.

## 3. Typography

- [ ] Only tokens from `09_DESIGN_TOKENS.md` §2 are used — no raw font sizes or weights.
- [ ] Only weights 400 / 500 / 600 appear (`02_PRODUCT_DESIGN_MANUAL.md` §4).
- [ ] Numeric/financial content uses tabular figures (`text-numeric` / `text-numeric-lg`).
- [ ] Line length for body copy stays within 60–80 characters.
- [ ] `text-label` (uppercase, tracking) is used only for field labels, table headers, and status chips — never for body or headings.

**Why:** Typographic discipline is one of the cheapest, highest-leverage credibility signals. One off-scale weight on one screen is enough for a technical reviewer to conclude "no design system."

## 4. Icon Consistency

- [ ] All icons come from the approved libraries in `14_ICONOGRAPHY_GUIDE.md` — no mixed sets, no random SVGs from the internet.
- [ ] Stroke width, sizing token, and optical alignment match `14_ICONOGRAPHY_GUIDE.md`.
- [ ] Status icons always pair with text + semantic color (`02_PRODUCT_DESIGN_MANUAL.md` §9).
- [ ] Construction-specific icons appear only on credibility/narrative surfaces, never inside dense data workspaces (`02_PRODUCT_DESIGN_MANUAL.md` §7.4).
- [ ] No decorative icons that do not carry meaning.

**Why:** Icon inconsistency is one of the fastest visual tells that a product was assembled, not designed. This audience notices.

## 5. Visual Rhythm

- [ ] Repeated elements (cards in a row, table rows, list items) share identical internal structure and spacing.
- [ ] Vertical rhythm of the page follows a consistent beat — no sudden density changes without a section boundary.
- [ ] Alignment to the 12-column grid (`09_DESIGN_TOKENS.md` §6) is exact — no "almost aligned" edges.

**Why:** Rhythm is what makes a screen feel intentional rather than stacked. Broken rhythm is perceived as unfinished even when every individual element is correct.

## 6. Dashboard Quality

- [ ] KPI cards follow `15_DATA_VISUALIZATION_GUIDE.md` and `04_COMPONENT_SYSTEM.md` §3.14 (`KPIStat`).
- [ ] Charts have a clear job (one insight each) — no multi-purpose "dashboard soup."
- [ ] Chart colors map exclusively to semantic/brand tokens (`15_DATA_VISUALIZATION_GUIDE.md` §3).
- [ ] Legends, axes, and units are present and correctly formatted (SAR, %, m², etc.).
- [ ] Empty and loading chart states are designed (`15_DATA_VISUALIZATION_GUIDE.md` §11–12).

**Why:** Dashboards are the flagship surface of this product. A weak dashboard undoes strong work everywhere else — construction PMs live in dashboards and will judge ours against Primavera/ACC/SAP in under a minute.

## 7. Enterprise UX

- [ ] System state is always visible for every async action (loading / success / error).
- [ ] No dead ends — every screen has a clear forward path and a clear back path (`02_PRODUCT_DESIGN_MANUAL.md` §2.4).
- [ ] Destructive actions require confirmation (`04_COMPONENT_SYSTEM.md` §3.1).
- [ ] Filters, search, and sort (where present) behave predictably and preserve URL state where applicable (`03_INFORMATION_ARCHITECTURE.md` §4).
- [ ] Density is earned — high information density without hierarchy collapse (`02_PRODUCT_DESIGN_MANUAL.md` §2.2).

**Why:** Enterprise buyers equate UX predictability with operational reliability. A confusing interaction mid-demo is interpreted as "this software would confuse my team too."

## 8. Construction Accuracy

- [ ] All terminology matches `13_CONSTRUCTION_DOMAIN_GUIDE.md` and `06_COPY_GUIDELINES.md` §10 — no invented or misused industry terms.
- [ ] Status labels are from the closed vocabulary (`06_COPY_GUIDELINES.md` §6).
- [ ] Currency, dates, units of measure formatted per `02_PRODUCT_DESIGN_MANUAL.md` §10.
- [ ] Document IDs / RFI IDs / BOQ codes follow `08_DEMO_DATA_GUIDE.md` conventions.
- [ ] Approval chains show real hierarchy depth (`02_PRODUCT_DESIGN_MANUAL.md` §10.6; `13_CONSTRUCTION_DOMAIN_GUIDE.md` § Approval Hierarchy).
- [ ] Fixture data on this screen reconciles with `08_DEMO_DATA_GUIDE.md` (no ad hoc invented numbers).

**Why:** A single wrong term ("ticket" instead of "RFI," "invoice" instead of "variation order") tells a Project Director that the vendor does not understand their industry. That is fatal in this sales context.

## 9. Presentation Quality

- [ ] Screen holds up when projected / screen-shared at `breakpoint-lg` / `breakpoint-xl`.
- [ ] Presentation Mode behavior (if applicable) matches `16_PRESENTATION_MODE_GUIDE.md` — chrome quieted, type legible, no broken controls.
- [ ] No control on this screen can trap a rep mid-narrative without a one-tap escape (`03_INFORMATION_ARCHITECTURE.md` §5.4).
- [ ] Screen survives the "client grabs the laptop" test — every interactive surface has a real, non-broken response.

**Why:** This product is used live. Presentation quality is not polish; it is the primary risk surface. A layout that looks fine on a laptop and collapses on a projector fails its only job.

## 10. Accessibility

- [ ] Contrast meets WCAG 2.1 AA against both light and dark tokens.
- [ ] Keyboard-only navigation works end-to-end on this screen.
- [ ] Focus rings use the focus token — never `outline: none` without replacement.
- [ ] Color is never the sole status signal (color + icon + text).
- [ ] Touch targets ≥ 40×40px.
- [ ] Semantic heading order and landmark structure are correct.

**Why:** Accessibility is a credibility signal for a technically literate audience (engineering consultants, Aramco QA leads) who will notice — and sometimes actively test — these fundamentals.

## 11. Motion Quality

- [ ] Durations and easing match `05_MOTION_SYSTEM.md` §2–3 exactly.
- [ ] No bounce, spring, elastic, or ornamental motion.
- [ ] `prefers-reduced-motion` collapses choreography correctly (`05_MOTION_SYSTEM.md` §10).
- [ ] Hover effects do not shift layout (`05_MOTION_SYSTEM.md` §4).
- [ ] Motion answers a state-change question — nothing moves "because it looks nice."

**Why:** Consumer-app motion in an enterprise construction pitch reads as unserious. Motion that explains state change reads as craft.

## 12. Arabic Compatibility

- [ ] No hardcoded left/right assumptions in layout (logical properties used, per `09_DESIGN_TOKENS.md` §12).
- [ ] Text containers use flexible width (no fixed pixel widths that will break under Arabic expansion, `06_COPY_GUIDELINES.md` §11.3).
- [ ] No string concatenation for sentences (`06_COPY_GUIDELINES.md` §11.2).
- [ ] Directional icons use semantic tokens (`icon-direction-forward`), not hardcoded chevron rotations (`09_DESIGN_TOKENS.md` §12.2).
- [ ] Copy avoids idioms that will not translate (`06_COPY_GUIDELINES.md` §3.5).

**Why:** Retrofitting RTL is a rebuild. Every Phase 1 screen that ships LTR-hostile is a debt that Phase 3 will have to pay at 10× cost.

## 13. Responsiveness

- [ ] No layout breakage at `breakpoint-md`, `breakpoint-lg`, `breakpoint-xl` (`09_DESIGN_TOKENS.md` §6).
- [ ] `breakpoint-sm` does not crash or produce unusable overflow (Tier 3 support, `07_IMPLEMENTATION_RULES.md` §13).
- [ ] Workspace shell sidebar remains fixed; content reflows on the grid without jumping during a live demo.
- [ ] Tables remain usable (horizontal scroll with sticky first column is acceptable; truncated-to-useless columns are not).

**Why:** Presenters switch between laptop and external display constantly. A screen that only works at one width fails in the room.

## 14. Information Density

- [ ] Density matches the screen's job: narrative surfaces are airy; operational tables/logs are dense (`02_PRODUCT_DESIGN_MANUAL.md` §2.2).
- [ ] No "padding to hide lack of content" — if a region is empty, use `EmptyState` (`04_COMPONENT_SYSTEM.md` §3.16), do not inflate spacing.
- [ ] No competing information clusters in the same viewport region (one job per section, per design philosophy).

**Why:** Wrong density — sparse tables or cramped marketing surfaces — signals that the team does not understand the difference between a sales narrative and operational software. Both exist in this product and must feel distinct.

## 15. Component Consistency

- [ ] Every UI element is a specified component from `04_COMPONENT_SYSTEM.md` — no one-off styled elements that duplicate a system component.
- [ ] Variants used match the closed sets in `04_COMPONENT_SYSTEM.md` §4.
- [ ] No nested cards (`04_COMPONENT_SYSTEM.md` §3.10).
- [ ] Status rendering always goes through `StatusChip` with the closed vocabulary.
- [ ] If a new component or variant was needed, `04_COMPONENT_SYSTEM.md` was updated in the same PR (spec-first rule).

**Why:** Component drift is how a design system dies. One "just this once" custom button becomes twelve within a month.

## 16. AI Slop Detection

- [ ] No generic Tailwind/shadcn "default look" that could belong to any product (`02_PRODUCT_DESIGN_MANUAL.md` Enterprise Design Anti-Patterns).
- [ ] No purple-on-white, purple-to-indigo gradients, glassmorphism, neon glows, or oversized shadows.
- [ ] No decorative blob shapes, floating badges, or sticker-style overlays on hero/media.
- [ ] No emoji in UI chrome or data surfaces.
- [ ] No Dribbble-style "pretty but useless" chart treatments.
- [ ] No consumer-app bounce animations or playful micro-interactions.
- [ ] Spacing was chosen from the token scale, not "eyeballed until it looked fine."
- [ ] If a stranger removed the FoundEarly mark, the screen would still not look like a generic AI-generated template.

**Why:** AI-default aesthetics are the single most common failure mode of AI-assisted UI work in 2025–2026. This audience has already seen a dozen vendors with the same purple gradient and rounded cards. Looking like that is looking like a commodity.

## 17. Production Readiness

- [ ] No console errors or warnings on load, interact, or 60s idle.
- [ ] No placeholder "Lorem ipsum," "TODO," or "Coming soon" visible on any interactive path a client could reach.
- [ ] Illustrative-only controls are either disabled under Presentation Mode (`16_PRESENTATION_MODE_GUIDE.md`) or clearly labeled per `03_INFORMATION_ARCHITECTURE.md` §7.
- [ ] Fixture data on this screen is internally consistent (`08_DEMO_DATA_GUIDE.md` §8).
- [ ] Performance: interactions feel instant (<100ms) unless intentionally simulated (`07_IMPLEMENTATION_RULES.md` §9).
- [ ] Screen is URL-addressable where the IA requires it (`03_INFORMATION_ARCHITECTURE.md` §4).

**Why:** "Almost ready" is not ready. A single visible TODO or console error in front of an Aramco QA lead ends the trust conversation.

---

## Sign-Off

| Role | Name | Date | Pass/Fail |
|---|---|---|---|
| Design reviewer (checklist) | | | |
| Client-persona reviewer (`01_PROJECT_SSOT.md` §2.1) | | | |

Failed items and remediation notes:
