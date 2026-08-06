# 16 — Presentation Mode Guide

**Owner:** Enterprise Product Manager / UX Director / Staff Frontend Engineer
**Depends on:** `01_PROJECT_SSOT.md`, `03_INFORMATION_ARCHITECTURE.md`, `05_MOTION_SYSTEM.md`, `07_IMPLEMENTATION_RULES.md`
**Status:** Handbook for making live in-person meetings flawless. If a behavior is not specified here, it is not a Presentation Mode feature yet — propose it here before building it.

> The representative is not a developer. Every affordance below exists so a non-engineer can run a high-stakes meeting without fear.

---

## 1. What Presentation Mode Is

Presentation Mode is a **display and interaction state** layered over the real application (`03_INFORMATION_ARCHITECTURE.md` §1, §6) — not a separate slideshow build. It:

- Quiets secondary chrome (does not remove navigation — the rep may still need it).
- Slightly increases base type scale for projector/shared-screen legibility.
- Surfaces a **Presenter Toolbar** (rep-only, visually quiet).
- Disables or guards `illustrative-only` controls that could lead to dead ends.
- Keeps all fixture data and URLs intact so the rep can deep-link and recover.

## 2. Fullscreen Mode

Distinct from Presentation Mode:

| | Presentation Mode | Fullscreen Mode |
|---|---|---|
| What it changes | Chrome weight, type scale, toolbar, illustrative guards | Browser/OS chrome via Fullscreen API |
| When to use | Nearly every client meeting | When projecting and browser chrome is distracting |
| Toggle | In-app (toolbar / shortcut) | In-app shortcut + standard browser fullscreen |

Both may be active together. Exiting fullscreen must not exit Presentation Mode (and vice versa).

## 3. Keyboard Shortcuts (Rep-Facing)

Shortcuts must work when focus is not inside a text field. Show a printable cheatsheet from the Presenter Toolbar ("?" or `Shift+/`).

| Shortcut | Action |
|---|---|
| `P` | Toggle Presentation Mode |
| `F` | Toggle Fullscreen |
| `G` then `S` | Go to Discovery Simulator (chord) |
| `G` then `D` | Go to Project Command Dashboard |
| `G` then `H` | Go to Credibility Landing / Mode Selector |
| `R` | Open Demo Reset confirmation |
| `[` / `]` | Previous / Next Simulator step (when Simulator active) |
| `Esc` | Close topmost overlay; if none, open recovery hint (does not exit Presentation Mode) |
| `?` | Shortcut cheatsheet |

**Why chords (`G` then `X`):** single-letter global shortcuts collide with typing and with client exploration; a go-prefix matches enterprise tool conventions (Linear, Jira) and is hard to trigger accidentally.

## 4. Workspace Launcher

A command-palette-style launcher (keyboard `Cmd/Ctrl+K` and Presenter Toolbar button) listing:

- Discovery Simulator (resume or restart)
- Each Workspace + Section (from IA)
- Active project switch (Al-Buraq Horizon portfolio)
- About This Demo
- Demo Reset

Fuzzy search over fixture entity names (project codes, RFI IDs) is Phase 2+; Phase 1 lists destinations statically for reliability.

## 5. Presenter Toolbar

- Low-contrast, edge-anchored (default: bottom or side — pick one in implementation and lock it; do not float mid-screen).
- Contains: Presentation Mode indicator, Simulator step position, Workspace Launcher, Demo Reset, Shortcut cheatsheet, optional Presenter Notes toggle.
- Auto-hides after inactivity during Presentation Mode; reappears on cursor to toolbar edge or shortcut.
- Never covers primary KPI/chart content at `breakpoint-lg`.

## 6. Presenter Notes

Optional, rep-only panel (not visible in screen-share if the rep uses OS window sharing of the content window only — document this in rep training). Notes are authored content living in the content layer (not hardcoded), keyed to Simulator step ID and major workspace sections.

Notes are short bullets — not scripts. Tone matches `06_COPY_GUIDELINES.md` (precise, calm).

## 7. Demo Reset

One action that returns the app to a known-good pre-meeting state:

- Simulator → Step 0, no profile selected
- Workspace → Project Command Dashboard → Overview
- Active project → default (P-1042 Jubail Process Utility Upgrade recommended — On Track, richest fixture set)
- Presentation Mode → remains as the rep left it (do not force off)
- Clears any local UI state (open drawers, filters, sort)

Always confirm before reset (`Dialog`). Accidental reset mid-meeting is nearly as bad as a crash.

## 8. Quick Navigation

- URL-addressable state remains mandatory (`03_INFORMATION_ARCHITECTURE.md` §4).
- Presenter Toolbar + Launcher + shortcuts are the three quick paths; do not add a fourth competing nav metaphor.
- Deep links may be bookmarked by reps before a meeting (e.g., jump straight to RFI log for a technical audience).

## 9. Recovery After Mistakes

| Mistake | Recovery |
|---|---|
| Client navigated somewhere unexpected | `G H` or Launcher → Mode Selector / Dashboard; or `R` reset |
| Opened an illustrative-only control | Presentation Mode shows a calm `InlineAlert` and blocks dead-end; Esc closes |
| Simulator feels "stuck" | `[` / `]` or Skip / Restart per IA §5.4 |
| Wrong project selected | Launcher → project switch; data remains consistent by construction (`08_DEMO_DATA_GUIDE.md`) |
| Layout looks wrong on projector | Toggle Presentation Mode off/on; check fullscreen; fallback: browser zoom 90–110% only — app should not require zoom |

No recovery path may require DevTools, terminal, or hard refresh as the happy path. Hard refresh is last resort and must still land on a safe screen (Credibility / Mode Selector), never a stack trace.

## 10. Meeting Flow (Recommended)

Aligned with `03_INFORMATION_ARCHITECTURE.md` §9.1:

1. **Pre-meeting (5 min):** Demo Reset, enable Presentation Mode, verify offline bundle if needed (§12), open Presenter Notes for Step 0–1.
2. **Open (≤90s):** Credibility Landing — establish enterprise grade visually.
3. **Guided path:** Discovery Simulator Steps 0–5.
4. **Deep dive:** Live Workspace as client questions demand.
5. **Close:** Simulator Step 5 / next steps; optionally About This Demo if a technical skeptic probes.
6. **Post-meeting:** Exit Presentation Mode; optional discussion summary (§16).

Fast path target ≤10 minutes; deep path ≤25 minutes (`01_PROJECT_SSOT.md` §7).

## 11. Offline Behavior

Hard requirement from `01_PROJECT_SSOT.md` §8.1:

- Core walkthrough and workspaces must run from a local/static build with **no network dependency**.
- Presentation Mode must not invoke any network-only feature without a clear offline fallback message.
- No telemetry calls in Phase 1 (`07_IMPLEMENTATION_RULES.md` §14).
- Pre-meeting checklist includes: open the local build once on venue Wi-Fi (or airplane mode test) before the client sits down.

## 12. Performance Expectations

Restate and specialize `07_IMPLEMENTATION_RULES.md` §9 for live meetings:

- Cold load ≤ 2s on presenter hardware.
- Navigation / Launcher open < 100ms perceived.
- Simulator step transitions use `motion-slow` but never stall input — controls remain responsive during transition.
- Demo Reset completes fast enough that it feels like a tool, not a reboot (< 1s to known-good paint).

## 13. Arabic Switching

Phase 1: English only; architecture RTL-ready (`09_DESIGN_TOKENS.md` §12).
Phase 3: language toggle available from Presenter Toolbar and shell. Switching language mid-meeting must:

- Preserve current route, Simulator step, and active project.
- Not reset demo state.
- Apply dir=rtl/ltr at the document root without layout crash.

Until Phase 3 ships, the toolbar must not show a broken/fake language toggle.

## 14. Industry Switching

Maps to Discovery Simulator Step 0 profile selection (`03_INFORMATION_ARCHITECTURE.md` §5) — General Contractor, MEP, Oil & Gas, etc.

- Changing industry profile mid-Simulator updates Problem Mirror / Capability Reveal content variants.
- Does **not** invent a second fictional company — still Al-Buraq Horizon (`08_DEMO_DATA_GUIDE.md`, `DECISIONS.md` D-002).
- Prefer changing profile at Step 0 or via an explicit toolbar control with confirmation if mid-flow, to avoid silent narrative inconsistency.

## 15. Discovery Simulator Flow (Presenter View)

Rep controls always available (IA §5.4): Next, Back, Skip to Workspace Dive, Restart, Exit to Explore.

Step timing guidance for reps (not enforced by software):
- Step 0: < 60s
- Step 1: 90–120s (talk over reveal)
- Step 2: 90–120s (staggered cards — talk over `motion-deliberate`)
- Step 3: as needed (client-driven)
- Step 4: 60–90s (bounded AI simulation)
- Step 5: 60–90s

## 16. Ending a Meeting

- Prefer a deliberate close (Step 5) over dropping to a random workspace.
- Exit fullscreen first, then Presentation Mode (or leave Presentation Mode on if the next meeting is immediate — Demo Reset between meetings).
- Do not leave client-facing illustrative AI panels mid-stream as the last thing on screen.

## 17. Generating Discussion Summaries

Phase 1: **out of scope as an automated feature** (no backend, no real transcript). Reps may use Presenter Notes + verbal close.

Phase 5+ (hosted leave-behind) may introduce an optional post-meeting summary artifact. Until a `DECISIONS.md` entry authorizes it:

- Do not build fake "AI meeting summary" surfaces that imply recording/transcription that did not happen.
- Do not store real client names entered free-text (Phase 1 forbids free-text client capture — IA §5.3; `07_IMPLEMENTATION_RULES.md` §14).

If a lightweight "topics covered" checklist is needed for reps, it must be manually ticked, local-only, and clearly not client-facing.
