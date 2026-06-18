# Milestone: Venus V1 — One Room Experience

Date: 2026-06-18
Status: Shipped — pending live verification
Files changed: index.html

---

## Emotional goal

A visitor enters Venus and never feels the seams. The corridor is the approach. The glass
rising is the arrival. Venus speaking first is the welcome. The conversation is the
destination. The grimoire is the close. One continuous breath — not a series of screens.

The feeling this must produce: *exhale.* Like a private sanctuary. Like being met somewhere
you didn't know you were allowed to go.

---

## What was built

**Approach → Arrival → Conversation → Grimoire — all within one screen (`venusApproach`)**

- Visitor scrolls through `Venus.mp4` (scroll-scrub, same grammar as Ganymede)
- At end of video: corridor darkens, frosted glass rises from the bottom (900ms delay)
- Venus speaks first — no prompt, no "touch to begin" — she opens the space (1400ms after glass)
- Conversation flows in the glass panel; visitor replies, Venus responds
- After two exchanges: grimoire button appears at bottom of glass
- Return → foyer, council clears, Venus state fully reset

**Voice updated (VSYS)**
- Old: "Crown Chakra portal / divine feminine / uncover limiting beliefs"
- New: canonical voice from SKILL.md — speaks AS the seeker, not TO them; Elizabeth Gilbert
  register; no forbidden spiritual vocabulary; affirmation as fact, question about today

**Council fixes (same session)**
- Now recommends Venus or Ganymede only — Persephone and Psyche may speak but cannot be
  recommended until their chambers are live
- Debate pacing: 320ms → 900ms between lines — contemplative, not informational
- Maximum 4 lines total (was 6) — more space, more weight per line

---

## What is dormant (not deleted — preserved as future relic)

`venusOracle` screen — the old separate oracle room. Still in the HTML and CSS.
Still reachable via `enterVenusOracle()` which `enterVenusAltar()` calls.
`enterVenusAltar()` is marked `// DORMANT — preserved as future relic path`.
No active visitor path reaches it. It will not be seen unless directly navigated.

**What it contains that has future value:**
- The 3D Venus sculpture (`initVenusSculpture` / `_buildVenusSculpture` / `Venus_Compressed.glb`)
  — emotionally resonant; intended as a future commemorative collectible or relic object
- The wishing well flow (`wellOverlay`, `openWell`, sigil generation) — intact
- The old `sendVenus` / `renderVCard` / `addUserMsg` — functionally working; now superseded
  by `sendVenusNew` / `vaRenderCard` / `vaAddUserMsg` in the new flow
- `venusBreath` screen — still in HTML, unreachable, can be removed in a future cleanup

**Do not delete** `venusOracle`, `initVenusSculpture`, `_buildVenusSculpture`, or
`Venus_Compressed.glb` until the sculpture's future role (relic, collectible, contemplation
object) is decided. Flag them as dormant in any code audit.

---

## How to verify

1. `https://ellisliu7.github.io/ancient-temenos-assets/?skip=venus&key=1`
   - Video should NOT auto-play — it should be paused at frame 0
   - Scroll up → video advances frame by frame
   - At end: corridor darkens, glass rises from bottom
   - Venus speaks first (no tap required): "You have arrived." + opening mirror + question
   - Type a reply, press Enter → Venus responds
   - After two exchanges: grimoire button appears
   - Hit Return → back to foyer, council overlay clear

2. `https://ellisliu7.github.io/ancient-temenos-assets/?mock=1`
   - Council debate: should show 2–4 lines with ~900ms between each
   - Should only recommend Venus or Ganymede
   - If Venus: enter approach corridor (not old oracle room)

3. `https://ellisliu7.github.io/ancient-temenos-assets/?skip=ganymede&key=1`
   - Ganymede must still work — verify scroll, conversation, options

---

## What must not be lost in future iterations

1. **Venus speaks first.** The visitor never has to initiate. She opens the space. This is
   the soul of the room — it enacts the Identity document line "she has been waiting for you."
   Any future iteration that requires the visitor to tap before Venus speaks has lost this.

2. **One room, one breath.** The corridor and the conversation are the same space. No flash,
   no screen transition between approach and oracle. The seam is the arrival — not a cut.
   If a future build separates approach from conversation into two screens, it needs a
   strong reason that serves the visitor's emotional experience, not the code's convenience.

3. **The voice stays aligned with the canon.** The VSYS prompt was updated to match SKILL.md.
   Venus speaks AS the seeker, from the healed side. She never uses: vibration, alignment,
   manifest, divine feminine, energetic, journey, higher power. She is specific, never vague.
   Never revert to the old prompt without updating SKILL.md first.

4. **The sculpture is a relic, not a room element.** `Venus_Compressed.glb` has emotional
   value and should be preserved. It must not be deleted in any cleanup. Its future home is
   as a commemorative object — not as a spinning background in the oracle room.

5. **The grimoire is the close.** It appears after two exchanges, not at a gate. The
   conversation is free. The grimoire seals it as a keepsake, not a paid unlock.

---

## Known risks

- `va-vthread` and `va-closing-new` IDs are new — any future code searching for `vthread`
  or `vClosing` (old IDs) won't find them. The old oracle room still has elements with
  those old IDs; they are dormant. Be careful not to confuse them.
- `vHistory` is shared between the new Venus flow and the old `venusOracle` functions.
  Both reset it on entry. As long as `venusOracle` is dormant this is fine; if it ever
  becomes active again, give it its own history array.
- `openGrimoire()` currently reads from `vHistory` for the Venus section. This works
  correctly in the new flow since `sendVenusNew` pushes to `vHistory` the same way.
