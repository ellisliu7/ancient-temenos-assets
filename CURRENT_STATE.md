# Ancient Temenos — Current State
**Last updated:** 30 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Session log — 30 June 2026 (Venus polish sprint #2: kybalion removed, key reveal cleared, Grimoire return fixed)

Three small fixes from a second Venus playthrough, following directly from last session's polish pass. Nothing outside these three was touched.

**1. Kybalion line removed from Venus oracle replies.** Every Venus reply rendered mirror text → a one-line Kybalion quote → a question — three layers of text on every turn. Per El's instinct (and the BIBLE's own "whispers, never shouts" principle), the quote is gone. `VSYS`'s JSON schema no longer requests a `kybalion` field, and `vaRenderCard()` no longer renders one. Mirror now flows directly to the question. The separate "Teachings — 7 Hermetic Principles" feature elsewhere in the temple is untouched; this was only the per-message quote inside the live conversation.

**2. Star glyph removed from the Sigil Key page.** Last sprint's fix for the Venus-artwork-blocking-the-key issue replaced the artwork with a floating glyph as the "hero" — but that glyph was itself sitting on top of `Sigil_Key.mp4`, which is already the actual key visual playing as the page's video background. The glyph was the new obstruction. Removed entirely; `#kr-key-wrap` is now just empty spacing above the headline, and the video is the only visual. The collection moment (`collectKey()`) no longer pulses a glyph — it now triggers a brief warmth-pulse on the video's scrim overlay instead, so collecting still has a felt confirmation without reintroducing a competing symbol.

**3. Grimoire Return fixed — one control, top-left, goes home.** The actual bug: the global top-left return button (z-index 100) stayed visible and clickable above the Grimoire overlay (z-index 95) while Grimoire was open, but clicking it only flashed back to the same underlying screen — it never closed the Grimoire panel itself, so the visitor appeared stuck behind it. Meanwhile the Grimoire's own working close button sat top-right, creating the duplicate-control confusion. Fixed by: hiding the global return button whenever Grimoire opens, moving the Grimoire's own Return control to top-left with the same arrow-icon style as the global nav, and removing the top-right placement. `closeGrimoire()` now restores the global return button correctly on the Ganymede-cave branch (where the normal screen-transition function isn't called) and continues to route Venus/council contexts home to the Foyer as fixed last sprint.

---

### Decisions locked in this sprint

**The Kybalion teaching stays a separate, optional feature — not part of the live conversational rhythm.** If a future sprint wants philosophical depth back inside the chamber, it should be considered as its own deliberate moment (perhaps offered once, not per-turn), not restored to every exchange by default.

**The Sigil Key reveal has no floating symbol of any kind now.** Two sprints in a row removed a different "hero" visual sitting over the key (artwork, then glyph) — the video itself is the key. Any future addition to this screen should be weighed against this pattern before being added.

**Grimoire always has exactly one Return control, and it always goes to the Foyer** (except mid-Ganymede-session, where it stays in the cave, matching the chamber's own pattern of keeping the visitor inside an unfinished conversation). This is now structurally enforced — the global nav button hides itself whenever Grimoire is open — not just a styling choice.

---

### Current implementation state

**What changed this sprint (all in `index.html`):**
- `VSYS` — `kybalion` field removed from schema (~line 1930)
- `vaRenderCard()` — kybalion rendering removed, question reveal timing simplified (~line 1778)
- `#kr-key-wrap` markup — glyph removed, now empty spacing div (~line 1032)
- `#kr-scrim` — new `.pulse` class + `krScrimPulse` keyframe for collection feedback
- `collectKey()` — pulse target changed from glyph to scrim (~line 3420)
- `.gr-close` CSS — repositioned top-left, matched to global nav style, z-index raised to 100
- Grimoire markup — close button now uses the same arrow-icon + "Return" pattern as the global nav
- `openGrimoire()` — now hides global return button on open
- `closeGrimoire()` — restores global return button on the Ganymede-cave branch

**Not touched this sprint (still open, carried forward):**
- `window.__test*` shortcuts ungated in production
- `?key=1` / `?sigil=1` URL params grant access with no auth
- Vercel proxy accepts client-supplied model/max_tokens/system prompt unclamped
- XSS vectors via `innerHTML` in oracle chat display and Grimoire
- `?mock=*` params active in production
- Ghost code: `sendVenus`/`renderVCard`/`addUserMsg`, `initVenusSculpture`/`_buildVenusSculpture` — still dead, not wired to any HTML. Note: these still reference `kybalion` in their data objects but are unreachable, so left as-is.
- Mock-mode Venus cards and the `sendVenusNew` catch-error fallback still construct a `kybalion` field in their data objects — harmless since `vaRenderCard` no longer reads it, but flagged for a future cleanup pass if anyone wants the mock data fully tidied
- `stillnessGate()` dead code, orphaned `#g-ritual` DOM (Ganymede)
- `#kr-key-img` CSS rule — orphaned since last sprint, still unused, still harmless

---

## Current live status

| Feature | Status | Notes |
|---|---|---|
| Threshold | LIVE | Answer: love |
| Foyer — council debate | LIVE | 4-archetype debate, API-powered |
| Foyer — greeting sequence | LIVE | "Welcome home." sequence |
| Venus chamber | LIVE | This sprint: kybalion line removed from replies, simpler mirror→question rhythm |
| Venus — Sigil Key reveal | LIVE | No floating symbol of any kind now — video is the sole key visual |
| Venus — Grimoire | LIVE | Single Return control, top-left, reliably routes to Foyer |
| Ganymede chamber | LIVE | Full oracle, cave video, god rays |
| Ganymede — Chalice ending | LIVE | Unchanged this sprint |
| Persephone | PROTOTYPE ONLY | Standalone persephone-oracle.html; not in index.html |
| Psyche | NOT BUILT | — |
| Collective Memory | NOT BUILT | — |

---

## Asset reference

| Asset | File | Status |
|---|---|---|
| Ganymede ending environment | `Chalice1.mp4` | CANONICAL. No longer loops. |
| Previous Chalice asset | `Chalice.mp4` | RETIRED. |
| Sigil Key | `Sigil_Key.mp4` | LIVE — now the sole visual on the key reveal page (no glyph or artwork layered over it) |
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
| `#kr-key-img` CSS rule orphaned | LOW | Since prior sprint, harmless |
| Mock cards / error-fallback `kybalion` fields now inert | LOW | New this sprint, harmless — data exists but is never rendered |
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
