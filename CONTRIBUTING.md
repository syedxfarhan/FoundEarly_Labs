# Contributing

This repository is currently in **Phase 0 (Governance)**. This guide covers how to contribute to the governance layer now, and doubles as the standing process Phase 1+ implementation will follow.

## Before You Do Anything

1. Read `docs/01_PROJECT_SSOT.md`, then `PROJECT_PRINCIPLES.md`. If a proposed change conflicts with either, resolve that conflict explicitly (usually by updating the SSOT via `DECISIONS.md`, not by quietly working around it) before writing code or docs.
2. Identify which `/docs` file governs the area you're touching. There should always be exactly one owning document per concern (design → `02`, IA → `03`, components → `04`, motion → `05`, copy → `06`, code → `07`, data → `08`, tokens → `09`, structure → `10`). If you can't find the owning document, that's a gap — flag it, don't guess.

## Branching

- Branch from `main`.
- Branch names use the prefix `cursor/` and end in the assigned suffix when working as a cloud agent (e.g., `cursor/<descriptive-name>-98b9`); human contributors use `feature/<short-description>` or `fix/<short-description>`.
- One logical change per branch/PR. Do not bundle an unrelated documentation fix with a feature change.

## The Spec-First Rule

This is the single most important process rule in this repository:

> **Any change to a component, screen, status vocabulary, token, or folder boundary must update the owning `/docs` file in the same PR as the implementation.**

A PR that adds a new `Button` variant without updating `docs/04_COMPONENT_SYSTEM.md` is incomplete, regardless of whether the code works. A reviewer should reject it on that basis alone.

## Commit Messages

- Present tense, imperative mood: `Add RFI status vocabulary`, not `Added` or `Adding`.
- Reference the affected doc/module when relevant: `docs/06: add Arabic translation strategy`.
- One logical change per commit. Don't batch unrelated edits into a single commit.

## Pull Request Requirements

Every PR must include, in its description:

1. **What changed and why**, in plain language — not just a diff summary.
2. **Which `/docs` files were updated**, if any (per the Spec-First Rule above). If none needed updating, say so explicitly and why.
3. **Screenshots or a short recording** for any visual change — required both for human review and as the visual-regression baseline once that tooling exists (`docs/07_IMPLEMENTATION_RULES.md` §11.3).
4. **Dependency justification** for any new package added (`docs/07_IMPLEMENTATION_RULES.md` §9).

### PR Checklist Template

Copy this into every PR description once implementation begins:

```markdown
## Design Quality Checklist (docs/02_PRODUCT_DESIGN_MANUAL.md §11)
- [ ] Spacing/type/tokens used exclusively — no raw values
- [ ] Currency/date formatting matches docs/02 §10
- [ ] Primary action is singular and unambiguous
- [ ] Async states (loading/success/error) all designed
- [ ] Status color paired with icon + text
- [ ] Keyboard nav + focus states verified
- [ ] Contrast checked (light + dark)
- [ ] Motion durations/easing match docs/05; reduced-motion verified
- [ ] No console errors on load/interact/idle

## Implementation Checklist (docs/07_IMPLEMENTATION_RULES.md §15)
- [ ] No new component/variant without a docs/04 update in this PR
- [ ] No new status/copy string without a docs/06 update if it expands a closed vocabulary
- [ ] Import boundaries respected; lint passes with zero warnings
- [ ] No `any`, no unexplained lint-disables
- [ ] Fixture data changes pass the consistency test (docs/08 §8)
- [ ] New dependency justified below (or N/A)

## What changed and why


## Docs updated (or why not)


## Screenshots / recording

```

## Review Process

- **Docs-only PRs (Phase 0):** at least one reviewer with context on the affected document's domain (design, engineering, copy) confirms internal consistency with the other nine documents — cross-document contradictions are the main risk at this phase.
- **Design-system component PRs (Phase 1+):** two-person review minimum, per `docs/02_PRODUCT_DESIGN_MANUAL.md` §12.3 — one reviewer runs the Quality Checklist, a second role-plays the skeptical client persona.
- **Everything else:** standard single-reviewer review against the checklist above.

## When You Disagree With a Documented Rule

Open the conversation in the PR, not by silently deviating. If the rule is genuinely wrong, the fix is: update the owning doc, add an entry to `DECISIONS.md` explaining the change and why the original rule was insufficient, and proceed. Silent deviation is explicitly disallowed by `PROJECT_PRINCIPLES.md` §8.

## Fixture Data Changes

Any change to `docs/08_DEMO_DATA_GUIDE.md` (or, once it exists, `src/data/`) must preserve every consistency rule in that document's §8 (referential integrity, chronological plausibility, currency/formatting consistency, BOQ-to-contract-value reconciliation). This is checked by an automated test once implementation exists (`docs/07_IMPLEMENTATION_RULES.md` §11.5) and by manual review until then.
