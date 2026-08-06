import * as React from "react";

import { cn } from "@/utils/cn";

export type SectionProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
};

/** One purpose, one headline (docs/02 layout principles). */
export function Section({ title, description, children, className, actions }: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-6", className)} data-layout="section">
      {title || description || actions ? (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 space-y-1">
            {title ? <h2 className="type-h2 text-foreground">{title}</h2> : null}
            {description ? (
              <p className="max-w-2xl type-body text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
