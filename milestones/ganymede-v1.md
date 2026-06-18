# Milestone: Ganymede V1

**Date:** 2026-06-18
**Status:** sealed
**Commit SHA:** ________
**Live URL at seal:** https://ellisliu7.github.io/ancient-temenos-assets/
**Restore URL:** https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/<SHA>/index.html

---

## Emotional goal
Grounded power. Descending into a cave where something ancient is being built. The visitor leaves
with one concrete first stone to place — devotion, not ambition.

## What works
- The reverse-scrubbed cave reads as going inward, against time. Eerie and earthy, not spooky.
- The candle options feel like choosing a path, not clicking a menu.
- The oracle holds both at once: the soul correction (tikkun) and the next real action.
- After choosing a candle, the conversation scrolls itself into view — no manual hunting.

## Exact visitor flow
1. Scroll-scrub cave approach (`Ganymede_Dolly_final.mp4`) → arch threshold.
2. Glass panel rises at arrival.
3. Oracle opens with one sharp question (exchanges 1–2, no options yet).
4. Deeper reflection arrives, then three candle options.
5. Choosing a candle fires `g-glass.scrollIntoView()` — panel stays in view, thinking dots appear.
6. Oracle goes deep on that path only. Return maps back to a clean foyer.

## Files & assets
- Code: Ganymede screen + oracle JSON flow (`stage / reflection / structure / step / options / question / check_in`);
  `.msg-user .bub` colour `rgba(238,220,168,0.95)` (legibility fix); candle-choice `scrollIntoView()`.
- Assets: `Ganymede_Dolly_final.mp4` (confirmed live in repo).

## Visual reference
- Recording: `media/ganymede-v1-flow.mov`  *(cave approach → glass → ask → candles → descent)*
- Stills: `media/ganymede-v1-threshold.png`

## Verification checklist
- [ ] `?skip=ganymede&key=1` → cave approach scrubs on scroll
- [ ] Glass rises at the arch
- [ ] Type a reply → your message is clearly legible
- [ ] Choose a candle → conversation stays in view, thinking dots appear
- [ ] Return → foyer clean, council clear

## Do-not-lose qualities
- Cave plays in **reverse**. This is the signature. Never "fix" it to play forward.
- He builds, he does not comfort. No productivity-coach or hustle register.
- Both layers always present: inner truth AND outer action. One without the other is a regression.
- User message contrast ≥ 0.95 — legibility is non-negotiable.

## Known issues
- Closing beat (Option B: final line → grimoire) not yet built. `#gany-closing` is currently
  `display:none !important`. Acceptable at V1 — closing is the next planned beat.
- `check_in:true` does not yet trigger a closing; it is the hook for the future grimoire.

## Restore notes
Fetch the Restore URL above. Ganymede is self-contained: restore its screen block, oracle flow,
and the two CSS fixes (`.msg-user .bub` colour, candle `scrollIntoView`).

## Next safe changes
- Build the Ganymede closing beat (Option B) and wire `check_in:true` → closing → grimoire.
- Contemplation mode: touch the mural → high-res artwork opens. Additive; does not touch the approach.
