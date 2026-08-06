# Features

Feature composites and shell engines for the Interactive Capability Showcase.

## Phase 1.2 modules

| Module | Responsibility |
|---|---|
| `app-shell/` | `WorkspaceShell` composite — top bar, nav, canvas, overlays |
| `workspace/` | Workspace registry engine, lifecycle, loader, transition, empty states |
| `navigation/` | Config-driven workspace switcher, section nav, utility nav |
| `command/` | Command palette UI (cmdk) |
| `search/` | Global search UI + placeholder index |
| `notifications/` | Notification center shell + badge |
| `presentation/` | Presentation Mode toggle (toolbar deferred) |
| `preferences/` | Theme + language/RTL foundation controls |

## Deferred

- `discovery-simulator/` — later Phase 1
- `project-dashboard/` section content — later Phase 1 (engine + empty states only now)

Import boundaries: features may import `@/components`, `@/lib`, `@/config`, `@/providers`, `@/data`. Features must not import other features' internals except through published barrels when composing the shell.
