# 03 — Information Architecture

**Owner:** Solutions Architect / UX Director / Enterprise Product Manager
**Depends on:** `01_PROJECT_SSOT.md`, `02_PRODUCT_DESIGN_MANUAL.md`
**Feeds into:** `04_COMPONENT_SYSTEM.md`, `05_MOTION_SYSTEM.md`

> This document defines the shape of the application: what exists, how it's organized, and how a human moves through it — both a rehearsed presenter and a curious client. Nothing here is implementation; it is the map implementation must follow.

---

## 1. Core Architectural Decision: Two Coexisting Structures

The application has to serve two different mental models at once, and conflating them is the single most common IA mistake this kind of project makes:

1. **Presentation Structure** — a linear, rehearsable narrative (the *Discovery Simulator*) that a rep drives, screen by screen, in a controlled order.
2. **Exploration Structure** — a conventional app hierarchy (workspaces, pages, navigation) that exists so a client can go off-script ("show me a real dashboard," "can I see how RFIs work") without the rep panicking.

**Decision:** these are two *modes* layered over the *same* underlying application and data model — not two separate builds. Presentation Mode is a navigational and visual constraint layered on top of the full app (see `02_PRODUCT_DESIGN_MANUAL.md` §6.5), not a separate slide-deck-like artifact. This is why: building them as two separate things doubles the maintenance burden and guarantees the "narrative" version drifts out of sync with the "real" version — exactly the inconsistency that destroys credibility (`01_PROJECT_SSOT.md` §6.5).

## 2. Top-Level Application Hierarchy

```
FoundEarly Interactive Showcase
│
├── Entry Surface (unauthenticated, first-touch)
│   ├── Credibility Landing            — the opening screen, sets tone in <90s
│   └── Mode Selector                  — "Guided Walkthrough" vs "Explore Freely"
│
├── Discovery Simulator (Presentation Structure)
│   ├── Step 0 — Context Capture       — lightweight, theatrical "tell us about your projects"
│   ├── Step 1 — Problem Mirror        — reflects industry pain points back at the client
│   ├── Step 2 — Capability Reveal     — sequenced reveal of relevant workspaces
│   ├── Step 3 — Live Workspace Dive   — hands off into a real Workspace (§3), still guided
│   ├── Step 4 — AI Moment             — scoped AI-assisted capability demonstration
│   └── Step 5 — Close & Next Steps    — proposal/contact capture, theatrical but branded
│
├── Workspaces (Exploration Structure — persistent app shell)
│   ├── Workspace Switcher             — top-level nav between workspaces
│   ├── Project Command Dashboard      — Phase 1 flagship workspace
│   ├── Procurement & BOQ Workspace    — Phase 2
│   ├── Document Control Workspace     — Phase 2
│   └── RFI & Submittals Workspace     — Phase 2
│
├── Presentation Mode (a display state, not a page)
│   — Overlays the Workspaces shell with reduced chrome, larger type,
│     and a rep-only control rail (see §6).
│
└── Utility Surfaces
    ├── System Status / About This Demo   — transparency screen (see §7)
    └── Not Found / Recovery Screen        — dead-end catcher (see §8)
```

## 3. Workspace Hierarchy

A **Workspace** is the exploration-mode analogue of a real enterprise module (e.g., "Project Dashboard," "Procurement"). All workspaces share one shell (per `02_PRODUCT_DESIGN_MANUAL.md` §6.4):

```
Workspace Shell
├── Top Bar
│   ├── FoundEarly mark + current company context ("Al-Buraq Horizon Contracting")
│   ├── Workspace Switcher (dropdown/rail)
│   ├── Global search (illustrative in Phase 1 — scoped to fixture data)
│   └── Presentation Mode toggle (rep-only affordance)
├── Left Navigation
│   ├── Workspace-specific section list
│   └── Active Project selector (a workspace can be scoped to one project of many — see 08_DEMO_DATA_GUIDE.md)
└── Main Canvas
    ├── Page Header (title, breadcrumb, primary action)
    ├── Content (per-page, built from 04_COMPONENT_SYSTEM.md components)
    └── Contextual side panel (optional, e.g., detail drawer)
```

### 3.1 Phase 1 flagship: Project Command Dashboard

Sections (left navigation):

1. **Overview** — portfolio-level KPIs across all fictional projects (schedule health, budget health, open risk items).
2. **Project Detail** — single-project drill-down: schedule (Gantt-style summary), budget vs. actual, milestones.
3. **RFIs** *(read-only preview in Phase 1, full workspace in Phase 2)* — log table demonstrating real RFI lifecycle.
4. **Documents** *(read-only preview in Phase 1)* — drawing/document register demonstrating version control awareness.
5. **Team** — org chart / roster for the active project, demonstrating role-aware structure (`02_PRODUCT_DESIGN_MANUAL.md` §10.6).

**Why Overview-first:** executives in the target audience scan top-down for portfolio health before drilling into any one project — mirroring how a real Project Director actually opens their tools each morning. Opening on a single project's minutiae would misrepresent the product as a single-project tool.

## 4. Navigation Model

- **Two navigation levels only:** Workspace (top bar) → Section (left nav). No third-level nested navigation in Phase 1 — a third level adds orientation risk in a live demo disproportionate to its value at this scope. If a page needs deeper structure, it uses in-page tabs (a `04_COMPONENT_SYSTEM.md` component), which are visually subordinate to real navigation and always reset predictably.
- **Every navigation action is instant and non-blocking.** Because there's no real backend, there is no technical reason for a navigation-level loading spinner in Phase 1; any perceived delay is a bug, not a network reality to design around. (Component-level async simulations for realism, e.g., an "AI analyzing…" moment, are a deliberate design choice, not an infra limitation — see §5.)
- **Breadcrumbs are present but secondary** — used for orientation confidence, not as the primary navigation mechanism (left nav + top bar own that job).
- **URL-addressable state.** Every workspace/section/project-selection combination should be reflected in the URL, so the rep can deep-link directly to a screen mid-conversation if the client asks to jump ahead — this is a resilience requirement, not a nice-to-have, for a live setting where "let me click through four screens to get there" is a visible dead spot.

## 5. Presentation Flow — The Discovery Simulator

This is the centerpiece narrative artifact. It is designed as a **guided state machine over the real application**, not a separate slideshow.

### 5.1 Design intent

The Discovery Simulator exists to solve a specific sales problem: a generic "here's our dashboard, click around" demo fails to create urgency because the client hasn't yet articulated their own pain in the room. The Simulator front-loads a short, interactive "mirror" of the client's real operational pain (missed submittals, scattered spreadsheets, delayed approvals) before revealing the product — so that every subsequent screen lands as "the answer to what we just said," not "a generic feature tour."

### 5.2 Flow detail

| Step | Purpose | Interaction shape | Exit condition |
|---|---|---|---|
| 0. Context Capture | Rep selects/confirms client profile inputs (company type, e.g., "MEP Contractor"; rough project count) live, in front of client | 2–3 tap/select inputs, no typing required (typing during a live pitch is friction) | Auto-advances on selection |
| 1. Problem Mirror | Reflects 3–4 industry-pain statements tailored to the selected profile ("Aramco vendors lose an average of X days to RFI turnaround delays") | Static reveal, rep narrates | Rep-controlled "Next" |
| 2. Capability Reveal | Sequenced card reveal mapping each pain point to a FoundEarly capability | Staggered reveal (see `05_MOTION_SYSTEM.md` §6) | Rep-controlled "Next" |
| 3. Live Workspace Dive | Hands off into the real Project Command Dashboard, pre-scoped to the fictional company that best matches the client profile chosen in Step 0 | Full workspace interactivity, framed by a persistent "Return to Guide" affordance | Rep choice: continue exploring or resume Simulator |
| 4. AI Moment | A scoped, single-purpose AI-assisted interaction (e.g., AI-drafted RFI response, AI risk flag summary) demonstrated live | Constrained input (a fixed set of illustrative prompts/buttons, not free-text in Phase 1, to guarantee output quality) | Rep-controlled "Next" |
| 5. Close & Next Steps | Branded summary + contact/next-step capture (theatrical; may integrate a real contact form in a later phase) | Static/branded, rep narrates | End of guided flow → returns to Mode Selector or stays in free exploration |

### 5.3 Why Step 0 uses selection, not free text

Free-text input during a live pitch is a live-demo risk (typos, unexpected phrasing, dead air while typing) and provides no real personalization value in Phase 1 since underlying content is still fixture-driven. Constrained selection preserves the feeling of personalization with zero failure surface. This constraint should be revisited only if/when a real backend justifies true dynamic personalization (see Roadmap, `01_PROJECT_SSOT.md` §10).

### 5.4 Recoverability

At every step, the rep has a visible, single-tap way to (a) skip forward to the workspace dive, (b) restart the Simulator, and (c) exit to free exploration — because real meetings do not run on script, and the IA must never trap the rep in a sequence they can't escape gracefully.

## 6. Presentation Mode (Cross-Cutting Display State)

Presentation Mode is not a page — it is a state toggle available from any Workspace. **Full operational handbook:** `16_PRESENTATION_MODE_GUIDE.md` (shortcuts, toolbar, demo reset, recovery, offline, meeting flow). Summary:

- Increases base type scale slightly (better legibility on a shared screen/projector).
- Visually quiets (not hides) secondary navigation chrome, per `02_PRODUCT_DESIGN_MANUAL.md` §6.5.
- Surfaces a rep-only Presenter Toolbar with quick actions: Workspace Launcher, Simulator navigation, Demo Reset, shortcut cheatsheet (see `16`).
- Disables any control explicitly marked `illustrative-only` in the component spec (`04_COMPONENT_SYSTEM.md`) that could otherwise lead a curious client into a dead-end or unfinished state.

## 7. Transparency Surface: "About This Demo"

A single, honest, well-designed screen reachable from the utility area explaining, in plain language, that this is an interactive capability showcase built by FoundEarly Labs, using illustrative data. **Why this exists:** sophisticated technical buyers (engineering consultants, QA leads) often probe whether a vendor is trying to pass off a demo as a live production system — being upfront, in a confident and well-designed way, converts a potential "gotcha" moment into another credibility signal ("they're transparent and organized"). This screen also documents which capabilities are fully interactive vs. illustrative-only in the current build, preventing the rep from overpromising.

## 8. Recovery / Not-Found Screen

Because URL-addressable state (§4) means direct links are possible, a mistyped or stale link must resolve to an on-brand recovery screen with a single clear action back to the Mode Selector — never a framework's default 404. This is a small detail with outsized credibility risk if missed.

## 9. User Journeys

### 9.1 Rep-led, rehearsed journey (primary)
Entry Surface → Mode Selector ("Guided Walkthrough") → Discovery Simulator Steps 0–5 → (optional) continued free exploration in Workspaces → Close.

### 9.2 Client-initiated exploratory journey (secondary, must always work)
Entry Surface → Mode Selector ("Explore Freely") → Workspace Switcher → any Workspace → any Section → (rep re-engages narrative at any point by invoking Presentation Mode quick actions).

### 9.3 Skeptical technical reviewer journey (must survive, not necessarily be optimized)
Entry Surface → "About This Demo" → Workspaces → opens browser DevTools / resizes window aggressively / clicks every nav item rapidly → must never produce a console error, broken layout, or dead link. This journey is explicitly tested against in the Quality Checklist (`02_PRODUCT_DESIGN_MANUAL.md` §11) and review process (§4 there).

## 10. Future Expansion Strategy

- **New workspaces slot into the existing shell** (§3) without shell changes — a workspace is defined by its left-nav sections and page content only. This is why the shell is specified once, here and in the design manual, rather than per-workspace.
- **New Discovery Simulator branches per industry vertical** (e.g., a dedicated Oil & Gas-flavored Problem Mirror in Step 1) are additive content variants keyed off the Step 0 profile selection — not new flows. The state machine (§5.2) is designed to be profile-parameterized from day one so this doesn't require IA rework later.
- **Localization (Phase 3, per roadmap)** changes copy and layout direction (RTL), not hierarchy — every navigation and flow structure defined here is direction-agnostic by design (no left/right-dependent semantics baked into section order).
- **Client-branded variant mode (Phase 4)** swaps token values (`09_DESIGN_TOKENS.md`) and the active fictional company's cosmetic identity, not IA — the hierarchy in this document remains the contract regardless of theming.
