# ✦ Ancient Temenos — Chamber SOP & Template

> Copy this file when birthing a new chamber. Fill every section BEFORE writing code.
> Emotional architecture before code. A blank section means the chamber is not ready to build.
> This preserves the depth of Venus and Ganymede so you never reinvent the world.

> THE GOLDEN RULE: Ancient Temenos whispers, it never shouts.
> If unsure in any section below — choose restraint over spectacle.

---

## 0. The One-Line Soul Test (do this first)
Finish this sentence cleanly or do not proceed:
> "After this chamber, the seeker remembers that ______."
If you can't, the chamber has a mechanic but no soul. Stop here.

---

## 1. Core Emotional Wound / Theme
- **The wound the seeker arrives carrying:**
- **The truth they leave remembering:**
- **The turn (the exact moment it shifts):**
- **Emotional arc (the proven 4-beat):** limiting belief discovered → released → new belief installed → new destiny
  - Venus ref: self-abandonment → permission to receive
  - Ganymede ref: vision without form → the first stone placed
  - Persephone ref: the pattern unseen → the pattern named and chosen

## 2. Voice Archetype
- **Sounds like (a real, specific human — never "wise oracle"):**
- **Speaks AS the seeker, or TO them?** (Venus = AS / higher self · Ganymede = TO / elder)
- **The feeling of being spoken to (one phrase):**
- **3 example lines in this voice:**
- **Forbidden vocabulary** (baseline, every chamber): vibration, alignment, manifest, divine feminine, energetic, universe, journey, sacred, healing, integration — plus chamber-specific bans
- **Hard rules:** no em-dashes · no bullet points inside responses · plain prose · museum-placard brevity (every sentence earns its place) · never reassure cheaply

## 3. Environment Design
- **The space (where are we — cave, altar, underworld, garden):**
- **Background asset (video loop / scene):**
- **Spatial logic:** how the seeker moves through it (scroll-approach, descend, drift)
- **Palette** (gold emerges from darkness, never gold everywhere):
  - Venus: ivory · muted gold · warm sepia · dusk blush · black
  - Persephone: deep indigo · smoky violet · midnight · silver · dark teal · dim gold
- **Depth & atmosphere:** god rays / dust / fog / ripple — pick the ONE that serves the feeling

## 4. Ritual Mechanic
- **The single interactive ritual unique to this chamber:** (Venus: wishing well + sigil · Ganymede: the first stone · Persephone: choose one of three paths → mirror ritual)
- **The seeker DOES something, not just reads:**
- **Pacing:** deliberate pauses, slightly longer than comfortable
- **Reuse the proven moments:** scroll-to-approach hint (persistent) → functional invitation line → ceremonial fade+rise reveal → gate at the emotional close → grimoire seal

## 5. Oracle Prompts (the product)
- **Conversation arc by exchange** (when to ask vs reflect vs offer paths vs close):
- **Invisible interpretation layer** (HD / astrology / BaZi — NEVER named, always translated to emotional truth):
- **JSON schema** (every chamber returns structured JSON, never one blob):
  ```json
  { "stage":"", "reflection":"", "framework_or_kybalion":"", "step_or_ritual":"", "question":"", "options":[], "check_in":false }
  ```
- **CRITICAL directives:** "raw JSON only" at top of system prompt · parse fallback never dumps raw strings · responses routed through the Vercel proxy, never a key in client code
- **Free vs paid:** free tier = 3 exchanges (taste), then the gate. Let the 3rd response finish, never cut mid-sentence.

## 6. Visual / Animation Layer
- **Sculpture (GLB, Draco-compressed):** + lighting note (avoid dark/bronze — DirectionalLight)
- **Signature motion:** the one animated element that defines the room (Ganymede: reverse cave scrub · Venus: altar loop)
- **Reveal animation:** fade + rise, slow, breathing — NEVER typewriter
- **Transition:** all major transitions through `flashTo()` — cinematic weight, no jarring cuts

## 7. Sound Design
- **Ambient bed:** the continuous low atmosphere (cave hum, water, wind) — quiet, looping, never melodic enough to notice
- **Ritual sound:** the one moment that gets a distinct sound (the gate, the seal, the choice)
- **Oracle pacing audio:** optional soft tone on each line-reveal
- **Rule:** sound is felt, not heard. If the seeker notices the music, it's too loud. Default to near-silence with texture.
- **Mute affordance:** always present, unobtrusive

## 8. Timelapse / Art Integration
- **El's artwork** is mythology, not decoration — build the chamber around it, never reinterpret it heavily
- **Free altar layer:** artwork + timelapse of its creation, visible to all (the seduction layer)
- **Anchoring:** artwork feels architecturally placed (aligned to an arch/wall), not floating
- **Match heights / soft masks:** no hard black boxes; masks soft

## 9. Collector Experience (Sigil Key)
- **Free:** altar layer (artwork + timelapse) + 3 oracle exchanges
- **Sigil Key unlocks:** full oracle + the sealing ritual/grimoire + ability to collect this artwork
- **Collection question (LOCKED once chosen — reflection required to collect):**
  - Venus: "What part of yourself are you finally learning to stop carrying alone?"
  - This chamber: __________
- **Gate copy:** in-world, never salesy ("Become an Initiate", not "Subscribe")

## 10. Completion Checklist (Definition of Done)
- [ ] Section 0 soul test passes
- [ ] Assets on CDN: background video · artwork · timelapse · GLB
- [ ] System prompt tested in mock mode (`?mock=<name>`)
- [ ] `?reset` clears stored key for gate testing
- [ ] Wired: `foyerEnter('<name>')` + `LIVE_CHAMBERS.<name> = true`
- [ ] `foyerEnter()` keeps the `if(currentScreen!=='foyer') return` guard
- [ ] Typography roles intact: Cinzel (labels) · Cormorant (oracle) · Almendra (names)
- [ ] A cold stranger feels the chamber's one feeling without explanation
- [ ] The oracle's first reflection lands precise, never generic
- [ ] The gate fires at the right emotional moment
- [ ] The grimoire is something you would screenshot
- [ ] CURRENT_STATE.md updated

---

## Quick-Fill Skeleton (paste at the top of a new conversation)
```
New chamber: <name>
0. Soul: After this chamber, the seeker remembers that ___
1. Wound → truth: ___
2. Voice: sounds like ___, speaks AS/TO ___
4. Ritual mechanic: ___
9. Collection question: ___
Build the rest from CHAMBER_TEMPLATE.md.
```
