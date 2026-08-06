# 07 — Implementation Rules

**Owner:** VP of Engineering / Principal Software Architect / Staff Frontend Engineer
**Depends on:** all preceding `/docs` files
**Feeds into:** `10_PROJECT_STRUCTURE.md`

> This document is the engineering constitution. It governs how Phase 1 code gets written, once written begins. It does not contain application code, but it removes every architectural decision an implementer would otherwise have to make (or guess) alone.

---

## 1. Technology Decision & Rationale

| Layer | Decision | Why (trade-offs considered) |
|---|---|---|
| Framework | **Next.js (App Router) + React + TypeScript** | Static-exportable for offline/local laptop delivery (`01_PROJECT_SSOT.md` §8.1) while retaining a clear path to a hosted "leave-behind" variant (Roadmap Phase 5) without a rewrite. Alternative considered: plain Vite SPA — rejected because it would require re-platforming for any future SSR/hosted needs; Next.js's static export mode gives us the offline-safe laptop build *today* without foreclosing server rendering later. |
| Language | **TypeScript, strict mode** | Non-negotiable for a multi-contributor system with closed enums everywhere (statuses, variants, tokens per `04_COMPONENT_SYSTEM.md`, `06_COPY_GUIDELINES.md` §6) — TypeScript is what makes those enums enforceable at compile time instead of by convention. |
| Styling | **Tailwind CSS, configured from the token layer (`09_DESIGN_TOKENS.md`)** | Tailwind's utility model, constrained to a generated token-based config (no arbitrary values allowed, see §7), is the fastest way to make "no raw pixel values" (`02_PRODUCT_DESIGN_MANUAL.md` §3) enforceable via lint rule rather than code review vigilance alone. |
| Component primitives | **Radix UI primitives (unstyled) under our own styled component layer** | Gives us correct accessibility/keyboard behavior (`04_COMPONENT_SYSTEM.md` §6) for free on `Dialog`, `Select`, `Tooltip`, etc., without hand-rolling ARIA — hand-rolling this class of behavior is a common source of the exact accessibility gaps this product cannot afford to ship with. |
| State management | See §5 below. | |
| Data | **Static, versioned fixture modules per `08_DEMO_DATA_GUIDE.md`**, no runtime database, no external API calls required for the core flow. | Matches `01_PROJECT_SSOT.md` §8.2 assumption; eliminates the single largest live-demo failure surface (network dependency). |
| Motion | **Framer Motion (or an equivalent declarative animation library)**, wired to the duration/easing tokens in `05_MOTION_SYSTEM.md` and `09_DESIGN_TOKENS.md` | Declarative orchestration (staggered reveals, exit animations) is materially harder to get right with raw CSS transitions at the complexity level `05_MOTION_SYSTEM.md` specifies (e.g., the Capability Reveal stagger). |
| Testing | See §10. | |
| Package manager | **pnpm** | Deterministic, fast, disk-efficient for a single-app monorepo-shaped structure (`10_PROJECT_STRUCTURE.md`); avoids the phantom-dependency issues npm/yarn classic are prone to, which matters once a component-system layer with strict internal boundaries (§4) is in play. |

This table is the answer to "what do we build this with" — implementers should not re-litigate these choices per feature. Changing any row requires a `/DECISIONS.md` entry.

## 2. Architecture Overview

The application is a **single Next.js app**, not a monorepo of separate packages, for Phase 1 — the complexity of a multi-package workspace (versioning, publishing, cross-package type resolution) is not justified until there is a second consumer of the design system (Roadmap Phase 6, internal reuse). We structure the single app with strict internal module boundaries (`10_PROJECT_STRUCTURE.md`) that make a future extraction into packages mechanical, not a rewrite, when that day comes.

**Layered architecture, outside-in:**

```
app/           → routing + page composition only (per 03_INFORMATION_ARCHITECTURE.md hierarchy)
features/      → feature composites + business/narrative logic (Discovery Simulator, Workspaces)
components/    → design system: primitives + patterns (04_COMPONENT_SYSTEM.md), no feature logic
data/          → fixture data modules (08_DEMO_DATA_GUIDE.md), typed, no UI
hooks/         → cross-feature reusable behavior (e.g., usePresentationMode, useReducedMotion)
providers/     → app-wide context (theme, presentation-mode state, simulator state)
lib/           → framework-agnostic pure logic (formatters, status transition rules)
styles/        → token-derived global styles, Tailwind config source
```

Dependency direction is one-way: `app → features → components → lib`. `components` never imports from `features` or `app`. `data` is imported by `features`, never by `components` directly (components receive data via props, keeping them presentational and reusable per `04_COMPONENT_SYSTEM.md` §2.2). See `10_PROJECT_STRUCTURE.md` for the full rationale and directory-by-directory ownership model.

## 3. Naming Conventions

- **Files:** `PascalCase.tsx` for components, `camelCase.ts` for hooks/utilities, `kebab-case` for route segment folders (Next.js App Router convention).
- **Components:** match the exact names reserved in `04_COMPONENT_SYSTEM.md` — no synonyms, no abbreviations invented at implementation time.
- **Hooks:** `use` prefix, verb-based (`usePresentationMode`, `useSimulatorStep`), never noun-only (`useData` is not descriptive enough to survive a codebase with more than a handful of hooks).
- **Types:** PascalCase, domain nouns matching `08_DEMO_DATA_GUIDE.md` entities exactly (`Project`, `RFI`, `BOQLineItem`) — the fixture data's shape and the TypeScript types are the same vocabulary, not independently named.
- **Fixture data files:** named after the entity collection, plural, kebab-case (`data/projects.ts`, `data/rfis.ts`).

## 4. Component Ownership

- **Design system components (`components/`) are owned collectively** — any engineer may propose a change, but changes require the two-person review from `02_PRODUCT_DESIGN_MANUAL.md` §12.3, because a change here ripples across every feature.
- **Feature composites (`features/`) are owned by whoever is building that feature**, but must only consume `components/` — a feature is never allowed to fork or locally patch a design-system component; if the system component doesn't support what a feature needs, that's a `04_COMPONENT_SYSTEM.md` spec update, not a local workaround. This is the rule that most directly prevents visual drift over time.
- **No feature may reach into another feature's internals.** Cross-feature communication happens through `providers/` (shared state) or `lib/` (shared pure logic), never through direct imports between `features/discovery-simulator` and `features/project-dashboard`, for example.

## 5. Import Rules

1. **No deep-relative imports crossing top-level module boundaries** (no `../../../components/Button` from a feature three levels deep) — use path aliases (`@/components`, `@/features`, `@/data`, `@/lib`) configured once in `tsconfig.json`. This keeps refactors (moving a file) from cascading into unrelated diffs.
2. **`components/` may not import from `features/`, `app/`, or `data/`.** Enforced via an ESLint import-boundary rule (e.g., `eslint-plugin-boundaries` or equivalent), not just convention — conventions get violated under deadline pressure; lint rules don't.
3. **No default exports for components.** Named exports only, for consistent naming across import sites and better refactor/rename tooling support.
4. **Barrel files (`index.ts`) are allowed only at the top of `components/` and `data/`** for clean public-surface imports; they are not allowed inside `features/` (feature-internal structure should stay explicit and discoverable, not hidden behind a barrel).

## 6. TypeScript Rules

1. **`strict: true`, no exceptions**, including `noUncheckedIndexedAccess` — fixture data is frequently accessed by ID/lookup (`08_DEMO_DATA_GUIDE.md`), and unchecked index access is exactly the class of bug that produces a blank screen mid-demo.
2. **No `any`.** Use `unknown` plus narrowing where a type is genuinely not known ahead of time. `// eslint-disable` for an `any` requires a comment explaining why and is a review blocker without one.
3. **Closed vocabularies are string literal union types, not `string`.** Every enum called out in `06_COPY_GUIDELINES.md` §6 (status vocab) and `04_COMPONENT_SYSTEM.md` §4 (variant vocab) is a TypeScript union, so an invalid status/variant is a compile error, not a runtime surprise discovered during rehearsal.
4. **Props interfaces are explicit and exported** per component, named `{Component}Props`, matching the states/variants matrix defined in `04_COMPONENT_SYSTEM.md` §5 exactly — the spec document and the type signature must never drift apart; if they do, one of the two is out of date and must be fixed same-PR.
5. **No implicit `null`/`undefined` handling via optional chaining as a substitute for real empty-state design.** `data?.value ?? '—'` silently rendering an em-dash where `04_COMPONENT_SYSTEM.md` §3.16 `EmptyState` was actually called for is a design regression, not just a code shortcut — reviewers must catch this distinction.

## 7. Styling Rules

1. **Tailwind config is generated from `09_DESIGN_TOKENS.md` values**, not maintained as a second source of truth — the tokens doc is canonical; the Tailwind theme config is its implementation, and any addition to the theme config requires the tokens doc to be updated first, same PR.
2. **No arbitrary Tailwind values** (`w-[423px]`, `text-[15px]`) outside a short, explicitly documented allowlist (e.g., a one-off SVG viewBox alignment) — enforced via `eslint-plugin-tailwindcss` or equivalent. Every spacing/color/type value must resolve to a token class.
3. **No inline `style` props** except for genuinely dynamic, data-driven values that cannot be a class (e.g., a progress bar's computed width percentage) — and even then, the dynamic value is computed in `lib/`, not inlined ad hoc in JSX.
4. **Component-level CSS Modules are not used.** Tailwind utility composition plus the `components/` layer's own variant logic (e.g., via `class-variance-authority` or equivalent) is the only styling mechanism, to avoid two competing styling paradigms in one codebase.

## 8. State Management Philosophy

Given `01_PROJECT_SSOT.md` §8.2 (no real backend), state in this application falls into exactly three categories, each with one designated tool — no ad hoc choice per feature:

1. **Server-shaped/fixture data** (`data/`): treated as static, read-only, imported directly or accessed via typed lookup helpers in `lib/`. No data-fetching library is required in Phase 1 since nothing is actually fetched over a network; if a hosted variant (Roadmap Phase 5) later needs real fetching, this is the layer that changes, in isolation.
2. **Cross-cutting app state** (Presentation Mode on/off, active fictional company profile, Discovery Simulator current step): React Context via `providers/`, one provider per concern, not one giant "app state" context — this keeps re-render scope narrow and keeps each concern's logic legible on its own.
3. **Local UI state** (a table's current sort column, a drawer's open/closed state): component-local `useState`/`useReducer`, never lifted to global state unless a second, unrelated component genuinely needs it — premature global state is a common over-engineering trap in small-scope apps like this one, and it directly works against the "predictable, simple, live-demo-safe" goal.

**Explicitly rejected for Phase 1:** Redux/Zustand/Recoil-class global state libraries, and any client-side data-fetching/caching library (React Query, SWR) — both solve problems (complex async server state, cache invalidation) that do not exist in this application's Phase 1 scope. Adding either would be solving an imaginary problem at real complexity cost, which directly contradicts the project's own philosophy (`01_PROJECT_SSOT.md` §6.3, "realism beats cleverness" — applied here to architecture, not just content).

## 9. Performance Requirements

Performance is a credibility signal as much as a technical one (`01_PROJECT_SSOT.md` §5 — G5, zero live-demo failure modes).

- **Time to interactive on first load ≤ 2s** on the presenter's own hardware (the realistic worst case is a mid-range laptop, not a dev machine) — enforced by keeping the fixture dataset lean (`08_DEMO_DATA_GUIDE.md` scope discipline) and avoiding heavy unnecessary dependencies.
- **Every navigation/interaction feels instant (<100ms) unless intentionally simulated** (`05_MOTION_SYSTEM.md` §5) — there is no legitimate reason for real latency anywhere in this app given the fixture-data architecture, so any perceived lag is treated as a bug, not tuned around.
- **`DataTable` (`04_COMPONENT_SYSTEM.md` §3.11) must remain smooth with realistic fixture volumes** (a construction project's RFI/BOQ log can realistically run into the hundreds of rows, per `08_DEMO_DATA_GUIDE.md`) — virtualization is specified as a requirement, not an optimization, once row counts exceed roughly 100 in a given view.
- **Bundle discipline:** no dependency is added for a single, narrow use case that a small amount of first-party code could cover — every new dependency must be justified against this bar in PR description (see `CONTRIBUTING.md`).

## 10. Accessibility Requirements

Implementation-level restatement/extension of `02_PRODUCT_DESIGN_MANUAL.md` §9 and `04_COMPONENT_SYSTEM.md` §6:

- Automated accessibility linting (`eslint-plugin-jsx-a11y`) is a CI gate, not advisory.
- Every PR touching `components/` requires a manual keyboard-only pass by the author before requesting review (self-certified in the PR template, `CONTRIBUTING.md`).
- Color contrast is verified against actual token values (`09_DESIGN_TOKENS.md`), not eyeballed, using an automated contrast-check step where feasible.

## 11. Testing Philosophy

Testing investment is deliberately shaped around this product's actual risk profile — a live, rehearsed, fixture-driven demo — not a generic "high coverage" mandate.

1. **Highest priority: the Discovery Simulator state machine and any status-transition logic** (`06_COPY_GUIDELINES.md` §6 transitions, `lib/` pure functions) — unit-tested thoroughly, because a broken state transition is exactly the kind of bug that only surfaces mid-presentation.
2. **Design-system components (`components/`) get interaction/accessibility tests** (React Testing Library-style: renders, keyboard nav, ARIA attributes, variant rendering) — because a regression here silently breaks every feature that consumes it.
3. **Visual regression testing on core screens** (a snapshot/screenshot-diff tool on the Credibility Landing, one Simulator step, and the Project Dashboard Overview) — this is the test category most directly protecting the "zero-glitch presentation" success metric (`01_PROJECT_SSOT.md` §7), since a layout break is a design bug that unit tests won't catch.
4. **No end-to-end test suite requirement in Phase 1** beyond a small smoke-test path (app boots, Simulator completes, one Workspace loads) — a full E2E suite is a maintenance cost disproportionate to an app with no real backend and no real user accounts; this is revisited if/when a hosted, real-backend variant (Roadmap Phase 5) is built.
5. **Fixture data itself is validated by a schema/consistency test** (`08_DEMO_DATA_GUIDE.md` §7) — e.g., every RFI references a project that exists, every project's budget total reconciles with its BOQ, every date is internally chronological — because data inconsistency is a credibility bug, not just a code bug, and deserves the same CI rigor as logic.

## 13. Browser & Device Support Matrix

Identified in Phase 0 self-review as a gap: without an explicit support matrix, "does this work" has no defined answer and risk silently shifts onto whichever laptop a rep happens to own.

| Tier | Targets | Support level |
|---|---|---|
| **Tier 1 (must be flawless)** | Latest two stable versions of Chrome and Edge on Windows/macOS, at `breakpoint-lg`/`breakpoint-xl` (`09_DESIGN_TOKENS.md` §6) | Full support, part of the manual pre-presentation checklist (§14) |
| **Tier 2 (must work, minor polish gaps acceptable)** | Latest stable Safari on macOS/iPadOS, at `breakpoint-md`/`breakpoint-lg` | Functional parity required; motion/shadow rendering differences are acceptable |
| **Tier 3 (must not crash, not optimized)** | Firefox latest stable; any browser at `breakpoint-sm` | Baseline functional only — this tier exists for the "skeptical technical reviewer" journey (`03_INFORMATION_ARCHITECTURE.md` §9.3), not for live presentation use |

**Rationale:** the realistic device population for this product is small and known (FoundEarly Labs-issued or -recommended presenter laptops/tablets) — this is not a public consumer product needing exhaustive cross-browser guarantees, so investment is concentrated on Tier 1 rather than spread thin. This matrix should be revisited if Roadmap Phase 5 (hosted leave-behind) is built, since that variant's audience (the client, unsupervised, on an unknown device) has a materially different risk profile.

## 14. Data Privacy & Security Posture

Identified in Phase 0 self-review as a gap: a B2B sales tool used in live client meetings still touches real-world context (client company names spoken aloud, potentially a rep's own notes) even without a real backend, and this needed an explicit statement rather than being left implicit.

1. **No real client data is persisted anywhere in Phase 1.** The Discovery Simulator's Step 0 context capture (`03_INFORMATION_ARCHITECTURE.md` §5.2) is deliberately selection-based, not free-text (§5.3 of that document), specifically so that no real client-identifying information is ever typed into, or stored by, the application.
2. **No analytics, tracking, or telemetry calls to third-party services in Phase 1** — consistent with the offline-first, no-network-dependency requirement (`01_PROJECT_SSOT.md` §8.1) and avoiding any question, in a client meeting, about where their information might be going.
3. **All fixture data is fictional and clearly documented as such** (`08_DEMO_DATA_GUIDE.md` §1.3), eliminating any real third-party data protection obligations for demo content.
4. **If Roadmap Phase 5 (hosted leave-behind) introduces real client interaction data** (e.g., a client revisiting a hosted link), a real data privacy review and policy is required before that phase ships — tracked as a hard dependency of Phase 5 in `ROADMAP.md`, not an implementation detail to decide informally at that time.

## 15. Review Checklist (PR Gate)

Copied into the PR template (`CONTRIBUTING.md`). A PR may not merge until every applicable item is checked:

- [ ] No raw pixel values, colors, or ad hoc durations — everything resolves to a token (§7.1–7.2, `05_MOTION_SYSTEM.md` §2).
- [ ] No new component/variant introduced without a corresponding `04_COMPONENT_SYSTEM.md` update in the same PR.
- [ ] No new status/copy string introduced without a corresponding `06_COPY_GUIDELINES.md` update if it expands a closed vocabulary.
- [ ] Import boundaries respected (§5.1–5.2); lint passes with zero warnings, not just zero errors.
- [ ] No `any`, no unexplained lint-disables (§6.2).
- [ ] Keyboard-only pass completed by author (§10).
- [ ] Design Quality Checklist (`02_PRODUCT_DESIGN_MANUAL.md` §11) completed for any new/changed screen; design reviewer uses `12_DESIGN_REVIEW_CHECKLIST.md` for final approval.
- [ ] No Enterprise Design Anti-Patterns (`02_PRODUCT_DESIGN_MANUAL.md` §13).
- [ ] Motion durations/easing match `05_MOTION_SYSTEM.md` §2–3; reduced-motion verified.
- [ ] Fixture data changes pass the consistency test (§11.5) and remain internally consistent with `08_DEMO_DATA_GUIDE.md`.
- [ ] No new dependency added without justification in the PR description (§9).
- [ ] Screenshots/recording attached for any visual change (required for the visual-regression baseline and for human reviewer context).
