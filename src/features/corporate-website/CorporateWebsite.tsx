"use client";

import * as React from "react";

import { useWorkspaceEngine } from "@/features/workspace";
import { SiteFooter, SiteHeader } from "@/features/corporate-website/SiteChrome";
import { AboutPage } from "@/features/corporate-website/pages/AboutPage";
import { CareersPage } from "@/features/corporate-website/pages/CareersPage";
import { ContactPage } from "@/features/corporate-website/pages/ContactPage";
import { HomePage } from "@/features/corporate-website/pages/HomePage";
import { ProjectsPage } from "@/features/corporate-website/pages/ProjectsPage";
import { ServicesPage } from "@/features/corporate-website/pages/ServicesPage";

function resolvePage(sectionId: string) {
  switch (sectionId) {
    case "about":
      return <AboutPage />;
    case "services":
      return <ServicesPage />;
    case "projects":
      return <ProjectsPage />;
    case "careers":
      return <CareersPage />;
    case "contact":
      return <ContactPage />;
    case "home":
    default:
      return <HomePage />;
  }
}

/**
 * Demo 01 — Premium corporate website for Al-Buraq Horizon Contracting.
 * Renders inside the workspace canvas; does not replace the Credibility Landing.
 */
export function CorporateWebsite() {
  const { section } = useWorkspaceEngine();

  React.useEffect(() => {
    const scroller = document.querySelector('[data-layout="workspace-content"]');
    if (scroller instanceof HTMLElement) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [section.id]);

  return (
    <div className="scroll-smooth" data-demo="corporate-website">
      <SiteHeader />
      <main id="website-main">{resolvePage(section.id)}</main>
      <SiteFooter />
    </div>
  );
}
