/**
 * Accessibility helpers (foundation). Prefer semantic HTML first;
 * these cover common ARIA composition cases (docs/02 §9, docs/07 §10).
 */

export function ariaBoolean(value: boolean | undefined): "true" | "false" | undefined {
  if (value === undefined) return undefined;
  return value ? "true" : "false";
}

/** Build an aria-labelledby string from id parts, omitting empties. */
export function joinAriaIds(...ids: Array<string | undefined | null>): string | undefined {
  const cleaned = ids.filter((id): id is string => Boolean(id));
  return cleaned.length > 0 ? cleaned.join(" ") : undefined;
}

export const SKIP_NAV_TARGET_ID = "main-content";
