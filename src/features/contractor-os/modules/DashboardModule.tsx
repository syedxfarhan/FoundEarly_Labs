"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileText,
  HardHat,
  ShoppingCart,
  Wrench,
} from "lucide-react";

import {
  OS_ACTIVITY,
  OS_DEADLINES,
  OS_KPIS,
  OS_PROJECTS,
  getProjectName,
} from "@/data/contractorOs";
import { workspaceHref } from "@/config/workspaces";
import { formatCount, formatPercent, formatSar } from "@/lib/formatters";
import {
  activityLabelKey,
  deadlineLabelKey,
  projectNameKey,
  projectNameShortKey,
  resolveContentKey,
  translateLocation,
  translateStatus,
  useT,
} from "@/lib/content";
import {
  KpiCard,
  ProgressBar,
  Reveal,
  StatusBadge,
  primaryButtonClassName,
  scheduleTone,
  secondaryButtonClassName,
} from "@/features/contractor-os/ui";

function href(section: string) {
  return workspaceHref("contractor-os", section);
}

function translateOsProjectName(id: string, fallback: string, t: ReturnType<typeof useT>) {
  return resolveContentKey(
    projectNameShortKey(id),
    resolveContentKey(projectNameKey(id), fallback, t),
    t,
  );
}

export function DashboardModule() {
  const t = useT();

  const active = OS_PROJECTS.filter((p) => p.status !== "Complete");

  return (
    <div className="flex flex-col gap-8" data-os-module="dashboard">
      <Reveal className="space-y-2">
        <p className="type-label text-brand">{t("os.dashboard.eyebrow")}</p>
        <h2 className="type-h2 text-foreground">{t("os.dashboard.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.dashboard.support")}</p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          {
            label: t("os.kpi.activeProjects"),
            value: formatCount(OS_KPIS.activeProjects),
            hint: t("os.kpi.activeProjects.hint"),
          },
          {
            label: t("os.kpi.employeesOnSite"),
            value: formatCount(OS_KPIS.employeesOnSite),
            hint: t("os.kpi.employeesOnSite.hint"),
          },
          {
            label: t("os.kpi.equipmentUtilization"),
            value: formatPercent(OS_KPIS.equipmentUtilization),
            hint: t("os.kpi.equipmentUtilization.hint"),
          },
          {
            label: t("os.kpi.openPos"),
            value: formatCount(OS_KPIS.openPurchaseOrders),
            hint: t("os.kpi.openPos.hint"),
          },
          {
            label: t("os.kpi.pendingApprovals"),
            value: formatCount(OS_KPIS.pendingApprovals),
            hint: t("os.kpi.pendingApprovals.hint"),
          },
          {
            label: t("os.kpi.monthlyRevenue"),
            value: formatSar(OS_KPIS.monthlyRevenueSar),
            hint: t("os.kpi.monthlyRevenue.hint"),
          },
        ].map((kpi, index) => (
          <Reveal key={kpi.label} delay={Math.min(index, 5) * 0.03}>
            <KpiCard label={kpi.label} value={kpi.value} hint={kpi.hint} />
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <Reveal className="xl:col-span-7">
          <section className="rounded-lg border border-border bg-surface p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="type-h3 text-foreground">{t("os.dashboard.projectStatus")}</h3>
              <Link href={href("projects")} className={secondaryButtonClassName()}>
                {t("os.dashboard.viewProjects")}
              </Link>
            </div>
            <ul className="space-y-4">
              {active.map((project) => (
                <li
                  key={project.id}
                  className="rounded-md border border-border bg-background p-4 transition-colors duration-fast ease-enter hover:border-border-strong"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="type-label text-muted-foreground">{project.id}</p>
                      <p className="mt-1 type-body font-medium text-foreground">
                        {translateOsProjectName(project.id, project.name, t)}
                      </p>
                      <p className="mt-1 type-body-sm text-muted-foreground">
                        {translateLocation(project.location, t)}
                      </p>
                    </div>
                    <StatusBadge
                      label={translateStatus(project.status, t)}
                      tone={scheduleTone(project.status)}
                    />
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={project.progress} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <div className="flex flex-col gap-6 xl:col-span-5">
          <Reveal delay={0.04}>
            <section className="rounded-lg border border-border bg-surface p-5 md:p-6">
              <h3 className="type-h3 text-foreground">{t("os.dashboard.activity")}</h3>
              <ul className="mt-4 space-y-3">
                {OS_ACTIVITY.map((item) => (
                  <li key={item.id} className="border-s-2 border-brand ps-3">
                    <p className="type-label text-muted-foreground">{item.time}</p>
                    <p className="type-body font-medium text-foreground">
                      {resolveContentKey(activityLabelKey(item.id), item.label, t)}
                    </p>
                    <p className="type-body-sm text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section className="rounded-lg border border-border bg-surface p-5 md:p-6">
              <h3 className="type-h3 text-foreground">{t("os.dashboard.deadlines")}</h3>
              <ul className="mt-4 space-y-3">
                {OS_DEADLINES.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="type-body font-medium text-foreground">
                        {resolveContentKey(deadlineLabelKey(item.id), item.label, t)}
                      </p>
                      <p className="type-body-sm text-muted-foreground">
                        {translateOsProjectName(item.projectId, getProjectName(item.projectId), t)}
                      </p>
                    </div>
                    <p className="type-body-sm text-muted-foreground" data-numeric="true">
                      {item.date}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <section className="rounded-lg border border-border bg-surface p-5 md:p-6">
          <h3 className="type-h3 text-foreground">{t("os.dashboard.quickActions")}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: href("projects"),
                label: t("os.action.projects"),
                icon: ClipboardList,
              },
              {
                href: href("workforce"),
                label: t("os.action.workforce"),
                icon: HardHat,
              },
              {
                href: href("equipment"),
                label: t("os.action.equipment"),
                icon: Wrench,
              },
              {
                href: href("documents"),
                label: t("os.action.documents"),
                icon: FileText,
              },
              {
                href: href("purchase-orders"),
                label: t("os.action.pos"),
                icon: ShoppingCart,
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex min-h-touch items-center justify-between gap-3 rounded-md border border-border bg-background px-4 py-3 transition-colors duration-fast ease-enter hover:border-border-strong hover:bg-surface-muted"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-icon-md text-brand" strokeWidth={1.5} aria-hidden />
                    <span className="type-body font-medium text-foreground">{action.label}</span>
                  </span>
                  <ArrowRight className="size-icon-sm text-muted-foreground" strokeWidth={1.5} />
                </Link>
              );
            })}
            <Link href={href("purchase-orders")} className={primaryButtonClassName()}>
              {t("os.action.reviewApprovals")}
              <ArrowRight className="size-icon-sm" strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
