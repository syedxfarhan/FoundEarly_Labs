"use client";

import * as React from "react";

import { useCommands } from "@/providers/CommandProvider";
import type { CommandDefinition } from "@/lib/commands/registry";

/** Register a command for the lifetime of the calling component. */
export function useRegisterCommand(command: CommandDefinition): void {
  const { registerCommand } = useCommands();

  React.useEffect(() => {
    return registerCommand(command);
    // Intentionally depend on stable identity fields only.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- command.run identity is caller-owned
  }, [registerCommand, command.id, command.label, command.section]);
}
