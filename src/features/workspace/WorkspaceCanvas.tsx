"use client";

import { WorkspaceEmpty } from "@/features/workspace/WorkspaceEmpty";
import { WorkspaceLoader } from "@/features/workspace/WorkspaceLoader";
import { useWorkspaceEngine } from "@/features/workspace/WorkspaceEngine";
import { PageContainer } from "@/components/layout/PageContainer";
import { tKey } from "@/lib/content";

/** Resolves lifecycle → loader / empty / coming-soon canvas content. */
export function WorkspaceCanvas({ children }: { children?: React.ReactNode }) {
  const { lifecycle, section, workspace } = useWorkspaceEngine();

  if (lifecycle === "loading") {
    return (
      <PageContainer>
        <WorkspaceLoader />
      </PageContainer>
    );
  }

  if (lifecycle === "coming-soon" || lifecycle === "empty") {
    return (
      <PageContainer>
        <WorkspaceEmpty
          variant={lifecycle === "coming-soon" ? "coming-soon" : "no-data"}
          lifecycle={lifecycle}
        />
        <p className="sr-only">
          {tKey(workspace.labelKey)} — {tKey(section.labelKey)}
        </p>
      </PageContainer>
    );
  }

  return <PageContainer>{children ?? <WorkspaceEmpty variant="workspace" />}</PageContainer>;
}
