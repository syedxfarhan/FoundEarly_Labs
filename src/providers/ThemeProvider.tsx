"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Light / dark / system theme with persistence and no flash
 * (next-themes + class strategy on <html>).
 * Default is light — presentation-primary per docs/09 §11.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      storageKey="foundearly-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
