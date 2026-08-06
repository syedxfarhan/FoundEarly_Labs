import type { ContentKey } from "@/lib/content/en";
import { hasContentKey, type TranslateFn } from "@/lib/content/resolve";

/** Map closed-vocabulary English status / shift labels to content keys. */
const STATUS_KEYS: Record<string, ContentKey> = {
  "On Track": "status.onTrack",
  "At Risk": "status.atRisk",
  Delayed: "status.delayed",
  Complete: "status.complete",
  Draft: "status.draft",
  "Pending Approval": "status.pendingApproval",
  Approved: "status.approved",
  "Issued to Vendor": "status.issuedToVendor",
  Delivered: "status.delivered",
  "On Hold": "status.onHold",
  Current: "status.current",
  Superseded: "status.superseded",
  "Under Revision": "status.underRevision",
  "On Site": "status.onSite",
  "Off Shift": "status.offShift",
  Leave: "status.leave",
  Assigned: "status.assigned",
  Available: "status.available",
  Maintenance: "status.maintenance",
  Day: "status.day",
  Night: "status.night",
  Office: "status.office",
  "Full-time": "status.fullTime",
  Contract: "status.contract",
  Watch: "status.watch",
  Overdue: "status.overdue",
  Open: "status.open",
};

const LOCATION_KEYS: Record<string, ContentKey> = {
  "Jubail Industrial City": "fixture.location.jubail",
  Dhahran: "fixture.location.dhahran",
  Riyadh: "fixture.location.riyadh",
  Yanbu: "fixture.location.yanbu",
  "Al-Khobar": "fixture.location.khobar",
  Dammam: "fixture.location.dammam",
  "Al-Khobar (HQ)": "fixture.location.khobarHq",
  "Al-Khobar Yard": "fixture.location.khobarYard",
  Jubail: "fixture.location.jubailShort",
};

const TYPE_KEYS: Record<string, ContentKey> = {
  Industrial: "fixture.type.industrial",
  "Industrial / Civil": "fixture.type.industrialCivil",
  "Commercial / MEP": "fixture.type.commercialMep",
  "Industrial / MEP": "fixture.type.industrialMep",
  Civil: "fixture.type.civil",
};

const DOC_FOLDER_KEYS: Record<string, ContentKey> = {
  Contracts: "fixture.docFolder.contracts",
  RFIs: "fixture.docFolder.rfis",
  BOQs: "fixture.docFolder.boqs",
  Drawings: "fixture.docFolder.drawings",
  Invoices: "fixture.docFolder.invoices",
  "Safety Manuals": "fixture.docFolder.safety",
};

const EQUIPMENT_TYPE_KEYS: Record<string, ContentKey> = {
  Excavator: "fixture.equipment.type.excavator",
  Crane: "fixture.equipment.type.crane",
  "Concrete Pump": "fixture.equipment.type.concretePump",
  Generator: "fixture.equipment.type.generator",
  Forklift: "fixture.equipment.type.forklift",
};

const JOB_KEYS: Record<string, ContentKey> = {
  "Project Director": "fixture.job.projectDirector",
  "Senior Project Manager": "fixture.job.seniorProjectManager",
  "Project Manager": "fixture.job.projectManager",
  "Project Engineer (Civil)": "fixture.job.projectEngineerCivil",
  "Project Engineer (MEP)": "fixture.job.projectEngineerMep",
  "QA/QC Manager": "fixture.job.qaqcManager",
  "Procurement Lead": "fixture.job.procurementLead",
  "Document Controller": "fixture.job.documentController",
  "Site Engineer": "fixture.job.siteEngineer",
  "Cost Controller": "fixture.job.costController",
};

function lookup(
  map: Record<string, ContentKey>,
  value: string,
  t: TranslateFn,
): string {
  const key = map[value];
  return key ? t(key) : value;
}

export function translateStatus(value: string, t: TranslateFn): string {
  return lookup(STATUS_KEYS, value, t);
}

export function translateLocation(value: string, t: TranslateFn): string {
  return lookup(LOCATION_KEYS, value, t);
}

export function translateProjectType(value: string, t: TranslateFn): string {
  return lookup(TYPE_KEYS, value, t);
}

export function translateDocFolder(value: string, t: TranslateFn): string {
  return lookup(DOC_FOLDER_KEYS, value, t);
}

export function translateEquipmentType(value: string, t: TranslateFn): string {
  return lookup(EQUIPMENT_TYPE_KEYS, value, t);
}

export function translateJobRole(value: string, t: TranslateFn): string {
  return lookup(JOB_KEYS, value, t);
}

export function resolveContentKey(key: string, fallback: string, t: TranslateFn): string {
  if (hasContentKey(key)) return t(key);
  return fallback;
}

export function projectNameKey(id: string): string {
  return `fixture.project.${id}.name`;
}

export function projectScopeKey(id: string): string {
  return `fixture.project.${id}.scope`;
}

export function projectSummaryKey(id: string): string {
  return `fixture.project.${id}.summary`;
}

export function projectNameShortKey(id: string): string {
  return `fixture.project.${id}.nameShort`;
}

export function equipmentNameKey(id: string): string {
  return `fixture.equipment.${id}.name`;
}

export function documentNameKey(id: string): string {
  return `fixture.doc.${id}.name`;
}

export function activityLabelKey(id: string): string {
  return `fixture.activity.${id}.label`;
}

export function deadlineLabelKey(id: string): string {
  return `fixture.deadline.${id}.label`;
}

export function translateProjectName(id: string, fallback: string, t: TranslateFn): string {
  return resolveContentKey(projectNameKey(id), fallback, t);
}
