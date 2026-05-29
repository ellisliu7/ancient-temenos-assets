# ✦ Ancient Temenos — Current State

## Live Site
https://ellisliu7.github.io/ancient-temenos-assets

## Repo
https://github.com/ellisliu7/ancient-temenos-assets

---

## CRITICAL: Start Every Session With This

1. Read this file
2. Read BIBLE.md, CHARACTERS.md, DECISIONS.md
3. Fetch latest code: `https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/index.html`
4. Save to /tmp/index.html
5. Work from /tmp/index.html only
6. Never push until verified

---

## Current Build (as of last session)

### Threshold ✓
- Rune word field, "love" unlocks entry
- Entry congratulation sequence
- Working

### Foyer ✓ (mostly)
- Video: Foyer.mp4 (updated)
- Hybrid video scrubber: auto pendulum + mouse scrub
- Four altar figures: Venus (left), Persephone (center-left), Psyche (center-right), Ganymede (right)
- Persephone + Psyche: coming soon (no artwork, filtered placeholders)
- Oracle wheel SVG centered
- Council input bar at bottom
- Council fires 4 parallel AI responses (placeholder — needs real debate system)
- Navigation to Venus + Ganymede: working

### Venus Oracle ✓
- Video background
- 3D sculpture (Venus_Compressed.glb)
- Conversation thread with Kybalion-based responses
- Wishing Well
- Grimoire
- Cupid / 528hz frequency toggle
- Closing bridge to Ganymede

### Ganymede ✓
- Cave video (reverse playback)
- 3D sculpture (ganymedestatue-v1.glb)
- Conversation thread
- Timeline Pool (Persephone antechamber placeholder)
- Bronze / Holographic texture toggle

### Persephone chamber — NOT BUILT
### Psyche chamber — NOT BUILT

---

## Known Bugs / TODO

### High Priority
- [ ] Foyer council: replace 4 parallel responses with real-time debate system
- [ ] Foyer layout: doesn't match CONCEPT1.jpg yet (figures too equal-width, no depth)
- [ ] Venus sculpture: position bug (Three.js r128 read-only property — wrap in THREE.Group)

### Medium Priority
- [ ] Free vs membership tier split (foyer free, chamber oracle gated)
- [ ] Foyer figure labels: update to CONCEPT1 style (name, tagline, symbol below)
- [ ] Council debate: ends with suggestion + "which is calling you?"

### Low Priority
- [ ] Persephone chamber (needs artwork first)
- [ ] Psyche chamber (needs artwork first)
- [ ] Mobile polish

---

## Assets in Repo

| File | Used for |
|------|----------|
| Foyer.mp4 | Foyer background video |
| Venus_Artwork.jpg | Venus altar figure |
| Ganymede_Artwork.jpg | Ganymede altar figure |
| Venus_Altar_Video.mp4 | Venus chamber background |
| Ganymede Cave_1.mp4 | Ganymede chamber background |
| Venus_Compressed.glb | Venus 3D sculpture |
| ganymedestatue-v1.glb | Ganymede 3D sculpture |
| Venus Wishing Well_1.mp4 | Wishing well background |
| Sigil.mp4 | Sigil reveal background |
| ascii-art.mp4 | Threshold background |
| Portal Frame.png | (unused currently) |

---

## Next Priorities (in order)

1. Real-time council debate system (foyer)
2. Foyer layout polish toward CONCEPT1
3. Venus sculpture fix
4. Membership/free tier gate
5. Persephone + Psyche chambers (after artwork)
