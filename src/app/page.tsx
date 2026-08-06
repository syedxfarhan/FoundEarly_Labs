import type { Metadata } from "next";

import { CredibilityLanding } from "@/features/credibility-landing";
import { APP_NAME } from "@/config/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} — AI and software for construction`,
  description:
    "FoundEarly Labs builds custom websites, internal software, AI systems, and business automation for construction companies.",
};

/** Credibility Landing — entry surface (docs/03 §2). */
export default function HomePage() {
  return <CredibilityLanding />;
}
