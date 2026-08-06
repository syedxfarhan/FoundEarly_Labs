import * as React from "react";

import { cn } from "@/utils/cn";

export type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Narrative surfaces use content max-width; workspaces stay fluid. */
  constrained?: boolean;
  as?: "div" | "section" | "article";
};

/** Content region padding + optional max-width (docs/02 §5). */
export function PageContainer({
  children,
  className,
  constrained = false,
  as: Comp = "div",
}: PageContainerProps) {
  return (
    <Comp
      className={cn(
        "w-full px-4 py-6 md:px-6 md:py-8",
        constrained && "mx-auto max-w-content",
        className,
      )}
      data-layout="page-container"
    >
      {children}
    </Comp>
  );
}
