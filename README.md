# FoundEarly Labs — Interactive Capability Showcase

**Company:** FoundEarly Labs Pvt. Ltd.
**Project:** Interactive Capability Showcase
**Status:** Phase 1.1 — Enterprise Foundation (complete). Product surfaces not started.

---

## What This Is

This repository is a premium, interactive sales application, presented in person by a FoundEarly Labs representative to Saudi Arabian construction, EPC, oil & gas, and facilities management companies — including Aramco-approved vendors. Its purpose is to demonstrate, through the software itself, that FoundEarly Labs can design and build enterprise-grade software, AI systems, dashboards, and business platforms.

It is **not** a portfolio site, a landing page, or a SaaS product. See [`docs/01_PROJECT_SSOT.md`](docs/01_PROJECT_SSOT.md) for the full definition of what this is and is not.

## Current Phase

**Phase 1.1 Enterprise Foundation is implemented.** Tokens, providers, motion presets, presentation/command architecture, and DX tooling live under `src/`. Product UI (simulator, dashboards, design-system primitives) is **not** in scope yet — see [`docs/20_PHASE_1_1_COMPLETION_CHECKLIST.md`](docs/20_PHASE_1_1_COMPLETION_CHECKLIST.md).

### Develop

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm build
```

Requires Node ≥ 20 and pnpm.

## Documentation

If you do not know which document owns a question, open [`docs/11_DOCUMENTATION_MAP.md`](docs/11_DOCUMENTATION_MAP.md) first.

Otherwise read in this order:

1. [`docs/01_PROJECT_SSOT.md`](docs/01_PROJECT_SSOT.md) — master vision. **Read this first, always.**
2. [`docs/02_PRODUCT_DESIGN_MANUAL.md`](docs/02_PRODUCT_DESIGN_MANUAL.md) — design constitution (includes Enterprise Design Anti-Patterns).
3. [`docs/03_INFORMATION_ARCHITECTURE.md`](docs/03_INFORMATION_ARCHITECTURE.md) — application shape and flows.
4. [`docs/04_COMPONENT_SYSTEM.md`](docs/04_COMPONENT_SYSTEM.md) — component specs (not implemented).
5. [`docs/05_MOTION_SYSTEM.md`](docs/05_MOTION_SYSTEM.md) — animation rules.
6. [`docs/06_COPY_GUIDELINES.md`](docs/06_COPY_GUIDELINES.md) — voice, tone, status vocabulary.
7. [`docs/07_IMPLEMENTATION_RULES.md`](docs/07_IMPLEMENTATION_RULES.md) — coding conventions and architecture.
8. [`docs/08_DEMO_DATA_GUIDE.md`](docs/08_DEMO_DATA_GUIDE.md) — fictional construction company ecosystem.
9. [`docs/09_DESIGN_TOKENS.md`](docs/09_DESIGN_TOKENS.md) — design tokens.
10. [`docs/10_PROJECT_STRUCTURE.md`](docs/10_PROJECT_STRUCTURE.md) — repository structure.

### Hardening layer (required before Phase 1)

11. [`docs/11_DOCUMENTATION_MAP.md`](docs/11_DOCUMENTATION_MAP.md) — doc ownership and conflict resolution.
12. [`docs/12_DESIGN_REVIEW_CHECKLIST.md`](docs/12_DESIGN_REVIEW_CHECKLIST.md) — official design approval gate.
13. [`docs/13_CONSTRUCTION_DOMAIN_GUIDE.md`](docs/13_CONSTRUCTION_DOMAIN_GUIDE.md) — construction terminology handbook.
14. [`docs/14_ICONOGRAPHY_GUIDE.md`](docs/14_ICONOGRAPHY_GUIDE.md) — icon handbook.
15. [`docs/15_DATA_VISUALIZATION_GUIDE.md`](docs/15_DATA_VISUALIZATION_GUIDE.md) — dashboard/chart constitution.
16. [`docs/16_PRESENTATION_MODE_GUIDE.md`](docs/16_PRESENTATION_MODE_GUIDE.md) — live presentation handbook.
17. [`docs/17_PHASE1_DEFINITION_OF_DONE.md`](docs/17_PHASE1_DEFINITION_OF_DONE.md) — gate to begin implementation.
18. [`docs/18_LIVE_DEMO_RUNBOOK.md`](docs/18_LIVE_DEMO_RUNBOOK.md) — in-room incident procedures.
19. [`docs/19_BRAND_AND_I18N_CONVENTIONS.md`](docs/19_BRAND_AND_I18N_CONVENTIONS.md) — brand application + i18n key conventions.

### Cursor AI rules

[`.cursor/rules/`](.cursor/rules/) — `design`, `architecture`, `coding`, `motion`, `copywriting`, `enterprise-ui`, `construction-domain`. These enforce `/docs` during AI-assisted Phase 1 work.

### Root governance

- [`PROJECT_PRINCIPLES.md`](PROJECT_PRINCIPLES.md)
- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`DECISIONS.md`](DECISIONS.md)
- [`ROADMAP.md`](ROADMAP.md)
- [`CHANGELOG.md`](CHANGELOG.md)

## Who This Is For

- **Engineers joining the project:** `/docs` + `.cursor/rules` are onboarding. A competent engineer should implement Phase 1 without clarifying questions on settled topics.
- **FoundEarly Labs leadership:** `docs/01_PROJECT_SSOT.md`, `ROADMAP.md`, and `docs/17_PHASE1_DEFINITION_OF_DONE.md`.
- **Demo representatives:** `docs/16_PRESENTATION_MODE_GUIDE.md` and `docs/18_LIVE_DEMO_RUNBOOK.md`.
- **Reviewers of this repository as a credibility signal:** intended use case — this governance layer should itself withstand technical scrutiny.

## Repository State

Phase 0 governance + Phase 1.1 enterprise foundation. No Discovery Simulator, dashboards, or fixture datasets yet. See [`CHANGELOG.md`](CHANGELOG.md).
