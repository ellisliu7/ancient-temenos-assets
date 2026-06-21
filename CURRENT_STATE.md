# Ancient Temenos — Current State
**Date:** 21 June 2026  
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

## Architecture

**Single file:** `index.html` (~3,292 lines) on GitHub Pages (`ellisliu7.github.io/ancient-temenos-assets`)  
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

### Venus chamber (`venusApproach`)
- Scroll-scrubbed corridor (`Venus.mp4`)
- Oracle glass rises at scroll end
- Oracle: JSON-structured (`principle`, `mirror`, `kybalion`, `affirmation`, `question`, `actions`)
- **Robust JSON extraction:** extracts from first `{` to last `}` before parsing — handles model preamble text
- Closing screen: "✦ Receive your First Key ✦" (primary), Seal to Grimoire, Return
- Wishing Well: intention → ripple canvas → sigil reveal → ETH offering → save sigil → CTA
- Grimoire: seals session

### Ganymede chamber (`ganymedeScreen`)
- Reverse-scrubbed cave video (`Ganymede_Dolly_final.mp4` or `Ganymede Cave_1.mp4`)
- **Sigil Key gate** mid-scroll — blocks deeper oracle access
  - "Request a Sigil Key" → email captured via **Formspree** (`xkoakgkk`) → your inbox
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
- `_grUUID()`: generates/retrieves UUID cookie (`temenos_id`, 1-year) — future Privy wallet ID slot
- `grRemember()`: validates email, captures UUID, POSTs to Vercel function (see Integrations)

### Key reveal overlay (`#keyReveal`)
- Triggered from Venus closing "✦ Receive your First Key ✦"
- Shows `Sigil_Key.mp4` full-screen (asset must be pushed to repo root)
- Fallback: glowing ✦ if MP4 missing
- Collect → light pulse → inscription writes (date, chamber, one line from session)
- Persists to `localStorage` under `temenos_keys`
- Download: captures video frame + inscription as PNG certificate
- Optional ETH offering appears after key is collected (never gated)

### Session tracking
- `trackTempleEvent(name, payload)` module — localStorage, capped at 100 events
- Debug: `temenosSession()`, `temenosClearSession()` in console
- **8 events wired:** `foyer_loaded`, `council_input_focused`, `council_question_submitted`, `chamber_entered_venus`, `chamber_entered_ganymede`, `oracle_question_submitted`, `grimoire_opened`, `sigil_key_requested`
- New event: `guestbook_submitted` (fires on grRemember success)
- Swap line marked for Plausible/PostHog/Supabase — not yet wired

---

## What was shipped today (21 June 2026)

1. **Grimoire offering block** — Option B copy, Stripe link, guestbook email field, "You are remembered." confirmation
2. **`grRemember()` + `_grUUID()`** — email validation, UUID cookie generation, POST to `/api/remember`, graceful fail-silent
3. **`testGrimoire=1` dev shortcut** — bottom-left button, `testGrimoireOpen()` console function, seeds mock Venus vHistory, opens real grimoire flow
4. **`readyState` guard on test button** — fires immediately if DOM already ready (fixed DOMContentLoaded timing bug)
5. **Robust JSON extraction** — `raw.indexOf('{')` / `raw.lastIndexOf('}')` extraction before parse in both `sendVenusNew` and `sendVenus` — fixes raw JSON display bug
6. **25-second timeout on `generateInvocation`** — `Promise.race` prevents grimoire hanging permanently; `grActions` always reveals
7. **`lastCouncilInput` guard** — `typeof` check into `_lci` before INPUTS object creation — fixes ReferenceError crash during Venus grimoire

---

## Confirmed working

- Venus oracle receives question, parses JSON, renders formatted mirror/affirmation/question
- "What Venus Revealed" renders correctly in grimoire
- Grimoire opens and seals
- `generateInvocation` completes or times out gracefully — `grActions` always reveals
- Offering block HTML present in `grActions`
- Stripe Payment Link live: `https://buy.stripe.com/dRmfZhegNawC60V5IT5kk00`
- Stripe custom confirmation: *"Thank you. The temple has received your offering. What was found here will remain for the next traveller."*
- Sigil Key waitlist (Ganymede gate) → Formspree → email to El's inbox (check formspree.io dashboard)
- Session tracking fires events to localStorage
- `?testKey=1` → ✦ Test Key button bottom-right → `testKeyReveal()` → Key reveal overlay
- `?testGrimoire=1` → ✦ Test Grimoire button bottom-left → `testGrimoireOpen()` → grimoire with mock Venus data

---

## Confirmed broken / not yet confirmed

| Item | Status | Notes |
|---|---|---|
| `Sigil_Key.mp4` | **Not pushed** | Key reveal shows ✦ fallback until pushed |
| `/api/remember` | **404 — not deployed** | `remember.js` written but not in oracle repo; `grRemember()` fails silently, visitor sees "You are remembered." |
| Resend account | **Not created** | Needed before `remember.js` can send emails |
| Grimoire offering visual test | **Not confirmed** | Offering block is in code; visual appearance not yet seen by El |
| `?testGrimoire=1` button | **Unconfirmed on live** | GitHub Pages cache may still be stale from earlier in session |
| Formspree submissions | **Unknown count** | Log in to formspree.io → form `xkoakgkk` to see Sigil Key waitlist emails |

---

## Active integrations

| Integration | Purpose | Status | Notes |
|---|---|---|---|
| **Vercel oracle proxy** | Anthropic API calls | Live | `ancient-temenos-oracle.vercel.app/api/oracle` |
| **Stripe Payment Link** | Grimoire offering | Live | `buy.stripe.com/dRmfZhegNawC60V5IT5kk00` |
| **Formspree `xkoakgkk`** | Sigil Key waitlist email | Live (unverified) | Ganymede gate → El's inbox |
| **`/api/remember`** | Grimoire guestbook | **Not deployed** | `remember.js` written, needs oracle repo |
| **Resend** | Email delivery for `/api/remember` | **Not created** | Free tier, 10 min setup |
| **GitHub Pages** | Hosting | Live | Auto-deploys on push to `main` |
| **jsDelivr CDN** | Video/asset delivery | Live | All videos and GLBs |

---

## Dev params (all production no-ops)

| Param | Effect |
|---|---|
| `?mock=1` | Bypass oracle API, use mock council response |
| `?mock=venus` | Route council to Venus with mock |
| `?mock=ganymede` | Route council to Ganymede with mock |
| `?skip=ganymede&key=1` | Enter Ganymede, bypass Sigil Key gate |
| `?key=1` | Grant Sigil Key via localStorage |
| `?testKey=1` | Show ✦ Test Key button (bottom-right) |
| `?testGrimoire=1` | Show ✦ Test Grimoire button (bottom-left) |

**Console functions (dev only):**
- `testKeyReveal()` — open Key reveal with mock Venus data
- `testGrimoireOpen()` — open grimoire with mock Venus data (requires `?testGrimoire=1` in URL)
- `temenosSession()` — return session event array
- `temenosClearSession()` — clear session log

**Quickest grimoire test (no URL param needed):**
```javascript
currentScreen='venusApproach'; vHistory=[{role:'user',content:'I keep giving everything away.'},{role:'assistant',content:JSON.stringify({principle:'Receiving is not weakness',mirror:'You have not lost the ability to receive.\n\nYou have been so committed to giving that receiving began to feel unsafe.\n\nYou are allowed to be on the receiving end. Not eventually. Now.',kybalion:'"As above, so below."',affirmation:'I am allowed to receive what is already mine.',question:'What would you let yourself want today if no one was watching?',actions:['Rest before you plan.','Name one thing you need.']})}]; openGrimoire();
```

---

## Known open bugs (as of end of session)

1. ~~**`lastCouncilInput` ReferenceError**~~ **FIXED in this session** — `typeof` guard added
2. ~~**Grimoire never completes**~~ **FIXED** — 25s timeout + always-reveal `grActions`
3. ~~**Venus raw JSON display**~~ **FIXED** — robust `{...}` extraction before parse
4. **`Sigil_Key.mp4` missing** — key reveal shows ✦ fallback
5. **`/api/remember` 404** — guestbook silently fails, visitor sees confirmation but no email sent
6. **GitHub Pages cache lag** — after push, wait for Actions tab green before testing
7. **Ganymede option click may eject from panel** on some devices — untested since earlier session
8. **Post-council auto-transition is 2s** — flagged as too fast, not yet extended

---

## Decisions on hold (explored, not approved)

- Living relics / evolving artifacts / provenance of becoming
- Founding Keeper covenant and architecture
- Archive overlay (four chamber relics, Keeper slots)
- On-chain / NFT surface
- Persephone integration into `index.html` (prototype complete as standalone `persephone-oracle.html`)
- PostHog/Plausible swap (infrastructure ready, one line change)
- Next.js migration (deliberate future sprint, not imminent)
- Privy wallet-as-identity (direction confirmed, nothing built)
- Sequential Key numbering (Vercel counter — deferred)
- Bespoke sigil relic Gumroad listing
- Early patron invitation page
- Commissioned temple engagements

---

## Copy decisions (approved, not yet implemented in gate)

- **Sigil Key gate:** Version A voice — *"something in you already knows / You've felt this before. / The moment just before something changes. / This is that moment. / Leave your name · I've been here before"*
- **Grimoire offering:** Option B — *"Places like this exist because someone, once, decided they were worth keeping."*
- **Voice direction:** Brit Marling register for all new copy — mystery is the visitor, not the temple. Intimacy, memory, identity, transformation. No mythology, fantasy, or grand spiritual language.

---

## Recommended next steps (in priority order)

1. **Push `index.html`** (today's bug fixes) and confirm deployment via GitHub Actions tab
2. **Verify grimoire offering** — run console test, confirm offering block appears after seal
3. **Push `Sigil_Key.mp4`** to repo root — makes Key reveal cinematic instead of fallback
4. **Create Resend account + deploy `remember.js`** to oracle repo — makes guestbook actually deliver emails
5. **Check Formspree dashboard** — `xkoakgkk` may already have Sigil Key waitlist emails sitting there
6. **Share with first real visitors** — watch `temenosSession()` for behavioral data before building more

---

## File locations

- `index.html` → `ellisliu7/ancient-temenos-assets` repo (GitHub Pages)
- `api/oracle.js` → `ellisliu7/ancient-temenos-oracle` repo (Vercel, private)
- `api/remember.js` → needs to go in `ellisliu7/ancient-temenos-oracle` repo (not yet pushed)
- `CURRENT_STATE.md`, `BIBLE.md`, `CHARACTERS.md`, `DECISIONS.md` → `ellisliu7/ancient-temenos-assets` repo

**Raw fetch pattern for new sessions:**
```bash
curl -s "https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html" -o /tmp/index.html
curl -s "https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/CURRENT_STATE.md" -o /tmp/CURRENT_STATE.md
```
