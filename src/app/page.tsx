"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { workspaceHref } from "@/config/workspaces";
import { WorkspaceLoader } from "@/features/workspace/WorkspaceLoader";

/** Static-export-safe entry redirect into the workspace engine. */
export default function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(workspaceHref("project-command", "overview"));
  }, [router]);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <WorkspaceLoader />
    </div>
  );
}
