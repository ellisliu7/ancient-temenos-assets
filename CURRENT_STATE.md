# Ancient Temenos — Current State
**Last updated:** 30 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Session log — 30 June 2026 (Venus polish sprint #4: first-reply jump, real root cause found via live browser debugging)

The previous sprint's fix for the first-reply layout jump did not work — El correctly pushed back and asked for live, instrumented debugging instead of another theory. This session connected to a live Chrome browser, ran the actual site with mock mode, and traced every scrollTop/scrollHeight/clientHeight write and DOM mutation around the first Venus reply using injected instrumentation. Two real, independent bugs were found — not the one previously guessed at.

### Bug 1 (the actual primary cause): a regex was silently destroying Venus's paragraph breaks

vaRenderCard()'s cleanText() helper stripped leading whitespace/dashes/bullets per line using a regex with `\s` and the multiline flag. Because `\s` matches newlines, this was consuming the second newline of every blank-line paragraph separator in Venus's reply text — collapsing every multi-paragraph reply into a single paragraph block. Confirmed directly in the browser: a mock reply with 3 paragraphs in source was rendering as 1 DOM element. This meant the entire reply faded in as one large block almost instantly, rather than paragraph-by-paragraph as designed — and the late arrival of the separate question div (400ms after insertion) was what pushed the still-growing container past its scrollable threshold, producing the snap. This explains why only the first reply showed it: later replies already had enough prior content to already be scrollable before the new card arrived, so there was no scrollable-state transition left to trigger a snap.

**Fix:** narrowed the regex's character class to space/tab only (no newlines), preserving paragraph breaks while still stripping leading dashes/bullets/spaces per line as originally intended.

### Bug 2 (secondary, compounding): reading scrollHeight/clientHeight synchronously after DOM insertion returned stale geometry

Even after fixing the paragraph split, live instrumentation showed the panel's pin logic was reading scrollHeight/clientHeight immediately after appendChild, in the same synchronous tick — and those values did not yet account for the newly-inserted question block. This produced an undersized scroll ceiling on the first read (clamping to 0), which then got silently corrected about 400ms later when the first paragraph's reveal timeout called the pin function again with now-current geometry. That late correction was a second, independent source of jump.

**Fix:** build all paragraph elements and the question block in memory before the single DOM insertion, then force a synchronous reflow immediately after insertion (reading offsetHeight) before reading any geometry. This guarantees scrollHeight/clientHeight/offsetTop are final and correct on the very first read — no dependency on requestAnimationFrame timing, no stale-then-corrected sequence, one single write to the correct value.

### How this was verified (not theorized)

Connected to a live Chrome browser via the Claude in Chrome extension, navigated to the live site with mock mode enabled, and drove the real entry sequence (enterVenusApproach → vaArrive → vaOpenConversation) rather than skipping to the Venus oracle screen directly (an earlier debugging mistake — venusOracle and venusApproach are two different screens, and the real first-reply flow only happens in the latter). Instrumented va-glass's scrollTop property with a wrapped setter to log every write with the scrollHeight/clientHeight at that exact moment, and counted actual DOM children in the mirror element after each test. Ran the broken version first to capture the exact failure trace, then patched the live page in-place to test each candidate fix before ever touching the source file, including catching a false-positive verification caused by the test tab being backgrounded (which silently disables requestAnimationFrame — this is why the forced-reflow approach was chosen over an rAF-based one: it has no dependency on the browser ever scheduling a frame).

---

### Decisions locked in this sprint

**Debugging should observe before theorizing, especially for layout/timing bugs.** The previous sprint's fix addressed a real-but-secondary mechanism without ever confirming it against the actual DOM. This sprint's process — live browser, instrumented properties, actual measured traces — found the real cause in a few iterations and should be the default approach for any future "something visually jumps/flickers" report, rather than reasoning from source code alone.

**Forced synchronous reflow over requestAnimationFrame for this kind of pin-on-insert pattern.** rAF is correct in principle (it runs before paint), but it depends on the browser actually scheduling a frame promptly, which doesn't happen for backgrounded/hidden tabs. A real visitor's Venus tab is always focused and visible, so this wasn't a real production risk — but the forced-reflow approach is strictly more robust with no behavioral downside, so it was used instead.

---

### Current implementation state

**What changed this sprint (all inside vaRenderCard):**
- cleanText regex narrowed from matching any whitespace to matching only spaces and tabs — preserves paragraph breaks
- Paragraph and question elements are now built before the card is inserted into the document, rather than being appended to an already-inserted card
- A forced synchronous reflow is triggered immediately after insertion, before any geometry is read
- The scroll pin is now called directly and synchronously rather than via requestAnimationFrame

**Verified live, multiple runs, via direct browser instrumentation:**
- Mock replies now render all 2-3 paragraphs as separate DOM elements (previously collapsed to 1)
- scrollTop writes to its final correct value in a single write, with already-final scrollHeight/clientHeight at the moment of that write — no stale read, no later correction, no snap

**Not touched this sprint:** everything else. All previously open items carry forward unchanged (see below). Note: the Grimoire's clean function uses the same whitespace-based regex pattern and likely has the same paragraph-collapsing behavior — flagged but intentionally not touched this sprint, since it's a different feature and out of the stated scope (surgical fix to the Venus first-reply jump only).

---

## Current live status

| Feature | Status | Notes |
|---|---|---|
| Threshold | LIVE | Answer: love |
| Foyer — council debate | LIVE | 4-archetype debate, API-powered |
| Foyer — greeting sequence | LIVE | "Welcome home." sequence |
| Venus chamber | LIVE | First-reply jump root-caused and fixed this sprint via live debugging, verified with multiple instrumented browser runs |
| Venus — Sigil Key reveal | LIVE | No floating symbol — video is the sole key visual |
| Venus — Grimoire | LIVE | Single Return control, top-left, reliably routes to Foyer. Its text-cleaning function has a likely-related but untouched paragraph-collapsing regex bug (see above) |
| Ganymede chamber | LIVE | Full oracle, cave video, god rays |
| Ganymede — Chalice ending | LIVE | Unchanged |
| Persephone | PROTOTYPE ONLY | Standalone persephone-oracle.html; not in index.html |
| Psyche | NOT BUILT | — |
| Collective Memory | NOT BUILT | — |

---

## Asset reference

| Asset | File | Status |
|---|---|---|
| Ganymede ending environment | Chalice1.mp4 | CANONICAL. No longer loops. |
| Previous Chalice asset | Chalice.mp4 | RETIRED. |
| Sigil Key | Sigil_Key.mp4 | LIVE — sole visual on the key reveal page |
| Venus_Artwork.jpg | — | Not referenced in the key reveal. Still used elsewhere. |
| Portal chime | portal-chime.mp3 | DISABLED. |

---

## Open technical issues (carried forward, unchanged unless noted)

| Issue | Priority | Notes |
|---|---|---|
| Council routes to enterVenusAltar() instead of enterVenusApproach() | HIGH | 2-line fix — verify current line numbers before next Venus sprint |
| window.__test* shortcuts ungated in production | HIGH | Security |
| URL params grant access with no auth | HIGH | Security |
| Vercel proxy: client can supply model/max_tokens/system prompt | HIGH | Security |
| XSS vectors in innerHTML in oracle chat and Grimoire | MEDIUM | Security |
| Mock params active in production | MEDIUM | Security |
| Grimoire's clean function likely has the same paragraph-collapsing regex bug as Venus's old cleanText | MEDIUM | New this sprint — flagged, not fixed (out of scope) |
| Dead code, orphaned ritual DOM | LOW | Ganymede — not urgent |
| Orphaned CSS rule | LOW | Since two sprints ago, harmless |
| Mock cards / error-fallback fields inert | LOW | Data exists but is never rendered |
| Ghost code: dead Venus functions | LOW | Still dead, not wired to any HTML |

---

## Next sprints — in order

1. **Security hardening** — gate test shortcuts, clamp model/max_tokens server-side, address XSS, disable mock params in production
2. **Grimoire text-cleaning regex check** — verify whether the same paragraph-collapsing bug affects the Grimoire's sealed text rendering
3. **Persephone integration** into the main file (waiting on visual assets)
4. **Collective Memory** — POST endpoint, fragment input in Grimoire, accumulate invisibly
5. **Cleanup pass (low priority)** — remove dead code, orphaned ritual DOM, ghost Venus functions, orphaned CSS, inert mock/fallback fields

---

## Architecture reference

- **File:** single index.html, all CSS/JS inline
- **Repo:** ellisliu7/ancient-temenos-assets (public, GitHub Pages)
- **Domain:** ancienttemenos.art
- **Oracle proxy:** private Vercel repo
- **Typography:** Cinzel (structure, labels), Cormorant Garamond (body, oracle, poetry), Almendra (character names)
- **Design docs:** in repo root
- **Debugging note:** the real first-reply entry path goes through a scroll-scrub video arrival sequence landing on a screen distinct from an older/parallel Venus screen — confirm which path is live before debugging Venus-entry issues in future sessions.
