# ✦ Venus Relic — Single-Patch Spec (post-demo)

**Status:** Ready to drop. Do NOT apply until the Friday demo is shipped and verified.
**Scope:** One relic, one chamber (Venus), one fragment, one act of memory. Nothing more.
**Architecture impact:** None. Additive overlay only. Reuses existing overlay convention, motion grammar, `localStorage`, locked typography. Touches no demo-path function.

---

## The feeling, encoded

A relic is *found*, not presented. The magic is three cheap moves — if any one is missing, it becomes a content page:

1. **Not obvious** — no label, no button. A faint glint over a detail of the artwork. The curious find it; the hurried miss it.
2. **Weighty reveal** — it does not pop open. The dark rises slowly, the art fades in, then the fragment, then the way out. The pause is most of the magic.
3. **Remembered** — once found, the glint changes from faint-breathing to steady-glow. The world acknowledges you uncovered it, and still knows on return.

VAD is deliberately absent — with one relic there is no climate to tune. Revisit only at many-relics scale, and only as the *weather of the reveal*, never as a selector.

---

## What you build

Three self-contained pieces, all namespaced `vrelic-` so nothing collides. The only integration point is choosing where the glint sits over the artwork (your eyes, on device) and one line to reveal it when Venus loads.

### 1 — Markup (place the glint inside the Venus chamber container)

```html
<!-- ===== VENUS RELIC (additive, post-demo) ===== -->
<!-- Glint: sits over a meaningful detail of the artwork. No label. -->
<div id="vrelic-glint" class="vrelic-glint" onclick="openVenusRelic()"></div>

<!-- Reveal overlay: follows existing overlay convention, sits above all screens -->
<div id="vrelic-overlay" class="vrelic-overlay">
  <div class="vrelic-stage">
    <div class="vrelic-art" id="vrelic-art"></div>
    <div class="vrelic-name" id="vrelic-name"></div>
    <div class="vrelic-fragment" id="vrelic-fragment"></div>
    <div class="vrelic-dismiss" onclick="closeVenusRelic()">return</div>
  </div>
</div>
```

### 2 — Styles (palette + typography locked; gold emerges from darkness)

```css
/* glint — faint, breathing, no label */
.vrelic-glint{
  position:absolute; width:14px; height:14px; border-radius:50%;
  top:42%; left:55%;                 /* POSITION on device, over the chosen detail */
  background:radial-gradient(circle, rgba(238,220,168,0.9), rgba(238,220,168,0) 70%);
  opacity:0; cursor:pointer;
  animation: vrelic-breathe 6s ease-in-out infinite;
  transition: opacity 1.2s ease;
}
.vrelic-glint.visible{ opacity:.35; }                         /* faint until found */
.vrelic-glint.found{ animation: vrelic-glow 5s ease-in-out infinite; }  /* steady acknowledgment */
@keyframes vrelic-breathe{ 0%,100%{transform:scale(1);opacity:.18} 50%{transform:scale(1.4);opacity:.4} }
@keyframes vrelic-glow{ 0%,100%{opacity:.45} 50%{opacity:.7} }

/* reveal — rises from black, slow, ceremonial */
.vrelic-overlay{
  position:fixed; inset:0; z-index:95;
  background:radial-gradient(ellipse at center, rgba(20,14,10,.96), rgba(0,0,0,.99));
  display:flex; align-items:center; justify-content:center;
  opacity:0; pointer-events:none; transition:opacity 1.2s ease;
}
.vrelic-overlay.open{ opacity:1; pointer-events:auto; }
.vrelic-stage{ max-width:560px; text-align:center; padding:8vh 6vw;
  transform:translateY(18px); transition:transform 1.4s ease; }
.vrelic-overlay.open .vrelic-stage{ transform:translateY(0); }

.vrelic-art{
  width:220px; height:220px; margin:0 auto 2.4rem; border-radius:4px;
  background-size:cover; background-position:center;
  box-shadow:0 0 60px rgba(238,220,168,.12);
  opacity:0; transition:opacity 1.6s ease .3s;
}
.vrelic-overlay.open .vrelic-art{ opacity:1; }

.vrelic-name{                          /* Almendra — intimate title only */
  font-family:'Almendra', serif; font-style:italic; font-size:1.5rem;
  color:rgba(238,220,168,.9); margin-bottom:1.4rem;
  opacity:0; transition:opacity 1.4s ease 1.0s;
}
.vrelic-fragment{                      /* Cormorant — oracle/body voice */
  font-family:'Cormorant Garamond', serif; font-style:italic;
  font-size:1.35rem; line-height:1.9; color:rgba(245,240,228,.86);
  opacity:0; transition:opacity 1.6s ease 1.6s;
}
.vrelic-overlay.open .vrelic-name,
.vrelic-overlay.open .vrelic-fragment{ opacity:1; }

.vrelic-dismiss{                       /* Cinzel — sacred label */
  font-family:'Cinzel', serif; font-size:.7rem; letter-spacing:.3em; text-transform:uppercase;
  color:rgba(238,220,168,.4); margin-top:3.2rem; cursor:pointer;
  opacity:0; transition:opacity 1.2s ease 2.4s, color .4s ease;
}
.vrelic-overlay.open .vrelic-dismiss{ opacity:1; }
.vrelic-dismiss:hover{ color:rgba(238,220,168,.8); }
```

### 3 — Logic (the fragment is yours to own; placeholder below in Venus's voice)

```js
// ----- Venus Relic -----
const VRELIC = {
  art: 'https://raw.githubusercontent.com/ellisliu7/ancient-temenos-assets/main/Venus_Artwork.jpg',
  // PLACEHOLDER — replace with your words. Almendra title + short Cormorant fragment.
  name: 'The Mirror That Does Not Flatter',
  fragment: 'You have been waiting to be told you are allowed.\n'
          + 'No one is coming to tell you.\n'
          + 'That was never how permission worked.'
};

// Call this one line where Venus becomes visible (end of the existing reveal moment)
function vrelicReveal(){
  const g = document.getElementById('vrelic-glint');
  if(!g) return;
  g.classList.add('visible');
  if(localStorage.getItem('at_relic_venus_found') === 'true') g.classList.add('found');
}

function openVenusRelic(){
  const o = document.getElementById('vrelic-overlay');
  document.getElementById('vrelic-art').style.backgroundImage = `url('${VRELIC.art}')`;
  document.getElementById('vrelic-name').textContent = VRELIC.name;
  document.getElementById('vrelic-fragment').innerHTML = VRELIC.fragment.replace(/\n/g,'<br>');
  o.classList.add('open');
  localStorage.setItem('at_relic_venus_found','true');
  const g = document.getElementById('vrelic-glint'); if(g) g.classList.add('found');
}

function closeVenusRelic(){
  document.getElementById('vrelic-overlay').classList.remove('open');
}

// dev flags: ?relic=reset clears memory · ?relic=venus auto-opens for animation tuning
(function(){
  const p = new URLSearchParams(location.search);
  if(p.get('relic') === 'reset') localStorage.removeItem('at_relic_venus_found');
  if(p.get('relic') === 'venus') setTimeout(openVenusRelic, 800);
})();
```

**Only integration line:** call `vrelicReveal()` at the end of whatever function already reveals the Venus chamber / artwork moment. That's the entire hook.

---

## The fragment — your hand, not code

The placeholder is written in Venus's register (gentle truth, spoken as the seeker, no buzzwords). Replace it with yours. Keep the discipline:
- **One title** (Almendra), evocative, names the relic as an object — not a topic.
- **2–4 short lines** (Cormorant), a single gentle truth. Not an explanation, not a lesson. Relics are terse and weighty.
- Choose the artwork detail the glint sits over so it *means* something — the mirror, the rose, the goblet. The detail and the fragment should rhyme.

---

## Verify (do not ship until all pass)

1. `?skip=venus&key=1&relic=reset` → enter Venus → a faint glint breathes over the chosen detail. No label anywhere.
2. Find and tap the glint → dark rises ~1.2s → art fades in → name, then fragment, then `return` arrive in sequence, slowly. Nothing snaps.
3. Tap `return` → fades out → glint is now a steady glow (found state).
4. Reload `?skip=venus&key=1` → glint is still steady-glow. The world remembered.
5. `?relic=venus` → reveal auto-opens, for tuning timings alone.

**Do NOT touch:** council, corridor, routing, grimoire, or any demo-path function. The glint lives only inside the Venus chamber container. If a change wants to reach outside that, stop.

---

## Where this sits in the project

- **Post-demo.** First patch after Friday is shipped and verified.
- **Coexists fully** with council/chamber architecture — it's the wandering layer *inside* a room that already exists. Oracle is for seeking; relic is for being.
- **Not a pivot.** It's the most direct expression yet of the locked core truth: the artwork is the soul of the temple. You're arriving at the center, not leaving it.
