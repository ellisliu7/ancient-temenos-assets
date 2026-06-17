## Session log — Jun 17 — DEPLOYMENT FIX + FOYER CRASH FIX

### THE ROOT CAUSE OF 2 DAYS OF BUGS
All fixes were being pushed to a **detached branch**, not `main`. GitHub Pages only deploys from `main`. Every patch was going into a void. Nothing ever reached the live site.

**How to prevent:** In GitHub Desktop, always verify the branch button (top center) says **main** before committing.

### CONFIRMED: Latest code IS deployed
`typeof enterVenusApproach` returned `'function'` in the console. The latest patched file is live.

### FIXES SHIPPED THIS SESSION (all in the patched index.html)

**Deployment-unblocking fixes (from previous sessions, now actually live):**
1. `LIVE_CHAMBERS`: `persephone:true` → `persephone:false` — prevented silent crash + stuck `cBusy` when council recommended Persephone
2. Council routing mock path (line ~3030): `enterVenusAltar()` → `enterVenusApproach()`
3. Council routing real API path (line ~3177): `enterVenusAltar()` → `enterVenusApproach()`

**New fixes this session:**
4. Main page scroll multiplier: `e.deltaY * 0.4` → `e.deltaY * 3.0` (was too slow for Mac trackpad)
5. Council backup reveal: added `setTimeout(...classList.add('visible')..., 2000)` directly in `showScreen` — council now guaranteed to appear 2s after entering foyer regardless of initCouncil chain
6. Venus corridor fade-in: `transition: opacity 3.5s ease` → `1s` (was appearing black for too long)
7. **THE REAL BUG**: `foyerHover` + `foyerLeave` null crashes — `venus-artwork` and `gany-artwork` elements referenced in JS don't exist in HTML (deleted in a prior session). Was crashing on every altar hover, spamming browser with errors. Fixed with null guards on all references.

### WHAT THE FOYER VISUAL IS
The temple scene, oracle wheel/armillary sphere, and statues are all baked into `Foyer_Current.mp4` — they are NOT separate HTML elements. The altar labels, council panel, and glow effects are HTML layered on top. The foyer will look exactly like the old screenshot once deployed to main.

### STATUS AFTER THIS SESSION
- Patched `index.html` saved and given to El — **must be pushed to `main` branch**
- `typeof enterVenusApproach` confirmed `'function'` — correct code IS on the live site

---

## NEXT SESSION — START HERE

### Step 0: BEFORE ANYTHING ELSE
Open GitHub Desktop. Look at top center — it must say **main**.
If it doesn't: click it, select **main**, then drag in the patched index.html, commit, push.

Then: hard refresh the live site with **Cmd + Shift + R**.

### Step 1: Test end-to-end (10 min)
Open `https://ellisliu7.github.io/ancient-temenos-assets/` fresh (no params).

Check in order:
- [ ] Main page: scroll down with trackpad → should zoom in and enter foyer
- [ ] Foyer: wait 2 seconds → council "Welcome home" input should appear
- [ ] Open Cmd+Option+J — should see ZERO red errors (no foyerHover crashes)
- [ ] Type something in council, press Enter → debate should run
- [ ] Council recommends Venus → after 5 seconds should enter Venus corridor (not black screen)
- [ ] In Venus corridor: scroll up → video should advance
- [ ] Click Venus altar directly → same corridor should open

If all pass: Venus is live. 🎉

### Step 2: If council test passes, delete ghost Venus code (30 min)
These functions exist in the file but are dead — referenced HTML elements were deleted. Safe to remove:
- `sendVenus` / `renderVCard` / `addUserMsg` — ~150 lines (reference `#qi`, `#vthread`, `#vClosing` which don't exist)
- `initVenusSculpture` / `_buildVenusSculpture` — ~100 lines (Venus has no sculpture)
- `enterVenusAltar` function body (keep declaration, just confirmed empty)
- `vaToggleGate` / `vaSubmitWaitlist` — dead waitlist code

Use `grep -n` to locate exact line ranges before deleting. Verify with `assert content.count(old) == 1` before each replacement.

### Step 3: Verify Ganymede still works (5 min)
Dev URL: `https://ellisliu7.github.io/ancient-temenos-assets/?skip=ganymede&key=1`

### Step 4: Write updated CURRENT_STATE.md and commit

---

## KNOWN DEAD CODE (do not touch yet, clean next session)
- Ghost Venus oracle: `sendVenus` / `renderVCard` / `addUserMsg` (~150 lines)
- `initVenusSculpture` / `_buildVenusSculpture` (~100 lines)
- `vaToggleGate` / `vaSubmitWaitlist`
- `CDN2`, `FRAME_PNG`, `vRoomActive`
- `#poolScreen` CSS rule — targets nothing

## DEAD VIDEOS TO DELETE FROM REPO (separate task, not index.html)
`Foyer_hall.mp4, Foyer.mp4, Ganymede Cave_1.mp4, Ganymede Cave.mp4, Ganymede_Cave_5S.mp4, Ganymede_cave_animated.mp4, Ganymede_Dolly_draft.mp4, Ganymede_WIP.mp4, Ganymede_WIP.mov, Venus Wishing Well.mp4, Venus_Altar_Video.mp4, venus_altar.mp4, Venus_timelapse.mp4, ascii-art.mp4, Portal Frame.png, Venus_Frame.png`

## VIDEOS TO KEEP
`Main_Page.mp4, Foyer_Current.mp4, Ganymede_Dolly_final.mp4, Venus.mp4, Venus Wishing Well_1.mp4, Sigil.mp4`

## DEV TEST URLS
- Venus: `https://ellisliu7.github.io/ancient-temenos-assets/?skip=venus&key=1`
- Ganymede: `https://ellisliu7.github.io/ancient-temenos-assets/?skip=ganymede&key=1`

---

## Session log — Jun 16 — CODE AUDIT + CLEANUP

SHIPPED:
- Threshold video: jsDelivr @latest → raw.githubusercontent.com/main (faster load)
- ORACLE_MODEL const added — all 11 hardcoded model strings replaced
- Orphaned vaInit block deleted (~10,682 chars): vaInitRoom, vaInitParallax,
  vaInitParticles, vaInitSculpture, _buildVaSculpture, enterVenusOracle_legacy
- Stale ?skip=entry dev branch removed

DEAD CODE REMAINING (next cleanup session):
- Ghost Venus oracle: sendVenus / renderVCard / addUserMsg (~150 lines)
  References #qi, #vthread, #vClosing — none exist in HTML. Cannot run.
- initVenusSculpture / _buildVenusSculpture (~100 lines) — Venus has no
  sculpture (she's in the video). Never called.
- CDN2, FRAME_PNG, vRoomActive, enterVenusAltar, vaToggleGate, vaSubmitWaitlist
- #poolScreen CSS rule — targets nothing

---

## Session log — Jun 16 — VENUS SCROLL-SCRUB APPROACH ENGINE

SHIPPED: Venus approach corridor — identical grammar to Ganymede.
- Foyer → flash → venusApproach screen
- Venus.mp4 scrubs forward on scroll (now 3600 divisor after fix)
- Hint: "She is near. Draw closer." + breathing chevron
- At end of video: loops, oracle glass rises 800ms later over the video
- One space, one arrival. No second room.

DELETED: venusAltarLayer HTML + CSS, venusBreath, venusOracle screen,
Venus_Altar.mp4, Venus_Altar_Video.mp4, two-screen dissolve, vRoomScroll

---

## Session log — Jun 16 — ORACLE RESTORED + DEV SHORTCUTS + DATE FIX

- Anthropic deprecated claude-sonnet-4-20250514 → fixed in proxy to claude-sonnet-4-6
- Added $10 API credits
- Today's date injected into GSYS at runtime
- ?key=1 grants Sigil Key for dev testing
- ?skip=ganymede drops into Ganymede as keyholder
