import { SHOWCASE_PATH } from "@/config/showcase";
import { WORKSPACE_REGISTRY, workspaceHref } from "@/config/workspaces";
import type { TranslateKeyFn } from "@/lib/content";
import { createKeyTranslator } from "@/lib/content";
import type { SearchHit } from "@/providers/SearchProvider";

/** Placeholder search index — indexes available workspaces and the showcase hub. */
export function buildPlaceholderSearchIndex(
  tKey: TranslateKeyFn = createKeyTranslator("en"),
): SearchHit[] {
  const hits: SearchHit[] = [
    {
      id: "showcase-hub",
      title: tKey("showcase.title"),
      category: "workspaces",
      href: SHOWCASE_PATH,
      description: tKey("showcase.support"),
    },
  ];

  for (const workspace of WORKSPACE_REGISTRY) {
    if (!workspace.available) continue;

    hits.push({
      id: `ws-${workspace.id}`,
      title: tKey(workspace.labelKey),
      category: "workspaces",
      href: workspaceHref(workspace.id),
      description: tKey(workspace.descriptionKey),
    });

    for (const section of workspace.sections) {
      if (section.status === "coming-soon") continue;
      hits.push({
        id: `sec-${workspace.id}-${section.id}`,
        title: `${tKey(workspace.labelKey)} · ${tKey(section.labelKey)}`,
        category: "sections",
        href: workspaceHref(workspace.id, section.path),
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
