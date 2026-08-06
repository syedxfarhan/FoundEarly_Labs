"use client";

import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/layout/Panel";
import { Section } from "@/components/layout/Section";
import { SHOWCASE_PATH } from "@/config/showcase";
import { useT } from "@/lib/content";

/** Transparency surface (docs/03 §7) — shell-ready, no business demos. */
export function AboutDemoContent() {
  const t = useT();

  return (
    <PageContainer constrained>
      <Section title={t("about.title")} description={t("about.description")}>
        <Panel>
          <p className="type-body text-foreground">{t("about.shellReady")}</p>
          <Link
            href={SHOWCASE_PATH}
            className="mt-6 inline-flex min-h-touch items-center rounded-md bg-brand px-4 type-body font-medium text-brand-foreground transition-colors duration-fast ease-enter hover:bg-brand-hover"
          >
            {t("notFound.action")}
          </Link>
        </Panel>
      </Section>
    </PageContainer>
  );
}
