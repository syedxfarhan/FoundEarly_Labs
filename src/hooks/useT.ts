"use client";

import { useLocale } from "@/providers/LocaleProvider";
import type { TranslateFn, TranslateKeyFn } from "@/lib/content/resolve";

/**
 * Locale-aware content helpers. Prefer this over the static `t()` export
 * inside client components so copy re-renders when language changes.
 */
export function useT(): TranslateFn {
  return useLocale().t;
}

export function useTKey(): TranslateKeyFn {
  return useLocale().tKey;
}

export function useTranslations() {
  const { language, direction, translations, t, tKey, setLanguage } = useLocale();
  return { language, direction, translations, t, tKey, setLanguage };
}
