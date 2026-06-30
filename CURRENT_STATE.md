# Ancient Temenos — Current State
**Last updated:** 30 June 2026
**Status:** Version 1 — closed. Next sprint priorities pending a separate first-time-visitor review (Claude Opus, full journey audit) currently in progress.
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Read this first if you're picking this up cold

This file is written so another engineer (or another Claude session) can resume work tomorrow with zero prior context. The codebase is a single `index.html`, ~4885 lines, all CSS/JS inline, deployed via GitHub Pages. There is no build step. El (the project owner) pushes via GitHub Desktop after each session.

**Before touching anything:** always fetch the live file from `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html` — never trust a local copy, it's always stale. Navigate the file via `grep -n` + line-range reads, never a full read; it's too large.

**One intermittent issue was observed on the homepage during this session** — see "Known Issue #1" below. It was investigated and a plausible cause was identified, but the issue resolved on its own without any code changes, so it's documented as something to monitor rather than a confirmed bug to fix. Do not change the suspected URL unless the issue is reliably reproduced again — that's an explicit decision from El.

---

## Version 1 — what shipped

### Ganymede ending (Chalice flow) — shipped prior to this session, confirmed still live and correct
- Sacred Contract form is no longer a gate or a required CTA. It survived only as a quiet, optional footnote (`// Sacred Contract form is gone. Not a CTA — a footnote.`, line ~1137) — visitors are never blocked by it.
- The Chalice gift now arrives automatically as part of the Ganymede ending sequence (`ganyRitual` → `openChaliceReveal()`), not behind any form submission.
- "Keep the Chalice" ritual (`keepChalice()`) is a state change, not a file download — `_chKept` flag, canvas opacity dip-and-return animation, inscription settles permanently once accepted. No PNG export, matching the project's "download ≠ ritual" principle.
- Return flow (`closeChaliceReveal()`) is clean: restores global nav controls, then `flashTo()` carries the visitor to the Foyer with `councilReset()`. One dark transition, not two — the Chalice overlay hides directly underneath the flash rather than fading on its own separate timeline.

### Venus polish (this and prior sessions in this thread) — all confirmed present and correct in the current live file
- **Streaming layout stability (root cause found and fixed this session):** the real bug was a regex in `vaRenderCard()`'s text-cleaning step that used `\s` (matches newlines) with the multiline flag, silently collapsing the blank-line paragraph separators in Venus's replies — a 3-paragraph reply was rendering as a single DOM paragraph. This was confirmed by live, instrumented browser debugging (not theory): counting actual `.va-mirror` child elements showed 1 instead of 3. Fixed by narrowing the regex's character class to space/tab only. A second, compounding bug — reading `scrollHeight`/`clientHeight` synchronously in the same tick as DOM insertion, which can return stale geometry — was also fixed by forcing a synchronous reflow (`void d.offsetHeight`) immediately after insertion, before computing the scroll-pin target. Both fixes were verified with multiple live runs using an instrumented `scrollTop` setter in a connected Chrome browser, confirming a single correct write with no stale-then-corrected jump.
- **Kybalion line removed** from every Venus oracle reply. Previously every turn rendered mirror text → a one-line Kybalion quote → a question; the quote layer is gone from both the `VSYS` schema and `vaRenderCard()`'s render path. Mirror now flows directly to the question. The separate "Teachings — 7 Hermetic Principles" feature elsewhere in the temple is untouched.
- **Declarative ending, no trailing question.** Venus's final reply (the one that triggers the closing sequence) has its `question` field suppressed before rendering, so the visitor's last read from her is reflection, not a question, immediately before the declarative closing line ("You already know what to do with this.").
- **Closing CTA order and reveal timing fixed.** "Receive your first key" is both first in DOM order and first to visually reveal (6s), with the Grimoire/Return row revealing after (9.2s) — previously the reveal timing had this backwards even though DOM order was already correct.
- **Sigil Key reveal has no floating symbol of any kind.** Two different "hero" visuals were tried and removed across two sprints (the Venus artwork image, then a floating star glyph) — both were found to be obstructing the actual key visual, which is the `Sigil_Key.mp4` video itself. The video is now the only thing on that screen. The "collect" moment triggers a brief warmth-pulse on the video's scrim overlay instead of pulsing a symbol.
- **Grimoire has exactly one Return control.** Previously a global top-left nav button stayed visible above the Grimoire overlay but didn't actually close it, while a separate working close button sat top-right — producing both a "stuck" bug and a duplicate-control bug simultaneously. Fixed: the global return button now hides whenever Grimoire opens, and the Grimoire's own close control moved to top-left with the same arrow-icon style as the rest of the temple's nav. It reliably routes to the Foyer (except mid-Ganymede-session, where it correctly stays in the cave, matching that chamber's existing pattern).

### Navigation consistency
- Single Return control pattern (top-left, arrow icon, routes home) is now consistent across Grimoire and Chalice.
- Venus and Ganymede chamber entry/exit flows both route cleanly to the Foyer via `flashTo()` + `councilReset()`.

---

## Known issues

### #1 — Homepage hero video: intermittent load failure (MEDIUM — observed, not reliably reproducible, monitor only)
**Symptom observed during this session:** the homepage background video did not appear; only the "ANCIENT TEMENOS" title, subtitle, and "ENTER THE SANCTUARY" button were visible against a black background.

**Investigation findings:** line 585 of `index.html` sources the homepage hero video from `https://cdn.jsdelivr.net/gh/ellisliu7/ancient-temenos-assets@latest/Main_Page.mp4` — using jsDelivr's `@latest` tag-resolution mode. The repository has zero git tags (confirmed via GitHub API), so `@latest` has nothing valid to resolve against in principle. During the investigation, live network capture on the production site showed this exact URL intermittently returning `503`, and a direct navigation to it in a fresh browser tab timed out with jsDelivr's own "503 Request timedout" page. The same file, requested from `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/Main_Page.mp4` (the URL pattern every other video on the site uses), returned a clean `200` with a healthy 4.58MB file. No JS errors, no console warnings, no hero-initialization failure of any kind were found — whatever is happening is at the network/CDN layer, not in the page's code.

**Important update:** after the investigation, the homepage video loaded successfully again on its own, with no code changes made. This means the `@latest`-with-no-tags theory, while plausible and consistent with what was observed in the moment, is not confirmed as the actual cause — jsDelivr's behavior here is evidently not consistently broken, just intermittently flaky. Three other assets on the site (`Venus_Altar_Video.mp4`, `Venus Wishing Well_1.mp4`, `Sigil.mp4`, `Sigil_Key_Luminous.png`) use jsDelivr's `@main` mode rather than `@latest` and have not shown this symptom, which is suggestive but not proof.

**Status: do not change the URL yet.** El's call: this should be treated as something to monitor, not a confirmed launch blocker, until it can be reliably reproduced. If it recurs, the fix on hand (untested in production, ready if needed) is changing line 585's source to `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/Main_Page.mp4`, matching the pattern every other video on the site uses successfully. Worth deciding at that point whether to also standardize the three `@main`-jsDelivr assets onto `raw.githubusercontent.com` for consistency, or leave them as-is since they haven't shown problems.

### #2 — Council debate routing (status downgraded from prior "open" — appears already resolved)
Previously tracked as a bug (`enterVenusAltar()` being called instead of `enterVenusApproach()`). On inspection this session, every live call site (council debate routing, mock-mode shortcuts, direct foyer entry) correctly calls `enterVenusApproach()`. `enterVenusAltar()` still exists in source but is explicitly marked dormant (`// DORMANT — preserved as future relic path`) and is not called from anywhere live. No action needed; downgrading this from the open-issues list.

---

## Remaining technical debt (not blocking, not part of Version 1 scope)

| Issue | Priority | Notes |
|---|---|---|
| `window.__test*` shortcuts ungated in production | HIGH (security) | Console-accessible test/dev commands work on the live site for anyone |
| `?key=1` / `?sigil=1` / `?mock=*` URL params grant access or bypass the API with no auth | HIGH (security) | Live in production |
| Vercel oracle proxy accepts client-supplied `model`/`max_tokens`/system prompt | HIGH (security) | No server-side clamping |
| XSS surface via `innerHTML` (39 occurrences across oracle chat rendering and Grimoire) | MEDIUM (security) | Not exploited, but unsanitized user-influenced text reaches `innerHTML` in multiple places |
| Grimoire's `clean()` text function likely has the same whitespace-collapsing regex bug Venus's `cleanText()` had before this session's fix | MEDIUM | Flagged, not verified or fixed — same pattern, different function, different feature |
| Asset URL inconsistency: some videos on `raw.githubusercontent.com`, some on jsDelivr `@main` | LOW | Works either way; worth standardizing for maintainability, not urgency |
| `stillnessGate()` dead code, orphaned `#g-ritual` DOM (Ganymede) | LOW | Not wired to anything live |
| Orphaned `#kr-key-img` CSS rule | LOW | Unused since the Sigil Key visual was simplified to video-only |
| Mock-mode cards / error-fallback objects still construct an inert `kybalion` field | LOW | Harmless — the field exists in data but is never read or rendered |
| Ghost code: `sendVenus`/`renderVCard`/`addUserMsg`, `initVenusSculpture`/`_buildVenusSculpture` | LOW | Dead, not wired to any HTML, safe to remove whenever a cleanup pass happens |
| `enterVenusAltar()` dormant function | LOW | Intentionally preserved per source comment as a "future relic path" — leave as-is unless told otherwise |

---

## Architecture reference

- **File:** single `index.html`, ~4885 lines, all CSS/JS inline, no build step
- **Repo:** `ellisliu7/ancient-temenos-assets` (public, GitHub Pages). No git tags exist on this repo (relevant to Known Issue #1).
- **Domain:** `ancienttemenos.art`
- **Oracle proxy:** `ancient-temenos-oracle.vercel.app/api/oracle` (private Vercel repo, separate from the public assets repo)
- **Asset hosting:** primarily `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/...`; a few assets also live on jsDelivr (`cdn.jsdelivr.net/gh/ellisliu7/ancient-temenos-assets@main/...` — note `@main`, not `@latest`)
- **Formspree:** `xkoakgkk` (collector enquiry)
- **Mock/dev routes (ungated in production — see technical debt table):** `?mock=venus`, `?mock=ganymede`, `?mock=ganychalice`, `?mock=key`, `?mock=ganygrimoire`, `?dev=1`, `?sigil=1`, plus `window.__test*` console commands (full list around line 4460 of `index.html`)
- **Typography (locked, do not change):** Cinzel — sacred structure labels; Cormorant / Cormorant Garamond — body, oracle speech, italic poetry; Almendra — character names only
- **Design docs in repo root:** `DESIGN_PRINCIPLES.md`, `DESIGN_LANGUAGE.md`, `ARTIST_POSITIONING.md`

### Screen/flow map (for anyone debugging entry sequences)
- Real Venus entry path: `enterVenusApproach()` → scroll-scrubbed video corridor → `vaArrive()` → `vaOpenConversation()`, landing on the `venusApproach` screen.
- `venusOracle` / `enterVenusOracle()` is a separate, older/parallel screen — not the live path. Confirm which one you're actually testing before debugging Venus-entry issues; this distinction caused a wasted debugging cycle earlier in this project's history.
- Ganymede ending path: `ganyRitual` → `openChaliceReveal()` → (optional) `keepChalice()` → `closeChaliceReveal()` → Foyer.
- Both Venus and Ganymede route to Grimoire via `openGrimoire(forceMode)`; `closeGrimoire()` branches on `currentScreen` to stay in the Ganymede cave or return to the Foyer for everything else.

---

## Chambers status

| Chamber | Status |
|---|---|
| Threshold | LIVE — riddle entry, answer: love |
| Foyer — council debate | LIVE — 4-archetype real-time debate, API-powered |
| Venus | LIVE — considered feature-complete for Version 1 pending the Opus review |
| Ganymede | LIVE — considered feature-complete for Version 1 pending the Opus review |
| Persephone | PROTOTYPE ONLY — standalone `persephone-oracle.html`, not integrated into `index.html`, waiting on visual assets |
| Psyche | NOT BUILT |
| Collective Memory | NOT BUILT — architecture designed, not started |

---

## Next steps

1. **Wait for the Opus first-time-visitor journey review** before prioritizing further work. That review's findings should drive the next sprint's order of operations.
2. **Monitor the homepage hero video** (Known Issue #1). If it fails to load again, that's the point to reproduce it deliberately (reload a few times, check network requests for `Main_Page.mp4`) before deciding whether to apply the standby fix. Don't change the URL preemptively.
3. Everything else in the technical debt table is unprioritized until the review comes back.
