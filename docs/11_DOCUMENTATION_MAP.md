# 11 — Documentation Map

**Owner:** VP of Engineering / Technical Writer
**Status:** Index of the governance layer. Start here if you do not know which document owns a question.

> Phase 0 intentionally produced many documents. This map prevents "which doc wins?" ambiguity and duplicate guidance.

---

## 1. Reading Order (Onboarding)

1. `01_PROJECT_SSOT.md` — what this is / is not
2. `PROJECT_PRINCIPLES.md` (repo root) — operating principles
3. `11_DOCUMENTATION_MAP.md` (this file) — how docs relate
4. Then domain-relevant deep reads below

## 2. Ownership by Concern

| If you need to decide… | Owning document | Do not treat as source of truth |
|---|---|---|
| Product goals, non-goals, success metrics | `01_PROJECT_SSOT.md` | README summaries |
| Visual philosophy, spacing/type rules, anti-patterns | `02_PRODUCT_DESIGN_MANUAL.md` | Ad hoc Figma comments |
| Final screen approval gate | `12_DESIGN_REVIEW_CHECKLIST.md` | Only the short §11 list in doc 02 (author self-check) |
| Navigation, Simulator flow, workspaces | `03_INFORMATION_ARCHITECTURE.md` | Implementation folder names alone |
| Component API / variants / states | `04_COMPONENT_SYSTEM.md` | Copy-pasted local variants |
| Animation timing / reduced motion | `05_MOTION_SYSTEM.md` | Framer Motion defaults |
| Voice, status strings, button copy | `06_COPY_GUIDELINES.md` | Slack suggestions |
| Construction term meanings | `13_CONSTRUCTION_DOMAIN_GUIDE.md` | Doc 06 §10 (short glossary only — defers here) |
| Code architecture, TS, testing, browser support | `07_IMPLEMENTATION_RULES.md` | Tribal knowledge |
| Fictional company / fixture IDs / reconciliation | `08_DEMO_DATA_GUIDE.md` | Invented placeholder names |
| Token values (color, space, motion, breakpoints) | `09_DESIGN_TOKENS.md` | Hardcoded theme experiments |
| Folder structure / ownership | `10_PROJECT_STRUCTURE.md` | "Where should I put this?" guesses |
| Icons | `14_ICONOGRAPHY_GUIDE.md` | Random SVG downloads |
| Charts / KPIs / dashboards | `15_DATA_VISUALIZATION_GUIDE.md` | Chart library demos |
| Live meeting / Presentation Mode | `16_PRESENTATION_MODE_GUIDE.md` | IA §6 alone (summary only) |
| Brand application / i18n keys | `19_BRAND_AND_I18N_CONVENTIONS.md` | Ad hoc string literals |
| When Phase 1 may start / DoD | `17_PHASE1_DEFINITION_OF_DONE.md` | Informal "looks ready" |
| In-room failure response | `18_LIVE_DEMO_RUNBOOK.md` | Improvised panic |

## 3. Conflict Resolution

1. `01_PROJECT_SSOT.md` wins on product intent conflicts.
2. For a specialized concern, the owning document in §2 wins over a summary mention elsewhere.
3. Material changes require `DECISIONS.md` entries when they alter goals, architecture, or closed vocabularies (`CONTRIBUTING.md`).
4. Cursor rules in `.cursor/rules/` **enforce** these docs — they must not invent rules that contradict `/docs`. If a rule and a doc disagree, fix the rule.

## 4. Hardening Additions (This Pass)

| Doc | Role |
|---|---|
| `12_DESIGN_REVIEW_CHECKLIST.md` | Official design approval checklist |
| `13_CONSTRUCTION_DOMAIN_GUIDE.md` | Full terminology handbook |
| `14_ICONOGRAPHY_GUIDE.md` | Icon constitution |
| `15_DATA_VISUALIZATION_GUIDE.md` | Dashboard/chart constitution |
| `16_PRESENTATION_MODE_GUIDE.md` | Live presentation handbook |
| `17_PHASE1_DEFINITION_OF_DONE.md` | Gate to begin implementation |
| `18_LIVE_DEMO_RUNBOOK.md` | Operational recovery in the room |
| `19_BRAND_AND_I18N_CONVENTIONS.md` | Brand application + content key naming |

## 5. Machine-Enforced Companions

`.cursor/rules/*.mdc` — `design`, `architecture`, `coding`, `motion`, `copywriting`, `enterprise-ui`, `construction-domain` — mirror the docs above for AI-assisted implementation in Phase 1+.
