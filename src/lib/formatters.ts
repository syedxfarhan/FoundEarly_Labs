/**
 * Domain-aware formatters (docs/02 §10, docs/06).
 * Framework-agnostic — no React imports.
 */

/** Format SAR currency per Product Design Manual §10.1. */
export function formatSar(
  value: number,
  options?: { unitRate?: boolean; unitSuffix?: string },
): string {
  const abs = Math.abs(value);
  const useDecimals = options?.unitRate === true || abs < 10_000;
  const formatted = new Intl.NumberFormat("en-SA", {
    minimumFractionDigits: useDecimals ? 2 : 0,
    maximumFractionDigits: useDecimals ? 2 : 0,
  }).format(value);

  const base = `SAR ${formatted}`;
  return options?.unitSuffix ? `${base} / ${options.unitSuffix}` : base;
}

/** Format dates as DD MMM YYYY (docs/02 §10.2). */
export function formatDate(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Format a percentage with optional decimals. */
export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`;
}

/** Format integer counts with locale grouping. */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-SA").format(value);
}
