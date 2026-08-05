# Project Principles

These are the operating principles for everyone who touches this repository — engineers, designers, writers, and reviewers. They are deliberately few, deliberately opinionated, and take precedence over personal preference or convenience. If a decision in `/docs` seems to conflict with one of these, the principle wins and the doc gets fixed.

## 1. This is a trust artifact, not a feature list.

Every decision is evaluated against one question: does this make a skeptical construction executive trust FoundEarly Labs more in the next 90 seconds? Feature count, technical novelty, and "cool" are not success criteria. See `docs/01_PROJECT_SSOT.md`.

## 2. Consistency is worth more than cleverness.

A slightly less impressive screen that matches every token, spacing rule, and copy convention in this system beats a brilliant one-off that breaks the pattern. Design-system drift is the fastest way a multi-contributor project starts looking like it wasn't built by one company.

## 3. Nothing ships without a spec.

If it's a new component, it's in `docs/04_COMPONENT_SYSTEM.md` first. If it's a new screen, it maps to `docs/03_INFORMATION_ARCHITECTURE.md` first. If it's a new status label, it's in `docs/06_COPY_GUIDELINES.md` first. Implementation without a spec update is not "moving fast" — it's accumulating undocumented debt in a system whose entire value is being fully documented.

## 4. Realism is a feature.

Every number, name, date, and status in this product must survive scrutiny from someone who has actually run a construction project. Fabricated-feeling data is a P0 defect, not a polish item. See `docs/08_DEMO_DATA_GUIDE.md`.

## 5. It must never break in the room.

This product is used live, once, in front of a decision-maker, by a non-engineer. There is no "we'll patch it after." Every architectural and design choice in this repository is biased toward predictability and recoverability over ambition. See `docs/01_PROJECT_SSOT.md` §7 (Success Metrics) and `docs/07_IMPLEMENTATION_RULES.md` §9 (Performance Requirements).

## 6. Restraint is the premium signal.

When in doubt between a quieter option and a flashier one — in color, motion, copy, or layout — choose the quieter one. This audience associates restraint with competence and flash with inexperience. See `docs/02_PRODUCT_DESIGN_MANUAL.md` §1.

## 7. Explain the "why," not just the "what."

Every non-obvious decision recorded anywhere in this repository (a component variant, a folder boundary, a copy rule) should carry its rationale, not just its conclusion. A rule without a reason gets silently violated the first time it's inconvenient; a rule with a reason survives.

## 8. Silent deviation is not allowed.

If you must deviate from any documented rule, the deviation is recorded in `DECISIONS.md` with rationale, in the same PR. An undocumented exception today is an unexplained inconsistency someone else has to debug in six months.

## 9. Build for the audience that's actually in the room.

Saudi Arabian construction, EPC, and industrial contracting professionals are the audience — not software buyers, not developers, not a generic global SaaS market. Every default (currency, date format, terminology, density) is chosen for them specifically. See `docs/02_PRODUCT_DESIGN_MANUAL.md` §10 and `docs/06_COPY_GUIDELINES.md` §10.

## 10. Governance exists to remove ambiguity, not to slow people down.

The `/docs` layer is large because it is meant to answer questions before they're asked, not to create process for its own sake. If a document is making a real decision harder instead of easier, that document is wrong and should be fixed — through `DECISIONS.md`, not through quietly ignoring it.
