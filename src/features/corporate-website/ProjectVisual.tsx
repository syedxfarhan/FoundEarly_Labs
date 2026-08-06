import type { WebsiteProject } from "@/data/corporateWebsite";

/** Abstract project visual — intentional geometry, no stock photography. */
export function ProjectVisual({
  project,
  large = false,
}: {
  project: WebsiteProject;
  large?: boolean;
}) {
  return (
    <div
      className={
        large
          ? "relative flex min-h-[200px] flex-col justify-between overflow-hidden bg-brand p-5"
          : "relative flex min-h-[160px] flex-col justify-between overflow-hidden bg-brand p-5"
      }
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-y-0 end-0 w-1/4 border-s border-brand-foreground/15 bg-brand-foreground/5"
        aria-hidden
      />
      <span className="type-label text-brand-foreground/80">{project.typeLabel}</span>
      <span className="type-body-sm font-medium text-brand-foreground">{project.id}</span>
    </div>
  );
}
