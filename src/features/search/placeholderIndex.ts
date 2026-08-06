import { WORKSPACE_REGISTRY, workspaceHref } from "@/config/workspaces";
import type { TranslateKeyFn } from "@/lib/content";
import { createKeyTranslator } from "@/lib/content";
import type { SearchHit } from "@/providers/SearchProvider";

/** Placeholder search index — no real indexing (Phase 1.2 shell only). */
export function buildPlaceholderSearchIndex(
  tKey: TranslateKeyFn = createKeyTranslator("en"),
): SearchHit[] {
  const hits: SearchHit[] = [];

  for (const workspace of WORKSPACE_REGISTRY) {
    hits.push({
      id: `ws-${workspace.id}`,
      title: tKey(workspace.labelKey),
      category: "workspaces",
      href: workspace.available ? workspaceHref(workspace.id) : undefined,
      description: tKey(workspace.descriptionKey),
    });

    for (const section of workspace.sections) {
      hits.push({
        id: `sec-${workspace.id}-${section.id}`,
        title: `${tKey(workspace.labelKey)} · ${tKey(section.labelKey)}`,
        category: "sections",
        href: workspace.available ? workspaceHref(workspace.id, section.path) : undefined,
      });
    }
  }

  hits.push({
    id: "project-P-1042",
    title: `P-1042 ${tKey("fixture.project.P-1042.name")}`,
    category: "projects",
    description: tKey("search.project.defaultDescription"),
  });

  return hits;
}
