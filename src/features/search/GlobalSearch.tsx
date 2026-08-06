"use client";

import * as React from "react";
import Link from "next/link";
import { LoaderCircle, Search } from "lucide-react";

import { OverlayLayer } from "@/components/layout/OverlayLayer";
import { EmptyState } from "@/components/empty/EmptyState";
import { overlayIds } from "@/config/constants";
import { t } from "@/lib/content";
import { useSearch, type SearchCategoryId, type SearchHit } from "@/providers/SearchProvider";
import { useShellUi } from "@/providers/ShellUiProvider";
import { cn } from "@/utils/cn";

const CATEGORY_LABEL: Record<SearchCategoryId, Parameters<typeof t>[0]> = {
  workspaces: "search.category.workspaces",
  sections: "search.category.sections",
  commands: "search.category.commands",
  projects: "search.category.projects",
};

export function GlobalSearch() {
  const { isOverlayOpen, closeOverlay } = useShellUi();
  const open = isOverlayOpen(overlayIds.globalSearch);
  const {
    query,
    setQuery,
    runSearch,
    results,
    isSearching,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useSearch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      runSearch("");
    }
  }, [open, setQuery, runSearch]);

  const grouped = React.useMemo(() => {
    const map = new Map<SearchCategoryId, SearchHit[]>();
    for (const hit of results) {
      const list = map.get(hit.category) ?? [];
      list.push(hit);
      map.set(hit.category, list);
    }
    return map;
  }, [results]);

  return (
    <OverlayLayer
      open={open}
      onClose={closeOverlay}
      className="flex min-h-svh items-start justify-center px-4 pt-[12vh]"
      labelledBy="global-search-title"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-surface shadow-elevation_3">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-icon-md text-muted-foreground" strokeWidth={1.5} aria-hidden />
          <input
            ref={inputRef}
            id="global-search-title"
            value={query}
            onChange={(event) => runSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && query.trim()) {
                addRecentSearch(query);
              }
            }}
            placeholder={t("search.placeholder")}
            className="h-12 w-full bg-transparent type-body-lg outline-none placeholder:text-muted-foreground"
            aria-label={t("common.search")}
          />
          {isSearching ? (
            <LoaderCircle className="size-icon-md animate-spin text-muted-foreground" aria-hidden />
          ) : null}
        </div>

        <div className="max-h-80 overflow-y-auto p-3">
          <p className="mb-3 type-body-sm text-muted-foreground">{t("search.indexHint")}</p>

          {!query && recentSearches.length > 0 ? (
            <div className="mb-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="type-label text-muted-foreground">{t("search.recent")}</p>
                <button
                  type="button"
                  className="type-body-sm text-muted-foreground hover:text-foreground"
                  onClick={clearRecentSearches}
                >
                  {t("common.action.close")}
                </button>
              </div>
              <ul className="space-y-1">
                {recentSearches.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="w-full rounded-md px-3 py-2 text-start type-body hover:bg-surface-muted"
                      onClick={() => runSearch(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {!query ? (
            <div className="space-y-2">
              <p className="type-label text-muted-foreground">{t("search.categories")}</p>
              <ul className="grid grid-cols-2 gap-2">
                {(Object.keys(CATEGORY_LABEL) as SearchCategoryId[]).map((category) => (
                  <li
                    key={category}
                    className="rounded-md border border-border px-3 py-3 type-body text-muted-foreground"
                  >
                    {t(CATEGORY_LABEL[category])}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {query && !isSearching && results.length === 0 ? (
            <EmptyState
              icon={Search}
              title={t("empty.search.title")}
              description={t("empty.search.description")}
              size="sm"
            />
          ) : null}

          {query && results.length > 0 ? (
            <div className="space-y-4">
              {Array.from(grouped.entries()).map(([category, hits]) => (
                <div key={category} className="space-y-1">
                  <p className="type-label text-muted-foreground">{t(CATEGORY_LABEL[category])}</p>
                  <ul className="space-y-1">
                    {hits.map((hit) => (
                      <li key={hit.id}>
                        {hit.href ? (
                          <Link
                            href={hit.href}
                            onClick={() => {
                              addRecentSearch(query);
                              closeOverlay();
                            }}
                            className={cn(
                              "block rounded-md px-3 py-2 type-body hover:bg-surface-muted",
                            )}
                          >
                            <span className="font-medium text-foreground">{hit.title}</span>
                            {hit.description ? (
                              <span className="mt-1 block type-body-sm text-muted-foreground">
                                {hit.description}
                              </span>
                            ) : null}
                          </Link>
                        ) : (
                          <div className="rounded-md px-3 py-2 type-body">
                            <span className="font-medium">{hit.title}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : null}

          {isSearching ? (
            <p className="py-6 text-center type-body text-muted-foreground" role="status">
              {t("search.loading")}
            </p>
          ) : null}
        </div>
      </div>
    </OverlayLayer>
  );
}
