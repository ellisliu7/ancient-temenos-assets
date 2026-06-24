# Ancient Temenos — Current State
**Date:** 24 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ellisliu7.github.io/ancient-temenos-assets/`

---

## Session log

### 24 June 2026 — Collector V1 polish sprint

**Status: shipped. Ready to push and verify.**

**What changed (all surgical, no new screens, no new infrastructure):**

1. **Duplicate `#gr-artwork-card` removed** — two identical HTML blocks existed side by side. Second copy excised. One card remains, correctly positioned below the Grimoire divider.

2. **Artwork card copy updated:**
   - Eyebrow: `FROM THE CHAMBER OF VENUS` (was: `Venus · Original Work`)
   - Body: artwork named, medium specified, dimensions given, singularity stated — `Venus, 2026. Original graphite, charcoal & gold on paper. 38.5 × 56.5 cm. The original. One exists.`
   - CTA: `Enquire Privately` (was: `Enquire about the artwork`)

3. **Modal copy updated:**
   - Title: `Private Collection Enquiry` (was: `Enquire about the artwork`)
   - Sub: `Share your details below and El will reply personally within 48 hours.` (was: medium/dimensions repeated)
   - Fields: `Name` / `Email` / `Message (optional)` — clean, no over-labeling
   - Message placeholder: `I would like to enquire about Venus…`

4. **Success state updated:**
   > Your enquiry has been received.
   > Thank you for your interest in Venus.
   > El will be in touch within 48 hours.
   (was: "Your enquiry is on its way. El will be in touch." — no timeframe, no warmth)

5. **`window.__testCollectorNow()` added to Developer Toolkit:**
   - Opens `#gr-enquiry-modal` instantly from any state
   - Works from console at any time, no URL param needed
   - Listed in toolkit comment header
   - Added alongside existing 7 commands (8 total now)

**What was NOT changed (confirm these still work):**
- `?mock=collector` handler — seeds nothing, just calls `openArtworkEnquiry()` after 600ms
- Lower `→ Enquire` button — still calls `openArtworkEnquiry()`, still present
- mailto routing to `ellisliu91@gmail.com` — intact
- Escape key + backdrop-click close — intact
- Dev panel `✦ Collector` button — intact (calls `openArtworkEnquiry()`)
- All other toolkit commands — untouched

**Verify checklist (browser, in order):**

1. `?mock=collector` — modal opens on page load (no Grimoire needed)
2. `window.__testCollectorNow()` from console — modal opens instantly
3. Run `window.__testGrimoireNow()` from console → confirm:
   - Artwork card appears below the gold divider
   - Card shows: `FROM THE CHAMBER OF VENUS` eyebrow, artwork image, new body copy with dimensions
   - CTA reads: `Enquire Privately`
4. Click `Enquire Privately` → modal opens with title `Private Collection Enquiry`
5. Submit with email only (name + message empty) → mailto fires, success state shows
6. Success state reads: `Your enquiry has been received. / Thank you for your interest in Venus. / El will be in touch within 48 hours.`
7. Escape key closes modal
8. Lower `→ Enquire` button also opens modal
9. Inspect DOM: confirm only one `#gr-artwork-card` and one `#gr-enquiry-modal`

**Definition of done:**
A visitor completes a Venus session → Grimoire opens → sees the artwork named concretely as a singular original → clicks `Enquire Privately` → submits name/email → mailto fires to ellisliu91@gmail.com → confirmation appears.

**Not built (do not touch until real enquiry exists):**
- Collector portal or dedicated page
- Certificate or edition system
- Print production
- Wallet / Privy / Supabase
- New chambers or animations

---

---

## Prior sessions

### 22 June 2026 — Developer Toolkit Sprint

**Status: shipped. Ready to push and verify.**

**Two bugs fixed as part of this patch:**
1. **Duplicate artwork enquiry modal removed** — `#gr-enquiry-modal`, all its JS, and its comment wrapper were duplicated in the file. Second copy excised. 8 references remain (correct: the single instance).
2. **Double `</html>` at end of file fixed** — trailing duplicate removed. File now closes cleanly.

**Dev toolkit shipped (replaces old `testGrimoire nuclear fallback` block):**

The old single-function block (~78 lines) is gone. Replaced by the permanent Temenos Dev Toolkit (~243 lines). Block is clearly marked with `<!-- ✦ ANCIENT TEMENOS — DEVELOPER TOOLKIT -->` header comment containing the full command reference.

**Phase 1 — Global console commands (all callable any time, no URL params needed):**

| Command | What it does |
|---|---|
| `window.__testGrimoireNow()` | Seeds Venus mock session, opens Grimoire immediately |
| `window.__testGanyGrimoireNow()` | Seeds Ganymede mock session, opens Grimoire immediately |
| `window.__testVenusNow()` | Flash-transitions into Venus approach corridor |
| `window.__testGanymedeNow()` | Flash-transitions into Ganymede cave |
| `window.__testKeyNow()` | Seeds Venus mock data, opens Sigil Key reveal |
| `window.__resetTemple()` | Clears all localStorage keys, shows threshold screen |
| `window.__unlockAllKeys()` | Grants Sigil Key + seeds Venus key record in storage |

**Phase 2 — Dev panel (`?dev=1`):**
- Floating dark panel, bottom-left, `z-index:999999`
- Temenos gold palette (invisible to visitors unless URL param present)
- 8 clickable items: Venus, Ganymede, Grimoire (Venus), Grimoire (Gany), Sigil Key, Collector, Reset Temple, Unlock Key
- × close button to dismiss

**Phase 3 — Deep-link URL params (all new except those noted):**

| Param | Behaviour | Notes |
|---|---|---|
| `?dev=1` | Show dev panel | NEW |
| `?testGrimoire=1` | Show legacy ✦ Test Grimoire button | EXISTING, still works |
| `?mock=venus` | Venus chamber, no API | EXISTING |
| `?mock=ganymede` | Ganymede chamber, no API | EXISTING |
| `?mock=grimoire` | Venus Grimoire with mock data, immediate | NEW |
| `?mock=ganygrimoire` | Ganymede Grimoire with mock data, immediate | NEW |
| `?mock=collector` | Artwork enquiry modal, immediate | NEW |
| `?mock=key` | Sigil Key reveal with mock Venus data | NEW (alias for `?sigil=1`) |
| `?sigil=1` | Sigil Key reveal (existing handler untouched) | EXISTING |
| `?skip=approach` | Skip cave scroll (combine with `?mock=ganymede`) | EXISTING |

**What to verify first thing next session:**

1. `window.__testGrimoireNow()` — opens Venus Grimoire from console instantly
2. `window.__testGanyGrimoireNow()` — opens Ganymede Grimoire from console instantly
3. `window.__resetTemple()` — clears storage and shows threshold
4. `window.__unlockAllKeys()` — then enter Ganymede, check sigil gate is bypassed
5. `?dev=1` — floating panel appears, all 8 buttons fire correctly
6. `?mock=grimoire` — Venus Grimoire appears on page load
7. `?mock=collector` — artwork enquiry modal appears on page load
8. Confirm duplicate modal is gone (inspect DOM: only one `#gr-enquiry-modal`)
9. Confirm file ends with single `</html>` (view source, bottom of file)

---

### 22 June 2026 — Collector V2 + dev tooling

**Status: shipped, awaiting browser verification next session.**

**Shipped:**

1. **Duplicate testGrimoire button removed** — the original IIFE block (nested inside `sendCouncil`, gated on `?testGrimoire=1`, injecting `window.testGrimoireOpen`) has been deleted. One implementation remains.
2. **Canonical dev tools (permanent, do not remove):**
   - `?testGrimoire=1` — shows the `✦ Test Grimoire` button bottom-left on page load
   - `window.__testGrimoireNow()` — callable from console at any time, any page, no URL param required. Seeds mock Venus session data and calls `openGrimoire()` directly.
3. **Artwork card (`#gr-artwork-card`)** — inserted directly after the gold `gr-divider`, before reflection text. Venus sessions only (`mode === 'venus'`). Contains:
   - Eyebrow: `Venus · Original Work`
   - Thumbnail: `Venus_Artwork.jpg` (CDN path, `onerror` hides img if missing, card still renders)
   - Body: "You passed through an artwork that exists beyond this chamber. Original work and limited editions are available for private collection."
   - CTA button: "Enquire about the artwork" → calls `openArtworkEnquiry()`
4. **In-page enquiry modal (`#gr-enquiry-modal`)** — full-screen overlay, `z-index: 200`, backdrop blur. Contains name, email, message fields. Submit builds pre-filled mailto and fires it, then swaps to confirmation state ("Your enquiry is on its way. El will be in touch."). Escape key and backdrop click close. Email is the only required field.
5. **Lower `→ Enquire` repeat CTA** — already a `<button>` calling `openArtworkEnquiry()` (was converted in a prior session). Softer opacity. Same modal, quieter presence.

**What to verify first thing next session (before any code changes):**

1. `window.__testGrimoireNow()` opens Grimoire instantly from console
2. Artwork card renders at top of Venus Grimoire (below divider, above reflection)
3. `Venus_Artwork.jpg` loads in the card — if missing, issue is path not filename (filename confirmed correct by El)
4. "Enquire about the artwork" button opens the in-page modal
5. Modal fields work; submit fires mailto and shows confirmation state
6. Lower `→ Enquire` also opens modal

**Collector positioning — current question:**
> How can a visitor move naturally from experiencing Venus to wanting to collect Venus?

**Definition of done:**
A visitor can: complete a Venus session → see the artwork again immediately → understand it is collectible → submit an enquiry without leaving the experience → feel that collecting is a natural continuation.

**Not built, not to be touched:**
- New chambers, animations, artwork, lore
- Additional collector mechanics beyond what's verified
- Collector page, print production, edition certificates
- Collective Memory / Remember Me deployment

---

### 22 June 2026 — Collector experiment v1 shipped

**Status: superseded by Collector V2 above.**

**Original v1:** Single `→ Enquire` mailto link at bottom of Grimoire, fading in 2.8s after grActions. Tested by El — CTA appeared too late, artwork no longer visible, mailto felt clunky.

**Key learning from v1:** The artwork must be visible at the moment the CTA appears. Emotional context fades fast. The collector moment is the first thing after the session seals — not the last.

---

### 22 June 2026 — Sigil Key sprint + handoff

**Status: partial sprint. Some changes shipped. Offering section unresolved.**

**Shipped:**
1. ✕ Close button on `#keyReveal`, top-right, `z-index: 4`, calls `closeKeyReveal()`
2. "Return to the temple" → "Close" — preserves Venus thread
3. "Keep your Key" wording restored
4. Offering reordered: inscription → offering → buttons
5. Offering copy locked: "This was always yours to receive. / If you wish, you may leave something behind."
6. Stripe added to offering (`buy.stripe.com/dRmfZhegNawC60V5IT5kk00`)
7. Numbered keys — `_keyNextNumber()`, inscription renders `Venus Key No. N`
8. `?sigil=1` dev param — seeds vHistory with 2 mock exchanges, calls `openKeyReveal()` after 400ms

**Unresolved (carry forward, low priority until collector flow is proven):**
- ✕ Close button visibility not confirmed on live
- ETH address in offering may feel out of place
- Numbered key presentation not mythologically resonant yet
- `Sigil_Key.mp4` not in repo — overlay shows ✦ fallback
- PNG mechanism for "Keep your Key" is temporary

---

### 22 June 2026 — Sigil Key audit (no code shipped)

Delivered full emotional journey map, rupture point analysis, copy options, dev workflow. All carried into sprint above.

---

## Known live state

| Item | Status |
|---|---|
| `window.__testGrimoireNow()` | Live — canonical dev tool |
| `window.__testGanyGrimoireNow()` | Shipped — awaiting browser verify |
| `window.__testVenusNow()` | Shipped — awaiting browser verify |
| `window.__testGanymedeNow()` | Shipped — awaiting browser verify |
| `window.__testKeyNow()` | Shipped — awaiting browser verify |
| `window.__resetTemple()` | Shipped — awaiting browser verify |
| `window.__unlockAllKeys()` | Shipped — awaiting browser verify |
| `?dev=1` panel | Shipped — awaiting browser verify |
| `?mock=grimoire` | Shipped — awaiting browser verify |
| `?mock=ganygrimoire` | Shipped — awaiting browser verify |
| `?mock=collector` | Shipped — awaiting browser verify |
| `?mock=key` | Shipped — awaiting browser verify |
| `?testGrimoire=1` button | Live — legacy, still works |
| `#gr-artwork-card` | Shipped — awaiting browser verify |
| `#gr-enquiry-modal` | Shipped (duplicate copy removed this session) |
| `Venus_Artwork.jpg` | Filename confirmed. CDN path unverified in browser. |
| Lower `→ Enquire` button | Live — calls modal |
| Stripe offering | Live |
| Guestbook / Remember me | Live (API 404s silently, UX completes) |
| Council → Venus routing bug | Known. ~lines 3034, 3181. Not fixed. |
| Ghost Venus oracle code | ~250 lines dead code. Not cleaned. Deferred. |
| Persephone | Prototype only (`persephone-oracle.html`). Not in index.html. |
| Psyche | Not built. |
| The Memory | Architecture not decided. |
