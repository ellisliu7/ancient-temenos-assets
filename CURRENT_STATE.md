# Ancient Temenos — Current State
**Date:** 22 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ellisliu7.github.io/ancient-temenos-assets/`

---

## Session discipline (carry into every new chat)

- **ALWAYS fetch the live `index.html` before any code work.** Never use `/mnt/project/index.html` — it is always stale.
- Also fetch `CURRENT_STATE.md` at session start.
- Fetch live file ONCE per session. Do not re-fetch mid-session unless El has pushed.
- Navigate the file via grep/line-slices, never full reads.
- Fix ONLY what is in the bug report. Never touch unrelated systems.
- One surgical change per session. One bug, one fix, verify before shipping.
- Never make three attempts at the same thing — diagnose before retrying.
- At session end, output the FULL updated `CURRENT_STATE.md` alongside `index.html`.

---

## Session log

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
| `?testGrimoire=1` button | Live — single instance only |
| `#gr-artwork-card` | Shipped — awaiting browser verify |
| `#gr-enquiry-modal` | Shipped — awaiting browser verify |
| `Venus_Artwork.jpg` | Filename confirmed. CDN path unverified in browser. |
| Lower `→ Enquire` button | Live — calls modal |
| Stripe offering | Live |
| Guestbook / Remember me | Live (API 404s silently, UX completes) |
| Council → Venus routing bug | Known. ~lines 3034, 3181. Not fixed. |
| Ghost Venus oracle code | ~250 lines dead code. Not cleaned. Deferred. |
| Persephone | Prototype only (`persephone-oracle.html`). Not in index.html. |
| Psyche | Not built. |
| The Memory | Architecture not decided. |
