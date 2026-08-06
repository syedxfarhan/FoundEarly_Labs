/**
 * Interactive Showcase hub configuration.
 * Demo cards are derived from the workspace registry — only available workspaces
 * with at least one ready section appear on the hub.
 */

import { WORKSPACE_REGISTRY, workspaceHref } from "@/config/workspaces";
import type { ContentKey } from "@/lib/content/en";
import type { WorkspaceId } from "@/types/workspace";

export const SHOWCASE_PATH = "/showcase";

/** Hub-specific descriptions (launcher copy — not workspace registry descriptions). */
const HUB_DESCRIPTION_KEYS: Partial<Record<WorkspaceId, ContentKey>> = {
  "corporate-website": "showcase.demo.corporateWebsite.description",
  "contractor-os": "showcase.demo.contractorOs.description",
};

export type ShowcaseDemo = {
  workspaceId: WorkspaceId;
  labelKey: string;
  descriptionKey: ContentKey;
  href: string;
  icon: string;
};

/**
 * Completed demos for the Interactive Showcase hub.
 * Excludes unavailable workspaces and stubs without ready sections.
 */
export function getShowcaseDemos(): readonly ShowcaseDemo[] {
  return WORKSPACE_REGISTRY.filter(
    (workspace) =>
      workspace.available && workspace.sections.some((section) => section.status === "ready"),
  ).map((workspace) => {
    const descriptionKey =
      HUB_DESCRIPTION_KEYS[workspace.id] ?? (workspace.descriptionKey as ContentKey);
    return {
      workspaceId: workspace.id,
      labelKey: workspace.labelKey,
      descriptionKey,
      href: workspaceHref(workspace.id),
      icon: workspace.icon,
    };
  });
}
