"use client";

import * as React from "react";
import { MotionConfig, useReducedMotion as useFramerReducedMotion } from "framer-motion";

import { resolveMotionDuration, type MotionDurationToken } from "@/lib/motion";

type MotionContextValue = {
  prefersReducedMotion: boolean;
  duration: (token: MotionDurationToken) => number;
  durationSeconds: (token: MotionDurationToken) => number;
};

const MotionContext = React.createContext<MotionContextValue | null>(null);

/**
 * Central motion preference + duration resolver (docs/05 §10).
 * Components should consume via useMotion() — never fork reduced-motion locally.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const framerReduced = useFramerReducedMotion();
  const prefersReducedMotion = Boolean(framerReduced);

  const value = React.useMemo<MotionContextValue>(
    () => ({
      prefersReducedMotion,
      duration: (token) => resolveMotionDuration(token, prefersReducedMotion),
      durationSeconds: (token) => resolveMotionDuration(token, prefersReducedMotion) / 1000,
    }),
    [prefersReducedMotion],
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionContextValue {
  const ctx = React.useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotion must be used within MotionProvider");
  }
  return ctx;
}
