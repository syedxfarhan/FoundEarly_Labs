import { en, type ContentDictionary, type ContentKey } from "@/lib/content/en";
import { getDictionary, translate, translateKey } from "@/lib/content/resolve";
import type { LocaleCode } from "@/types/workspace";

export { ar } from "@/lib/content/ar";
export { en, type ContentDictionary, type ContentKey };
export {
  createKeyTranslator,
  createTranslator,
  dictionaries,
  getDictionary,
  hasContentKey,
  translate,
  translateKey,
  type TranslateFn,
  type TranslateKeyFn,
} from "@/lib/content/resolve";
export { useT, useTKey, useTranslations } from "@/hooks/useT";
export {
  activityLabelKey,
  deadlineLabelKey,
  documentNameKey,
  equipmentNameKey,
  projectNameKey,
  projectNameShortKey,
  projectScopeKey,
  projectSummaryKey,
  resolveContentKey,
  translateDocFolder,
  translateEquipmentType,
  translateJobRole,
  translateLocation,
  translateProjectName,
  translateProjectType,
  translateStatus,
} from "@/lib/content/localize";

/**
 * Static English resolver for server components / metadata.
 * Client UI should use `useT()` so copy updates with language changes.
 */
export function t(key: ContentKey, vars?: Record<string, string | number>): string {
  return translate("en", key, vars);
}

/** Resolve a dynamic key from config (labelKey fields) with English fallback. */
export function tKey(key: string, fallback?: string): string {
  return translateKey("en", key, fallback);
}

/** Ensure dictionaries stay in lockstep during development. */
export function assertDictionaryParity(locale: LocaleCode = "ar"): void {
  const dictionary = getDictionary(locale);
  for (const key of Object.keys(en) as ContentKey[]) {
    if (!(key in dictionary)) {
      throw new Error(`Missing ${locale} translation for key: ${key}`);
    }
  }
}
