/** Clamp a number between min and max (inclusive). */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Group array items by a key selector. */
export function groupBy<T, K extends string | number>(
  items: readonly T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      const bucket = acc[key] ?? [];
      bucket.push(item);
      acc[key] = bucket;
      return acc;
    },
    {} as Record<K, T[]>,
  );
}

/** Remove nullish values from an array. */
export function compact<T>(items: readonly (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item != null);
}

/** Unique values preserving first-seen order. */
export function unique<T>(items: readonly T[]): T[] {
  return [...new Set(items)];
}
