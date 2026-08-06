"use client";

import {
  Building2,
  Clapperboard,
  Database,
  LayoutTemplate,
  Search,
  Bell,
} from "lucide-react";

import { EmptyState } from "@/components/empty/EmptyState";
import { t } from "@/lib/content";
import type { WorkspaceLifecycleState } from "@/types/workspace";

export type WorkspaceEmptyProps = {
  variant?:
    | "workspace"
    | "search"
    | "notifications"
    | "presentation"
    | "no-data"
    | "coming-soon";
  lifecycle?: WorkspaceLifecycleState;
};

const variantConfig = {
  workspace: {
    icon: LayoutTemplate,
    titleKey: "empty.workspace.title" as const,
    descriptionKey: "empty.workspace.description" as const,
  },
  search: {
    icon: Search,
    titleKey: "empty.search.title" as const,
    descriptionKey: "empty.search.description" as const,
  },
  notifications: {
    icon: Bell,
    titleKey: "empty.notifications.title" as const,
    descriptionKey: "empty.notifications.description" as const,
  },
  presentation: {
    icon: Clapperboard,
    titleKey: "empty.presentation.title" as const,
    descriptionKey: "empty.presentation.description" as const,
  },
  "no-data": {
    icon: Database,
    titleKey: "empty.noData.title" as const,
    descriptionKey: "empty.noData.description" as const,
  },
  "coming-soon": {
    icon: Building2,
    titleKey: "empty.comingSoon.title" as const,
    descriptionKey: "empty.comingSoon.description" as const,
  },
};

export function WorkspaceEmpty({ variant = "workspace", lifecycle }: WorkspaceEmptyProps) {
  const resolved =
    variant !== "workspace"
      ? variant
      : lifecycle === "coming-soon"
        ? "coming-soon"
        : lifecycle === "empty"
          ? "no-data"
          : "workspace";

  const config = variantConfig[resolved];
  return (
    <EmptyState
      icon={config.icon}
      title={t(config.titleKey)}
      description={t(config.descriptionKey)}
      size="lg"
    />
  );
}
