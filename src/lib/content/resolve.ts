import { ar } from "@/lib/content/ar";
import { en, type ContentDictionary, type ContentKey } from "@/lib/content/en";
import type { LocaleCode } from "@/types/workspace";

export const dictionaries: Record<LocaleCode, ContentDictionary> = {
  en,
  ar,
};

export function getDictionary(locale: LocaleCode): ContentDictionary {
  return dictionaries[locale] ?? en;
}

/**
 * Resolve a content key for a given locale.
 * Always look up by key; never concatenate sentence fragments (docs/06 §11).
 */
export function translate(
  locale: LocaleCode,
  key: ContentKey,
  vars?: Record<string, string | number>,
): string {
  const dictionary = getDictionary(locale);
  let value: string = dictionary[key] ?? en[key] ?? key;
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
  }
  return value;
}

export function hasContentKey(key: string): key is ContentKey {
  return key in en;
}

/** Resolve a dynamic key from config (labelKey fields) with fallback. */
export function translateKey(
  locale: LocaleCode,
  key: string,
  fallback?: string,
): string {
  if (hasContentKey(key)) return translate(locale, key);
  return fallback ?? key;
}

export type TranslateFn = (
  key: ContentKey,
  vars?: Record<string, string | number>,
) => string;

export type TranslateKeyFn = (key: string, fallback?: string) => string;

export function createTranslator(locale: LocaleCode): TranslateFn {
  return (key, vars) => translate(locale, key, vars);
}

export function createKeyTranslator(locale: LocaleCode): TranslateKeyFn {
  return (key, fallback) => translateKey(locale, key, fallback);
}
