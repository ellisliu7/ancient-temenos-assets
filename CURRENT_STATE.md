# Ancient Temenos — Current State
**Last updated:** 30 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Session log — 30 June 2026 (Venus polish sprint #3: first-reply layout jump, surgical fix)

One bug, one fix. El reported the very first oracle reply still had a layout jump mid-stream — everything after that felt stable, only the first transition was off.

**Root cause:** `#va-glass` has `max-height:80vh; overflow-y:auto`. On the very first reply, the panel's content (invitation block + the still-short new card) starts out *shorter* than 80vh, so the container isn't scrollable yet — `scrollTop` is clamped to 0 no matter what value `vaRenderCard()`'s pinning logic tried to set it to. As the first reply's paragraphs streamed in and total content height crossed the 80vh threshold partway through, the container became scrollable for the first time mid-stream, and the previously-inert `scrollTop` assignment suddenly took effect — snapping the view to the pinned anchor in one visible jump, right as the visitor was reading. On every later reply, the container is already overflowing *before* the new card is even inserted, so the same pinning logic behaves consistently from the first reveal tick — which is why only the first message ever showed the jump.

**Fix:** `vaRenderCard()`'s anchor-capture and `pin()` function both now clamp the target `scrollTop` to the container's actual scrollable range (`Math.min(anchorTop, scrollHeight - clientHeight)`) instead of setting `anchorTop` directly. This clamp evaluates near-zero while the panel is shorter than its max height (matching the natural `scrollTop:0` it would already be at) and converges smoothly to the real anchor as content grows past the viewport — so there is no longer a moment where scrolling silently "turns on" and snaps.

**Scope:** two lines changed inside `vaRenderCard()`, nothing else. No pacing, typography, or layout changes, per request.

---

### Current implementation state

**What changed this sprint:**
- `vaRenderCard()` — `pin()` function and the initial `requestAnimationFrame` scroll-capture both now clamp `scrollTop` to `scrollHeight - clientHeight` (~line 1788)

**Not touched this sprint:** everything else. All previously open items from sprint #1 and #2 carry forward unchanged (see below).

---

## Current live status

| Feature | Status | Notes |
|---|---|---|
| Threshold | LIVE | Answer: love |
| Foyer — council debate | LIVE | 4-archetype debate, API-powered |
| Foyer — greeting sequence | LIVE | "Welcome home." sequence |
| Venus chamber | LIVE | First-reply scroll jump fixed this sprint. Considered complete by El pending this verification. |
| Venus — Sigil Key reveal | LIVE | No floating symbol of any kind — video is the sole key visual |
| Venus — Grimoire | LIVE | Single Return control, top-left, reliably routes to Foyer |
| Ganymede chamber | LIVE | Full oracle, cave video, god rays |
| Ganymede — Chalice ending | LIVE | Unchanged |
| Persephone | PROTOTYPE ONLY | Standalone persephone-oracle.html; not in index.html |
| Psyche | NOT BUILT | — |
| Collective Memory | NOT BUILT | — |

---

## Asset reference

| Asset | File | Status |
|---|---|---|
| Ganymede ending environment | `Chalice1.mp4` | CANONICAL. No longer loops. |
| Previous Chalice asset | `Chalice.mp4` | RETIRED. |
| Sigil Key | `Sigil_Key.mp4` | LIVE — sole visual on the key reveal page |
| Venus_Artwork.jpg | — | Not referenced in the key reveal. Still used elsewhere (foyer altar, Venus corridor). |
| Portal chime | `portal-chime.mp3` | DISABLED (`SOUND_ENABLED = false`). |

---

## Open technical issues (carried forward, unchanged unless noted)

| Issue | Priority | Notes |
|---|---|---|
| Council routes to `enterVenusAltar()` instead of `enterVenusApproach()` | HIGH | 2-line fix — verify current line numbers before next Venus sprint |
| `window.__test*` shortcuts ungated in production | HIGH | Security |
| `?key=1` and `?sigil=1` URL params grant access with no auth | HIGH | Security |
| Vercel proxy: client can supply `model`/`max_tokens`/system prompt | HIGH | Security |
| XSS vectors in `innerHTML` in oracle chat and Grimoire | MEDIUM | Security |
| `?mock=*` params active in production | MEDIUM | Security |
| `stillnessGate()` dead code, orphaned `#g-ritual` DOM | LOW | Ganymede — not urgent |
| `#kr-key-img` CSS rule orphaned | LOW | Since two sprints ago, harmless |
| Mock cards / error-fallback `kybalion` fields inert | LOW | Data exists but is never rendered |
| Ghost code: `sendVenus`/`renderVCard`/`addUserMsg`, `initVenusSculpture`/`_buildVenusSculpture` | LOW | Still dead, not wired to any HTML |

---

## Next sprints — in order

1. **Security hardening** — gate `window.__test*`, clamp model/max_tokens server-side, address XSS, disable `?mock=*` in production
2. **Persephone integration** into `index.html` (waiting on visual assets)
3. **Collective Memory** — POST endpoint, fragment input in Grimoire, accumulate invisibly
4. **Cleanup pass (low priority)** — remove dead `stillnessGate()`, orphaned ritual DOM, ghost Venus functions, orphaned `#kr-key-img` CSS, inert `kybalion` fields in mock/fallback data

---

## Architecture reference

- **File:** single `index.html`, ~4874 lines, all CSS/JS inline
- **Repo:** `ellisliu7/ancient-temenos-assets` (public, GitHub Pages)
- **Domain:** `ancienttemenos.art`
- **Oracle proxy:** `ancient-temenos-oracle.vercel.app/api/oracle` (private Vercel repo)
- **Formspree:** `xkoakgkk` (collector enquiry)
- **Mock routes:** `?mock=venus`, `?mock=ganymede`, `?mock=ganychalice`, `?mock=key`, `?mock=ganygrimoire`, `?dev=1`, `?sigil=1`
- **Typography:** Cinzel (structure, labels) · Cormorant Garamond (body, oracle, poetry) · Almendra (character names)
- **Design docs:** `DESIGN_PRINCIPLES.md`, `DESIGN_LANGUAGE.md` — in repo root
