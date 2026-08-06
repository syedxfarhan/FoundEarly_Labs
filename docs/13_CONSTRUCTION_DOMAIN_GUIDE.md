# 13 — Construction Domain Guide

**Owner:** Solutions Architect / Enterprise Product Manager / Technical Writer
**Depends on:** `01_PROJECT_SSOT.md`, `06_COPY_GUIDELINES.md`, `08_DEMO_DATA_GUIDE.md`
**Status:** Canonical terminology handbook. Future AI implementations and human contributors must never invent construction terminology outside this document (and its extensions via the same PR that introduces a new term).

> This document exists so that no engineer, designer, writer, or AI assistant ever improvises an industry term. Improvised terminology is the fastest credibility failure available in a room full of contractors.

---

## 1. How to Use This Guide

1. Before writing any UI copy, fixture label, status, or AI response that touches construction concepts, look the term up here.
2. If the term is missing, **add it to this document in the same PR** that introduces it — do not invent a local synonym.
3. Status labels remain governed by the closed vocabulary in `06_COPY_GUIDELINES.md` §6 — this guide defines *what the concepts mean*; that document defines *exactly which strings render in the UI*.
4. Arabic equivalents (Phase 3) will be added as a reviewed glossary column later; until then, English terms in this document are the only legal forms.

---

## 2. Core Commercial Documents

### BOQ — Bill of Quantities
An itemized schedule of work and materials with quantities, units of measure, and rates. The BOQ is the commercial backbone of a construction contract — cost tracking, progress claims, and variation pricing all reference it. In this product, BOQ line items always carry: item code, description, unit (LM / MT / EA / m² / m³), quantity, rate (SAR), and amount (`quantity × rate`). Section totals must reconcile to project contract value per `08_DEMO_DATA_GUIDE.md` §8.

### RFI — Request for Information
A formal written query from the contractor (or subcontractor) to the design team / client representative, seeking clarification of drawings, specifications, or site conditions. RFIs have a raised date, due date, SLA (typically 7 days standard / 3 days critical in our fixture world), discipline, and a closed status vocabulary (`Open`, `Pending Response`, `Answered`, `Closed`, `Overdue`). Never call an RFI a "ticket," "issue," or "question."

### RFQ — Request for Quotation
A formal request issued to vendors asking them to price a defined scope of supply/work. Distinct from an RFI (which seeks information, not price). In Phase 1–2 fixtures, RFQs sit in the procurement workflow ahead of Purchase Orders.

### Submittal
A package of documents (shop drawings, material data sheets, method statements, samples) submitted by the contractor for design-team / client review and approval **before** procurement or installation of the related work. Status vocabulary: `Pending Submission`, `Under Review`, `Approved`, `Approved with Comments`, `Rejected — Resubmit`.

### Shop Drawing
A detailed drawing prepared by a contractor, fabricator, or supplier showing how a specific element will be fabricated/installed, based on the contract drawings but with fabrication-level detail. Shop drawings are typically submitted as part of a Submittal package.

### Method Statement
A document describing how a particular work activity will be carried out safely and in accordance with the specification — sequence, plant, labour, and HSE controls. Often a required Submittal before high-risk activities begin.

### Variation Order (VO) / Change Order
A formally approved change to the contracted scope, cost, and/or time. Never call this an "edit," "update," or "ticket." VOs have commercial weight and follow a multi-level approval chain.

### Purchase Order (PO)
A commercial order issued to a vendor for supply of materials/equipment/services, typically referencing BOQ line items. PO IDs follow `PO-{project}-{sequence}` per `08_DEMO_DATA_GUIDE.md`. POs above a threshold (fixture rule: SAR 500,000) require multi-level approval.

### Contract
The overarching agreement between client (owner) and contractor. In our demo world, Al-Buraq Horizon Contracting Co. holds contracts with the project owners listed in `08_DEMO_DATA_GUIDE.md` §3. The Showcase does not model full contract administration in Phase 1; it references contract value as the BOQ reconciliation anchor.

---

## 3. Quality, Inspection & Site Documents

### NCR — Non-Conformance Report
A formal record that work, materials, or processes do not conform to the specified requirements. NCRs trigger corrective action and typically cannot be closed without verified remediation. Never conflate an NCR with an RFI.

### MIR — Material Inspection Request
A request raised by the contractor asking the client's inspector / consultant to inspect materials delivered to site (or at source) before they are released for use.

### WIR — Work Inspection Request
A request asking the client's inspector / consultant to inspect completed (or partially completed) work before it is covered up or progressed. Also called an Inspection Request in some contracts — in this product, prefer **WIR** for consistency.

### Inspection Request
Generic term covering MIR/WIR-style requests. Prefer the specific acronym when the context is clear; use "Inspection Request" only as a category label.

### Snag List / Punch List
Near the end of a project (or a phase), outstanding defects and incomplete items are recorded as a snag list (common UAE/UK terminology) or punch list (common US / also used in KSA bilingual environments). **In this product, use "Punch List"** as the canonical term (`06_COPY_GUIDELINES.md` §10); "snag" may appear in copy only if quoting a specific regional convention, never as a synonym that drifts.

### Site Diary
A daily record of site conditions, labour, plant, weather, visitors, and notable events — historically paper, now often digital. Useful for claims and dispute support.

### Daily Progress Report (DPR)
A structured daily summary of work accomplished, resources deployed, and blockers. Distinct from a Site Diary (which is more narrative/event-oriented); DPRs are typically more quantitative.

### Equipment Log
A record of plant/equipment utilization, location, hours, and maintenance status. Fixture equipment fleet is defined in `08_DEMO_DATA_GUIDE.md` §6.

### Material Tracking
The system of recording material delivery, storage, issue-to-works, and remaining stock against BOQ quantities. Closely tied to MIR and procurement.

### Permit to Work (PTW)
A formal authorization to perform a defined high-risk activity (hot work, confined space, electrical isolation, excavation, etc.) under stated HSE controls, for a defined time window. Common and strictly enforced on industrial / oil & gas sites (especially Aramco-related work).

---

## 4. HSE Terminology (Health, Safety & Environment)

| Term | Meaning in this product |
|---|---|
| **HSE** | Health, Safety & Environment — the discipline and the department. |
| **Toolbox Talk** | Short pre-task safety briefing delivered to a work crew. |
| **Near Miss** | An incident that could have caused injury/damage but did not — still recorded and investigated. |
| **LTI** | Lost Time Injury — an injury causing absence from work beyond the shift. |
| **TRIR / LTIF** | Total Recordable Incident Rate / Lost Time Injury Frequency — standard safety KPIs. |
| **JSA / JHA** | Job Safety Analysis / Job Hazard Analysis — task-level risk assessment. |
| **PPE** | Personal Protective Equipment. |
| **LOTO** | Lock Out / Tag Out — energy isolation procedure. |
| **PTW** | Permit to Work (see §3). |

Safety KPIs and HSE surfaces (when built in later phases) must use these terms exactly — never substitute consumer words like "accident" for "incident" or invent rate acronyms.

---

## 5. Procurement & Vendor Lifecycle

```
RFQ issued → Vendor quotations received → Technical/commercial evaluation
  → Vendor Approval (if not already approved) → Purchase Order issued
  → Delivery → MIR (material inspection) → Material Tracking issue-to-works
```

### Vendor Approval
The process of qualifying a vendor against technical, commercial, and (where required) client-mandated criteria — including Aramco vendor approval for Aramco-related scopes. Al-Buraq Horizon's illustrative Aramco approval code is `AR-CL-2291` (`08_DEMO_DATA_GUIDE.md` §2.1). Vendors in the fixture pool (`08_DEMO_DATA_GUIDE.md` §5) are treated as already approved unless a specific narrative requires a pending-approval example.

### Procurement
The end-to-end function of sourcing, purchasing, expediting, and receiving materials/services. In UI labels, prefer the specific document name (PO, RFQ, MIR) over the umbrella word "Procurement" except as a workspace title.

---

## 6. Construction Document Lifecycle

Typical lifecycle for a controlled document (drawing, specification, method statement):

```
Draft → Issued for Review → Under Review → Approved / Approved with Comments
  → Current (issued for construction) → Under Revision → Superseded
```

Rules enforced in fixtures and UI:
- A superseded revision is **never deleted** — version history (`Timeline` component) depends on it.
- Only one revision of a given drawing number may be `Current` at a time.
- Status strings must match `06_COPY_GUIDELINES.md` §6 Documents vocabulary exactly.
- Drawing numbers follow `{Discipline}-{Project}-{SheetType}-{Sequence}` (`08_DEMO_DATA_GUIDE.md` §7.4).

---

## 7. Typical Contractor Hierarchy

Used for org charts, approval chains, and Team workspace surfaces (`03_INFORMATION_ARCHITECTURE.md` §3.1):

| Level | Typical titles | Demo roster examples |
|---|---|---|
| Executive | Managing Director, Project Director | Faisal Al-Ghamdi (Project Director) |
| Project leadership | Senior Project Manager, Project Manager | Noura Al-Sabti, Omar Haddad |
| Engineering | Project Engineer (Civil / MEP / Structural) | Sara Al-Qahtani, Yousef Barakat |
| Site | Site Engineer, Site Supervisor, Foreman | Tariq Fahmy |
| Support functions | QA/QC Manager, Procurement Lead, Document Controller, Cost Controller | Lina Mansour, Khalid Rashidi, Huda Al-Amri, Mona Al-Sulaiman |

Never flatten this into a two-role "Requester / Approver" toy model — real hierarchy depth is a trust signal (`02_PRODUCT_DESIGN_MANUAL.md` §10.6).

---

## 8. Typical Approval Hierarchy

For approval-gated entities (Submittals, POs above threshold, Variation Orders):

```
Site / Project Engineer
  → Project Manager
    → Project Director
      → Client-side approver (external to Al-Buraq Horizon roster)
```

Fixture data must always include examples of: clean single-pass approval, sent-back-for-revision cycle, and still-pending item (`08_DEMO_DATA_GUIDE.md` §7.6).

---

## 9. RFI Lifecycle (Canonical)

```
Raised (Open)
  → Pending Response (with client/consultant)
    → Answered
      → Closed
```

Branch: if due date passes without answer → `Overdue` (may still later move to `Answered` / `Closed`).
Never invent intermediate statuses outside `06_COPY_GUIDELINES.md` §6.

---

## 10. Saudi Construction Business Terminology

| Term / concept | Usage rule |
|---|---|
| **Saudi Contractors Authority classification** | Grade (e.g., Grade 2) indicates contractor capability band — used in Al-Buraq Horizon profile. |
| **Aramco-approved vendor** | Vendor qualified to work on Saudi Aramco projects under Aramco's vendor frameworks. Treat as a serious compliance signal, never as decorative badge copy. |
| **Eastern Province / Jubail / Yanbu / Dhahran** | Real industrial hubs — use real city names from `08_DEMO_DATA_GUIDE.md` §2.2, never invent cities. |
| **SAR** | Saudi Riyal — only currency in Phase 1. Format per `02_PRODUCT_DESIGN_MANUAL.md` §10.1. |
| **Gregorian calendar for commercial dates** | `DD MMM YYYY` — do not introduce Hijri dates without a `DECISIONS.md` entry (`06_COPY_GUIDELINES.md` §11.6). |
| **Metric units only** | m², m³, LM, MT, EA — never imperial. |
| **EPC / MEP / Civil / Industrial** | Discipline and delivery-model terms used in Discovery Simulator profile selection (`03_INFORMATION_ARCHITECTURE.md` §5). |

---

## 11. Aramco-Oriented Terminology (Where Appropriate)

Use carefully and accurately — overusing "Aramco" as a decorative credibility word is itself a credibility failure.

| Term | Meaning / usage |
|---|---|
| **Aramco-approved vendor** | See §10. Al-Buraq Horizon carries illustrative code `AR-CL-2291`. |
| **Vendor Manual / Standards** | Aramco publishes extensive engineering standards (SAES, SAMSS, etc.). The Showcase does not need to enumerate them in Phase 1, but AI copy must never invent fake standard numbers. |
| **Permit to Work culture** | Particularly strict on Aramco and industrial sites — PTW is a first-class concept if HSE workflows are shown. |
| **Inspection & Test Plan (ITP)** | A plan defining inspection points (hold/witness/review) for a scope of work. Introduce as a defined term before any UI uses it. |

**Hard rule:** Never fabricate Aramco document numbers, standard codes, or approval references beyond what is explicitly listed in `08_DEMO_DATA_GUIDE.md` or this guide.

---

## 12. Terms This Product Must Never Use as Synonyms

| Forbidden casual synonym | Correct term |
|---|---|
| Ticket / Issue / Bug | RFI, NCR, or the specific document type |
| Invoice (for scope change) | Variation Order |
| Task (for formal inspection) | WIR / MIR |
| Folder (for controlled drawings) | Drawing register / Document register |
| Chat (for formal clarification) | RFI |
| Discount / Deal (for commercial change) | Variation Order / negotiated rate |

---

## 13. Extension Rule

When a future phase needs a new domain term:
1. Add a definition to this document.
2. If it has a UI status vocabulary, extend `06_COPY_GUIDELINES.md` §6 in the same PR.
3. If it appears in fixtures, extend `08_DEMO_DATA_GUIDE.md` in the same PR.
4. Record a short note in `DECISIONS.md` only if the term choice involved a non-obvious trade-off (e.g., Punch List vs Snag List).
