## Session log — Jun 16 — CODE AUDIT + CLEANUP

SHIPPED:
- Threshold video: jsDelivr @latest → raw.githubusercontent.com/main (faster load)
- ORACLE_MODEL const added — all 11 hardcoded model strings replaced
- Orphaned vaInit block deleted (~10,682 chars): vaInitRoom, vaInitParallax,
  vaInitParticles, vaInitSculpture, _buildVaSculpture, enterVenusOracle_legacy
- Stale ?skip=entry dev branch removed

LIVE BUG — FIX FIRST NEXT SESSION:
Council routes Venus → enterVenusAltar() which is an empty shell.
Venus is unreachable from the foyer. Fix: 2 lines.
enterVenusAltar → enterVenusApproach (lines ~3034 and ~3181)

DEAD CODE REMAINING (next cleanup session):
- Ghost Venus oracle: sendVenus / renderVCard / addUserMsg (~150 lines)
  References #qi, #vthread, #vClosing — none exist in HTML. Cannot run.
- initVenusSculpture / _buildVenusSculpture (~100 lines) — Venus has no
  sculpture (she's in the video). Never called.
- CDN2, FRAME_PNG, vRoomActive, enterVenusAltar, vaToggleGate, vaSubmitWaitlist
- #poolScreen CSS rule — targets nothing

DEAD VIDEOS TO DELETE FROM REPO:
Foyer_hall.mp4, Foyer.mp4, Ganymede Cave_1.mp4, Ganymede Cave.mp4,
Ganymede_Cave_5S.mp4, Ganymede_cave_animated.mp4, Ganymede_Dolly_draft.mp4,
Ganymede_WIP.mp4, Ganymede_WIP.mov, Venus Wishing Well.mp4,
Venus_Altar_Video.mp4, venus_altar.mp4, Venus_timelapse.mp4,
ascii-art.mp4, Portal Frame.png, Venus_Frame.png, ganymede_cave (JPEG)

VIDEOS TO KEEP:
Main_Page.mp4, Foyer_Current.mp4, Ganymede_Dolly_final.mp4,
Venus.mp4, Venus Wishing Well_1.mp4, Sigil.mp4

DEV TEST URLS:
- Venus: https://ellisliu7.github.io/ancient-temenos-assets/?skip=venus&key=1
- Ganymede: https://ellisliu7.github.io/ancient-temenos-assets/?skip=ganymede&key=1

NEXT SESSION — in order:
1. Fix council routing bug (2 lines)
2. Verify Venus oracle end-to-end: foyer → Venus → type → response → grimoire
3. Delete ghost oracle + sculpture loader if Venus confirmed working
4. Delete dead videos from repo

Start prompt:
"Read CURRENT_STATE.md. Fetch live index.html. Fix the council→Venus routing
bug first — enterVenusAltar → enterVenusApproach. Then verify Venus end-to-end."

---

## Session log — Jun 16 — VENUS SCROLL-SCRUB APPROACH ENGINE

SHIPPED: Venus approach corridor — identical grammar to Ganymede.
- Foyer → flash → venusApproach screen
- Venus.mp4 scrubs forward on scroll (7200 divisor = half speed, ceremonial)
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
