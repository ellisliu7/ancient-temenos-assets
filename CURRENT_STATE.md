## Session log — Jun 16 — GANYMEDE FLOW FIXES

VERIFIED:
- ganyKeyWelcome works live — glass reappears cleanly after typing 'remember' ✓
- openGrimoire() already pulls from gHistory — Ganymede content works as-is ✓

FIXES SHIPPED:
- Candle click: options now fade out (0.6s opacity) before clearing,
  thinking dots appear immediately — no more silent void after picking an option
- ganyRitual() end: removed flashTo(foyer). Glass panel now reappears
  after the closing ritual with "✦ Seal this into my Grimoire ✦" button
  fading in. User seals the session, then navigates back themselves.

SIDE SESSION:
- Built founder council tool (5-agent AI artifact) for daily prioritization.
  One API call, five perspectives, one synthesis. Lives in Claude chat,
  not in the repo. Rebuild anytime: "Show me the Ancient Temenos founder council artifact"

KNOWN OPEN:
- Test full Ganymede flow: ?mock=ganymede&reset → pick option → dots appear?
  → ritual plays → grimoire button appears?
- ?skip=entry still hardcoded to Venus — Ganymede has no direct skip URL
- Venus gate + key ritual not yet built

NEXT: Verify Ganymede patch live. Then Venus gate — replicate
ganyGate() + ganyKeyWelcome() pattern for Venus chamber.
Start prompt: "Read CURRENT_STATE.md. Fetch live index.html.
I want to build the Venus gate today."

## Session log — Jun 14 — GATE WAITLIST + KEY WELCOME + OPTIONS POLISH

GATE FLOW:
- "Become an Initiate" → "Request a Sigil Key"
- Click reveals inline waitlist panel (email only, Formspree xkoakgkk)
- Submit → "You are remembered." → auto-fades to foyer after 3.5s
- "I hold a Key" flow unchanged

KEY UNLOCK:
- Now calls ganyKeyWelcome() instead of ganyRitual()
- Shorter ritual (dim + gold glow), then glass reappears, conversation continues
- Ritual copy: "The gate remembers you. / You may descend as far as you wish."
- Keyholder note appears on unlock: "More of the temple awakens with each Key."
- Ritual text bleed fix: words.style.opacity='0' at cleanup (was '1')
- NOTE: ganyKeyWelcome untested live — verify glass reappears cleanly

OPTIONS:
- #g-options now flex-column so eyebrow + context sit above candle row
- showCandles() renders Cormorant context sentence + Cinzel eyebrow
  ("THE NEXT STONE IS YOURS TO PLACE") above 3 horizontal options
- Eyebrow fades in at 500ms, dim gold, quiet
- context field from GSYS JSON rendered when present
- Option hover: text-shadow gold glow, consistent with gate buttons

TYPOGRAPHY:
- Ritual line 2: font-style oblique 8deg (~25% less lean than full italic)

KNOWN OPEN:
- ?skip=entry hardcoded to Venus — Ganymede has no direct skip URL
- Test with ?mock=ganymede&reset (full flow) only
- ganyKeyWelcome + auto-foyer-fade untested live — verify next session

NEXT: Venus room. New chat. Replicate Ganymede's experience for Venus.
Start prompt: "Read CURRENT_STATE.md and MILESTONES.md. Fetch the live
index.html. I want to build Venus's room today."

## Session log — Jun 13/14 — STRATEGY SESSION (no code)
- TWO NEW REPO DOCS created and pushed alongside this file:
  * MILESTONES.md — 14-day V1 launch plan. V1 = ONE perfected path
    (arrival -> council -> Ganymede -> grimoire), invite-only keys.
    Cut list: NFT/wallet, Persephone, Psyche, Supabase, file-split.
    Has a daily ritual + parking lot. This is the tracker to check
    against each session.
  * CHAMBER_TEMPLATE.md — reusable 10-section SOP for future chambers
    (soul test, wound/theme, voice, environment, ritual, oracle,
    animation, sound, art integration, collector, completion). Copy
    it to birth Persephone/Psyche. Do NOT build a new chamber yet.
- 80/20 finding: emotional impact lives in 4 moments only — first 10s,
  council seeing you, oracle's first precise reflection, grimoire.
  A third chamber adds surface area, not depth. Perfect ONE path.
- SESSION HYGIENE established: one focused task per conversation, then
  start fresh (single 222KB file = context cost compounds). New-session
  prompt: "Read CURRENT_STATE.md and MILESTONES.md. Fetch the live
  index.html. Don't make changes yet — tell me which milestone I'm in,
  the single next ship, and what to cut. Then wait for my go."
- NEXT SHIP (unchanged, top of MILESTONES Days 1-3): decide Ganymede
  gate backdrop (artwork vs darkness) -> one patch -> walk cold-stranger
  test -> send live link to 10 people. Validate demand BEFORE building
  NFT verification.
- TOOLING: stay on Opus-in-this-Project. Cowork later if doc upkeep
  gets heavy. iOS app for testing the live URL on the go.

## Session log — Jun 13 — GATE TESTABILITY + OPTION ORDERING
- "I don't see the gate" diagnosis: El typed the key ('remember')
  earlier while testing the unlock, so localStorage holds the key and
  the gate correctly no longer fires for an initiate. Gate logic is
  working. FIX for testing: entering Ganymede in mock mode (or with
  ?reset in the URL) now clears the stored key, so the gate shows
  every time you walk the mock. To test as an initiate, type the key
  during that session.
- OPTION ORDERING hardened: gStream now resolves only AFTER the last
  line's full 3s fade completes (res delay 2600 -> 3200), and options
  appear 1100ms after that (was 700). Options can no longer overlap a
  still-fading final line. With the hard cap, the 3rd (gated) free
  turn shows no options at all; options only appear on earlier
  choice-turns or for initiates.
- TEST: ?mock=ganymede -> 3 messages. Msg with options: text fully
  settles, clear beat, THEN options. Msg 3 (free): text finishes ->
  gate. Type 'remember' -> ritual + grimoire. Re-enter mock -> key
  cleared, gate returns.

Unchanged: G_GATE_PASS='remember' client placeholder; "Become an
Initiate" -> opensea placeholder; real gate = proxy NFT verification
(next big build, deferred until El validates demand with the live
link). Open: gate backdrop (artwork vs darkness) still El's call.

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
  reads as Venus footage)
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
