"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, HardHat, type LucideIcon } from "lucide-react";

import { MainLandmark } from "@/components/system/MainLandmark";
import { slideUpVariants } from "@/animations/presets";
import { getShowcaseDemos, type ShowcaseDemo } from "@/config/showcase";
import { useMotion } from "@/hooks/useMotion";
import { useT, useTKey } from "@/lib/content";
import { cn } from "@/utils/cn";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  HardHat,
};

function Reveal({
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
      viewport={{ once: true, amount: 0.2 }}
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

function DemoCard({ demo, index }: { demo: ShowcaseDemo; index: number }) {
  const t = useT();
  const tKey = useTKey();
  const Icon = iconMap[demo.icon] ?? Globe;

  return (
    <Reveal delay={Math.min(index, 3) * 0.04} className="h-full">
      <article
        className={cn(
          "flex h-full flex-col gap-6 rounded-lg border border-border bg-surface p-8 md:p-10",
          "transition-colors duration-fast ease-enter hover:border-border-strong",
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-md bg-brand/10 text-brand">
          <Icon className="size-icon-lg" strokeWidth={1.5} aria-hidden />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <h2 className="type-h2 text-foreground">{tKey(demo.labelKey)}</h2>
          <p className="max-w-md type-body-lg text-muted-foreground">{t(demo.descriptionKey)}</p>
        </div>
        <Link
          href={demo.href}
          className={cn(
            "inline-flex min-h-touch w-fit items-center justify-center gap-2 rounded-md bg-brand px-5",
            "type-body font-medium text-brand-foreground transition-colors duration-fast ease-enter",
            "hover:bg-brand-hover",
          )}
        >
          {t("showcase.openDemo")}
          <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
        </Link>
      </article>
    </Reveal>
  );
}

/**
 * Interactive Showcase hub — launcher for completed demos only.
 * No placeholders, locked cards, or roadmap content.
 */
export function ShowcaseHub() {
  const t = useT();
  const demos = getShowcaseDemos();

  return (
    <div className="min-h-svh bg-background text-foreground" data-surface="showcase-hub">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 rounded-md">
            <span
              className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground type-label"
              aria-hidden
            >
              FE
            </span>
            <span className="type-body font-medium">{t("common.brand.full")}</span>
          </Link>
          <Link
            href="/"
            className="min-h-touch inline-flex items-center px-3 type-body text-muted-foreground transition-colors duration-fast ease-enter hover:text-foreground"
          >
            {t("showcase.backHome")}
          </Link>
        </div>
      </header>

      <MainLandmark>
        <section className="border-b border-border">
          <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
            <Reveal className="max-w-2xl space-y-3">
              <h1 className="type-display text-foreground">{t("showcase.title")}</h1>
              <p className="type-body-lg text-muted-foreground">{t("showcase.support")}</p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {demos.map((demo, index) => (
                <DemoCard key={demo.workspaceId} demo={demo} index={index} />
              ))}
            </div>
          </div>
        </section>
      </MainLandmark>
    </div>
  );
}
