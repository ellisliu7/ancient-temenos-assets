# Ancient Temenos — Current State
**Last updated:** 29 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Session log — 29 June 2026 (Ganymede ending: environmental installation sprint)

### The fundamental shift

The Ganymede ending has been architecturally retired and rebuilt from the ground up.

**What was there before:** A webpage-style ending — CSS cave background layers, masked Chalice MP4 floating inside a text zone, staggered HTML elements fading in at timed intervals, two equal-weight buttons. Interface assembled to simulate an environment.

**What is there now:** The browser is a window into a chamber. `Chalice1.mp4` — a full 16:9 cave render with the Chalice on its plinth, architecture, god rays, and foreground stone floor — fills the entire viewport. Nothing is simulated in CSS. The room itself carries the emotional weight.

**This is not a visual polish change. It is a structural decision about what kind of experience the ending is.**

The previous architecture (3-layer CSS radial gradient, SVG noise, vignette, masked MP4, `#ch-text` zone with 7 children, staggered setTimeout sequence) has been removed entirely. The new architecture is: one fullscreen `<video>`, one `<canvas>` for the inscription, two minimal controls (close, brand). The DOM shrank from ~36 lines to ~8 visible elements.

---

### Decisions locked in this sprint — do not revisit without strong reason

**The room is the experience.** The empty cave, the silence before anything appears, the Chalice waiting in the light — these are not placeholders. They are the content. Do not fill the space with interface.

**The environment is the hero.** `Chalice1.mp4` should never be cropped, masked, constrained to a zone, or overlaid with decorative CSS. It fills the browser. The browser disappears.

**Silence is structural.** The 2-second pause before anything appears, and the 3-second pause before the inscription emerges, are not loading states. They are the threshold. Protect them.

**The inscription belongs to the architecture, not the interface.** It will be rendered on a canvas, positioned to sit on the foreground floor slab of the specific render, anchored to the stone rather than centred in the viewport. This decision is irreversible — going back to HTML elements fading over video would immediately read as a webpage again.

**Metadata has been removed permanently.** No artifact IDs, no dates, no chamber labels, no "Chalice of Ganymede" headers, no download metadata. The relic is the experience. The inscription is the only text in the room.

**The benediction is fixed.** *"Some gifts cannot be given. Only remembered."* This line is set. It does not explain, it does not instruct, it holds space for the visitor's own meaning. Do not change it without El's explicit decision.

---

### Current implementation state

**What is working:**
- `Chalice1.mp4` loads and fills the viewport as a fullscreen environment
- Video buffers on page init via `cv.load()` even while parent is `display:none` — solves the black screen problem
- Canvas inscription renders with three layers: benediction (two lines, Cinzel), tikkun (Cormorant italic, generated from conversation), KEEP THE CHALICE (Cinzel, smallest)
- Inscription positioned at `CH_CX: 0.48, CH_BY: 0.76` — slightly left of viewport centre, lower third, following the floor slab in the render
- `stillnessGate()` simplified: 4-second silence only, no text in the transition; first words land on the Chalice screen
- Mock route `?mock=ganychalice` working

**What is in review — not final:**
- Inscription placement (`CH_CX`, `CH_BY`, `CH_SCALE`) is a composition pass only. Position, scale, and perspective are not approved.
- Inscription is currently at elevated opacity (`0.55`) for placement review. Final opacity will be much lower — almost imperceptible without the gold reveal.
- No cursor interaction wired yet. The gold-reveal mechanic (cursor proximity lifts tarnished gold out of the carved stone) is designed but not implemented.
- "KEEP THE CHALICE" is not yet a functional interaction in the new architecture. The invisible hit zone (`#ch-floor-hit`) exists but needs to be positioned programmatically against the canvas CTA line.

**Three tuning constants — the only numbers to touch during placement review:**
```javascript
const CH_CX    = 0.48;  // horizontal centre (0.44–0.52)
const CH_BY    = 0.76;  // top of inscription block (0.68–0.80)
const CH_SCALE = 1.0;   // master size scalar (0.85–1.15)
```

---

### Open questions for next sprint — in order

1. **Final inscription placement.** Is `CH_CX: 0.48, CH_BY: 0.76` correct? Does it sit on the stone or float above it? Does the scale feel appropriate for the chamber? Answer this with eyes before touching code.

2. **Copy hierarchy.** The benediction splits across two lines. Does this feel right carved in stone, or would one line read better? The tikkun wraps at `maxW: W * 0.30` — is this the right line length for the slab?

3. **The gold-reveal mechanic.** Once placement is approved, wire the cursor-proximity interaction. The design is: cursor drifts toward the lower frame, a broad warm radial (not a spotlight) slowly lifts tarnished gold from inside the carved grooves. The offscreen canvas / `destination-in` compositing architecture is already written in the JS — it just needs to be activated. Key constraint: it must feel like atmospheric light response, not a UI effect. Easing: `0.032` lerp per frame. Radius: generous.

4. **KEEP THE CHALICE as architecture.** The last line of the inscription is the action. The invisible hit zone (`#ch-floor-hit`) needs to be positioned against `canvas._ctaY` after each draw. The cursor should change to `pointer` only over that zone, with no visible button.

5. **Continue removing.** After the gold reveal is wired, do one more pass asking: what else can be removed? The close button and brand label are the only remaining interface elements. Do they need to be there from the start, or can they appear only on interaction?

---

## Current live status

| Feature | Status | Notes |
|---|---|---|
| Threshold | LIVE | Answer: love |
| Foyer — council debate | LIVE | 4-archetype debate, API-powered |
| Foyer — greeting sequence | LIVE | "Welcome home." sequence |
| Venus chamber | LIVE | Full oracle, video corridor, artwork card |
| Venus — Sigil Key reveal | LIVE | Key screen, canvas PNG download |
| Venus — Grimoire | LIVE | Sealed to Venus chamber specifically |
| Ganymede chamber | LIVE | Full oracle, cave video, god rays |
| Ganymede — Chalice ending | LIVE (composition review) | New environmental architecture; placement not final |
| Persephone | PROTOTYPE ONLY | Standalone persephone-oracle.html; not in index.html |
| Psyche | NOT BUILT | — |
| Collective Memory | NOT BUILT | — |

---

## Asset reference

| Asset | File | Status |
|---|---|---|
| Ganymede ending environment | `Chalice1.mp4` | CANONICAL — pushed 29 June 2026. Full 16:9 cave render with Chalice, architecture, god rays. |
| Previous Chalice asset | `Chalice.mp4` | RETIRED. Spinning Chalice on baked dark background. No longer referenced in code. |
| Sigil Key | `Sigil.mp4` | LIVE — re-export candidate (baked background) |

---

## Open technical issues (unchanged from previous sprint)

| Issue | Priority | Notes |
|---|---|---|
| Council routes to `enterVenusAltar()` instead of `enterVenusApproach()` | HIGH | 2-line fix at ~lines 3034 and 3181 |
| `window.__test*` shortcuts ungated in production | HIGH | Security |
| `?key=1` and `?sigil=1` URL params grant access with no auth | HIGH | Security |
| Vercel proxy: client can supply `model`/`max_tokens`/system prompt | HIGH | Security |
| XSS vectors in `innerHTML` in oracle chat and Grimoire | MEDIUM | Security |
| `?mock=*` params active in production | MEDIUM | Security |
| Venus UX — key label reads `VEN` not `VENUS` | LOW | Cosmetic |
| Venus UX — CTA auto-advances before user finishes reading | LOW | Timing |

---

## Next sprints — in order

1. **Ganymede ending: final placement + gold reveal** — approve inscription position, drop opacity to final stone treatment, wire cursor proximity reveal
2. **Security hardening** — gate `window.__test*`, clamp model/max_tokens server-side, address XSS, disable `?mock=*` in production
3. **Venus UX polish** — key label, CTA timing, oracle position jump (three issues, single session)
4. **Persephone integration** into `index.html` (waiting on visual assets)
5. **Collective Memory** — POST endpoint, fragment input in Grimoire, accumulate invisibly

---

## Architecture reference

- **File:** single `index.html`, ~4738 lines, all CSS/JS inline
- **Repo:** `ellisliu7/ancient-temenos-assets` (public, GitHub Pages)
- **Domain:** `ancienttemenos.art`
- **Oracle proxy:** `ancient-temenos-oracle.vercel.app/api/oracle` (private Vercel repo)
- **Formspree:** `xkoakgkk` (collector enquiry)
- **Mock routes:** `?mock=venus`, `?mock=ganymede`, `?mock=ganychalice`, `?mock=key`, `?mock=ganygrimoire`, `?dev=1`, `?sigil=1`
- **Typography:** Cinzel (structure, labels) · Cormorant Garamond (body, oracle, poetry) · Almendra (character names)
- **Design docs:** `DESIGN_PRINCIPLES.md`, `DESIGN_LANGUAGE.md` — in repo root
