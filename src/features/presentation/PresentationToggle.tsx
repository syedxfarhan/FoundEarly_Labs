"use client";

import { Presentation } from "lucide-react";

import { ShellControl } from "@/components/layout/ShellControl";
import { t } from "@/lib/content";
import { usePresentation } from "@/providers/PresentationProvider";

/** Presentation Mode toggle — chrome quieting only; no Presenter Toolbar yet. */
export function PresentationToggle() {
  const { isPresentationMode, togglePresentationMode } = usePresentation();

  return (
    <ShellControl
      aria-label={
        isPresentationMode ? t("shell.presentationOn") : t("shell.presentationOff")
      }
      aria-pressed={isPresentationMode}
      active={isPresentationMode}
      onClick={togglePresentationMode}
    >
      <Presentation className="size-icon-md" strokeWidth={1.5} aria-hidden />
      <span className="hidden type-body lg:inline">{t("shell.presentationToggle")}</span>
    </ShellControl>
  );
}
