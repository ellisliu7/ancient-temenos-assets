# Milestone: Venus V1

**Date:** 2026-06-18
**Status:** sealed
**Commit SHA:** 3014ed632ec04aa67c0e6812f63503a2fd7928a4 ← copy from GitHub Desktop History for the commit that shipped the corridor
**Live URL at seal:** https://ellisliu7.github.io/ancient-temenos-assets/
**Restore URL:** https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/3014ed632ec04aa67c0e6812f63503a2fd7928a4/index.html

---

## Emotional goal
Exhale. The visitor stops performing and lets themselves be seen. Approaching her should feel
like walking into a private sanctuary after a bath — soft, protected, quietly powerful.

## What works
- The corridor uses the same grammar as Ganymede, so the whole temple feels like one place.
- Scroll = approach. The visitor moves toward her by choosing to, never by being pushed.
- The arrival beat (glass rising, then flash) gives weight before the oracle speaks.
- The hint whispers rather than instructs.

## Exact visitor flow
1. Visitor lands in `#venusApproach` — `Venus.mp4` held on its first frame.
2. Hint reads "She is near. Draw closer." with a slow breathing chevron.
3. Visitor scrolls forward → `Venus.mp4` scrubs forward frame by frame.
4. At the end of the video → a dark overlay rises over ~800ms.
5. At ~2600ms it flashes into `venusOracle`.
6. Return button maps `venusApproach → foyer`, council clears.

## Files & assets
- Code: `#venusApproach` screen + `enterVenusApproach()` (duration auto-detect + fallback);
  Return mapping `venusApproach → foyer`. All entry points wired to `enterVenusApproach()`:
  foyer altar click `foyerEnter('venus')`, council mock path, council API path, altar hover entry.
- Assets: `Venus.mp4` (confirmed live in repo).

## Visual reference
- Recording: `media/venus-v1-flow.mov`  *(record: scroll-in → glass rises → flash → oracle)*
- Stills: `media/venus-v1-arrival.png`

## Verification checklist
- [ ] `?skip=venus&key=1` drops into the corridor
- [ ] Scroll forward → `Venus.mp4` advances
- [ ] At end of video → dark glass rises → flash → oracle room
- [ ] Return → foyer is clean, council clear

## Do-not-lose qualities
- Scroll-scrub corridor, **not** a cut or autoplay. The approach must be chosen.
- The arrival sequence: overlay rise *then* flash. Do not collapse it into one jump.
- The hint whispers. Never an instruction box, never a button labelled "Enter".
- Same grammar as Ganymede. If Venus and Ganymede ever feel like different products, it broke.

## Known issues
- Ghost code still present in the file (the old sculpture / wishing-well Venus):
  `sendVenus`, `renderVCard`, `addUserMsg`, `initVenusSculpture`, `_buildVenusSculpture`,
  `vaToggleGate`, `vaSubmitWaitlist`. Dead, not wired to any HTML. Acceptable at V1; slated
  for deletion in a later, isolated pass.
- `Venus Wishing Well_1.mp4` is 404 in repo — irrelevant to this flow, the well is not in V1.

## Restore notes
Fetch the Restore URL above. To restore only Venus, extract the `#venusApproach` block and
`enterVenusApproach()` plus the four entry-point wirings, and splice into the current index.html.
Do not drag along the ghost-code functions listed above.

## Next safe changes
- Replace gate placeholder copy with copy that fits the temple's soul.
- Build the altar layer (artwork + timelapse) on the foyer altar — additive, does not touch the corridor.
