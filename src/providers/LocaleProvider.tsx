"use client";

import * as React from "react";

import { storageKeys } from "@/config/constants";
import type { Direction, LocaleCode } from "@/types/workspace";

type LocaleContextValue = {
  locale: LocaleCode;
  direction: Direction;
  setLocale: (locale: LocaleCode) => void;
  toggleDirectionPreview: () => void;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function localeToDirection(locale: LocaleCode): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Language + RTL foundation (docs/19, D-003).
 * English copy only; Arabic locale flips document direction for layout readiness.
 * Full translations arrive in Phase 3.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<LocaleCode>("en");
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKeys.locale);
    if (stored === "en" || stored === "ar") {
      setLocaleState(stored);
    }
    setHydrated(true);
  }, []);

  const setLocale = React.useCallback((next: LocaleCode) => {
    setLocaleState(next);
    window.localStorage.setItem(storageKeys.locale, next);
  }, []);

  const direction = localeToDirection(locale);

  React.useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = direction;
  }, [locale, direction, hydrated]);

  const value = React.useMemo<LocaleContextValue>(
    () => ({
      locale,
      direction,
      setLocale,
      toggleDirectionPreview: () => setLocale(locale === "en" ? "ar" : "en"),
    }),
    [locale, direction, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
