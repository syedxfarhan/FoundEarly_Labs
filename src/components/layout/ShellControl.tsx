"use client";

import * as React from "react";

import { cn } from "@/utils/cn";

export type ShellControlProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Accessible name — required for icon-only chrome controls. */
  "aria-label": string;
  active?: boolean;
};

/**
 * Minimal chrome control for the application shell.
 * Not the design-system Button (docs/04 §3.1) — that ships with the component library phase.
 * Hit target ≥40×40 per docs/02 §9.
 */
export function ShellControl({
  className,
  active,
  type = "button",
  children,
  ...props
}: ShellControlProps) {
  return (
    <button
      type={type}
      data-active={active ? "true" : undefined}
      className={cn(
        "inline-flex min-h-touch min-w-touch items-center justify-center gap-2 rounded-md px-2",
        "text-muted-foreground transition-colors duration-fast ease-enter",
        "hover:bg-surface-muted hover:text-foreground",
        "data-[active=true]:bg-brand/10 data-[active=true]:text-brand",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
