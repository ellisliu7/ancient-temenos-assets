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

### COMMIT SUMMARY
```
Restore foyer video, council reset, Venus approach corridor
```

### COMMIT DESCRIPTION
```
Phase 1: 4 experience fixes
- M1: Foyer video src Foyer.mp4 → Foyer_Current.mp4 (was 404)
- M2: goReturn() calls councilReset() — council no longer sticks on return
- M3: Ganymede user message contrast 0.75 → 0.95
- M4: Candle click scrolls glass into view after option chosen

Phase 2: Venus approach corridor
- New #venusApproach screen with Venus.mp4 scroll-scrub (Ganymede grammar)
- enterVenusApproach() function with duration auto-detect
- All 3 entry points wired: foyer altar, council mock, council API
- Return navigation: venusApproach → foyer
- At arrival: overlay rises → flash → oracle room
```

---

### NEXT SESSION — START HERE

**Step 0:** GitHub Desktop → confirm branch = `main` → drag in `index.html` → commit → push

**Step 1: Verify end-to-end**
- [ ] Foyer video plays (was black before)
- [ ] Council fires, enter Ganymede, hit Return → foyer clean (no debate overlay)
- [ ] `?skip=venus&key=1` → corridor → scroll → oracle room → Return → clean foyer
- [ ] `?skip=ganymede&key=1` → type reply → your message is visible → choose candle → conversation stays in view

**Step 2: Ganymede closing (Option B)**
- Replace `ganyGate()` with a closing beat: Ganymede's final line ("You already know what to do. Now go build it.") → grimoire opens
- `check_in:true` triggers closing, not gate
- `#gany-closing` CSS currently `display:none !important` — needs enabling

**Step 3: Altar hover polish**
- Remove `.altar-poem` text box on hover
- Glow-only hover, no box

**Step 4: Ghost code removal** (only after all above verified)
- `sendVenus` / `renderVCard` / `addUserMsg` (~150 lines)
- `initVenusSculpture` / `_buildVenusSculpture` (~100 lines)
- `vaToggleGate` / `vaSubmitWaitlist`
- `#gany-closing{display:none !important}` — remove the `!important` lock when closing is built

---

### KNOWN DEAD CODE (do not touch yet)
- Ghost Venus oracle: `sendVenus` / `renderVCard` / `addUserMsg` (~150 lines)
- `initVenusSculpture` / `_buildVenusSculpture` (~100 lines)
- `vaToggleGate` / `vaSubmitWaitlist`
- `CDN2`, `FRAME_PNG`, `vRoomActive`
- `#poolScreen` CSS rule
- `runeWords` / `buildRunes` (legacy threshold — kept for reference)

### DEAD VIDEOS (still in repo, not yet deleted — separate task)
`Foyer_hall.mp4, Foyer.mp4, Ganymede Cave_1.mp4, Ganymede Cave.mp4, Ganymede_Cave_5S.mp4,
Ganymede_cave_animated.mp4, Ganymede_Dolly_draft.mp4, Ganymede_WIP.mp4, Ganymede_WIP.mov,
Venus Wishing Well.mp4, Venus_Altar_Video.mp4, venus_altar.mp4, Venus_timelapse.mp4,
ascii-art.mp4, Portal Frame.png, Venus_Frame.png`
Note: Venus Wishing Well_1.mp4 also 404 — not yet replaced.

### VIDEOS CONFIRMED LIVE IN REPO
`Main_Page.mp4, Foyer_Current.mp4, Ganymede_Dolly_final.mp4, Venus.mp4, Sigil.mp4`

### DEV TEST URLS
- Venus approach: `https://ellisliu7.github.io/ancient-temenos-assets/?skip=venus&key=1`
- Ganymede: `https://ellisliu7.github.io/ancient-temenos-assets/?skip=ganymede&key=1`
- Council mock: `https://ellisliu7.github.io/ancient-temenos-assets/?mock=1`
- Full mock Ganymede: `https://ellisliu7.github.io/ancient-temenos-assets/?mock=ganymede`

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
