## Session log — Jun 11
- Oracle 400 RESOLVED: root cause was API credit balance, not code.
  Client + proxy verified clean. Load $5-10 credits, leave auto-reload
  OFF until proxy has origin check + rate limiting.
- DIRECTION RESET: oracle is FROZEN. No new oracle features.
  New arc: 1) Ganymede artwork museum-hang + contemplation mode,
  2) site-wide ambient sound layer, 3) relic/mint design on paper.
  First 30 seconds must deliver wonder before friction.
- WORKFLOW: CURRENT_STATE.md is now repo-sourced. Claude fetches it
  at session start via raw GitHub URL. No more manual uploads.

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

## Session log — Jun 11
- Oracle 400 RESOLVED: root cause was API credit balance, not code.
  Client + proxy verified clean. Load credits, leave auto-reload OFF
  until proxy has origin check + rate limiting.
- DIRECTION RESET: oracle is FROZEN (finished, no new oracle features).
  New arc: 1) Ganymede artwork museum-hang + contemplation mode for all
  art, 2) site-wide ambient sound layer, 3) relic/mint design on paper.
  First 30 seconds of the site must deliver wonder before friction.
