## Session log — Jun 13 — HARD CAP + SCROLL HINT (3rd screenshot round)
- FREE TIER IS NOW A REAL TASTE (El confirmed): gate fires AFTER the
  seeker's 3rd Ganymede response finishes streaming, regardless of
  check_in. Logic in BOTH mock + live tails: after gStream resolves,
  if !gHasKey() && gExchangeCount>=3 -> clear options, ganyGate after
  2.2s. Else (has key OR under limit) -> normal options/ganyRitual.
  Never cuts mid-sentence (gStream awaited).
- FIXES "3rd message options pop up before conversation": the gated
  turn now suppresses options entirely (opts cleared, no showCandles),
  so the leftover/early candles El saw can't appear on the capped turn.
- SCROLL HINT now PERSISTS through the whole approach. Was dismissed
  on the first scroll tick (gScrubBy added 'gone' immediately) which
  is why it felt unclear. Now only gArrive dismisses it. Copy: "Scroll
  to approach Ganymede" + a breathing down-chevron, opacity bumped
  0.42 -> 0.6. The arrival invitation ("Speak into the cave…") remains
  the speak cue once he's reached.

OBSERVED, NOT CHANGED — "Ganymede artwork shows in background when it
  fades": that is the cave video's endframe behind the sinking glass,
  not a separate artwork element (none on this screen). Currently
  unintentional. OPTION for next session if El wants to lean in: hold
  a clean artwork/endframe behind the gate as the altar backdrop
  instead of the radial-over-cave. El to say whether to feature or
  darken it.

KEY UNLOCK + temp-state unchanged from prior entry (G_GATE_PASS=
  'remember' client-side; "Become an Initiate" -> opensea placeholder;
  real gate = proxy NFT verification, the Supabase build).
## Session log — Jun 13 — GATE + ORACLE REFINEMENT (screenshot feedback round)
- CANDLE ICONS REMOVED from the 3 options (read childish). Options are
  now quiet italic lines with a thin gold underline on hover. More
  horizontal gap, more top margin.
- GATE VIDEO REMOVED. The "old Venus video" El saw was Sigil.mp4
  loaded as a literal thumbnail box in the gate; that footage reads
  like the wishing-well pool AND made the gate feel like a website
  modal. Box deleted. Gate now emerges from darkness: soft radial
  gather, words rise over 3.2s, borderless Cinzel buttons. If El wants
  a sigil video on UNLOCK later, supply a dedicated asset (Sigil.mp4
  reads as Venus footage).
- GATE FADES CONVERSATION FIRST: ganyGate now sinks the glass (clears
  the text bleed-through seen in screenshot) then raises the gate.
  Document click-handler guarded so clicks during the gate don't
  recall the glass.
- BUTTON COPY: "Receive a Sigil Key" -> "Become an Initiate".
  "I carry a Key" -> "I hold a Key". Gate line 2 shortened to
  "The rest waits behind a Sigil Key."
- WHAT THE KEY UNLOCKS (decided): speaking a valid key now dissolves
  the gate and runs ganyRitual -> the gold sealing + Grimoire (the
  keepsake), then foyer. So the unlock = the closing ritual + grimoire
  for v1, and (future) the other deep chambers + artwork collection.
  localStorage remembers initiates.
- DASHES PURGED from oracle: all em-dashes removed from mock responses,
  GSYS schema, and GSYS prose (it forbade dashes while using them).
  2 em-dashes remain in code COMMENTS only (never rendered).
- TEXT CUT ~50%: all 3 mock responses roughly halved. GSYS tightened:
  reflection now 2-3 short sentences (was 3-5), structure 1-2,
  "museum placard not an essay, every sentence earns its place."
- VERTICAL BREATH: g-curr-text line-height 1.8 -> 2.05, para margins
  up; gStream reveal slowed (3s fade, 2.6s between blocks, 2.2em gap);
  glass vertical padding increased.

OPEN PRODUCT DECISION (flagged, NOT changed this session):
  The gate fires at Ganymede's CLOSE (check_in). In the live oracle
  he reaches check_in after his full arc (often 4-6 exchanges), so a
  free seeker currently gets the WHOLE conversation free and is only
  gated from the sealing ritual. G_FREE_LIMIT=3 barely bites. If El
  wants the free tier to be a genuine TASTE, switch to: cap at 3
  exchanges, let his 3rd response finish, then gate regardless of
  check_in (never mid-sentence). El to decide next session.

STILL TEMP: G_GATE_PASS='remember' client-side (bypassable; fine for
  v1). "Become an Initiate" -> opensea.io placeholder. Real gate =
  proxy verifies NFT ownership server-side (the Supabase/auth build).
## Session log — Jun 13 — SIGIL KEY GATE V1 (trial gate, shipped)
WHAT: Ganymede oracle now has a freemium trial gate. Seeker gets the
full natural conversation; when Ganymede completes his arc (check_in
true), IF no key AND exchanges >= G_FREE_LIMIT (3), his closing words
land fully, then the Sigil gate rises INSTEAD of the foyer flush.
First-option behavior El chose: he is never cut off mid-sentence.

MECHANICS (decided this session):
- Acquisition = NFT collectible (mint/buy). "Receive a Sigil Key" btn
  currently points to opensea.io as placeholder — SWAP for real
  collection URL when minted.
- "I carry a Key" -> reveals key input -> correct word grants access
  (localStorage temenos_sigil_key=1), gate dissolves, oracle re-opens
  with conversation intact. Wrong word -> silent ripple, no error text
  (threshold-riddle behavior).
- Sigil.mp4 reused as the gate's living artifact (screen-blended,
  gold drop-shadow). NO GLB — decided against; reads crypto, costs
  load time. GLB stays deferred to collect layer.

KNOWN-TEMP / NEXT (the real build, not yet done):
- G_GATE_PASS='remember' is a CLIENT placeholder. localStorage is
  bypassable (clear storage = reset trial). Fine for v1 — converts
  honest visitors. REAL gate = proxy verifies NFT ownership /
  issued-key list server-side. That is the Supabase/auth project.
- "Receive a Key" URL is a placeholder.
TEST (?mock=ganymede): walk 3 messages, 3rd is Ganymede's close ->
  his words finish -> gate rises with Sigil video -> "I carry a Key"
  -> type "remember" -> gate dissolves, oracle returns. Clear
  localStorage to re-test. With key present: 3rd message -> normal
  ganyRitual -> foyer (no gate).

DEFERRED EARLIER, STILL OPEN: contemplation/collect layer (touch mural
-> true artwork + timelapse + collect rite). Now has a reason to
exist: a Key to covet.
## Session log — Jun 13 — PATCH 2 (same day, feedback round)
- INVITATION LINE REVERTED to "You came here to build something."
  El's call: straightforward over fluffy. LOCKED — this line tells
  the seeker what to type. Do not poeticize it again.
- DISMISS GESTURE UPGRADED: sinking the glass now hands the room
  back. gScrub.arrived flips false, target steps back 1.5s into the
  cave, wheel/touch scrub re-enabled — seeker can travel the cave
  freely while the panel is sunk. Click anywhere -> gGlassRecall():
  scrub glides forward to the arch, gArrive() re-fires, glass rises
  (sunk class cleared inside gArrive). Esc still sinks only.
  Conversation state untouched throughout — sink/recall never
  resets gHistory.
- TEST: arrive -> click cave -> panel sinks -> scroll back through
  cave -> click -> glide returns to arch -> glass rises with
  conversation intact. Also: ?mock=ganymede mid-conversation sink.
- SIGIL KEY V1 DESIGN LOCKED (discussion, no code): keep Sigil.mp4
  as the reveal artifact, build the RITUAL around it — passphrase
  typed as "speak the word" gate. No GLB for v1. GLB key deferred
  to contemplation/collect layer.

## Session log — Jun 13 — GANYMEDE REFINEMENT PATCH (one commit, 5 changes)
- CAVE BRIGHTNESS +10%: base filter .88 -> .97, enterGanymede inline
  .82 -> .90, brightenCave ramp 0.88/cap 0.96 -> 0.97/cap 1.05.
  Haze gradient UNTOUCHED — it is the next lever if still too dark
  (top rgba 0.9 / bottom 0.95 are heavy; lighten those before
  touching filters again).
- GLASS PANEL: bg opacity .32/.46 -> .20/.30, border gold .14 -> .08,
  radius 2px -> 9px, shadow softened (.55 -> .38). Blur kept at 16px
  so text stays readable over the brighter cave.
- CEREMONIAL LINE-REVEAL: gStream rewritten. Typewriter (20ms/char)
  DELETED. Now each paragraph block fades+rises in over 2.4s,
  1.9s apart. Candles/ritual timing unchanged (they fire after the
  full reveal promise resolves, as before).
- INVITATION LINE: "You came here to build something." ->
  "Something you carry is ready to take form." (receives the
  Venus->Ganymede arc; invitation, not presumption).
- DISMISS GESTURE: click outside glass or Esc -> panel sinks into
  the water (46px down + fade, 1.4s); click anywhere recalls it.
  Nav buttons (#returnBtn/#teachingsBtn) and overlays excluded from
  the gesture. New CSS state: #g-glass.show.sunk. New fn: gGlassSink.
- Syntax-checked (script block parses clean), every edit verified
  landing exactly once. No other changes.
- EL'S TEST CHECKLIST (live URL, hard refresh):
  1. cave reads ~10% brighter on arrival — verdict: enough, or
     lighten haze next?
  2. glass: more transparent, softer — does text still hold over the
     brighter video?
  3. ?mock=ganymede: line-by-line reveal feels ceremonial, not slow
  4. new invitation line lands
  5. click cave background -> glass sinks; click again -> recalls;
     Esc sinks; candles/input unaffected
- NEXT SHIP unchanged: Sigil Key v1 gate (proxy passphrase check +
  ritual gate UI). El brings sigil key image + chosen passphrase.

## Session log — Jun 13 — GANYMEDE DONE (final render swapped)
- FINAL RENDER SHIPPED: Ganymede_Dolly_final.mp4 live in repo.
  720p chosen over 1080p (Veo upscale warped the mural — artwork
  stability test wins). Veo watermark cropped in HandBrake (bottom 48,
  sides 0). Pipeline locked: Veo 720p -> HandBrake H.264 RF19,
  Constant Framerate, keyint=1:min-keyint=1, Web Optimized, no audio,
  filters off, Pixel Aspect 1:1 (Display Size on Automatic — a stale
  manual 1242 was silently squeezing the frame 3%).
- SWAP PATCH SHIPPED (one commit, syntax-checked, zero leftovers):
  - g-cave-video source: draft -> Ganymede_Dolly_final.mp4
  - DELETED: #g-arrival-art JPG crossfade stub (CSS+HTML+JS)
  - DELETED: dormant left-wall museum-hang code (#g-artwork-wrap
    block, CSS+HTML+JS). vaRakingLight keyframe KEPT (Venus uses it).
  - gArrive rewired: scrub completes -> hint fades -> glass panel
    rises directly at 1400ms (was 2300ms waiting on crossfade)
  - 720px media query trimmed to #g-glass only
- ARTWORK DETAIL DECISION: baked mural owns the room (sacred,
  reflected, in-world). The detailed pencil original is PROMOTED to
  contemplation mode (future session): touch the mural -> true
  artwork opens full-detail. Timelapse + collect rite also live there.
- EL'S TEST CHECKLIST (live URL, hard refresh):
  1. foyer -> Ganymede: scrub travels the new cave, feels sacred
  2. arrival: glass rises from the water, no JPG flash, no seam
  3. glass panel position over new composition — verdict needed:
     does it crowd the mural/pool? (reposition is a future patch,
     judge only)
  4. ?mock=ganymede full conversation in panel
  5. mobile touch-drag scrub
- NEXT SHIP: Sigil Key v1 gate (proxy key-phrase check = also closes
  missing rate-limit/origin security hole + ritual gate UI in
  index.html). El brings: sigil key image pushed to repo + chosen v1
  passphrase. SEASON2.md added to repo (future unlocks vision —
  offer/surrender/transmute language locked).
- PARALLEL ZERO-CREDIT: chamber sigil designs x3, ambient loops for
  threshold/foyer, collect-rite page on paper.

## Session log — Jun 12 — SCRUB VERDICTS IN, RENDER BRIEF LOCKED
- SCRUB CONFIRMED by El on live test: approach feels like traveling
  THROUGH the cave. "Felt amazing." 8s duration is RIGHT — do not
  lengthen. Pacing of the draft is the reference; final render must
  match it.
- WARP VERDICT: whole-scene warp reads as dreamlike, not broken.
  NOT a hard fix requirement. Only constraint: artwork itself must
  stay stable/recognizable in the final 2 seconds of the landing.
- NO CODE CHANGED this session. index.html untouched.
- RENDER BRIEF FINALIZED (full text in Jun 12 conversation):
  Same cave, same 8s dolly threshold-POV -> square-on at arch.
  ONE change to the world: Ganymede artwork baked INTO the arch
  alcove, lit in-scene, REFLECTED in the water (rendered, not
  composited). Match draft exposure/haze. 1080p, all-intra/dense
  keyframes (video is scrubbed, never played).
- EL'S HOMEWORK (zero Claude credits): take brief to render tool,
  iterate there, judge against two tests with own eyes: (1) artwork
  stable at landing, (2) reflection present throughout. Bring only
  the WINNER. Push final mp4 to repo.
- NEXT SESSION (one patch): swap dolly URL draft -> final, delete
  JPG crossfade stub (#g-arrival-art becomes unnecessary — artwork
  lives in the video), arrival = glass panel rise only, remove
  dormant left-wall museum-hang code in same pass. One commit,
  Ganymede DONE. Then pattern rolls to Venus (future session).
## Session log — Jun 11 (f) — GANYMEDE SCRUB SHIPPED (draft)
- 3-WORD TEST PASSED: awe, curiosity, wonder. Cleared from docket.
- ARRIVAL DECISION: dissolve option dead. Final render will have artwork
  BAKED INTO arch alcove, lit in-scene, REFLECTED IN THE WATER (only
  baking gives the reflection), pillars fixed, 10-12s. ONE render spend
  at the end batches all fixes. Current crossfade to JPG is a stub —
  visible seam is expected until final render.
- BUILT (one patch, syntax-checked): Ganymede approach scrub.
  - Chamber bg = Ganymede_Dolly_draft.mp4 (8s, all-intra, 20MB, live
    in repo), paused, wheel + touch-drag scrub currentTime via RAF
    lerp (~3600px wheel = full approach, touch gain 2.4x).
  - "Scroll to approach" hint (Cinzel, breathing) at 2.6s, fades on
    first scroll.
  - Arrival (scrub completes): Ganymede_Artwork.jpg crossfades in
    centered over arch (#g-arrival-art, z5) -> 2.3s later frosted
    amber glass panel (#g-glass, 520px, blur 16px) fades up holding
    invitation + conversation + input. Scroll locks at arrival.
  - Legacy left-wall museum hang left DORMANT (code intact, never
    revealed) — arrival artwork replaces it. Cleanup later.
  - Dev shortcut: ?skip=approach jumps straight to arrival.
  - Oracle logic untouched (frozen): sendGany, candles, ritual,
    brighten arc, mock mode all work inside the glass panel.
- TEST CHECKLIST (El, live URL after push):
  1. foyer -> Ganymede: video frame 0, hint appears, scrub feels
     smooth and SACRED (the whole point)
  2. arrival: artwork fade timing, glass panel legibility over water
  3. ?mock=ganymede full conversation in glass panel
  4. mobile: touch-drag scrub
  5. judge: pillar warp visible during slow scrub? haze too dark on
     sunlit footage? approach too short at 8s?
- HOTFIX (same session): scrub loop died at entry — showScreen adds
  .active 200ms after call, loop's screen-active check failed and it
  self-terminated. Fixed: loop starts at +600ms; gScrubBy revives a
  dead loop on any scroll input (safety net).
- NEXT: El's verdicts from checklist -> one fix patch if needed ->
  finalize render brief -> pay for final render once.
## Session log — Jun 11 (e) — DESIGN LANGUAGE LOCKED
- NEW ARCHITECTURE (supersedes empty-arch plan): no more compositing
  flat assets over plates. Four rules:
  1. Art lives in the world, UI lives on glass — physical things
     (artwork, frames, sculpture) are BAKED INTO renders, lit in-scene.
     Interactive things (oracle text, input, options) are typography on
     frosted glass that admits it's an interface. Nothing pretends.
  2. The camera is the visitor — each chamber bg = one slow camera
     dolly video; SCROLL SCRUBS it (reuse existing foyer scrub engine).
  3. Scroll is the approach, stillness is the communion — scrub ends
     at the altar; oracle conversation = held frame, scroll locked.
  4. Hand off to the true asset at arrival — camera lands square-on at
     artwork -> crossfade render to high-res JPG (contemplation/collect).
- GANYMEDE = PILOT. Venus untouched until pattern proven.
- RENDER BRIEF (El, zero credits): cave WITH artwork baked into center
  arch, lit in-scene (gold drip can stay). One camera move 8-12s,
  1080p: START AT THRESHOLD/doorway POV (so the same video doubles as
  foyer->cave entry) -> slow dolly -> end square-on at the arch.
  Scrub-friendly encoding (dense keyframes). Render ROUGH DRAFT first;
  wire scroll to draft, only then pay for final quality.
- FOYER: no rebuild. Hub stays as-is. Choose first, then travel:
  altar click -> crossfade into chamber dolly start. Rejected: realtime
  3D free-roam foyer (months of WebGL, kills the painterly feel).
- BUILD SESSION (next, one patch): scroll-scrub chamber video +
  arrival crossfade to JPG + frosted-glass oracle panel (~520px, amber
  glass, smaller text, slow line-by-line reveal).
- STILL PENDING: El's incognito 3-word test + Venus walkthrough
  (3 flinch moments). API credits at console.anthropic.com to wake
  the oracle; ?mock=ganymede for free flow testing meanwhile.

## Session log — Jun 11 (d)
- BUG FIXED: medallion removal in (c) accidentally deleted the artwork
  CSS (deletion range overlapped). Artwork HTML+JS were intact; CSS
  restored, verified all 3 layers present, medallion still gone.
  Lesson: after any deletion patch, verify adjacent features survived.
- ORACLE TESTING: oracle code is frozen and working. To test live,
  confirm API credits are loaded at console.anthropic.com (Jun 11 root
  cause was zero credit balance). Until then, ?mock=ganymede and
  ?mock=venus test the full conversation flow with no API cost.

## Session log — Jun 11 (c)
- CUT: Ganymede timelapse medallion removed (CSS + HTML + JS, zero
  leftover refs). Reason: artwork appeared 4x on screen; the cave
  background already depicts "the making" (painted oval, artist's
  hand). Medallion clashed with that oval and was viewport-fragile.
  Ganymede_WIP.mp4/.mov stay in repo — timelapse will live inside
  contemplation mode (click hung artwork -> expand -> timelapse).
- Artwork hang confirmed good by El on live test.
- NEXT: El's homework (zero credits): walk full flow once, write the
  3 exact moments the experience breaks the dream. Bring all 3 + one
  screenshot in a single message next session. Fix moment #1 only.
  Then: ambient sound layer. Then: contemplation mode absorbs timelapse.

## Session log — Jun 11 (b)
- SHIPPED: Ganymede artwork museum-hang. Ganymede_Artwork.jpg mounted
  left cave wall (mirror of Venus treatment): perspective lean, wall
  shadow, raking torchlight (21s), Cinzel credit "Ganymede · El Liu".
  Reveals at 1.6s in entry stagger, resets on re-entry. Dust drifts in
  front (z3, before dust canvas in DOM); gold closing crossfade (z4)
  still covers it. Hidden <720px. Awaiting El's visual feedback.
- WORKFLOW: Claude now outputs the full updated CURRENT_STATE.md file
  at session end alongside index.html. El drags both into repo folder,
  one commit via GitHub Desktop. No more manual log pasting.
- NEXT: El walks full flow once, writes down the 3 exact moments the
  Venus experience breaks the dream. Next session = fix moment #1 only.
  Then: site-wide ambient sound layer.

## Session log — Jun 11
- Oracle 400 RESOLVED: root cause was API credit balance, not code.
  Client + proxy verified clean. Load credits, leave auto-reload OFF
  until proxy has origin check + rate limiting.
- DIRECTION RESET: oracle is FROZEN (finished, no new oracle features).
  New arc: 1) Ganymede artwork museum-hang + contemplation mode for all
  art, 2) site-wide ambient sound layer, 3) relic/mint design on paper.
  First 30 seconds of the site must deliver wonder before friction.

# ✦ Ancient Temenos — Current State
*Last updated: Session 2*

## Live Site
https://ellisliu7.github.io/ancient-temenos-assets

## Repo
https://github.com/ellisliu7/ancient-temenos-assets

---

## CRITICAL: Start Every Session With This

1. Read BIBLE.md, CHARACTERS.md, DECISIONS.md
2. Fetch latest code: `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
3. Save to /tmp/index.html
4. Work from /tmp/index.html only
5. Never push until syntax check passes: `node --check /tmp/t.js`

---

## Assets in Repo

| File | Used for | Status |
|------|----------|--------|
| Foyer.mp4 | Foyer background video | Live |
| Venus_Artwork.jpg | (removed from foyer) | Unused |
| Ganymede_Artwork.jpg | (removed from foyer) | Unused |
| Venus_Altar_Video.mp4 | Venus chamber background | Live |
| Venus_Compressed.glb | Venus 3D sculpture | Live |
| ganymedestatue-v1.glb | (replaced by new chamber) | Unused |
| ganymede_cave.jpg | Ganymede chamber background | Live |
| Ganymede_gold.jpg | Ganymede closing ritual | Live |
| Ganymede_WIP.mov | Timelapse — works on Safari | Live |
| Ganymede_WIP.mp4 | Timelapse — Chrome/Firefox | NOT YET (convert .mov) |
| Venus Wishing Well_1.mp4 | Wishing well background | Live |
| Sigil.mp4 | Sigil reveal background | Live |
| ascii-art.mp4 | Threshold background | Live |

---

## Build Status

### Threshold ✓
- Rune word field, "love" unlocks entry
- Entry congratulation sequence
- Working

### Foyer ✓
- Video: Foyer.mp4, simple play/loop at 0.75 speed
- Subtle text parallax on mouse move
- Four altar labels: Venus (bottom-left), Persephone (center-left), Psyche (center-right), Ganymede (bottom-right)
- Persephone + Psyche: "Opening soon" on click
- "Welcome home." heading + input bar center
- Council debate system: one API call, streams debate line by line
- Auto-transition to recommended chamber after debate ends
- Navigation to Venus + Ganymede: working

### Council Debate ✓
- One API call generates full 4-voice debate + RECOMMENDS: line
- Debate lines appear staggered (320ms each)
- Lines fade out before recommendation appears
- Recommended name appears alone, large
- Auto-enters chamber after 2.5s if live
- "Opening soon" + ask again if Persephone/Psyche recommended

### Venus Oracle ✓
- Cave image background (ganymede_cave.jpg)
- Video background (Venus_Altar_Video.mp4)
- 3D sculpture (Venus_Compressed.glb)
- Conversation thread with Kybalion-based JSON responses
- Wishing Well + Sigil generation
- Grimoire (seal + copy conversation)
- Cupid / 528hz frequency toggle
- Closing bridge to Ganymede

### Ganymede Chamber ✓ (new experience)
- Full screen: ganymede_cave.jpg background, starts dark, brightens each exchange
- God rays intensify from exchange 3 onwards
- Timelapse video (Ganymede_WIP.mov) plays top-right, framed "WITNESS THE MAKING"
- Arrival: "You came here to build something. What is it?" fades in
- Conversation: floating text center screen, no chat thread
- Options: three candle flames — tap one, others extinguish
- Journey-style ending: cave dims → gold artwork crossfades → "The blueprint is set. Now go build it." → black → foyer

### Persephone chamber — NOT BUILT (no artwork yet)
### Psyche chamber — NOT BUILT (no artwork yet)

---

## Known Issues / TODO

### High Priority
- [ ] Convert Ganymede_WIP.mov to .mp4 for Chrome/Firefox support
- [ ] Venus chamber: check if 3D sculpture still loads correctly
- [ ] Test full flow end-to-end on GitHub (threshold → foyer → council → chamber)

### Medium Priority
- [ ] Foyer: fonts still not matching CONCEPT1 exactly
- [ ] Free vs membership tier split
- [ ] Mobile polish

### Low Priority
- [ ] Persephone chamber (needs artwork)
- [ ] Psyche chamber (needs artwork)
- [ ] Move API key to serverless function before public launch

---

## How to Work Efficiently With Claude

### Rule 1: Short focused sessions
Each session = one feature only. Don't try to fix 5 things at once.

### Rule 2: Always start with this prompt
```
Fetch the bible and latest code from GitHub. 
Read CURRENT_STATE.md, BIBLE.md, CHARACTERS.md.
Today I want to: [ONE SPECIFIC THING]
```

### Rule 3: Always end with this prompt
```
Update CURRENT_STATE.md with what we built today 
and what's broken. Give me the file to push.
```

### Rule 4: Syntax check before every push
Claude runs `node --check` before every output. 
Never push if you see an error.

### Rule 5: Test on GitHub before moving on
Push → hard refresh → test the specific thing → confirm it works → next session.

### Rule 6: One file at a time
Never ask Claude to change multiple features in one message.
"Fix the council AND the foyer AND the fonts" = bad session.
"Fix the council" = good session.

---

## Next Session Priority Order

1. Convert Ganymede_WIP.mov → .mp4 (do this yourself, 2 mins at cloudconvert.com)
2. Test full flow on GitHub — report what breaks
3. Fix any broken parts one at a time
4. Venus chamber audit — make sure it still works after Ganymede rebuild
5. Foyer font polish toward CONCEPT1
