# 01 — Project Single Source of Truth (SSOT)

**Owner:** VP of Engineering / Enterprise Product Manager
**Status:** Approved for Phase 1 planning
**Applies to:** All contributors, all future phases

> This document is the constitutional layer of the project. When any other document, ticket, comment, or verbal instruction conflicts with this file, **this file wins**. If this file is wrong, we fix this file first, then everything downstream.

---

## 1. What This Project Actually Is

**FoundEarly Labs — Interactive Capability Showcase** ("the Showcase") is a premium, offline-capable, in-person sales instrument. It is software built to be operated live, on a laptop or tablet, by a FoundEarly Labs representative sitting across the table from a decision-maker at a Saudi construction, EPC, oil & gas, or facilities company.

It is not a marketing website. It is not a SaaS product with real users, accounts, or production data. It is a **rehearsed, controllable, interactive proof of engineering capability** — the digital equivalent of a physical product demo unit. Every screen exists to answer one silent question in the client's head: *"Can this company actually build enterprise software for us, or are they going to waste our time and our money?"*

This distinction is not cosmetic. It drives almost every downstream decision in this repository:

- We optimize for **live-presentation robustness** over feature breadth. A representative cannot "just refresh and hope" in front of a client. Every interaction must be predictable, fast, and recoverable.
- We optimize for **perceived engineering seniority** over trendiness. Construction executives are not impressed by novelty animations; they are impressed by systems that feel like they run a real project.
- We optimize for **narrative control**. The application should support a rehearsed walkthrough sequence as strongly as it supports free exploration, because both will happen in the room.

## 2. Who We Are Building This For

### 2.1 Primary audience — the room

The Showcase will be operated in front of, and sometimes handed to, people such as:

- Project Directors and General Managers at General Contractors
- Owners/Partners at Civil and MEP Contracting firms
- Engineering Managers at Industrial and Oil & Gas contractors
- Facilities Management directors
- Procurement and Business Development leads
- Engineering Consultants (often the most technically literate people in the room)
- Compliance/QA leads at Aramco-approved vendors, who are trained to distrust anything that looks unfinished

These are **not software buyers by profession**. They are construction and engineering professionals evaluating a *partner*, not a *product*. They will not read documentation, will not tolerate lag, and will judge trustworthiness on things a SaaS PM would consider cosmetic: alignment, density, numeric formatting, loading behavior, and whether the data "sounds like a real project."

### 2.2 Secondary audience — the operator

The FoundEarly Labs representative driving the laptop. They are:

- Not necessarily technical.
- Presenting the same flow dozens of times to different audiences.
- Under social pressure — a glitch in front of a client is a business risk, not a bug ticket.

This means the product must support a **Presentation Mode** (see `03_INFORMATION_ARCHITECTURE.md`) that reduces surface area, hides anything unfinished, and makes the "happy path" impossible to derail accidentally.

### 2.3 Tertiary audience — future FoundEarly Labs engineers

Every engineer who joins this project after Phase 0 inherits these documents as law. The documentation is written so that a competent engineer, with zero prior context, can implement Phase 1 with **zero ambiguity** and produce output indistinguishable from an engineer who has been on the project for six months.

## 3. Goals

**G1 — Establish credibility in under 90 seconds.** The first screen a client sees must communicate "enterprise-grade" before a single word is read. This is a design/perception goal, not a feature goal.

**G2 — Demonstrate breadth without demonstrating shallowness.** The Showcase must convincingly represent dashboards, workflow tools, AI-assisted features, and data-heavy enterprise screens — but every one of them must feel complete within its own scope rather than being a thin shell hinting at ten unfinished features.

**G3 — Support two presentation modes: rehearsed and exploratory.** A rep must be able to run a fixed, reliable narrative sequence ("Discovery Simulator", see IA doc) *and* a client must be able to say "show me a project dashboard" and have that work too.

**G4 — One consistent fictional world.** Every screen, chart, name, and number must trace back to a single internally consistent fictional construction company ecosystem (`08_DEMO_DATA_GUIDE.md`). Nothing invented ad hoc. Inconsistent demo data is the single fastest way to destroy credibility with a technical audience.

**G5 — Zero live-demo failure modes.** No network dependency required for the core walkthrough, no unhandled empty/error/loading states, no unformatted numbers, no console errors visible if DevTools is opened (it will be, by an engineering consultant, at least once).

**G6 — Build a governance system durable enough for Phase 2+.** Whatever we build after Phase 1 (new modules, new verticals, additional demo industries, localization) must slot into the system defined here without renegotiating fundamentals.

**G7 — Bilingual credibility (English first, Arabic-ready).** The application does not need full Arabic UI at launch, but nothing in the architecture, tokens, or component system may block RTL/Arabic support later. Retrofitting RTL into a non-RTL-aware codebase is a rebuild, not a patch — so we design for it from day one even though the initial deliverable ships English-only.

## 4. Non-Goals (Explicit)

Being explicit about what we are *not* building is as important as the goals, because ambiguity here is what causes scope creep in Phase 1.

- **Not a real SaaS product.** No real authentication against a real user directory, no real multi-tenant data isolation, no billing, no real persistence requirements beyond what's needed to make a live demo feel real (local/session state is sufficient; see `07_IMPLEMENTATION_RULES.md`).
- **Not a CMS.** Content is versioned in the repository, not edited by non-engineers through an admin panel, in Phase 1.
- **Not a general-purpose portfolio site.** There is no "About Us," blog, or careers page unless a future phase explicitly adds one as a business decision, not a default.
- **Not optimized for organic web traffic or SEO.** This is presented, not discovered. If it is later also published as a public site, that is an additive Phase, not a constraint on Phase 1.
- **Not a place to prove out unrelated technology.** No feature is added because it's technically interesting; every feature must trace to "helps close deals with Saudi construction companies."
- **Not multi-tenant, multi-account, or configurable per-client at runtime** in Phase 1. If FoundEarly Labs later wants to swap in a specific client's real logo/colors for a specific pitch, that is a themable veneer over the same demo world (see `09_DESIGN_TOKENS.md` and the roadmap below), not a rebuild.

## 5. Target Market Context (Why This Audience Changes Everything)

Saudi Arabian construction, EPC, and industrial contracting is a market defined by:

- **Extreme risk-aversion in vendor selection**, especially for Aramco-approved companies operating under strict vendor qualification frameworks.
- **Trust built on process rigor**, not marketing. RFIs, BOQs (Bills of Quantities), submittals, and approval chains are the actual daily language of this industry. A product that gets this vocabulary and workflow shape wrong will be dismissed immediately by anyone who has run a project.
- **Executive decision-makers with limited patience for consumer-style software** but high expectations set by the enterprise systems they already use (Primavera P6, SAP, Aconex, ACC/BIM 360, Oracle). The Showcase must read as "at least as serious as the tools they already trust," while being dramatically better designed.
- **Bilingual operating environment.** English is the default working language in most contracting back-offices, but Arabic literacy and RTL familiarity are universal. A product that visibly could never support Arabic reads as foreign-built and disposable.
- **Relationship-first sales.** The Showcase is a trust artifact inside a relationship-driven sale, not the sale itself. It supports the human rep; it does not replace them.

## 6. Product Philosophy

1. **Restraint is the premium signal.** Enterprise software companies that survive selling into construction/industrial buyers (Procore, Oracle Primavera, Autodesk Construction Cloud) all converge on dense, quiet, information-forward UI. Flashy motion and decorative color are downgrades here, not upgrades. See `02_PRODUCT_DESIGN_MANUAL.md`.
2. **Every screen must justify its own existence in the narrative.** If a screen doesn't map to a specific belief we want the client to hold by the end of the meeting ("they understand our documentation chaos," "they can build us a real dashboard," "they've thought about approvals"), it does not belong in Phase 1.
3. **Realism beats cleverness.** A boring, correctly-formatted BOQ table with plausible Saudi Riyal values and real Saudi city names beats an animated 3D visualization of imaginary data. Construction people can smell fake data instantly.
4. **The product must survive being touched by someone who isn't the rep.** Clients will click things. Every interactive surface needs a real, non-broken response, even if that response is "this capability is illustrative in this build."
5. **Consistency is the product.** In a single-vendor pitch, inconsistency (a button that looks different on two screens, a date format that changes) reads as "junior team, no process." Sameness, done deliberately, reads as "process-driven engineering org." This is why the component and token systems (`04`, `09`) exist before any implementation.
6. **AI features must demonstrate judgment, not novelty.** Where AI-assisted capability is shown (e.g., in the Discovery Simulator or an assistant surface), it should demonstrate that FoundEarly Labs builds *applied, scoped, trustworthy* AI into real workflows — not a generic chatbot. See `06_COPY_GUIDELINES.md` for AI-response voice rules.

## 7. Success Metrics

Because this is not a live product with analytics telemetry in Phase 1, success is measured differently than a typical SaaS product:

| Metric | Definition | Why it matters |
|---|---|---|
| **Zero-glitch presentation rate** | % of live client presentations completed with no visible bug, layout break, or unhandled state | This is the primary KPI. A single visible bug in front of an Aramco-approved QA lead can end a deal. |
| **Narrative completion time** | Time to walk a client through the full Discovery Simulator flow | Reps need a fast path (≤10 min) and a deep path (≤25 min) — both must exist. |
| **Perceived build quality (qualitative rep feedback)** | Post-meeting rep survey: "Did the client comment positively on the software itself?" | Directly measures whether the Showcase is doing its job as a trust artifact. |
| **Data plausibility pass rate** | % of demo data points that survive scrutiny from a construction professional without sounding fabricated | Validates `08_DEMO_DATA_GUIDE.md` rigor. |
| **Time-to-onboard new engineer** | Time for a new contributor to ship a correct, on-brand component using only `/docs` | Validates that the governance layer actually removes ambiguity. |
| **Design system adherence** | % of UI built using tokens/components vs. one-off styles | Directly measured via code review checklist in `07_IMPLEMENTATION_RULES.md`. |

There is deliberately no vanity metric like "number of features shipped." Feature count is not the product; credibility per screen is.

## 8. Technical Assumptions

These are assumptions the whole documentation set is built on. If any assumption changes, the affected docs must be revisited.

1. **Delivery platform:** A modern web application (framework decision formalized in `07_IMPLEMENTATION_RULES.md` and `10_PROJECT_STRUCTURE.md`), run primarily from a local build on the presenter's laptop, with an optionally hosted version for remote/follow-up sharing. It must function acceptably with an unreliable or absent internet connection during the in-person meeting — this is a hard constraint, not an optimization.
2. **No real backend/data persistence requirement in Phase 1.** All "data" is fixture data defined per `08_DEMO_DATA_GUIDE.md`, loaded client-side. This keeps live-demo risk near zero and keeps infrastructure cost near zero, which is appropriate for a pre-revenue sales tool.
3. **Single environment, no multi-tenancy, no auth backend.** Any "login screen" is theatrical (demonstrates the concept of role-based access) rather than a real auth system, unless a later phase requires otherwise.
4. **Desktop/tablet-first, not mobile-first.** The primary device is a presenter's laptop or a large tablet in landscape orientation. Mobile support is "must not be broken," not "must be optimized," because that is not how this product is used.
5. **English-first content, Arabic/RTL-ready architecture.** See Goal G7.
6. **Content lives in the repository, versioned with the code**, because there is no editorial team yet and no CMS budget/need in Phase 1.
7. **The product will be demoed by non-engineers.** Anything requiring a developer console, environment variable, or command line during a live client meeting is a defect.

## 9. Scope Boundary for "Phase 1 Implementation" (forward-looking, not started here)

Phase 0 (this repository initialization + hardening) defines governance only. **Do not begin Phase 1 implementation until `17_PHASE1_DEFINITION_OF_DONE.md` is signed.** When Phase 1 begins, it is expected to deliver, at minimum, the modules described as in-scope in `03_INFORMATION_ARCHITECTURE.md` — a landing/credibility surface, a Discovery Simulator presentation flow, and at least one deep-dive workspace (e.g., a project dashboard) built entirely from the token and component systems defined here. Anything beyond that is Phase 2+ per the roadmap below.

## 10. Future Roadmap (Directional, Not Committed)

This roadmap exists to prevent Phase 1 decisions that would block obviously-likely future needs. It is not a delivery commitment.

- **Phase 1 — Foundation Showcase:** Credibility landing surface, Discovery Simulator, one flagship workspace (Project Command Dashboard), full design system implementation, English only.
- **Phase 2 — Expanded Workspace Depth:** Additional workspaces (e.g., Procurement/BOQ workspace, Document Control workspace, RFI/Submittal workflow), deeper interactivity, richer fictional company history (multi-project portfolio).
- **Phase 3 — Localization:** Arabic UI, full RTL layout pass, bilingual copy for all surfaces per `06_COPY_GUIDELINES.md` translation strategy.
- **Phase 4 — Client-Branded Variant Mode:** A theming layer (built on `09_DESIGN_TOKENS.md`) allowing a rep to swap the demo's cosmetic branding to loosely echo a specific prospective client's palette/logo for a single high-value pitch, without touching underlying data or components.
- **Phase 5 — Companion Leave-Behind:** A lightweight, read-only hosted version a client can revisit after the meeting (their own link, watermarked as illustrative), reinforcing the pitch without requiring the rep to be present.
- **Phase 6 — Internal Reuse:** Extraction of the component/token system into a shared internal library if FoundEarly Labs builds multiple client-facing tools that should feel like one company.

## 11. Change Control

This document, and every document in `/docs`, is versioned like code. Material changes (anything that changes a goal, non-goal, audience, or philosophy statement) must be recorded in `/DECISIONS.md` at the repository root with rationale, not just diffed silently. See `CONTRIBUTING.md` for process.
