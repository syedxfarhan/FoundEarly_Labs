"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

/** App-wide Radix tooltip delay context (docs/04 Tooltip). */
export function TooltipProvider({
  delayDuration = 200,
  skipDelayDuration = 120,
  children,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}
