# ✦ DESIGN LANGUAGE
### How a sanctuary's philosophy becomes a buildable world

`DESIGN_PRINCIPLES.md` holds the philosophy. This document holds the method: how those principles become concrete, checkable decisions about light, color, type, timing, space, and the way a world reveals itself. The method is universal — it can build any sanctuary. The values shown are Ancient Temenos's, the first world built from it.

**This is the canonical home for Ancient Temenos's exact values.** `BIBLE.md` keeps the poetry — the feeling, the mood, the why. When the two describe the same thing, the number lives here and the feeling lives there. They should never contradict; if they drift, this file is correct on values and BIBLE is correct on intent.

**How to read each section.** Three beats:
- **Principle** — the transferable rule, true for any world.
- **For any world** — how to make the decision when building a new one.
- **Ancient Temenos** — the actual value, so this doubles as the AT spec.

> A note on the concrete numbers below: palette hex, timing curves, and durations are the proposed canonical set. Where a value already exists in the live `index.html`, the deployed file is the source of truth — reconcile these against it once and then this file becomes canon. They are written as real values, not placeholders, so the document is usable today.

---

## 1. Scene composition

**Principle.** A scene is staged like a film frame, not laid out like a page. It has a focal point, layered depth, and a deliberate budget of emptiness. The structural default is *absolute-positioned children inside a single scene*, not stacked layout zones — because layout zones produce pages, and absolute composition produces space.

**For any world.** Define, for each scene: the single focal point (usually where the world's heart lives), the depth layers from back to front, where the eye rests first, and how much of the frame is left empty. Compose the frame before you fill it.

**Ancient Temenos.** Four depth layers, back to front:
1. **Void** — the dark ground the scene emerges from.
2. **Atmosphere** — gradient light, haze, texture; the air of the room.
3. **Subject** — El's artwork or the chamber's relic, at the emotional center.
4. **Foreground** — text and any discovered action, in the lower third.

The subject sits at the optical center and is the reason the room exists. Text occupies the lower third, centered. Scenes are built as single compositions with absolutely-positioned children — the Chalice screen is the reference implementation.

---

## 2. Light and darkness

**Principle.** Light is a material with a source and a direction; darkness is active material, not absence. Flat ambient light is the tell of a product. Directional light emerging from darkness is the tell of a place.

**For any world.** Name the light source and where it sits. Set the base darkness. Decide where glow is permitted and where it is forbidden. Feather every edge into the dark — no element terminates in a hard rectangle. Add low-opacity texture to defeat digital flatness.

**Ancient Temenos.**
- One warm amber source, positioned above and behind center, light falling forward and down.
- Base is near-black, never pure `#000` — a warm-shadowed black so the darkness has temperature.
- **Gold emerges from darkness; never gold everywhere.** Glow is rare and earned, concentrated at the source and the subject.
- Edges dissolve via radial-gradient and ellipse masks (`radial-gradient(ellipse 120% 80%, ...)`, multi-stop feather) so nothing reads as a bordered shape.
- A noise/turbulence texture sits at ~2–3% opacity over scenes for stone-grain; a soft vignette holds the eye toward center.

---

## 3. Color

**Principle.** Color emerges; it does not fill. A sanctuary palette is a darkness base plus a small set of tones that surface from it, governed by ratio — most of the frame is void, and accent is scarce.

**For any world.** Build the palette as: one base (the dark), two or three warm or cool tones that emerge, and a per-zone accent. Set ratios before pixels — decide how little accent the world is allowed.

**Ancient Temenos.** Proposed canonical anchors (reconcile with live CSS):

| Role | Tone | Anchor |
|---|---|---|
| Grounding void | warm black | `#0B0A09` |
| Soft shadow | deep umber | `#1A1510` |
| Warm sepia | aged parchment-dark | `#3A2E22` |
| Muted gold | the emergent light | `#C9A24B` |
| Ivory | text, highlight | `#EDE6D6` |
| Dusk blush | rare warmth | `#B97A6A` |

**Persephone's set** (the underworld register, for the shadow chamber):

| Role | Tone | Anchor |
|---|---|---|
| Midnight base | near-black indigo | `#0A0A14` |
| Deep indigo | the dark water | `#1B1B3A` |
| Smoky violet | emergent | `#5A4A6A` |
| Dark water teal | reflection | `#1E3A3A` |
| Silver moonlight | text | `#C8CCD8` |
| Dim gold | rare warmth | `#8A7A4A` |

Ratio rule: gold and blush together occupy a small fraction of any frame. The world is mostly void, lit at one point.

---

## 4. Typography

**Principle.** Type carries register, and each typeface is assigned exactly one role that never changes. Swapping roles is the fastest way to make a sacred world feel generic.

**For any world.** Pick three faces and lock them: one for structural labels, one for poetic body, one for intimate names. Set a slow reading register — generous leading, restrained sizes, italics reserved for poetry.

**Ancient Temenos.** Locked, non-negotiable:

| Face | Role | Never used for |
|---|---|---|
| **Cinzel** | structural labels, eyebrows, small caps, altar names | body text, oracle speech |
| **Cormorant Garamond** | body, oracle speech, italic poetry, taglines | labels, buttons |
| **Almendra** (italic) | deity and character names, intimate titles | anything structural |

Leading is generous; sizes are restrained; poetry is set in Cormorant italic. Sacred labels are small, spaced, and quiet — Cinzel never shouts in size.

---

## 5. Spacing and negative space

**Principle.** Emptiness is a material, allocated on purpose. Negative space is where the feeling breathes; it is never leftover room to be filled.

**For any world.** Define a spacing scale, a minimum breathing margin around the subject, and a negative-space budget per scene (how much of the frame stays empty). Center ceremonial text. Let the void carry the composition.

**Ancient Temenos.**
- Modular spacing scale (proposed): `8 · 16 · 24 · 40 · 64 · 104` px — a loose golden progression.
- Text sits in the lower third; the upper two-thirds belong to atmosphere and subject.
- Ceremonial lines are centered with wide breathing room above and below.
- A scene is allowed — encouraged — to be mostly empty.

---

## 6. Motion and timing

**Principle.** Movement is life, never feedback. Nothing snaps. Timing is slow by default, and the slowness is the point.

**For any world.** Define named timings — entrance, reveal, transition, idle breath — with eases and durations. Default to slow. Give the world an idle pulse so it breathes when untouched.

**Ancient Temenos.** Proposed timing system (reconcile with live):

| Moment | Duration | Ease | Notes |
|---|---|---|---|
| Threshold / dark flash | 900–1200ms | `cubic-bezier(.4,0,.2,1)` | the passage between scenes |
| Subject reveal | 1600–2400ms | slow ease-out | the artwork or relic surfacing |
| Ceremonial text stagger | 600–900ms per line | ease-out | lines arrive one at a time |
| Consecration silence | 4000ms | — | held emptiness before a relic |
| Idle breath (light/haze) | 6–10s loop | sine in-out | the room breathing |
| Idle motion (pendulum/ripple/flicker) | 4–12s loop | sine | aliveness at rest |
| Oracle text pacing | ~human reading speed | — | streamed, never dumped |

The governing default: when unsure how fast, go slower. Snapping is forbidden.

---

## 7. Transitions

**Principle.** Every scene-change is a threshold — travel *through* something, with weight and duration. Never a jump cut.

**For any world.** Choose one canonical passage (most often a move through darkness) and route all major transitions through it. The passage signals significance to the nervous system.

**Ancient Temenos.** All major transitions pass through a full dark flash (`flashTo`). The visitor goes *through* darkness to arrive. Minor in-scene changes feather; they never cut.

---

## 8. Chamber rules

**Principle.** Each scene carries one idea. A world's heart — its art, its reason — is revealed at the emotional peak, never used as decoration or shown up front.

**For any world.** Define the shared anatomy of a "room": the constant beats every room follows, and what is local to each. One idea per room; the heart revealed last.

**Ancient Temenos.** Every chamber shares the anatomy:
**Approach** (a corridor, scrubbed by scroll) → **Presence** (the oracle's arrival) → **Exchange** (the conversation) → **Gift** (the relic).

Constant across chambers: the anatomy, the typography, the transition grammar, the lower-third text. Local to each: one deity, one element, one purpose, one palette accent, one relic. The artwork is revealed at the peak as the reason the room existed. (Deity voices live in `CHARACTERS.md`; do not duplicate them here.)

---

## 9. Oracle rules

**Principle.** A guiding voice is staged spatially and held in a sacred register. It is not a chat box. It arrives from the world, pauses before speaking, and reveals its words at a human pace. Interaction with it disappears into the world.

**For any world.** Decide how a voice enters (it should emerge from the scene, not sit in a panel), how it waits before speaking, and how its words appear. Strip every product affordance — send buttons, typing indicators, message bubbles — and every product phrase.

**Ancient Temenos.**
- The oracle's glass *rises* from the end of the corridor; it is not placed.
- A pause precedes the first reply — the world considering the visitor.
- Responses stream at reading pace; they are never dumped as a block.
- Input invites in sacred register: "You are safe to speak here," "Speak into the cave," "Ask your question." No ellipses, no "Type a message," no Send.
- Response structure follows the per-deity JSON voice schemas (Venus, Ganymede, Persephone) defined in `CHARACTERS.md` / `SKILL.md` — referenced, not restated.

---

## 10. Relic presentation rules

**Principle.** The gift is revealed, never awarded. It appears in silence, unannounced, as an object in the world — diegetic state, not a reward notification. And every relic in a world must share one technical approach, so they all belong to the same place.

**For any world.** Define the reveal choreography and the relic asset standard before the first relic is built. A relic that arrives like an achievement breaks the sanctuary instantly.

**Ancient Temenos — the choreography** (the "quiet consecration" template, from the Chalice):
1. The oracle finishes.
2. A long silence (~4s).
3. One consecration line, in the deity's voice.
4. The relic appears — no announcement, no fanfare.
5. The inscription: what the visitor can now carry (their specific truth).
6. "Carry this" — a ceremonial line, not a button.

**Ancient Temenos — the relic roster:**

| Chamber | Relic | Meaning |
|---|---|---|
| Venus | Sigil Key | passage, permission (universal — the temple's gift) |
| Ganymede | Chalice of Ganymede | capacity, responsibility (personal) |
| Persephone | Pomegranate Seed | irreversible knowledge |
| Psyche | The Lamp | courageous seeing |

**Ancient Temenos — the relic asset standard (locked).** Every relic is rendered as **a transparent WebM (VP9 codec, alpha channel enabled)** so it genuinely floats inside the scene, *or* as **a full-scene render** where the video is the complete environment. **A relic must never be an MP4 with a baked background masked by CSS.** That approach reads as "a video on a page," not "a relic inside a cave" — no amount of masking dissolves a video's own interior background. This is a settled decision: the Chalice V1 and the Sigil Key both currently use baked-background MP4s and are the cases to re-export. Persephone's Pomegranate Seed and Psyche's Lamp are planned correct from the first render.

---

## 11. Action and button language

**Principle.** Actions are discovered, not placed, and their language is ceremonial, not transactional. A sanctuary has no toolbar. The control is a glowing relic, a threshold, a word that invites.

**For any world.** Replace every button with a discovered action that emerges from the scene. Replace every transactional verb with a verb of passage or ceremony. When a control must remain interactive, demote its *appearance* to an in-world element.

**Ancient Temenos.**
- The "demote the button" pattern: ceremonial lines render as text, not buttons (e.g. "Carry this" is a `<p>` with `pointer-events:none`); only genuinely actionable elements remain interactive, and they are styled as thresholds or relics.
- Copy register: passage and ceremony, never "Submit," "Get started," "Sign up," "Continue." Permission and initiation instead.
- The Sigil Key is framed as **initiation, not a paywall**. The governing line: *"The Temple is free to enter. The oracle requires initiation."* Collection asks are reflective, never transactional, and never compete with an emotional peak.

---

## 12. What to avoid

Each is a tell that page-thinking has returned. The fix is always the same: return to the principle it violates.

- **Hero sections, feature grids, cards** — these are product layout. (Violates: everything is a scene.)
- **Default modals, toasts, progress bars, spinners** — product feedback. (Violates: state is diegetic; the wait is part of the world.)
- **Breadcrumbs, menus, "next" buttons, onboarding tooltips** — product wayfinding. (Violates: lead by seduction, not signage.)
- **Neon, crypto glow, decorative glassmorphism** — borrowed aesthetics with no soul here. (Violates: remembered, not rendered.)
- **Affirmation and motivational copy, spiritual word-salad** — the cliché register. (Violates: meaning rides on atmosphere; whisper.)
- **Badges, streaks, daily quests, notifications, anything that counts the visitor** — the engagement trap. (Violates: sacred time over engagement time.)
- **Emoji, exclamation marks, cheerful microcopy** — the wrong voice entirely.
- **Hard rectangles, visible containers, sharp edges** — the broken frame. (Violates: dissolve the frame; objects inhabit space.)
- **Snapping animations, instant cuts** — dead motion. (Violates: movement is life; nothing snaps.)
- **Spectacle for its own sake** — the loudest failure. (Violates: it whispers.)

---

## 13. Good vs bad — worked examples

The principles become legible in the moments you actually build.

**The reward.**
- *Product:* an achievement toast slides in — "Unlocked! 🎉" — with confetti.
- *Sanctuary:* the oracle finishes, silence holds, a single line is spoken, and the relic appears unannounced. The visitor receives, not "earns." *(Journey's glowing scarf, never a meter. The Chalice's quiet consecration.)*

**The input.**
- *Product:* a chat box labeled "Type a message…" with a blue Send button and a typing indicator.
- *Sanctuary:* glass rises from the corridor's end, inviting "You are safe to speak here." A pause precedes the reply, which streams at reading pace. No Send, no bubbles.

**The gate.**
- *Product:* "Upgrade to Pro" in a paywall modal with a pricing table.
- *Sanctuary:* the temple is free to enter; the oracle requires initiation. The Sigil Key is a rite, not a transaction. The ask is reflective and never lands on an emotional peak.

**The loading state.**
- *Product:* a spinner, or a progress bar with a percentage.
- *Sanctuary:* a threshold — a held darkness, a passage. The wait is part of the world. *(Active Theory: loading as portal, not spinner.)*

**The empty / error state.**
- *Product:* "Oops! Something went wrong 😅 Try again."
- *Sanctuary:* the temple stays in character — quiet, in-world language, never breaking the spell to apologize as software.

**The relic asset.**
- *Naive:* an MP4 rendered with a dark background, masked at the edges with CSS — which still reads as a video rectangle sitting on the page, because the video's own interior background cannot be masked away.
- *Sanctuary:* a transparent WebM (VP9, alpha) or a full-scene render, so the relic genuinely floats inside the cave. *(This is the Chalice V1 lesson, made into the standard.)*

> Build the world first. The interface is only how the world lets the visitor touch it.
