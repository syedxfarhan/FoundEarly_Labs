/**
 * Centralized English content layer (docs/06 §11, docs/19).
 * Arabic locale packs arrive in Phase 3 — keys are stable identifiers.
 */

export const en = {
  "common.brand.short": "FoundEarly",
  "common.brand.full": "FoundEarly Labs",
  "common.product": "Interactive Capability Showcase",
  "common.companyContext": "Al-Buraq Horizon Contracting",
  "common.action.close": "Close",
  "common.action.cancel": "Cancel",
  "common.action.confirm": "Confirm",
  "common.action.open": "Open",
  "common.loading": "Loading",
  "common.skipToContent": "Skip to main content",
  "common.search": "Search",
  "common.comingSoon": "Coming soon",
  "common.preview": "Preview",

  "nav.group.workspaces": "Workspaces",
  "nav.group.utility": "Utility",
  "nav.utility.about": "About this demo",
  "nav.workspaceSwitcher": "Switch workspace",
  "nav.sectionNav": "Workspace sections",
  "nav.projectSelector": "Active project",
  "nav.breadcrumb": "Breadcrumb",
  "nav.openCommand": "Open command palette",
  "nav.openSearch": "Open search",
  "nav.openNotifications": "Open notifications",

  "workspace.projectCommand.label": "Project Command",
  "workspace.projectCommand.description":
    "Portfolio health, project detail, and operational previews.",
  "workspace.projectCommand.section.overview": "Overview",
  "workspace.projectCommand.section.projectDetail": "Project Detail",
  "workspace.projectCommand.section.rfis": "RFIs",
  "workspace.projectCommand.section.documents": "Documents",
  "workspace.projectCommand.section.team": "Team",

  "workspace.procurement.label": "Procurement & BOQ",
  "workspace.procurement.description": "Bill of quantities and procurement workflows.",
  "workspace.procurement.section.overview": "Overview",

  "workspace.documentControl.label": "Document Control",
  "workspace.documentControl.description": "Drawing and document register.",
  "workspace.documentControl.section.overview": "Overview",

  "workspace.rfiSubmittals.label": "RFI & Submittals",
  "workspace.rfiSubmittals.description": "RFI lifecycle and submittal register.",
  "workspace.rfiSubmittals.section.overview": "Overview",

  "shell.utilityRegion": "Utility region",
  "shell.rightUtility": "Contextual utilities",
  "shell.presentationToggle": "Presentation mode",
  "shell.presentationOn": "Presentation mode on",
  "shell.presentationOff": "Presentation mode off",
  "shell.themeSwitch": "Theme",
  "shell.theme.light": "Light",
  "shell.theme.dark": "Dark",
  "shell.theme.system": "System",
  "shell.languageSwitch": "Language",
  "shell.language.en": "English",
  "shell.language.ar": "Arabic (layout preview)",
  "shell.language.hint": "Translations arrive in Phase 3. Direction updates now.",

  "empty.workspace.title": "Workspace ready",
  "empty.workspace.description":
    "This section is registered in the workspace engine. Content surfaces arrive in a later phase.",
  "empty.search.title": "No matching results",
  "empty.search.description": "Try a different term, or clear the query to browse categories.",
  "empty.notifications.title": "No notifications",
  "empty.notifications.description":
    "System notices will appear here when the notification pipeline is connected.",
  "empty.presentation.title": "Presentation chrome is quiet",
  "empty.presentation.description":
    "Secondary chrome is dimmed so attention stays on the canvas. Press P to exit.",
  "empty.noData.title": "No data in this view",
  "empty.noData.description":
    "Fixture data for this surface has not been loaded yet. The shell remains fully navigable.",
  "empty.comingSoon.title": "Coming soon",
  "empty.comingSoon.description":
    "This workspace is reserved in the registry and will plug into the same shell when it ships.",

  "command.placeholder": "Search commands and destinations…",
  "command.empty": "No commands match that query.",
  "command.recent": "Recent",
  "command.quickActions": "Quick actions",
  "command.category.navigation": "Navigation",
  "command.category.presentation": "Presentation",
  "command.category.simulator": "Simulator",
  "command.category.workspace": "Workspace",
  "command.category.system": "System",
  "command.open": "Command palette",

  "search.placeholder": "Search the showcase…",
  "search.recent": "Recent searches",
  "search.categories": "Categories",
  "search.loading": "Searching…",
  "search.category.workspaces": "Workspaces",
  "search.category.sections": "Sections",
  "search.category.commands": "Commands",
  "search.category.projects": "Projects",
  "search.indexHint": "Placeholder index — no live search backend in Phase 1.",

  "notifications.title": "Notifications",
  "notifications.badge": "Unread notifications",
  "notifications.markAllRead": "Mark all read",
  "notifications.emptyAction": "Notification architecture is ready",

  "about.title": "About this demo",
  "about.description":
    "This Interactive Capability Showcase is built by FoundEarly Labs using illustrative data for Al-Buraq Horizon Contracting. It demonstrates platform architecture and interaction quality — not a live production system.",
  "about.shellReady": "Enterprise application shell and workspace engine are active.",

  "notFound.title": "Page not found",
  "notFound.description":
    "That link is not part of the current showcase. Return to the Project Command workspace.",
  "notFound.action": "Open Project Command",
} as const;

export type ContentKey = keyof typeof en;

export type ContentDictionary = Record<ContentKey, string>;
