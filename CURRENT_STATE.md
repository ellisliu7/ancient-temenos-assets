# Ancient Temenos — Current State
**Date:** 24 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ellisliu7.github.io/ancient-temenos-assets/`

---

## Session log

### 24 June 2026 — Grimoire Version C: Venus Collector Flow

**Status: shipped. Awaiting browser verification.**

**Sprint goal:** Resequence the Grimoire so the visitor receives the reflection first and discovers the Venus artwork as a closing artifact — not an opening product card. Remove all competing asks from the Venus closing moment.

---

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
   - `gr-offering` — Stripe donation block ("Sustain the temple →")
   - `gr-guestbook` — Remember Me email capture
   - `gr-artwork-enquiry` — duplicate secondary enquiry copy ("The artwork you passed through... A limited edition of 22 prints also exists")
   - "22 prints" scarcity contradiction — singular original only, stated once

3. **Venus artifact card restructured**

   Old: one italic `grac-body` blob mixing poetic voice and factual data.

   New: five distinct elements with separate typographic treatment:
   - `grac-label` — `FROM THE CHAMBER OF VENUS` (Cinzel, 7px, dim)
   - `grac-title` — `Venus` (Almendra italic — the work named with gravity)
   - `grac-poetic` — *This original work resides beyond the chamber.* (Cormorant italic)
   - `grac-facts` — `Venus, 2026 · Original graphite, charcoal & gold on paper · 38.5 × 56.5 cm` (Cinzel small caps, upright, low opacity — facts read cold, not romantic)
   - `grac-status` — *The original. One exists.* (Cormorant italic)
   - `grac-cta` — `Enquire Privately` restyled as discreet underline text link, not a bordered button

4. **Threshold divider and closing breath wired to Venus session only**

   `gr-artifact-threshold`, `gr-artwork-card`, and `gr-closing-breath` are all `display:none` by default. JS reveals them together, and only when `mode === 'venus'`. A Ganymede or council Grimoire shows none of these elements.

5. **Artifact timing**

   Card fades in at 1.8s after the seal completes (`opacity: 0 → 1`, transition 2.2s). Closing breath fades in 120ms after the card (transition 2.8s). The reflection is readable before anything about the artwork appears.

---

**Bugs fixed this sprint:**

1. **Duplicate `#gr-artwork-card` CSS block removed** — orphan first block (lines 253–260 of pre-sprint file) excised. One canonical CSS block remains.
2. **Double `var _ac` JS declaration removed** — `gr-artwork-card` was being `getElementById`'d and `display:flex`'d twice in sequence. Replaced with a single clean Venus-only reveal block.
3. **Stale `gr-artwork-enquiry` `setTimeout` fade removed** — the 2.8s fade-in call for the deleted secondary enquiry block was still in JS. Gone.

---

**What was NOT changed:**

- Formspree modal (`#gr-enquiry-modal`) — HTML, JS, fields, submit, success state, error state all untouched
- `openArtworkEnquiry()` / `closeArtworkEnquiry()` / `submitArtworkEnquiry()` — untouched
- Escape key and backdrop-click close — untouched
- All dev toolkit commands — untouched
- `?mock=collector` handler — untouched
- Ganymede Grimoire flow — untouched
- All other temple screens — untouched

---

## Current architecture

### Grimoire flow (Venus)

```
openGrimoire()
  → show grimoireScreen
  → populate grVenusSection from vHistory
  → generateInvocation(mode='venus')
      → show grLoading
      → API call → invocation renders into grInvocationSection
      → grLoading hidden
      → grActions revealed (Keep this)
      → gr-artifact-threshold shown (display:flex)
      → gr-artwork-card shown (display:flex)
      → setTimeout 1800ms:
          → gr-artwork-card opacity → 1 (2.2s transition)
          → gr-closing-breath display:block
          → setTimeout 120ms: opacity → 1 (2.8s transition)
```

### Grimoire flow (Ganymede / council)

```
openGrimoire()
  → same as above but mode='ganymede' or 'council'
  → grArtifactThreshold: stays display:none
  → gr-artwork-card: stays display:none, opacity:0
  → gr-closing-breath: stays display:none
```

### Collector flow (Venus)

```
Visitor completes Venus session
  → clicks "✦ Seal this into my Grimoire ✦"
  → Grimoire seals (reflection + invocation generated)
  → Keep this appears
  → 1.8s later: artifact card fades in
  → Visitor clicks "Enquire Privately"
  → #gr-enquiry-modal opens (full-screen overlay, backdrop blur)
  → Visitor fills name / email / message (optional)
  → Submit → Formspree (xkoakgkk endpoint) → mailto fires → ellisliu91@gmail.com
  → Success state: "Your enquiry has been received. Thank you for your interest in Venus. El will be in touch within 48 hours."
  → Escape or backdrop click closes modal
```

### Archival / sold state (future — not yet active)

Documented in HTML comment above `#gr-artwork-card`. When the original is collected:
- Replace `grac-status` text with: *"One exists. It has found its keeper."*
- Remove or hide `.grac-cta` (Enquire Privately)
- Do not use the word "Sold"
- Card remains visible as a permanent provenance record

---

## Dev toolkit

### Console commands (callable any time, no URL param required)

| Command | What it does |
|---|---|
| `window.__testGrimoireNow()` | Seeds Venus mock session, opens Grimoire immediately |
| `window.__testGanyGrimoireNow()` | Seeds Ganymede mock session, opens Grimoire immediately |
| `window.__testCollectorNow()` | Opens `#gr-enquiry-modal` instantly |
| `window.__testVenusNow()` | Flash-transitions into Venus approach corridor |
| `window.__testGanymedeNow()` | Flash-transitions into Ganymede cave |
| `window.__testKeyNow()` | Seeds Venus mock data, opens Sigil Key reveal |
| `window.__resetTemple()` | Clears all localStorage keys, shows threshold screen |
| `window.__unlockAllKeys()` | Grants Sigil Key + seeds Venus key record in storage |

### URL params

| Param | Behaviour |
|---|---|
| `?dev=1` | Floating dev panel bottom-left (8 buttons) |
| `?mock=venus` | Venus chamber, no API |
| `?mock=ganymede` | Ganymede chamber, no API |
| `?mock=grimoire` | Venus Grimoire with mock data, immediate |
| `?mock=ganygrimoire` | Ganymede Grimoire with mock data, immediate |
| `?mock=collector` | Artwork enquiry modal, immediate |
| `?mock=key` | Sigil Key reveal with mock Venus data |
| `?sigil=1` | Sigil Key reveal (legacy alias, still works) |
| `?testGrimoire=1` | Shows legacy ✦ Test Grimoire button |

---

## Known technical debt

| Item | Notes |
|---|---|
| Council → Venus routing bug | `enterVenusAltar()` (empty shell) called instead of `enterVenusApproach()`. ~lines 3034 and 3181. Simple 2-line fix. Unfixed. |
| Ghost Venus oracle code | ~250 lines of dead code: `sendVenus`, `renderVCard`, `addUserMsg`, `initVenusSculpture`, `_buildVenusSculpture`. Not wired to HTML. Safe, not urgent. |
| `grRemember()` JS function | Dead function — HTML callers and target elements (`#gr-email`, `#gr-remembered`) removed this sprint. JS body still present, unreachable, causes no errors. Can be removed next time the file is open. |
| Duplicate `#gr-enquiry-modal` and `#gr-enquiry-inner` CSS | These were in the second canonical block that was kept. Still technically doubled in the file (modal + modal.open + inner rules appear twice in CSS). Confirmed invisible to visitors. Tidy next convenient session. |

---

## Backlog (do not implement until real enquiry behavior exists)

- Council → Venus routing bug fix
- Persephone integration into `index.html` (prototype complete: `persephone-oracle.html`)
- Psyche chamber (no artwork, no video, no GLB, no system prompt)
- Sigil Key architecture — 9 open design questions deferred
- The Memory layer — asynchronous inhabited presence, no backend yet
- Collector page, print production, edition certificates
- Wallet / Privy / Supabase — do not build until visitor behavior proves need
- File splitting (separate CSS/JS files) — revisit when complexity warrants

---

## Live status

| Feature | Status |
|---|---|
| Threshold | Live |
| Foyer council debate | Live |
| Venus chamber + oracle | Live |
| Ganymede chamber + oracle | Live |
| Venus Grimoire (Version C) | Shipped — awaiting browser verification |
| Ganymede Grimoire | Live |
| Council Grimoire | Live |
| Venus artifact card (new layout) | Shipped — awaiting browser verification |
| Formspree enquiry modal | Live (Collector V1 polish sprint, 24 Jun) |
| Dev toolkit (8 commands + panel) | Shipped — awaiting browser verification |
| Persephone | Prototype only (`persephone-oracle.html`) — not in `index.html` |
| Psyche | Not built |
| Sigil Key reveal | Live (partial) |
| The Memory | Architecture undecided |
