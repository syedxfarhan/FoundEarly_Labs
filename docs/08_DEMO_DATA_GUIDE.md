# 08 — Demo Data Guide (The Fictional World)

**Owner:** Enterprise Product Manager / Solutions Architect / Technical Writer
**Depends on:** `01_PROJECT_SSOT.md`, `06_COPY_GUIDELINES.md`
**Status:** This is the canonical fictional universe. Every future screen, chart, table, and script in this repository must reference entities defined here — no ad hoc invented names, numbers, or companies anywhere else in the codebase or in a rep's live narration.

> Construction professionals detect fabricated data almost instantly — implausible values, inconsistent totals, wrong units, generic names. This document exists so that never happens. Treat this as a small, internally-consistent ERP dataset, not a list of placeholder strings.

---

## 1. Design Principles for Fictional Data

1. **One holding entity, one operating company, one portfolio of projects.** Everything nests under a single fictional group so the story is coherent across every future workspace, not a grab-bag of unrelated demo records.
2. **Numbers must reconcile.** A project's BOQ total must equal the sum of its line items; a budget-vs-actual chart's "actual" must equal the sum of its underlying cost entries. This is enforced by the consistency test referenced in `07_IMPLEMENTATION_RULES.md` §11.5.
3. **No real companies, real people, or real project names.** Everything is original, but plausible within Saudi construction/EPC conventions.
4. **Scale is upper-mid-market, not mega-project.** The fictional company should read as a serious, credible ~500–1,500-employee contractor with real capability — big enough to be a real reference customer, not so large (e.g., a mega-EPC with tens of thousands of staff) that its needs stop feeling relatable to the mid-size firms actually in the room.
5. **Avoid fictional employee headshots.** Use initials-based avatars (`04_COMPONENT_SYSTEM.md` §3.6) — invented "stock photo" headshots for named fictional people read as uncanny and can undermine trust if a client asks "who is this person," whereas initials read as a deliberate, honest design choice.

## 2. The Fictional World

### 2.1 The Client Company (the "customer" inside the demo narrative)

**Al-Buraq Horizon Contracting Co.** ("Al-Buraq Horizon")
- **Type:** General Contractor with MEP self-execution capability (an Aramco-approved vendor category, chosen because it's broad enough to host all planned workspace narratives).
- **Headquarters:** Al-Khobar, Eastern Province, Saudi Arabia.
- **Founded:** 2009.
- **Employees:** ~940.
- **Classification:** Grade 2 Contractor (Saudi Contractors Authority classification), Aramco-approved vendor (illustrative approval code `AR-CL-2291`).
- **Portfolio focus:** Industrial facilities, oil & gas support infrastructure, and commercial/civil works across the Eastern Province and Riyadh.
- **Why this profile:** it plausibly needs every workspace planned through Phase 2 (dashboards, procurement/BOQ, document control, RFIs) and plausibly operates in the cities/currency/regulatory context the design manual assumes.

### 2.2 Cities in Play

Primary: **Al-Khobar** (HQ), **Dammam**, **Jubail Industrial City**, **Riyadh**, **Dhahran**, **Yanbu**. These are real, well-known Saudi industrial/commercial hubs — using them (never inventing fictional cities) is what makes geography-referencing UI (project location chips, filters) feel real without requiring us to fabricate an entire fictional geography.

### 2.3 Currency & Numeric Conventions

- **Currency:** Saudi Riyal, `SAR`, formatted per `02_PRODUCT_DESIGN_MANUAL.md` §10.1.
- **All monetary fixture values must be round-ish but not suspiciously round** (e.g., `SAR 8,240,000`, not `SAR 8,000,000` and not `SAR 8,241,637.42`) — real project budgets cluster around negotiated round numbers with realistic variance, and hyper-precise decimals in a top-line budget figure read as fabricated.
- **Fiscal/reporting dates use the Gregorian calendar**, `DD MMM YYYY`, per `06_COPY_GUIDELINES.md` §11.6.

## 3. Project Portfolio (5 Fictional Projects Under Al-Buraq Horizon)

All projects belong to Al-Buraq Horizon as the contracting entity; each has a distinct client (the client's client, one layer up — i.e., who *hired* Al-Buraq Horizon), giving every project a believable commercial context.

| Code | Project Name | Client (Owner) | City | Type | Contract Value (SAR) | Status | Start | Planned Finish |
|---|---|---|---|---|---|---|---|---|
| **P-1042** | Jubail Process Utility Upgrade | Saudi Petrochemical Industries Co. | Jubail Industrial City | Industrial / Oil & Gas Support | 84,600,000 | On Track | 03 Feb 2025 | 28 Nov 2026 |
| **P-1058** | Dhahran Logistics Hub Expansion | Eastern Gulf Logistics Holding | Dhahran | Industrial / Civil | 46,250,000 | At Risk | 12 May 2025 | 30 Jun 2026 |
| **P-1071** | Riyadh Corporate Campus — Phase 2 | Falcon Crest Real Estate Development | Riyadh | Commercial / Civil + MEP | 112,900,000 | On Track | 20 Jan 2025 | 15 Mar 2027 |
| **P-1083** | Yanbu Desalination Support Facility | National Water Infrastructure Authority | Yanbu | Industrial / MEP | 63,400,000 | Delayed | 08 Sep 2024 | 22 Aug 2025 |
| **P-1096** | Al-Khobar Waterfront Mixed-Use — Enabling Works | Marjan Coastal Developments | Al-Khobar | Civil / Enabling Works | 29,750,000 | Complete | 01 Mar 2024 | 18 Dec 2024 |

**Why five, why this spread:** enough to populate a believable portfolio Overview (`03_INFORMATION_ARCHITECTURE.md` §3.1) with varied schedule/budget health states (one of each status keeps the dashboard visually honest rather than "everything green," which itself would look fabricated to an experienced PM), while staying small enough to keep every downstream RFI/BOQ/document fixture set hand-curated and internally consistent rather than randomly generated.

## 4. Employees (Al-Buraq Horizon Roster — Core Cast)

A small, named core cast reused across every project team/org chart, consistent with real contracting firm structure (a limited pool of PMs/engineers rotates across concurrent projects):

| Name | Role | Based In |
|---|---|---|
| Faisal Al-Ghamdi | Project Director | Al-Khobar (HQ) |
| Noura Al-Sabti | Senior Project Manager | Dammam |
| Omar Haddad | Project Manager | Riyadh |
| Sara Al-Qahtani | Project Engineer (Civil) | Jubail |
| Yousef Barakat | Project Engineer (MEP) | Al-Khobar |
| Lina Mansour | QA/QC Manager | Dammam |
| Khalid Rashidi | Procurement Lead | Al-Khobar (HQ) |
| Huda Al-Amri | Document Controller | Riyadh |
| Tariq Fahmy | Site Engineer | Yanbu |
| Mona Al-Sulaiman | Cost Controller | Al-Khobar (HQ) |

**Approval-chain rule (supports `02_PRODUCT_DESIGN_MANUAL.md` §10.6):** for any workflow requiring multi-level approval (submittals, POs above a threshold), the chain is: Site/Project Engineer → Project Manager → Project Director → (client-side approver, named per project, external to this roster). This mirrors real contracting hierarchy depth and must never be flattened to a single "approve" step in fixture data.

## 5. Vendors & Materials

A shared vendor pool used across all projects' procurement/BOQ fixtures (Phase 2 workspaces), so vendor performance narratives can be consistent across the whole portfolio:

| Vendor | Category | Typical Supply |
|---|---|---|
| Nakheel Steel Fabrication LLC | Structural Steel | Structural steel, rebar |
| Gulf Coast Ready-Mix | Concrete | Ready-mix concrete, aggregates |
| Zamil Electromechanical Supplies | MEP | Cabling, switchgear, HVAC components |
| Al-Rashid Pipes & Fittings | Piping | Carbon steel/HDPE piping, fittings |
| Horizon Scaffolding & Access | Equipment Rental | Scaffolding, access equipment |
| Desert Rose Interiors Trading | Finishes | Interior finishes, cladding |

**Sample material line items** (used to populate BOQ fixtures, each with a real unit of measure per `06_COPY_GUIDELINES.md` §10): Structural steel beams (MT), Ready-mix concrete Grade 40 (m³), HDPE piping 200mm (LM), Cable tray, galvanized (LM), Rebar 16mm (MT), Ceramic floor tiling (m²).

## 6. Equipment

Fictional owned/rented plant fleet used for equipment-utilization/log style fixtures: Tower Crane TC-1 through TC-3, Mobile Crane (50T) MC-1/MC-2, Concrete Pump CP-1, Excavator EX-1 through EX-4, Generator Set (500kVA) GS-1/GS-2 — assigned to specific projects (§3) in fixture data so any future "equipment utilization" screen reflects a real allocation story, not floating unassigned equipment.

## 7. Workflow Entities & Sample Records

### 7.1 RFIs (Requests for Information)

ID convention: `RFI-{project code without P-}-{sequence}`, e.g., `RFI-1042-014`.

Sample set for **P-1042 (Jubail Process Utility Upgrade)**:

| ID | Subject | Discipline | Raised By | Status | Raised | Due | SLA (days) |
|---|---|---|---|---|---|---|---|
| RFI-1042-011 | Confirm pipe rack elevation clash at Grid E4 | Civil | Sara Al-Qahtani | Answered | 02 Jun 2025 | 09 Jun 2025 | 7 |
| RFI-1042-012 | Clarify insulation spec for utility line UL-220 | MEP | Yousef Barakat | Open | 14 Jun 2025 | 21 Jun 2025 | 7 |
| RFI-1042-013 | Request updated structural loading for platform P-3 | Structural | Sara Al-Qahtani | Overdue | 05 Jun 2025 | 12 Jun 2025 | 7 |
| RFI-1042-014 | Confirm vendor-approved cable tray routing | MEP | Yousef Barakat | Pending Response | 18 Jun 2025 | 25 Jun 2025 | 7 |

**Rule:** SLA is always 7 days for standard RFIs, 3 days for RFIs flagged `Critical` (a boolean field, used sparingly — no more than ~10% of RFIs per project) — this consistency is what lets a future "SLA compliance" KPI (`04_COMPONENT_SYSTEM.md` §3.14 `KPIStat`) be computed rather than hardcoded.

### 7.2 Submittals

ID convention: `SUB-{project code without P-}-{sequence}`. Status values from the closed set in `06_COPY_GUIDELINES.md` §6. Sample for **P-1071 (Riyadh Corporate Campus)**: `SUB-1071-004` — Curtain wall shop drawings, Rev B, `Approved with Comments`, submitted by Desert Rose Interiors Trading, reviewed by Omar Haddad.

### 7.3 BOQ (Bill of Quantities) — Structure

Each project's BOQ is organized by discipline section (Civil, Structural, MEP, Finishes), each section containing line items with: item code, description, unit of measure, quantity, rate (SAR), and computed amount (`quantity × rate`). **The project's total contract value (§3 table) must equal the sum of all BOQ section totals** — this reconciliation is the anchor consistency rule for the entire fixture dataset and is exactly what the automated fixture-consistency test (`07_IMPLEMENTATION_RULES.md` §11.5) checks first.

Sample line item (P-1058, Structural section): `STR-014` — "Structural steel supply & erection, main frame," Unit `MT`, Quantity `340`, Rate `SAR 6,850`, Amount `SAR 2,329,000`.

### 7.4 Drawings & Documents

ID convention follows a real architectural/engineering numbering pattern: `{Discipline}-{Project}-{SheetType}-{Sequence}`, e.g., `MEP-1042-P&ID-007` (Piping & Instrumentation Diagram), `STR-1071-GA-012` (General Arrangement). Every drawing has a revision letter (`Rev A`, `Rev B`...) and a status from the Documents status vocabulary (`06_COPY_GUIDELINES.md` §6) — a superseded revision must remain in fixture data (not deleted) so version-history UI (`04_COMPONENT_SYSTEM.md` §3.13 `Timeline`) has something real to render.

### 7.5 Purchase Orders

ID convention: `PO-{project code without P-}-{sequence}`. Each PO references a vendor (§5), a set of BOQ/material line items, a total value, and a status from the BOQ/Procurement status vocabulary (`06_COPY_GUIDELINES.md` §6). PO totals must not exceed the corresponding BOQ section's remaining budget in fixture data — this is the kind of realistic constraint that, if violated, would be immediately obvious to a cost controller in the room.

### 7.6 Approval Workflows

Every approval-gated entity (Submittals, POs above `SAR 500,000`, Variation Orders) carries a **visible history** of who acted, when, and what they decided — using the roster in §4 and the approval-chain rule stated there. Fixture data must always include at least one example each of: a clean single-pass approval, a "sent back for revision" cycle, and one still-pending item — because a workspace that only ever shows the happy path looks staged in a way that undermines the exact trust this product exists to build.

## 8. Consistency Rules (Non-Negotiable, Testable)

These are the rules the automated fixture-data consistency test (`07_IMPLEMENTATION_RULES.md` §11.5) must enforce in Phase 1 implementation:

1. Every RFI/Submittal/PO/Drawing references a `project code` that exists in §3.
2. Every actor referenced (Raised By, Reviewed By, Approved By) exists in the roster in §4.
3. Every vendor referenced exists in §5.
4. A project's total BOQ amount equals its contract value in §3 (within a documented, small illustrative variance representing unbilled contingency, never a large unexplained gap).
5. All dates within a single project are chronologically plausible (a submittal cannot be "Approved" before it was "Submitted"; an RFI's due date is always its raised date + its stated SLA).
6. No two entities share an ID. IDs are stable once fixture data ships (referenced by URL-addressable state per `03_INFORMATION_ARCHITECTURE.md` §4) — never regenerated/reshuffled between releases, since that would break saved rep bookmarks/deep links.
7. Every monetary value uses the same currency (`SAR`) and formatting convention across the entire dataset — no mixed currencies in Phase 1.

## 9. Extension Rules for Future Phases

- **New workspaces (Phase 2) extend this same world** — new entities (e.g., additional PO detail, inspection records) must reference existing projects/roster/vendors from this document, not introduce a second fictional company.
- **New fictional projects may be added** if a specific sales narrative needs a project type not covered by §3 (e.g., a pure Oil & Gas EPC project for an Aramco-specific pitch), but must be added *to* Al-Buraq Horizon's portfolio, following the exact ID conventions and consistency rules above, and recorded as an addition to this document in the same PR that adds the fixture code.
- **The Client-Branded Variant Mode (Roadmap Phase 4)** swaps cosmetic tokens/branding only — it never swaps the underlying fictional company or its data model, because the entire fixture ecosystem's internal consistency (§8) is the expensive, hard-won asset; reskinning it is cheap, rebuilding it is not.
