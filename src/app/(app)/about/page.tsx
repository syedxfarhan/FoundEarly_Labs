import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { Panel } from "@/components/layout/Panel";
import { Section } from "@/components/layout/Section";
import { workspaceHref } from "@/config/workspaces";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: "About this demo",
};

/** Transparency surface (docs/03 §7) — shell-ready, no business demos. */
export default function AboutPage() {
  return (
    <PageContainer constrained>
      <Section title={t("about.title")} description={t("about.description")}>
        <Panel>
          <p className="type-body text-foreground">{t("about.shellReady")}</p>
          <Link
            href={workspaceHref("project-command")}
            className="mt-6 inline-flex min-h-touch items-center rounded-md bg-brand px-4 type-body font-medium text-brand-foreground transition-colors duration-fast ease-enter hover:bg-brand-hover"
          >
            {t("notFound.action")}
          </Link>
        </Panel>
      </Section>
    </PageContainer>
  );
}
