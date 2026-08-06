import { SKIP_NAV_TARGET_ID } from "@/lib/a11y";

/** Skip link target landmark — wire href="#main-content" from layout. */
export function MainLandmark({ children }: { children: React.ReactNode }) {
  return (
    <main id={SKIP_NAV_TARGET_ID} tabIndex={-1} className="outline-none">
      {children}
    </main>
  );
}
