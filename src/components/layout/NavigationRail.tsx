import * as React from "react";

import { cn } from "@/utils/cn";

export type NavigationRailProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

/** Fixed-width left navigation rail (280px sidebar token). */
export function NavigationRail({
  header,
  children,
  footer,
  className,
  "aria-label": ariaLabel = "Workspace navigation",
}: NavigationRailProps) {
  return (
    <nav
      className={cn("flex h-full min-h-0 flex-col", className)}
      aria-label={ariaLabel}
      data-layout="navigation-rail"
    >
      {header ? <div className="shrink-0 border-b border-border p-4">{header}</div> : null}
      <div className="min-h-0 flex-1 overflow-y-auto p-3">{children}</div>
      {footer ? <div className="shrink-0 border-t border-border p-3">{footer}</div> : null}
    </nav>
  );
}
