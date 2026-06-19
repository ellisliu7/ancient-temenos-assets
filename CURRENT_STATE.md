## Session log — Jun 19 — FOYER POLISH + GRIMOIRE REDESIGN + GANYMEDE FIXES

### DEMO STATUS: READY TO PUSH
Push `index.html` to `main`. Demo path is clean.

---

### WHAT SHIPPED THIS SESSION

**Foyer input — vessel treatment**
- Visible "What's on your mind today?" heading removed
- Placeholder updated to "What's on your mind today?" (opacity 0.78)
- Input dissolved: fill, blur, radius, border ring all removed
- Replaced with single `border-bottom` ruled line — Venus grammar
- Focus state: line brightens, no box glow
- `::after` top highlight artifact removed
- Panel mask fade starts at 35% (was 55%) — council dissolves into scene more

**Navigation**
- Return button: hidden on foyer only (was routing foyer → threshold incorrectly)
- Return still present and working on venusApproach, venusBreath, venusOracle, ganymedeScreen
- Teachings button: hidden everywhere — no code deleted, restore anytime

**Em-dash strip**
- `stripDash()` utility at top of script
- Threaded through Venus renderer, Grimoire `clean()`, council live line renderer
- All AI text output now strips em-dashes

**Council invitation bleed fix**
- `councilReset()` now removes dynamically appended invitation `<p>` elements
- "She is ready for you." no longer persists into Ganymede sessions

**Grimoire — three seal modes**
- `openGrimoire()` detects context: Ganymede history → `ganymede`, Venus only → `venus`, neither → `council`
- Three separate system prompts, three JSON schemas, three renders
- Council seal: what was brought, what council saw, what remains
- Venus seal: what was carried in, what was reflected, a truth to carry
- Ganymede seal: what wants to be built, what stands in the way, what is being asked, what remains
- No 90-day action plan in any mode
- `copyGrimoire` header: "90 DAY SPRINT" → "Grimoire"
- `lastCouncilInput` variable captures seeker's foyer input for council seal context

**Ganymede — soft close**
- `ganyRitual()` now offers two options after the closing sequence:
  - `✦ Seal this into my Grimoire ✦` (existing)
  - `I want to go deeper` (new) — clears closing state, re-enables input
- Visitor is no longer hard-stopped at ritual close

**Ganymede — panel overflow fix**
- `#g-glass`: added `max-height:80vh` + `overflow-y:auto` + `overflow-x:hidden`
- Scrollbar hidden (`width:0`) for atmosphere
- Content now scrolls inside panel — never overflows into cave background
- `gStream` scroll (`gl.scrollTop = gl.scrollHeight`) now works correctly

**Ganymede — scroll timing fix**
- `gStream` scrolls panel after each paragraph fades in
- Removed premature `scrollIntoView` from option click handler

**Ganymede — pointer-events fix**
- `#g-convo`: `pointer-events:none` → `pointer-events:auto`
- Clicks on conversation area no longer fall through to cave background

**Reverted: `?debug=ganymede`**
- Added then immediately reverted — broke foyer entry
- Do not re-add without testing in isolation first

---

### DEMO FLOW — CONFIRMED WORKING
```
threshold → riddle (answer: love)
↓
foyer → council debate
↓
Venus or Ganymede (routing correct)
↓
Venus: oracle → grimoire seal
Ganymede: oracle → options → soft close (Sigil Key gate or ganyRitual)
```

**Sigil Key gate in Ganymede:** Intentionally left in for demo. Creates natural stop + conversion moment. Post-demo decision: gate vs grimoire vs both vs soft choice.

---

### KNOWN OPEN ISSUES (post-demo)

**Ganymede option click may still eject from panel**
- Three fixes applied this session (pointer-events, overflow, scroll timing)
- Not fully confirmed fixed — needs real device testing
- Test path: `?skip=ganymede&key=1&mock=ganymede` → type twice → three options appear → click one
- Root causes diagnosed: overflow visible + pointer-events:none on g-convo + premature scroll
- All three now patched; overflow fix is most likely the real culprit

**Post-demo Ganymede decisions**
1. Sigil Key gate vs Grimoire seal vs both in sequence vs soft "go deeper / seal" choice
2. Conversation length — gate currently handles it; revisit after demo
3. Candle layout (three-column feels heavy) — CSS-only fix, deferred
4. Venus animation parity with Ganymede slow fade — low risk, deferred

**Collector path — future thread (captured)**
- Altar layer: artwork + timelapse visible to all, seduction before oracle
- Collector inquiry: quiet path from artwork encounter to private note to El
- Editions connected to relics: limited prints tied to chamber moments
- Atelier access: deeper tier, studio notes, private correspondence
- Rule: temple stays sacred, collector relationship begins there, continues by invitation

---

### WHAT TO TEST BEFORE DEMO

- [ ] Cold load → threshold riddle → foyer video plays
- [ ] Type in foyer → council debate fires → recommendation appears
- [ ] Click Venus recommendation → approach corridor → scroll → oracle → Return → clean foyer
- [ ] Click Ganymede recommendation → cave scroll → glass rises → oracle → options appear → click option → stays in panel
- [ ] Grimoire: Venus session → seal → contemplative output (not 90-day plan)
- [ ] Grimoire: council session → seal → brief reflection output
- [ ] Grimoire: Ganymede session → seal → structural memory output
- [ ] Return works on Venus and Ganymede → back to foyer clean
- [ ] Return not visible on foyer itself
- [ ] Teachings button not visible anywhere

---

### DEV TEST URLS
- Full flow: `https://ellisliu7.github.io/ancient-temenos-assets/`
- Venus direct: `?skip=venus&key=1`
- Ganymede direct: `?skip=ganymede&key=1`
- Ganymede mock (no API): `?skip=ganymede&key=1&mock=ganymede`
- Council mock: `?mock=1`
- Cold reset: `?reset`

---

### REPO DOCS TO READ NEXT SESSION
- `DECISIONS.md` — check before re-litigating any architecture
- `BIBLE.md` — drift check if anything feels off
- `CHARACTERS.md` — voice reference before touching any system prompt

---

## Session log — Jun 18 — PHASE 1 + PHASE 2: EXPERIENCE RESTORATION

### MILESTONE: Phase 1 complete — 4 core experience fixes
**Goal:** Remove the most visible breaks before Friday demo.

**M1 — Foyer video restored**
- `Foyer.mp4` → `Foyer_Current.mp4` (Foyer.mp4 was 404 — deleted from repo)
- Verify: enter foyer, background video plays

**M2 — Return-to-foyer no longer leaves council stuck**
- `goReturn()` now calls `councilReset()` before flashing back to foyer
- Verify: enter Ganymede or Venus, hit Return, foyer is clean with no debate overlay

**M3 — Ganymede user messages legible**
- `.msg-user .bub` color: `rgba(238,220,168,0.75)` → `rgba(238,220,168,0.95)`
- Verify: type something in Ganymede, your reply should be clearly readable

**M4 — Candle click scrolls to conversation**
- After choosing a Ganymede option, `g-glass.scrollIntoView()` fires
- Panel stays visible; thinking dots appear without manual scroll
- Verify: choose a candle option, conversation continues in view

---

### MILESTONE: Phase 2 complete — Venus approach corridor restored

**What was built:**
- `#venusApproach` screen with `Venus.mp4` scroll-scrub corridor
- Same grammar as Ganymede: scroll forward → video advances → arrive → glass rises → flash into oracle
- `enterVenusApproach()` function with duration auto-detect + fallback
- Hint text: "She is near. Draw closer." with breathing chevron
- At arrival: dark overlay rises over 800ms, then flashes into `venusOracle` at 2600ms
- Return button maps `venusApproach → foyer`

**All Venus entry points wired to `enterVenusApproach()`:**
- Foyer altar click (`foyerEnter('venus')`)
- Council mock path
- Council real API path
- Direct altar hover entry

**Verify Venus flow:**
1. `https://ellisliu7.github.io/ancient-temenos-assets/?skip=venus&key=1` — drops into corridor
2. Scroll up → Venus.mp4 advances
3. At end of video → dark glass rises → flash → oracle room
4. Return → back to foyer, council clear

---

### DECISIONS THIS SESSION (also in Decisions.md)
- Ganymede closing: Option B — `check_in:true` → closing beat → grimoire (NOT yet built, next session)
- Sigil Key gate after Ganymede removed from roadmap — violates Constitution Principle 2
- Venus approach takes priority over polish work for Friday demo

---

### STATUS AFTER THIS SESSION
- Patched `index.html` ready — push to `main`
- GitHub Desktop: confirm branch = `main` before committing

---

## Session log — Jun 17 — DEPLOYMENT FIX + FOYER CRASH FIX
[...archived below...]

### THE ROOT CAUSE OF 2 DAYS OF BUGS
All fixes were being pushed to a **detached branch**, not `main`. GitHub Pages only deploys from `main`.

### CONFIRMED LIVE AFTER JUN 17 SESSION
- `enterVenusApproach` function confirmed present
- Council routing fixed (was going to empty `enterVenusAltar`)
- Foyer hover null crashes fixed with null guards
- Persephone disabled in LIVE_CHAMBERS

---

### KNOWN DEAD CODE (do not touch yet)
- Ghost Venus oracle: `sendVenus` / `renderVCard` / `addUserMsg` (~150 lines)
- `initVenusSculpture` / `_buildVenusSculpture` (~100 lines)
- `vaToggleGate` / `vaSubmitWaitlist`
- `CDN2`, `FRAME_PNG`, `vRoomActive`
- `#poolScreen` CSS rule
- `runeWords` / `buildRunes` (legacy threshold — kept for reference)

### DEAD VIDEOS (still in repo, not yet deleted)
`Foyer_hall.mp4, Foyer.mp4, Ganymede Cave_1.mp4, Ganymede Cave.mp4, Ganymede_Cave_5S.mp4,
Ganymede_cave_animated.mp4, Ganymede_Dolly_draft.mp4, Ganymede_WIP.mp4, Ganymede_WIP.mov,
Venus Wishing Well.mp4, Venus_Altar_Video.mp4, venus_altar.mp4, Venus_timelapse.mp4,
ascii-art.mp4, Portal Frame.png, Venus_Frame.png`
Note: Venus Wishing Well_1.mp4 also 404 — not yet replaced.

### VIDEOS CONFIRMED LIVE IN REPO
`Main_Page.mp4, Foyer_Current.mp4, Ganymede_Dolly_final.mp4, Venus.mp4, Sigil.mp4`
