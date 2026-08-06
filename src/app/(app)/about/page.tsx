import type { Metadata } from "next";

import { AboutDemoContent } from "@/features/about/AboutDemoContent";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: t("about.title"),
};

/** Transparency surface (docs/03 §7) — shell-ready, no business demos. */
export default function AboutPage() {
  return <AboutDemoContent />;
}
