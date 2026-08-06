import * as React from "react";

import { cn } from "@/utils/cn";

export type TopBarProps = {
  brand: React.ReactNode;
  context?: React.ReactNode;
  center?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

/** Application top bar — brand, context, global actions (docs/03 §3). */
export function TopBar({ brand, context, center, actions, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 items-center gap-4 px-4 md:px-6",
        "bg-surface text-foreground",
        className,
      )}
      data-layout="top-bar"
    >
      <div className="flex min-w-0 items-center gap-3">{brand}</div>
      {context ? (
        <div className="hidden min-w-0 items-center gap-2 md:flex" data-layout="top-bar-context">
          <span className="h-4 w-px bg-border" aria-hidden />
          {context}
        </div>
      ) : null}
      {center ? <div className="mx-auto hidden min-w-0 max-w-md flex-1 lg:block">{center}</div> : null}
      <div className="ms-auto flex items-center gap-1">{actions}</div>
    </header>
  );
}
