import * as React from "react";

import { cn } from "@/utils/cn";

export type AppShellProps = {
  topBar: React.ReactNode;
  navigation?: React.ReactNode;
  children: React.ReactNode;
  utility?: React.ReactNode;
  className?: string;
  /** Presentation mode quiets secondary chrome via CSS var --chrome-opacity */
  presentation?: boolean;
};

/**
 * Persistent application frame: top bar + nav rail + canvas + optional utility.
 * Shell never re-animates on route change (docs/05 §7).
 */
export function AppShell({
  topBar,
  navigation,
  children,
  utility,
  className,
  presentation = false,
}: AppShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col bg-background text-foreground",
        "xl:min-h-svh",
        className,
      )}
      data-shell="app"
      data-presentation={presentation ? "true" : undefined}
    >
      <div className="sticky top-0 z-40 shrink-0 border-b border-border bg-surface/95 backdrop-blur-sm">
        {topBar}
      </div>
      <div className="flex min-h-0 flex-1">
        {navigation ? (
          <aside
            className={cn(
              "hidden w-sidebar shrink-0 border-e border-border bg-surface md:flex md:flex-col",
              "transition-opacity duration-moderate ease-enter",
            )}
            style={{ opacity: presentation ? "var(--chrome-opacity)" : undefined }}
            data-shell="navigation"
          >
            {navigation}
          </aside>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col" data-shell="workspace">
          {children}
        </div>
        {utility ? (
          <aside
            className={cn(
              "hidden w-sidebar shrink-0 border-s border-border bg-surface xl:flex xl:flex-col",
              "transition-opacity duration-moderate ease-enter",
            )}
            style={{ opacity: presentation ? "var(--chrome-opacity)" : undefined }}
            data-shell="utility"
            aria-label="Contextual utilities"
          >
            {utility}
          </aside>
        ) : null}
      </div>
    </div>
  );
}
