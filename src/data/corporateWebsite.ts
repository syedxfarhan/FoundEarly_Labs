/**
 * Demo 01 — Al-Buraq Horizon corporate website fixtures.
 * Aligns with docs/08_DEMO_DATA_GUIDE.md (D-002). Marketing copy only —
 * operational fixture modules arrive with later workspace content.
 */

export type WebsiteProjectStatus = "Complete" | "On Track" | "At Risk" | "Delayed";

export type WebsiteProject = {
  id: string;
  name: string;
  location: string;
  valueSar: number;
  completionYear: number;
  scope: string;
  status: WebsiteProjectStatus;
  typeLabel: string;
};

export type WebsiteService = {
  id: string;
  title: string;
  summary: string;
};

export type WebsiteLeader = {
  id: string;
  name: string;
  role: string;
  focus: string;
};

export type WebsiteRole = {
  id: string;
  title: string;
  location: string;
  type: "Full-time" | "Contract";
  department: string;
  summary: string;
};

export type WebsiteClient = {
  id: string;
  name: string;
};

export const COMPANY = {
  legalName: "Al-Buraq Horizon Contracting Co.",
  shortName: "Al-Buraq Horizon",
  wordmark: "AL-BURAQ HORIZON",
  mark: "AH",
  tagline: "Industrial and civil construction across the Kingdom.",
  industry: "General Contractor",
  founded: 2009,
  yearsInBusiness: 17,
  employees: 940,
  headquarters: "Al-Khobar, Eastern Province, Saudi Arabia",
  classification: "Grade 2 Contractor — Saudi Contractors Authority",
  aramcoCode: "AR-CL-2291",
  cities: [
    "Al-Khobar",
    "Dammam",
    "Jubail Industrial City",
    "Dhahran",
    "Riyadh",
    "Yanbu",
  ] as const,
  certifications: [
    "ISO 9001:2015 Quality Management",
    "ISO 45001:2018 Occupational Health & Safety",
    "ISO 14001:2015 Environmental Management",
    "Aramco Approved Vendor (AR-CL-2291)",
    "Saudi Contractors Authority — Grade 2",
  ] as const,
  phone: "+966 13 849 2200",
  email: "info@alburaqhorizon.sa",
  careersEmail: "careers@alburaqhorizon.sa",
  addressLines: [
    "Al-Buraq Horizon Contracting Co.",
    "Prince Faisal Bin Fahd Road",
    "Al-Khobar 34427",
    "Kingdom of Saudi Arabia",
  ] as const,
  stats: [
    { label: "Years in business", value: "17" },
    { label: "Projects delivered", value: "180+" },
    { label: "Professionals", value: "940" },
    { label: "Cities served", value: "6" },
  ] as const,
} as const;

export const SERVICES: readonly WebsiteService[] = [
  {
    id: "civil",
    title: "Civil Construction",
    summary:
      "Structural concrete, earthworks, and building envelopes for industrial and commercial facilities.",
  },
  {
    id: "industrial",
    title: "Industrial Projects",
    summary:
      "Process support facilities, utility upgrades, and plant infrastructure for petrochemical and manufacturing sites.",
  },
  {
    id: "mep",
    title: "MEP",
    summary:
      "Mechanical, electrical, and plumbing packages executed with in-house supervision and qualified subcontractors.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    summary:
      "Roads, utilities, enabling works, and site development for logistics and mixed-use developments.",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    summary:
      "Planned shutdown support, corrective works, and facilities maintenance under controlled method statements.",
  },
  {
    id: "pm",
    title: "Project Management",
    summary:
      "Schedule control, cost reporting, document control, and client interface across multi-discipline packages.",
  },
] as const;

/** Portfolio aligned to docs/08 §3, plus one completed warehouse package for a six-project showcase. */
export const PROJECTS: readonly WebsiteProject[] = [
  {
    id: "P-1042",
    name: "Jubail Process Utility Upgrade",
    location: "Jubail Industrial City",
    valueSar: 84_600_000,
    completionYear: 2026,
    scope: "Utility corridor, piping racks, and civil packages for process support infrastructure.",
    status: "On Track",
    typeLabel: "Industrial",
  },
  {
    id: "P-1058",
    name: "Dhahran Logistics Hub Expansion",
    location: "Dhahran",
    valueSar: 46_250_000,
    completionYear: 2026,
    scope: "Warehouse expansion, yard paving, and stormwater infrastructure for a regional logistics operator.",
    status: "At Risk",
    typeLabel: "Industrial / Civil",
  },
  {
    id: "P-1071",
    name: "Riyadh Corporate Campus — Phase 2",
    location: "Riyadh",
    valueSar: 112_900_000,
    completionYear: 2027,
    scope: "Commercial structure, façade, and MEP fit-out for a multi-building corporate campus.",
    status: "On Track",
    typeLabel: "Commercial / MEP",
  },
  {
    id: "P-1083",
    name: "Yanbu Desalination Support Facility",
    location: "Yanbu",
    valueSar: 63_400_000,
    completionYear: 2025,
    scope: "MEP-led support buildings, electrical rooms, and ancillary civil works for a desalination campus.",
    status: "Delayed",
    typeLabel: "Industrial / MEP",
  },
  {
    id: "P-1096",
    name: "Al-Khobar Waterfront Mixed-Use — Enabling Works",
    location: "Al-Khobar",
    valueSar: 29_750_000,
    completionYear: 2024,
    scope: "Site enabling, retaining structures, and utilities for a coastal mixed-use development.",
    status: "Complete",
    typeLabel: "Civil",
  },
  {
    id: "P-1102",
    name: "Jubail Industrial Warehouse Complex",
    location: "Jubail Industrial City",
    valueSar: 51_800_000,
    completionYear: 2023,
    scope: "Four warehouse bays, office block, and external works for an industrial estates operator.",
    status: "Complete",
    typeLabel: "Industrial / Civil",
  },
] as const;

export const FEATURED_PROJECT_IDS = ["P-1042", "P-1071", "P-1096"] as const;

export const LEADERSHIP: readonly WebsiteLeader[] = [
  {
    id: "faisal",
    name: "Faisal Al-Ghamdi",
    role: "Project Director",
    focus: "Portfolio delivery and client governance across Eastern Province industrial packages.",
  },
  {
    id: "noura",
    name: "Noura Al-Sabti",
    role: "Senior Project Manager",
    focus: "Schedule and commercial control for multi-discipline industrial and civil projects.",
  },
  {
    id: "lina",
    name: "Lina Mansour",
    role: "QA/QC Manager",
    focus: "Inspection regimes, NCR close-out, and ISO-aligned quality systems.",
  },
  {
    id: "khalid",
    name: "Khalid Rashidi",
    role: "Procurement Lead",
    focus: "Vendor qualification, long-lead materials, and Aramco-aligned supply chains.",
  },
] as const;

export const CLIENTS: readonly WebsiteClient[] = [
  { id: "spi", name: "Saudi Petrochemical Industries" },
  { id: "egl", name: "Eastern Gulf Logistics" },
  { id: "falcon", name: "Falcon Crest Real Estate" },
  { id: "nwia", name: "National Water Infrastructure" },
  { id: "marjan", name: "Marjan Coastal Developments" },
  { id: "gie", name: "Gulf Industrial Estates" },
] as const;

export const OPEN_ROLES: readonly WebsiteRole[] = [
  {
    id: "pm-riyadh",
    title: "Project Manager — Commercial",
    location: "Riyadh",
    type: "Full-time",
    department: "Projects",
    summary: "Lead delivery for campus and commercial packages, including client reporting and variation control.",
  },
  {
    id: "pe-jubail",
    title: "Project Engineer — Civil",
    location: "Jubail Industrial City",
    type: "Full-time",
    department: "Engineering",
    summary: "Support site execution, RFIs, and method statements on industrial civil packages.",
  },
  {
    id: "qa-dammam",
    title: "QA/QC Engineer",
    location: "Dammam",
    type: "Full-time",
    department: "Quality",
    summary: "Plan inspections, manage MIR/WIR workflows, and maintain the project quality register.",
  },
  {
    id: "dc-khobar",
    title: "Document Controller",
    location: "Al-Khobar",
    type: "Contract",
    department: "Document Control",
    summary: "Maintain drawing and submittal registers with disciplined revision control.",
  },
] as const;

export const BENEFITS = [
  "Competitive salary and annual performance review",
  "Medical coverage for employees and eligible dependents",
  "Structured career paths across projects and disciplines",
  "Site and office rotation with clear HSE standards",
  "Training support for technical and professional certifications",
] as const;

export const WHY_CHOOSE = [
  {
    title: "Delivery discipline",
    body: "Schedule, cost, and document control are treated as core project systems — not afterthoughts.",
  },
  {
    title: "Industrial credibility",
    body: "Aramco-aligned processes and Grade 2 classification for clients who require proven vendor capability.",
  },
  {
    title: "Self-performed MEP strength",
    body: "MEP packages are planned and supervised in-house, reducing interface risk on complex facilities.",
  },
  {
    title: "Safety before schedule",
    body: "PTW discipline, toolbox talks, and stop-work authority are non-negotiable on every site.",
  },
] as const;

export function getFeaturedProjects(): readonly WebsiteProject[] {
  return FEATURED_PROJECT_IDS.map(
    (id) => PROJECTS.find((project) => project.id === id)!,
  );
}
