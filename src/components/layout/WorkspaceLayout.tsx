import * as React from "react";

import { cn } from "@/utils/cn";

export type WorkspaceLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Workspace canvas region — header + scrollable content. */
export function WorkspaceLayout({ header, children, className }: WorkspaceLayoutProps) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)} data-layout="workspace">
      {header ? <div className="shrink-0 border-b border-border bg-surface">{header}</div> : null}
      <div className="min-h-0 flex-1 overflow-y-auto" data-layout="workspace-content">
        {children}
      </div>
    </div>
  );
}
