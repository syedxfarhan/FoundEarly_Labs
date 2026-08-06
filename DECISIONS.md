# Decisions Log

This is the append-only record of material decisions made across this repository — architectural, design, product, and process. It exists so that "why did we do it this way" always has a documented answer instead of an oral history that erodes as contributors change.

**Format:** newest entries at the top. Each entry: date, decision, context/alternatives considered, and consequences. Entries are never edited retroactively to look smarter in hindsight — if a decision is later reversed, add a new entry that supersedes it and link back to the original.

---

## D-007 — 2026-08-06 — Phase 1.2 Enterprise Application Shell + Workspace Engine

**Decision:** Implement Phase 1.2 as the persistent enterprise application shell and workspace engine only — `WorkspaceShell`, config-driven navigation/registry, command palette UI (cmdk), global search foundation, notification center shell, theme/locale/RTL preferences, layout primitives, and premium empty states — without Tier 1/2 design-system primitives, dashboard content, Discovery Simulator, or fixtures.

**Context / alternatives considered:** D-006 deferred product UI to Phase 1.2 as “design-system primitives / product surfaces.” Building Button/DataTable first was rejected for this gate so the operating shell can exist before business surfaces. Inventing a parallel top-level folder tree (`core/`, `shared/`) was rejected in favor of `docs/10` ownership (`features/*` modules + `components/layout`). Full Arabic packs remain Phase 3; locale switch here flips `dir`/`lang` only.

**Consequences:** Phase 1.3 must add design-system primitives via `docs/04` spec-first, then plug dashboard/simulator content into the existing registry and shell without reshaping chrome. See `docs/21_PHASE_1_2_COMPLETION_CHECKLIST.md`.

---

## D-006 — 2026-08-06 — Phase 1.1 Enterprise Foundation scaffold

**Decision:** Implement Phase 1.1 as a Next.js 15 App Router application under `src/` per `docs/10`, with static `output: "export"` for offline presentation, Lucide as the locked primary icon library, CSS-variable tokens mirrored from `docs/09`, and provider/command/presentation architecture without product UI.

**Context / alternatives considered:** Vite SPA was already rejected in `docs/07`. Shipping design-system components or demo surfaces in the same PR was rejected to keep Phase 1.1 a pure foundation (task brief). Zod v3 selected over v4 for ecosystem stability with react-hook-form. shadcn/ui is configured (`components.json` + Radix/CVA) but primitives are deferred to Phase 1.2 to avoid an unspec'd component dump.

**Consequences:** Phase 1.2 must add components via `docs/04` spec-first. Lucide is locked (update `docs/14` / this log only if changing). Static export remains until Phase 5 revisits hosting. See `docs/20_PHASE_1_1_COMPLETION_CHECKLIST.md`.

---

## D-005 — 2026-08-06 — Phase 0 enterprise hardening pass (docs 11–18 + Cursor rules)

**Decision:** Before Phase 1 implementation, extend governance with: documentation map (`11`), official design review checklist (`12`), construction domain handbook (`13`), iconography guide (`14`), data visualization guide (`15`), presentation mode guide (`16`), Phase 1 definition of done (`17`), live demo runbook (`18`), brand/i18n conventions (`19`), Enterprise Design Anti-Patterns in `02` §13, and `.cursor/rules/` mirrors for AI-assisted work.

**Context / alternatives considered:** Leaving Phase 0 at docs 01–10 risked duplicate guidance (short vs long design checklists), improvised construction terminology by AI/humans, underspecified live-meeting operations, and no machine-enforced rules for Cursor agents. Rewriting 01–10 was rejected — hardening must be additive unless a contradiction is found.

**Consequences:** `docs/11_DOCUMENTATION_MAP.md` is the conflict-resolution index. Design approval requires `12` in addition to author self-check in `02` §11. Domain terminology disputes defer to `13`. Presentation behavior details defer to `16`/`18`. Phase 1 must not start until `17` is signed. Cursor rules must stay aligned with `/docs` (docs win on conflict).

---

## D-001 — 2026-08-05 — Initialize repository governance layer before any implementation

**Decision:** Phase 0 of this project produces exclusively documentation (`/docs`) and root governance files (this file, `README.md`, `CONTRIBUTING.md`, `PROJECT_PRINCIPLES.md`, `ROADMAP.md`, `CHANGELOG.md`). No application code, UI, or components are implemented in this phase.

**Context / alternatives considered:** The alternative — starting implementation immediately and documenting as we go — was rejected. Given the audience and stakes described in `docs/01_PROJECT_SSOT.md` (a live, unrecoverable, in-person sales context with a highly skeptical technical audience), the cost of ambiguity discovered mid-implementation (inconsistent tokens, undefined statuses, conflicting IA) is far higher than the upfront cost of specifying everything first.

**Consequences:** Phase 1 implementation should require zero clarifying questions for any decision covered by `/docs`. Any implementation-time question not answered by an existing doc is itself a signal of a documentation gap, and should be resolved by updating the relevant doc (with a new `DECISIONS.md` entry if the answer is non-obvious), not by ad hoc code-level improvisation.

---

## D-002 — 2026-08-05 — Single fictional company ecosystem, not per-feature placeholder data

**Decision:** All demo data across every current and future workspace must reference one fictional company (Al-Buraq Horizon Contracting Co.) and its portfolio, as defined in `docs/08_DEMO_DATA_GUIDE.md`, rather than inventing independent placeholder data per feature.

**Context / alternatives considered:** Per-feature placeholder data (e.g., "Acme Corp" in one screen, unrelated invented names in another) is the default outcome of parallel, uncoordinated feature development and was explicitly rejected. Construction industry professionals are unusually good at detecting inconsistent/fabricated data, and a single inconsistency (mismatched project name, unreconciled budget figure) can undo the credibility built by every other screen.

**Consequences:** Every future data-consuming feature must extend the fixture ecosystem in `docs/08_DEMO_DATA_GUIDE.md` rather than introduce new entities independently; this is enforced by the fixture consistency test specified in `docs/07_IMPLEMENTATION_RULES.md` §11.5.

---

## D-003 — 2026-08-05 — English-first, RTL-ready architecture; Arabic localization deferred to Phase 3

**Decision:** Phase 1 ships English-only UI, but no architectural, token, or component decision may assume LTR-only layout. RTL/Arabic support is deferred to Phase 3 (see `ROADMAP.md`) but its groundwork (logical CSS properties, centralized string layer, direction-agnostic IA) is required starting in Phase 1.

**Context / alternatives considered:** Building English-only without RTL consideration was rejected because retrofitting RTL into a non-RTL-aware codebase is effectively a rebuild of the styling and layout layer, not an incremental addition — and this specific market (Saudi Arabia) makes Arabic support a near-certain future requirement, not a speculative one. Building full bilingual UI in Phase 1 was also rejected as premature scope given the project has not yet validated the English-only narrative flow in a live setting.

**Consequences:** `docs/09_DESIGN_TOKENS.md` §12 mandates logical property naming; `docs/06_COPY_GUIDELINES.md` §11 mandates a centralized, non-concatenated string layer from the first implementation commit.

---

## D-004 — 2026-08-05 — No global state library, no data-fetching library, in Phase 1

**Decision:** Redux/Zustand/Recoil-class state managers and React Query/SWR-class data-fetching libraries are explicitly out of scope for Phase 1.

**Context / alternatives considered:** These tools solve problems (complex shared server state, cache invalidation, async race conditions) that do not exist in a fixture-data-only, no-real-backend application (`docs/01_PROJECT_SSOT.md` §8.2). Adopting them preemptively "for Phase 2" was considered and rejected — it adds real complexity and onboarding cost today against a hypothetical future need that, per the roadmap, may not arrive in the assumed shape (a hosted backend, if built in Phase 5, may not need traditional REST/GraphQL data-fetching patterns at all).

**Consequences:** State management follows the three-category model in `docs/07_IMPLEMENTATION_RULES.md` §8 (fixture data, React Context for cross-cutting concerns, local state for UI). This decision should be explicitly revisited (new `DECISIONS.md` entry) if/when Roadmap Phase 5 (hosted leave-behind variant) is scoped.

---

## Template for New Entries

```markdown
## D-XXX — YYYY-MM-DD — <short decision title>

**Decision:** <what was decided, stated plainly>

**Context / alternatives considered:** <what problem this solves, what else was considered, why it was rejected>

**Consequences:** <what this obligates future contributors to do or avoid, and what doc(s) this affects>
```
