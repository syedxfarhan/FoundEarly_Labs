import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AppProviders } from "@/providers/AppProviders";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";
import { MainLandmark } from "@/components/system/MainLandmark";
import { APP_NAME, APP_PRODUCT } from "@/config/constants";
import { SKIP_NAV_TARGET_ID } from "@/lib/a11y";

import "@/styles/tokens.css";
import "@/styles/globals.css";

/**
 * Primary UI typeface per docs/02 §4 — geometric-humanist sans with tabular figures.
 * Arabic (Noto Sans Arabic) is additive in Phase 3; fallback stack reserved on --font-sans.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  // Weights 400 / 500 / 600 only (docs/02 §4)
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${APP_PRODUCT}`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    "Enterprise foundation for the FoundEarly Labs Interactive Capability Showcase.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-svh bg-background text-foreground">
        <a href={`#${SKIP_NAV_TARGET_ID}`} className="skip-link">
          Skip to main content
        </a>
        <AppProviders>
          <ErrorBoundary>
            <MainLandmark>{children}</MainLandmark>
          </ErrorBoundary>
        </AppProviders>
      </body>
    </html>
  );
}
