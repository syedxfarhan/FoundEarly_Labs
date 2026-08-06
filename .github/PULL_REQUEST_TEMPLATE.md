<!--
Before opening this PR, read CONTRIBUTING.md in full if you have not already.
Delete any section below that is genuinely not applicable, and say why inline.
-->

## Summary

<!-- What changed and why, in plain language. Not a diff summary. -->

## Docs updated (Spec-First Rule — CONTRIBUTING.md)

<!-- List every docs/*.md file updated in this PR, or state explicitly why none needed updating. -->

## Design Quality Checklist (docs/02_PRODUCT_DESIGN_MANUAL.md §11 + docs/12_DESIGN_REVIEW_CHECKLIST.md)

- [ ] Author self-check (docs/02 §11) complete
- [ ] Design reviewer ran docs/12 (or N/A with reason)
- [ ] Spacing/type/tokens used exclusively — no raw values
- [ ] Currency/date formatting matches docs/02 §10
- [ ] Primary action is singular and unambiguous
- [ ] Async states (loading/success/error) all designed
- [ ] Status color paired with icon + text
- [ ] Keyboard nav + focus states verified
- [ ] Contrast checked (light + dark)
- [ ] Motion durations/easing match docs/05; reduced-motion verified
- [ ] No Enterprise Design Anti-Patterns (docs/02 §13)
- [ ] No console errors on load/interact/idle

## Implementation Checklist (docs/07_IMPLEMENTATION_RULES.md §15)

- [ ] No new component/variant without a docs/04 update in this PR
- [ ] No new status/copy string without a docs/06 update if it expands a closed vocabulary
- [ ] Import boundaries respected; lint passes with zero warnings
- [ ] No `any`, no unexplained lint-disables
- [ ] Fixture data changes pass the consistency test (docs/08 §8)
- [ ] New dependency justified below (or N/A)

## New dependencies (if any)

<!-- Name, version, why it's needed, why first-party code wasn't sufficient. -->

## Screenshots / recording

<!-- Required for any visual change. -->
