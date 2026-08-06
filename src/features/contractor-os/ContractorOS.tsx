"use client";

import * as React from "react";

import { useWorkspaceEngine } from "@/features/workspace";
import { DashboardModule } from "@/features/contractor-os/modules/DashboardModule";
import { DocumentsModule } from "@/features/contractor-os/modules/DocumentsModule";
import { EquipmentModule } from "@/features/contractor-os/modules/EquipmentModule";
import { ProjectsModule } from "@/features/contractor-os/modules/ProjectsModule";
import { PurchaseOrdersModule } from "@/features/contractor-os/modules/PurchaseOrdersModule";
import { SettingsModule } from "@/features/contractor-os/modules/SettingsModule";
import { WorkforceModule } from "@/features/contractor-os/modules/WorkforceModule";

function resolveModule(sectionId: string) {
  switch (sectionId) {
    case "projects":
      return <ProjectsModule />;
    case "workforce":
      return <WorkforceModule />;
    case "equipment":
      return <EquipmentModule />;
    case "documents":
      return <DocumentsModule />;
    case "purchase-orders":
      return <PurchaseOrdersModule />;
    case "settings":
      return <SettingsModule />;
    case "dashboard":
    default:
      return <DashboardModule />;
  }
}

/**
 * Demo 02 — ContractorOS for Al-Buraq Horizon Contracting.
 * Premium contractor management showcase inside the workspace shell.
 */
export function ContractorOS() {
  const { section } = useWorkspaceEngine();

  React.useEffect(() => {
    const scroller = document.querySelector('[data-layout="workspace-content"]');
    if (scroller instanceof HTMLElement) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [section.id]);

  return (
    <div data-demo="contractor-os" className="pb-4">
      {resolveModule(section.id)}
    </div>
  );
}
