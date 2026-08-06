"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

export type PortalLayerProps = {
  children: React.ReactNode;
  /** Mount target — defaults to document.body */
  container?: Element | null;
};

/** Portal host for overlays that must escape stacking contexts. */
export function PortalLayer({ children, container }: PortalLayerProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const target = container ?? (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;
  return createPortal(children, target);
}

export type OverlayLayerProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  /** When true, clicking the backdrop closes */
  dismissOnBackdrop?: boolean;
  labelledBy?: string;
  describedBy?: string;
};

/**
 * Global overlay layer — backdrop + focus trap shell.
 * Lazy-friendly: parent should not render until needed.
 */
export function OverlayLayer({
  open,
  onClose,
  children,
  className,
  dismissOnBackdrop = true,
  labelledBy,
  describedBy,
}: OverlayLayerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <PortalLayer>
      <div className="fixed inset-0 z-50" data-layout="overlay-layer" role="presentation">
        <button
          type="button"
          aria-label="Close overlay"
          className="absolute inset-0 bg-neutral-900/40 transition-opacity duration-base ease-enter"
          onClick={() => {
            if (dismissOnBackdrop) onClose?.();
          }}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          aria-describedby={describedBy}
          className={cn("relative z-10", className)}
        >
          {children}
        </div>
      </div>
    </PortalLayer>
  );
}
