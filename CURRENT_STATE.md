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

### 22 June 2026 — Venus Polish + Ripple session

**Venus journey tested end-to-end by El. Confirmed working.** 

Shipped (all in current output `index.html`):

1. **Scroll hint visibility** — `scroll to approach` text: `font-size 7px → 11px`, opacity `0.82 → 0.88`, removed duplicate inline override
2. **Opening stripped** — removed long preamble card. Glass rises → "She knew you would come." fades in → "What brought you here today?" whispers in beneath it → input appears at 2.6s. No preamble card, no long mirror.
3. **Grimoire return path fixed** — `closeGrimoire()` no longer flashes to foyer from `venusApproach`. Grimoire closes, Venus conversation remains open and intact.
4. **Placeholder** — `"Speak what you carry…"` → `"You are safe to speak here…"`
5. **Corridor breathing** — `vaCorridorBreathe` keyframe added. Pure opacity only (`0.88 → 1`), no `scale()` transform (scale caused jitter on video element). El noted animation is subtle/not visible — deprioritized, not removed.
6. **Response reveal — pure opacity** — removed all `translateY` from `vaRenderCard`. Text fades in where it lives. Glass scrolls once before reveal, not after each paragraph. `3s ease` transitions, `2600ms` stagger between paragraphs. Kybalion and question arrive last with breathing room.
7. **Submit button consistency** — both success and error paths in `sendVenusNew` now restore `btn.innerHTML = '✦'`. Star throughout entire conversation.
8. **Venus mock mode** — `?mock=venus` bypasses oracle API. 3 hardcoded response cards cycling through exchanges (1st, 2nd, 3rd+), 1100ms simulated delay, full reveal flow. Use for UX iteration without burning credits.
9. **Ripple experiment** — `?ripple=1` dev param. CSS + 15-line JS. `100px` gold-border circle, `0.5px solid rgba(196,158,72,0.22)`, expands `scale(0→1)` and fades `opacity(0.22→0)` over `1.3s cubic-bezier`. Skips inputs/buttons/links. Desktop only. Reuses single element — no stacking. El has not tested live yet (possible cache/deployment delay).

**El's observations from Venus test:**
- Response still feels slightly abrupt — "appears then moves upward" (translateY removed in this session; verify on next live push)
- Corridor animation: subtle, deprioritized
- Placeholder: confirmed correct — "You are safe to speak here."
- Ripple: not yet confirmed on live site

---

### 21 June 2026 — The Memory session
- Shipped `#roomScreen` overlay (V1) behind `?room=1` dev param — 26 seed traces, localStorage, one trace per visitor, persists on refresh
- Explored and named **The Memory** concept — canonical doc now lives in `MEMORY.md`
- Decided: The Memory is not a chamber. It is the living memory of the temple.
- Decided: traces are signals, not messages. No text. Pure light, position, intensity, rhythm. (V1 text traces are placeholder only.)
- Decided: the foyer spinning sigil is the future portal to The Memory (not yet wired)
- Decided: name is **The Memory** (not The Reservoir, not The Room, not The Field)
- Key references documented: Journey (presence without language), Japanese zen garden (response to attention not action)
- Three concept natures explored: Field · Weather System · Living Organism — all documented in MEMORY.md, none chosen as final
- No further builds this session — ended with documentation and clarity

---

## Architecture

**Single file:** `index.html` (~3,580 lines) on GitHub Pages (`ellisliu7.github.io/ancient-temenos-assets`)
**Deployment:** GitHub Desktop → push to `main` → GitHub Pages auto-deploys
**Oracle proxy:** Vercel (`ancient-temenos-oracle.vercel.app/api/oracle`) — private repo, API key in Vercel env vars only
**Oracle model:** `claude-sonnet-4-6`
**Assets:** GitHub CDN via jsDelivr (`cdn.jsdelivr.net/gh/ellisliu7/ancient-temenos-assets@main/`)
**No database. No auth. No build step.**

---

## What is currently live

### Threshold
- Full-screen video (`Main_Page.mp4` or similar)
- Scroll up/down = beautiful cinematic entry (preferred path)
- "Enter the Sanctuary" button appears as fallback
- **No rune riddle. No "love is the answer."** Those flows are dead code — do not reference.

### Foyer
- `Foyer_hall.mp4` background
- Venus altar (artwork, hover glow, poem, label) → routes to `enterVenusApproach()`
- Ganymede altar (artwork, hover glow, poem, label) → routes to `enterGanymede()`
- Persephone altar (shell only — "coming soon" toast on click)
- Psyche altar (shell only — "coming soon" toast on click)
- Council input: four-voice debate, API-powered, sequential reveal (900ms between lines)
- Auto-focus on council input after 2800ms
- Altar poems visible at rest (opacity 0.22), brighten on hover
- Council instruction line opacity raised to 0.55

### Venus chamber (`venusApproach`) — CURRENT CANONICAL STATE
- Scroll-scrubbed corridor (`Venus.mp4`) with gentle opacity breathing (`vaCorridorBreathe`, 5.5s)
- Oracle glass rises at scroll end
- **Opening sequence:** "She knew you would come." → "What brought you here today?" (whispers in after 1.4s) → input at 2.6s
- **Placeholder:** "You are safe to speak here…"
- **Submit button:** ✦ throughout (no arrow reversion)
- **Mock mode:** `?mock=venus` — 3 hardcoded cards, no API
- Oracle: JSON-structured (`principle`, `mirror`, `kybalion`, `affirmation`, `question`, `actions`)
- **Response reveal:** pure opacity fade, no translateY. Glass scrolls once before reveal. 3s transitions, 2600ms paragraph stagger.
- Closing screen: "You already know what to do with this." → separator → "✦ Receive your First Key ✦" → Seal to Grimoire / Return (all staggered in gracefully)
- Grimoire: `closeGrimoire()` returns to Venus conversation, not foyer
- Wishing Well: intention → ripple canvas → sigil reveal → ETH offering → save sigil → CTA

### Sigil Key reveal (`#keyReveal`) — NEEDS NEXT SPRINT
- Triggered from Venus closing "✦ Receive your First Key ✦"
- Shows `Sigil_Key.mp4` full-screen (**asset not yet in repo** — shows ✦ fallback)
- "✦ Collect this Key" → inscription writes (date, chamber, one line from session) → persists to `localStorage` under `temenos_keys`
- After collecting: "Keep your Key" (downloads PNG certificate) + "Return to the temple" (flashes to foyer — **should return to Venus conversation**)
- ETH-only offering (`0x70F0082E7f47e3DC8cf62B2C7FA26100657297E9`, tap to copy) — no Stripe
- Copy: "This Key was given freely. If the temple moved you, you may sustain it." — needs rethinking
- **"Keep your Key"** = downloads PNG image — doesn't feel like the final form
- **No close/back button** that returns to Venus conversation

### Ganymede chamber (`ganymedeScreen`)
- Reverse-scrubbed cave video
- **Sigil Key gate** mid-scroll — blocks deeper oracle access
  - "Request a Sigil Key" → email captured via **Formspree** (`xkoakgkk`) → El's inbox
  - "I hold a Key" → key input field → localStorage token
  - Dev bypass: `?skip=ganymede&key=1`
- Oracle: tikkun framework, JSON-structured, option paths
- Grimoire: seals session

### Grimoire
- Opens from Venus closing or Ganymede oracle
- `generateInvocation()` makes AI seal call → renders invocation
- `grActions` reveals after seal (or on 25s timeout)
- **Offering block** inside `grActions`:
  - *"Places like this exist because someone, once, decided they were worth keeping."*
  - "Sustain the temple →" → Stripe Payment Link
  - Guestbook email field → "Remember me" → POSTs to `/api/remember` (not yet deployed) → "You are remembered."
- `_grUUID()`: generates/retrieves UUID cookie (`temenos_id`, 1-year)
- `grRemember()`: validates email, captures UUID, POSTs to Vercel function

### Key reveal overlay (`#keyReveal`)
- See "Sigil Key reveal" above — needs next sprint

### Session tracking
- `trackTempleEvent(name, payload)` module — localStorage, capped at 100 events
- **8 events wired:** `foyer_loaded`, `council_input_focused`, `council_question_submitted`, `chamber_entered_venus`, `chamber_entered_ganymede`, `oracle_question_submitted`, `grimoire_opened`, `sigil_key_requested`
- New: `key_reveal_opened`, `key_collected`, `key_downloaded`
- Swap line marked for Plausible/PostHog — not yet wired

---

## Confirmed broken / not yet confirmed

| Item | Status | Notes |
|---|---|---|
| `Sigil_Key.mp4` | **Not pushed to repo** | Key reveal shows ✦ fallback until pushed |
| `/api/remember` | **404 — not deployed** | `remember.js` written but not in oracle repo; fails silently, visitor sees "You are remembered." |
| Resend account | **Not created** | Needed before `remember.js` can send emails |
| Formspree submissions | **Unknown count** | Log in to formspree.io → form `xkoakgkk` to see Sigil Key waitlist emails |
| Ripple experiment | **Unconfirmed on live** | `?ripple=1` — El couldn't see it yet, possible cache/deployment delay |
| Venus response "moves upward" | **Partially addressed** | `translateY` removed from `vaRenderCard`; needs live verification after push |

---

## Active integrations

| Integration | Purpose | Status | Notes |
|---|---|---|---|
| **Vercel oracle proxy** | Anthropic API calls | Live | `ancient-temenos-oracle.vercel.app/api/oracle` |
| **Stripe Payment Link** | Grimoire offering | Live | `buy.stripe.com/dRmfZhegNawC60V5IT5kk00` |
| **Formspree `xkoakgkk`** | Sigil Key waitlist email | Live (unverified count) | Ganymede gate → El's inbox |
| **`/api/remember`** | Grimoire guestbook | **Not deployed** | `remember.js` written, needs oracle repo |
| **Resend** | Email delivery for `/api/remember` | **Not created** | Free tier, 10 min setup |
| **GitHub Pages** | Hosting | Live | Auto-deploys on push to `main` |
| **jsDelivr CDN** | Video/asset delivery | Live | All videos and GLBs |

---

## Dev params (all production no-ops)

| Param | Effect |
|---|---|
| `?mock=1` | Bypass oracle API, use mock council response |
| `?mock=venus` | Bypass oracle in Venus — 3 hardcoded cards, full reveal flow |
| `?mock=ganymede` | Route council to Ganymede with mock |
| `?skip=ganymede&key=1` | Enter Ganymede, bypass Sigil Key gate |
| `?key=1` | Grant Sigil Key via localStorage |
| `?testKey=1` | Show ✦ Test Key button (bottom-right) |
| `?testGrimoire=1` | Show ✦ Test Grimoire button (bottom-left) |
| `?ripple=1` | Enable click ripple atmospheric experiment (desktop only) |
| `?room=1` | Open The Memory dev overlay |

**Console functions (dev only):**
- `testKeyReveal()` — open Key reveal with mock Venus data
- `testGrimoireOpen()` — open grimoire with mock Venus data
- `temenosSession()` — return session event array
- `temenosClearSession()` — clear session log
- `openRoom()` / `closeRoom()` / `roomLeaveTrace()` — The Memory overlay

---

## The Memory (`#roomScreen`) — DEV ONLY
- Overlay exists in `index.html`, `display:none` by default
- Accessible via `?room=1` URL param
- 26 seed traces (text motes — placeholder, direction moving toward pure light)
- localStorage key: `temenos_room`
- One trace per visitor, persists on refresh
- **Not linked from foyer or any live user path**
- Full concept documented in `MEMORY.md`

---

## Next sprint: Sigil Key refinement

### What the current Sigil Key flow does (audited 22 June 2026)

**Entry:** Venus closing → "✦ Receive your First Key ✦" → `openKeyReveal()`
**Screen:** Full-screen overlay, `Sigil_Key.mp4` video background (currently ✦ fallback), floating key image
**Collect:** "✦ Collect this Key" → key object saved to localStorage → inscription writes (date, chamber, session line)
**After collect:**
  - "Keep your Key" → `keepKey()` → canvas render → PNG download (900×1400px certificate)
  - "Return to the temple" → `flashTo(foyer)` — **wrong: should return to Venus**
**Offering (separate block below):** "This Key was given freely. If the temple moved you, you may sustain it." + ETH address to copy

### What needs to change

| Issue | Fix |
|---|---|
| "Return to the temple" flashes to foyer | Change to `closeKeyReveal()` — returns to Venus conversation |
| No close/X button | Add `✕ Close` top-right, calls `closeKeyReveal()` |
| Offering copy feels tacked on | Rewrite — should feel like a natural closing, not a tip jar |
| ETH-only | Add Stripe Payment Link alongside ETH; Stripe primary, ETH secondary |
| "Keep your Key" → PNG download | Interim: keep download but reframe copy. Long-term: Privy wallet, key as identity |
| Offering placement | After inscription, before "Return" — not a separate block below the buttons |

### Smallest sprint to ship

1. Add `✕ Close` button → `closeKeyReveal()` (returns to Venus, not foyer) — **2 lines**
2. Fix "Return to the temple" → `closeKeyReveal()` instead of `flashTo(foyer)` — **1 line**
3. Rewrite offering copy and add Stripe link — **HTML change only, no new JS**
4. Reorder: inscription → offering (Stripe + ETH) → "Keep your Key" → Close

### Architectural notes for Sigil Key (preserve these decisions)
- **Privy wallet** is the planned long-term identity layer — key becomes wallet-linked, not localStorage
- **The Memory / Collective Memory** — after collecting a key, visitor may eventually "leave a trace" in The Memory. The key is the credential for that action. Not built yet.
- **Collection question** (locked): "What part of yourself are you finally learning to stop carrying alone?" — this should appear before or during key collection, not after. Not building yet.
- **"Keep your Key"** copy is wrong even for the PNG — "Download your certificate" is more honest; "Keep your Key" implies persistence that doesn't exist yet in localStorage-only mode
- Do not build wallet, NFT, or Privy integration until real visitor demand is proven

---

## Architectural decisions made this session (do not re-litigate)

- **Grimoire closes to Venus, not foyer** — visitor stays in their conversation
- **Venus opening is two lines only** — "She knew you would come." + "What brought you here today?" — no preamble card, no mirror, no kybalion in opening
- **Response reveal: pure opacity, no translateY** — Venus arrives, she does not shift
- **"You are safe to speak here…"** is the correct placeholder — not directive, lowers threshold
- **Corridor breathing deprioritized** — animation exists but is subtle; do not keep tuning background when flow is working
- **Ripple stays behind `?ripple=1`** — evaluate feeling before deciding whether it belongs in the temple permanently
- **Mock modes are permanent dev infrastructure** — `?mock=venus`, `?mock=ganymede` stay in codebase
