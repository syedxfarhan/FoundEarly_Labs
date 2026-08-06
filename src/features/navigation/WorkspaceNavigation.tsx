"use client";

import Link from "next/link";
import {
  Files,
  Info,
  LayoutDashboard,
  MessageSquareText,
  Package,
  type LucideIcon,
} from "lucide-react";

import { getNavItemsForGroup } from "@/config/navigation";
import { WORKSPACE_REGISTRY, workspaceHref } from "@/config/workspaces";
import { ShellControl } from "@/components/layout/ShellControl";
import { useWorkspaceEngine } from "@/features/workspace/WorkspaceEngine";
import { t, tKey } from "@/lib/content";
import { cn } from "@/utils/cn";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Package,
  Files,
  MessageSquareText,
  Info,
};

export function WorkspaceSwitcher() {
  const { workspaceId, navigateToWorkspace } = useWorkspaceEngine();
  const items = getNavItemsForGroup("workspaces");

  return (
    <div className="space-y-1" data-nav="workspace-switcher">
      <p className="type-label px-2 text-muted-foreground">{t("nav.group.workspaces")}</p>
      <ul className="space-y-1">
        {items.map((item) => {
          const workspace = WORKSPACE_REGISTRY.find((w) => `workspace.${w.id}` === item.id);
          if (!workspace) return null;
          const Icon = iconMap[item.icon ?? ""] ?? LayoutDashboard;
          const active = workspace.id === workspaceId;
          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={!item.available}
                onClick={() => {
                  if (item.available) navigateToWorkspace(workspace.id);
                }}
                className={cn(
                  "flex w-full min-h-touch items-center gap-3 rounded-md px-3 py-2 text-start type-body",
                  "transition-colors duration-fast ease-enter",
                  active
                    ? "bg-brand/10 font-medium text-brand"
                    : "text-foreground hover:bg-surface-muted",
                  !item.available && "cursor-not-allowed opacity-50",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="size-icon-md shrink-0" strokeWidth={1.5} aria-hidden />
                <span className="min-w-0 flex-1 truncate">{tKey(item.labelKey)}</span>
                {!item.available ? (
                  <span className="type-label text-muted-foreground">{t("common.comingSoon")}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SectionNav() {
  const { workspace, section, navigateToSection } = useWorkspaceEngine();

  return (
    <div className="space-y-1" data-nav="section-nav" aria-label={t("nav.sectionNav")}>
      <p className="type-label px-2 text-muted-foreground">{tKey(workspace.labelKey)}</p>
      <ul className="space-y-1">
        {workspace.sections.map((item) => {
          const active = item.id === section.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => navigateToSection(item.path)}
                className={cn(
                  "flex w-full min-h-touch items-center justify-between gap-2 rounded-md px-3 py-2 text-start type-body",
                  "transition-colors duration-fast ease-enter",
                  active
                    ? "bg-surface-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="truncate">{tKey(item.labelKey)}</span>
                {item.status === "preview" ? (
                  <span className="type-label text-muted-foreground">{t("common.preview")}</span>
                ) : null}
                {item.status === "coming-soon" ? (
                  <span className="type-label text-muted-foreground">{t("common.comingSoon")}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function UtilityNav() {
  const items = getNavItemsForGroup("utility");
  return (
    <ul className="space-y-1" data-nav="utility">
      {items.map((item) => {
        const Icon = iconMap[item.icon ?? ""] ?? Info;
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              className={cn(
                "flex min-h-touch items-center gap-3 rounded-md px-3 py-2 type-body text-muted-foreground",
                "transition-colors duration-fast ease-enter hover:bg-surface-muted hover:text-foreground",
              )}
            >
              <Icon className="size-icon-md" strokeWidth={1.5} aria-hidden />
              {tKey(item.labelKey)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Quick switcher foundation — opens via command palette destinations. */
export function QuickSwitcherTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <ShellControl aria-label={t("nav.workspaceSwitcher")} onClick={onOpen}>
      <LayoutDashboard className="size-icon-md" strokeWidth={1.5} aria-hidden />
      <span className="hidden type-body lg:inline">{t("nav.workspaceSwitcher")}</span>
    </ShellControl>
  );
}

export function workspaceDefaultHref(): string {
  return workspaceHref("project-command");
}
