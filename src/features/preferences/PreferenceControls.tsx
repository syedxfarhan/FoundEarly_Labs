"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Languages, Monitor, Moon, Sun } from "lucide-react";

import { ShellControl } from "@/components/layout/ShellControl";
import { t } from "@/lib/content";
import { useLocale } from "@/providers/LocaleProvider";
import type { LocaleCode, ThemeMode } from "@/types/workspace";
import { cn } from "@/utils/cn";

const THEME_CYCLE: ThemeMode[] = ["light", "dark", "system"];

/**
 * Theme switch — light / dark / system with persistence (next-themes)
 * and a short color transition during the change.
 */
export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = (theme as ThemeMode | undefined) ?? "light";

  const cycle = () => {
    document.documentElement.classList.add("theme-transition");
    const index = THEME_CYCLE.indexOf(current);
    const next = THEME_CYCLE[(index + 1) % THEME_CYCLE.length] ?? "light";
    setTheme(next);
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 320);
  };

  const Icon = !mounted
    ? Monitor
    : current === "system"
      ? Monitor
      : resolvedTheme === "dark"
        ? Moon
        : Sun;

  const label = !mounted
    ? t("shell.themeSwitch")
    : current === "light"
      ? t("shell.theme.light")
      : current === "dark"
        ? t("shell.theme.dark")
        : t("shell.theme.system");

  return (
    <ShellControl aria-label={`${t("shell.themeSwitch")}: ${label}`} onClick={cycle}>
      <Icon className="size-icon-md" strokeWidth={1.5} aria-hidden />
      <span className="sr-only">{label}</span>
    </ShellControl>
  );
}

/** Language + RTL foundation switch — English copy; direction persists. */
export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();

  const next: LocaleCode = locale === "en" ? "ar" : "en";

  return (
    <ShellControl
      aria-label={`${t("shell.languageSwitch")}: ${locale === "en" ? t("shell.language.en") : t("shell.language.ar")}`}
      title={t("shell.language.hint")}
      onClick={() => setLocale(next)}
    >
      <Languages className="size-icon-md" strokeWidth={1.5} aria-hidden />
      <span className="hidden type-label uppercase tracking-wide md:inline">
        {locale === "en" ? "EN" : "AR"}
      </span>
    </ShellControl>
  );
}

export function PreferenceMenu({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <LanguageSwitch />
      <ThemeSwitch />
    </div>
  );
}
