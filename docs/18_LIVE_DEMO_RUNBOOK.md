# 18 — Live Demo Runbook

**Owner:** Enterprise Product Manager / Staff Frontend Engineer
**Depends on:** `16_PRESENTATION_MODE_GUIDE.md`, `01_PROJECT_SSOT.md`, `08_DEMO_DATA_GUIDE.md`
**Status:** Operational handbook for the representative and the engineer on standby. Not application code — procedures.

> When something goes wrong in the room, the rep should not think — they should follow this.

---

## 1. Pre-Meeting Checklist (T−30 to T−5 minutes)

1. Launch the **local/static build** (not a random staging URL that needs venue Wi-Fi).
2. Enable airplane mode once and confirm Credibility Landing + Simulator Step 0 + Dashboard Overview still load.
3. Run **Demo Reset** (`16_PRESENTATION_MODE_GUIDE.md` §7).
4. Enable **Presentation Mode**; optionally Fullscreen.
5. Confirm active project is **P-1042** (default) unless the meeting plan says otherwise.
6. Open Presenter Notes for Steps 0–2 if used.
7. Disconnect unnecessary browser extensions; hide bookmarks bar; disable notification popups OS-wide.
8. Plug in power; set display to **do not sleep**; silence phone.
9. If using an external display/projector: verify at `breakpoint-lg`/`xl`, Presentation Mode on, no overflow.

## 2. Standard Meeting Path

Follow `16_PRESENTATION_MODE_GUIDE.md` §10 and `03_INFORMATION_ARCHITECTURE.md` §9.1. Prefer Guided Walkthrough unless the client demands Explore Freely immediately.

## 3. Incident Responses

| Symptom | Immediate action | If still broken |
|---|---|---|
| Blank screen / white flash | `G` then `H` (home); or hard refresh once | Demo Reset; last resort: reopen local build bookmark |
| Navigated to weird URL | Launcher → Dashboard or Simulator | Demo Reset |
| Client opened illustrative dead-end | Esc; read `InlineAlert`; continue | Presentation Mode should have blocked — note as P0 bug after meeting |
| Wrong industry narrative | Confirm → switch profile or Restart Simulator at Step 0 | Do not improvise mismatched Problem Mirror copy |
| Numbers questioned | Drill to table/Drawer; cite project code from `08` | Never invent a reconciliation on the fly — say "illustrative dataset" and move to About This Demo if needed |
| Performance hitch | Stop interacting for 1s; avoid double-clicks | Skip to Workspace Dive; file perf bug after |
| Projector contrast poor | Toggle Presentation Mode; prefer light mode | Increase OS brightness; avoid browser zoom >110% |
| Skeptic opens DevTools | Stay calm; continue narrative; About This Demo if asked | Never disable DevTools mid-meeting as a "fix" |

## 4. Things the Rep Must Never Do In-Room

- Open a terminal, editor, or localhost network panel
- Edit fixture data "quickly"
- Promise a feature not listed as interactive in About This Demo
- Type real client confidential data into any field (Phase 1 has no free-text client capture by design)
- Fake an online AI call if offline — AI Moment is simulated and bounded

## 5. Post-Meeting

1. Exit Fullscreen; leave or exit Presentation Mode deliberately.
2. Demo Reset before the next meeting the same day.
3. File issues within 24 hours: severity **P0** if it was visible to the client; include what was on screen, approximate step, and whether offline.
4. Do not "fix forward" a live-demo defect without a ticket — silent fixes recreate the failure for the next rep.

## 6. Engineer Standby Protocol

If an engineer accompanies the meeting:

- Sit out of the client's primary sightline.
- Intervene only if the rep requests, or if a hard crash requires relaunch.
- Take notes; do not drive the machine unless handed it.
- Afterward, reproduce from the runbook notes before changing code.
