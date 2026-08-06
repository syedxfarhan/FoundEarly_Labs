export {
  COMPANY,
  SERVICES,
  PROJECTS,
  LEADERSHIP,
  CLIENTS,
  OPEN_ROLES,
  BENEFITS,
  WHY_CHOOSE,
  FEATURED_PROJECT_IDS,
  getFeaturedProjects,
} from "./corporateWebsite";

export type {
  WebsiteProject,
  WebsiteProjectStatus,
  WebsiteService,
  WebsiteLeader,
  WebsiteRole,
  WebsiteClient,
} from "./corporateWebsite";

export {
  OS_PROJECTS,
  OS_EMPLOYEES,
  OS_EQUIPMENT,
  OS_DOCUMENTS,
  OS_PURCHASE_ORDERS,
  OS_ACTIVITY,
  OS_DEADLINES,
  OS_KPIS,
  DOC_FOLDERS,
  getProjectName,
  getProjectById,
  initials,
} from "./contractorOs";

export type {
  ProjectScheduleStatus,
  PoStatus,
  DocStatus,
  OsProject,
  OsEmployee,
  OsEquipment,
  OsDocument,
  OsPurchaseOrder,
  OsActivity,
  OsDeadline,
} from "./contractorOs";
