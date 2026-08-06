import { motion } from "@/config/tokens";

export type MotionDurationToken =
  | "instant"
  | "fast"
  | "base"
  | "moderate"
  | "slow"
  | "deliberate";

const DURATION_MS: Record<MotionDurationToken, number> = {
  instant: motion.instant,
  fast: motion.fast,
  base: motion.base,
  moderate: motion.moderate,
  slow: motion.slow,
  deliberate: motion.deliberateMin,
};

/**
 * Central reduced-motion resolver (docs/05 §10, docs/09 §7).
 * Collapse long durations when reduced motion is preferred.
 */
export function resolveMotionDuration(
  token: MotionDurationToken,
  prefersReducedMotion: boolean,
): number {
  if (!prefersReducedMotion) {
    return DURATION_MS[token];
  }

  if (token === "instant") return 0;
  if (token === "fast" || token === "base") return DURATION_MS.fast;
  return DURATION_MS.fast;
}

export function resolveMotionSeconds(
  token: MotionDurationToken,
  prefersReducedMotion: boolean,
): number {
  return resolveMotionDuration(token, prefersReducedMotion) / 1000;
}
