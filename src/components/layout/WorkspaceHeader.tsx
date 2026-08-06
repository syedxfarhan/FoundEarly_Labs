import * as React from "react";

import { cn } from "@/utils/cn";

export type WorkspaceHeaderProps = {
  title: React.ReactNode;
  breadcrumb?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

/** Page header inside a workspace — title, breadcrumb, primary action slot. */
export function WorkspaceHeader({
  title,
  breadcrumb,
  description,
  actions,
  className,
}: WorkspaceHeaderProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 px-4 py-4 md:px-6 md:py-6", className)}
      data-layout="workspace-header"
    >
      {breadcrumb ? <div className="min-w-0">{breadcrumb}</div> : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h1 className="type-h1 text-balance text-foreground">{title}</h1>
          {description ? (
            <p className="max-w-2xl type-body text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
