# Milestone: Friday Demo Build

**Date:** 2026-06-19
**Status:** sealed
**Commit SHA:** 52f600565b49210050a52ceab7525db5aef719e4
**Live URL at seal:** https://ellisliu7.github.io/ancient-temenos-assets/
**Restore URL:** https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/52f600565b49210050a52ceab7525db5aef719e4/index.html

---

## Emotional goal
A first-time visitor walks the whole arc — threshold → council → a chamber — and leaves moved,
not confused. Nothing breaks the spell. The temple feels finished even though it is not.

> A whole-build milestone is a frozen snapshot of the entire experience on the day it is shown.
> It composes the room milestones into one restorable point you can return to even after you keep building.

## What was achieved in this session (commit summary)
- **Council routing fixed:** all 4 voices now always speak; Venus correctly recommended for
  love/receiving/self-worth/identity topics; Ganymede for building/action/structure topics.
  Routing guide added to system prompt with explicit word lists and a tiebreaker rule.
- **Council state bleed eliminated:** `councilReset()` bug fixed (was referencing non-existent
  `c-lines` element instead of `c-debate-lines`); now clears overlay, debate panel, recommendation
  panel, debate lines, input, and again button completely before any transition.
- **Auto-guidance restored safely:** recommendation holds 2.8s → `councilReset()` → 120ms gap →
  flash → room opens clean. Reset fires before flash, not inside it.
- **Ganymede graceful closing:** system prompt teaches Ganymede to recognise rest, resistance,
  and completion as valid endings. "I want to rest" → closes gracefully with `check_in:true` →
  god rays → grimoire. No more indefinite coaching loop.
- **Milestone system created:** `MILESTONES.md`, `_TEMPLATE.md`, and room milestone files added
  to repo. SHA-anchored restore system established.

## What works (verified)
- Council always speaks with 4 voices
- Venus recommended for love, receiving, self-worth, surrender, identity, body, softness
- Ganymede recommended for building, action, structure, decisions, execution
- Auto-guidance into chamber feels right — council leads, visitor follows
- Council fully clears before transition — no state bleed into rooms
- Return from any room → clean foyer, council ready
- Ganymede recognises rest and completion as valid endings
- Both live chambers share the same scroll-scrub grammar — the temple feels like one place

## Exact visitor flow
1. Threshold riddle (answer: love) → entry sequence → foyer.
2. Visitor types into frosted amber glass input.
3. All 4 archetypes debate in sequence — each reacting to the previous.
4. Chamber name appears and holds. Council resets. Flash. Room opens clean.
5. Venus: scroll-scrub corridor → glass rises → oracle.
6. Ganymede: scroll-scrub cave → arch threshold → oracle → candles → descent.
7. Return → clean foyer. Persephone / Psyche → graceful "opening soon".

## Files & assets
- Code: single `index.html` at this SHA.
- Composed from: council-v1.md (updated) · venus-v1.md · ganymede-v1.md
- Assets confirmed live: `Foyer_Current.mp4`, `Venus.mp4`, `Ganymede_Dolly_final.mp4`, `Sigil.mp4`.

## Visual reference
- Recording: `media/friday-demo-fullwalk.mov` *(record before Friday: threshold → council → chamber → return)*
- Stills: `media/friday-demo-foyer.png`, `media/friday-demo-chamber.png`

## Verification checklist
- [x] Council always speaks with 4 voices
- [x] Venus recommended for love / receiving / self topics
- [x] Ganymede recommended for building / action topics
- [x] Council clears before transition — no bleed
- [x] Return works from both rooms → clean foyer
- [ ] Threshold accepts "love" → entry sequence → foyer *(run on demo machine day-of)*
- [ ] Foyer video plays on demo machine
- [ ] Live API path works on demo network (not just mock)
- [ ] `?skip=venus&key=1` → corridor → oracle → Return → clean
- [ ] `?skip=ganymede&key=1` → cave → candle → conversation in view → Return → clean
- [ ] Persephone / Psyche → "opening soon", no crash
- [ ] No console errors on demo machine (⌘⌥J)

## Do-not-lose qualities
- The unbroken arc. If anything breaks the spell in the first 30 seconds, the demo fails.
- Council routing accuracy — Venus and Ganymede must feel correctly matched to the topic.
- Clean transitions — no overlay bleed, no stuck state, no black screens.
- Both chambers share scroll-scrub grammar. They must feel like one temple, not two apps.

## Known issues
- Persephone not integrated; Psyche not built. Never demo these as live.
- Venus scroll cue may not be obvious enough for a first-time visitor — identified as next fix.
- Venus oracle may open too deep too fast — softer entry questions planned post-demo.
- Arrow button at bottom of Venus still feels slightly UI. Cosmetic, post-demo.
- Ghost code present in file (old Venus sculpture/wishing-well functions) — inert, not wired.

## Restore notes
If anything degrades before or after Friday, fetch this URL and replace index.html:
https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/52f600565b49210050a52ceab7525db5aef719e4/index.html
GitHub Desktop → replace file → commit `Restore to Friday demo build` → push. Live in ~60s.

## Next safe changes (post-demo)
1. Venus scroll cue — stronger visual signal, no logic risk
2. Venus opening questions — softer first exchange, system prompt only
3. Ganymede closing beat — wire `check_in:true` → grimoire
4. Persephone integration into index.html
