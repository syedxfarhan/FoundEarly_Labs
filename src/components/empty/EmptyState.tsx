import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

export type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

/**
 * Premium empty experience (docs/04 §3.16, docs/02 §2.6).
 * Required for shell empty regions — not a blank page.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  size = "md",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        size === "sm" && "gap-3 px-4 py-8",
        size === "md" && "gap-4 px-6 py-12",
        size === "lg" && "gap-6 px-8 py-16",
        className,
      )}
      data-empty="true"
      role="status"
    >
      {Icon ? (
        <div
          className={cn(
            "flex items-center justify-center rounded-lg border border-border bg-surface-muted text-muted-foreground",
            size === "sm" && "size-10",
            size === "md" && "size-12",
            size === "lg" && "size-16",
          )}
          aria-hidden
        >
          <Icon
            className={cn(
              size === "sm" && "size-icon-md",
              size === "md" && "size-icon-lg",
              size === "lg" && "size-icon-xl",
            )}
            strokeWidth={1.5}
          />
        </div>
      ) : null}
      <div className="max-w-md space-y-2">
        <h2
          className={cn(
            "text-foreground",
            size === "lg" ? "type-h2" : "type-h3",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="type-body text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
