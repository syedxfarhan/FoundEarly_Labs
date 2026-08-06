"use client";

import { COMPANY, LEADERSHIP } from "@/data/corporateWebsite";
import { type ContentKey, useT } from "@/lib/content";
import { PageIntro, Reveal } from "@/features/corporate-website/ui";

const CERT_KEYS = [
  "website.company.cert.iso9001",
  "website.company.cert.iso45001",
  "website.company.cert.iso14001",
  "website.company.cert.aramco",
  "website.company.cert.grade2",
] as const satisfies ReadonlyArray<ContentKey>;

export function AboutPage() {
  const t = useT();

  return (
    <div data-website-page="about">
      <section className="border-b border-border bg-surface">
        <PageIntro
          eyebrow={t("website.about.eyebrow")}
          title={t("website.about.title")}
          support={t("website.about.support")}
        />
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <Reveal className="md:col-span-4">
            <h2 className="type-h2 text-foreground">{t("website.about.story.title")}</h2>
          </Reveal>
          <Reveal className="space-y-4 md:col-span-8" delay={0.04}>
            <p className="type-body-lg text-muted-foreground">{t("website.about.story.p1")}</p>
            <p className="type-body-lg text-muted-foreground">{t("website.about.story.p2")}</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <Reveal>
            <div className="rounded-lg border border-border bg-background p-6 md:p-8">
              <h2 className="type-h2 text-foreground">{t("website.about.mission.title")}</h2>
              <p className="mt-4 type-body-lg text-muted-foreground">
                {t("website.about.mission.body")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <div className="rounded-lg border border-border bg-background p-6 md:p-8">
              <h2 className="type-h2 text-foreground">{t("website.about.vision.title")}</h2>
              <p className="mt-4 type-body-lg text-muted-foreground">
                {t("website.about.vision.body")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto flex max-w-content flex-col gap-10 px-4 py-16 md:px-6 md:py-20">
          <Reveal className="max-w-2xl space-y-3">
            <h2 className="type-h2 text-foreground">{t("website.about.leadership.title")}</h2>
            <p className="type-body text-muted-foreground">{t("website.about.leadership.support")}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {LEADERSHIP.map((leader, index) => (
              <Reveal key={leader.id} delay={Math.min(index, 5) * 0.03}>
                <article className="rounded-lg border border-border bg-surface p-6">
                  <div className="flex size-12 items-center justify-center rounded-md bg-surface-muted type-label text-foreground">
                    {leader.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <h3 className="mt-4 type-h3 text-foreground">{leader.name}</h3>
                  <p className="mt-1 type-body font-medium text-brand">
                    {t(`fixture.leader.${leader.id}.role` as ContentKey)}
                  </p>
                  <p className="mt-3 type-body text-muted-foreground">
                    {t(`fixture.leader.${leader.id}.focus` as ContentKey)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <Reveal>
            <h2 className="type-h2 text-foreground">{t("website.about.safety.title")}</h2>
            <p className="mt-4 type-body-lg text-muted-foreground">{t("website.about.safety.body")}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="type-h2 text-foreground">{t("website.about.quality.title")}</h2>
            <p className="mt-4 type-body-lg text-muted-foreground">{t("website.about.quality.body")}</p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-16 md:px-6 md:py-20">
          <Reveal>
            <h2 className="type-h2 text-foreground">{t("website.about.certs.title")}</h2>
          </Reveal>
          <ul className="grid gap-3 md:grid-cols-2">
            {COMPANY.certifications.map((cert, index) => (
              <Reveal key={CERT_KEYS[index] ?? cert} delay={Math.min(index, 5) * 0.02}>
                <li className="rounded-md border border-border bg-surface px-4 py-4 type-body text-foreground">
                  {CERT_KEYS[index] ? t(CERT_KEYS[index]) : cert}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
