"use client";

import * as React from "react";

import {
  buildCommandSearchIndex,
  searchCommands,
  type CommandDefinition,
  type CommandId,
  type CommandSearchDocument,
} from "@/lib/commands/registry";

type CommandContextValue = {
  commands: readonly CommandDefinition[];
  registerCommand: (command: CommandDefinition) => () => void;
  unregisterCommand: (id: CommandId) => void;
  runCommand: (id: CommandId) => Promise<void>;
  searchIndex: readonly CommandSearchDocument[];
  search: (query: string) => CommandSearchDocument[];
};

const CommandContext = React.createContext<CommandContextValue | null>(null);

/**
 * Global command registry — architecture only (docs/16 §4, §8).
 * UI (cmdk palette) lands in a later phase.
 */
export function CommandProvider({ children }: { children: React.ReactNode }) {
  const [commands, setCommands] = React.useState<CommandDefinition[]>([]);

  const registerCommand = React.useCallback((command: CommandDefinition) => {
    setCommands((prev) => {
      const without = prev.filter((c) => c.id !== command.id);
      return [...without, command];
    });
    return () => {
      setCommands((prev) => prev.filter((c) => c.id !== command.id));
    };
  }, []);

  const unregisterCommand = React.useCallback((id: CommandId) => {
    setCommands((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const runCommand = React.useCallback(
    async (id: CommandId) => {
      const command = commands.find((c) => c.id === id);
      if (!command) return;
      await command.run();
    },
    [commands],
  );

  const searchIndex = React.useMemo(() => buildCommandSearchIndex(commands), [commands]);

  const search = React.useCallback(
    (query: string) => searchCommands(searchIndex, query),
    [searchIndex],
  );

  const value = React.useMemo<CommandContextValue>(
    () => ({
      commands,
      registerCommand,
      unregisterCommand,
      runCommand,
      searchIndex,
      search,
    }),
    [commands, registerCommand, unregisterCommand, runCommand, searchIndex, search],
  );

  return <CommandContext.Provider value={value}>{children}</CommandContext.Provider>;
}

export function useCommands(): CommandContextValue {
  const ctx = React.useContext(CommandContext);
  if (!ctx) {
    throw new Error("useCommands must be used within CommandProvider");
  }
  return ctx;
}
