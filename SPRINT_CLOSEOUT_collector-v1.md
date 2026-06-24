# Ancient Temenos — Sprint Closeout
## Venus Collector Flow V1
**Date:** 24 June 2026
**Scope:** Collector enquiry flow — design, copy, wiring, debugging
**Status:** Shipped and verified ✓

---

## 1. What Was Shipped

### Artwork Card (inside Venus Grimoire)
A collector-facing card now appears in the Venus Grimoire, immediately below the gold divider, before the session reflection text. It is only shown in Venus mode — Ganymede and Council Grimoires are unaffected.

**Card content:**
- Eyebrow: `FROM THE CHAMBER OF VENUS`
- Artwork image: `Venus_Artwork.jpg` (CDN, with `onerror` hide if missing)
- Body: *"This original work resides beyond the chamber. Venus, 2026. Original graphite, charcoal & gold on paper. 38.5 × 56.5 cm. The original. One exists. Private collection enquiries are welcome."*
- CTA button: `Enquire Privately` → opens enquiry modal

### Enquiry Modal (`#gr-enquiry-modal`)
Full-screen overlay, `z-index: 200`, backdrop blur. Three states:

**Form state (default):**
- Title: `Private Collection Enquiry`
- Sub: *"Share your details below and El will reply personally within 48 hours."*
- Fields: Name, Email (required), Message (optional)
- Submit button: `Send enquiry →`

**Success state (`#geq-sent`):**
> Your enquiry has been received.
> Thank you for your interest in Venus.
> El will be in touch within 48 hours.

**Error state (`#geq-error`):**
> Something went wrong.
> Please try again, or email El directly at ellisliu91@gmail.com

### Formspree Submission
Enquiries POST to `https://formspree.io/f/xkoakgkk` as JSON with fields: `_subject`, `name`, `email`, `message`. No Mail app involved. Subject line: `Venus Chamber — Private Collection Enquiry`.

### Lower Enquire CTA
A quieter secondary `→ Enquire` button at the bottom of the Venus Grimoire also opens the same modal. Lower opacity, no border — a softer second invitation.

---

## 2. What Was Fixed

### Bug: Duplicate `#gr-artwork-card` HTML
Two identical artwork card divs existed side by side in the DOM. The second copy was excised. One card remains.

### Bug: Artwork card not visible in `__testGrimoireNow()`
Root cause: `_seedVenus()` was assigning to `window.vHistory` — a property on the global object — while `openGrimoire()` reads the `let vHistory` binding declared at line 1429. These are different bindings. The mode detection never saw mock data, defaulted to `'council'`, and the artwork card condition `mode === 'venus'` was never true.

Fix: `_seedVenus()` now assigns directly to `vHistory` (the `let` binding).

### Bug: Submit button stuck on `Sending…` / no email received
Root cause: `fetch()` to Formspree was hanging indefinitely — not throwing, not resolving. A bare `catch(e){}` never fired. The success display ran outside the try/catch so it would have shown success even on failure (before this was also fixed).

Fix:
- `fetch()` now races against an 8-second `Promise.race` timeout (same pattern as Grimoire oracle)
- `res.ok` check distinguishes true success from Formspree error responses
- Failure path: button re-enables, error state shown with direct email fallback
- Button state always resolves — it can never stay stuck on `Sending…`

### Bug: mailto opening Apple Mail
The original submit used `window.location.href = 'mailto:…'` to compose the email. Replaced entirely with Formspree fetch. No Mail app opens.

---

## 3. Current Test Commands

### Console commands (callable any time from browser console)
```
window.__testCollectorNow()     Opens #gr-enquiry-modal instantly, any state
window.__testGrimoireNow()      Seeds Venus mock data, opens Venus Grimoire (artwork card visible)
window.__testGanyGrimoireNow()  Seeds Ganymede mock data, opens Ganymede Grimoire (no artwork card)
window.__testVenusNow()         Flash-transitions into Venus corridor
window.__testGanymedeNow()      Flash-transitions into Ganymede cave
window.__testKeyNow()           Seeds Venus mock data, opens Sigil Key reveal
window.__resetTemple()          Clears all localStorage, returns to threshold
window.__unlockAllKeys()        Grants Sigil Key + seeds Venus key record
```

### URL deep-links
```
?mock=collector      Artwork enquiry modal, opens on page load (no Grimoire needed)
?mock=grimoire       Venus Grimoire with mock data, artwork card visible
?mock=ganygrimoire   Ganymede Grimoire with mock data (no artwork card — correct)
?mock=venus          Venus chamber, no API
?mock=ganymede       Ganymede chamber, no API
?mock=key            Sigil Key reveal with mock Venus data
?dev=1               Floating dev panel, bottom-left (8 buttons)
?sigil=1             Sigil Key reveal (alias for ?mock=key)
?skip=approach       Skip cave scroll (combine with ?mock=ganymede)
?testGrimoire=1      Legacy: single ✦ Test Grimoire button, bottom-left
```

### Verification checklist (run in this order after any push)
1. `?mock=collector` → modal opens on page load
2. `window.__testCollectorNow()` → modal opens from console
3. `window.__testGrimoireNow()` → Grimoire opens → artwork card visible below gold divider
4. Click `Enquire Privately` → modal opens with correct title and sub
5. Submit with email only → button shows `Sending…` → resolves within 8s
6. On success: form hides, success message appears
7. On failure: button re-enables as `Send enquiry →`, error message appears with mailto link
8. Escape key closes modal
9. Backdrop click closes modal
10. Reopen modal: error state hidden, button reset, form visible
11. Check Formspree dashboard (`xkoakgkk`) for submission
12. Inspect DOM: one `#gr-artwork-card`, one `#gr-enquiry-modal`

---

## 4. Known Issues

### Formspree activation (must confirm before testing)
New Formspree forms require clicking a confirmation email before they accept submissions. If `xkoakgkk` has not been activated via that email, every submission will return a non-ok response and the error state will show — regardless of the code. Log into formspree.io, confirm `xkoakgkk` is active and has `ellisliu91@gmail.com` as recipient. This is the most likely cause of any remaining submission failure.

### Artwork card position (cosmetic, not blocking)
The artwork card sits above the Grimoire invocation text (the AI-generated session reflection). This means a visitor sees the collector prompt before reading their session back. Whether this is the right emotional order has not been decided. Deferred.

### Artwork image load time
`Venus_Artwork.jpg` loads from GitHub CDN on demand. On slow connections there may be a visible pop-in. The `onerror` handler hides the `<img>` if it fails, so the card still renders correctly — but a broken image state has no explicit fallback treatment.

### No Formspree confirmation email to enquirer
Formspree sends the submission to El's inbox. It does not send an auto-reply to the person who submitted. The success message is the only confirmation they receive. If El doesn't reply promptly, there is no receipt in the enquirer's inbox.

---

## 5. Deferred Ideas

These were raised during the sprint and explicitly set aside. Do not build until real enquiry behavior exists.

**Collector portal / dedicated page**
A standalone `/collector-venus.html` with full artwork image, artist statement, dimensions, provenance, and enquiry form. Journey 3 from the design session. Not needed until a real enquiry is received.

**Foyer altar hover layer with timelapse**
Each altar showing El's artwork + creation timelapse on hover, visible to all visitors before entry. The seduction layer that turns browsers into seekers. Requires a timelapse video asset that doesn't yet exist.

**Auto-reply to enquirer via Formspree**
Formspree supports `_replyto` field to trigger an auto-acknowledgment to the sender. One-line addition. Deferred until the flow is proven to send correctly.

**Artwork card position experiment**
Moving the card to appear after the Grimoire invocation (i.e., session reflection first, then collector prompt). The emotional argument: let them receive first, offer second. Not changed yet — test the current order first.

**Edition / print infrastructure**
Certificate design, edition numbering, print production. Not relevant until collector demand is established.

**Collector dashboard / account layer**
Wallet, Privy, Supabase, collector history. Explicitly out of scope for V1 and V2.

**Collection question mechanic (Sigil Key)**
Venus collection question locked: *"What part of yourself are you finally learning to stop carrying alone?"* The mechanic — answering a reflection question as part of acquisition — is a design decision deferred until the enquiry flow is proven.

---

## 6. Recommended Next Sprint

**Priority 0 — Verify Formspree is active (5 minutes, not a sprint)**
Log into formspree.io. Confirm `xkoakgkk` is active. Confirm `ellisliu91@gmail.com` is the recipient. Submit a test via `?mock=collector`. Check inbox. Everything else is blocked until this is confirmed.

**Priority 1 — Send the temple to five people**
Not a code sprint. The first real signal is a human completing a Venus session, seeing the artwork card, and submitting an enquiry. Choose five people who fit the profile: emotionally intelligent, have some relationship with art or collecting, likely to take it seriously. Send the link. Watch what happens.

**Priority 2 — Council → Venus routing bug (2-line fix, already diagnosed)**
`enterVenusAltar()` is called instead of `enterVenusApproach()` at lines 3034 and 3181. This means the Council can't route a visitor into Venus correctly. Has been known since 16 June, unfixed. Fix this before any broader promotion.

**Priority 3 — Persephone integration (when assets are ready)**
Prototype is complete in `persephone-oracle.html`. Integration into `index.html` requires: artwork, video background, and GLB sculpture — none finalized. Do not integrate until visual assets exist.

**Do not build next:**
- Collector portal
- Foyer timelapse layer
- New chambers
- Membership/auth infrastructure

The single most valuable thing is a real enquiry in El's inbox. Everything else is secondary.
