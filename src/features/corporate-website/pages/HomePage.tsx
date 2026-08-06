"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  COMPANY,
  CLIENTS,
  SERVICES,
  getFeaturedProjects,
} from "@/data/corporateWebsite";
import { workspaceHref } from "@/config/workspaces";
import { formatSar } from "@/lib/formatters";
import {
  type ContentKey,
  projectScopeKey,
  resolveContentKey,
  translateLocation,
  translateProjectName,
  translateStatus,
  useT,
} from "@/lib/content";
import {
  Reveal,
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/features/corporate-website/ui";
import { ProjectVisual } from "@/features/corporate-website/ProjectVisual";

function href(section: string) {
  return workspaceHref("corporate-website", section);
}

const WHY_CHOOSE_KEYS = [
  { title: "website.why.delivery.title", body: "website.why.delivery.body" },
  { title: "website.why.industrial.title", body: "website.why.industrial.body" },
  { title: "website.why.mep.title", body: "website.why.mep.body" },
  { title: "website.why.safety.title", body: "website.why.safety.body" },
] as const satisfies ReadonlyArray<{ title: ContentKey; body: ContentKey }>;

const STAT_KEYS = [
  "website.company.stat.years",
  "website.company.stat.projects",
  "website.company.stat.professionals",
  "website.company.stat.cities",
] as const satisfies ReadonlyArray<ContentKey>;

export function HomePage() {
  const t = useT();

  const featured = getFeaturedProjects();

  return (
    <div data-website-page="home">
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-content gap-10 px-4 py-16 md:grid-cols-12 md:px-6 md:py-24 lg:py-28">
          <div className="flex flex-col justify-center gap-6 md:col-span-6">
            <Reveal>
              <p className="type-label text-brand">{COMPANY.wordmark}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <h1 className="max-w-xl text-balance type-display text-foreground">
                {t("website.home.hero.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="max-w-lg type-body-lg text-muted-foreground">
                {t("website.home.hero.support")}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="flex flex-wrap gap-3">
                <Link href={href("projects")} className={primaryButtonClassName()}>
                  {t("website.home.hero.ctaPrimary")}
                  <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
                </Link>
                <Link href={href("contact")} className={secondaryButtonClassName()}>
                  {t("website.home.hero.ctaSecondary")}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="md:col-span-6" delay={0.06}>
            <div className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-lg border border-border bg-brand p-6 md:min-h-[360px] md:p-8">
              <div
                className="pointer-events-none absolute inset-y-0 end-0 w-1/3 border-s border-brand-foreground/15 bg-brand-foreground/5"
                aria-hidden
              />
              <p className="type-label text-brand-foreground/80">{t("website.company.industry")}</p>
              <p className="mt-2 max-w-sm type-h3 text-brand-foreground">
                {t("website.company.headquarters")}
              </p>
              <p className="mt-4 type-body text-brand-foreground/80">
                {t("website.company.classification")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <Reveal className="md:col-span-4">
            <h2 className="type-h2 text-foreground">{t("website.home.intro.title")}</h2>
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.04}>
            <p className="max-w-2xl type-body-lg text-muted-foreground">
              {t("website.home.intro.body")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core services */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h2 text-foreground">{t("website.home.services.title")}</h2>
            <p className="type-body text-muted-foreground">{t("website.home.services.support")}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={Math.min(index, 5) * 0.03}>
                <article className="flex h-full flex-col gap-3 rounded-lg border border-border bg-background p-6 transition-colors duration-fast ease-enter hover:border-border-strong">
                  <h3 className="type-h3 text-foreground">
                    {t(`website.service.${service.id}.title` as ContentKey)}
                  </h3>
                  <p className="type-body text-muted-foreground">
                    {t(`website.service.${service.id}.summary` as ContentKey)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href={href("services")} className={secondaryButtonClassName()}>
              {t("website.home.services.cta")}
              <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h2 text-foreground">{t("website.home.projects.title")}</h2>
            <p className="type-body text-muted-foreground">{t("website.home.projects.support")}</p>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map((project, index) => (
              <Reveal key={project.id} delay={Math.min(index, 5) * 0.03}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors duration-fast ease-enter hover:border-border-strong">
                  <ProjectVisual project={project} />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="type-label text-muted-foreground">
                      {translateLocation(project.location, t)}
                    </p>
                    <h3 className="type-h3 text-foreground">
                      {translateProjectName(project.id, project.name, t)}
                    </h3>
                    <p className="type-body text-muted-foreground">
                      {resolveContentKey(projectScopeKey(project.id), project.scope, t)}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 type-body-sm text-muted-foreground">
                      <span data-numeric="true">{formatSar(project.valueSar)}</span>
                      <span>{project.completionYear}</span>
                      <span>{translateStatus(project.status, t)}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h2 text-foreground">{t("website.home.why.title")}</h2>
            <p className="type-body text-muted-foreground">{t("website.home.why.support")}</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {WHY_CHOOSE_KEYS.map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index, 5) * 0.03}>
                <div className="border-s-2 border-brand ps-5">
                  <h3 className="type-h3 text-foreground">{t(item.title)}</h3>
                  <p className="mt-2 type-body text-muted-foreground">{t(item.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-content gap-6 px-4 py-16 sm:grid-cols-2 md:px-6 md:py-20 lg:grid-cols-4">
          {COMPANY.stats.map((stat, index) => (
            <Reveal key={STAT_KEYS[index]} delay={Math.min(index, 5) * 0.03}>
              <div className="space-y-2">
                <p className="type-numeric-lg text-foreground" data-numeric="true">
                  {stat.value}
                </p>
                <p className="type-body text-muted-foreground">
                  {STAT_KEYS[index] ? t(STAT_KEYS[index]) : stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Client logos */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-16 md:px-6 md:py-20">
          <Reveal>
            <h2 className="type-h2 text-foreground">{t("website.home.clients.title")}</h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {CLIENTS.map((client, index) => (
              <Reveal key={client.id} delay={Math.min(index, 5) * 0.02}>
                <div className="flex min-h-[72px] items-center justify-center rounded-md border border-border bg-background px-3 py-4 text-center">
                  <span className="type-body-sm font-medium text-muted-foreground">
                    {client.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section>
        <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h1 text-foreground">{t("website.home.cta.title")}</h2>
            <p className="type-body-lg text-muted-foreground">{t("website.home.cta.support")}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <Link href={href("contact")} className={primaryButtonClassName()}>
              {t("website.home.cta.action")}
              <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
