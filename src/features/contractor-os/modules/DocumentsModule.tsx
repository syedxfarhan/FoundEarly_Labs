"use client";

import * as React from "react";
import { FileText, Folder } from "lucide-react";

import { DOC_FOLDERS, OS_DOCUMENTS, getProjectName } from "@/data/contractorOs";
import {
  documentNameKey,
  projectNameKey,
  projectNameShortKey,
  resolveContentKey,
  translateDocFolder,
  translateStatus,
  useT,
} from "@/lib/content";
import {
  ModuleToolbar,
  Reveal,
  StatusBadge,
  scheduleTone,
} from "@/features/contractor-os/ui";
import { cn } from "@/utils/cn";

function translateOsProjectName(id: string, fallback: string, t: ReturnType<typeof useT>) {
  return resolveContentKey(
    projectNameShortKey(id),
    resolveContentKey(projectNameKey(id), fallback, t),
    t,
  );
}

export function DocumentsModule() {
  const t = useT();

  const [search, setSearch] = React.useState("");
  const [folder, setFolder] = React.useState<string>("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(OS_DOCUMENTS[0]?.id ?? null);

  const filtered = OS_DOCUMENTS.filter((doc) => {
    const matchesSearch =
      search.trim() === "" ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase()) ||
      doc.id.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = folder === "all" || doc.folder === folder;
    return matchesSearch && matchesFolder;
  });

  const selected = filtered.find((d) => d.id === selectedId) ?? filtered[0] ?? null;

  React.useEffect(() => {
    if (selected && selected.id !== selectedId) {
      setSelectedId(selected.id);
    }
  }, [selected, selectedId]);

  return (
    <div className="flex flex-col gap-6" data-os-module="documents">
      <Reveal className="space-y-2">
        <h2 className="type-h2 text-foreground">{t("os.documents.title")}</h2>
        <p className="max-w-2xl type-body text-muted-foreground">{t("os.documents.support")}</p>
      </Reveal>

      <ModuleToolbar
        search={search}
        onSearch={setSearch}
        searchPlaceholder={t("os.documents.search")}
        filter={folder}
        onFilter={setFolder}
        filterLabel={t("os.documents.folder")}
        filterOptions={[
          { value: "all", label: t("os.filter.all") },
          ...DOC_FOLDERS.map((name) => ({
            value: name,
            label: translateDocFolder(name, t),
          })),
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-12">
        <Reveal className="xl:col-span-3">
          <aside className="rounded-lg border border-border bg-surface p-3">
            <p className="px-2 pb-2 type-label text-muted-foreground">
              {t("os.documents.folders")}
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setFolder("all")}
                  className={cn(
                    "flex w-full min-h-touch items-center gap-2 rounded-md px-3 type-body",
                    folder === "all"
                      ? "bg-brand/10 font-medium text-brand"
                      : "text-foreground hover:bg-surface-muted",
                  )}
                >
                  <Folder className="size-icon-sm" strokeWidth={1.5} aria-hidden />
                  {t("os.filter.all")}
                </button>
              </li>
              {DOC_FOLDERS.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => setFolder(name)}
                    className={cn(
                      "flex w-full min-h-touch items-center gap-2 rounded-md px-3 type-body",
                      folder === name
                        ? "bg-brand/10 font-medium text-brand"
                        : "text-foreground hover:bg-surface-muted",
                    )}
                  >
                    <Folder className="size-icon-sm" strokeWidth={1.5} aria-hidden />
                    {translateDocFolder(name, t)}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>

        <Reveal className="xl:col-span-5" delay={0.03}>
          <div className="rounded-lg border border-border bg-surface">
            <div className="border-b border-border px-4 py-3">
              <p className="type-label text-muted-foreground">{t("os.documents.recent")}</p>
            </div>
            <ul>
              {filtered.map((doc) => (
                <li key={doc.id} className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setSelectedId(doc.id)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-start transition-colors duration-fast ease-enter",
                      selected?.id === doc.id
                        ? "bg-brand/5"
                        : "hover:bg-surface-muted/60",
                    )}
                  >
                    <FileText
                      className="mt-0.5 size-icon-md shrink-0 text-brand"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block type-body font-medium text-foreground">
                        {resolveContentKey(documentNameKey(doc.id), doc.name, t)}
                      </span>
                      <span className="mt-1 block type-body-sm text-muted-foreground">
                        {translateDocFolder(doc.category, t)} · {doc.updated}
                      </span>
                    </span>
                    <StatusBadge
                      label={translateStatus(doc.status, t)}
                      tone={scheduleTone(doc.status)}
                    />
                  </button>
                </li>
              ))}
            </ul>
            {filtered.length === 0 ? (
              <p className="px-4 py-6 type-body text-muted-foreground">{t("os.empty.filtered")}</p>
            ) : null}
          </div>
        </Reveal>

        <Reveal className="xl:col-span-4" delay={0.06}>
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="type-label text-muted-foreground">{t("os.documents.preview")}</p>
            {selected ? (
              <div className="mt-4 space-y-4">
                <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-md border border-border bg-surface-muted p-6 text-center">
                  <FileText className="size-icon-lg text-brand" strokeWidth={1.5} aria-hidden />
                  <p className="type-body font-medium text-foreground">
                    {resolveContentKey(documentNameKey(selected.id), selected.name, t)}
                  </p>
                  <p className="type-body-sm text-muted-foreground">
                    {t("os.documents.previewHint")}
                  </p>
                </div>
                <dl className="space-y-3">
                  <div>
                    <dt className="type-label text-muted-foreground">{t("os.documents.meta.id")}</dt>
                    <dd className="mt-1 type-body text-foreground">{selected.id}</dd>
                  </div>
                  <div>
                    <dt className="type-label text-muted-foreground">
                      {t("os.documents.meta.owner")}
                    </dt>
                    <dd className="mt-1 type-body text-foreground">{selected.owner}</dd>
                  </div>
                  <div>
                    <dt className="type-label text-muted-foreground">
                      {t("os.documents.meta.project")}
                    </dt>
                    <dd className="mt-1 type-body text-foreground">
                      {selected.projectId
                        ? translateOsProjectName(
                            selected.projectId,
                            getProjectName(selected.projectId),
                            t,
                          )
                        : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="type-label text-muted-foreground">
                      {t("os.documents.meta.status")}
                    </dt>
                    <dd className="mt-1">
                      <StatusBadge
                        label={translateStatus(selected.status, t)}
                        tone={scheduleTone(selected.status)}
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="mt-4 type-body text-muted-foreground">{t("os.documents.none")}</p>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
