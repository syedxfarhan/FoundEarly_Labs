"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BENEFITS, COMPANY, OPEN_ROLES } from "@/data/corporateWebsite";
import { workspaceHref } from "@/config/workspaces";
import { t } from "@/lib/content";
import {
  PageIntro,
  Reveal,
  primaryButtonClassName,
} from "@/features/corporate-website/ui";

export function CareersPage() {
  return (
    <div data-website-page="careers">
      <section className="border-b border-border bg-surface">
        <PageIntro
          eyebrow={t("website.careers.eyebrow")}
          title={t("website.careers.title")}
          support={t("website.careers.support")}
        />
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <Reveal className="md:col-span-4">
            <h2 className="type-h2 text-foreground">{t("website.careers.culture.title")}</h2>
          </Reveal>
          <Reveal className="md:col-span-8" delay={0.04}>
            <p className="type-body-lg text-muted-foreground">{t("website.careers.culture.body")}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-16 md:px-6 md:py-20">
          <Reveal>
            <h2 className="type-h2 text-foreground">{t("website.careers.benefits.title")}</h2>
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <Reveal key={benefit} delay={Math.min(index, 5) * 0.02}>
                <li className="rounded-md border border-border bg-background px-4 py-4 type-body text-foreground">
                  {benefit}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h2 text-foreground">{t("website.careers.open.title")}</h2>
            <p className="type-body text-muted-foreground">{t("website.careers.open.support")}</p>
          </Reveal>
          <div className="flex flex-col gap-3">
            {OPEN_ROLES.map((role, index) => (
              <Reveal key={role.id} delay={Math.min(index, 5) * 0.03}>
                <article className="rounded-lg border border-border bg-surface p-5 transition-colors duration-fast ease-enter hover:border-border-strong md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="type-h3 text-foreground">{role.title}</h3>
                      <p className="mt-1 type-body text-muted-foreground">
                        {role.department} · {role.location} · {role.type}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 max-w-3xl type-body text-muted-foreground">{role.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h2 text-foreground">{t("website.careers.apply.title")}</h2>
            <p className="type-body-lg text-muted-foreground">{t("website.careers.apply.support")}</p>
            <p className="type-body text-foreground">{COMPANY.careersEmail}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <Link
              href={workspaceHref("corporate-website", "contact")}
              className={primaryButtonClassName()}
            >
              {t("website.careers.apply.cta")}
              <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
