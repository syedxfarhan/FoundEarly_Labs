import Link from "next/link";

import { EmptyState } from "@/components/empty/EmptyState";
import { PageContainer } from "@/components/layout/PageContainer";
import { workspaceHref } from "@/config/workspaces";
import { t } from "@/lib/content";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <PageContainer constrained className="flex min-h-svh items-center justify-center">
      <EmptyState
        icon={FileQuestion}
        title={t("notFound.title")}
        description={t("notFound.description")}
        size="lg"
        action={
          <Link
            href={workspaceHref("project-command")}
            className="inline-flex min-h-touch items-center rounded-md bg-brand px-4 type-body font-medium text-brand-foreground hover:bg-brand-hover"
          >
            {t("notFound.action")}
          </Link>
        }
      />
    </PageContainer>
  );
}
