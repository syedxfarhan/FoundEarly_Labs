# 06 — Copy Guidelines

**Owner:** Technical Writer / Enterprise Product Manager / UX Director
**Depends on:** `01_PROJECT_SSOT.md`, `03_INFORMATION_ARCHITECTURE.md`

> Every word in this product is being read by someone deciding whether to trust FoundEarly Labs with a real contract. Copy is not filler between components — it is sales collateral with a UI attached.

---

## 1. Voice

FoundEarly Labs' voice is **the senior engineer in the room, not the salesperson.** We describe capability plainly and specifically, and let the specificity do the persuading. We never oversell, because this exact audience (§2, `01_PROJECT_SSOT.md`) is trained by decades of vendor pitches to distrust anything that sounds like marketing.

Voice attributes, in priority order:
1. **Precise** — "Tracks RFI turnaround against a 7-day SLA per discipline" beats "Powerful workflow automation."
2. **Grounded in the industry's own language** — we use the vocabulary a Project Director already uses (§6 below), never invented SaaS-speak.
3. **Calm** — no exclamation points, no "amazing," no urgency-manufacturing language ("Don't miss out!"). Calm confidence reads as competence in this market; urgency reads as a red flag.
4. **Respectful of expertise** — copy never explains construction concepts to construction professionals ("An RFI, or Request for Information, is..."). We assume the room knows their industry better than we do, and we speak as a technical partner, not an educator.

## 2. Tone by Context

| Context | Tone | Example |
|---|---|---|
| Credibility Landing | Confident, understated | "Enterprise software for contractors who can't afford software that fails." |
| Discovery Simulator — Problem Mirror | Empathetic, specific, never accusatory toward the client's current process | "Submittal turnaround across Saudi MEP contractors averages 12–18 days when tracked manually." |
| Workspace UI (labels, headers, buttons) | Neutral, utilitarian, brief | "Approve", "Flag for Review", "Export BOQ" |
| Empty states | Helpful, never apologetic | "No RFIs match these filters." not "Oops, nothing here!" |
| Errors | Factual, actionable, no blame | "This project has no active budget baseline set." not "Something went wrong!" |
| AI Assistant responses | Precise, sourced, humble about scope (§8) | "Based on the 4 open RFIs on this project, 2 are past their SLA window." |
| About This Demo (transparency screen) | Direct, unguarded | "This build uses illustrative project data to demonstrate real workflow patterns." |

## 3. Writing Rules

1. **Sentence case for everything except proper nouns and the label style token** (`04_COMPONENT_SYSTEM.md` §3.5 `label` style is uppercase by design token, not by copy convention — writers write sentence case, the type system applies the transform).
2. **No exclamation points**, anywhere, ever, including empty/success states. Enthusiasm is conveyed through specificity, not punctuation.
3. **Active voice, present tense, for system statements.** "Approve this submittal" not "This submittal can be approved by you." "3 RFIs are past due" not "3 RFIs have been identified as being past due."
4. **Numbers as numerals, always**, even under 10, in any data or status context ("3 RFIs," not "three RFIs") — this is a data product; numerals scan faster and match how the audience already reads reports.
5. **No idioms, no humor, no cultural references that don't translate.** Every string in this product is a candidate for Arabic translation (§9) — copy that depends on English wordplay or Western cultural references is a translation liability from day one.
6. **Abbreviate only with industry-standard abbreviations** (RFI, BOQ, MEP, EPC, LM, MT, EA) — never invent internal abbreviations for the sake of brevity.
7. **One idea per sentence in UI copy.** Helper text, empty states, and error messages are capped conceptually at one clause; if a message needs "and," consider whether it's really two messages.

## 4. Headings

- Page (`h1`) and section (`h2`) headings are **noun phrases**, not sentences or questions: "Project Overview," not "Here's your project overview." Consistent with the calm, utilitarian tone (§2) for in-product surfaces.
- Narrative surfaces (Credibility Landing, Discovery Simulator) may use declarative sentence headlines, but never questions as primary headlines ("Tired of missed deadlines?") — that's a consumer-marketing pattern this audience has learned to associate with low-substance vendors.
- Headings never contain the product name redundantly ("FoundEarly Dashboard Overview" → just "Overview," since the workspace shell already establishes context per `03_INFORMATION_ARCHITECTURE.md` §3).

## 5. Buttons

- Buttons are **verb-first, specific, 1–3 words**: "Approve," "Export BOQ," "View RFI," "Return to Guide." Never generic ("Submit," "OK," "Click Here") when a specific verb is available — specificity in button labels is a strong, cheap credibility signal because it shows the product was actually designed for its workflows, not templated.
- Destructive actions name the consequence, not just the verb, wherever space allows in the confirmation dialog (`04_COMPONENT_SYSTEM.md` §3.1): dialog body clarifies "This will remove the RFI from the active register," button itself stays terse ("Remove RFI").
- Primary/secondary button pairs always resolve the ambiguity of "which one is safe": e.g., `Cancel` (secondary) / `Approve Submittal` (primary), never two similarly-weighted verbs.

## 6. Status Vocabulary (Canonical, Closed Set)

This is the enum `StatusChip` (`04_COMPONENT_SYSTEM.md` §3.5) is allowed to render. No screen may introduce a new status label outside this list without a documentation update — consistency here is one of the highest-leverage credibility signals in the whole product (`02_PRODUCT_DESIGN_MANUAL.md` §10.5).

**RFIs:** `Open` · `Pending Response` · `Answered` · `Closed` · `Overdue`

**Submittals:** `Pending Submission` · `Under Review` · `Approved` · `Approved with Comments` · `Rejected — Resubmit`

**BOQ / Procurement line items:** `Draft` · `Pending Approval` · `Approved` · `Issued to Vendor` · `Delivered` · `On Hold`

**Documents / Drawings:** `Current` · `Superseded` · `Pending Approval` · `Under Revision`

**Project / Task Schedule health:** `On Track` · `At Risk` · `Delayed` · `Complete`

**Budget health:** `Within Budget` · `Watch` · `Over Budget`

Each of these must be defined once in `08_DEMO_DATA_GUIDE.md`'s workflow section with its meaning and typical transition path, so demo data always uses status transitions that make real workflow sense (e.g., a submittal never jumps from `Pending Submission` directly to `Approved with Comments`).

## 7. Empty States

- Formula: **[what's missing] + [why, if useful] + [action, if one exists].**
  - "No RFIs match these filters. Try clearing the discipline filter." (has an action)
  - "This project has no linked vendors yet." (no action needed — informational)
- Never blame the user ("You haven't added any..." → "No vendors linked yet.")
- Never use placeholder illustrations of unrelated content; if an empty state needs visual weight, use a single generic icon (`04_COMPONENT_SYSTEM.md` §3.16), consistent with the icon rules in the design manual.

## 8. Errors

- Errors state **what happened, in industry-relevant terms, and what to do next.** Never expose raw technical detail (stack traces, status codes) in the primary message — a secondary, collapsed "technical details" affordance is acceptable for engineers, never shown by default in a room with a construction client.
- Errors never use the word "error" as the entire message. "Error: 400" is unacceptable; "This BOQ line item needs a quantity before it can be submitted" is correct.
- In a live-demo context, most "error" surfaces are actually validation/guidance states (since there's no real backend to fail per `01_PROJECT_SSOT.md` §8.2) — copy should reflect that these are workflow guardrails, not system failures.

## 9. AI Assistant Responses

Per `01_PROJECT_SSOT.md` §6.6, AI-assisted moments in this product must demonstrate *applied judgment*, not generic chatbot behavior. Copy rules specific to AI output:

1. **Always ground responses in visible, specific data** already present in the current fixture context ("Based on the 4 open RFIs on this project...") — never vague, unfalsifiable statements ("This project looks like it's going well").
2. **Never claim certainty the underlying system doesn't have.** Use "based on," "given," "this suggests" — never "I know" or unqualified assertions. This models exactly the trustworthy, scoped AI behavior FoundEarly Labs wants to be known for building (as opposed to an overconfident generic assistant).
3. **Always identify itself as an assistant, once, unobtrusively** — a small persistent label (`04_COMPONENT_SYSTEM.md` §3.20 `AIResponsePanel`) rather than a repeated disclaimer in every message, keeping the transparency principle (`03_INFORMATION_ARCHITECTURE.md` §7) intact without being condescending about it.
4. **Responses are short.** 2–4 sentences maximum in Phase 1 — a wall of AI-generated text reads as unedited and undermines the "precise, senior engineer" voice (§1). If more detail is warranted, the response links to the specific record (RFI, line item) rather than restating it in prose.
5. **No first-person enthusiasm.** The assistant never says "I'd be happy to help!" — it responds like a competent colleague giving a status update, consistent with §1's "senior engineer, not salesperson" framing.

## 10. Construction Terminology (Reference Glossary)

Writers and engineers must use these terms exactly as defined — this short list covers the highest-frequency UI terms. **For the full handbook (NCR, MIR, WIR, RFQ, PTW, HSE, document lifecycle, approval hierarchies, Saudi/Aramco usage), see `13_CONSTRUCTION_DOMAIN_GUIDE.md` — that document is canonical for domain meaning.** If a term appears in both places and ever diverges, fix them in the same PR; `13` wins on definitional depth, this section wins on UI-facing brevity for the terms listed below.

| Term | Definition as used in this product |
|---|---|
| **RFI** | Request for Information — a formal query from site/contractor to design team requiring a documented response. |
| **BOQ** | Bill of Quantities — itemized list of materials/work with quantities and rates, the basis for cost tracking. |
| **Submittal** | A document (shop drawing, material sample data, method statement) submitted for design-team approval before procurement/execution. |
| **MEP** | Mechanical, Electrical, Plumbing — a contracting discipline. |
| **EPC** | Engineering, Procurement, Construction — a contract delivery model. |
| **Variation Order (VO)** | A formally approved change to contracted scope/cost. |
| **Baseline** | The originally approved schedule/budget against which actual progress is measured. |
| **LM / MT / EA / m² / m³** | Linear meter / metric ton / each / square meter / cubic meter — standard units of measure; never abbreviate differently across the product. |
| **Punch List** | The list of outstanding defects/incomplete items identified near project completion. |

This glossary must be extended in **both** this section (if the term is UI-frequent) and `13_CONSTRUCTION_DOMAIN_GUIDE.md` when `08_DEMO_DATA_GUIDE.md` introduces new workflow concepts — every new domain term used anywhere in the UI gets an entry.

## 11. Arabic Translation Strategy

Per `01_PROJECT_SSOT.md` §3 (Goal G7) and Roadmap Phase 3, the product ships English-first but must not be translation-hostile.

1. **All UI strings live in a centralized content layer, never hardcoded inline in components**, per `07_IMPLEMENTATION_RULES.md` — this is a translation prerequisite, not a nice-to-have, and must be true from the first Phase 1 commit, not retrofitted later.
2. **Avoid string concatenation for sentences.** "3 RFIs overdue" must be composed as a single templated string with an interpolated count, never assembled from independently-translated fragments — Arabic sentence structure and pluralization rules don't map 1:1 onto English word order, and fragment-concatenation breaks immediately under translation.
3. **Design copy for length variance.** Arabic script is typically visually denser but can run 20–30% longer in character count for equivalent meaning; buttons/labels/chips must be speced with flexible width (`04_COMPONENT_SYSTEM.md` components already avoid fixed pixel widths on text containers for this reason).
4. **Numerals stay Western Arabic numerals (0–9) even in the Arabic UI**, per regional business-software convention (this matches how Aramco-ecosystem software and most Gulf enterprise tools render numerals) — do not use Eastern Arabic-Indic numerals.
5. **Construction terminology (§10) will need a reviewed, industry-accurate Arabic glossary**, not machine translation, before Phase 3 begins — mistranslated industry terms (e.g., a wrong Arabic term for "submittal" or "variation order") are as damaging as a wrong English one, and this review is scoped as a named Phase 3 workstream, not an implementation afterthought.
6. **Dates and currency formatting rules (`02_PRODUCT_DESIGN_MANUAL.md` §10.1–10.2) remain the same in Arabic mode** (Gregorian `DD MMM YYYY`, SAR-prefixed), because that is what this specific commercial/engineering audience uses in practice, regardless of UI language — we do not introduce a Hijri calendar or symbol-first currency formatting without an explicit, separately-justified decision recorded in `/DECISIONS.md`.
