"use client";

import { Toaster } from "sonner";

/** Toast host — sonner wired to design tokens (docs/04 Toast). */
export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      closeButton
      theme="system"
      toastOptions={{
        classNames: {
          toast:
            "group border border-border bg-surface text-foreground shadow-elevation_2 rounded-lg",
          title: "text-body font-medium",
          description: "text-body-sm text-muted-foreground",
          actionButton: "bg-brand text-brand-foreground",
          cancelButton: "bg-muted text-muted-foreground",
          error: "border-semantic-danger/40",
          success: "border-semantic-success/40",
          warning: "border-semantic-warning/40",
          info: "border-semantic-info/40",
        },
      }}
    />
  );
}
