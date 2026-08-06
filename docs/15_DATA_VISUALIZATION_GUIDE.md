# 15 — Data Visualization Guide

**Owner:** Principal Product Designer / Solutions Architect / Staff Frontend Engineer
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md`, `04_COMPONENT_SYSTEM.md`, `09_DESIGN_TOKENS.md`, `08_DEMO_DATA_GUIDE.md`, `13_CONSTRUCTION_DOMAIN_GUIDE.md`
**Status:** Enterprise dashboard and chart constitution for the Showcase.

---

## 1. Chart Philosophy

1. **One chart, one insight.** If a chart needs a paragraph to explain what it shows, it is the wrong chart (or two charts).
2. **Numbers beat ornament.** A correctly formatted SAR total next to a quiet bar chart beats a 3D render of the same data. Construction professionals trust numbers; they distrust decoration.
3. **Charts exist to answer a question the narrative or workspace has already framed** — never as ambient "analytics wallpaper."
4. **Fixture data must remain reconcilable.** Every chart series traces to `08_DEMO_DATA_GUIDE.md` entities. Hardcoded chart-only numbers that disagree with tables on the same screen are a P0 credibility bug.

## 2. Chart Hierarchy

| Tier | Purpose | Typical placement |
|---|---|---|
| **Executive summary** | 3–6 `KPIStat` cards answering "are we healthy?" | Dashboard Overview top row |
| **Primary chart** | One dominant visualization answering the page's main question | Below KPIs, full content width or 8/12 columns |
| **Supporting charts** | Secondary breakdowns (by discipline, by project, by month) | Adjacent or below primary; never competing for equal weight |
| **Tables** | Auditable detail — always available when a chart summarizes | Below or via drill-through Drawer |

**Rule:** An Overview screen never opens with a chart above the KPI row. Executives scan KPIs first (`03_INFORMATION_ARCHITECTURE.md` §3.1 rationale).

## 3. Color Usage

- Series colors derive from brand + semantic tokens only (`09_DESIGN_TOKENS.md` §1) — never arbitrary hex.
- Status-meaning series (On Track / At Risk / Delayed) must use `semantic-success` / `warning` / `danger` respectively.
- Multi-series categorical charts (e.g., spend by discipline) use a restrained sequential palette derived from `brand-primary` neutrals — not a rainbow.
- Never use `brand-accent` (brass) as a series color for status; it is reserved for rare emphasis (`09_DESIGN_TOKENS.md` §1.2).
- Color is never the sole channel — patterns, labels, or direct value callouts accompany series for accessibility (§13).

## 4. KPI Cards

Built exclusively with `KPIStat` (`04_COMPONENT_SYSTEM.md` §3.14):

| Element | Rule |
|---|---|
| Value | `text-numeric-lg`, tabular figures, correctly formatted (SAR / % / count) |
| Label | Short noun phrase (`text-label` or `text-body-sm`) |
| Trend | Up / down / flat icon + semantic color + short delta text (e.g., "−4% vs last month") |
| Sparkline | Optional; if present, quiet and non-interactive in Phase 1 |
| Click target | If the whole card navigates, use `Card` `interactive` variant — never nest a button that fights the card click |

Maximum 6 KPIs in the top row of Overview. More than 6 becomes a second row only if every KPI earns its place in the narrative.

## 5. Executive vs Operational Dashboards

| | Executive | Operational |
|---|---|---|
| Audience in the room | Project Director / GM | Project Manager / Engineer / Cost Controller |
| Density | Lower — fewer charts, larger type | Higher — tables + charts |
| Time horizon | Portfolio / phase | Week / look-ahead / discipline |
| Primary question | "Are we okay?" | "What needs action today?" |
| Presentation Mode | Favored default for opening | Used after the narrative dive |

The Project Command Dashboard Overview is **executive-first**. Project Detail and RFI/Documents previews lean **operational**.

## 6. Trend Indicators

- Always show direction + magnitude + comparison baseline ("vs baseline," "vs last month," "vs SLA").
- Flat trend is a first-class state (not "missing data").
- Never animate trend arrows on a loop.

## 7. Forecast Charts

If a forecast is shown (e.g., projected completion, cost-to-complete):
- Visually distinguish actuals vs forecast (solid vs dashed stroke, or filled vs outline).
- Label the forecast explicitly — never let a client mistake a projection for an actual.
- Forecast values must be present in fixture metadata, not invented by the chart layer.

## 8. Construction KPI Catalog (Canonical Names)

Use these labels exactly when the KPI appears:

**Project / Schedule**
- Schedule Health (% milestones on track)
- Critical Path Slip (days)
- Open RFIs (count) / Overdue RFIs (count)
- RFI SLA Compliance (%)
- Submittals Pending Review (count)

**Finance / Cost**
- Contract Value (SAR)
- Cost to Date (SAR)
- Cost to Complete (SAR)
- Budget Health (Within Budget / Watch / Over Budget)
- Variation Orders (count / SAR)

**Procurement / Materials**
- POs Issued (count / SAR)
- Materials Awaiting Inspection (MIR count)
- Vendor On-Time Delivery (%)

**Equipment**
- Fleet Utilization (%)
- Equipment Downtime (hours)

**Safety (HSE)**
- TRIR / LTIF (when HSE workspace exists)
- Open PTWs (count)
- Near Misses (period count)

**HR / Labour (when relevant)**
- Site Headcount
- Manhours This Period

Do not invent parallel KPI names for the same concept ("RFI Health" vs "RFI SLA Compliance" — pick the catalog name).

## 9. Spacing

- Dashboard section vertical gap: `dashboard-section-gap` (`space-12`)
- Card grid gap: `dashboard-card-gap` (`space-6`)
- Card padding: `dashboard-card-padding` (`space-6`)
- Chart internal plot padding must not collide with axis labels; prefer generous plot margin over truncated tick text.

## 10. Legends

- Prefer direct labeling on series (end-of-line labels or labeled segments) over a separate legend when there are ≤ 3 series.
- When a legend is required, place it above or below the chart — never overlapping the plot.
- Legend swatches use the same semantic/brand colors as the series; include text labels always.

## 11. Tables Alongside Charts

- Every summary chart that a construction professional might challenge ("where does that number come from?") should have an auditable `DataTable` within one click (same page or Drawer).
- Table formatting rules from `02_PRODUCT_DESIGN_MANUAL.md` §10 and `04_COMPONENT_SYSTEM.md` §3.11 apply unchanged.
- Sorting a table must not re-trigger the staggered dashboard mount animation (`05_MOTION_SYSTEM.md` §8).

## 12. Empty Charts

- Use `EmptyState` pattern — short explanation + optional action ("No cost actuals logged for this period").
- Never render axes with zero series as if data exists.
- Never show a fake "sample" series in production demo builds.

## 13. Loading Charts

- Use `Skeleton` shaped like the chart's final layout for intentional async moments only.
- Bounded duration per `05_MOTION_SYSTEM.md` §5.
- No infinite spinners on dashboard tiles.

## 14. Accessibility

- Do not rely on color alone to distinguish series.
- Provide a data table alternative (visible or within one click).
- Chart SVGs / canvases need accessible names (`aria-label` summarizing the insight, e.g., "Schedule health by project, three of five on track").
- Keyboard users must reach drill-through controls without being trapped in the chart graphic.

## 15. Presentation Mode Behavior

Per `16_PRESENTATION_MODE_GUIDE.md` and `03_INFORMATION_ARCHITECTURE.md` §6:
- Increase type size slightly; keep KPI values as the hero.
- Disable non-essential chart brush/zoom interactions that a client might accidentally trigger.
- Prefer static, high-contrast series rendering over hover-dependent tooltips as the only way to read a value — tooltips may exist, but values should also be readable without hovering (projectors + distance).
