# FoundEarly Labs — Interactive Capability Showcase
# Dependency justifications (docs/07_IMPLEMENTATION_RULES.md §9)

## Runtime
- next / react / react-dom — App Router framework (DECISIONS / docs/07)
- typescript — strict typing (docs/07)
- tailwindcss / postcss / autoprefixer — token-constrained styling (docs/07, docs/09)
- next-themes — light/dark/system theme with hydration-safe persistence
- framer-motion — declarative motion presets (docs/05)
- lucide-react — primary icon library (docs/14)
- class-variance-authority — component variant contracts (docs/04)
- clsx + tailwind-merge — class composition utility (`cn`)
- @radix-ui/react-tooltip + @radix-ui/react-slot — accessible primitives under our styled layer (docs/07); shadcn-compatible
- cmdk — command palette primitive for future Workspace Launcher (docs/16); architecture only in 1.1
- react-hook-form + zod — form/schema foundation for later workspace forms; not wired to demo UI yet
- sonner — toast host compatible with design-system toast pattern (docs/04)

## Not installed (intentionally)
- Redux / Zustand / React Query — rejected in Phase 1 (DECISIONS D-004)
- Chart libraries — Phase 1.2+ / visualization surfaces
- i18n runtime libraries — English-first; centralized content layer arrives with features
