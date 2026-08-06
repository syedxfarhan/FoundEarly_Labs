"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";

import { OS_PROJECTS, getProjectById, type OsProject } from "@/data/contractorOs";
import { formatSar } from "@/lib/formatters";
import {
  projectNameKey,
  projectNameShortKey,
  projectSummaryKey,
  resolveContentKey,
  translateLocation,
  translateProjectType,
  translateStatus,
  useT,
} from "@/lib/content";
import {
  ModuleToolbar,
  ProgressBar,
  Reveal,
  StatusBadge,
  secondaryButtonClassName,
  scheduleTone,
} from "@/features/contractor-os/ui";

function translateOsProjectName(id: string, fallback: string, t: ReturnType<typeof useT>) {
  return resolveContentKey(
    projectNameShortKey(id),
    resolveContentKey(projectNameKey(id), fallback, t),
    t,
  );
}

function ProjectOverview({
  project,
  onBack,
}: {
  project: OsProject;
  onBack: () => void;
}) {
  const t = useT();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={onBack} className={secondaryButtonClassName()}>
          <ArrowLeft className="size-icon-sm rtl:rotate-180" strokeWidth={1.5} aria-hidden />
          {t("os.projects.back")}
        </button>
        <StatusBadge
          label={translateStatus(project.status, t)}
          tone={scheduleTone(project.status)}
        />
      </div>

      <Reveal>
        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="type-label text-muted-foreground">{project.id}</p>
          <h2 className="mt-2 type-h2 text-foreground">
            {translateOsProjectName(project.id, project.name, t)}
          </h2>
          <p className="mt-3 max-w-3xl type-body-lg text-muted-foreground">
            {resolveContentKey(projectSummaryKey(project.id), project.summary, t)}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="type-label text-muted-foreground">{t("os.projects.meta.location")}</p>
              <p className="mt-1 type-body text-foreground">
                {translateLocation(project.location, t)}
              </p>
            </div>
            <div>
              <p className="type-label text-muted-foreground">{t("os.projects.meta.value")}</p>
              <p className="mt-1 type-body text-foreground" data-numeric="true">
                {formatSar(project.valueSar)}
              </p>
            </div>
            <div>
              <p className="type-label text-muted-foreground">{t("os.projects.meta.manager")}</p>
              <p className="mt-1 type-body text-foreground">{project.manager}</p>
            </div>
            <div>
              <p className="type-label text-muted-foreground">{t("os.projects.meta.client")}</p>
              <p className="mt-1 type-body text-foreground">{project.client}</p>
            </div>
            <div>
              <p className="type-label text-muted-foreground">{t("os.projects.meta.type")}</p>
              <p className="mt-1 type-body text-foreground">
                {translateProjectType(project.typeLabel, t)}
              </p>
            </div>
            <div>
              <p className="type-label text-muted-foreground">{t("os.projects.meta.completion")}</p>
              <p className="mt-1 type-body text-foreground">{project.completionDate}</p>
            </div>
          </div>

          <div className="mt-8 max-w-md">
            <ProgressBar value={project.progress} />
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export function ProjectsModule() {
  const t = useT();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const selected = selectedId ? getProjectById(selectedId) : undefined;

  if (selected) {
    return <ProjectOverview project={selected} onBack={() => setSelectedId(null)} />;
  }

  const filtered = OS_PROJECTS.filter((project) => {
    const matchesSearch =
      search.trim() === "" ||
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.id.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6" data-os-module="projects">
      <Reveal className="space-y-2">
        <h2 className="type-h2 text-foreground">{t("os.projects.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.projects.support")}</p>
      </Reveal>

      <ModuleToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder={t("os.projects.search")}
        filter={statusFilter}
        onFilter={setStatusFilter}
        filterLabel={t("os.filter.status")}
        filterOptions={[
          { value: "all", label: t("os.filter.all") },
          { value: "On Track", label: translateStatus("On Track", t) },
          { value: "At Risk", label: translateStatus("At Risk", t) },
          { value: "Delayed", label: translateStatus("Delayed", t) },
          { value: "Complete", label: translateStatus("Complete", t) },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index, 5) * 0.03}>
            <button
              type="button"
              onClick={() => setSelectedId(project.id)}
              className="flex h-full w-full flex-col gap-4 rounded-lg border border-border bg-surface p-5 text-start transition-colors duration-fast ease-enter hover:border-border-strong"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="type-label text-muted-foreground">{project.id}</p>
                  <h3 className="mt-1 type-h3 text-foreground">
                    {translateOsProjectName(project.id, project.name, t)}
                  </h3>
                  <p className="mt-1 type-body-sm text-muted-foreground">
                    {translateLocation(project.location, t)}
                  </p>
                </div>
                <StatusBadge
                  label={translateStatus(project.status, t)}
                  tone={scheduleTone(project.status)}
                />
              </div>
              <ProgressBar value={project.progress} />
              <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div>
                  <dt className="type-label text-muted-foreground">{t("os.projects.meta.value")}</dt>
                  <dd className="mt-1 type-body text-foreground" data-numeric="true">
                    {formatSar(project.valueSar)}
                  </dd>
                </div>
                <div>
                  <dt className="type-label text-muted-foreground">{t("os.projects.meta.manager")}</dt>
                  <dd className="mt-1 type-body text-foreground">{project.manager}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="type-label text-muted-foreground">
                    {t("os.projects.meta.completion")}
                  </dt>
                  <dd className="mt-1 type-body text-foreground">{project.completionDate}</dd>
                </div>
              </dl>
            </button>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="type-body text-muted-foreground">{t("os.empty.filtered")}</p>
      ) : null}
    </div>
  );
}
