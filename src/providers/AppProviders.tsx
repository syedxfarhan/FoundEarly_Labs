"use client";

import * as React from "react";

import { MotionProvider } from "@/providers/MotionProvider";
import { PresentationProvider } from "@/providers/PresentationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { TooltipProvider } from "@/providers/TooltipProvider";
import { CommandProvider } from "@/providers/CommandProvider";
import { KeyboardShortcutProvider } from "@/providers/KeyboardShortcutProvider";

/**
 * Modular provider composition root (docs/07 §8, docs/10).
 * Order: theme → motion → presentation → command/keyboard → overlays.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MotionProvider>
        <PresentationProvider>
          <CommandProvider>
            <KeyboardShortcutProvider>
              <TooltipProvider>
                {children}
                <ToastProvider />
              </TooltipProvider>
            </KeyboardShortcutProvider>
          </CommandProvider>
        </PresentationProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
