"use client";

import { SERVICES } from "@/data/corporateWebsite";
import { t } from "@/lib/content";
import { PageIntro, Reveal } from "@/features/corporate-website/ui";

export function ServicesPage() {
  return (
    <div data-website-page="services">
      <section className="border-b border-border bg-surface">
        <PageIntro
          eyebrow={t("website.services.eyebrow")}
          title={t("website.services.title")}
          support={t("website.services.support")}
        />
      </section>

      <section>
        <div className="mx-auto grid max-w-content gap-4 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3 md:px-6 md:py-20">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id} delay={Math.min(index, 5) * 0.03}>
              <article className="flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-6 transition-colors duration-fast ease-enter hover:border-border-strong">
                <span className="type-label text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="type-h3 text-foreground">{service.title}</h2>
                <p className="type-body text-muted-foreground">{service.summary}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
