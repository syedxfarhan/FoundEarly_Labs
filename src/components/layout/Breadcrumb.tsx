import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbItem } from "@/types/navigation";
import { cn } from "@/utils/cn";

export type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
  className?: string;
  "aria-label"?: string;
};

/** Secondary orientation breadcrumbs (docs/03 §4). */
export function Breadcrumb({
  items,
  className,
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cn("min-w-0", className)} data-layout="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 type-body-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.id} className="inline-flex min-w-0 items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-icon-sm shrink-0 opacity-60" aria-hidden />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="truncate rounded-sm hover:text-foreground focus-visible:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn("truncate", isLast && "font-medium text-foreground")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
