/**
 * Workspace registry configuration (docs/03 §3, §10).
 * Future demos plug into this registry — no hardcoded workspace lists in UI.
 */

import type { WorkspaceId, WorkspaceMeta } from "@/types/workspace";

export const WORKSPACE_REGISTRY: readonly WorkspaceMeta[] = [
  {
    id: "project-command",
    labelKey: "workspace.projectCommand.label",
    descriptionKey: "workspace.projectCommand.description",
    path: "project-command",
    icon: "LayoutDashboard",
    available: true,
    phase: 1,
    defaultSectionId: "overview",
    sections: [
      {
        id: "overview",
        labelKey: "workspace.projectCommand.section.overview",
        path: "overview",
        status: "coming-soon",
        order: 1,
      },
      {
        id: "project-detail",
        labelKey: "workspace.projectCommand.section.projectDetail",
        path: "project-detail",
        status: "coming-soon",
        order: 2,
      },
      {
        id: "rfis",
        labelKey: "workspace.projectCommand.section.rfis",
        path: "rfis",
        status: "preview",
        order: 3,
      },
      {
        id: "documents",
        labelKey: "workspace.projectCommand.section.documents",
        path: "documents",
        status: "preview",
        order: 4,
      },
      {
        id: "team",
        labelKey: "workspace.projectCommand.section.team",
        path: "team",
        status: "coming-soon",
        order: 5,
      },
    ],
  },
  {
    id: "procurement",
    labelKey: "workspace.procurement.label",
    descriptionKey: "workspace.procurement.description",
    path: "procurement",
    icon: "Package",
    available: false,
    phase: 2,
    defaultSectionId: "overview",
    sections: [
      {
        id: "overview",
        labelKey: "workspace.procurement.section.overview",
        path: "overview",
        status: "coming-soon",
        order: 1,
      },
    ],
  },
  {
    id: "document-control",
    labelKey: "workspace.documentControl.label",
    descriptionKey: "workspace.documentControl.description",
    path: "document-control",
    icon: "Files",
    available: false,
    phase: 2,
    defaultSectionId: "overview",
    sections: [
      {
        id: "overview",
        labelKey: "workspace.documentControl.section.overview",
        path: "overview",
        status: "coming-soon",
        order: 1,
      },
    ],
  },
  {
    id: "rfi-submittals",
    labelKey: "workspace.rfiSubmittals.label",
    descriptionKey: "workspace.rfiSubmittals.description",
    path: "rfi-submittals",
    icon: "MessageSquareText",
    available: false,
    phase: 2,
    defaultSectionId: "overview",
    sections: [
      {
        id: "overview",
        labelKey: "workspace.rfiSubmittals.section.overview",
        path: "overview",
        status: "coming-soon",
        order: 1,
      },
    ],
  },
] as const;

export const DEFAULT_WORKSPACE_ID: WorkspaceId = "project-command";

export function getWorkspaceById(id: string): WorkspaceMeta | undefined {
  return WORKSPACE_REGISTRY.find((w) => w.id === id);
}

export function getWorkspaceByPath(path: string): WorkspaceMeta | undefined {
  return WORKSPACE_REGISTRY.find((w) => w.path === path);
}

export function getAvailableWorkspaces(): readonly WorkspaceMeta[] {
  return WORKSPACE_REGISTRY.filter((w) => w.available);
}

export function resolveWorkspaceSection(
  workspace: WorkspaceMeta,
  sectionPath?: string,
): WorkspaceMeta["sections"][number] {
  if (!sectionPath) {
    const fallback = workspace.sections.find((s) => s.id === workspace.defaultSectionId);
    return fallback ?? workspace.sections[0]!;
  }
  const match =
    workspace.sections.find((s) => s.path === sectionPath || s.id === sectionPath) ??
    workspace.sections.find((s) => s.id === workspace.defaultSectionId);
  return match ?? workspace.sections[0]!;
}

export function workspaceHref(workspaceId: WorkspaceId, sectionPath?: string): string {
  const workspace = getWorkspaceById(workspaceId);
  if (!workspace) return "/";
  const section =
    sectionPath ??
    workspace.sections.find((s) => s.id === workspace.defaultSectionId)?.path ??
    "overview";
  return `/workspace/${workspace.path}/${section}`;
}

/** All static paths for Next.js `output: "export"`. */
export function getAllWorkspaceStaticParams(): Array<{
  workspaceId: string;
  section: string[];
}> {
  const params: Array<{ workspaceId: string; section: string[] }> = [];
  for (const workspace of WORKSPACE_REGISTRY) {
    if (!workspace.available) continue;
    for (const section of workspace.sections) {
      params.push({
        workspaceId: workspace.path,
        section: [section.path],
      });
    }
  }
  return params;
}
