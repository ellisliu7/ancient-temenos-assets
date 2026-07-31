/* Ancient Temenos — corridor transport tests.
   Extracts the real functions out of index.html and exercises them against the
   mobile failure modes that caused the freeze. No copies: if index.html
   changes, this tests the change. */

const fs = require('fs');
const vm = require('vm');

const HTML = __dirname + '/index.html';
const src = fs.readFileSync(HTML, 'utf8');

/* ── pull the shipped source of the functions under test ─────────────────── */
function grab(startMarker, endMarker) {
  const a = src.indexOf(startMarker);
  if (a < 0) throw new Error('marker not found: ' + startMarker);
  const b = src.indexOf(endMarker, a);
  if (b < 0) throw new Error('end marker not found: ' + endMarker);
  return src.slice(a, b);
}

const transport = grab('const CORRIDOR_STALL_MS', '// ══ VENUS APPROACH');
const venus = grab('let vaScrub={target:0', 'function vaOnTouchEnd(){vaTouchY=null;}')
            + 'function vaOnTouchEnd(){vaTouchY=null;}\n'
            + grab('function vaScrubBy(px){', 'function vaArrive(){');

/* ── minimal stage ───────────────────────────────────────────────────────── */
let now = 0;
const timers = [];
function makeCtx(video, screenActive) {
  const elements = {
    'va-video': video,
    'venusApproach': { classList: { contains: () => screenActive() } },
  };
  const ctx = {
    console,
    document: {
      getElementById: id => elements[id] || null,
    },
    requestAnimationFrame: fn => { timers.push({ at: now + 16, fn, raf: true }); return timers.length; },
    setTimeout: (fn, ms) => { timers.push({ at: now + (ms || 0), fn }); return timers.length; },
    clearTimeout: id => { if (timers[id - 1]) timers[id - 1].cancelled = true; },
    Math, isFinite, Promise,
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  // `let`-bound state is script-scoped, not a global property — expose it.
  vm.runInContext(transport + '\n' + venus +
    '\nglobalThis.__scrub = () => vaScrub;', ctx);
  Object.defineProperty(ctx, 'vaScrub', { get: () => ctx.__scrub() });
  return ctx;
}

function advance(ms, ctx) {
  const end = now + ms;
  let guard = 0;
  while (now < end && guard++ < 500000) {
    const next = timers.filter(t => !t.cancelled && !t.done && t.at <= end)
                       .sort((a, b) => a.at - b.at)[0];
    if (!next) break;
    now = next.at;
    next.done = true;
    try { next.fn(); } catch (e) { console.log('  timer threw:', e.message); }
  }
  now = end;
}

/* a video that behaves the way a phone behaves */
function makeVideo(opts = {}) {
  const listeners = {};
  return {
    readyState: opts.readyState === undefined ? 1 : opts.readyState,
    duration: opts.duration === undefined ? 5.166 : opts.duration,
    currentTime: 0, muted: true, playbackRate: 1,
    played: false, paused: true,
    addEventListener(t, fn) { (listeners[t] = listeners[t] || []).push(fn); },
    _fire(t) { (listeners[t] || []).forEach(f => f()); },
    play() {
      this.played = true; this.paused = false;
      return opts.autoplayRefused ? Promise.reject(new Error('NotAllowed')) : Promise.resolve();
    },
    pause() { this.paused = true; },
  };
}

/* a touch event, with a target that may or may not sit inside a panel */
function touch(y, insidePanel) {
  let prevented = false;
  return {
    cancelable: true,
    touches: [{ clientY: y }],
    target: { closest: sel => (insidePanel && sel.includes('#va-glass')) ? {} : null },
    preventDefault() { prevented = true; },
    get prevented() { return prevented; },
  };
}

/* ── assertions ──────────────────────────────────────────────────────────── */
let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log('  \x1b[32m✓\x1b[0m ' + name); }
  else { fail++; console.log('  \x1b[31m✗\x1b[0m ' + name + (detail ? '  → ' + detail : '')); }
}

/* ════════════════════════════════════════════════════════════════════════ */
console.log('\nA. Film never becomes seekable (cold mobile connection)');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 1 });          // metadata only, forever
  const ctx = makeCtx(v, () => true);
  ctx.vaScrub.dur = 5.166;
  ctx.corridorWatch(v, ctx.vaScrub, () => { ctx.vaScrub.arrived = true; }, () => true);

  const t0 = touch(600); ctx.vaOnTouchStart(t0);
  const t1 = touch(400); ctx.vaOnTouchMove(t1);
  ok('touchmove does NOT swallow the gesture', !t1.prevented,
     'preventDefault was called with an unseekable film — this is the freeze');

  advance(4000, ctx);
  ok('watchdog hands the visitor to the film', ctx.vaScrub.carried === true);
  ok('the film is playing', v.played === true);
  ok('it walks a little under speed', v.playbackRate === 0.8, 'rate=' + v.playbackRate);

  v._fire('ended');
  ok('the chamber opens when the film ends', ctx.vaScrub.arrived === true);
}

console.log('\nB. Film 404s or the decoder rejects it');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 0 });
  const ctx = makeCtx(v, () => true);
  ctx.corridorWatch(v, ctx.vaScrub, () => { ctx.vaScrub.arrived = true; }, () => true);
  v._fire('error');
  advance(50, ctx);
  ok('a broken film still opens the chamber', ctx.vaScrub.arrived === true);
}

console.log('\nC. Autoplay refused as well (worst case)');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 1, autoplayRefused: true });
  const ctx = makeCtx(v, () => true);
  ctx.corridorWatch(v, ctx.vaScrub, () => { ctx.vaScrub.arrived = true; }, () => true);
  advance(4000, ctx);
  advance(100, ctx);                                 // let the rejection settle
  return Promise.resolve().then(() => {
    advance(100, ctx);
    ok('the visitor is never stranded', ctx.vaScrub.arrived === true || ctx.vaScrub.carried === true);
    rest();
  });
}

function rest() {
console.log('\nD. Film is seekable — the gesture is honoured');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 4 });
  const ctx = makeCtx(v, () => true);
  ctx.vaScrub.dur = 5.166;

  const t0 = touch(600); ctx.vaOnTouchStart(t0);
  const t1 = touch(300); ctx.vaOnTouchMove(t1);
  ok('touchmove claims the gesture', t1.prevented === true);
  ok('the corridor moves', ctx.vaScrub.target > 0, 'target=' + ctx.vaScrub.target);

  // scrub all the way down
  for (let i = 0; i < 40; i++) ctx.vaScrubBy(400);
  ok('target reaches the end of the film', ctx.vaScrub.target >= 5.16);
}

console.log('\nE. A touch that begins inside the oracle panel');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 4 });
  const ctx = makeCtx(v, () => true);
  ctx.vaScrub.dur = 5.166;
  const t0 = touch(600, true); ctx.vaOnTouchStart(t0);
  const t1 = touch(400, true); ctx.vaOnTouchMove(t1);
  ok('the panel keeps its own scroll', !t1.prevented);
}

console.log('\nF. After arrival');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 4 });
  const ctx = makeCtx(v, () => true);
  ctx.vaScrub.dur = 5.166;
  ctx.vaScrub.arrived = true;
  const t0 = touch(600); ctx.vaOnTouchStart(t0);
  const t1 = touch(400); ctx.vaOnTouchMove(t1);
  ok('the corridor lets go completely', !t1.prevented);
}

console.log('\nG. Visitor leaves before the corridor resolves');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 1 });
  let active = true;
  const ctx = makeCtx(v, () => active);
  ctx.corridorWatch(v, ctx.vaScrub, () => { ctx.vaScrub.arrived = true; }, () => active);
  active = false;                                    // they hit Return
  advance(30000, ctx);
  ok('no chamber opens behind their back', ctx.vaScrub.arrived === false);
}

console.log('\nH. A visitor who lingers is left alone');
{
  now = 0; timers.length = 0;
  const v = makeVideo({ readyState: 4 });           // film is fine, just savoured slowly
  const ctx = makeCtx(v, () => true);
  ctx.vaScrub.dur = 5.166;
  ctx.corridorWatch(v, ctx.vaScrub, () => { ctx.vaScrub.arrived = true; }, () => true);
  for (let i = 0; i < 8; i++) { ctx.vaScrubBy(40); advance(9000, ctx); }   // 72s of slow looking
  ok('no clock is put on the corridor', ctx.vaScrub.arrived === false);
  ok('and they were never handed to the film', ctx.vaScrub.carried === false);
}

console.log('\n' + (fail === 0
  ? `\x1b[32mALL ${pass} CHECKS PASSED\x1b[0m`
  : `\x1b[31m${fail} FAILED\x1b[0m, ${pass} passed`));
process.exit(fail === 0 ? 0 : 1);
}
