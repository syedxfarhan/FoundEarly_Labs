/**
 * Phase 1.1 foundation boot surface — not a product/demo/marketing page.
 * Confirms the enterprise platform boots. Feature surfaces arrive in later phases.
 */
export default function FoundationPage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-content flex-col justify-center gap-6 px-6 py-16">
      <p className="type-label text-muted-foreground">Phase 1.1</p>
      <h1 className="type-h1 text-foreground">Enterprise foundation ready</h1>
      <p className="max-w-xl type-body-lg text-muted-foreground">
        Design tokens, theme infrastructure, providers, motion presets, presentation and command
        architecture are configured. Product surfaces are intentionally not implemented in this
        phase.
      </p>
      <ul className="grid gap-2 type-body text-muted-foreground">
        <li>Tokens · light / dark / semantic / motion</li>
        <li>Providers · theme · tooltip · toast · motion · presentation · commands</li>
        <li>Accessibility · focus · skip link · reduced motion</li>
      </ul>
    </div>
  );
}
