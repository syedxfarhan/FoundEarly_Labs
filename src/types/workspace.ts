/**
 * Shared workspace / presentation / shell types.
 * Domain entity types for fixtures arrive with later Phase 1 data modules.
 */

export type ProjectCode = "P-1042" | "P-1058" | "P-1071" | "P-1083" | "P-1096";

export type ThemeMode = "light" | "dark" | "system";

export type SemanticIntent = "neutral" | "info" | "success" | "warning" | "danger";

export type Direction = "ltr" | "rtl";

export type LocaleCode = "en" | "ar";

/** Workspace identifiers — registry is the source of truth. */
export type WorkspaceId =
  | "project-command"
  | "corporate-website"
  | "procurement"
  | "document-control"
  | "rfi-submittals";

export type WorkspaceSectionId = string;

export type WorkspaceLifecycleState =
  | "idle"
  | "loading"
  | "ready"
  | "empty"
  | "coming-soon"
  | "error";

export type WorkspaceSectionMeta = {
  id: WorkspaceSectionId;
  labelKey: string;
  /** Relative path segment under the workspace */
  path: string;
  /** Phase 1 preview sections are read-only / empty until content ships */
  status: "ready" | "preview" | "coming-soon";
  order: number;
};

export type WorkspaceMeta = {
  id: WorkspaceId;
  labelKey: string;
  descriptionKey: string;
  /** URL slug */
  path: string;
  icon: string;
  available: boolean;
  phase: 1 | 2;
  defaultSectionId: WorkspaceSectionId;
  sections: readonly WorkspaceSectionMeta[];
};

export type WorkspaceRouteState = {
  workspaceId: WorkspaceId;
  sectionId: WorkspaceSectionId;
  projectCode: ProjectCode;
};
