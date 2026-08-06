"use client";

import { PROJECTS } from "@/data/corporateWebsite";
import { formatSar } from "@/lib/formatters";
import {
  projectScopeKey,
  resolveContentKey,
  translateLocation,
  translateProjectName,
  translateProjectType,
  translateStatus,
  useT,
} from "@/lib/content";
import { PageIntro, Reveal } from "@/features/corporate-website/ui";
import { ProjectVisual } from "@/features/corporate-website/ProjectVisual";

export function ProjectsPage() {
  const t = useT();

  return (
    <div data-website-page="projects">
      <section className="border-b border-border bg-surface">
        <PageIntro
          eyebrow={t("website.projects.eyebrow")}
          title={t("website.projects.title")}
          support={t("website.projects.support")}
        />
      </section>

      <section>
        <div className="mx-auto grid max-w-content gap-6 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index, 5) * 0.03}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors duration-fast ease-enter hover:border-border-strong">
                <ProjectVisual project={project} large />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="type-label text-muted-foreground">{project.id}</span>
                    <span className="rounded-md border border-border px-2 py-1 type-label text-foreground">
                      {translateStatus(project.status, t)}
                    </span>
                  </div>
                  <h2 className="type-h3 text-foreground">
                    {translateProjectName(project.id, project.name, t)}
                  </h2>
                  <p className="type-body text-muted-foreground">
                    {resolveContentKey(projectScopeKey(project.id), project.scope, t)}
                  </p>
                  <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-border pt-4">
                    <div>
                      <dt className="type-label text-muted-foreground">
                        {t("website.projects.meta.location")}
                      </dt>
                      <dd className="mt-1 type-body text-foreground">
                        {translateLocation(project.location, t)}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-label text-muted-foreground">
                        {t("website.projects.meta.value")}
                      </dt>
                      <dd className="mt-1 type-body text-foreground" data-numeric="true">
                        {formatSar(project.valueSar)}
                      </dd>
                    </div>
                    <div>
                      <dt className="type-label text-muted-foreground">
                        {t("website.projects.meta.year")}
                      </dt>
                      <dd className="mt-1 type-body text-foreground">{project.completionYear}</dd>
                    </div>
                    <div>
                      <dt className="type-label text-muted-foreground">
                        {t("website.projects.meta.scope")}
                      </dt>
                      <dd className="mt-1 type-body text-foreground">
                        {translateProjectType(project.typeLabel, t)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
