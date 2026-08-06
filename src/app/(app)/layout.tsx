import { WorkspaceShell } from "@/features/app-shell/WorkspaceShell";

/** Shell route group — every exploration surface shares WorkspaceShell. */
export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
