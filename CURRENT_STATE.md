# Ancient Temenos — Current State
**Last updated:** 1 July 2026
**Status:** Version 1 — launch-readiness pass in progress. First round of pre-share fixes shipped this session (see below). One backend fix (oracle proxy hardening) is written and awaiting review before deploy. Not yet shared.
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Read this first if you're picking this up cold

Single `index.html`, ~4910 lines, all CSS/JS inline, deployed via GitHub Pages. No build step. El pushes via GitHub Desktop after each session. **Always fetch the live file** from `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html` — never trust a local copy. Navigate via `grep -n` + line-range reads, never a full read.

**NEW this session — developer tools are now gated (see "Dev unlock" below).** If your `?mock=*`, `?key=1`, `?dev=1`, or `window.__test*` shortcuts appear to "stop working" on the live site, that is expected: you must unlock the browser first. This is intentional, not a regression.

---

## 1 July 2026 — Launch-readiness pass (Opus first-time-visitor review + first fixes)

A full first-time-visitor audit was run (landing -> foyer -> chambers -> Grimoire -> security -> mobile -> performance). Findings were triaged Critical / Important / Future. This session shipped the three that live in `index.html`; the one backend fix was written for separate review.

### Shipped this session (in `index.html`, ready to push)

- **C2 — Share/copy URLs corrected.** `copyGrimoire()` (line ~2660) was appending `ancienttemenos.com` (wrong TLD) to the copied Grimoire; now `ancienttemenos.art`. `sharePortal()` (line ~2661) was copying the pre-migration `ellisliu7.github.io/...` URL to the clipboard; now `https://ancienttemenos.art`. These fire at the exact share moment, so a wrong link there poisoned every referral.

- **C3 — Homepage hero video stabilized (Known Issue #1 resolved).** Line ~585 sourced the hero from jsDelivr `@latest`, which resolves against git *tags*; the repo has none, so `@latest` intermittently 503'd (the black-screen-with-title symptom). **Root-cause fix: `@latest` -> `@main`.** `@main` resolves to the branch head, which always exists, and it keeps the asset on a real CDN. Chosen over moving to `raw.githubusercontent` because four other assets on this site already use jsDelivr `@main` with zero problems, and GitHub does not support `raw.githubusercontent` for production hotlinking (5-min cache, can throttle). File confirmed present on `main` (200, 4.58 MB). Smallest change that fixes the actual cause.

- **I1 — Developer tools gated in production.** Previously `?key=1` / `?sigil=1` granted the Sigil Key for free, and `?mock=*` / `?dev=1` / the `window.__test*` toolkit all ran live for any visitor. Now gated behind a per-browser unlock. Implementation: a DEV GATE at the top of the first `<script>` (line ~1307) computes `window.__temenosDev`; for a locked visitor it strips `mock/dev/key/sigil/skip` from the URL up front (so every downstream reader finds nothing), and the console/deep-link toolkit IIFE (line ~4510) early-returns unless unlocked. **Not localhost-gated** — El tests on the live domain, so localhost-only would have broken the QA workflow. Honest limitation: because the source is public, the gate stops casual URL-tinkering (a friend appending `?key=1`), not a determined reader of the source. Real isolation would need a build step, which the single-file architecture doesn't have. Sufficient for a friends-launch.

  #### Dev unlock (how to use your shortcuts on the live site)
  In each browser, open the console once and run:
  ```
  localStorage.setItem('temenos_atelier','1')
  ```
  After that, `?mock=venus`, `?mock=ganychalice`, `?key=1`, `?dev=1`, and all `window.__test*` commands work exactly as before — in that browser only. To relock: `localStorage.removeItem('temenos_atelier')`. `localhost` / `127.0.0.1` also auto-unlock.

### Written for review, NOT deployed (backend)

- **C1 — Oracle proxy hardening.** The proxy at `ancient-temenos-oracle.vercel.app/api/oracle` currently accepts client-supplied `model`, `max_tokens`, and `system`, and the endpoint URL is in plain client JS — i.e. an open, unauthenticated, billable Claude proxy. The hardened handler (`oracle-hardened.js`, delivered separately this session) adds, without restructuring: Origin allowlist enforcement (foreign/no-Origin callers -> 403), server-authoritative model, `max_tokens` clamp (cap 1200), and lightweight in-memory per-IP rate limiting (40/min). **Review before deploying to the private Vercel repo.** Known residual: in-memory rate limiting is per-warm-instance (upgrade to Upstash/KV later); client `system` is still accepted (Origin allowlist is what protects it — move prompts server-side as a future step).

### Verified during the audit — false alarms cleared

- **Grimoire text-clean regex is SAFE.** Prior debt note flagged that the Grimoire's clean function "likely" had Venus's old paragraph-collapsing `\s` bug. Verified: the shared `cleanText` (line ~1785) uses the narrowed `[ \t\-]`-style class and does not collapse newlines. `copyGrimoire` uses `\n{3,}` -> `\n\n` which is correct normalization. No bug. Removed from the debt list.
- **Council routing stays resolved.** Re-confirmed every live path calls `enterVenusApproach()`; `enterVenusAltar()` remains dormant. Known Issue #2 remains closed.

### Outstanding homework (El's eyes / real devices — cannot be done in code)

1. **Full mobile walkthrough on a real iPhone AND a real Android** — the hard gate before sharing. iOS autoplay attrs are correct and touch-scrub handlers exist (good signs), but the three signature interactions (Venus scroll-corridor, Ganymede cave, Chalice cursor-canvas) are exactly what breaks on mobile. Only 3 `@media` breakpoints in the file.
2. **Confirm the Chalice canvas actually paints** (cross-origin video -> canvas; `crossorigin="anonymous"` is set) on desktop and mobile, Safari especially.
3. **Confirm `ancienttemenos.com` ownership** — irrelevant to the site now (both share paths point to `.art`), but worth knowing whether the old `.com` string was ever going anywhere.
4. **Send one Formspree test enquiry** (collector path, `xkoakgkk`) and confirm it lands in the inbox.
5. **One emotional-pacing pass as a stranger** — does the awe land at the artwork reveal? Any silence that reads as a bug vs. intention?

---

## Known issues

### #1 — Homepage hero video intermittent load failure — RESOLVED (this session, C3)
Fixed by changing line ~585 from jsDelivr `@latest` to `@main`. Monitor once after deploy to confirm the black-screen symptom is gone; if it somehow recurs, the fallback is `raw.githubusercontent.com/.../main/Main_Page.mp4`.

### #2 — Council debate routing — RESOLVED (confirmed again this session)
Every live call site uses `enterVenusApproach()`. `enterVenusAltar()` is dormant, preserved as a future relic path. No action.

---

## Remaining technical debt (not blocking a friends-launch)

| Issue | Priority | Notes |
|---|---|---|
| Oracle proxy hardening not yet deployed | HIGH (security) | Patch written (`oracle-hardened.js`), awaiting review + deploy. Until deployed, the proxy remains open/billable. |
| In-memory rate limiting (once C1 deploys) | MEDIUM | Per-warm-instance only; upgrade to Upstash/Vercel KV when traffic justifies. |
| Client `system` still accepted by proxy (post-C1) | MEDIUM | Protected by Origin allowlist for now; move prompts server-side as a later hardening step. |
| `prefers-reduced-motion` — zero handlers | MEDIUM (a11y) | Whole experience is motion/video/particles. Matters for public launch; not blocking for a hand-picked friend audience. |
| Screen-reader / aria coverage minimal (2 aria, 2 alt) | MEDIUM (a11y) | Inherent to a video/canvas world. Public-launch concern. |
| XSS surface via `innerHTML` (39 occurrences) | LOW | No shared/persisted user content is rendered to other users — self-XSS only. Leave alone for V1; revisit if Collective Memory ever shows one visitor's words to another. |
| Multiple videos `preload="auto"` | LOW (perf) | Heavier first load on weak/mobile connections. Optional: switch non-landing videos to `preload="metadata"`. |
| Dead code | LOW | `grRemember()`/`/api/remember` (never called; its elements don't exist), legacy `runeWords`/`buildRunes` (`#runeField` gone -> inert), `bridgeToGanymede` defined twice (identical, harmless), dormant `enterVenusAltar`/`enterVenusOracle`, orphaned `#kr-key-img`/`#kr-key-fallback` CSS, inert `kybalion` fields in mock/error objects. All invisible to visitors. One hygiene pass someday. |
| Asset URL mix (raw vs jsDelivr `@main`) | LOW | Both patterns work. Optional standardization for maintainability; not urgent. |

---

## Architecture reference

- **File:** single `index.html`, ~4910 lines, all CSS/JS inline, no build step
- **Repo:** `ellisliu7/ancient-temenos-assets` (public, GitHub Pages). No git tags (relevant to the resolved hero-video issue — do not rely on `@latest`).
- **Domain:** `ancienttemenos.art`
- **Oracle proxy:** `ancient-temenos-oracle.vercel.app/api/oracle` (private Vercel repo). Hardened handler written this session: `oracle-hardened.js` (review before deploy).
- **Asset hosting:** primarily `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/...`; several assets on jsDelivr `@main` (never `@latest`).
- **Formspree:** `xkoakgkk` (collector enquiry — works; the separate Grimoire `/api/remember` path is dead code, never invoked).
- **Dev tools (now gated — see "Dev unlock" above):** `?mock=venus|ganymede|ganychalice|key|grimoire|ganygrimoire|collector|ganycollector`, `?dev=1`, `?sigil=1`, `?key=1`, `?skip=approach`, and `window.__test*` (definitions ~line 4530). Unlock per browser with `localStorage.setItem('temenos_atelier','1')`.
- **Typography (locked):** Cinzel — sacred labels; Cormorant / Cormorant Garamond — body/oracle; Almendra — character names only.
- **Design docs in repo root:** `DESIGN_PRINCIPLES.md`, `DESIGN_LANGUAGE.md`, `ARTIST_POSITIONING.md`.

### Screen/flow map
- Real Venus entry: `enterVenusApproach()` -> scroll-scrubbed corridor -> `vaArrive()` -> `vaOpenConversation()`, on the `venusApproach` screen. (`venusOracle`/`enterVenusOracle()` is a dormant parallel screen — not the live path.)
- Ganymede ending: `ganyRitual` -> `openChaliceReveal()` -> (optional) `keepChalice()` -> `closeChaliceReveal()` -> Foyer.
- Grimoire: `openGrimoire(forceMode)`; `closeGrimoire()` stays in the Ganymede cave mid-session, else returns to the Foyer.

---

## Chambers status

| Chamber | Status |
|---|---|
| Threshold | LIVE — simple "Enter the Sanctuary" + scroll (riddle/runes retired; legacy code inert) |
| Foyer — council debate | LIVE — 4-archetype real-time debate, API-powered |
| Venus | LIVE — feature-complete for V1 |
| Ganymede | LIVE — feature-complete for V1 (incl. Chalice ending) |
| Persephone | PROTOTYPE ONLY — standalone `persephone-oracle.html`, not integrated, waiting on visual assets |
| Psyche | NOT BUILT |
| Collective Memory | NOT BUILT — architecture designed, not started |

---

## Next steps

1. **Push this session's `index.html` + this `CURRENT_STATE.md`** (one commit — message provided).
2. **Review `oracle-hardened.js`, then deploy C1** to the private Vercel repo. Until then the proxy is open/billable — this is the last true launch blocker after mobile.
3. **Walk the full journey on a real iPhone and Android** (homework #1). This gates the share.
4. After mobile is clean and C1 is deployed: send V1 to the five.
5. Everything in the technical-debt table is post-launch / after real feedback.
