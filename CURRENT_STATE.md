# CURRENT BUILD STATE

## Live Site
https://ellisliu7.github.io/ancient-temenos-assets

## Repo
https://github.com/ellisliu7/ancient-temenos-assets

---

## DONE

### Main Page
- Video: `Main_Page.mp4` (jsDelivr)
- Title: "Ancient Temenos" in Cinzel, top of screen
- Subtitle: "A sanctuary of art, myth, memory and divinity"
- Button: "Enter the Sanctuary" fixed to bottom
- Scroll-to-enter: scrolling zooms into sculpture and transitions to foyer
- Mouse parallax: video moves opposite (-18px), title moves with mouse (+8px)
- "or scroll ↓" hint fades in at 2.5s

### Foyer
- Temple hall video: `Foyer_hall.mp4` at 0.35 playback rate
- Venus artwork left, Ganymede artwork right
- Hover: artwork brightens, poem appears, particles spawn
- Click: flash transition into chamber
- Title: "Ancient Temenos" + subtitle

### Ganymede Chamber ✓ COMPLETE
- Video: `Ganymede Cave_1.mp4` reverse playback loop
- 3D sculpture: `ganymedestatue-v1.glb` — working
- Mouse parallax: sculpture turns toward cursor, cave video static
- Click sculpture to reveal conversation
- "SPEAK WITH GANYMEDE" prompt with bobbing arrow
- Conversation: David Ghiyam voice — practical, expansive, grounded
- Check-in after 3rd message or when Ganymede senses completion
- "Does this help clarify your thoughts? Or would you like to go deeper?"
- "Let's go deeper" → Ganymede generates deepening question automatically
- Closing: "That's the one. Don't lose it."
- 90 Day Sprint grimoire: My Goal / Belief to Release / Physical Commitment / Inner Practice / My Prayer

### Venus Chamber — PARTIAL
- Video: `Venus_Altar_Video.mp4` — working
- Conversation: working — Bashar + Abraham Hicks + Dolores Cannon voice
- Opening: "You're here. What are you feeling right now?"
- Affirmation fades in after mirror streams
- Font 16px, textarea input
- Closing: "She is with you" + "Continue to Ganymede"
- **SCULPTURE NOT WORKING** — see below

---

## CURRENT ISSUES

### Venus Sculpture — Critical
- File: `Venus_sculpture.glb` (8.5MB, NO Draco, Extensions: [])
- Error: `Cannot assign to read only property 'position'` at _buildVenusSculpture
- Root cause: Three.js r128 read-only geometry bug with certain GLB structures
- Latest attempt: rewrote loader with no Draco, no Object.assign, manual position setting
- Still failing — possibly Three.js r128 incompatibility with this specific mesh
- **Next attempt**: Try upgrading to Three.js r134+ which fixes read-only geometry issues, or use a mesh wrapper

---

## NEXT PRIORITIES

### 1. Fix Venus Sculpture
Try Three.js r134 instead of r128 for Venus only
OR wrap the model in a new Object3D group to avoid read-only properties

### 2. New Foyer — Council Concept
- Background: `CONCEPT_withouttext.jpg` (uploaded, high quality, in repo)
- Four figures: Venus (far left), Ganymede (far right), Persephone + Psyche (middle alcoves)
- Central oracle: animated spinning SVG armillary sphere
- Input: "Welcome home. What's on your mind today?" / placeholder "Share what you seek guidance on..."
- All four respond simultaneously with 0.4s stagger (Venus → Ganymede → Persephone → Psyche)
- Each figure glows in their color on hover
- Click figure → zoom transition into their chamber
- Parallax: 3 layers — architecture (8px), figures (15px), oracle+title (20px)
- Static image first, video later

### 3. Persephone Chamber
- Purpose: pattern recognition, alternate timelines, shadow work
- No artwork or system prompt built yet

### 4. Psyche Chamber  
- Purpose: inner child, practical playful exercises (left-hand writing etc)
- No artwork or system prompt built yet

---

## ASSET LOCATIONS

### CDN Strategy
- Videos + images → jsDelivr: `cdn.jsdelivr.net/gh/ellisliu7/ancient-temenos-assets@latest/`
- GLB sculptures → raw GitHub: `raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/`
- Three.js + loaders → jsDelivr npm: `cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/`
- Draco decoder → repo root `./` (draco_decoder.wasm etc)

### Key Files
- `Main_Page.mp4` — main page background
- `Foyer_hall.mp4` — current foyer background
- `Venus_Altar_Video.mp4` — Venus chamber background
- `Ganymede Cave_1.mp4` — Ganymede chamber background
- `Venus_Artwork.jpg` / `Ganymede_Artwork.jpg` — foyer altar panels
- `Venus_sculpture.glb` — Venus 3D (8.5MB, no Draco) ← BROKEN
- `ganymedestatue-v1.glb` — Ganymede 3D (3MB, Draco) ← WORKING
- `CONCEPT_withouttext.jpg` — new foyer background concept

---

## FOUR GUIDES — VOICE DEFINITIONS

### Venus
Identity before surrender. Bashar + Abraham Hicks + Dolores Cannon.
Reminds you what you are before addressing what you want.
Calms nervous system through recognition not technique.
Short, spacious, warm, certain. Never third-person narration.
Sequence: Identity → Presence → Receive → One question

### Ganymede  
Structure and action. David Ghiyam voice.
Practical but expansive, grounded but inspiring.
Simplifies overwhelm, asks clarifying questions.
Grounds inspiration into action. Never vague, never preachy.
No files/images requests.

### Persephone (not built)
Shows alternate timelines and situations.
Identifies patterns and ways of seeing.
Shadow work, cycles, what's hidden beneath the surface.

### Psyche (not built)
Inner child. Practical playful exercises.
Left-hand writing, imagination as real tool.
Innocence, wonder, play.

---

## KEY DECISIONS

- Foyer replaces current with council concept, chambers remain
- Four respond simultaneously with 0.4s stagger
- Option A: all four respond, user feels drawn to one and enters
- Static image foyer first, video later
- Grimoire = 90 Day Sprint
- Share portal button removed
- No files/images requests from any guide
- Ganymede closing: "That's the one. Don't lose it."
- Venus closing trigger: after 2 user exchanges
