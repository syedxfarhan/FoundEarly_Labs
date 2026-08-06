import type { Metadata } from "next";

import { getAllWorkspaceStaticParams, getWorkspaceByPath, resolveWorkspaceSection } from "@/config/workspaces";
import { tKey } from "@/lib/content";

type WorkspacePageProps = {
  params: Promise<{
    workspaceId: string;
    section?: string[];
  }>;
};

export function generateStaticParams() {
  return getAllWorkspaceStaticParams();
}

export async function generateMetadata({ params }: WorkspacePageProps): Promise<Metadata> {
  const { workspaceId, section } = await params;
  const workspace = getWorkspaceByPath(workspaceId);
  if (!workspace) {
    return { title: "Workspace" };
  }
  const sectionMeta = resolveWorkspaceSection(workspace, section?.[0]);
  return {
    title: `${tKey(sectionMeta.labelKey)} · ${tKey(workspace.labelKey)}`,
  };
}

/**
 * Workspace route — thin composition only (docs/10).
 * Canvas content is resolved by the workspace engine lifecycle (empty / coming soon).
 */
export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId, section } = await params;
  const workspace = getWorkspaceByPath(workspaceId);
  const sectionMeta = workspace
    ? resolveWorkspaceSection(workspace, section?.[0])
    : undefined;

  // Engine + empty experiences render inside WorkspaceShell; keep route thin.
  return (
    <div
      data-workspace-route={workspaceId}
      data-section-route={sectionMeta?.path ?? "overview"}
      className="contents"
    />
  );
}
