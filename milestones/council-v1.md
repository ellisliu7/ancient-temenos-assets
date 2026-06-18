# Milestone: Council V1

**Date:** 2026-06-18
**Status:** sealed
**Commit SHA:** 3014ed632ec04aa67c0e6812f63503a2fd7928a4
**Live URL at seal:** https://ellisliu7.github.io/ancient-temenos-assets/
**Restore URL:** https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/3014ed632ec04aa67c0e6812f63503a2fd7928a4/index.html

---

## Emotional goal
Welcome home. The visitor speaks once and feels *seen* — not by an answer, but by watching four
parts of themselves disagree about them in real time. The disagreement is the recognition.

## What works
- Four archetypes react to each other in sequence, not four parallel cards. It feels alive.
- The frosted amber glass input sits on the foyer without reading as a chat box.
- The debate ends with a soft chamber suggestion and "which is calling you?" — the visitor chooses.
- Returning from a chamber resets the council cleanly (`councilReset()`), so the foyer is fresh.

## Exact visitor flow
1. Foyer loads with `Foyer_Current.mp4` playing behind the four altars.
2. Visitor types into the frosted amber glass input.
3. Council debate streams: max 6 lines, each ≤ 10 words, `Speaker: [line]`, reacting to each other.
4. Ends with `RECOMMENDS: [name]` + "which is calling you?"
5. Visitor chooses → routes to Venus or Ganymede if live; "opening soon" for others.
6. On Return, `goReturn()` calls `councilReset()` → foyer clean, no lingering debate overlay.

## Files & assets
- Code: `sendCouncil()` + council system prompt (4 archetypes, `RECOMMENDS:` format, max_tokens 200);
  `LIVE_CHAMBERS = {venus:true, persephone:false, psyche:false, ganymede:true}`;
  `goReturn()` → `councilReset()`.
- Assets: `Foyer_Current.mp4` (replaced `Foyer.mp4`, which 404'd).

## Visual reference
- Recording: `media/council-v1-debate.mov`  *(type → debate streams → recommend → choose → enter)*
- Stills: `media/council-v1-glass.png`

## Verification checklist
- [ ] `?mock=1` → council debate fires without the API
- [ ] Foyer video plays (was black before the `Foyer_Current.mp4` fix)
- [ ] Debate reads as a reaction between archetypes, not four separate answers
- [ ] Enter Ganymede or Venus, hit Return → foyer clean, no debate overlay stuck

## Do-not-lose qualities
- **Debate, not parallel responses.** Four simultaneous cards is a dashboard. Never revert to it.
- Each line short and reactive. The archetypes argue *with each other*.
- The visitor chooses the chamber. The system suggests; it never forces.
- `councilReset()` on every return. A sticky council on the foyer is the regression to watch for.

## Known issues
- Persephone and Psyche route to "opening soon" — intentional at V1 (chambers not built).
- Council is free-tier; chamber oracles are the membership product. No gate logic here yet.

## Restore notes
Fetch the Restore URL above. Restore `sendCouncil()`, the council system prompt, the
`LIVE_CHAMBERS` map, and the `goReturn()` → `councilReset()` wiring. Confirm `Foyer_Current.mp4`
is still the foyer source after restore.

## Next safe changes
- Flip `LIVE_CHAMBERS.persephone` to `true` only after Persephone is integrated into index.html.
- Altar hover polish (glow only, drop the poem box) — visual only, does not touch debate logic.
