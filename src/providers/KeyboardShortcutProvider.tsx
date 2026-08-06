"use client";

import * as React from "react";

import { useCommands } from "@/providers/CommandProvider";
import { usePresentation } from "@/providers/PresentationProvider";

type ShortcutHandler = (event: KeyboardEvent) => void;

type KeyboardShortcutContextValue = {
  registerShortcut: (combo: string, handler: ShortcutHandler) => () => void;
};

const KeyboardShortcutContext = React.createContext<KeyboardShortcutContextValue | null>(null);

function normalizeCombo(event: KeyboardEvent): string {
  const parts: string[] = [];
  if (event.metaKey || event.ctrlKey) parts.push("mod");
  if (event.altKey) parts.push("alt");
  if (event.shiftKey) parts.push("shift");
  parts.push(event.key.toLowerCase());
  return parts.join("+");
}

/**
 * Keyboard manager foundation (docs/16 §3).
 * Registers Presentation Mode defaults (P, F) and go-prefix chords (G then X).
 */
export function KeyboardShortcutProvider({ children }: { children: React.ReactNode }) {
  const handlersRef = React.useRef(new Map<string, Set<ShortcutHandler>>());
  const chordRef = React.useRef<{ prefix: string; expiresAt: number } | null>(null);
  const { togglePresentationMode, toggleFullscreen } = usePresentation();
  const { registerCommand } = useCommands();

  const registerShortcut = React.useCallback((combo: string, handler: ShortcutHandler) => {
    const key = combo.toLowerCase();
    const set = handlersRef.current.get(key) ?? new Set<ShortcutHandler>();
    set.add(handler);
    handlersRef.current.set(key, set);
    return () => {
      set.delete(handler);
      if (set.size === 0) handlersRef.current.delete(key);
    };
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      const key = event.key.toLowerCase();
      const now = Date.now();

      // Go-prefix chords: G then D / H / S (docs/16 §3)
      if (chordRef.current && chordRef.current.expiresAt > now) {
        const chord = `${chordRef.current.prefix}+${key}`;
        chordRef.current = null;
        const chordHandlers = handlersRef.current.get(chord);
        if (chordHandlers && chordHandlers.size > 0) {
          event.preventDefault();
          chordHandlers.forEach((handler) => handler(event));
          return;
        }
      } else {
        chordRef.current = null;
      }

      if (key === "g" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        chordRef.current = { prefix: "g", expiresAt: now + 800 };
        return;
      }

      const combo = normalizeCombo(event);
      const handlers = handlersRef.current.get(combo);
      if (!handlers || handlers.size === 0) return;
      event.preventDefault();
      handlers.forEach((handler) => handler(event));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Built-in presentation shortcuts (architecture wiring)
  React.useEffect(() => {
    const offP = registerShortcut("p", () => togglePresentationMode());
    const offF = registerShortcut("f", () => toggleFullscreen());
    return () => {
      offP();
      offF();
    };
  }, [registerShortcut, togglePresentationMode, toggleFullscreen]);

  React.useEffect(() => {
    const offPresentation = registerCommand({
      id: "presentation.toggle",
      label: "Toggle Presentation Mode",
      section: "presentation",
      keywords: ["present", "demo"],
      shortcutHint: "P",
      run: () => togglePresentationMode(),
    });
    const offFullscreen = registerCommand({
      id: "presentation.fullscreen",
      label: "Toggle Fullscreen",
      section: "presentation",
      keywords: ["fullscreen", "projector"],
      shortcutHint: "F",
      run: () => toggleFullscreen(),
    });
    return () => {
      offPresentation();
      offFullscreen();
    };
  }, [registerCommand, togglePresentationMode, toggleFullscreen]);

  const value = React.useMemo(() => ({ registerShortcut }), [registerShortcut]);

  return (
    <KeyboardShortcutContext.Provider value={value}>{children}</KeyboardShortcutContext.Provider>
  );
}

export function useKeyboardShortcuts(): KeyboardShortcutContextValue {
  const ctx = React.useContext(KeyboardShortcutContext);
  if (!ctx) {
    throw new Error("useKeyboardShortcuts must be used within KeyboardShortcutProvider");
  }
  return ctx;
}
