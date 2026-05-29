# ✦ Ancient Temenos — Decisions

A record of why things were built certain ways.
Prevents re-litigating resolved questions.

---

## Architecture

### Single HTML file
**Decision:** Everything lives in one index.html.
**Why:** Simplest deployment to GitHub Pages. No build step, no bundler, no dependencies to manage. Ellis can push one file and it's live.

### Claude API called directly from browser
**Decision:** API key in client-side JS, `anthropic-dangerous-direct-browser-access: true` header.
**Why:** No backend. Simplest path to working product. Security tradeoff accepted at this stage.
**Future:** Move to a serverless function when membership tier is built.

### Three.js loaded from CDN at runtime
**Decision:** Three.js + GLTFLoader + DRACOLoader injected via script tags when needed.
**Why:** Keeps initial page load fast. Sculptures only load when user enters a chamber.

---

## Foyer

### Video scrubbing (not CSS parallax)
**Decision:** Foyer video is scrubbed forward/backward rather than using CSS parallax layers.
**Why:** More cinematic. Feels alive. Hybrid: auto pendulum at idle, mouse position scrubs on hover.
**Implementation:** `vid.pause()`, drive `currentTime` manually each RAF frame.

### Four altars (Venus, Persephone, Psyche, Ganymede)
**Decision:** All four archetypes present in foyer even though Persephone and Psyche chambers don't exist yet.
**Why:** Establishes the full council. Creates anticipation. "Coming soon" feels intentional not unfinished.

### Council debate (not parallel responses)
**Decision:** Foyer AI responds as a real-time debate between archetypes, not 4 simultaneous cards.
**Why:** Watching the archetypes disagree about you is far more emotionally arresting. Feels alive. The user feels *seen* by the disagreement itself.
**Debate ends:** Soft chamber suggestion + "which is calling you?" — user chooses, system doesn't force.

### Foyer is free tier
**Decision:** Threshold + foyer council debate = free. Chamber oracles = membership.
**Why:** The debate is the hook. It gives enough value to convert. The deep one-on-one is the product.

---

## Venus Chamber

### Kybalion as framework
**Decision:** Venus oracle uses the Seven Hermetic Principles as the wisdom backbone.
**Why:** Fits the mythological/sacred tone. Gives the AI structured ancient wisdom to draw from rather than generic self-help.

### Venus as The Alchemist / Little Prince (not goddess archetype)
**Decision:** Venus speaks simply, precisely, without spiritual buzzwords.
**Why:** The cliché "divine feminine oracle" voice is everywhere. This is the differentiator — quiet certainty, not mystical word salad.

### JSON response format
**Decision:** Venus AI returns structured JSON: `{principle, mirror, kybalion, affirmation, question, actions}`.
**Why:** Allows each part to be rendered differently — streamed body text, pull-quote kybalion, highlighted affirmation, closing question. Not one blob of text.

### Wishing Well + Sigil
**Decision:** Users can cast an intention, receive a generated sigil, and optionally offer ETH.
**Why:** Creates a ritual moment. The sigil makes the intention feel sealed and real.

### Grimoire
**Decision:** At the end of a Venus session, user can seal their conversation into a Grimoire — a sacred record they can copy or download.
**Why:** Gives the session permanence. Something to carry forward. The experience shouldn't just disappear.

---

## Ganymede Chamber

### Reverse cave video
**Decision:** Ganymede cave video plays in reverse (scrubbed backward frame by frame).
**Why:** Creates an eerie, time-reversed quality. Entering the cave feels like going inward, against time.

### Bronze / Holographic texture toggle
**Decision:** User can switch the Ganymede sculpture between bronze and wireframe holographic.
**Why:** Masculine/structural energy plays with the idea of form vs. pure geometry. Holographic = seeing the architecture beneath.

---

## Navigation

### foyerEnter() guard: `if(currentScreen !== 'foyer') return`
**Decision:** Navigation from foyer only fires if currentScreen is 'foyer'.
**Why:** Prevents accidental chamber entry from other screens. Was the root cause of the navigation bug in an earlier build.

### flashTo() for all screen transitions
**Decision:** All major transitions go through a full dark flash.
**Why:** Creates cinematic weight. Signals to the nervous system that something significant is happening. Avoids jarring cuts.

---

## What Was Tried and Rejected

### Equal-width four-column foyer
**Tried:** Four figures at equal 22% width in a grid.
**Rejected:** Looks like a SaaS feature comparison. No depth, no atmosphere. CONCEPT1 shows figures at different scales with true depth perspective.

### CSS parallax (mouse moves layers)
**Tried:** Multiple z-index layers shift on mousemove.
**Rejected:** Felt thin. Video scrubbing is more cinematic and more unique.

### Parallel council responses (4 cards simultaneously)
**Considered:** Fire 4 API calls at once, show 4 response cards.
**Rejected:** Feels like a dashboard. The real-time debate is the soul of the foyer.
