"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Building2,
  Factory,
  FileStack,
  Globe,
  LayoutDashboard,
  MonitorSmartphone,
  Network,
  PencilRuler,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { MainLandmark } from "@/components/system/MainLandmark";
import { slideUpVariants } from "@/animations/presets";
import { workspaceHref } from "@/config/workspaces";
import { useMotion } from "@/hooks/useMotion";
import { t, type ContentKey } from "@/lib/content";
import { cn } from "@/utils/cn";

const SHOWCASE_HREF = workspaceHref("project-command", "overview");

const TRUST_KEYS: ContentKey[] = [
  "landing.trust.customSoftware",
  "landing.trust.aiAutomation",
  "landing.trust.dashboards",
  "landing.trust.workflows",
  "landing.trust.businessAutomation",
  "landing.trust.webPlatforms",
];

const AUDIENCE: Array<{ labelKey: ContentKey; icon: LucideIcon }> = [
  { labelKey: "landing.audience.general", icon: Building2 },
  { labelKey: "landing.audience.mep", icon: Workflow },
  { labelKey: "landing.audience.civil", icon: PencilRuler },
  { labelKey: "landing.audience.industrial", icon: Factory },
  { labelKey: "landing.audience.engineering", icon: Network },
  { labelKey: "landing.audience.aramco", icon: ShieldCheck },
];

const BUILD: Array<{ titleKey: ContentKey; bodyKey: ContentKey; icon: LucideIcon }> = [
  {
    titleKey: "landing.build.websites.title",
    bodyKey: "landing.build.websites.body",
    icon: Globe,
  },
  {
    titleKey: "landing.build.contractor.title",
    bodyKey: "landing.build.contractor.body",
    icon: Building2,
  },
  {
    titleKey: "landing.build.ai.title",
    bodyKey: "landing.build.ai.body",
    icon: Bot,
  },
  {
    titleKey: "landing.build.dashboards.title",
    bodyKey: "landing.build.dashboards.body",
    icon: LayoutDashboard,
  },
  {
    titleKey: "landing.build.mobile.title",
    bodyKey: "landing.build.mobile.body",
    icon: MonitorSmartphone,
  },
  {
    titleKey: "landing.build.automation.title",
    bodyKey: "landing.build.automation.body",
    icon: Workflow,
  },
  {
    titleKey: "landing.build.documents.title",
    bodyKey: "landing.build.documents.body",
    icon: FileStack,
  },
];

const WHY: Array<{ traditionalKey: ContentKey; oursKey: ContentKey }> = [
  {
    traditionalKey: "landing.why.item1.traditional",
    oursKey: "landing.why.item1.ours",
  },
  {
    traditionalKey: "landing.why.item2.traditional",
    oursKey: "landing.why.item2.ours",
  },
  {
    traditionalKey: "landing.why.item3.traditional",
    oursKey: "landing.why.item3.ours",
  },
  {
    traditionalKey: "landing.why.item4.traditional",
    oursKey: "landing.why.item4.ours",
  },
  {
    traditionalKey: "landing.why.item5.traditional",
    oursKey: "landing.why.item5.ours",
  },
];

function primaryLinkClassName() {
  return cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-md bg-brand px-6",
    "type-body font-medium text-brand-foreground transition-colors duration-fast ease-enter",
    "hover:bg-brand-hover",
  );
}

function secondaryLinkClassName() {
  return cn(
    "inline-flex min-h-touch items-center justify-center gap-2 rounded-md border border-border px-6",
    "type-body font-medium text-foreground transition-colors duration-fast ease-enter",
    "hover:bg-surface-muted",
  );
}

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

/**
 * Credibility Landing — entry narrative surface (docs/03 §2).
 * Outside WorkspaceShell; brand is hero-level (docs/19 §1.2).
 */
export function CredibilityLanding() {
  return (
    <div className="min-h-svh bg-background text-foreground" data-surface="credibility-landing">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 md:px-6">
          <a href="#main-content" className="flex items-center gap-3 rounded-md">
            <span
              className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground type-label"
              aria-hidden
            >
              FE
            </span>
            <span className="type-body font-medium">{t("landing.hero.brand")}</span>
          </a>
          <nav className="flex items-center gap-2" aria-label="Landing">
            <a
              href="#what-we-build"
              className="hidden min-h-touch items-center px-3 type-body text-muted-foreground hover:text-foreground md:inline-flex"
            >
              {t("landing.nav.solutions")}
            </a>
            <Link href={SHOWCASE_HREF} className={secondaryLinkClassName()}>
              {t("landing.nav.showcase")}
            </Link>
          </nav>
        </div>
      </header>

      <MainLandmark>
        {/* Hero */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-16 md:px-6 md:py-24 lg:py-32">
            <Reveal>
              <p className="type-label text-brand">{t("landing.hero.brand")}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="max-w-4xl text-balance type-display text-foreground">
                {t("landing.hero.headline")}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-2xl type-body-lg text-muted-foreground">
                {t("landing.hero.support")}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex flex-wrap items-center gap-3">
                <a href="#what-we-build" className={primaryLinkClassName()}>
                  {t("landing.hero.ctaPrimary")}
                  <ArrowDown className="size-icon-sm" strokeWidth={1.5} aria-hidden />
                </a>
                <Link href={SHOWCASE_HREF} className={secondaryLinkClassName()}>
                  {t("landing.hero.ctaSecondary")}
                  <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust strip */}
        <section aria-label="Capabilities" className="border-b border-border bg-surface-muted/40">
          <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6 md:px-6">
            {TRUST_KEYS.map((key) => (
              <span key={key} className="type-body-sm font-medium text-muted-foreground">
                {t(key)}
              </span>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-content gap-8 px-4 py-16 md:grid-cols-12 md:px-6 md:py-24">
            <Reveal className="md:col-span-4">
              <h2 className="type-h2 text-foreground">{t("landing.about.title")}</h2>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.04}>
              <p className="max-w-2xl type-body-lg text-muted-foreground">{t("landing.about.body")}</p>
            </Reveal>
          </div>
        </section>

        {/* Who we help */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
            <Reveal className="max-w-2xl space-y-3">
              <h2 className="type-h2 text-foreground">{t("landing.audience.title")}</h2>
              <p className="type-body text-muted-foreground">{t("landing.audience.support")}</p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIENCE.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.labelKey} delay={Math.min(index, 5) * 0.03}>
                    <div className="flex min-h-touch items-center gap-3 rounded-lg border border-border bg-background px-4 py-5">
                      <Icon
                        className="size-icon-md shrink-0 text-brand"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="type-body font-medium text-foreground">{t(item.labelKey)}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* What we build */}
        <section id="what-we-build" className="border-b border-border scroll-mt-20">
          <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
            <Reveal className="max-w-2xl space-y-3">
              <h2 className="type-h2 text-foreground">{t("landing.build.title")}</h2>
              <p className="type-body text-muted-foreground">{t("landing.build.support")}</p>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {BUILD.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.titleKey} delay={Math.min(index, 5) * 0.03}>
                    <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-6">
                      <Icon
                        className="size-icon-lg text-brand"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <h3 className="type-h3 text-foreground">{t(item.titleKey)}</h3>
                      <p className="type-body text-muted-foreground">{t(item.bodyKey)}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why FoundEarly */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-24">
            <Reveal className="max-w-2xl space-y-3">
              <h2 className="type-h2 text-foreground">{t("landing.why.title")}</h2>
              <p className="type-body text-muted-foreground">{t("landing.why.support")}</p>
            </Reveal>
            <Reveal>
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
                  <div className="bg-surface-muted/50 px-4 py-4 md:px-6">
                    <p className="type-label text-muted-foreground">{t("landing.why.traditional")}</p>
                  </div>
                  <div className="border-t border-border bg-brand/5 px-4 py-4 md:border-t-0 md:border-s md:px-6">
                    <p className="type-label text-brand">{t("landing.why.foundearly")}</p>
                  </div>
                </div>
                {WHY.map((row) => (
                  <div
                    key={row.oursKey}
                    className="grid grid-cols-1 border-b border-border last:border-b-0 md:grid-cols-2"
                  >
                    <div className="px-4 py-4 type-body text-muted-foreground md:px-6">
                      {t(row.traditionalKey)}
                    </div>
                    <div className="border-t border-border px-4 py-4 type-body font-medium text-foreground md:border-t-0 md:border-s md:px-6">
                      {t(row.oursKey)}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-background">
          <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-4 py-16 md:px-6 md:py-24">
            <Reveal className="max-w-2xl space-y-3">
              <h2 className="type-h1 text-foreground">{t("landing.cta.title")}</h2>
              <p className="type-body-lg text-muted-foreground">{t("landing.cta.support")}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <Link href={SHOWCASE_HREF} className={primaryLinkClassName()}>
                {t("landing.cta.action")}
                <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>
      </MainLandmark>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-6 md:px-6">
          <p className="type-body-sm text-muted-foreground">{t("common.brand.full")}</p>
          <p className="type-body-sm text-muted-foreground">{t("common.product")}</p>
        </div>
      </footer>
    </div>
  );
}
