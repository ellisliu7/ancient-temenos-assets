## Session log — Jun 16 — VENUS APPROACH VIDEO CREATED

CREATIVE DIRECTION DECIDED:
Venus approach: Hall of Mirrors baroque corridor → fade to black → bath chamber
with rose petal pool, god ray, sculpture on dais. Two acts of one journey.
Fade to black between them = the threshold crossing, not a technical seam.

KEY DECISIONS:
- GLB sculpture retired for Venus room (Path B chosen). It floated awkwardly
  against bright marble. El's artwork is the relic. The environment holds the mythology.
- Approach video ends before reaching the sculpture — user arrives at the room,
  oracle panel rises, conversation IS the final approach.
- Flow content filter blocked sculpture renders (classical torso = flagged).
  Worked around: corridor animated from still, bath chamber rendered via Kling
  with sculpture on dais (different tool, no filter issue).

VIDEO PIPELINE:
- Clip 1: Baroque mirror corridor, slow push forward, ~5s total combined
- Clip 2: Bath chamber, god ray, rose petal pool, sculpture on dais
- Stitched in Final Cut Pro: corridor → fade to black → chamber
- Watermark cropped in FCP (not HandBrake crop this time)
- HandBrake: H.264 RF19, CFR 30fps, keyint=1:min-keyint=1,
  Web Optimized ✓, no audio, filters off, 1280x720
- Output: Venus.mp4 — pushed to ancient-temenos-assets repo
- Total duration: ~5 seconds

NEXT SESSION — wire the Venus scroll-scrub approach engine:
Architecture mirrors Ganymede's gScrub engine exactly, but Venus aesthetic:
- New screen: va-approach (holds the scrub video, scroll hint, arrives → vaInitRoom)
- venusAltarLayer becomes the room you land in (unchanged)
- Scroll hint copy: Cormorant italic (not Cinzel) — "draw closer" or similar
- On arrival: oracle panel materialises softly (opacity/blur fade, not glass rise)
- Dismiss: click outside or Esc sinks panel; scroll scrubs back slightly then recalls
- vaInitRoom refactored: fires on vArrive(), not on enterVenusAltar()
- Dev shortcut: ?skip=venus drops straight into arrived state

OPEN:
- Gate copy still has old placeholder text — needs replacing before real visitors
- Ganymede check_in → grimoire flow untested with live oracle + key

START PROMPT FOR NEXT SESSION:
"Read CURRENT_STATE.md. Fetch live index.html.
We are wiring the Venus scroll-scrub approach engine.
Venus.mp4 is live in the repo. Don't make changes yet —
show me the architecture plan first, then wait for my go."

---

## Session log — Jun 16 — ORACLE RESTORED + DEV SHORTCUTS + DATE FIX

ROOT CAUSE FOUND: Anthropic deprecated `claude-sonnet-4-20250514`. All proxy
calls were returning 400. Fixed in `api/oracle.js` → model now `claude-sonnet-4-6`.
Vercel redeployed and confirmed live.

SECONDARY CAUSE: No Anthropic API credits. Added $10 via console.anthropic.com.
Oracle is now live and responding correctly.

PATCHES TO index.html:
- Today's date injected into GSYS at runtime so Ganymede's date math is accurate
- `?key=1` URL param grants Sigil Key in localStorage for dev/testing
- `?skip=ganymede` URL param drops directly into Ganymede cave as keyholder
- `?skip=entry` unchanged (still goes to Venus)

DEV TEST URL (use this every session to test Ganymede live):
https://ellisliu7.github.io/ancient-temenos-assets/?skip=ganymede&key=1

KNOWN OPEN (observed in testing this session):
- Ganymede voice feels slightly less sharp than peak — monitor on live oracle
- check_in → grimoire flow untested with live oracle + key (test next)
- Gate copy still has old placeholder text ("Ship the rough version / Send to 3 people")
  — needs replacing with something that fits the temple soul before any real visitors

VISION NOTE (this session):
El clarified the true north: Ancient Temenos is a legacy, not a product.
Built for a future child. A letter across time. The oracles are El's wisdom
translated into a form that can outlive her and speak to someone she hasn't met yet.
El's artwork is proof a real person who loved them made this.
This changes the standard: not "does this convert" but "will this feel true in 20 years."

NEXT SESSION:
1. Test full Ganymede flow with ?skip=ganymede&key=1 — oracle → options → deep dive → check_in → grimoire
2. If check_in fires cleanly → Ganymede flow is DONE
3. Then: open fresh session for Venus room (replicate Ganymede's flow)
4. Gate copy replacement (low effort, high importance before real visitors)

Start prompt for next session:
"Read CURRENT_STATE.md and MILESTONES.md. Fetch live index.html.
Don't make changes yet — tell me which milestone I'm in, the single next ship, and what to cut. Then wait for my go."

---

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
- ?skip=entry hardcoded to Venus — FIXED this session (?skip=ganymede now works)
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
