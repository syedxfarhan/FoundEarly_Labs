# 19 — Brand Application & i18n Key Conventions

**Owner:** Principal Product Designer / Technical Writer / Staff Frontend Engineer
**Depends on:** `02_PRODUCT_DESIGN_MANUAL.md`, `06_COPY_GUIDELINES.md`, `09_DESIGN_TOKENS.md`
**Status:** Identified in final Phase 0 review as a gap a large engineering team would ask for before scaffolding.

---

## 1. Brand Application

### 1.1 Names

| Name | When to use |
|---|---|
| **FoundEarly Labs** | Legal/company references, About This Demo, copyright |
| **FoundEarly** | Short brand in UI chrome where space is tight (top bar mark label) |
| **Interactive Capability Showcase** | Internal/repo/project name — not a client-facing product brand to sell as SaaS |
| Do not invent | "FoundEarly OS", "FoundEarly Cloud", or other productized names without a `DECISIONS.md` entry |

### 1.2 Mark placement

- Top bar: mark + wordmark at a quiet size; never larger than the page `h1` on workspace screens (brand is present, content is primary — except Credibility Landing where brand is hero-level per product design philosophy).
- Credibility Landing: brand is a **hero-level signal** (FoundEarly Labs must remain dominant if nav were removed — see user-facing design rules / `02` brand-first intent).
- Never stretch, recolor outside tokenized brand colors, or add drop shadows/glows to the mark.
- Clear space: minimum `space-4` (16px) around the mark on all sides.

### 1.3 Color

- Primary brand UI color: `brand-primary` (`09_DESIGN_TOKENS.md`).
- Accent (`brand-accent`) is rare emphasis only — never default button fill, never status.
- Do not introduce additional brand hues without updating `09` + `DECISIONS.md`.

### 1.4 Co-branding / client-branded mode (Phase 4)

Out of scope until Phase 4. When built, client marks are temporary veneer only — never rewrite Al-Buraq Horizon fixture identity (`08_DEMO_DATA_GUIDE.md`, D-002).

---

## 2. i18n / Content Key Conventions

Per `06_COPY_GUIDELINES.md` §11 and `07_IMPLEMENTATION_RULES.md`, all UI strings live in a centralized content layer from the first Phase 1 commit.

### 2.1 Key shape

```
{domain}.{surface}.{element}[.{variant}]
```

Examples:
- `simulator.step1.title`
- `dashboard.overview.kpi.openRfis.label`
- `rfi.status.overdue`
- `common.action.approve`
- `presentation.toolbar.reset`

### 2.2 Rules

1. **Domains** map to features/workspaces (`simulator`, `dashboard`, `rfi`, `common`, `presentation`, `about`) — not to component file names.
2. **Status and vocabulary strings** are keyed once under `rfi.status.*`, `submittal.status.*`, etc., and reused — never duplicated per screen.
3. **No sentence concatenation** via multiple keys glued in code — use one key with interpolation (`{count}`).
4. **Default locale file is `en`**; `ar` arrives in Phase 3 with reviewed domain glossary (`13` + `06` §11.5).
5. Keys are **stable identifiers** — rename only with a migration note in PR description; do not recycle keys for different meanings.

### 2.3 Ownership

- New keys for a feature land in that feature's content module under `features/.../content/` (see `10_PROJECT_STRUCTURE.md` illustrative tree).
- Shared vocabulary (`status`, `common.action`) lives in a shared content module owned with `06` / `13`.

---

## 3. Why This Document Exists

Without brand and key conventions, a 50-person team produces three wordmarks, five "Approve" strings, and an untranslatable concatenated copy surface within two sprints. This file exists to make the first Phase 1 scaffolding PR unambiguous.
