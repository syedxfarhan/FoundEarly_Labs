"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

import { COMPANY } from "@/data/corporateWebsite";
import { type ContentKey, useT } from "@/lib/content";
import {
  PageIntro,
  Reveal,
  primaryButtonClassName,
} from "@/features/corporate-website/ui";
import { cn } from "@/utils/cn";

const fieldClassName = cn(
  "w-full rounded-md border border-border bg-background px-3 py-3 type-body text-foreground",
  "placeholder:text-muted-foreground",
  "transition-colors duration-fast ease-enter",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const ADDRESS_KEYS = [
  null,
  "website.company.address.street",
  "website.company.address.city",
  "website.company.address.country",
] as const satisfies ReadonlyArray<ContentKey | null>;

export function ContactPage() {
  const t = useT();

  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div data-website-page="contact">
      <section className="border-b border-border bg-surface">
        <PageIntro
          eyebrow={t("website.contact.eyebrow")}
          title={t("website.contact.title")}
          support={t("website.contact.support")}
        />
      </section>

      <section>
        <div className="mx-auto grid max-w-content gap-10 px-4 py-16 md:grid-cols-12 md:px-6 md:py-20">
          <div className="space-y-8 md:col-span-5">
            <Reveal>
              <h2 className="type-h3 text-foreground">{t("website.contact.office.title")}</h2>
              <address className="mt-4 not-italic type-body text-muted-foreground">
                {COMPANY.addressLines.map((line, index) => {
                  const key = ADDRESS_KEYS[index];
                  return (
                    <span key={line} className="block">
                      {key ? t(key) : line}
                    </span>
                  );
                })}
              </address>
            </Reveal>
            <Reveal delay={0.04}>
              <h2 className="type-h3 text-foreground">{t("website.contact.details.title")}</h2>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="type-label text-muted-foreground">{t("website.contact.phone")}</dt>
                  <dd className="mt-1 type-body text-foreground">{COMPANY.phone}</dd>
                </div>
                <div>
                  <dt className="type-label text-muted-foreground">{t("website.contact.email")}</dt>
                  <dd className="mt-1 type-body text-foreground">{COMPANY.email}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface-muted p-6 text-center">
                <MapPin className="size-icon-lg text-brand" strokeWidth={1.5} aria-hidden />
                <p className="type-body font-medium text-foreground">
                  {t("website.contact.map.title")}
                </p>
                <p className="max-w-xs type-body-sm text-muted-foreground">
                  {t("website.contact.map.support")}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="md:col-span-7" delay={0.04}>
            <form
              className="rounded-lg border border-border bg-surface p-6 md:p-8"
              onSubmit={handleSubmit}
              noValidate
            >
              <h2 className="type-h3 text-foreground">{t("website.contact.form.title")}</h2>
              <p className="mt-2 type-body text-muted-foreground">{t("website.contact.form.support")}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 sm:col-span-1">
                  <span className="type-label text-muted-foreground">
                    {t("website.contact.form.name")}
                  </span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={fieldClassName}
                    required
                  />
                </label>
                <label className="block space-y-2 sm:col-span-1">
                  <span className="type-label text-muted-foreground">
                    {t("website.contact.form.email")}
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClassName}
                    required
                  />
                </label>
                <label className="block space-y-2 sm:col-span-2">
                  <span className="type-label text-muted-foreground">
                    {t("website.contact.form.company")}
                  </span>
                  <input name="company" type="text" autoComplete="organization" className={fieldClassName} />
                </label>
                <label className="block space-y-2 sm:col-span-2">
                  <span className="type-label text-muted-foreground">
                    {t("website.contact.form.message")}
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    className={cn(fieldClassName, "resize-y")}
                    required
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className={primaryButtonClassName()}>
                  {t("website.contact.form.submit")}
                </button>
                {submitted ? (
                  <p className="type-body text-semantic-success" role="status">
                    {t("website.contact.form.success")}
                  </p>
                ) : (
                  <p className="type-body-sm text-muted-foreground">
                    {t("website.contact.form.note")}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
