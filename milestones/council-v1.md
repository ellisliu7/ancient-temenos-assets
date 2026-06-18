# Milestone: Council V1

**Date:** 2026-06-19
**Status:** sealed
**Commit SHA:** 52f600565b49210050a52ceab7525db5aef719e4
**Live URL at seal:** https://ellisliu7.github.io/ancient-temenos-assets/
**Restore URL:** https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/52f600565b49210050a52ceab7525db5aef719e4/index.html

---

## Emotional goal
Welcome home. The visitor speaks once and feels *seen* — not by an answer, but by watching four
parts of themselves disagree about them in real time. The disagreement is the recognition.
The council then guides them gently into the right room. They follow, not because they were
pushed, but because something in the debate already told them where to go.

## What works
- All four voices always speak — Venus, Persephone, Psyche, Ganymede — one line each, reacting
  to the previous speaker. Never two voices, never parallel cards.
- Routing is accurate: Venus for love, receiving, identity, softness, self-worth, body, grief.
  Ganymede for building, action, structure, decisions, projects, next steps.
  Tiebreaker baked into system prompt: FEEL something → Venus. DO something → Ganymede.
- Recommendation lands and holds for 2.8s. Then `councilReset()` fires — clears everything —
  then 120ms breath, then flash. Room opens into clean silence. No bleed.
- `councilReset()` now correctly clears: overlay, debate panel, recommendation panel,
  enter button, debate lines (`c-debate-lines`), again button, input field.
- Return from any room → clean foyer, council ready for a fresh question.

## Exact visitor flow
1. Foyer loads with `Foyer_Current.mp4` playing behind the four altars.
2. Visitor types into the frosted amber glass input.
3. All four archetypes speak in sequence — each reacting to the previous. 8 words max per line.
4. Chamber name appears. Holds for 2.8s.
5. `councilReset()` clears all council DOM state.
6. Flash transition → room opens clean.
7. Return → `councilReset()` → foyer ready.

## Files & assets
- Code: `sendCouncil()` + council system prompt with routing guide + 4-voice format instruction;
  `councilReset()` with correct `c-debate-lines` ID; auto-route with reset-before-flash timing.
  `LIVE_CHAMBERS = {venus:true, persephone:false, psyche:false, ganymede:true}`.
- Assets: `Foyer_Current.mp4`.

## Visual reference
- Recording: `media/council-v1-debate.mov`
- Stills: `media/council-v1-glass.png`

## Verification checklist
- [x] All 4 voices speak on every input
- [x] Venus recommended for "love", "return to self", receiving topics
- [x] Ganymede recommended for building, action, project topics
- [x] Recommendation holds → council clears → room opens clean, no overlay bleed
- [x] Return from Venus → clean foyer
- [x] Return from Ganymede → clean foyer
- [x] `?mock=1` fires without API

## Do-not-lose qualities
- **All four voices, every time.** If the model ever gives 2 lines, the system prompt regressed.
- **Reset before flash, not inside it.** The 120ms gap between reset and flash is what prevents
  bleed. Never collapse these into one call.
- **Routing accuracy.** Venus for feeling. Ganymede for doing. The routing guide in the system
  prompt is the mechanism — do not shorten it.
- **Auto-guidance, not a button.** The visitor follows the council. They do not click to confirm.

## Known issues
- Persephone and Psyche route to "opening soon" — intentional, chambers not yet integrated.
- Council is free-tier; chamber oracles require membership. No gate logic here yet.
- Mock mode still hardcodes Venus/Ganymede split — fine for testing.

## Restore notes
Fetch the Restore URL above. Key things to restore: `sendCouncil()` system prompt (routing guide
must be present), `councilReset()` (must reference `c-debate-lines`, must clear recommendation
panel and enter button), auto-route block (reset fires before flash with 120ms gap after).

## Next safe changes
- Altar hover polish — visual only, no council logic touched.
- Flip `LIVE_CHAMBERS.persephone` to `true` only after Persephone is integrated into index.html.
