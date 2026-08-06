import type { Transition, Variants } from "framer-motion";

import { motion } from "@/config/tokens";

/**
 * Reusable motion presets (docs/05). No page-level orchestration in Phase 1.1.
 * Durations are defaults — prefer useMotion().durationSeconds at call sites when
 * reduced-motion resolution is required.
 */

const enterEase = motion.easeEnter;
const exitEase = motion.easeExit;

export const fadeTransition: Transition = {
  duration: motion.base / 1000,
  ease: enterEase,
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: fadeTransition },
  exit: { opacity: 0, transition: { duration: motion.fast / 1000, ease: exitEase } },
};

export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: motion.base / 1000, ease: enterEase },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: motion.fast / 1000, ease: exitEase },
  },
};

/** Workspace / page content cross-fade (docs/05 §7) — no directional slide. */
export const workspaceTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: motion.base / 1000, ease: enterEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: motion.base / 1000, ease: exitEase },
  },
};

export const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: motion.moderate / 1000, ease: enterEase },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: motion.base / 1000, ease: exitEase },
  },
};

/** Dialog enter/exit (docs/05 §6). */
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: motion.moderate / 1000, ease: enterEase },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: motion.base / 1000, ease: exitEase },
  },
};

export const modalBackdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: motion.base / 1000, ease: enterEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: motion.base / 1000, ease: exitEase },
  },
};

/** Drawer slide from inline-end (logical; use custom x in RTL-aware wrappers later). */
export const drawerVariants: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: motion.moderate / 1000, ease: enterEase },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: motion.moderate / 1000, ease: exitEase },
  },
};

/** Hover: opacity/elevation only — no layout shift (docs/05 §4). */
export const hoverTransition: Transition = {
  duration: motion.fast / 1000,
  ease: enterEase,
};

/** Loading / skeleton fade. */
export const loadingVariants: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: 1,
    transition: { duration: motion.base / 1000, ease: enterEase },
  },
};

/** Stagger helper for Capability Reveal / dashboard mount (docs/05 §8–9). */
export function createStaggerContainer(staggerSeconds = 0.04): Variants {
  return {
    animate: {
      transition: {
        staggerChildren: staggerSeconds,
        delayChildren: 0,
        // Callers must slice children to STAGGER_MAX_CHILDREN (docs/05 §8).
      },
    },
  };
}

export const STAGGER_MAX_CHILDREN = 6;
export const CAPABILITY_REVEAL_STAGGER_S = 0.15;
export const DASHBOARD_STAGGER_S = 0.04;
