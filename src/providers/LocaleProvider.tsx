"use client";

import * as React from "react";

import { storageKeys } from "@/config/constants";
import type { ContentDictionary } from "@/lib/content/en";
import {
  createKeyTranslator,
  createTranslator,
  getDictionary,
  type TranslateFn,
  type TranslateKeyFn,
} from "@/lib/content/resolve";
import type { Direction, LocaleCode } from "@/types/workspace";

type LocaleContextValue = {
  /** Active UI language (`en` | `ar`). */
  language: LocaleCode;
  /** @deprecated Prefer `language` — kept for existing call sites. */
  locale: LocaleCode;
  direction: Direction;
  translations: ContentDictionary;
  t: TranslateFn;
  tKey: TranslateKeyFn;
  setLanguage: (language: LocaleCode) => void;
  /** @deprecated Prefer `setLanguage`. */
  setLocale: (locale: LocaleCode) => void;
  toggleDirectionPreview: () => void;
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

function localeToDirection(language: LocaleCode): Direction {
  return language === "ar" ? "rtl" : "ltr";
}

/**
 * Language + RTL foundation (docs/19).
 * Exposes language, direction, and the active translation dictionary.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<LocaleCode>("en");
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(storageKeys.locale);
    if (stored === "en" || stored === "ar") {
      setLanguageState(stored);
    }
    setHydrated(true);
  }, []);

  const setLanguage = React.useCallback((next: LocaleCode) => {
    setLanguageState(next);
    window.localStorage.setItem(storageKeys.locale, next);
  }, []);

  const direction = localeToDirection(language);
  const translations = React.useMemo(() => getDictionary(language), [language]);
  const t = React.useMemo(() => createTranslator(language), [language]);
  const tKey = React.useMemo(() => createKeyTranslator(language), [language]);

  React.useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction, hydrated]);

  const value = React.useMemo<LocaleContextValue>(
    () => ({
      language,
      locale: language,
      direction,
      translations,
      t,
      tKey,
      setLanguage,
      setLocale: setLanguage,
      toggleDirectionPreview: () => setLanguage(language === "en" ? "ar" : "en"),
    }),
    [language, direction, translations, t, tKey, setLanguage],
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
