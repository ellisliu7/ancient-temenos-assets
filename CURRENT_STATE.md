# Ancient Temenos — Current State
**Last updated:** 29 June 2026
**Source of truth:** `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
**Live URL:** `https://ancienttemenos.art`

---

## Strategic direction — set 29 June 2026

### The scene problem

After multiple refinement sprints on individual screens, a larger pattern became clear: Ancient Temenos sometimes still feels like pages with components rather than inhabitable scenes. Polishing individual elements without a shared design foundation produces diminishing returns.

**Next sprint priority:** Before any further screen-level work, create two foundational documents:

- `DESIGN_PRINCIPLES.md` — the philosophical and emotional rules that govern every design decision in Ancient Temenos. What a scene is. What silence means. What the temple is allowed to do. What it never does. These are not aesthetic preferences — they are load-bearing constraints.
- `DESIGN_LANGUAGE.md` — the concrete technical vocabulary that implements those principles. Typography scales, colour values, motion timing, spatial rhythm, layer architecture, the difference between a background and an atmosphere.

These documents exist so that every future sprint — whether building Persephone, adding a relic, or refining the foyer — starts from the same understood language rather than rediscovering it chamber by chamber.

---

## Current live status

| Feature | Status | Notes |
|---|---|---|
| Threshold | LIVE | Answer: love |
| Foyer — council debate | LIVE | 4-archetype debate, API-powered |
| Foyer — greeting sequence | LIVE | "Welcome home." + placeholder at higher opacity; ellipses removed from all oracle inputs |
| Venus chamber | LIVE | Full oracle, video corridor, artwork card |
| Venus — Sigil Key reveal | LIVE | Key screen opens after oracle; artwork image as visual; download as canvas PNG |
| Venus — Grimoire | LIVE | Sealed to Venus chamber specifically (forceMode fix applied) |
| Ganymede chamber | LIVE | Full oracle, cave video, god rays |
| Ganymede — em dash stripping | LIVE | stripDash() applied to all Ganymede output fields |
| Ganymede — stillness ending | LIVE | stillnessGate(): 4s silence → consecration line → Chalice reveal |
| Ganymede — Chalice of Ganymede | LIVE (V1) | Full screen relic reveal — see status notes below |
| Persephone | PROTOTYPE ONLY | Standalone persephone-oracle.html; not in index.html |
| Psyche | NOT BUILT | — |
| Collective Memory | NOT BUILT | Architecture designed, no code |
| Plausible analytics | NOT ACTIVATED | Single script tag when ready |

---

## Chalice of Ganymede — V1 status and known limitations

### What is working
- Full relic reveal screen triggered by `stillnessGate()` after Ganymede's final exchange
- Consecration line drawn from 5 session-seeded options; chosen by hashing the visitor's tikkun
- Tikkun inscription: "What you carry" label + visitor's specific soul correction from `tikkun_line` JSON field
- "✦ Carry this ✦" arrives as a ceremonial line, not a CTA
- "Keep the Chalice" downloads a canvas-generated PNG relic with inscribed tikkun and date
- "Return to the Temple" closes the screen
- Cave atmosphere: 3-layer CSS radial gradient background, SVG noise texture at 2.2% opacity, vignette
- Chalice MP4 masked with `radial-gradient(ellipse 120% 80%)` — 6-stop feather dissolves edges
- Mock testing: `?mock=ganychalice` works on live site
- Grimoire: passes `'ganymede'` explicitly so Venus artwork never appears in Ganymede seal

### Known limitation — MP4 has a baked dark background

The Chalice MP4 was rendered with a solid dark background. CSS masking dissolves the edges of that rectangle into the page, but the interior of the video — including its own background colour — remains a distinct visible surface. No amount of CSS masking can make a video with a solid background feel like a floating object inside a separately-built environment.

This is the reason the Chalice screen reads as "an MP4 on a page" rather than "a relic inside a cave." The CSS cave atmosphere exists behind the video, but the video's own dark interior prevents it from being visible.

**This is not a CSS problem. It is an asset problem.**

### Options for future relic refinement

**Option A — Re-export Chalice as transparent WebM (recommended for all future relics)**
Render the rotating Chalice on a transparent/alpha channel. Export as WebM with VP9 codec (the only browser-supported video format with alpha transparency). The relic then genuinely floats over the CSS cave scene. This is the correct long-term solution.

Export settings for reference:
- Codec: VP9
- Container: WebM
- Alpha channel: enabled
- Dimensions: same as current MP4
- Frame rate: same as current MP4

**Option B — Full-scene render**
Render the Chalice rotating inside a full cave scene (stone walls, amber light, atmosphere) as a single MP4. The video itself becomes the complete environment. No CSS cave-building needed. Tradeoff: the scene is fixed — the CSS cannot adapt it.

**Option C — CSS colour match (current approach)**
Tune the CSS background gradient to match the MP4's own background colour precisely. Works best when the MP4 background is a neutral near-black. Fragile across different screen brightness and colour profiles.

### Design implication for all future relics

Every future chamber relic (Persephone → Pomegranate Seed, Psyche → the Lamp) should be planned from the start as either a transparent WebM or a full-scene render. The Sigil Key has the same limitation — it is also an MP4 with a baked background.

**Decision to make before next relic is built:** Establish a standard relic asset format so all relics feel like they belong to the same world and the same technical approach.

---

## Relic system — design decisions locked

| Chamber | Relic | Status |
|---|---|---|
| Venus | Sigil Key | LIVE — MP4, baked background |
| Ganymede | Chalice of Ganymede | LIVE V1 — MP4, baked background |
| Persephone | Pomegranate Seed | PLANNED — asset not yet created |
| Psyche | The Lamp | PLANNED — asset not yet created |

The Sigil Key is the temple's gift — universal, about passage and permission.
The Chalice is Ganymede's gift — personal, about capacity and responsibility.
The Pomegranate Seed will be Persephone's gift — about irreversible knowledge.
The Lamp will be Psyche's gift — about courageous seeing.

---

## Open technical issues (not yet fixed)

| Issue | Priority | Notes |
|---|---|---|
| Council routes to `enterVenusAltar()` instead of `enterVenusApproach()` | HIGH | 2-line fix at ~lines 3034 and 3181 in current file |
| `window.__test*` shortcuts ungated in production | HIGH | Security audit item — any visitor can bypass Sigil Key |
| `?key=1` and `?sigil=1` URL params grant access with no auth | HIGH | Security audit item |
| Vercel proxy: client can supply `model`/`max_tokens`/system prompt | HIGH | Security audit item |
| XSS vectors in `innerHTML` in oracle chat and Grimoire | MEDIUM | Security audit item |
| No CSP headers | MEDIUM | Security audit item |
| `?mock=*` params active in production | MEDIUM | Security audit item |
| Venus UX — key label reads `VEN` not `VENUS` | LOW | Cosmetic |
| Venus UX — "Receive your first key" CTA auto-advances before user finishes reading | LOW | Timing |

**Security audit is the next major sprint after design foundations are established.**

---

## Session log — 29 June 2026 (Chalice polish + design direction)

Chalice refinements shipped across multiple passes:
- Chalice HTML/CSS rebuilt as single-scene composition (absolute-positioned children, no layout zones)
- Video positioned `top:2vh; left:50%` at `clamp(220px,30vw,440px)` width
- Mask: `radial-gradient(ellipse 120% 80%)` six-stop feather
- Background: 3-layer radial gradients anchored at warm amber light source above centre
- Text zone begins at `top:62vh`, centred, with ceremonial stagger timing
- "Ganymede · Chamber of Building" label removed per El's direction
- Consecration font reduced from `clamp(22px,2.6vw,32px)` to `clamp(18px,2vw,26px)`
- "Carry this" demoted from button to ceremonial `<p>` element with `pointer-events:none`
- "Keep the Chalice" → download trigger; "Return to the Temple" → close
- After download, visitor stays on screen (no auto-close)

Chalice V1 paused here. Good enough as working first version. The blocking constraint is the MP4's baked background — a CSS problem this is not.

**Strategic decision:** Pause individual screen refinement. Next sprint establishes design foundations before further chamber work.

---

## Previous session log — 28 June 2026 (Experience Polish Sprints I + II)

### Shipped

- Foyer: reverted fc-subtitle experiment; placeholder opacity lifted 0.78→0.88
- All oracle input placeholders: ellipses removed ("You are safe to speak here", "Speak into the cave", "Ask your question")
- Venus oracle input placeholder: opacity lifted 0.28→0.62
- Ganymede input placeholder: opacity lifted 0.18→0.58
- Venus Grimoire artwork fix: `openGrimoire(forceMode)` — Venus passes `'venus'`, Ganymede passes `'ganymede'`
- Ganymede em dashes: `stripDash()` now applied to all Ganymede output fields before `gStream()`
- Ganymede ending: `stillnessGate()` — 4s silence → consecration line → fades → Chalice opens
- Chalice of Ganymede: full implementation (HTML, CSS, JS, download, mock route)
- `?mock=ganychalice`: moved from dead `testKeyReveal` function to correct top-level load event
- `tikkun_line` added to GSYS JSON schema
- Five consecration lines seeded by tikkun hash
- `_chDownload()` generates canvas PNG: video frame + tikkun inscription + date + Chalice ID
- `_ganyTikkunLine()`: extracts tikkun_line from final Ganymede response; falls back to first reflection sentence
- `_ganyConsecrationLine()`: deterministic selection from 5 lines via tikkun hash
- `_getGanyChalice()` / `_saveGanyChalice()`: localStorage persistence in `temenos_relics` key

---

## Next sprints — in order

1. **`DESIGN_PRINCIPLES.md` + `DESIGN_LANGUAGE.md`** — establish the scene-based design foundation before any further screen work
2. **Security hardening** — gate `window.__test*`, clamp model/max_tokens server-side, address XSS, add CSP headers, disable `?mock=*` in production
3. **Venus UX polish** — key label, CTA timing, oracle position jump (three issues, single session)
4. **Persephone integration** into `index.html` (waiting on visual assets)
5. **Collective Memory** — POST endpoint, fragment input in Grimoire, accumulate invisibly

---

## Architecture reference

- **File:** single `index.html`, ~4797 lines, all CSS/JS inline
- **Repo:** `ellisliu7/ancient-temenos-assets` (public, GitHub Pages)
- **Domain:** `ancienttemenos.art`
- **Oracle proxy:** `ancient-temenos-oracle.vercel.app/api/oracle` (private Vercel repo)
- **Formspree:** `xkoakgkk` (collector enquiry)
- **Mock routes:** `?mock=venus`, `?mock=ganymede`, `?mock=ganychalice`, `?mock=key`, `?mock=ganygrimoire`, `?dev=1`, `?sigil=1`
- **Typography:** Cinzel (structure, labels) · Cormorant Garamond (body, oracle, poetry) · Almendra (character names)
- **Relic assets:** `Sigil_Key.mp4`, `Chalice.mp4` — both raw.githubusercontent.com CDN
