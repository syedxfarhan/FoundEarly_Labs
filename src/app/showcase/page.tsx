import type { Metadata } from "next";

import { ShowcaseHub } from "@/features/showcase-hub";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: t("showcase.title"),
};

/** Interactive Showcase hub — launcher for completed demos. */
export default function ShowcasePage() {
  return <ShowcaseHub />;
}
