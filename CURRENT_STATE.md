# Ancient Temenos — Current State
**Last updated:** 6 July 2026 (third session)

---

## 6 July 2026 (third session) — Jump fix, departure revert, vow refinement

Four changes, one commit. The rite's core (fade, fragments, choice, ember auto-close, departure line placement) is untouched.

**1 — First-response jump fixed.** On the first card, `#va-vthread` grows from zero height to full card height in one insertion. `anchorTop` (computed immediately after insertion) is unreliable in this state — the pin scroll was overcorrecting and producing a visible jump. Fix: detect first card (`vHistory.filter(role==='assistant').length===1`) and scroll to bottom instead of pinning to anchor. Subsequent cards continue to pin as before. Same stable strategy used by `vaAddUserMsg`, no new mechanism.

**2 — Automatic departure transition restored.** The input-as-gate mechanic (`vaReadyToReceive`, `vaCloseToRite`, `sendVenusNew` guard) has been removed entirely. `vaMaybeShowClosing` is restored to the `vaCardDoneAt`-seamed timed cascade: after her final words fully arrive + one breath, `va-closing-new` becomes visible and the closing line / separator / key CTA / actions cascade in. The cinematic automatic transition was confirmed stronger by El. Reset block also cleaned — no more input rewiring needed.

**3 — Departure line placement and ember auto-close preserved.** Both from the previous session. `#kr-rite-depart` remains inside `#kr-inscription`. `closeKeyReveal()` fires 4500ms after the ember appears.

**4 — Privacy vow.** Three CSS changes on `#va-vow-note`: `letter-spacing:.05em` removed (was stretching the line and compressing legibility at small italic sizes); opacity softened from `0.72` back to `0.55` (readable without demanding attention); `border-top:.5px solid rgba(196,158,72,0.08)` and `padding-top:1.2rem` added (a hairline separator that visually detaches the vow from the input above — it reads as its own quiet line, not as UI copy competing with the input field).

---

## 6 July 2026 (second session)

---

## 6 July 2026 (second session) — Four rite polish fixes, no new features

Four surgical fixes to the Venus Rite of Departure following El's first live walkthrough. No new screens, no new storage, no scope expansion. The rite's core (fade to black, three fragments, choice, chosen truth on the key) is confirmed working and untouched.

**1 — Privacy vow contrast.** `rgba(238,220,168,0.42)` → `0.72` in `#va-vow-note` CSS. Trust copy reads at comfortable contrast now. One character change.

**2 — Input-as-closing-gesture (seam fix, second pass).** The timer-cascade closing (`vaMaybeShowClosing` + `va-closing-new` / `va-key-cta`) was removed as the transition mechanism. After Venus's second response, the input placeholder shifts to "When you are ready, receive your Key." — after her final words fully arrive, never interrupting them. The visitor controls the moment; sending anything (Enter or ✦) opens the key reveal. `sendVenusNew` is guarded by `vaReadyToReceive` so the original DOMContentLoaded `addEventListener` binding cannot double-fire. The reset path restores original placeholder and wiring on re-entry. `va-closing-new`, `va-closing-line`, `va-key-cta` etc. remain in the DOM but are never shown in the new flow — available for future re-use if needed.

**3 — Departure line placement.** `#kr-rite-depart` moved from between `#kr-rite-fragments` and `#kr-ember` into the bottom of `#kr-inscription`. The departure instruction now sits below the chosen truth and chamber/date metadata — instruction and key object form one visual unit. Stacking-group CSS rule updated accordingly (it's now a grandchild, not a direct child of `#keyReveal`).

**4 — Ember auto-close.** After `riteDepart()`, the ember appears at +2600ms and holds for 4500ms, then `closeKeyReveal()` fires automatically. The overlay fades out and the visitor returns to the Venus chamber. She is not left in darkness with an unexplained dot.

**Explicitly not touched:** rite composition, fragment logic, bell slot, Grimoire, Ganymede, anything outside the Venus key-reveal overlay.

**Next test to run:** walk the full arc — two oracle exchanges, read Venus's words at a slow pace, confirm placeholder shifts only after her final words are fully visible, send "When you are ready, receive your Key.", confirm rite proceeds, ember appears and overlay closes cleanly.

---

## 6 July 2026
**Status:** V1 live with private testers. Privacy audit CLOSED, threshold vow shipped. **The Rite of Departure (Venus) is now built and ready to push** — see entry below. Ganymede's rite, the return-recognition moment, and any Grimoire persistence remain explicitly out of scope for this build.
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## 6 July 2026 — Rite of Departure (Venus) built — compressed composition, code ready to push

**Diagnosis this session was built on:** tester evidence (5 July) showed four of six testers breaking after the emotional peak — the temple had no composed exit. The fix is not more lore or explanation; it's a single ritual that lets the visitor herself close the conversation.

**Composition — approved after one round of compression against over-ritualization:**
final words fully land → one breath → collection pulse decays into darkness (no candle, no 15s empty wait) → up to three fragments of her own oracle-reflected words rise → **ONE IS YOURS TO KEEP** → she chooses → the others dissolve → the chosen truth sinks into the key (one silent bell slot) → stillness → **"When you are ready, touch the Key and leave with what is yours."** → she touches the key → the light gutters down → darkness, one faint ember remains in the key. Nothing follows — no button, no recap, no redirect.

**Key decision this session:** the candle was cut entirely, not deferred. *The key is the flame.* It already carries the light curve from collection-flash through to ember; a separate candle prop would have been decorative. Both gestures from the canonical rite were kept (choosing the truth, and now touching the key to close) — the canon's own fallback rule ("cut the choice, never the flame") made the case for compressing everything else instead.

**What shipped in `index.html` this session:**

1. **Seam fix (`vaRenderCard` / `vaMaybeShowClosing`, ~line 1712, ~1826, ~1863).** The closing reveal previously fired on a fixed 5000ms timer, which could open while Venus's final card was still visually revealing. `vaRenderCard` now records the real completion time of its own paragraph + question fade (`vaCardDoneAt`); `vaMaybeShowClosing` waits for that moment plus one breath (2500ms) instead of a flat timer. This was treated as part of the rite's seam, not a separate polish item — a ritual can't feel inevitable if its doorway interrupts the conversation it's meant to complete.

2. **`collectKey()` rewritten (~line 3477).** No longer writes an inscription or shows Keep/Close immediately. Creates the key record with an empty `line` and hands off to `riteBegin()`. The key has not remembered anything until she chooses what it keeps.

3. **New rite functions, all in the Venus key-ritual block (~line 3477–3560):**
   - `riteBegin()` — dims video/eyebrow/headline to near-black over 4.5s (no fixed 15s empty beat — the compressed version).
   - `_venusFragments()` — pulls up to three deduped fragments from `vHistory` (affirmation, then principle), most recent first. Never invents copy.
   - `riteRise()` — fragments rise staggered ~1.2s apart; "One is yours to keep" fades in after. **Locked fallback preserved:** if fewer than two genuine fragments exist, the choice is skipped entirely and the rite auto-distills straight to `riteSink()` — never fabricates a second fragment to force a decision.
   - `riteChoose(text, wrap)` — unchosen fragments dissolve upward (`.kr-fragment-fade`); the chosen fragment lingers one beat, then also dissolves into the key.
   - `riteSink(text)` — writes the chosen truth into the key record via new `_updateVenusKey()` (updates the existing record in `temenos_keys`, no new storage system), re-renders the inscription onto the now-faintly-relit key, and calls `riteBell()`.
   - `riteBell()` — **wired silent, not synthesized.** Dispatches a `temenos:bell` custom event and calls `window.__temenosBell` if defined; no oscillator, no placeholder tone. Silent until a real bell asset exists.
   - `riteShowDeparture()` — after ~5.5s stillness, fades in the departure line and makes the key (the `#kr-video` surface itself) clickable.
   - `riteDepart()` — the key's light gutters down over 3s to darkness; a small `#kr-ember` div remains faintly lit. No button, no recap, no redirect. The existing recessive `✕ Close` stays available throughout, untouched.

4. **`openKeyReveal()` (~line 3438)** now defensively resets all rite elements (video/eyebrow opacity, fragments, instruction, departure line, ember) on open — guards against a mid-rite state surviving a re-open in the same page life. The existing "you already hold this key" branch (Keep/Close buttons) is untouched.

5. **Markup/CSS additions** inside `#keyReveal` (~line 1004, ~1041): `.kr-fragment` (rising/dissolving text), `#kr-rite-instruction`, `#kr-rite-depart`, `#kr-ember`. No new screens, no new overlays — everything lives inside the existing key-reveal surface.

**Explicitly not touched, per this session's scope:**
- No Grimoire storage of any kind — the compressed composition dropped the "Grimoire seals silently in background" line entirely, so no false-storage implication exists in copy or code.
- No candle asset, no CSS ember-as-candle — cut, not deferred.
- No synthesized bell sound — slot only.
- No Ganymede rite, no return-recognition moment, no fragment thread across visits.
- Dead code (`_venusSessionLine`, `enterVenusAltar`) left alone — not in scope.

**Testing before push:** `?sigil=1` / `window.testKeyReveal()` exercises the rite with one seeded fragment (auto-distill path). To test the multi-fragment choice path, seed `vHistory` with 2–3 assistant turns first (each with a distinct `affirmation`), then call `openKeyReveal()`.

**Next session, not started:** El's eyes should walk the live rite once pushed — confirm the dim/fragment/sink/departure timing reads as intended on a real device, and confirm the departure line lands as inevitable rather than instructive. Ganymede's version of this rite (same arc, his register — "the first stone is placed, go and build it") is the next candidate stone after that, not before.

---

## 5 July 2026 (evening) — Privacy audit closed · threshold vow shipped

**Audit verdict (verified in code + verified live + verified via Anthropic Console):**
- Browser: oracle conversation lives in memory only (`vHistory`), never written to `localStorage`. Gone on refresh/close.
- Proxy (`ancient-temenos-oracle` / `api/oracle.js`): zero logging statements, zero storage of any kind, only outbound call is to Anthropic. Confirmed live — a real oracle exchange produced no entry in Vercel Logs. No Log Drain exists (Hobby plan).
- Anthropic: org default retention is ON, 30 days; model-training/feedback sharing is OFF.
- `/api/remember` (Grimoire "Remembrance"): client-side trigger is dead code (`#gr-email` doesn't exist in the live DOM, `grRemember` has no call site). The server endpoint exists and would relay to Resend/your inbox if it ever fired — never Vercel logs, never a database. Flagged for a later hygiene pass (delete both sides); not urgent, not a live risk.
- **Net result:** nothing is stored by the temple, anywhere, and El has no dashboard or log that shows any visitor's oracle words. Anthropic's own 30-day backend window is the only place an exchange exists after the reply returns, and it is not used to train the model.

**Threshold vow — shipped this session (Venus, live path):**
> "What you share with the oracle is not kept by this temple, nor visible to its keeper."

- One line, Cormorant italic, quieter register than the invitation copy above it.
- Lives in `#va-invitation`, as a new `<p id="va-inv-vow">` immediately after `#va-inv-line3` (the "What brought you here today?" line).
- Fires once per chamber entry, from inside `vaOpenConversation()` — fades in at 1900ms, strictly between the existing line3 reveal (1400ms) and the existing input-wrap reveal (2600ms). Neither existing timing was changed.
- Cannot repeat mid-conversation: `vaOpenConversation()` is still guarded by `if(venusConvOpen)return;`, untouched. It can only fire again on a genuinely fresh threshold arrival (`venusConvOpen` reset when the visitor returns to `venusApproach`), never while a conversation is open.
- Scope: Venus only, for V1. Ganymede's rite gets the same treatment, same beat, when his rite is built — not done tonight.
- **Deliberately deferred (logged, not built):** the fuller factual disclosure — Anthropic's 30-day retention window, no-training confirmation, standard safety-review exception — behind a small "Privacy" link/overlay. This is a real trust/policy item for before public launch, just not part of tonight's minimal change.

**Full audit trail** (proxy source review, Vercel dashboard inspection, Anthropic Console check, wording stress-test) lives in the session transcript; this entry is the durable summary.

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

<!-- trigger fresh Pages deploy -->
