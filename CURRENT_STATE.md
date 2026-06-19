## Session log — Jun 20 — DISCOVERABILITY FIXES + SESSION TRACKING

### WHAT SHIPPED THIS SESSION

**Discoverability — three changes**
- Altar poems now visible at rest: `.altar-poem` opacity `0` → `0.22`
  - `councilLeave()` resets poem to `0.22` (was `0`) so it persists after unhover
  - On hover still brightens to `1` via existing JS — no hover behavior changed
  - Figures now read as doors, not paintings, including on mobile (no hover required)
- `#foyer-choose .fc-council-line` opacity raised `0.30` → `0.55`
  - "The council will listen and respond." is now legible as instruction, not ambient label
- Auto-focus council input on foyer load
  - `initCouncil()` 2800ms setTimeout now calls `inp2.focus()` after panel becomes visible
  - Blinking cursor = universal "type here" signal — no new UI element needed

**Tracking — `trackTempleEvent(name, payload={})` module**
- Injected as IIFE after `// == END COUNCIL ==`
- Logs to `console.log` on localhost/127.0.0.1 (IS_DEV flag)
- Stores session array in `localStorage` under key `temenos_session_events` (capped at 100 events)
- Each event: `{ event, ts, payload, path }`
- Debug helpers exposed on window:
  - `temenosSession()` — returns full session array
  - `temenosClearSession()` — clears session log
- Swap line clearly marked for Plausible / PostHog / Supabase

**8 events wired:**
| Event | Where |
|---|---|
| `foyer_loaded` | `initCouncil()` at 2800ms, when council panel becomes visible |
| `council_input_focused` | `fc-inp` focus listener, fires once per session |
| `council_question_submitted` | `sendCouncil()` after q confirmed non-empty, cBusy set |
| `chamber_entered_venus` | Top of `enterVenusApproach()` |
| `chamber_entered_ganymede` | Top of `enterGanymede()` |
| `oracle_question_submitted` | Top of `sendVenusNew()` and `sendGany()`, payload `{chamber}` |
| `grimoire_opened` | Top of `openGrimoire()` |
| `sigil_key_requested` | Inside `recv.addEventListener('click')` in `ganyGateInit()` |

---

### SUCCESS METRICS FOR NEXT 10 UNGUIDED VISITORS
- 7/10 find and use the council (`council_question_submitted` fires)
- 7/10 enter a chamber (`chamber_entered_*` fires)
- 3/10 say they felt something specific (qualitative)
- 1/10 asks how to go deeper / collect / get a key

**How to read session data:**
Open F12 console on the live site, run: `temenosSession()`
Returns array of all events fired this session in chronological order.

---

### KNOWN OPEN ISSUES (unchanged from Jun 19)
- Ganymede option click may still eject from panel (needs device testing)
- Post-council auto-transition still 2s — extend to 5s in next sprint
- `c-rec-enter` button ("enter when ready") still hidden for live path — deferred

---

### WHAT TO TEST BEFORE PUSHING
- [ ] Cold load → foyer appears → cursor blinks in council input after ~3s
- [ ] Altar poems faintly visible at rest, brighten on hover, return to faint on unhover
- [ ] "The council will listen and respond." visibly readable (not just atmospheric)
- [ ] F12 console → type in council → `council_question_submitted` appears in console (on localhost)
- [ ] `temenosSession()` in console returns array with events
- [ ] `temenosClearSession()` clears it
- [ ] Full flow: threshold → foyer → council → Venus → oracle → grimoire
- [ ] All 8 events visible in session array after full flow
- [ ] Ganymede → gate → "Request a Sigil Key" → `sigil_key_requested` fires
- [ ] Return navigation still works on Venus and Ganymede
- [ ] `?mock=1` and `?skip=ganymede` dev params still work

---

### NEXT SPRINT OPTIONS (ranked)
1. Extend post-council routing pause 2s → 5s + show "enter when ready" affordance
2. Archive overlay — one screen showing 4 founding relics, keeper slots, Sigil Key CTA
3. Wire tracking sender to Plausible (one line swap, no infra change)
4. Persephone integration (prototype complete, awaiting visual assets)
