"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";

import { OverlayLayer } from "@/components/layout/OverlayLayer";
import { overlayIds, storageKeys } from "@/config/constants";
import { type ContentKey, useT } from "@/lib/content";
import { useCommands } from "@/providers/CommandProvider";
import { useShellUi } from "@/providers/ShellUiProvider";
import type { CommandDefinition, CommandSection } from "@/lib/commands/registry";
import { cn } from "@/utils/cn";

const SECTION_LABEL: Record<CommandSection, ContentKey> = {
  navigation: "command.category.navigation",
  presentation: "command.category.presentation",
  simulator: "command.category.simulator",
  workspace: "command.category.workspace",
  system: "command.category.system",
};

function loadRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKeys.recentCommands);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string").slice(0, 6)
      : [];
  } catch {
    return [];
  }
}

/**
 * Command palette UI (cmdk) — architecture only, no business actions.
 * Docs/16 §4 Workspace Launcher foundation.
 */
export function CommandPalette() {
  const t = useT();

  const { isOverlayOpen, closeOverlay } = useShellUi();
  const open = isOverlayOpen(overlayIds.commandPalette);
  const { commands, runCommand } = useCommands();
  const [recent, setRecent] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (open) setRecent(loadRecent());
  }, [open]);

  const remember = React.useCallback((id: string) => {
    const next = [id, ...loadRecent().filter((x) => x !== id)].slice(0, 6);
    window.localStorage.setItem(storageKeys.recentCommands, JSON.stringify(next));
    setRecent(next);
  }, []);

  const sections = React.useMemo(() => {
    const map = new Map<CommandSection, CommandDefinition[]>();
    for (const command of commands) {
      const list = map.get(command.section) ?? [];
      list.push(command);
      map.set(command.section, list);
    }
    return map;
  }, [commands]);

  const recentCommands = recent
    .map((id) => commands.find((c) => c.id === id))
    .filter((c): c is (typeof commands)[number] => Boolean(c));

  return (
    <OverlayLayer
      open={open}
      onClose={closeOverlay}
      className="flex min-h-svh items-start justify-center px-4 pt-[12vh]"
      labelledBy="command-palette-title"
    >
      <Command
        className={cn(
          "w-full max-w-xl overflow-hidden rounded-lg border border-border bg-surface shadow-elevation_3",
        )}
        label={t("command.open")}
        shouldFilter
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-icon-md text-muted-foreground" strokeWidth={1.5} aria-hidden />
          <Command.Input
            id="command-palette-title"
            placeholder={t("command.placeholder")}
            className="h-12 w-full bg-transparent type-body-lg outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center type-body text-muted-foreground">
            {t("command.empty")}
          </Command.Empty>

          {recentCommands.length > 0 ? (
            <Command.Group heading={t("command.recent")} className="space-y-1">
              {recentCommands.map((command) => (
                <CommandItem
                  key={`recent-${command.id}`}
                  label={command.label}
                  hint={command.shortcutHint}
                  onSelect={async () => {
                    remember(command.id);
                    closeOverlay();
                    await runCommand(command.id);
                  }}
                />
              ))}
            </Command.Group>
          ) : null}

          {Array.from(sections.entries()).map(([section, list]) => (
            <Command.Group
              key={section}
              heading={t(SECTION_LABEL[section])}
              className="mt-2 space-y-1"
            >
              {list.map((command) => (
                <CommandItem
                  key={command.id}
                  label={command.label}
                  hint={command.shortcutHint}
                  onSelect={async () => {
                    remember(command.id);
                    closeOverlay();
                    await runCommand(command.id);
                  }}
                />
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command>
    </OverlayLayer>
  );
}

function CommandItem({
  label,
  hint,
  onSelect,
}: {
  label: string;
  hint?: string;
  onSelect: () => void | Promise<void>;
}) {
  return (
    <Command.Item
      value={label}
      onSelect={() => {
        void onSelect();
      }}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 type-body",
        "aria-selected:bg-surface-muted data-[selected=true]:bg-surface-muted",
      )}
    >
      <span>{label}</span>
      {hint ? <kbd className="type-label text-muted-foreground">{hint}</kbd> : null}
    </Command.Item>
  );
}
