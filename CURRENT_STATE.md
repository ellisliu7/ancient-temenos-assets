# Ancient Temenos — Current State
**Date:** 24 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ellisliu7.github.io/ancient-temenos-assets/`

---

## Session log

### 24 June 2026 — Ganymede artifact: modal cross-chamber leakage fix

**Status: shipped. Awaiting browser verification.**

**Bug:** Three Venus-hardcoded strings in the enquiry modal were not being overwritten when the Ganymede artifact card's "Enquire Privately" was clicked:
1. Textarea placeholder — `"I would like to enquire about Venus…"` (HTML attribute, not JS-settable at open time)
2. `#geq-sent` default innerHTML — `"Thank you for your interest in Venus."` (stale content persisted if modal had been opened for Venus earlier in the same session)
3. Both were missed in the original Ganymede artifact sprint; the Formspree `_subject` and submit success copy were already dynamic.

**What changed (3 replacements):**

1. **Textarea placeholder HTML** — neutralised to `"I would like to enquire about this work…"` as a safe static fallback. `openArtworkEnquiry()` now overwrites it dynamically on every open.
2. **`#geq-sent` default HTML** — neutralised to `"Your enquiry has been received. El will be in touch within 48 hours."` (no chamber name) as a safe static fallback. `openArtworkEnquiry()` now writes the correct chamber copy before the modal opens, so `submitArtworkEnquiry()` only needs to call `display:block`.
3. **`openArtworkEnquiry(chamber)`** — three additions immediately after `_geqChamber` is set:
   - `var _cName` derived from `_geqChamber`
   - Textarea placeholder set to `"I would like to enquire about the [Chamber] work…"`
   - `#geq-sent` innerHTML reset to correct chamber copy

**Chamber-specific string coverage — now complete:**

| String | Venus | Ganymede | Mechanism |
|---|---|---|---|
| Textarea placeholder | `…the Venus work…` | `…the Ganymede work…` | Set in `openArtworkEnquiry()` |
| `#geq-sent` success copy | `…interest in Venus.` | `…interest in Ganymede.` | Reset in `openArtworkEnquiry()` + overwritten in `submitArtworkEnquiry()` |
| Formspree `_subject` | `Venus Chamber — Private Collection Enquiry` | `Ganymede Chamber — Private Collection Enquiry` | Dynamic in `submitArtworkEnquiry()` |
| Formspree `message` default | `…the Venus artwork.` | `…the Ganymede artwork.` | Dynamic in `submitArtworkEnquiry()` |

**What was NOT changed:** modal HTML structure, Formspree endpoint, field layout, close/escape behaviour, dev toolkit, any other screen.

---

### 24 June 2026 — Ganymede artifact: _seedGanymede visibility fix

**Status: shipped. Browser-verified (artifact card, settle motion, copy all correct).**

**Bug:** `_seedGanymede()` wrote to `window.gHistory` instead of the scoped `let gHistory`. `openGrimoire()` reads the scoped variable — so `gc` was always empty, `mode` resolved to `'council'`, and the Ganymede reveal branch never fired. Card stayed hidden despite the console log (which fires before the mode check).

**Fix:** Two lines → one: `gHistory = MOCK_GANYMEDE` (matches `_seedVenus` pattern). No other changes.

---

### 24 June 2026 — Ganymede collector artifact sprint

**Status: shipped. Browser-verified (card visible, settle motion confirmed distinct from Venus).**

**What shipped:**
- `#gr-artwork-card-gany` — Ganymede artifact card (11 CSS rules + HTML block), `Ganymede_gold.jpg`, five-element structure with approved copy
- `#gr-closing-breath-gany` — *"What was built here will hold."*
- `mode==='ganymede'` branch in Grimoire reveal — settle motion (`translateY -10px → 0`, `cubic-bezier(.16,.84,.44,1)`, 1.2s dwell) vs Venus bloom (opacity only, 1.8s)
- Cross-card reset on each open (Venus branch resets Gany card; Ganymede branch resets Venus card)
- `_geqChamber` module-scope var + `openArtworkEnquiry(chamber)` arg — modal is now chamber-aware
- Dynamic Formspree `_subject` and submit success copy keyed to `_geqChamber`
- Dev: `__testGanyArtifactNow()`, `?mock=ganycollector`, `✦ Collector (V)` / `✦ Collector (G)` panel buttons

---

### 24 June 2026 — Grimoire Version C: Venus Collector Flow

**Status: shipped. Browser-verified.**

**Sprint goal:** Resequence the Grimoire so the visitor receives the reflection first and discovers the Venus artwork as a closing artifact — not an opening product card. Remove all competing asks from the Venus closing moment.

**What shipped:**

1. **Grimoire HTML block replaced (Version C layout)**

   New scroll order:
   1. Sacred Record header (eyebrow, title, date)
   2. Reflection (`grVenusSection` / `grGanySection`)
   3. Closing Invocation (`grInvocationSection`)
   4. Keep this (`grActions`)
   5. Gold threshold divider (`gr-artifact-threshold`) — Venus sessions only, hidden by default, JS-revealed
   6. Venus artifact card (`gr-artwork-card`) — Venus sessions only, fades in 1.8s after seal
   7. Closing breath (`gr-closing-breath`) — *"The temple holds what was true here."* — fades in after card
   8. End

2. **Removed from Grimoire (Venus flow):**
   - `gr-offering` — Stripe donation block
   - `gr-guestbook` — Remember Me email capture
   - `gr-artwork-enquiry` — duplicate secondary enquiry copy
   - "22 prints" scarcity contradiction

3. **Venus artifact card restructured** — five distinct typographic elements (label / title / poetic / facts / status / CTA)

---

## Current architecture

### Grimoire flow (Venus)

```
openGrimoire()
  → show grimoireScreen
  → populate grVenusSection from vHistory
  → generateInvocation(mode='venus')
      → API call → invocation renders
      → grActions revealed (Keep this)
      → gr-artifact-threshold shown
      → gr-artwork-card shown (display:flex)
      → setTimeout 1800ms:
          → gr-artwork-card opacity → 1 (2.2s bloom)
          → gr-closing-breath display:block → opacity → 1
```

### Grimoire flow (Ganymede)

```
openGrimoire()
  → populate grGanySection from gHistory
  → generateInvocation(mode='ganymede')
      → API call → invocation renders
      → grActions revealed (Keep this)
      → gr-artifact-threshold shown
      → gr-artwork-card-gany shown (display:flex)
      → setTimeout 1200ms:
          → gr-artwork-card-gany opacity → 1, translateY(-10px) → 0 (settle)
          → gr-closing-breath-gany display:block → opacity → 1
```

### Collector flow (Venus)

```
Visitor seals Venus Grimoire
  → 1.8s later: Venus artifact card fades in
  → "Enquire Privately" → openArtworkEnquiry('venus')
      → _geqChamber = 'venus'
      → textarea placeholder = "I would like to enquire about the Venus work…"
      → geq-sent innerHTML = "…Thank you for your interest in Venus…"
      → modal opens
  → Submit → Formspree xkoakgkk
      → _subject: "Venus Chamber — Private Collection Enquiry"
  → Success: "Thank you for your interest in Venus. El will be in touch within 48 hours."
```

### Collector flow (Ganymede)

```
Visitor seals Ganymede Grimoire
  → 1.2s later: Ganymede artifact card settles into place
  → "Enquire Privately" → openArtworkEnquiry('ganymede')
      → _geqChamber = 'ganymede'
      → textarea placeholder = "I would like to enquire about the Ganymede work…"
      → geq-sent innerHTML = "…Thank you for your interest in Ganymede…"
      → modal opens
  → Submit → Formspree xkoakgkk
      → _subject: "Ganymede Chamber — Private Collection Enquiry"
  → Success: "Thank you for your interest in Ganymede. El will be in touch within 48 hours."
```

### Archival / sold state (future — not yet active)

When an original is collected:
- Venus: replace `grac-status` with *"One exists. It has found its keeper."*, hide `.grac-cta`
- Ganymede: replace `grac-status` with *"One was made. It has found its keeper."*, hide `.grac-cta`
- Do not use the word "Sold". Card stays visible as permanent provenance record.

---

## Dev toolkit

### Console commands

| Command | What it does |
|---|---|
| `window.__testGrimoireNow()` | Seeds Venus mock session, opens Grimoire |
| `window.__testGanyGrimoireNow()` | Seeds Ganymede mock session, opens Grimoire |
| `window.__testGanyArtifactNow()` | Seeds Ganymede mock session, opens Grimoire (artifact card reveals) |
| `window.__testCollectorNow()` | Opens enquiry modal as Venus |
| `window.__testVenusNow()` | Flash-transitions into Venus approach corridor |
| `window.__testGanymedeNow()` | Flash-transitions into Ganymede cave |
| `window.__testKeyNow()` | Seeds Venus mock data, opens Sigil Key reveal |
| `window.__resetTemple()` | Clears all localStorage, shows threshold |
| `window.__unlockAllKeys()` | Grants Sigil Key + seeds Venus key record |

### URL params

| Param | Behaviour |
|---|---|
| `?dev=1` | Floating dev panel bottom-left |
| `?mock=venus` | Venus chamber, no API |
| `?mock=ganymede` | Ganymede chamber, no API |
| `?mock=grimoire` | Venus Grimoire with mock data |
| `?mock=ganygrimoire` | Ganymede Grimoire with mock data |
| `?mock=collector` | Venus enquiry modal, immediate |
| `?mock=ganycollector` | Ganymede enquiry modal, immediate |
| `?mock=key` | Sigil Key reveal with mock Venus data |
| `?sigil=1` | Sigil Key reveal (legacy alias) |
| `?testGrimoire=1` | Shows legacy ✦ Test Grimoire button |

---

## Known technical debt

| Item | Notes |
|---|---|
| Council → Venus routing bug | `enterVenusAltar()` (empty shell) called instead of `enterVenusApproach()`. ~lines 3034 and 3181. Simple 2-line fix. Unfixed. |
| Ghost Venus oracle code | ~250 lines of dead code: `sendVenus`, `renderVCard`, `addUserMsg`, `initVenusSculpture`, `_buildVenusSculpture`. Not wired to HTML. Safe, not urgent. |
| `grRemember()` JS function | Dead function — HTML callers removed. JS body still present, unreachable. Tidy next convenient session. |
| Duplicate `#gr-enquiry-modal` CSS | Modal + modal.open + inner rules appear twice in CSS. Invisible to visitors. Tidy next convenient session. |

---

## Backlog (do not implement until real enquiry behaviour exists)

- Council → Venus routing bug fix
- Persephone integration into `index.html` (prototype complete: `persephone-oracle.html`)
- Psyche chamber (no artwork, no video, no GLB, no system prompt)
- Sigil Key architecture — 9 open design questions deferred
- The Memory layer — asynchronous inhabited presence, no backend yet
- Collector page, print production, edition certificates
- Wallet / Privy / Supabase — do not build until visitor behaviour proves need
- File splitting (separate CSS/JS files) — revisit when complexity warrants

---

## Live status

| Feature | Status |
|---|---|
| Threshold | Live |
| Foyer council debate | Live |
| Venus chamber + oracle | Live |
| Ganymede chamber + oracle | Live |
| Venus Grimoire (Version C) | Live — browser-verified |
| Ganymede Grimoire | Live — browser-verified |
| Council Grimoire | Live |
| Venus artifact card | Live — browser-verified |
| Ganymede artifact card | Live — browser-verified (settle motion confirmed) |
| Enquiry modal (chamber-aware) | Live — awaiting browser verification of modal copy fix |
| Formspree enquiry flow | Live |
| Dev toolkit (9 commands + panel) | Live — browser-verified |
| Persephone | Prototype only (`persephone-oracle.html`) — not in `index.html` |
| Psyche | Not built |
| Sigil Key reveal | Live (partial) |
| The Memory | Architecture undecided |
