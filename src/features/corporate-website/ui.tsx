"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { slideUpVariants } from "@/animations/presets";
import { useMotion } from "@/hooks/useMotion";
import { cn } from "@/utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { durationSeconds, prefersReducedMotion } = useMotion();

  return (
    <motion.div
      className={className}
      variants={slideUpVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.15 }}
      transition={
        prefersReducedMotion
          ? { duration: durationSeconds("instant") }
          : { duration: durationSeconds("base"), delay }
      }
    >
      {children}
    </motion.div>
  );
}

export function primaryButtonClassName() {
  return cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-md bg-brand px-6",
    "type-body font-medium text-brand-foreground transition-colors duration-fast ease-enter",
    "hover:bg-brand-hover",
  );
}

export function secondaryButtonClassName() {
  return cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-md border border-border px-6",
    "type-body font-medium text-foreground transition-colors duration-fast ease-enter",
    "hover:bg-surface-muted",
  );
}

export function PageIntro({
  eyebrow,
  title,
  support,
}: {
  eyebrow?: string;
  title: string;
  support?: string;
}) {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-12 md:px-6 md:py-16">
      <Reveal>
        {eyebrow ? <p className="type-label text-brand">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-balance type-h1 text-foreground">{title}</h1>
        {support ? (
          <p className="mt-3 max-w-2xl type-body-lg text-muted-foreground">{support}</p>
        ) : null}
      </Reveal>
    </div>
  );
}
