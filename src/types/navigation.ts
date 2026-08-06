/**
 * Navigation domain types — configuration-driven (docs/03 §4).
 * Navigation is never hardcoded in components; it resolves from config.
 */

export type NavGroupId = "workspaces" | "utility" | "system";

export type NavItemId = string;

export type NavItem = {
  id: NavItemId;
  labelKey: string;
  href: string;
  icon?: string;
  /** When false, item is visible but not navigable (Coming Soon). */
  available: boolean;
  groupId: NavGroupId;
  keywords?: string[];
  shortcutHint?: string;
};

export type NavGroup = {
  id: NavGroupId;
  labelKey: string;
  items: readonly NavItemId[];
};

export type BreadcrumbItem = {
  id: string;
  label: string;
  href?: string;
};
