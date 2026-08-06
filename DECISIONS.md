# Decisions Log

This is the append-only record of material decisions made across this repository — architectural, design, product, and process. It exists so that "why did we do it this way" always has a documented answer instead of an oral history that erodes as contributors change.

**Format:** newest entries at the top. Each entry: date, decision, context/alternatives considered, and consequences. Entries are never edited retroactively to look smarter in hindsight — if a decision is later reversed, add a new entry that supersedes it and link back to the original.

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
