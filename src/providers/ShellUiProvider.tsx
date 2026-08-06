"use client";

import * as React from "react";

import { overlayIds } from "@/config/constants";

export type OverlayId = (typeof overlayIds)[keyof typeof overlayIds];

type ShellUiContextValue = {
  openOverlay: OverlayId | null;
  setOpenOverlay: (id: OverlayId | null) => void;
  toggleOverlay: (id: OverlayId) => void;
  closeOverlay: () => void;
  isOverlayOpen: (id: OverlayId) => boolean;
};

const ShellUiContext = React.createContext<ShellUiContextValue | null>(null);

/**
 * Global overlay coordination — command palette, search, notifications.
 * Esc closes the topmost overlay (docs/16 §3).
 */
export function ShellUiProvider({ children }: { children: React.ReactNode }) {
  const [openOverlay, setOpenOverlay] = React.useState<OverlayId | null>(null);

  const closeOverlay = React.useCallback(() => setOpenOverlay(null), []);

  const toggleOverlay = React.useCallback((id: OverlayId) => {
    setOpenOverlay((current) => (current === id ? null : id));
  }, []);

  const isOverlayOpen = React.useCallback(
    (id: OverlayId) => openOverlay === id,
    [openOverlay],
  );

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggleOverlay(overlayIds.commandPalette);
        return;
      }

      if (!typing && event.key === "/" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        toggleOverlay(overlayIds.globalSearch);
        return;
      }

      if (event.key === "Escape" && openOverlay) {
        event.preventDefault();
        closeOverlay();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openOverlay, toggleOverlay, closeOverlay]);

  const value = React.useMemo<ShellUiContextValue>(
    () => ({
      openOverlay,
      setOpenOverlay,
      toggleOverlay,
      closeOverlay,
      isOverlayOpen,
    }),
    [openOverlay, toggleOverlay, closeOverlay, isOverlayOpen],
  );

  return <ShellUiContext.Provider value={value}>{children}</ShellUiContext.Provider>;
}

export function useShellUi(): ShellUiContextValue {
  const ctx = React.useContext(ShellUiContext);
  if (!ctx) {
    throw new Error("useShellUi must be used within ShellUiProvider");
  }
  return ctx;
}
