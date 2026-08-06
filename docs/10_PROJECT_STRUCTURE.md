# 10 — Project Structure

**Owner:** Principal Software Architect / VP of Engineering
**Depends on:** `07_IMPLEMENTATION_RULES.md`
**Status:** This is the target repository layout for Phase 1 implementation. Phase 0 does not create these directories with code in them — this document is the blueprint the first implementation PR follows.

---

## 1. Top-Level Layout

```
/
├── docs/                    → this governance layer (already exists, Phase 0)
├── src/
│   ├── app/                 → Next.js App Router: routes + page composition
│   ├── components/          → design system: primitives + patterns (04_COMPONENT_SYSTEM.md)
│   ├── features/            → feature composites + narrative/business logic
│   ├── hooks/                → cross-feature reusable React hooks
│   ├── types/                → shared TypeScript domain types
│   ├── providers/            → app-wide React context providers
│   ├── data/                  → fixture data modules (08_DEMO_DATA_GUIDE.md)
│   ├── config/                → app configuration, feature flags, constants
│   ├── styles/                → global styles, Tailwind theme source (from 09_DESIGN_TOKENS.md)
│   ├── animations/            → shared Framer Motion variants/orchestrators (05_MOTION_SYSTEM.md)
│   ├── utils/                  → generic, dependency-free helper functions
│   ├── lib/                    → framework-agnostic domain logic (formatters, status rules)
│   └── assets/                  → static assets (icons if not from a package, illustrations, fonts)
├── public/                      → static files served as-is (favicon, exported static assets)
├── tests/                        → cross-cutting test config/fixtures not colocated with source
├── .github/                      → CI workflows, PR template
└── (root governance files — see §5)
```

## 2. Why This Shape (Rationale)

- **`src/` root, not a flat repo root:** keeps configuration files (lint, TS, Tailwind, Next config) visually and mechanically separated from application code, which matters once the repo also carries a large `/docs` directory and root governance files (§5) — a flat root mixing all of these becomes noisy fast.
- **`app/` is routing-only, thin.** Next.js App Router encourages putting logic directly in route files; we deliberately resist that. Route files import and compose from `features/`, keeping the URL structure (which must mirror `03_INFORMATION_ARCHITECTURE.md`'s hierarchy) decoupled from where business/narrative logic actually lives — this means the IA document and the routing layer stay obviously in sync without route files becoming dumping grounds.
- **`components/` vs `features/` is the single most important boundary in the codebase.** `components/` is the design system: generic, reusable, spec-driven (`04_COMPONENT_SYSTEM.md`), and owned collectively. `features/` is where FoundEarly-Showcase-specific behavior lives (Discovery Simulator state machine, Project Dashboard composition). This split is what lets the component system be reviewed, tested, and reasoned about independently of any one feature — and is the mechanical prerequisite for the Phase 6 roadmap item (extracting the design system into a shared internal library).
- **`data/` is isolated from `features/` and `components/` deliberately** (`07_IMPLEMENTATION_RULES.md` §2) so that swapping fixture data for a real API later (Roadmap Phase 5) touches one directory's contents, not the whole app — the shape of this boundary is exactly what makes that future migration additive rather than a rewrite.
- **`lib/` vs `utils/` split:** `lib/` contains domain-aware logic (e.g., `computeRfiSlaStatus`, `formatSarCurrency`, `getBoqSectionTotal`) that encodes rules from `06_COPY_GUIDELINES.md`/`08_DEMO_DATA_GUIDE.md`; `utils/` contains domain-blind generic helpers (e.g., `groupBy`, `clamp`). Keeping these separate means a reviewer can tell, from directory alone, whether a function change might have product/business implications (`lib/`) or is safe, generic refactoring (`utils/`).
- **`animations/` is separated from `styles/`** because motion in this product is meaningfully choreographed (`05_MOTION_SYSTEM.md`'s staggered reveals, step transitions) rather than simple CSS transitions — these are Framer Motion variant objects and orchestration hooks, which are code, not styling, and deserve their own reviewable surface.
- **`config/` centralizes anything that behaves like a flag or constant** (e.g., which fictional company profile is "active," Presentation Mode default state, feature toggles for in-progress Phase 2 workspaces) — so nobody goes hunting through feature code to find a magic constant during pre-demo prep.

## 3. Directory-by-Directory Ownership

| Directory | Owner (role) | Change bar |
|---|---|---|
| `docs/` | Whole team, governed by `CONTRIBUTING.md` | Any material change requires a `/DECISIONS.md` entry |
| `app/` | Feature owner of the route being added | Routing structure changes require IA doc sync (`03_INFORMATION_ARCHITECTURE.md`) |
| `components/` | Design System Architect + collective review | Two-person review (`02_PRODUCT_DESIGN_MANUAL.md` §12.3); spec-first (`04_COMPONENT_SYSTEM.md`) |
| `features/` | Feature owner | Must not be reached into by other features (`07_IMPLEMENTATION_RULES.md` §4) |
| `data/` | Solutions Architect / whoever maintains `08_DEMO_DATA_GUIDE.md` | Must pass consistency test (`07_IMPLEMENTATION_RULES.md` §11.5) |
| `providers/`, `hooks/` | Staff Frontend Engineer oversight | One concern per provider/hook (`07_IMPLEMENTATION_RULES.md` §8) |
| `lib/`, `utils/` | Any engineer, standard review | Must remain framework-agnostic (no React imports in `lib/`/`utils/`) |
| `styles/` | Design System Architect | Generated from `09_DESIGN_TOKENS.md`; not hand-edited independently |
| `animations/` | Staff Frontend Engineer + Principal Product Designer | Must match `05_MOTION_SYSTEM.md` values exactly |
| `types/` | Shared, standard review | Domain types must match `08_DEMO_DATA_GUIDE.md` entity vocabulary |
| `config/` | VP of Engineering oversight | Changes affecting live-demo defaults require sign-off before a scheduled client presentation |

## 4. Illustrative Directory Contents (Not Exhaustive, for Orientation Only)

```
src/features/
├── discovery-simulator/
│   ├── SimulatorProvider.tsx        (state machine, per 03_INFORMATION_ARCHITECTURE.md §5)
│   ├── steps/
│   │   ├── ContextCaptureStep.tsx
│   │   ├── ProblemMirrorStep.tsx
│   │   ├── CapabilityRevealStep.tsx
│   │   ├── WorkspaceDiveStep.tsx
│   │   ├── AIMomentStep.tsx
│   │   └── CloseStep.tsx
│   └── content/                     (step copy, keyed by client profile — see 06_COPY_GUIDELINES.md §11.2)
│
└── project-dashboard/
    ├── OverviewSection.tsx
    ├── ProjectDetailSection.tsx
    ├── RfiPreviewSection.tsx
    ├── DocumentsPreviewSection.tsx
    └── TeamSection.tsx

src/data/
├── projects.ts
├── employees.ts
├── vendors.ts
├── equipment.ts
├── rfis.ts
├── submittals.ts
├── boq.ts
├── drawings.ts
├── purchaseOrders.ts
└── index.ts                          (typed lookup helpers, e.g., getProjectByCode)
```

## 5. Root Files (See Also Root Governance Docs)

The repository root, outside `src/` and `docs/`, holds only:

- `README.md`, `CONTRIBUTING.md`, `PROJECT_PRINCIPLES.md`, `CHANGELOG.md`, `DECISIONS.md`, `ROADMAP.md` — governance entry points (see each file for its specific role).
- Standard project config: `package.json`, `tsconfig.json`, `next.config.*`, `tailwind.config.*`, `.eslintrc.*`, `.gitignore`.

No loose scratch files, no `notes.md`, no personal working files committed to the root — anything exploratory belongs in a personal branch or a gitignored scratch directory, never in the shared root namespace, to keep the repository reading as the disciplined engineering organization this whole initiative is meant to project.

## 6. Why Not a Monorepo (Explicit Rejection, Revisit Trigger)

A `packages/` monorepo (e.g., separating `@foundearly/design-system` as its own package now) was considered and rejected for Phase 1: there is exactly one consumer of the design system today, so package boundaries would add tooling overhead (build orchestration, versioning, cross-package type resolution) with no present benefit. The `components/` vs `features/` boundary (§2) is deliberately drawn so that extraction into a real package later is a mechanical move, not a redesign — **the revisit trigger is a second real consumer of the design system** (Roadmap Phase 6), not a fixed timeline.
