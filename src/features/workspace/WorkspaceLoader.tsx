"use client";

import { LoaderCircle } from "lucide-react";

import { t } from "@/lib/content";
import { cn } from "@/utils/cn";

export type WorkspaceLoaderProps = {
  className?: string;
  label?: string;
};

/** Bounded loading indicator for workspace transitions — never a full-page blocker. */
export function WorkspaceLoader({ className, label }: WorkspaceLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 py-16 text-muted-foreground",
        className,
      )}
      role="status"
      aria-live="polite"
      data-workspace="loader"
    >
      <LoaderCircle className="size-icon-md animate-spin" aria-hidden strokeWidth={1.5} />
      <span className="type-body">{label ?? t("common.loading")}</span>
    </div>
  );
}
