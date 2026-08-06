import * as React from "react";

import { cn } from "@/utils/cn";

export type PanelProps = {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Elevated surface for utility / side regions */
  elevated?: boolean;
};

/** Quiet bordered region — not a nested card pattern. */
export function Panel({ children, className, title, description, elevated }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6",
        elevated && "bg-surface-elevated shadow-elevation_1",
        className,
      )}
      data-layout="panel"
    >
      {title || description ? (
        <div className="mb-4 space-y-1">
          {title ? <h3 className="type-h3 text-foreground">{title}</h3> : null}
          {description ? (
            <p className="type-body-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}
