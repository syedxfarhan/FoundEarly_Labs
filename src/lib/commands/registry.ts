/**
 * Command registry architecture (docs/16 Workspace Launcher / cmdk).
 * No command palette UI in Phase 1.1 — registry + types only.
 */

export type CommandId = string;

export type CommandSection =
  | "navigation"
  | "presentation"
  | "simulator"
  | "workspace"
  | "system";

export type CommandDefinition = {
  id: CommandId;
  label: string;
  section: CommandSection;
  /** Optional search keywords */
  keywords?: string[];
  /** Keyboard hint for cheatsheet (display only) */
  shortcutHint?: string;
  run: () => void | Promise<void>;
};

export type CommandSearchDocument = {
  id: CommandId;
  label: string;
  section: CommandSection;
  keywords: string[];
};

/** Build a flat search index from registered commands. */
export function buildCommandSearchIndex(
  commands: readonly CommandDefinition[],
): CommandSearchDocument[] {
  return commands.map((command) => ({
    id: command.id,
    label: command.label,
    section: command.section,
    keywords: [command.label, ...(command.keywords ?? [])].map((k) => k.toLowerCase()),
  }));
}

/** Naive substring search — foundation for future fuzzy search (docs/16 §4). */
export function searchCommands(
  index: readonly CommandSearchDocument[],
  query: string,
): CommandSearchDocument[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...index];
  return index.filter(
    (doc) => doc.label.toLowerCase().includes(q) || doc.keywords.some((k) => k.includes(q)),
  );
}
