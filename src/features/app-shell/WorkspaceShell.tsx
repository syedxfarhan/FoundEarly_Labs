"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Command as CommandIcon, Search } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { NavigationRail } from "@/components/layout/NavigationRail";
import { ShellControl } from "@/components/layout/ShellControl";
import { TopBar } from "@/components/layout/TopBar";
import { WorkspaceHeader } from "@/components/layout/WorkspaceHeader";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { MainLandmark } from "@/components/system/MainLandmark";
import { overlayIds } from "@/config/constants";
import { workspaceHref } from "@/config/workspaces";
import { CommandPalette } from "@/features/command/CommandPalette";
import {
  SectionNav,
  UtilityNav,
  WorkspaceSwitcher,
} from "@/features/navigation/WorkspaceNavigation";
import { NotificationBadge, NotificationCenter } from "@/features/notifications/NotificationCenter";
import { PreferenceMenu } from "@/features/preferences/PreferenceControls";
import { PresentationToggle } from "@/features/presentation/PresentationToggle";
import { GlobalSearch } from "@/features/search/GlobalSearch";
import { buildPlaceholderSearchIndex } from "@/features/search/placeholderIndex";
import {
  WorkspaceCanvas,
  WorkspaceEngineProvider,
  WorkspaceTransition,
  useWorkspaceEngine,
} from "@/features/workspace";
import { useT, useTKey } from "@/lib/content";
import { useCommands } from "@/providers/CommandProvider";
import { useKeyboardShortcuts } from "@/providers/KeyboardShortcutProvider";
import { usePresentation } from "@/providers/PresentationProvider";
import { SearchProvider } from "@/providers/SearchProvider";
import { useShellUi } from "@/providers/ShellUiProvider";
import type { BreadcrumbItem } from "@/types/navigation";

function BrandMark() {
  const t = useT();

  return (
    <Link
      href={workspaceHref("project-command")}
      className="flex items-center gap-3 rounded-md focus-visible:outline-none"
    >
      <span
        className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground type-label"
        aria-hidden
      >
        FE
      </span>
      <span className="type-body font-medium text-foreground">{t("common.brand.short")}</span>
    </Link>
  );
}

function ShellTopActions() {
  const t = useT();
  const { toggleOverlay } = useShellUi();

  return (
    <div className="flex items-center gap-1">
      <ShellControl
        aria-label={t("nav.openSearch")}
        onClick={() => toggleOverlay(overlayIds.globalSearch)}
      >
        <Search className="size-icon-md" strokeWidth={1.5} aria-hidden />
      </ShellControl>
      <ShellControl
        aria-label={t("nav.openCommand")}
        onClick={() => toggleOverlay(overlayIds.commandPalette)}
      >
        <CommandIcon className="size-icon-md" strokeWidth={1.5} aria-hidden />
        <kbd className="hidden type-label text-muted-foreground md:inline">⌘K</kbd>
      </ShellControl>
      <NotificationBadge />
      <PresentationToggle />
      <PreferenceMenu />
    </div>
  );
}

function ShellNavigation() {
  const t = useT();

  return (
    <NavigationRail
      aria-label={t("nav.sectionNav")}
      header={<WorkspaceSwitcher />}
      footer={<UtilityNav />}
    >
      <div className="space-y-6">
        <SectionNav />
      </div>
    </NavigationRail>
  );
}

function RightUtilityRegion() {
  const t = useT();
  const { isPresentationMode } = usePresentation();
  return (
    <div className="flex h-full flex-col p-4" aria-label={t("shell.rightUtility")}>
      <p className="type-label text-muted-foreground">{t("shell.utilityRegion")}</p>
      <p className="mt-3 type-body-sm text-muted-foreground">
        {isPresentationMode
          ? t("empty.presentation.description")
          : t("about.shellReady")}
      </p>
    </div>
  );
}

function WorkspaceChrome({ children }: { children: React.ReactNode }) {
  const t = useT();
  const tKey = useTKey();
  const pathname = usePathname();
  const isWorkspaceRoute = pathname.startsWith("/workspace/");
  const { workspace, section, projectCode } = useWorkspaceEngine();

  if (!isWorkspaceRoute) {
    return (
      <WorkspaceLayout>
        <WorkspaceTransition transitionKey={pathname}>
          {children}
        </WorkspaceTransition>
      </WorkspaceLayout>
    );
  }

  const isWebsiteDemo = workspace.id === "corporate-website";

  const crumbs: BreadcrumbItem[] = [
    {
      id: "workspace",
      label: tKey(workspace.labelKey),
      href: workspaceHref(workspace.id),
    },
    {
      id: "section",
      label: tKey(section.labelKey),
    },
  ];

  return (
    <WorkspaceLayout
      header={
        isWebsiteDemo ? undefined : (
          <WorkspaceHeader
            breadcrumb={<Breadcrumb items={crumbs} aria-label={t("nav.breadcrumb")} />}
            title={tKey(section.labelKey)}
            description={`${tKey(workspace.labelKey)} · ${projectCode}`}
          />
        )
      }
    >
      <WorkspaceTransition transitionKey={`${workspace.id}:${section.id}`}>
        <WorkspaceCanvas>{children}</WorkspaceCanvas>
      </WorkspaceTransition>
    </WorkspaceLayout>
  );
}

function RegisterShellCommands() {
  const t = useT();
  const tKey = useTKey();
  const { registerCommand } = useCommands();
  const { registerShortcut } = useKeyboardShortcuts();
  const router = useRouter();
  const { toggleOverlay } = useShellUi();
  const { setActiveProjectCode } = usePresentation();

  React.useEffect(() => {
    const offGd = registerShortcut("g+d", () => {
      router.push(workspaceHref("project-command"));
    });
    const offGw = registerShortcut("g+w", () => {
      router.push(workspaceHref("corporate-website"));
    });
    const offGo = registerShortcut("g+o", () => {
      router.push(workspaceHref("contractor-os"));
    });
    const offGh = registerShortcut("g+h", () => {
      router.push("/");
    });
    return () => {
      offGd();
      offGw();
      offGo();
      offGh();
    };
  }, [registerShortcut, router]);

  React.useEffect(() => {
    const disposers = [
      registerCommand({
        id: "nav.home",
        label: tKey("landing.hero.brand"),
        section: "navigation",
        keywords: ["home", "landing", "credibility"],
        shortcutHint: "G H",
        run: () => router.push("/"),
      }),
      registerCommand({
        id: "nav.project-command",
        label: tKey("workspace.projectCommand.label"),
        section: "navigation",
        keywords: ["dashboard", "workspace"],
        shortcutHint: "G D",
        run: () => router.push(workspaceHref("project-command")),
      }),
      registerCommand({
        id: "nav.corporate-website",
        label: tKey("workspace.corporateWebsite.label"),
        section: "navigation",
        keywords: ["website", "demo", "alburaq", "corporate"],
        shortcutHint: "G W",
        run: () => router.push(workspaceHref("corporate-website")),
      }),
      registerCommand({
        id: "nav.contractor-os",
        label: tKey("workspace.contractorOs.label"),
        section: "navigation",
        keywords: ["contractor", "os", "demo", "management"],
        shortcutHint: "G O",
        run: () => router.push(workspaceHref("contractor-os")),
      }),
      registerCommand({
        id: "nav.about",
        label: tKey("nav.utility.about"),
        section: "navigation",
        keywords: ["about", "demo"],
        run: () => router.push("/about"),
      }),
      registerCommand({
        id: "system.command-palette",
        label: t("command.open"),
        section: "system",
        keywords: ["command", "palette"],
        shortcutHint: "⌘K",
        run: () => toggleOverlay(overlayIds.commandPalette),
      }),
      registerCommand({
        id: "system.search",
        label: t("common.search"),
        section: "system",
        keywords: ["search", "find"],
        shortcutHint: "/",
        run: () => toggleOverlay(overlayIds.globalSearch),
      }),
      registerCommand({
        id: "workspace.default-project",
        label: t("command.setActiveProject", { code: "P-1042" }),
        section: "workspace",
        keywords: ["project", "P-1042"],
        run: () => setActiveProjectCode("P-1042"),
      }),
    ];
    return () => disposers.forEach((off) => off());
  }, [registerCommand, router, toggleOverlay, setActiveProjectCode, t, tKey]);

  return null;
}

/**
 * WorkspaceShell — Tier 3 composite (docs/04 §3.18).
 * Owns presentation quiet-chrome and hosts the workspace engine.
 */
export function WorkspaceShell({ children }: { children?: React.ReactNode }) {
  const { isPresentationMode } = usePresentation();
  const t = useT();
  const tKey = useTKey();
  const searchIndex = React.useMemo(() => buildPlaceholderSearchIndex(tKey), [tKey]);

  return (
    <SearchProvider index={searchIndex}>
      <WorkspaceEngineProvider>
        <RegisterShellCommands />
        <AppShell
          presentation={isPresentationMode}
          utilityLabel={t("shell.rightUtility")}
          topBar={
            <TopBar
              brand={<BrandMark />}
              context={
                <span className="truncate type-body-sm text-muted-foreground">
                  {t("common.companyContext")}
                </span>
              }
              actions={<ShellTopActions />}
            />
          }
          navigation={<ShellNavigation />}
          utility={<RightUtilityRegion />}
        >
          <MainLandmark>
            <WorkspaceChrome>{children}</WorkspaceChrome>
          </MainLandmark>
        </AppShell>
        <CommandPalette />
        <GlobalSearch />
        <NotificationCenter />
      </WorkspaceEngineProvider>
    </SearchProvider>
  );
}
