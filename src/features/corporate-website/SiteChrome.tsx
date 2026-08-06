"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import * as React from "react";

import { COMPANY } from "@/data/corporateWebsite";
import { workspaceHref } from "@/config/workspaces";
import { useT } from "@/lib/content";
import { cn } from "@/utils/cn";

const NAV = [
  { section: "home", labelKey: "website.nav.home" as const },
  { section: "about", labelKey: "website.nav.about" as const },
  { section: "services", labelKey: "website.nav.services" as const },
  { section: "projects", labelKey: "website.nav.projects" as const },
  { section: "careers", labelKey: "website.nav.careers" as const },
  { section: "contact", labelKey: "website.nav.contact" as const },
] as const;

function navHref(section: string) {
  return workspaceHref("corporate-website", section);
}

export function SiteHeader() {
  const t = useT();

  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href={navHref("home")}
          className="flex min-h-touch items-center gap-3 rounded-md"
          aria-label={COMPANY.legalName}
        >
          <span
            className="flex size-8 items-center justify-center rounded-md bg-brand type-label text-brand-foreground"
            aria-hidden
          >
            {COMPANY.mark}
          </span>
          <span className="hidden type-body font-medium tracking-wide text-foreground sm:inline">
            {COMPANY.wordmark}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t("website.nav.label")}>
          {NAV.map((item) => {
            const href = navHref(item.section);
            const active = pathname.includes(`/corporate-website/${item.section}`);
            return (
              <Link
                key={item.section}
                href={href}
                className={cn(
                  "inline-flex min-h-touch items-center px-3 type-body transition-colors duration-fast ease-enter",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={navHref("contact")}
            className="hidden min-h-touch items-center rounded-md border border-border px-4 type-body font-medium text-foreground transition-colors duration-fast ease-enter hover:bg-surface-muted md:inline-flex"
          >
            {t("website.nav.contactCta")}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="website-mobile-nav"
            aria-label={open ? t("website.nav.close") : t("website.nav.open")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-icon-md" strokeWidth={1.5} aria-hidden />
            ) : (
              <Menu className="size-icon-md" strokeWidth={1.5} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="website-mobile-nav"
          className="border-t border-border bg-surface px-4 py-3 lg:hidden"
          aria-label={t("website.nav.label")}
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => {
              const href = navHref(item.section);
              const active = pathname.includes(`/corporate-website/${item.section}`);
              return (
                <li key={item.section}>
                  <Link
                    href={href}
                    className={cn(
                      "flex min-h-touch items-center rounded-md px-3 type-body",
                      active
                        ? "bg-surface-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteFooter() {
  const t = useT();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 md:grid-cols-12 md:px-6">
        <div className="md:col-span-5">
          <p className="type-label text-brand">{COMPANY.wordmark}</p>
          <p className="mt-3 max-w-sm type-body text-muted-foreground">
            {t("website.company.tagline")}
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="type-label text-muted-foreground">{t("website.footer.offices")}</p>
          <p className="mt-3 type-body text-foreground">{t("website.company.headquarters")}</p>
        </div>
        <div className="md:col-span-4">
          <p className="type-label text-muted-foreground">{t("website.footer.contact")}</p>
          <p className="mt-3 type-body text-foreground">{COMPANY.phone}</p>
          <p className="type-body text-foreground">{COMPANY.email}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-6">
          <p className="type-body-sm text-muted-foreground">
            © {new Date().getFullYear()} {COMPANY.legalName}
          </p>
          <p className="type-body-sm text-muted-foreground">{t("website.footer.demoNote")}</p>
        </div>
      </div>
    </footer>
  );
}
