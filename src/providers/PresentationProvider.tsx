"use client";

import * as React from "react";

import type { ProjectCode } from "@/types/workspace";
import { enterFullscreen, exitFullscreen, toggleFullscreen as toggleFullscreenDom } from "@/lib/fullscreen";

export type PresentationState = {
  isPresentationMode: boolean;
  isFullscreen: boolean;
  activeProjectCode: ProjectCode;
  presenterNotesOpen: boolean;
};

type PresentationContextValue = PresentationState & {
  setPresentationMode: (enabled: boolean) => void;
  togglePresentationMode: () => void;
  setFullscreen: (enabled: boolean) => void;
  toggleFullscreen: () => void;
  setActiveProjectCode: (code: ProjectCode) => void;
  setPresenterNotesOpen: (open: boolean) => void;
  resetDemoState: () => void;
};

const DEFAULT_PROJECT: ProjectCode = "P-1042";

const PresentationContext = React.createContext<PresentationContextValue | null>(null);

/**
 * Presentation Mode architecture only — no Presenter Toolbar UI in Phase 1.1.
 * See docs/16_PRESENTATION_MODE_GUIDE.md.
 */
export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [isPresentationMode, setPresentationMode] = React.useState(false);
  const [isFullscreen, setFullscreenState] = React.useState(false);
  const [activeProjectCode, setActiveProjectCode] = React.useState<ProjectCode>(DEFAULT_PROJECT);
  const [presenterNotesOpen, setPresenterNotesOpen] = React.useState(false);

  const setFullscreen = React.useCallback(async (enabled: boolean) => {
    if (typeof document === "undefined") return;
    try {
      if (enabled) {
        await enterFullscreen();
      } else {
        await exitFullscreen();
      }
    } catch {
      // Fullscreen may be blocked — state syncs via fullscreenchange.
    }
  }, []);

  React.useEffect(() => {
    const onChange = () => {
      setFullscreenState(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.presentation = isPresentationMode ? "true" : "false";
  }, [isPresentationMode]);

  const resetDemoState = React.useCallback(() => {
    setActiveProjectCode(DEFAULT_PROJECT);
    setPresenterNotesOpen(false);
  }, []);

  const value = React.useMemo<PresentationContextValue>(
    () => ({
      isPresentationMode,
      isFullscreen,
      activeProjectCode,
      presenterNotesOpen,
      setPresentationMode,
      togglePresentationMode: () => setPresentationMode((v) => !v),
      setFullscreen,
      toggleFullscreen: () => {
        void toggleFullscreenDom().catch(() => undefined);
      },
      setActiveProjectCode,
      setPresenterNotesOpen,
      resetDemoState,
    }),
    [
      isPresentationMode,
      isFullscreen,
      activeProjectCode,
      presenterNotesOpen,
      setFullscreen,
      resetDemoState,
    ],
  );

  return (
    <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>
  );
}

export function usePresentation(): PresentationContextValue {
  const ctx = React.useContext(PresentationContext);
  if (!ctx) {
    throw new Error("usePresentation must be used within PresentationProvider");
  }
  return ctx;
}
