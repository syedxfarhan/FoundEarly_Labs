import { en, type ContentKey } from "@/lib/content/en";

/**
 * Content resolver — English only in Phase 1; Arabic packs in Phase 3.
 * Always look up by key; never concatenate sentence fragments (docs/06 §11).
 */
export function t(key: ContentKey, vars?: Record<string, string | number>): string {
  let value: string = en[key] ?? key;
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
export function tKey(key: string, fallback?: string): string {
  if (hasContentKey(key)) return t(key);
  return fallback ?? key;
}

export type { ContentKey };
export { en };
