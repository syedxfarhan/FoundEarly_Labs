# Changelog

This changelog tracks what has actually shipped in this repository, phase by phase. It is not a commit log (git history serves that purpose) — it is a human-readable record of milestones, intended for anyone (including non-engineers at FoundEarly Labs) who wants to understand project status without reading diffs.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/), adapted for a phase-based (not version-based) project.

## [Phase 0 Hardening] — 2026-08-06 — Enterprise hardening pass

### Added
- `docs/11_DOCUMENTATION_MAP.md` — ownership map and conflict resolution.
- `docs/12_DESIGN_REVIEW_CHECKLIST.md` — official design approval gate (with WHY per section).
- `docs/13_CONSTRUCTION_DOMAIN_GUIDE.md` — full construction terminology handbook.
- `docs/14_ICONOGRAPHY_GUIDE.md` — icon constitution.
- `docs/15_DATA_VISUALIZATION_GUIDE.md` — dashboard/chart constitution.
- `docs/16_PRESENTATION_MODE_GUIDE.md` — live presentation handbook.
- `docs/17_PHASE1_DEFINITION_OF_DONE.md` — gate before implementation starts.
- `docs/18_LIVE_DEMO_RUNBOOK.md` — in-room incident procedures.
- `docs/19_BRAND_AND_I18N_CONVENTIONS.md` — brand application + i18n key naming.
- `.cursor/rules/` — `design`, `architecture`, `coding`, `motion`, `copywriting`, `enterprise-ui`, `construction-domain`.
- `docs/02_PRODUCT_DESIGN_MANUAL.md` §13 — Enterprise Design Anti-Patterns.
- `DECISIONS.md` D-005 — hardening pass rationale.

### Changed
- Cross-links clarified: design review (`02` §11 self-check vs `12` gate); construction glossary (`06` §10 vs `13`); Presentation Mode (`03` §6 → `16`); icons (`02` §7 → `14`).
- `README.md`, `CONTRIBUTING.md`, PR template, `CODEOWNERS` updated for new docs.

### Notes
- Still no application code. Hardening is documentation/process only.
- Repository audit found no architecture reversals required; changes were additive clarification and gap-fill.

---

## [Phase 0] — 2026-08-05 — Repository Governance Initialized

### Added
- Complete `/docs` governance layer:
  - `01_PROJECT_SSOT.md` — master vision, goals, non-goals, audience, philosophy, success metrics, technical assumptions, roadmap.
  - `02_PRODUCT_DESIGN_MANUAL.md` — design constitution: visual philosophy, spacing, typography, grid, layout, icons, motion summary, accessibility, construction-specific design rules, quality checklist, review process.
  - `03_INFORMATION_ARCHITECTURE.md` — application hierarchy, navigation model, workspace structure, Discovery Simulator presentation flow, user journeys, expansion strategy.
  - `04_COMPONENT_SYSTEM.md` — full component inventory and specification (naming, variants, composition, states, accessibility, interaction rules) for all Phase 1 components. Specification only; no implementation.
  - `05_MOTION_SYSTEM.md` — animation philosophy, timing/easing tokens, per-context motion rules, reduced-motion policy.
  - `06_COPY_GUIDELINES.md` — voice, tone, writing rules, canonical status vocabulary, construction terminology glossary, AI assistant response rules, Arabic translation strategy.
  - `07_IMPLEMENTATION_RULES.md` — technology stack decision and rationale, architecture, naming, import/TypeScript/styling rules, state management philosophy, performance/accessibility requirements, testing philosophy, PR review checklist.
  - `08_DEMO_DATA_GUIDE.md` — the complete fictional construction company ecosystem (Al-Buraq Horizon Contracting Co.), including projects, employees, vendors, equipment, RFIs, submittals, BOQs, drawings, purchase orders, and consistency rules.
  - `09_DESIGN_TOKENS.md` — production-ready token specification: color (including semantic + dark/light), typography, spacing, radius, elevation, grid/breakpoints, motion, icon sizing, table/dashboard spacing, RTL considerations.
  - `10_PROJECT_STRUCTURE.md` — target repository folder structure and ownership model.
- Root governance files: `README.md`, `CONTRIBUTING.md`, `PROJECT_PRINCIPLES.md`, `DECISIONS.md`, `ROADMAP.md`, `CHANGELOG.md` (this file).
- Initial decision log entries (`DECISIONS.md` D-001 through D-004) covering the governance-first approach, single fictional data ecosystem, RTL-ready architecture, and state management scope.

### Notes
- No application code, UI, or components exist in this phase, by design (see `docs/01_PROJECT_SSOT.md` and `DECISIONS.md` D-001).
- This phase concludes with a self-review pass (see the "Phase 0 Self-Review" note below); any gaps identified were resolved in this same phase before Phase 1 implementation begins.

### Phase 0 Self-Review Summary
A critical architectural review was performed across all ten `/docs` files and the root governance files, checking for: missing documentation, technical risks, future scaling problems, design inconsistencies, architecture weaknesses, folder-structure improvements, and documentation gaps. Findings and resulting additions/refinements are recorded inline across the affected documents and in `DECISIONS.md`. No unresolved gaps were carried forward into Phase 1 planning as of this entry.

---

## [Unreleased]

Phase 1 implementation has not yet begun. Future entries will document actual shipped functionality (routes, components, workspaces) as they land, referencing the `/docs` specs they implement.
