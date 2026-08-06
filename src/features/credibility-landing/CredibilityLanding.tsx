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
import { SHOWCASE_PATH } from "@/config/showcase";
import { workspaceHref } from "@/config/workspaces";
import { useMotion } from "@/hooks/useMotion";
import { type ContentKey, useT } from "@/lib/content";
import { cn } from "@/utils/cn";

const SHOWCASE_HREF = SHOWCASE_PATH;
const WEBSITE_DEMO_HREF = workspaceHref("corporate-website", "home");
const CONTRACTOR_OS_HREF = workspaceHref("contractor-os", "dashboard");

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

const PHILOSOPHY_KEYS: ContentKey[] = [
  "landing.philosophy.item1",
  "landing.philosophy.item2",
  "landing.philosophy.item3",
  "landing.philosophy.item4",
];

const COMPANY_INFO_ROWS: Array<{ labelKey: ContentKey; valueKey: ContentKey }> = [
  {
    labelKey: "landing.companyInfo.legalName",
    valueKey: "landing.companyInfo.legalName.value",
  },
  { labelKey: "landing.companyInfo.type", valueKey: "landing.companyInfo.type.value" },
  { labelKey: "landing.companyInfo.country", valueKey: "landing.companyInfo.country.value" },
  { labelKey: "landing.companyInfo.office", valueKey: "landing.companyInfo.office.value" },
  { labelKey: "landing.companyInfo.cin", valueKey: "landing.companyInfo.cin.value" },
  { labelKey: "landing.companyInfo.gstin", valueKey: "landing.companyInfo.gstin.value" },
  { labelKey: "landing.companyInfo.pan", valueKey: "landing.companyInfo.pan.value" },
  { labelKey: "landing.companyInfo.tan", valueKey: "landing.companyInfo.tan.value" },
  { labelKey: "landing.companyInfo.year", valueKey: "landing.companyInfo.year.value" },
  { labelKey: "landing.companyInfo.founder", valueKey: "landing.companyInfo.founder.value" },
  { labelKey: "landing.companyInfo.email", valueKey: "landing.companyInfo.email.value" },
  { labelKey: "landing.companyInfo.website", valueKey: "landing.companyInfo.website.value" },
  { labelKey: "landing.companyInfo.hours", valueKey: "landing.companyInfo.hours.value" },
  {
    labelKey: "landing.companyInfo.industries",
    valueKey: "landing.companyInfo.industries.value",
  },
];

const CLIENTS_WHY: Array<{ titleKey: ContentKey; bodyKey: ContentKey }> = [
  {
    titleKey: "landing.clientsWhy.workflow.title",
    bodyKey: "landing.clientsWhy.workflow.body",
  },
  { titleKey: "landing.clientsWhy.ux.title", bodyKey: "landing.clientsWhy.ux.body" },
  { titleKey: "landing.clientsWhy.ai.title", bodyKey: "landing.clientsWhy.ai.body" },
  {
    titleKey: "landing.clientsWhy.analytics.title",
    bodyKey: "landing.clientsWhy.analytics.body",
  },
  {
    titleKey: "landing.clientsWhy.custom.title",
    bodyKey: "landing.clientsWhy.custom.body",
  },
  {
    titleKey: "landing.clientsWhy.partner.title",
    bodyKey: "landing.clientsWhy.partner.body",
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
  const t = useT();

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
          <nav className="flex items-center gap-2" aria-label={t("landing.nav.aria")}>
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
        <section
          aria-label={t("landing.capabilities.aria")}
          className="border-b border-border bg-surface-muted/40"
        >
          <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-6 gap-y-3 px-4 py-6 md:px-6">
            {TRUST_KEYS.map((key) => (
              <span key={key} className="type-body-sm font-medium text-muted-foreground">
                {t(key)}
              </span>
            ))}
          </div>
        </section>

        {/* About FoundEarly Labs */}
        <section id="about" className="border-b border-border scroll-mt-20">
          <div className="mx-auto flex max-w-content flex-col gap-20 px-4 py-16 md:px-6 md:py-24 lg:gap-28 lg:py-28">
            <Reveal className="max-w-3xl space-y-4">
              <h2 className="type-h1 text-foreground">{t("landing.about.title")}</h2>
              <p className="type-body-lg text-muted-foreground">{t("landing.about.support")}</p>
            </Reveal>

            {/* Founder */}
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <Reveal className="md:col-span-4">
                <p className="type-label text-brand">{t("landing.founder.role")}</p>
                <h3 className="mt-3 type-h2 text-foreground">{t("landing.founder.title")}</h3>
              </Reveal>
              <Reveal className="md:col-span-8" delay={0.04}>
                <div className="max-w-2xl space-y-6">
                  <div className="space-y-2">
                    <p className="type-h3 text-foreground">{t("landing.founder.name")}</p>
                    <p className="type-body text-muted-foreground">{t("landing.founder.location")}</p>
                  </div>
                  <p className="type-body-lg text-foreground">{t("landing.founder.intro")}</p>
                  <p className="type-body text-muted-foreground">{t("landing.founder.clients")}</p>
                  <p className="type-body text-muted-foreground">{t("landing.founder.approach")}</p>
                  <p className="type-body text-muted-foreground">
                    {t("landing.founder.intelligence")}
                  </p>
                  <div className="border-s-2 border-brand ps-5 pt-1">
                    <p className="type-body-lg text-foreground">
                      {t("landing.founder.emphasis.line1")}
                    </p>
                    <p className="mt-2 type-body-lg text-foreground">
                      {t("landing.founder.emphasis.line2")}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Philosophy */}
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <Reveal className="md:col-span-4">
                <h3 className="type-h2 text-foreground">{t("landing.philosophy.title")}</h3>
              </Reveal>
              <Reveal className="md:col-span-8" delay={0.04}>
                <ul className="max-w-2xl space-y-6">
                  {PHILOSOPHY_KEYS.map((key) => (
                    <li key={key} className="type-body-lg text-foreground">
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Company */}
            <div className="grid gap-8 md:grid-cols-12 md:gap-12">
              <Reveal className="md:col-span-4">
                <h3 className="type-h2 text-foreground">{t("landing.company.title")}</h3>
              </Reveal>
              <Reveal className="md:col-span-8" delay={0.04}>
                <div className="max-w-2xl space-y-5">
                  <p className="type-h3 text-foreground">{t("landing.company.legalName")}</p>
                  <p className="type-body-lg text-muted-foreground">{t("landing.company.intro")}</p>
                  <p className="type-body text-muted-foreground">{t("landing.company.builds")}</p>
                  <p className="type-body text-muted-foreground">{t("landing.company.custom")}</p>
                </div>
              </Reveal>
            </div>

            {/* Company information card */}
            <Reveal>
              <div className="rounded-lg border border-border bg-surface">
                <div className="border-b border-border px-6 py-5 md:px-8">
                  <h3 className="type-h3 text-foreground">{t("landing.companyInfo.title")}</h3>
                </div>
                <dl className="divide-y divide-border">
                  {COMPANY_INFO_ROWS.map((row) => (
                    <div
                      key={row.labelKey}
                      className="grid gap-2 px-6 py-4 sm:grid-cols-12 sm:gap-6 md:px-8"
                    >
                      <dt className="type-label text-muted-foreground sm:col-span-4">
                        {t(row.labelKey)}
                      </dt>
                      <dd className="type-body text-foreground sm:col-span-8">{t(row.valueKey)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Why clients work with us */}
            <div className="space-y-10">
              <Reveal className="max-w-2xl space-y-3">
                <h3 className="type-h2 text-foreground">{t("landing.clientsWhy.title")}</h3>
                <p className="type-body text-muted-foreground">{t("landing.clientsWhy.support")}</p>
              </Reveal>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {CLIENTS_WHY.map((item, index) => (
                  <Reveal key={item.titleKey} delay={Math.min(index, 5) * 0.03}>
                    <article className="flex h-full flex-col gap-3 border-s-2 border-brand ps-5">
                      <h4 className="type-h3 text-foreground">{t(item.titleKey)}</h4>
                      <p className="type-body text-muted-foreground">{t(item.bodyKey)}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
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
                      <span className="type-body font-medium text-foreground">
                        {t(item.labelKey)}
                      </span>
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
                const isWebsiteDemo = item.titleKey === "landing.build.websites.title";
                const isContractorDemo = item.titleKey === "landing.build.contractor.title";
                const demoHref = isWebsiteDemo
                  ? WEBSITE_DEMO_HREF
                  : isContractorDemo
                    ? CONTRACTOR_OS_HREF
                    : null;
                const ctaKey = isWebsiteDemo
                  ? ("landing.build.websites.cta" as const)
                  : isContractorDemo
                    ? ("landing.build.contractor.cta" as const)
                    : null;
                const card = (
                  <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition-colors duration-fast ease-enter hover:border-border-strong">
                    <Icon className="size-icon-lg text-brand" strokeWidth={1.5} aria-hidden />
                    <h3 className="type-h3 text-foreground">{t(item.titleKey)}</h3>
                    <p className="type-body text-muted-foreground">{t(item.bodyKey)}</p>
                    {ctaKey ? (
                      <span className="mt-auto inline-flex items-center gap-2 pt-2 type-body font-medium text-brand">
                        {t(ctaKey)}
                        <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
                      </span>
                    ) : null}
                  </article>
                );
                return (
                  <Reveal key={item.titleKey} delay={Math.min(index, 5) * 0.03}>
                    {demoHref ? (
                      <Link href={demoHref} className="block h-full rounded-lg">
                        {card}
                      </Link>
                    ) : (
                      card
                    )}
                  </Reveal>
                );
              })}
            </div>
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
