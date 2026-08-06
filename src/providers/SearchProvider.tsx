"use client";

import * as React from "react";

import { storageKeys } from "@/config/constants";

export type SearchCategoryId = "workspaces" | "sections" | "commands" | "projects";

export type SearchHit = {
  id: string;
  title: string;
  category: SearchCategoryId;
  href?: string;
  description?: string;
};

type SearchContextValue = {
  query: string;
  setQuery: (query: string) => void;
  recentSearches: readonly string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  isSearching: boolean;
  results: readonly SearchHit[];
  runSearch: (query: string) => void;
};

const SearchContext = React.createContext<SearchContextValue | null>(null);

/**
 * Global search foundation — placeholder indexing only (no real backend).
 */
export function SearchProvider({
  children,
  index,
}: {
  children: React.ReactNode;
  /** Static placeholder documents supplied by the shell */
  index: readonly SearchHit[];
}) {
  const [query, setQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [results, setResults] = React.useState<readonly SearchHit[]>([]);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKeys.recentSearches);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setRecentSearches(parsed.filter((v): v is string => typeof v === "string").slice(0, 8));
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const persistRecent = React.useCallback((items: string[]) => {
    window.localStorage.setItem(storageKeys.recentSearches, JSON.stringify(items));
  }, []);

  const addRecentSearch = React.useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      setRecentSearches((prev) => {
        const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(0, 8);
        persistRecent(next);
        return next;
      });
    },
    [persistRecent],
  );

  const clearRecentSearches = React.useCallback(() => {
    setRecentSearches([]);
    persistRecent([]);
  }, [persistRecent]);

  const runSearch = React.useCallback(
    (value: string) => {
      setQuery(value);
      const trimmed = value.trim().toLowerCase();
      if (!trimmed) {
        setResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      // Simulated placeholder latency — bounded, offline-safe
      window.setTimeout(() => {
        const hits = index.filter(
          (doc) =>
            doc.title.toLowerCase().includes(trimmed) ||
            doc.description?.toLowerCase().includes(trimmed) ||
            doc.category.includes(trimmed),
        );
        setResults(hits);
        setIsSearching(false);
      }, 120);
    },
    [index],
  );

  const value = React.useMemo<SearchContextValue>(
    () => ({
      query,
      setQuery,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
      isSearching,
      results,
      runSearch,
    }),
    [
      query,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
      isSearching,
      results,
      runSearch,
    ],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch(): SearchContextValue {
  const ctx = React.useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return ctx;
}
