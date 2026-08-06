"use client";

import { AnimatePresence, motion } from "framer-motion";

import { workspaceTransitionVariants } from "@/animations/presets";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/utils/cn";

export type WorkspaceTransitionProps = {
  transitionKey: string;
  children: React.ReactNode;
  className?: string;
};

/** Content cross-fade only — shell stays still (docs/05 §7). */
export function WorkspaceTransition({
  transitionKey,
  children,
  className,
}: WorkspaceTransitionProps) {
  const { durationSeconds, prefersReducedMotion } = useMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        className={cn("min-h-full", className)}
        variants={workspaceTransitionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={
          prefersReducedMotion
            ? { duration: durationSeconds("instant") }
            : { duration: durationSeconds("base") }
        }
        data-workspace="transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
