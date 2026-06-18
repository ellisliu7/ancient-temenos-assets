# Milestone: Friday Demo Build

**Date:** 2026-06-19
**Status:** sealed  → flip to `sealed` once frozen
**Commit SHA:** 3014ed632ec04aa67c0e6812f63503a2fd7928a4  ← freeze this the moment the demo build looks right; do not touch after
**Live URL at seal:** https://ellisliu7.github.io/ancient-temenos-assets/
**Restore URL:** https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/<SHA>/index.html

---

## Emotional goal
A first-time visitor walks the whole arc — threshold → council → a chamber — and leaves moved,
not confused. Nothing breaks the spell. The temple feels finished even though it is not.

> A whole-build milestone is a frozen snapshot of the *entire experience* on the day it is shown.
> It composes the room milestones into one restorable point you can return to even after you keep building.

## What works
- The full ritual runs end to end with no dead ends, no black screens, no stuck overlays.
- Both live chambers (Venus, Ganymede) share one grammar, so the temple feels coherent.
- Coming-soon chambers feel intentional, not unfinished.

## Exact visitor flow
1. Threshold riddle (answer: love) → entry sequence → foyer.
2. Foyer council debate (`Foyer_Current.mp4` behind it) → recommends a chamber.
3. Visitor enters Venus (corridor) or Ganymede (cave) → oracle.
4. Return → clean foyer. Persephone / Psyche → graceful "opening soon".

## Files & assets
- Code: the single `index.html` at this SHA, composing Council V1 + Venus V1 + Ganymede V1.
- Assets (confirmed live): `Main_Page.mp4`, `Foyer_Current.mp4`, `Ganymede_Dolly_final.mp4`,
  `Venus.mp4`, `Sigil.mp4`.
- Composed from: council-v1.md · venus-v1.md · ganymede-v1.md

## Visual reference
- Recording: `media/friday-demo-fullwalk.mov`  *(one unbroken take, threshold → chamber → return)*
- Stills: `media/friday-demo-foyer.png`, `media/friday-demo-chamber.png`

## Verification checklist — run the whole arc before the demo
- [ ] Threshold accepts "love" → entry sequence → foyer
- [ ] Foyer video plays
- [ ] `?mock=1` council fires (and live API path works on the demo network)
- [ ] `?skip=venus&key=1` → corridor → oracle → Return → clean
- [ ] `?skip=ganymede&key=1` → cave → legible reply → candle → conversation in view → Return → clean
- [ ] Persephone / Psyche altars → "opening soon", no crash
- [ ] No console errors on the demo machine (⌘⌥J, never F12)

## Do-not-lose qualities
- The unbroken arc. The demo's value is that nothing breaks the spell — protect that above polish.
- Every room's own do-not-lose list (see the three room milestones) holds here too.

## Known issues
- Persephone not integrated; Psyche not built. Stated up front, never demoed as live.
- Ganymede closing beat / grimoire not built — end the Ganymede demo before the closing.
- Ghost code present but inert.

## Restore notes
This is the safety net. If a later session degrades the experience before another showing,
fetch this SHA's index.html and you are back to a known-good demo in one step. Freeze the SHA
**before** continuing any post-demo work.

## Next safe changes
- Resume the roadmap (Ganymede closing, Persephone integration) only *after* this SHA is recorded.
- Treat this milestone as read-only history once sealed. New work → new build milestone.
