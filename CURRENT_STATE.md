# Ancient Temenos — Current State
**Date:** 28 June 2026 (Experience Polish Sprint II)
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Session log

### 28 June 2026 — Experience polish sprint II

**Status: shipped. 5 fixes applied.**

---

#### Fix 1 — Foyer: 3-beat temple voice + subtitle design

**Design decision:** "What's on your mind today?" is now a distinct typographic element — centered beneath "Welcome home.", Cormorant Garamond italic, `clamp(13px,1.15vw,16px)`, `rgba(238,220,168,0.62)`. Not a label. A continuation of the same voice. The input field input follows after it, so the eye moves: greeting → question → invitation to speak.

**HTML changes:**
- Added `id="fc-welcome"` to "Welcome home." paragraph with `opacity:0; transition:opacity 2.2s ease`
- Added `id="fc-subtitle"` paragraph with "What's on your mind today?" — `opacity:0; transition:opacity 2s ease`
- Wrapped input row in `id="fc-inp-block"` with `opacity:0; transition:opacity 1.6s ease`
- Input placeholder changed to "You are safe to speak here…" (subtitle now carries the question)

**Timing sequence (from council container fade-in):**
- +600ms: "Welcome home." arrives
- +2200ms: "What's on your mind today?" arrives
- +3600ms: Input field appears, cursor auto-focuses

**Total from screen entry to input ready:** ~6400ms. The temple speaks first. The visitor arrives before they are invited to speak.

---

#### Fix 2 (from sprint I) — Oracle renders from beginning
*(Already shipped in previous session — verify live)*

---

#### Fix 3 — Venus Grimoire showing Ganymede artwork

**Root cause:** `openGrimoire()` inferred chamber from `gHistory` vs `vHistory` content. If the visitor had visited Ganymede at any point in the same session, `gc` (Ganymede content) was non-empty, overriding `vc` (Venus content) and forcing mode = 'ganymede'.

**Fix:** `openGrimoire(forceMode)` now accepts an explicit chamber argument.
- Venus seal buttons pass `'venus'`
- Ganymede seal button passes `'ganymede'`
- Mode detection: `const mode = forceMode || (gc ? 'ganymede' : vc ? 'venus' : 'council')`
- Dev mock calls left as-is (no chamber context available)

---

#### Fix 4 — Em dashes stripped from Ganymede output

**Root cause:** `stripDash()` existed globally but was never applied to Ganymede's text before passing to `gStream()`. The system prompt said "no dashes" but the model sometimes produces them anyway.

**Fix:** Both mock and live Ganymede response paths now run `stripDash()` on each field (reflection, structure, step, question) before rendering. The existing `stripDash()` converts `—` to `, ` and cleans up doubles.

---

#### Fix 5 — Ganymede ending: stillness before the threshold

**Design recommendation chosen:** The Witness Ending.

After the oracle finishes its final response and the exchange limit is reached:
- Input locks immediately (existing behaviour)
- 4 seconds of complete silence — nothing appears
- "The cave remembers." fades in at the bottom of the screen (opacity 0→1, 2.2s ease)
- Holds for 3.2 seconds
- Fades out (1.8s)
- 2 seconds later: gate emerges from darkness

**New element:** `#g-stillness` — positioned `fixed; bottom:3.5rem; left:50%; transform:translateX(-50%)` — sits above the cave but below the gate. Cinzel italic, `rgba(196,158,72,0.52)`.

**New function:** `stillnessGate()` — replaces both `setTimeout(ganyGate, 2200)` calls.

**Total time from oracle completion to gate:** ~11 seconds. The visitor has time to finish reading, to sit in what was said, before anything asks them to move.

---

#### Held items

- Issue 2 (Venus Key direction): El noted the Venus artwork overlay felt "surprisingly elegant" — holding this as intentional. No further changes to key reveal screen this sprint.
- Dev mock calls to `openGrimoire()` still use auto-detection (no forced mode)
- `ganyRitual()` (Sacred Contract) still fires at `setTimeout(ganyRitual, 2000)` — not affected by stillnessGate
- File: ~4289 lines, single-file architecture intact

