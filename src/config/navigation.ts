/**
 * Global navigation configuration — never hardcode nav in components (docs/03 §4).
 */

import type { NavGroup, NavItem } from "@/types/navigation";
import { WORKSPACE_REGISTRY, workspaceHref } from "@/config/workspaces";

export const COMPANY_CONTEXT = "Al-Buraq Horizon Contracting";

export const navigationItems: readonly NavItem[] = [
  ...WORKSPACE_REGISTRY.map(
    (workspace): NavItem => ({
      id: `workspace.${workspace.id}`,
      labelKey: workspace.labelKey,
      href: workspaceHref(workspace.id),
      icon: workspace.icon,
      available: workspace.available,
      groupId: "workspaces",
      keywords: [workspace.id, workspace.path],
    }),
  ),
  {
    id: "utility.about",
    labelKey: "nav.utility.about",
    href: "/about",
    icon: "Info",
    available: true,
    groupId: "utility",
    keywords: ["about", "demo", "transparency"],
  },
] as const;

export const navigationGroups: readonly NavGroup[] = [
  {
    id: "workspaces",
    labelKey: "nav.group.workspaces",
    items: WORKSPACE_REGISTRY.map((w) => `workspace.${w.id}`),
  },
  {
    id: "utility",
    labelKey: "nav.group.utility",
    items: ["utility.about"],
  },
] as const;

export function getNavItem(id: string): NavItem | undefined {
  return navigationItems.find((item) => item.id === id);
}

export function getNavItemsForGroup(groupId: NavGroup["id"]): readonly NavItem[] {
  const group = navigationGroups.find((g) => g.id === groupId);
  if (!group) return [];
  return group.items
    .map((id) => getNavItem(id))
    .filter((item): item is NavItem => Boolean(item));
}
