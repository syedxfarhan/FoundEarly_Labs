"use client";

import * as React from "react";

import { MotionProvider } from "@/providers/MotionProvider";
import { PresentationProvider } from "@/providers/PresentationProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { TooltipProvider } from "@/providers/TooltipProvider";
import { CommandProvider } from "@/providers/CommandProvider";
import { KeyboardShortcutProvider } from "@/providers/KeyboardShortcutProvider";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { ShellUiProvider } from "@/providers/ShellUiProvider";

/**
 * Modular provider composition root (docs/07 §8, docs/10).
 * Order: theme → locale → motion → presentation → shell UI → command/keyboard → overlays.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <MotionProvider>
          <PresentationProvider>
            <NotificationProvider>
              <CommandProvider>
                <ShellUiProvider>
                  <KeyboardShortcutProvider>
                    <TooltipProvider>
                      {children}
                      <ToastProvider />
                    </TooltipProvider>
                  </KeyboardShortcutProvider>
                </ShellUiProvider>
              </CommandProvider>
            </NotificationProvider>
          </PresentationProvider>
        </MotionProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
