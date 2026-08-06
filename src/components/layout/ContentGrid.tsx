import * as React from "react";

import { cn } from "@/utils/cn";

export type ContentGridProps = {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "sm" | "md" | "lg";
};

const columnClass: Record<NonNullable<ContentGridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
  12: "grid-cols-12",
};

const gapClass: Record<NonNullable<ContentGridProps["gap"]>, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-12",
};

/** 12-column responsive content grid with token gutters. */
export function ContentGrid({
  children,
  className,
  columns = 12,
  gap = "md",
}: ContentGridProps) {
  return (
    <div
      className={cn("grid", columnClass[columns], gapClass[gap], className)}
      data-layout="content-grid"
    >
      {children}
    </div>
  );
}
