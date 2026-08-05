# 05 — Motion System

**Owner:** Principal Product Designer / Staff Frontend Engineer
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md`, `09_DESIGN_TOKENS.md`

> Motion is the most easily overused tool in a design system built by engineers excited to demo AI-era UI. This document exists to constrain that impulse. Every rule below optimizes for "calm and expensive," never "impressive in isolation."

---

## 1. Animation Philosophy

1. **Motion explains, it does not entertain.** Every animation must answer a real question: where did this go, why did this change, what is loading, what comes next. If an animation can't answer one of those questions, it is decoration and it is cut.
2. **The room should feel the pace, not watch the pixels.** In a live pitch, a beat of well-timed motion (a staggered reveal during the Capability Reveal step, `03_INFORMATION_ARCHITECTURE.md` §5.2) creates rhythm and lets the rep talk over it. Motion that's too fast reads as nothing happened; too slow reads as sluggish software. This system is tuned to the specific pace of a spoken sales narrative, not generic UI feel.
3. **Nothing moves without a reason tied to state change.** No idle/ambient animation (no looping background gradients, no floating decorative shapes) — those are consumer-marketing-site signals that actively undercut the "serious enterprise software" positioning from `02_PRODUCT_DESIGN_MANUAL.md` §1.
4. **Consistency over cleverness.** The same kind of transition (e.g., "a panel enters from the right") must always use the same timing/easing everywhere it occurs. A design system with five different "correct" ways to slide in a drawer is not a system.

## 2. Timing Scale

| Token | Duration | Usage |
|---|---|---|
| `motion-instant` | 0ms | State changes that must feel synchronous (checkbox toggle, focus ring) |
| `motion-fast` | 120ms | Micro-interactions: hover, button press, icon state swap |
| `motion-base` | 200ms | Default for most component transitions: dropdown open, tooltip, tab switch |
| `motion-moderate` | 320ms | Panel/drawer enter-exit, dialog open-close |
| `motion-slow` | 450ms | Page/section-level transitions, Simulator step transitions |
| `motion-deliberate` | 600–800ms | Staggered multi-element reveals (Capability Reveal step) — this is a *sequence* budget across multiple staggered children, not a single element's duration |

**Why this scale, not a continuous range:** a small closed set of durations, like the type and spacing scales, is what prevents "motion drift" as more contributors add transitions over time. If a duration isn't on this list, it's wrong by definition, which makes code review trivial (`07_IMPLEMENTATION_RULES.md` review checklist references this table directly).

## 3. Easing

- **Default curve:** `cubic-bezier(0.2, 0, 0, 1)` — a fast-start, gentle-settle curve (an "ease-out" family curve). Used for anything entering the screen or resolving into a resting state (panels opening, cards appearing, hover elevation).
- **Exit curve:** `cubic-bezier(0.4, 0, 1, 1)` — a mirrored "ease-in," used only for elements leaving the screen (dialog close, toast dismiss) — exits should feel slightly quicker than entrances, since the user's attention has already moved on.
- **Never use spring/bounce/elastic easing anywhere in the system.** Bounce easing is the single most common way otherwise-serious UI reads as "startup toy" to an enterprise audience. This is a hard rule, not a default that can be overridden per component.
- **Never animate more than 2 properties simultaneously with different curves.** If position and opacity both animate, they use the same curve and duration — mismatched easing between simultaneously-animating properties is what makes motion feel "off" even when viewers can't articulate why.

## 4. Hover

- Hover transitions use `motion-fast` (120ms), opacity/color/elevation only — never layout-shifting hover effects (no hover-triggered resize, no hover-triggered content reveal that changes surrounding layout), because layout shift on hover is disorienting on a touch/trackpad-driven presentation device and actively harmful during a live demo where a stray cursor pass shouldn't rearrange the screen.
- Elevation-on-hover (`Card` `interactive` variant, per `04_COMPONENT_SYSTEM.md` §3.10) uses a subtle shadow token increase (see `09_DESIGN_TOKENS.md` elevation scale) — never a scale/transform effect, which reads as consumer-app playful rather than enterprise-serious.

## 5. Loading

- **Two loading vocabularies only:** `Skeleton` (structural placeholder, used for the deliberate async simulations described in `04_COMPONENT_SYSTEM.md` §3.8) and inline `Spinner` (used inside buttons/small controls per `04_COMPONENT_SYSTEM.md` §3.1 loading state). No third pattern (no full-page blocking spinners in Phase 1 — there is no real network layer to justify one, per `01_PROJECT_SSOT.md` §8.2).
- **Simulated async moments** (the AI Moment step, `03_INFORMATION_ARCHITECTURE.md` §5.2 Step 4) use a deliberately calibrated `Skeleton` duration of 900–1400ms — long enough to read as "real analysis happened," short enough to never feel like the room is waiting on broken software. This range is a product decision, not a technical constraint, and should be tuned during rehearsal, not left to a default.
- Loading states never use indeterminate infinite spinners without a boundary — every loading state in this product has a defined, bounded duration because every "load" is simulated and therefore fully within our control.

## 6. Transitions (Component-Level)

| Transition | Duration + easing | Notes |
|---|---|---|
| Dropdown/Select open | `motion-base`, enter curve | Combined with 4px vertical offset resolving to 0 |
| Dialog open/close | `motion-moderate` open (enter curve) / `motion-base` close (exit curve) | Backdrop fades independently at `motion-base` |
| Drawer open/close | `motion-moderate`, enter/exit curve, slides from anchored edge only (never diagonal) | |
| Tooltip | `motion-fast`, enter curve, no exit delay beyond hover-out | |
| Tab switch | `motion-base`, content cross-fade only, underline indicator slides at `motion-base` | No content slide — sliding tab content is a common but disorienting pattern at this information density |
| Toast enter/exit | `motion-base` enter, `motion-fast` exit, slides + fades from bottom edge | |
| Table row status change (e.g., approval state update) | `motion-base`, color transitions only, no layout animation | Rows never animate position on status change in Phase 1 to avoid visual noise in dense tables |

## 7. Page Motion

- **Workspace-to-workspace navigation:** content cross-fades at `motion-base`; the shell (top bar, left nav) never re-animates on navigation — only the main canvas content changes, reinforcing that the "frame" is stable (`02_PRODUCT_DESIGN_MANUAL.md` §6.4).
- **Section-to-section within a workspace:** same cross-fade rule, `motion-base`, no directional slide (a directional slide implies a spatial relationship between sections that doesn't exist in a top-down nav list).

## 8. Workspace Motion

- KPI/`DataTable` content, when first mounted, may use a single, restrained staggered fade-up (`motion-deliberate` budget, ~40ms stagger per row/card, capped at 6 staggered elements — beyond 6, everything after the cap appears immediately) to create a sense of a "populated, alive" dashboard on first view. This is used **once per workspace mount**, never replayed on every re-render/filter change (re-filtering a table should feel instant, not re-animate the whole table — that would slow down real interaction under the guise of polish).
- Drilling into a project (Overview → Project Detail, `03_INFORMATION_ARCHITECTURE.md` §3.1) uses the Drawer/panel transition (§6) if presented as an overlay, or the page motion cross-fade (§7) if presented as full navigation — the IA decides which; this doc only defines how each *type* of transition behaves once chosen.

## 9. Presentation Mode Motion

- Entering/exiting Presentation Mode (`03_INFORMATION_ARCHITECTURE.md` §6) animates the chrome-quieting effect (opacity/size changes to secondary nav) at `motion-moderate` — slow enough to be perceptible as an intentional mode change (so the rep visually confirms it engaged) but not slow enough to stall the room.
- Discovery Simulator step transitions (`03_INFORMATION_ARCHITECTURE.md` §5.2) use `motion-slow` (450ms) cross-fades with a slight vertical offset (12px), the most deliberate/cinematic motion in the system, reserved specifically for this narrative context — this asymmetry (narrative screens get more deliberate motion than workspace screens) is intentional: the Simulator is meant to feel like a presentation, the Workspaces are meant to feel like real software.
- The Capability Reveal step's staggered card entrance is the single most choreographed moment in the product (per `motion-deliberate` budget, §2) — up to 4 cards, ~150ms stagger, enter curve — because this is the emotional peak of the rehearsed narrative (`03_INFORMATION_ARCHITECTURE.md` §5.1) and deserves proportionally more motion investment than any workspace interaction.

## 10. Reduced Motion

- The system must respect `prefers-reduced-motion: reduce` at the token level: when active, all `motion-moderate`/`motion-slow`/`motion-deliberate` durations collapse to `motion-instant` or `motion-fast` (cross-fade only, no offset/slide/stagger), and looping/staggered reveals resolve to their end state immediately rather than being skipped outright (content must still appear; only the choreography is removed).
- This is implemented once, centrally (a motion-duration resolver token layer, per `09_DESIGN_TOKENS.md`), never as a per-component `if (prefersReducedMotion)` branch — centralizing this is what guarantees no component is accidentally missed, and it is explicitly checked in the Quality Checklist (`02_PRODUCT_DESIGN_MANUAL.md` §11).
- Reduced motion is treated as equally deserving of the "calm and expensive" feeling as full motion — it is not a degraded fallback, it's a different valid preference the same design intent must satisfy.
