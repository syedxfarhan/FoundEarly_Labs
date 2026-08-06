"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  DEFAULT_WORKSPACE_ID,
  getWorkspaceById,
  getWorkspaceByPath,
  resolveWorkspaceSection,
  workspaceHref,
} from "@/config/workspaces";
import { SHOWCASE_PATH } from "@/config/showcase";
import { DEFAULT_PROJECT_CODE } from "@/config/constants";
import type {
  ProjectCode,
  WorkspaceId,
  WorkspaceLifecycleState,
  WorkspaceMeta,
  WorkspaceSectionMeta,
} from "@/types/workspace";
import { usePresentation } from "@/providers/PresentationProvider";

type WorkspaceEngineValue = {
  workspace: WorkspaceMeta;
  section: WorkspaceSectionMeta;
  workspaceId: WorkspaceId;
  lifecycle: WorkspaceLifecycleState;
  projectCode: ProjectCode;
  navigateToWorkspace: (id: WorkspaceId, sectionPath?: string) => void;
  navigateToSection: (sectionPath: string) => void;
  setLifecycle: (state: WorkspaceLifecycleState) => void;
};

const WorkspaceEngineContext = React.createContext<WorkspaceEngineValue | null>(null);

function parseWorkspacePath(pathname: string): {
  workspacePath?: string;
  sectionPath?: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "workspace") return {};
  return {
    workspacePath: parts[1],
    sectionPath: parts[2],
  };
}

/**
 * Workspace engine — registry, routing state, lifecycle, and transitions.
 * Future demos plug into this system; no business logic here.
 */
export function WorkspaceEngineProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { activeProjectCode, setActiveProjectCode } = usePresentation();
  const [lifecycle, setLifecycle] = React.useState<WorkspaceLifecycleState>("ready");

  const { workspace, section } = React.useMemo(() => {
    const { workspacePath, sectionPath } = parseWorkspacePath(pathname);
    const workspaceMeta =
      (workspacePath ? getWorkspaceByPath(workspacePath) : undefined) ??
      getWorkspaceById(DEFAULT_WORKSPACE_ID)!;
    const sectionMeta = resolveWorkspaceSection(workspaceMeta, sectionPath);
    return { workspace: workspaceMeta, section: sectionMeta };
  }, [pathname]);

  React.useEffect(() => {
    if (!workspace.available) {
      router.replace(SHOWCASE_PATH);
      return;
    }
    if (section.status === "coming-soon") {
      setLifecycle("coming-soon");
      return;
    }
    if (section.status === "preview") {
      setLifecycle("empty");
      return;
    }
    setLifecycle("ready");
  }, [workspace, section, router]);

  const navigateToWorkspace = React.useCallback(
    (id: WorkspaceId, sectionPath?: string) => {
      setLifecycle("loading");
      router.push(workspaceHref(id, sectionPath));
    },
    [router],
  );

  const navigateToSection = React.useCallback(
    (sectionPath: string) => {
      setLifecycle("loading");
      router.push(workspaceHref(workspace.id, sectionPath));
    },
    [router, workspace.id],
  );

  React.useEffect(() => {
    if (!activeProjectCode) {
      setActiveProjectCode(DEFAULT_PROJECT_CODE);
    }
  }, [activeProjectCode, setActiveProjectCode]);

  const value = React.useMemo<WorkspaceEngineValue>(
    () => ({
      workspace,
      section,
      workspaceId: workspace.id,
      lifecycle,
      projectCode: activeProjectCode,
      navigateToWorkspace,
      navigateToSection,
      setLifecycle,
    }),
    [
      workspace,
      section,
      lifecycle,
      activeProjectCode,
      navigateToWorkspace,
      navigateToSection,
    ],
  );

  return (
    <WorkspaceEngineContext.Provider value={value}>{children}</WorkspaceEngineContext.Provider>
  );
}

export function useWorkspaceEngine(): WorkspaceEngineValue {
  const ctx = React.useContext(WorkspaceEngineContext);
  if (!ctx) {
    throw new Error("useWorkspaceEngine must be used within WorkspaceEngineProvider");
  }
  return ctx;
}
