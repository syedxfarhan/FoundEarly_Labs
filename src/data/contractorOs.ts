/**
 * Demo 02 — ContractorOS fixtures for Al-Buraq Horizon Contracting Co.
 * Aligns with docs/08_DEMO_DATA_GUIDE.md (D-002). Showcase data only.
 */

export type ProjectScheduleStatus = "On Track" | "At Risk" | "Delayed" | "Complete";

export type PoStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Issued to Vendor"
  | "Delivered"
  | "On Hold";

export type DocStatus = "Current" | "Superseded" | "Pending Approval" | "Under Revision";

export type OsProject = {
  id: string;
  name: string;
  location: string;
  progress: number;
  valueSar: number;
  manager: string;
  status: ProjectScheduleStatus;
  completionDate: string;
  client: string;
  typeLabel: string;
  summary: string;
};

export type OsEmployee = {
  id: string;
  name: string;
  role: string;
  site: string;
  status: "On Site" | "Off Shift" | "Leave";
  shift: "Day" | "Night" | "Office";
  projectId: string | null;
};

export type OsEquipment = {
  id: string;
  name: string;
  type: string;
  status: "Assigned" | "Available" | "Maintenance";
  location: string;
  projectId: string | null;
  nextMaintenance: string;
};

export type OsDocument = {
  id: string;
  name: string;
  category: string;
  folder: string;
  projectId: string | null;
  status: DocStatus;
  updated: string;
  owner: string;
};

export type OsPurchaseOrder = {
  id: string;
  vendor: string;
  amountSar: number;
  status: PoStatus;
  approval: string;
  projectId: string;
  issued: string;
};

export type OsActivity = {
  id: string;
  time: string;
  label: string;
  detail: string;
};

export type OsDeadline = {
  id: string;
  date: string;
  label: string;
  projectId: string;
};

export const OS_PROJECTS: readonly OsProject[] = [
  {
    id: "P-1042",
    name: "Jubail Process Utility Upgrade",
    location: "Jubail Industrial City",
    progress: 62,
    valueSar: 84_600_000,
    manager: "Noura Al-Sabti",
    status: "On Track",
    completionDate: "28 Nov 2026",
    client: "Saudi Petrochemical Industries Co.",
    typeLabel: "Industrial",
    summary:
      "Utility corridor, piping racks, and civil packages for process support infrastructure.",
  },
  {
    id: "P-1058",
    name: "Dhahran Logistics Hub Expansion",
    location: "Dhahran",
    progress: 41,
    valueSar: 46_250_000,
    manager: "Omar Haddad",
    status: "At Risk",
    completionDate: "30 Jun 2026",
    client: "Eastern Gulf Logistics Holding",
    typeLabel: "Industrial / Civil",
    summary: "Warehouse expansion, yard paving, and stormwater infrastructure.",
  },
  {
    id: "P-1071",
    name: "Riyadh Corporate Campus — Phase 2",
    location: "Riyadh",
    progress: 48,
    valueSar: 112_900_000,
    manager: "Omar Haddad",
    status: "On Track",
    completionDate: "15 Mar 2027",
    client: "Falcon Crest Real Estate Development",
    typeLabel: "Commercial / MEP",
    summary: "Commercial structure, façade, and MEP fit-out for a multi-building campus.",
  },
  {
    id: "P-1083",
    name: "Yanbu Desalination Support Facility",
    location: "Yanbu",
    progress: 78,
    valueSar: 63_400_000,
    manager: "Noura Al-Sabti",
    status: "Delayed",
    completionDate: "22 Aug 2025",
    client: "National Water Infrastructure Authority",
    typeLabel: "Industrial / MEP",
    summary: "MEP-led support buildings, electrical rooms, and ancillary civil works.",
  },
  {
    id: "P-1096",
    name: "Al-Khobar Waterfront — Enabling Works",
    location: "Al-Khobar",
    progress: 100,
    valueSar: 29_750_000,
    manager: "Faisal Al-Ghamdi",
    status: "Complete",
    completionDate: "18 Dec 2024",
    client: "Marjan Coastal Developments",
    typeLabel: "Civil",
    summary: "Site enabling, retaining structures, and utilities for coastal mixed-use.",
  },
  {
    id: "P-1102",
    name: "Jubail Industrial Warehouse Complex",
    location: "Jubail Industrial City",
    progress: 100,
    valueSar: 51_800_000,
    manager: "Noura Al-Sabti",
    status: "Complete",
    completionDate: "14 Sep 2023",
    client: "Gulf Industrial Estates Co.",
    typeLabel: "Industrial / Civil",
    summary: "Four warehouse bays, office block, and external works.",
  },
] as const;

export const OS_EMPLOYEES: readonly OsEmployee[] = [
  {
    id: "E-01",
    name: "Faisal Al-Ghamdi",
    role: "Project Director",
    site: "Al-Khobar (HQ)",
    status: "On Site",
    shift: "Office",
    projectId: "P-1042",
  },
  {
    id: "E-02",
    name: "Noura Al-Sabti",
    role: "Senior Project Manager",
    site: "Dammam",
    status: "On Site",
    shift: "Day",
    projectId: "P-1042",
  },
  {
    id: "E-03",
    name: "Omar Haddad",
    role: "Project Manager",
    site: "Riyadh",
    status: "On Site",
    shift: "Day",
    projectId: "P-1071",
  },
  {
    id: "E-04",
    name: "Sara Al-Qahtani",
    role: "Project Engineer (Civil)",
    site: "Jubail",
    status: "On Site",
    shift: "Day",
    projectId: "P-1042",
  },
  {
    id: "E-05",
    name: "Yousef Barakat",
    role: "Project Engineer (MEP)",
    site: "Al-Khobar",
    status: "On Site",
    shift: "Day",
    projectId: "P-1058",
  },
  {
    id: "E-06",
    name: "Lina Mansour",
    role: "QA/QC Manager",
    site: "Dammam",
    status: "Off Shift",
    shift: "Day",
    projectId: "P-1058",
  },
  {
    id: "E-07",
    name: "Khalid Rashidi",
    role: "Procurement Lead",
    site: "Al-Khobar (HQ)",
    status: "On Site",
    shift: "Office",
    projectId: null,
  },
  {
    id: "E-08",
    name: "Huda Al-Amri",
    role: "Document Controller",
    site: "Riyadh",
    status: "On Site",
    shift: "Office",
    projectId: "P-1071",
  },
  {
    id: "E-09",
    name: "Tariq Fahmy",
    role: "Site Engineer",
    site: "Yanbu",
    status: "On Site",
    shift: "Night",
    projectId: "P-1083",
  },
  {
    id: "E-10",
    name: "Mona Al-Sulaiman",
    role: "Cost Controller",
    site: "Al-Khobar (HQ)",
    status: "Leave",
    shift: "Office",
    projectId: null,
  },
] as const;

export const OS_EQUIPMENT: readonly OsEquipment[] = [
  {
    id: "EX-1",
    name: "Excavator EX-1",
    type: "Excavator",
    status: "Assigned",
    location: "Jubail Industrial City",
    projectId: "P-1042",
    nextMaintenance: "12 Sep 2026",
  },
  {
    id: "EX-2",
    name: "Excavator EX-2",
    type: "Excavator",
    status: "Assigned",
    location: "Dhahran",
    projectId: "P-1058",
    nextMaintenance: "03 Oct 2026",
  },
  {
    id: "TC-1",
    name: "Tower Crane TC-1",
    type: "Crane",
    status: "Assigned",
    location: "Riyadh",
    projectId: "P-1071",
    nextMaintenance: "28 Aug 2026",
  },
  {
    id: "MC-1",
    name: "Mobile Crane MC-1 (50T)",
    type: "Crane",
    status: "Available",
    location: "Al-Khobar Yard",
    projectId: null,
    nextMaintenance: "18 Sep 2026",
  },
  {
    id: "CP-1",
    name: "Concrete Pump CP-1",
    type: "Concrete Pump",
    status: "Assigned",
    location: "Yanbu",
    projectId: "P-1083",
    nextMaintenance: "05 Sep 2026",
  },
  {
    id: "GS-1",
    name: "Generator Set GS-1 (500kVA)",
    type: "Generator",
    status: "Assigned",
    location: "Jubail Industrial City",
    projectId: "P-1042",
    nextMaintenance: "22 Aug 2026",
  },
  {
    id: "GS-2",
    name: "Generator Set GS-2 (500kVA)",
    type: "Generator",
    status: "Maintenance",
    location: "Al-Khobar Yard",
    projectId: null,
    nextMaintenance: "10 Aug 2026",
  },
  {
    id: "FL-1",
    name: "Forklift FL-1",
    type: "Forklift",
    status: "Assigned",
    location: "Dhahran",
    projectId: "P-1058",
    nextMaintenance: "15 Sep 2026",
  },
] as const;

export const OS_DOCUMENTS: readonly OsDocument[] = [
  {
    id: "DOC-001",
    name: "P-1042 Main Contract — Rev C",
    category: "Contracts",
    folder: "Contracts",
    projectId: "P-1042",
    status: "Current",
    updated: "14 Jan 2025",
    owner: "Faisal Al-Ghamdi",
  },
  {
    id: "DOC-002",
    name: "RFI-1042-013 Structural Loading",
    category: "RFIs",
    folder: "RFIs",
    projectId: "P-1042",
    status: "Under Revision",
    updated: "12 Jun 2025",
    owner: "Sara Al-Qahtani",
  },
  {
    id: "DOC-003",
    name: "P-1071 BOQ — Civil Section",
    category: "BOQs",
    folder: "BOQs",
    projectId: "P-1071",
    status: "Current",
    updated: "02 Mar 2025",
    owner: "Mona Al-Sulaiman",
  },
  {
    id: "DOC-004",
    name: "A-1042-STR-042 — Pipe Rack Framing",
    category: "Drawings",
    folder: "Drawings",
    projectId: "P-1042",
    status: "Current",
    updated: "20 Jun 2025",
    owner: "Huda Al-Amri",
  },
  {
    id: "DOC-005",
    name: "PO-1042-018 Supplier Invoice Pack",
    category: "Invoices",
    folder: "Invoices",
    projectId: "P-1042",
    status: "Pending Approval",
    updated: "01 Jul 2025",
    owner: "Khalid Rashidi",
  },
  {
    id: "DOC-006",
    name: "Corporate HSE Manual 2025",
    category: "Safety Manuals",
    folder: "Safety Manuals",
    projectId: null,
    status: "Current",
    updated: "08 Jan 2025",
    owner: "Lina Mansour",
  },
  {
    id: "DOC-007",
    name: "P-1058 Site Layout — Rev B",
    category: "Drawings",
    folder: "Drawings",
    projectId: "P-1058",
    status: "Superseded",
    updated: "11 May 2025",
    owner: "Huda Al-Amri",
  },
  {
    id: "DOC-008",
    name: "RFI-1071-006 Curtain Wall Interface",
    category: "RFIs",
    folder: "RFIs",
    projectId: "P-1071",
    status: "Current",
    updated: "24 Jun 2025",
    owner: "Omar Haddad",
  },
] as const;

export const OS_PURCHASE_ORDERS: readonly OsPurchaseOrder[] = [
  {
    id: "PO-1042-018",
    vendor: "Nakheel Steel Fabrication LLC",
    amountSar: 2_340_000,
    status: "Pending Approval",
    approval: "Faisal Al-Ghamdi",
    projectId: "P-1042",
    issued: "28 Jun 2025",
  },
  {
    id: "PO-1042-019",
    vendor: "Zamil Electromechanical Supplies",
    amountSar: 860_500,
    status: "Issued to Vendor",
    approval: "Noura Al-Sabti",
    projectId: "P-1042",
    issued: "02 Jul 2025",
  },
  {
    id: "PO-1058-011",
    vendor: "Gulf Coast Ready-Mix",
    amountSar: 1_125_000,
    status: "Delivered",
    approval: "Omar Haddad",
    projectId: "P-1058",
    issued: "15 May 2025",
  },
  {
    id: "PO-1071-007",
    vendor: "Desert Rose Interiors Trading",
    amountSar: 3_480_000,
    status: "Approved",
    approval: "Omar Haddad",
    projectId: "P-1071",
    issued: "10 Jun 2025",
  },
  {
    id: "PO-1083-014",
    vendor: "Al-Rashid Pipes & Fittings",
    amountSar: 642_000,
    status: "On Hold",
    approval: "Noura Al-Sabti",
    projectId: "P-1083",
    issued: "22 Jun 2025",
  },
  {
    id: "PO-1071-008",
    vendor: "Horizon Scaffolding & Access",
    amountSar: 214_750,
    status: "Draft",
    approval: "—",
    projectId: "P-1071",
    issued: "04 Jul 2025",
  },
] as const;

export const OS_ACTIVITY: readonly OsActivity[] = [
  {
    id: "A-1",
    time: "08:40",
    label: "PO pending approval",
    detail: "PO-1042-018 · Nakheel Steel · SAR 2,340,000",
  },
  {
    id: "A-2",
    time: "09:15",
    label: "RFI overdue",
    detail: "RFI-1042-013 · Structural loading for platform P-3",
  },
  {
    id: "A-3",
    time: "10:05",
    label: "Equipment maintenance due",
    detail: "GS-2 Generator · Al-Khobar Yard",
  },
  {
    id: "A-4",
    time: "11:20",
    label: "Drawing issued",
    detail: "A-1042-STR-042 · Pipe Rack Framing · Current",
  },
  {
    id: "A-5",
    time: "13:45",
    label: "Workforce update",
    detail: "Tariq Fahmy on night shift · P-1083 Yanbu",
  },
] as const;

export const OS_DEADLINES: readonly OsDeadline[] = [
  {
    id: "D-1",
    date: "12 Aug 2026",
    label: "RFI-1042-012 response due",
    projectId: "P-1042",
  },
  {
    id: "D-2",
    date: "18 Aug 2026",
    label: "P-1058 stormwater ITP review",
    projectId: "P-1058",
  },
  {
    id: "D-3",
    date: "22 Aug 2026",
    label: "P-1083 planned finish",
    projectId: "P-1083",
  },
  {
    id: "D-4",
    date: "28 Aug 2026",
    label: "TC-1 tower crane maintenance",
    projectId: "P-1071",
  },
] as const;

export const OS_KPIS = {
  activeProjects: 4,
  employeesOnSite: 7,
  equipmentUtilization: 75,
  openPurchaseOrders: 3,
  pendingApprovals: 2,
  monthlyRevenueSar: 18_450_000,
} as const;

export const DOC_FOLDERS = [
  "Contracts",
  "RFIs",
  "BOQs",
  "Drawings",
  "Invoices",
  "Safety Manuals",
] as const;

export function getProjectName(id: string): string {
  return OS_PROJECTS.find((p) => p.id === id)?.name ?? id;
}

export function getProjectById(id: string): OsProject | undefined {
  return OS_PROJECTS.find((p) => p.id === id);
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
