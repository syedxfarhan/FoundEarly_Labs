import * as React from "react";

import { cn } from "@/utils/cn";

export type ToolbarProps = {
  children: React.ReactNode;
  className?: string;
  start?: React.ReactNode;
  end?: React.ReactNode;
  "aria-label"?: string;
};

/** Dense action strip for workspace headers / filters. */
export function Toolbar({
  children,
  className,
  start,
  end,
  "aria-label": ariaLabel = "Toolbar",
}: ToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label={ariaLabel}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border border-border bg-surface-muted/60 px-3 py-2",
        className,
      )}
      data-layout="toolbar"
    >
      {start ? <div className="flex items-center gap-2">{start}</div> : null}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{children}</div>
      {end ? <div className="ms-auto flex items-center gap-2">{end}</div> : null}
    </div>
  );
}
