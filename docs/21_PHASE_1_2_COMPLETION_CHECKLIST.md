# Phase 1.2 Completion Checklist

Enterprise Application Shell + Workspace Engine gate.

## Shell architecture
- [x] `WorkspaceShell` composite (docs/04 §3.18)
- [x] Top bar + left nav (280px) + main canvas + right utility region
- [x] Presentation Mode quiet chrome (`--chrome-opacity`)
- [x] Overlay layer + portal layer (command, search, notifications)
- [x] Toast host retained (sonner)

## Workspace engine
- [x] Workspace registry + metadata (`src/config/workspaces.ts`)
- [x] Config-driven routing (`/workspace/[workspaceId]/[[...section]]`)
- [x] Workspace layout, header, breadcrumb, loader, transition, lifecycle
- [x] Empty / coming-soon / preview states — no blank pages

## Navigation
- [x] Navigation groups/items from configuration (`src/config/navigation.ts`)
- [x] Workspace switcher + section nav + utility nav
- [x] Quick switcher / launcher foundation via command palette
- [x] Keyboard: `P`, `F`, `⌘K`, `/`, `Esc`, `G` then `D`/`H`

## Command / search / notifications
- [x] Command palette UI (cmdk) — architecture actions only
- [x] Global search UI with placeholder index, recent searches, categories
- [x] Notification center shell + badge (empty by default)

## Preferences
- [x] Theme switch (light / dark / system) with persistence + transition
- [x] Language + RTL direction foundation with persistence (English copy)

## Layout components
- [x] AppShell, WorkspaceLayout, PageContainer, ContentGrid, Section, Panel
- [x] Toolbar, TopBar, NavigationRail, WorkspaceHeader, Breadcrumb
- [x] OverlayLayer, PortalLayer, EmptyState, ShellControl

## Quality
- [x] Feature-first modules under `src/features/`
- [x] Centralized content keys (`src/lib/content`)
- [x] Skip link + main landmark + focus rings + ≥40×40 hit targets
- [x] `pnpm typecheck` / `pnpm lint` / `pnpm build` pass

## Explicitly deferred (Phase 1.3+)
- [ ] Design-system Tier 1/2 primitives (Button, DataTable, Dialog, …)
- [ ] Presenter Toolbar UI
- [ ] Discovery Simulator / dashboard section content / fixtures
- [ ] Arabic translation packs
- [ ] Demo Reset confirmation Dialog
