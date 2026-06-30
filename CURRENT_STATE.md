# Ancient Temenos — Current State
**Last updated:** 30 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Session log — 30 June 2026 (Ganymede ending: emotional pacing + the Chalice as a kept gift)

### The fundamental shift

This sprint retired the Sacred Contract entirely and rebuilt the close of the Ganymede chamber as a single continuous gesture: conversation → two quiet closing lines → automatic transition → discovery → a ritual of keeping. No form, no decision point before the Chalice, no download.

**What was there before:** After Ganymede's final reflection, a multi-stage ceremony fired — gold flash, artificial god-ray spike to `1.5` intensity, black screen, then a Sacred Contract form (two textareas: "what are you building," "what's next") the visitor had to fill in and submit before the Chalice would open. Once inside the Chalice, "KEEP THE CHALICE" triggered a PNG download of a generated cave-frame-plus-inscription composite.

**What is there now:** Ganymede's last reflection stays on screen, untouched. Two short lines append directly beneath it, in his own voice, with no restatement of what was already said: *"Let it rest there."* then *"Something has been left for you."* A long held silence follows. The Chalice opens automatically — no button, no decision. Inside, the inscription is found by the cursor rather than revealed on a timer (the gold-reveal mechanic from the previous sprint). Clicking "KEEP THE CHALICE" does not download anything: the gold settles permanently across the whole inscription, the CTA line itself transforms into a closing line — *"THE CHALICE IS YOURS"* — carved in the same hand as everything else, and the room pulses once with warmth. A Return control, visually identical to the temple's global nav, sits top-left and takes the visitor home to the Foyer.

**This sprint was almost entirely subtractive.** The single largest code change was deletion — the Sacred Contract (`showSacredContract`, `submitSacredContract`, the ceremonial flash/black-screen choreography inside the old `ganyRitual`) is gone. What replaced it is smaller than what it replaced.

---

### Decisions locked in this sprint — do not revisit without strong reason

**The conversation is the gift. The Chalice is its residue.** Ganymede already extracts what he needs (the tikkun) through natural conversation. Asking the visitor to fill in a form afterward was redundant with information the oracle already had, and it broke the emotional state the conversation had built. This will not be revisited — if a future sprint wants to capture more structured data from the visitor, it needs a different mechanism than a form between the conversation and its consequence.

**Discovery, not reveal.** The inscription should never announce its own arrival. There is no scene change between the end of the conversation and the Chalice — `Chalice1.mp4` is the same cave the visitor has been sitting in. The visitor should not be able to point to the moment the gold appeared.

**Agency lives inside the chamber, not before it.** The transition from conversation to Chalice is automatic — the visitor makes no choice to enter. The one choice that exists is whether to click "KEEP THE CHALICE" once inside. Do not add a confirmation step before the Chalice opens.

**Keeping the Chalice is a ritual, not a download.** No file is generated. No browser download dialog. The relic is already persisted to `localStorage` (`temenos_relics.ganymede`) regardless of whether the visitor explicitly "keeps" it — the click's only job is to give that fact a felt, in-room consequence: the gold stops needing to be searched for, the CTA line becomes a different carved sentence, and the room breathes once.

**The closing lines are declarative, not first-person.** Earlier drafts of this ending used "I've left something for you" — rejected as too literal, as if Ganymede were handing over a physical object. The current lines (*"Let it rest there." / "Something has been left for you."*) are deliberately closer to something true being stated than something being announced.

**No arrows. Typographic weight instead.** The "next stone" suggestion Ganymede gives no longer carries a `→` prefix. It is rendered slightly larger, slightly warmer, with marginally more letter-spacing than the surrounding text — matching the way the temple already differentiates emphasis elsewhere (font and size shifts, never bold).

---

### Current implementation state

**What is working:**
- `ganyRitual()` rebuilt: no ceremony, no form. Two lines append via `gStreamAppend()` (a new sibling to `gStream()` that does not clear existing content) directly beneath Ganymede's last reflection. Full pacing: 2.6s silence → "Let it rest there." → 2.6s silence → "Something has been left for you." → 5.5s held silence → `openChaliceReveal()` fires automatically.
- Both the `check_in===true` path and the free-tier-limit path (`!gHasKey() && gExchangeCount >= G_FREE_LIMIT`) now route through `ganyRitual()` — the Chalice can no longer be reached without the closing sequence playing first, on either path.
- Personalised tikkun resolution is session-aware: if `gHistory` has content (an active conversation), the tikkun is always derived fresh from that conversation, never from a stale saved relic. Saved relics are only used for returning visitors with no active session.
- The arrow prefix on Ganymede's "next stone" suggestion is gone, replaced by a sentinel-marked paragraph (`G_WEIGHT_SENTINEL`) that `gStream`/`gStreamAppend` render with slightly larger size, warmer color, more letter-spacing — typographic emphasis instead of a glyph.
- `keepChalice()` no longer generates or downloads a PNG. On click: a brief soft opacity dip on the inscription canvas (~700ms), then the gold settles permanently across the full inscription (no more cursor-tracking), the CTA line transforms from "KEEP THE CHALICE" to "THE CHALICE IS YOURS" in the same Cinzel carving, the invisible hit zone (`#ch-floor-hit`) hides itself, and a single warmth pulse (`#ch-warmth`, a soft radial gradient low in frame) rises and fades over ~3.4s.
- `_chKept` state flag governs all of this: `false` for a fresh, undiscovered gift; `true` either immediately after the click, or on open if the visitor has a previously-kept relic in `localStorage` (returning visitors see the Chalice already settled — there's no gesture left to perform).
- `closeChaliceReveal()` now routes the visitor home: `flashTo(() => { ...hide overlay...; showScreen('foyer'); councilReset(); })` — one dark flash, then the Foyer, matching how every other chamber's return journey works. Previously it just closed the overlay and left the visitor sitting in the finished cave conversation.
- A new `#ch-return` control (top-left, identical Cinzel/letter-spacing/arrow-SVG to the temple's global `#returnBtn`) sits beside `#ch-close` and calls the same `closeChaliceReveal()`. The `#ch-brand` label moved down slightly (`top:2.9rem` from `1.6rem`) to make room without overlapping.
- A new `#ch-grimoire-link` control was added near `#ch-close` — the Sacred Contract was the only previous path to the Ganymede Grimoire, so this restores access to it as a small, quiet footnote rather than a CTA.
- The Chalice video (`Chalice1.mp4`) no longer loops. `loop` attribute removed; `env.onended` pauses on the final frame. The room comes to rest instead of restarting.
- The portal-entry wind chime is disabled (`SOUND_ENABLED = false`) — one-line flag, easy to revert. Note: this chime fires on foyer altar entry (Venus/Ganymede), not inside the Chalice specifically; there was no chime inside the ending sequence to begin with.

**What is in review — not final:**
- The full silence stretch between Ganymede's last reflection and the Chalice opening is roughly 16–18 seconds (2.6s + streaming time for two short lines + 2.6s + 5.5s). This is deliberately long but has not been tested against a risk of feeling like the page has frozen, especially for a first-time visitor who doesn't yet trust the temple's pacing. If it reads as broken rather than held, the 5.5s final beat is the first number to shorten.
- The `keepChalice()` 700ms dip-before-redraw timing is a first pass, not extensively tested against the warmth pulse's own rise time. Worth a few real playthroughs before considering it locked.
- "THE CHALICE IS YOURS" is one wording choice among several discussed (vs. "Kept."). Worth confirming it still feels right after living with it for a few sessions.

---

### Known technical debt from this sprint — worth remembering later

- **`stillnessGate()` is now dead code.** Nothing calls it — `ganyRitual()` opens the Chalice directly. Left in place (marked with a comment) rather than deleted, in case a future flow wants a bare silence-then-Chalice transition without dialogue. Safe to delete in a future cleanup pass if it's still unused.
- **The old ritual DOM elements (`#g-ritual`, `#g-ritual-words`, `#g-gold-bg`) are now orphaned.** Nothing triggers them anymore. They're inert at their default state (`opacity:0`, `pointer-events:none`) and cause no visible or functional issue, but they're dead weight in the file. Candidate for removal in a future cleanup-focused sprint.
- **`gSacredContractData` is kept as an empty-but-declared variable** (`{building:'', next:''}`) solely so the Grimoire's existing defensive checks (`if(gSacredContractData.building)...`) don't throw. The Grimoire gracefully omits that section now. Could be removed entirely along with those checks in a future pass, but isn't causing any problem as-is.
- **`bridgeToGanymede()` is defined twice in the file** (once near the Venus/foyer code, once near the Ganymede ending code). Both definitions are identical — harmless (the second simply overwrites the first at parse time) but pre-existing duplication, not introduced this sprint, not yet cleaned up.
- **`CH_BENEDICTION` constant is now unused** — it was only referenced by the deleted PNG-generation code in the old `keepChalice()`. Zero runtime cost left as-is; flagged in case a future sprint wants to reuse the canonical benediction text elsewhere (e.g., the Grimoire seal).
- **`#ch-return` and `#ch-close` currently call the exact same function** (`closeChaliceReveal()`) and go to the exact same place. This was a deliberate choice this sprint (two doors, one true exit — "I'm finished" vs. "dismiss this") rather than an oversight, but worth confirming with fresh eyes that it doesn't read as redundant rather than intentional.

---

### Open questions for next sprint (Ganymede-specific, lower priority)

1. Does the ~16–18 second silence before the Chalice opens hold up across multiple playthroughs, or does it need trimming?
2. Is "THE CHALICE IS YOURS" the right final inscription line, or does it want another pass?
3. Should the now-dead `#g-ritual` / `#g-ritual-words` / `#g-gold-bg` DOM and `stillnessGate()` be removed in a dedicated cleanup pass, or left as-is until they cause an actual problem?

These are minor and not blocking — Ganymede is considered feature-complete and emotionally resolved as of this sprint. Next sprint moves to Venus.

---

## Current live status

| Feature | Status | Notes |
|---|---|---|
| Threshold | LIVE | Answer: love |
| Foyer — council debate | LIVE | 4-archetype debate, API-powered |
| Foyer — greeting sequence | LIVE | "Welcome home." sequence |
| Venus chamber | LIVE | Full oracle, video corridor, artwork card — next sprint's focus |
| Venus — Sigil Key reveal | LIVE | Key screen, canvas PNG download |
| Venus — Grimoire | LIVE | Sealed to Venus chamber specifically |
| Ganymede chamber | LIVE | Full oracle, cave video, god rays |
| Ganymede — Chalice ending | LIVE | Sacred Contract removed; automatic quiet transition; gold-reveal discovery; ritual keep gesture (no download); Return nav added. Considered complete this sprint. |
| Persephone | PROTOTYPE ONLY | Standalone persephone-oracle.html; not in index.html |
| Psyche | NOT BUILT | — |
| Collective Memory | NOT BUILT | — |

---

## Asset reference

| Asset | File | Status |
|---|---|---|
| Ganymede ending environment | `Chalice1.mp4` | CANONICAL. No longer loops — plays once, settles on final frame via `env.onended`. |
| Previous Chalice asset | `Chalice.mp4` | RETIRED. No longer referenced in code. |
| Sigil Key | `Sigil.mp4` | LIVE — re-export candidate (baked background) |
| Portal chime | `portal-chime.mp3` | DISABLED this sprint (`SOUND_ENABLED = false`). Foyer altar-entry chime, not Chalice-specific. |

---

## Open technical issues (carried forward, unchanged unless noted)

| Issue | Priority | Notes |
|---|---|---|
| Council routes to `enterVenusAltar()` instead of `enterVenusApproach()` | HIGH | 2-line fix — verify current line numbers before next Venus sprint |
| `window.__test*` shortcuts ungated in production | HIGH | Security |
| `?key=1` and `?sigil=1` URL params grant access with no auth | HIGH | Security |
| Vercel proxy: client can supply `model`/`max_tokens`/system prompt | HIGH | Security |
| XSS vectors in `innerHTML` in oracle chat and Grimoire | MEDIUM | Security |
| `?mock=*` params active in production | MEDIUM | Security |
| Venus UX — key label reads `VEN` not `VENUS` | LOW | Cosmetic — candidate for next sprint |
| Venus UX — CTA auto-advances before user finishes reading | LOW | Timing — candidate for next sprint |
| Venus UX — oracle response position jump on render | LOW | Container height not reserved before streaming — candidate for next sprint |
| `stillnessGate()` dead code, orphaned `#g-ritual` DOM | LOW | See technical debt section above — not urgent |

---

## Next sprints — in order

1. **Venus refinement** — beginning now. Known issues: key label `VEN`→`VENUS`, CTA auto-advance timing, oracle response position jump. Ghost code in file: `sendVenus`/`renderVCard`/`addUserMsg`, `initVenusSculpture`/`_buildVenusSculpture` — dead, not wired to any HTML, candidate for removal during this sprint.
2. **Security hardening** — gate `window.__test*`, clamp model/max_tokens server-side, address XSS, disable `?mock=*` in production
3. **Persephone integration** into `index.html` (waiting on visual assets)
4. **Collective Memory** — POST endpoint, fragment input in Grimoire, accumulate invisibly
5. **Ganymede cleanup pass (low priority)** — remove dead `stillnessGate()` and orphaned ritual DOM once confirmed safe

---

## Architecture reference

- **File:** single `index.html`, ~4857 lines, all CSS/JS inline
- **Repo:** `ellisliu7/ancient-temenos-assets` (public, GitHub Pages)
- **Domain:** `ancienttemenos.art`
- **Oracle proxy:** `ancient-temenos-oracle.vercel.app/api/oracle` (private Vercel repo)
- **Formspree:** `xkoakgkk` (collector enquiry)
- **Mock routes:** `?mock=venus`, `?mock=ganymede`, `?mock=ganychalice`, `?mock=key`, `?mock=ganygrimoire`, `?dev=1`, `?sigil=1`
- **Typography:** Cinzel (structure, labels) · Cormorant Garamond (body, oracle, poetry) · Almendra (character names)
- **Design docs:** `DESIGN_PRINCIPLES.md`, `DESIGN_LANGUAGE.md` — in repo root
