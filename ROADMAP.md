# Roadmap

This roadmap is directional, not a delivery commitment with dates. Per project convention, we characterize scope and dependency, not calendar time. See `docs/01_PROJECT_SSOT.md` §10 for the version of this roadmap embedded in the SSOT — this file is the maintained, standalone, more detailed version; if they ever diverge, update both in the same PR.

## Phase 0 — Governance & Foundation (current)

**Scope:** Complete documentation layer (`/docs`), root governance files, decision log, fictional demo-data world, design token specification, component specification, and repository structure blueprint. Zero application code.

**Exit criteria:** A new engineer with no prior context can read `/docs` end-to-end and implement Phase 1 without needing a clarifying conversation. Reviewed against the Self-Review section maintained alongside this initialization (see `CHANGELOG.md` Phase 0 entry).

## Phase 1 — Foundation Showcase

**Scope:**
- Repository scaffolding per `docs/10_PROJECT_STRUCTURE.md`.
- Design token implementation (Tailwind config generated from `docs/09_DESIGN_TOKENS.md`).
- Design system components per `docs/04_COMPONENT_SYSTEM.md` Tier 1 and Tier 2 (primitives + patterns).
- Credibility Landing surface.
- Discovery Simulator (all six steps, per `docs/03_INFORMATION_ARCHITECTURE.md` §5), profile-parameterized for at least the primary target segments (General Contractor, MEP Contractor, Oil & Gas).
- Project Command Dashboard workspace (Overview, Project Detail, read-only RFI/Documents previews, Team sections).
- Full fixture dataset per `docs/08_DEMO_DATA_GUIDE.md`.
- English only. Light and dark mode both fully implemented.
- Presentation Mode.

**Dependencies:** All of Phase 0. No external dependencies (no real backend, no third-party integrations).

**Key risks to watch:** fixture data internal consistency (mitigated by the automated consistency test, `docs/07_IMPLEMENTATION_RULES.md` §11.5); live-demo robustness (mitigated by the offline-first architecture and performance requirements, `docs/07_IMPLEMENTATION_RULES.md` §9).

## Phase 2 — Expanded Workspace Depth

**Scope:** Procurement & BOQ Workspace, Document Control Workspace, RFI & Submittals Workspace (full interactive versions of what Phase 1 only previews). Deeper fixture data (more BOQ line items, fuller document version histories, richer approval-chain examples per `docs/08_DEMO_DATA_GUIDE.md` §7.6). `DataTable` Tier 2 features (filtering, bulk row selection, expandable rows) become required, per the forward-looking spec already written in `docs/04_COMPONENT_SYSTEM.md` §3.11.

**Dependencies:** Phase 1 design system and Project Command Dashboard shell must be stable — new workspaces reuse the existing `WorkspaceShell` (`docs/04_COMPONENT_SYSTEM.md` §3.18) without shell changes, per the IA extension strategy (`docs/03_INFORMATION_ARCHITECTURE.md` §10).

## Phase 3 — Localization (Arabic / RTL)

**Scope:** Full Arabic UI, complete RTL layout pass, reviewed (not machine-translated) construction terminology glossary in Arabic (`docs/06_COPY_GUIDELINES.md` §11.5), bilingual toggle in the app shell.

**Dependencies:** Requires the centralized string layer and logical-property styling groundwork laid in Phase 1 (`docs/09_DESIGN_TOKENS.md` §12, `docs/06_COPY_GUIDELINES.md` §11) to already be in place — this phase should be a layout/content pass, not a re-architecture, if Phase 1 followed the governance layer correctly. This is the primary test of whether Phase 0/1 governance actually worked.

## Phase 4 — Client-Branded Variant Mode

**Scope:** A theming layer allowing a rep to swap cosmetic branding (logo, accent color) to loosely echo a specific high-value prospective client, for a single pitch, without touching the underlying fictional data model or component structure.

**Dependencies:** Requires `docs/09_DESIGN_TOKENS.md`'s token architecture to be strictly followed in Phase 1–2 implementation (no hardcoded brand values anywhere in component code) — this phase is essentially free if that discipline held, and expensive if it didn't.

## Phase 5 — Companion Leave-Behind

**Scope:** A lightweight, read-only, hosted version of the Showcase a client can revisit after the in-person meeting via their own link, clearly watermarked as illustrative.

**Dependencies:** May require introducing a real hosting/backend layer for the first time in this project's life — at that point, the "no data-fetching library" decision (`DECISIONS.md` D-004) must be explicitly revisited, not silently overridden.

## Phase 6 — Internal Design System Reuse

**Scope:** Extraction of `components/` (the design system) into a standalone internal package, if/when FoundEarly Labs builds a second client-facing tool that should feel like it comes from the same company.

**Dependencies:** The `components/` vs `features/` boundary (`docs/10_PROJECT_STRUCTURE.md` §2, §6) must have held cleanly through Phases 1–5 for this extraction to be mechanical rather than a rewrite. This phase's trigger is "a second real consumer exists," not a fixed point in time.

## Explicitly Not Planned (Unless a Future Business Decision Changes This)

- Multi-tenant SaaS productization of this codebase.
- Public marketing site / SEO-optimized content strategy built on this codebase.
- Real user authentication / real data persistence for arbitrary client data, absent a specific, separately-scoped business decision.

See `docs/01_PROJECT_SSOT.md` §4 (Non-Goals) for the reasoning behind these exclusions.
