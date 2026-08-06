/**
 * App constants and feature flags (docs/10 config ownership).
 * Demo-affecting defaults require sign-off before client presentations.
 */

export const APP_NAME = "FoundEarly Labs";
export const APP_PRODUCT = "Interactive Capability Showcase";

/** Default active project after Demo Reset (docs/16 §7). */
export const DEFAULT_PROJECT_CODE = "P-1042" as const;

export const featureFlags = {
  /** Phase 1.2 — shell + workspace engine */
  discoverySimulator: false,
  projectDashboard: false,
  commandPaletteUi: true,
  presenterToolbarUi: false,
  globalSearchUi: true,
  notificationCenterUi: true,
} as const;

export const storageKeys = {
  theme: "foundearly-theme",
  locale: "foundearly-locale",
  recentCommands: "foundearly-recent-commands",
  recentSearches: "foundearly-recent-searches",
} as const;

export const overlayIds = {
  commandPalette: "command-palette",
  globalSearch: "global-search",
  notificationCenter: "notification-center",
  workspaceSwitcher: "workspace-switcher",
} as const;
