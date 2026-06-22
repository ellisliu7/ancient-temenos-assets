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

### 22 June 2026 — Collector experiment v1 shipped

**Status: complete. Collector experiment live.**

**Shipped:**

1. **Artwork enquiry block** — `#gr-artwork-enquiry` added to Grimoire closing screen, inside `#gr-offering`, after guestbook. Fades in at opacity 0 → 1 over 1.8s, triggered by `setTimeout` at 2800ms after `grActions` reveals.
2. **Staged reveal** — enquiry appears ~2.8s after existing Grimoire actions settle. Visitor sees: copy button → Stripe offering → guestbook → [pause] → artwork enquiry.
3. **mailto: link** — `ellisliu91@gmail.com`, subject pre-filled `Venus Chamber — Artwork Enquiry`, body pre-fills interest, name, and open field.

**Copy locked:**
> *The artwork you passed through exists as a singular object.*
> *A limited edition of 22 prints also exists.*
> *→ Enquire*

**Decisions made this session (locked):**

- **Guestbook left intact** — `/api/remember` is 404 but visitor-facing experience completes correctly. Two different intentions: collector enquiry (active, immediate) vs. Remember Me (passive, future). Not competing. Not removed.
- **Collector experiment scope is complete** — no further collector infrastructure until a real enquiry arrives.
- **Artwork is the collectible, not the Key** — the Key may become part of the journey but is not the thing people ultimately take home. This is the defining insight of the collector positioning sprint.

**What to watch:**
- Does an email arrive at `ellisliu91@gmail.com` from a real visitor?
- Success = one genuine enquiry in four weeks.
- No analytics required. Inbox is the instrument.

**Not built, deferred until signal:**
- Collector page
- Print production
- Edition certificates
- Artist attribution / discovery layer
- Collective Memory / Remember Me deployment

---

### 22 June 2026 — Sigil Key sprint + handoff

**Status: partial sprint. Some changes shipped. Offering section unresolved. Next sprint scoped.**

**Shipped this session (in current `index.html` output):**

1. **✕ Close button** — `#kr-close`, top-right of `#keyReveal`, `z-index: 4`, calls `closeKeyReveal()`. Returns to Venus conversation. Base opacity raised to `0.42` so it's findable without hovering.
2. **"Return to the temple" → "Close"** — calls `closeKeyReveal()` instead of `flashTo(foyer)`. Thread with Venus preserved.
3. **"Keep your Key" restored** — reverted from "Save your Key." Wording is not the issue; mechanism is. Kept for now. Future: Privy wallet, collection, identity.
4. **Offering reordered** — now reveals before exit buttons. Sequence: inscription (400ms) → offering (1.6s) → buttons (2.8s). Visitor sits in the stillness of the key before shown any exit.
5. **Offering copy locked** — "This was always yours to receive. / If you wish, you may leave something behind."
6. **Stripe added to offering** — `#kr-stripe` link (`buy.stripe.com/dRmfZhegNawC60V5IT5kk00`). Primary action. ETH secondary, smaller, low opacity.
7. **Numbered keys** — `_keyNextNumber()` added. Key object now carries `number` field. Inscription renders `Venus Key No. 2` (local count from `temenos_keys` array). Raw technical ID (`VEN-20260622-XXXX`) removed from inscription but preserved on key object for dev use.
8. **`?sigil=1` dev param** — seeds `vHistory` with 2 mock Venus exchanges, calls `openKeyReveal()` after 400ms. Works on GitHub Pages (not gated behind localhost). No DevTools required.

**Decisions made this session (locked):**

- **Offering copy:** "This was always yours to receive. / If you wish, you may leave something behind." — chosen because it assumes the gift has already been given. Aligned with Venus voice and "You already know what to do with this."
- **"Keep your Key"** is correct wording for now. The weakness is the PNG mechanism, not the label. Do not iterate on the label until the mechanism changes.
- **Key number is meaningful mythology** — but `Venus Key No. 1` framing feels functional/game-like. Number should be preserved on the object and shown in inscription, but presentation needs more thought. Not blocked.
- **The Key as living artifact** (future, not this sprint): Three.js slow Y-axis rotation, cursor-responsive tilt, environment map reflections. Supersedes looping video. Same pipeline as Venus/Ganymede sculptures. Build only after `Sigil_Key.mp4` asset is evaluated.
- **Affirmation line is generated uniquely per session** — `_venusSessionLine()` reads last assistant `affirmation` field from `vHistory`. Every inscription is singular. This is architecturally correct for provenance and the future collecting system.

**Unresolved — carry into next sprint:**

| Issue | Notes |
|---|---|
| ✕ Close button visibility | Shipped with z-index fix and opacity raise. Not yet confirmed rendering correctly. El to verify on live site with `?sigil=1`. |
| Offering section hierarchy | Stripe + ETH present but visual hierarchy unclear. ETH address may feel out of place. Needs screenshot audit before redesigning. |
| Numbered key presentation | `Venus Key No. N` is functional but not mythologically resonant. Alternative framings needed before locking. |
| Key reveal headline | "The temple offers you its first Key." kept. El likes it. No changes needed here. |
| PNG mechanism weakness | `keepKey()` downloads a PNG certificate. Feels temporary. Long-term: Privy wallet + collection. Not this sprint. |
| `Sigil_Key.mp4` | Not in repo. Overlay shows ✦ fallback. Push asset to unlock video background. |
| Screenshot not received | El described issues but no screenshot shared. Offering redesign deferred until visual audit possible. |

---

### 22 June 2026 — Sigil Key audit (no code shipped, audit only)

Delivered full emotional journey map, rupture point analysis, copy options, and dev workflow recommendations. All documented in that session's conversation. Key decisions from audit carried into sprint above.

---

### 22 June 2026 — Venus Polish + Ripple session

**Venus journey tested end-to-end by El. Confirmed working.**

Shipped:
1. Scroll hint visibility — `scroll to approach` text: `font-size 7px → 11px`, opacity `0.82 → 0.88`
2. Opening stripped — removed long preamble card. Glass rises → "She knew you would come." → "What brought you here today?" → input at 2.6s
3. Grimoire return path fixed — `closeGrimoire()` no longer flashes to foyer from `venusApproach`
4. Placeholder — "Speak what you carry…" → "You are safe to speak here…"
5. Corridor breathing — `vaCorridorBreathe` keyframe added. Pure opacity only. Subtle/not visible — deprioritized, not removed.
6. Response reveal — pure opacity fade, no translateY. 3s transitions, 2600ms paragraph stagger. Kybalion and question arrive last.
7. Submit button — both success and error paths restore `btn.innerHTML = '✦'`
8. Venus mock mode — `?mock=venus` bypasses oracle API. 3 hardcoded response cards.
9. Ripple experiment — `?ripple=1` dev param. CSS + 15-line JS. Gold-border circle, expands and fades over 1.3s. Desktop only.

---

### 21 June 2026 — The Memory session

- Shipped `#roomScreen` overlay (V1) behind `?room=1` dev param
- Named and scoped **The Memory** — canonical doc in `MEMORY.md`
- Decided: The Memory is not a chamber. It is the living memory of the temple.
- Decided: traces are signals, not messages. Pure light, position, intensity, rhythm. (V1 text traces = placeholder only.)
- Decided: foyer spinning sigil is the future portal to The Memory (not yet wired)
- No further builds — ended with documentation and clarity

---

## Architecture

**Single file:** `index.html` (~3,600 lines) on GitHub Pages (`ellisliu7.github.io/ancient-temenos-assets`)
**Deployment:** GitHub Desktop → push to `main` → GitHub Pages auto-deploys
**Oracle proxy:** Vercel (`ancient-temenos-oracle.vercel.app/api/oracle`) — private repo, API key in Vercel env vars only
**Oracle model:** `claude-sonnet-4-6`
**Assets:** GitHub CDN via jsDelivr (`cdn.jsdelivr.net/gh/ellisliu7/ancient-temenos-assets@main/`)
**No database. No auth. No build step.**

---

## What is currently live

### Threshold
- Full-screen video (`Main_Page.mp4` or similar)
- Scroll up/down = cinematic entry
- "Enter the Sanctuary" button fallback
- **No rune riddle. No "love is the answer."** Dead code — do not reference.

### Foyer
- `Foyer_hall.mp4` background
- Venus altar → `enterVenusApproach()`
- Ganymede altar → `enterGanymede()`
- Persephone + Psyche altars (shell, "coming soon" toast)
- Council input: four-voice debate, API-powered, sequential reveal (900ms between lines)
- Auto-focus on council input after 2800ms

### Venus chamber (`venusApproach`) — STABLE
- Scroll-scrubbed corridor (`Venus.mp4`)
- Opening: "She knew you would come." → "What brought you here today?" → input at 2.6s
- Placeholder: "You are safe to speak here…"
- Submit button: ✦ throughout
- Mock mode: `?mock=venus`
- Response reveal: pure opacity, no translateY. Glass scrolls once before reveal.
- Closing screen: "You already know what to do with this." → "✦ Receive your First Key ✦" → Seal to Grimoire
- Grimoire: `closeGrimoire()` returns to Venus conversation

### Sigil Key reveal (`#keyReveal`) — PARTIAL SPRINT, UNRESOLVED

**Current state after this session's patch:**
- Triggered from Venus closing "✦ Receive your First Key ✦"
- `Sigil_Key.mp4` background (not in repo — shows ✦ fallback)
- ✕ Close button top-right → `closeKeyReveal()` (returns to Venus)
- "✦ Collect this Key" → inscription writes (affirmation line, chamber, date, key number)
- Key number displayed as `Venus Key No. N` (local count — not global)
- After collect: offering arrives (1.6s) → buttons arrive (2.8s)
- Offering copy: "This was always yours to receive. / If you wish, you may leave something behind."
- Offering: Stripe primary (`Offer to the temple →`) + ETH secondary
- Buttons: "Keep your Key" (PNG download) + "Close" (calls `closeKeyReveal()`)

**Still unresolved:** offering visual hierarchy, numbered key presentation, ✕ visibility confirmation

### Ganymede chamber (`ganymedeScreen`)
- Reverse-scrubbed cave video
- Sigil Key gate mid-scroll (Formspree `xkoakgkk` for waitlist, localStorage for key holders)
- Oracle: tikkun framework, JSON-structured
- Grimoire: seals session

### Grimoire
- Opens from Venus or Ganymede
- `generateInvocation()` → AI seal call → invocation rendered
- `grActions`: Stripe offering + guestbook email → `/api/remember` (not deployed)
- `_grUUID()`: UUID cookie (`temenos_id`, 1-year)

### The Memory (`#roomScreen`) — DEV ONLY
- `?room=1` only — not linked from any live user path
- 26 seed traces, localStorage, one trace per visitor
- Full concept in `MEMORY.md`

---

## Dev params (all production no-ops)

| Param | Effect |
|---|---|
| `?sigil=1` | **NEW** — seeds mock Venus history, opens Key reveal directly. Primary test path for Sigil Key iteration. |
| `?mock=1` | Bypass oracle API, mock council response |
| `?mock=venus` | Bypass Venus oracle — 3 hardcoded cards |
| `?mock=ganymede` | Route council to Ganymede with mock |
| `?skip=ganymede&key=1` | Enter Ganymede, bypass Sigil Key gate |
| `?key=1` | Grant Sigil Key via localStorage |
| `?testKey=1` | Show ✦ Test Key button (bottom-right) |
| `?testGrimoire=1` | Show ✦ Test Grimoire button (bottom-left) |
| `?ripple=1` | Click ripple atmospheric experiment (desktop only) |
| `?room=1` | Open The Memory dev overlay |

**Console functions (dev only):**
- `testKeyReveal()` — open Key reveal with mock Venus data
- `testGrimoireOpen()` — open grimoire with mock data
- `temenosSession()` / `temenosClearSession()` — session event log
- `openRoom()` / `closeRoom()` / `roomLeaveTrace()` — The Memory

---

## Confirmed broken / unconfirmed

| Item | Status | Notes |
|---|---|---|
| `Sigil_Key.mp4` | **Not pushed to repo** | Key reveal shows ✦ fallback |
| `/api/remember` | **404 — not deployed** | `remember.js` written, not in oracle repo |
| Resend account | **Not created** | Needed before `/api/remember` can send emails |
| Formspree submissions | **Unknown count** | Log in to formspree.io → `xkoakgkk` |
| ✕ Close button rendering | **Unconfirmed** | Shipped, z-index fixed — El to verify with `?sigil=1` |
| Ripple experiment | **Unconfirmed on live** | `?ripple=1` — El couldn't see it yet |

---

## Active integrations

| Integration | Purpose | Status |
|---|---|---|
| Vercel oracle proxy | Anthropic API calls | Live |
| Stripe Payment Link | Grimoire offering + Sigil Key offering | Live |
| Formspree `xkoakgkk` | Sigil Key waitlist email | Live (unverified count) |
| `/api/remember` | Grimoire guestbook | **Not deployed** |
| Resend | Email delivery | **Not created** |
| GitHub Pages | Hosting | Live |
| jsDelivr CDN | Video/asset delivery | Live |

---

## Next sprint: Ancient Temenos Artifact System

**Do not implement anything from this section. This is scoping only.**

The Sigil Key sprint revealed that several systems are converging without a clear architecture:
- The Ancient Temenos Key (what was just built)
- Chamber Keys (Venus, Ganymede, future chambers)
- Personal Sigils (Wishing Well — already live)
- The Memory / Collective Memory (future traces, participation)
- Long-term collection (Privy wallet, provenance, digital ownership)

These need to be defined as a coherent system before any further implementation. The next sprint is a **design and architecture session only** — no code until the system is clear.

**Questions to answer in that session:**

1. What is an Ancient Temenos Key exactly? What does holding one mean?
2. Is the Key per-chamber (Venus Key, Ganymede Key) or a single universal Temple Key?
3. What is the relationship between a Key and a Personal Sigil?
4. What does the numbered sequence mean mythologically? Who is Key No. 1?
5. What is the difference between a Founding Key and a regular Key? Is there one?
6. What does collecting El's artwork eventually require — a Key, a Sigil, both?
7. Where does The Memory fit? Is Key-holding the credential for leaving a trace?
8. What is the minimum version of collection that feels real before Privy exists?
9. What does `keepKey()` eventually do — when it's no longer a PNG download?

**Architectural constraints to carry in:**
- No wallet, no NFT, no Privy integration until real visitor demand is proven
- localStorage is the only persistence layer right now — design must work within that
- Every piece of the system should feel like mythology, not a loyalty program
- The number matters. The label framing the number is not yet resolved.
- The key reveal screen is close. The artifact itself (3D, living, cursor-responsive) is the long-term form.

---

## Architectural decisions (do not re-litigate)

- **Grimoire closes to Venus, not foyer**
- **Venus opening is two lines only** — "She knew you would come." + "What brought you here today?"
- **Response reveal: pure opacity, no translateY**
- **"You are safe to speak here…"** is the correct placeholder
- **Offering copy locked:** "This was always yours to receive. / If you wish, you may leave something behind."
- **"Keep your Key"** — wording correct, mechanism is the problem. Do not re-litigate wording.
- **Affirmation line in inscription is session-generated** — `_venusSessionLine()` reads last assistant `affirmation`. This is architecturally correct. Do not change to generic copy.
- **Mock modes are permanent dev infrastructure** — `?mock=venus`, `?mock=ganymede`, `?sigil=1` stay in codebase
- **The Memory is not a chamber** — it is the living memory of the temple
- **Demand before infrastructure** — Privy, Supabase, NFT verification wait until visitor behavior proves need
