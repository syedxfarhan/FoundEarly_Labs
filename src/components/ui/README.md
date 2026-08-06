# UI components

- `layout/` — reusable shell layout primitives (AppShell, TopBar, …)
- `empty/` — EmptyState pattern (docs/04 §3.16)
- `system/` — ErrorBoundary, MainLandmark
- `ui/` — Tier 1/2 design-system primitives (Button, DataTable, …) — **Phase 1.3+**

Do not dump shell chrome into `ui/`. Spec-first for new primitives: update `docs/04_COMPONENT_SYSTEM.md` before implementing.
