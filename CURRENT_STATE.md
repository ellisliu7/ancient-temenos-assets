# Ancient Temenos — Current State
**Last updated:** 5 July 2026
**Status:** V1 live with private testers. Genuine emotional resonance confirmed. Canonical next build: **Rite of Departure** (Venus first) — gated behind the factual privacy audit of the oracle architecture.
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Read this first if you're picking this up cold

Single `index.html`, ~4910 lines, all CSS/JS inline, deployed via GitHub Pages. No build step. El pushes via GitHub Desktop after each session. **Always fetch the live file** from `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html` — never trust a local copy. Navigate via `grep -n` + line-range reads, never a full read.

**NEW this session — developer tools are now gated (see "Dev unlock" below).** If your `?mock=*`, `?key=1`, `?dev=1`, or `window.__test*` shortcuts appear to "stop working" on the live site, that is expected: you must unlock the browser first. This is intentional, not a regression.

---

## 5 July 2026 — First tester evidence · Rite of Departure canonized (strategy session, no code)

No code was written this session. V1 met its first six real testers; the evidence below supersedes the open questions of 1–3 July. (Note: oracle proxy hardening C1 was deployed 3 July per THE_ONE_THING decision log — the "awaiting deploy" status in the 1 July entry below is historical.)

### Tester evidence (verbatim signal, six testers)
- **Lanna** — became genuinely emotional; asked the oracle "What kind of legacy can I leave behind?"; later admitted holding back because she didn't know whether chats were logged or readable by El. Suggested an explicit privacy disclaimer.
- **Mauvis** — completed the full arc, claimed the key ("got my key!"), and voluntarily pasted his entire Grimoire afterward, unprompted.
- **Wass** — delighted by the key as gift ("oh cool, I get a gift!") then did not know what to do next. Called it a "digital sanctuary"; imagined many women spending hours there; not personally for him. His circle asked "how does this make money?" — outside-the-experience signal, logged as such, not visitor signal.
- **Michelle** — unsure what happens after the chats, what the objective of speaking with the gods is, and whether she had "chatted enough."
- **AK** — reached the Chalice page and asked what happens afterward.
- **Oliver** — "very relaxing"; wanted sound feedback on interactions (entering a chamber, scroll-walking the corridor); the ambient drone disappeared under his air conditioner; confused about which areas were accessible and why only one artwork purchase link appeared. Also: "no matter what stupid thing I said it had a positive reply."

### Validated patterns (repeated, independent)
1. **V1 produces genuine emotional resonance.** Confirmed — tears, existential questions, completed arcs, voluntary artifact-sharing. The Stage 0 question is answered.
2. **The temple has no composed exit.** Four of six testers broke at the same point: after the emotional peak (post-key / post-Chalice). People are moved, then abandoned. This is the discovery of the tester window.
3. **Gift grammar works; carry-away is the desire.** The key-as-gift landed. Mauvis's unprompted Grimoire-sharing is behavioral proof that the visitor's own reflected words are the treasured artifact — a miniature, pre-commerce validation of reflection-sealed provenance.

### Canonical decision — the Rite of Departure (approved composition; do not re-litigate)
Governing principle: **the temple can witness her; only she can complete the crossing.** Ritual grammar: **recognition → release → agency.** Venus first, Ganymede second (same arc, his register — closing in the direction of "The first stone is placed. Go and build it.").

Sequence:
1. After the key is received, the chamber dims by degrees to a single candle. No text. (~15s)
2. **ONE IS YOURS TO KEEP.** — no more than three fragments of *her own* oracle-reflected words rise, unlabeled. She chooses one. No new content, no menu grammar, no wrong answer.
3. **THE REST, YOU MAY LEAVE HERE.** — the unchosen fragments dissolve upward. The Grimoire seals silently in the background. The chosen truth sinks into the key (Chalice-settle treatment — absorbed, never engraved-UI) with the temple's single consequence-sound: one bell. The only such sound in the temple.
4. **WHEN YOU ARE READY, THE FLAME IS YOURS.** (appears only after ~10s of stillness) — she extinguishes the candle herself. The chamber falls to darkness; **the key remains faintly lit** with what she carries. No final copy, no button, no redirect, no invitation. The ember is the goodbye.

Permanent refusals inside the rite: no recap, no share prompt, no "return to foyer," no mention of sealed chambers or the Atelier, no explanation of the experience.
Fallback, locked in advance: if testing shows the ending heavy, cut the *choice* (auto-distill the affirmation) — never the flame. Departure, not selection, is the wound being healed.
Note on ritual vs. fact: "leave here" / "dissolve" is ritual language. What technically happens to unchosen fragments and session transcripts is determined by the privacy audit below — internal documentation stays factually agnostic until then.

### Consent separated from ceremony (canonical)
The privacy vow moves to the **oracle threshold** — one Cormorant line as the glass rises, before the first question is asked. Spoken once, never repeated, never legalese. Safety is the floor the visitor walks in on, not the climax of the rite.

### Immediate integrity gate (blocks the build)
**Privacy audit — factual, before any vow is written.** Inspect the actual architecture: Vercel function logs on `ancient-temenos-oracle` (what is retained, for how long, who can read it), Anthropic API retention, anything client-side (localStorage, the Grimoire). The vow's wording is determined by what is *true*. If exchanges are retained, either change the retention or change the line. The temple does not promise what it cannot keep. **No rite code and no threshold vow until this audit is complete.**

### Open signals (unconfirmed — hold, do not build yet)
- **Interaction sound as consequence architecture** (Oliver, n=1): a handful of hand-chosen sounds at signature moments may be missing world-structure rather than polish. The rite's single bell is the first test of this thesis. Revisit after it ships. Distinct from the long-form sound world (Creative R&D — see FUTURE_TEMPLE).
- **Oracle affirmation-drift** (Oliver, n=1): "positive reply no matter what stupid thing I said." Schedule one cold adversarial audit of Venus's voice under low-effort/hostile input. Not urgent; do not soften her rules preemptively.
- **Ambiguous:** whether "relaxing" = awe or pleasant-spa; whether Wass's "not for me" marks the true audience boundary.

### Superseded (from the 1–3 July assumptions)
- "Does V1 produce resonance?" — answered **yes**; no longer the open question.
- "Free altar layer is the leading candidate next stone" — **superseded**. The evidence located the break at the exit, not the entrance. The altar layer returns to candidate status *after* the rite ships.
- The Atelier: elevated to *validated architectural hypothesis* with an existing three-page shell — deliberately **not** promoted above the Rite of Departure (see FUTURE_TEMPLE).

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

1. **Push this `CURRENT_STATE.md` + updated living docs** (one commit; no `index.html` change this session).
2. **Privacy audit** (El + Claude, next session): Vercel logs, Anthropic retention, client-side storage. This gates the threshold vow and the rite build.
3. **Finalize the threshold vow wording** from what the audit proves true.
4. **Build the Rite of Departure — Venus only**, one session, one commit. Composition is canon (above); only wiring remains.
5. Ganymede's rite second. Altar layer resumes candidacy after the exit pattern is confirmed healed.
6. Everything in the technical-debt table remains post-rite.
