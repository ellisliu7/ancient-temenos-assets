/* Ancient Temenos — foyer geometry and oracle transport tests.
   Extracts the shipped functions out of index.html and exercises them. No
   copies: if index.html changes, this tests the change. */

const fs = require('fs');
const vm = require('vm');

const src = fs.readFileSync(__dirname + '/index.html', 'utf8');

function grabFn(name) {
  let a = src.indexOf('function ' + name + '(');
  if (a < 0) a = src.indexOf('window.' + name + '=function(');   // window-assigned
  if (a < 0) throw new Error('function not found: ' + name);
  if (src.slice(a - 6, a) === 'async ') a -= 6;   // keep the async keyword
  // walk braces from the first { after the signature
  let i = src.indexOf('{', a), depth = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === '{') depth++;
    else if (src[j] === '}') { depth--; if (depth === 0) return src.slice(a, j + 1); }
  }
  throw new Error('unbalanced: ' + name);
}

let pass = 0, fail = 0;
function ok(name, cond, detail) {
  if (cond) { pass++; console.log('  \x1b[32m✓\x1b[0m ' + name); }
  else { fail++; console.log('  \x1b[31m✗\x1b[0m ' + name + (detail ? '  → ' + detail : '')); }
}

/* ════════════════════════════════════════════════════════════════════════
   FOYER GEOMETRY
   ════════════════════════════════════════════════════════════════════════ */
const ctx = vm.createContext({ Math, console });
vm.runInContext(
  'const FOYER_MAX_WIDTH_LOST = ' +
    (src.match(/const FOYER_MAX_WIDTH_LOST\s*=\s*([\d.]+)/) || [, '0.12'])[1] + ';\n' +
  grabFn('foyerFilmRect') + '\nglobalThis.rect = foyerFilmRect;', ctx);

const FILM = { w: 1280, h: 720 };              // Foyer_Current.mp4, measured with ffprobe
const TRUE_RATIO = FILM.w / FILM.h;

function measure(cw, ch) {
  const r = ctx.rect(cw, ch, FILM.w, FILM.h);
  return {
    r,
    drawnRatio: r.w / r.h,
    distortion: Math.abs((r.w / r.h) / TRUE_RATIO - 1),
    widthVisible: Math.min(1, cw / r.w),
    heightVisible: Math.min(1, ch / r.h),
    fillsWidth: r.w >= cw - 1,
    bandHeight: Math.round(r.h),
  };
}

console.log('\nA. The film is never distorted, at any viewport');
{
  const sizes = [];
  for (let w = 280; w <= 2560; w += 37) for (const h of [500, 720, 874, 900, 1080, 1366]) sizes.push([w, h]);
  const worst = sizes.map(([w, h]) => measure(w, h)).reduce((a, b) => (b.distortion > a.distortion ? b : a));
  ok(`${sizes.length} viewports, none distorted`, worst.distortion < 1e-9,
     'worst drift ' + worst.distortion);
}

console.log('\nB. iPhone 16 Pro portrait — the whole frame, hung as a panel');
{
  const m = measure(402, 874);
  ok('proportions are the film\'s own', Math.abs(m.drawnRatio - TRUE_RATIO) < 1e-9,
     'drawn ' + m.drawnRatio.toFixed(4) + ' vs film ' + TRUE_RATIO.toFixed(4));
  ok('nothing is cropped — Venus, Ganymede and the portal all present',
     Math.abs(m.widthVisible - 1) < 0.001, (m.widthVisible * 100).toFixed(1) + '% of width');
  ok('panel spans the full phone width', Math.abs(m.r.w - 402) < 0.5 && Math.abs(m.r.x) < 0.5,
     'w=' + m.r.w.toFixed(1) + ' x=' + m.r.x.toFixed(1));
  ok('226px panel, centred vertically', m.bandHeight === 226 && Math.abs(m.r.y - (874 - 226) / 2) < 1,
     'h=' + m.bandHeight + ' y=' + Math.round(m.r.y));
  ok('the old code would have stretched it 3.87x',
     Math.abs(TRUE_RATIO / (402 / 874) - 3.866) < 0.01);
}

console.log('\nC. No horizontal overflow, ever');
{
  const sizes = [];
  for (let w = 280; w <= 2560; w += 23) for (const h of [480, 667, 812, 874, 900, 1080, 1180, 1366]) sizes.push([w, h]);
  const bad = sizes.filter(([w, h]) => { const r = ctx.rect(w, h, FILM.w, FILM.h); return r.panel && (r.x < -0.5 || r.w > w + 0.5); });
  ok(`${sizes.length} viewports, no panel overflows its canvas`, bad.length === 0,
     bad.length + ' overflowed');
}

console.log('\nD. Desktop keeps its full-bleed');
{
  const wide = measure(1440, 900);
  ok('1440x900 fills the window edge to edge', wide.fillsWidth && wide.r.h >= 900 - 1 && !wide.r.panel,
     'w=' + Math.round(wide.r.w) + ' h=' + Math.round(wide.r.h) + ' panel=' + wide.r.panel);
  ok('  …and is a true cover, not a stretch', wide.distortion < 1e-9);
  ok('  …and keeps 90% of the frame, so both busts survive',
     Math.abs(wide.widthVisible - 0.9) < 0.01, (wide.widthVisible * 100).toFixed(1) + '%');
  const exact = measure(1920, 1080);
  ok('1920x1080 is edge to edge with nothing cropped',
     exact.fillsWidth && !exact.r.panel && Math.abs(exact.widthVisible - 1) < 0.001);
  const mb = measure(1280, 800);
  ok('1280x800 laptop still full-bleed', mb.fillsWidth && !mb.r.panel);
}

console.log('\nE. Phone rotated to landscape — 874x402');
{
  const m = measure(874, 402);
  ok('covers the screen, no panel', m.fillsWidth && m.r.h >= 402 - 1 && !m.r.panel);
  ok('still undistorted', m.distortion < 1e-9);
}

console.log('\nF. iPad portrait — 820x1180');
{
  const m = measure(820, 1180);
  ok('gets the panel treatment', m.r.panel === true);
  ok('whole frame intact', Math.abs(m.widthVisible - 1) < 0.001);
  ok('undistorted', m.distortion < 1e-9);
}

console.log('\nG. Degenerate input');
{
  const r = ctx.rect(402, 874, 0, 0);          // metadata not in yet
  ok('no metadata falls back to the full canvas', r.w === 402 && r.h === 874);
}

/* ════════════════════════════════════════════════════════════════════════
   ORACLE TRANSPORT
   ════════════════════════════════════════════════════════════════════════ */
console.log('\nH. Oracle errors carry their real cause');
const octx = vm.createContext({
  console: { error(){} }, Math, JSON, Date, String, Error, AbortController, setTimeout, clearTimeout, Promise,
});
octx.window = octx;
octx.ORACLE_ENDPOINT = 'https://example.invalid/api/oracle';
vm.runInContext(
  'const ORACLE_TIMEOUT_MS = 30000;\n' +
  'window.__temenosOracleErrors = [];\n' +
  grabFn('oracleLog') + '\n' + grabFn('oracleAsk') + '\n' + grabFn('oracleAttempt') + '\n' +
  grabFn('oracleBegin') + '\n' + grabFn('oracleEnd') + '\n' + grabFn('oracleParseCard') +
  '\nconst _oracleBusy = Object.create(null);' +
  '\nglobalThis.ask = oracleAsk; globalThis.parse = oracleParseCard;' +
  '\nglobalThis.oracleBegin = oracleBegin; globalThis.oracleEnd = oracleEnd;', octx);

function withFetch(impl, fn) { octx.fetch = impl; return fn(); }
const reply = (status, body) => async () => ({ ok: status >= 200 && status < 300, status, text: async () => body });

(async () => {
  let msg;
  msg = await withFetch(reply(500, 'Internal Server Error'), () => octx.ask({}).then(() => null, e => e.message));
  ok('an HTTP failure names its status', /HTTP 500/.test(msg || ''), msg);

  msg = await withFetch(reply(200, '<html>gateway</html>'), () => octx.ask({}).then(() => null, e => e.message));
  ok('a non-JSON body says so', /not JSON/.test(msg || ''), msg);

  msg = await withFetch(reply(200, JSON.stringify({ error: { type: 'not_found_error', message: 'model: bad' } })),
                        () => octx.ask({}).then(() => null, e => e.message));
  ok('an api error carries type and message', /not_found_error/.test(msg || '') && /model: bad/.test(msg || ''), msg);

  msg = await withFetch(reply(200, JSON.stringify({ content: [] })), () => octx.ask({}).then(() => null, e => e.message));
  ok('an empty response is not silently treated as a reply', /no text block/.test(msg || ''), msg);

  msg = await withFetch(async () => { const e = new Error('aborted'); e.name = 'AbortError'; throw e; },
                        () => octx.ask({}).then(() => null, e => e.message));
  ok('a timeout says it timed out', /timed out/.test(msg || ''), msg);

  const good = await withFetch(reply(200, JSON.stringify({ content: [{ type: 'text', text: '{"mirror":"ok"}' }] })),
                               () => octx.ask({}));
  ok('a good response returns its text', good === '{"mirror":"ok"}', good);

  ok('every failure was recorded for inspection', octx.window.__temenosOracleErrors.length === 5,
     octx.window.__temenosOracleErrors.length + ' recorded');

  console.log('\nI. One question at a time, per chamber');
  {
    const b = octx.oracleBegin, e = octx.oracleEnd;
    ok('a chamber refuses a second question while one is in flight',
       b('venus') === true && b('venus') === false);
    ok('chambers do not block each other', b('ganymede') === true);
    e('venus');
    ok('and the gate reopens once it settles', b('venus') === true);
    e('venus'); e('ganymede');
  }

  console.log('\nJ. Every chamber is on the shared transport');
  {
    const raw = fs.readFileSync(__dirname + '/index.html', 'utf8');
    // the only place a raw request may still appear is inside the transport
    const rawFetches = (raw.match(/fetch\(ORACLE_ENDPOINT/g) || []).length;
    ok('no chamber issues its own request', rawFetches === 1,
       rawFetches + ' raw fetch sites (1 = the transport itself)');

    for (const [name, marker] of [
      ['venus',        "{chamber:'venus'}"],
      ['ganymede',     "{chamber:'ganymede'}"],
      ['pool',         "{chamber:'pool'}"],
      ['council',      "{chamber:'council'}"],
      ['grimoire',     "chamber:'grimoire:'+mode"],
      ['wishing well', "{chamber:'wishing-well'}"],
      ['venus legacy', "{chamber:'venus-legacy'}"],
    ]) ok(name + ' goes through oracleAsk', raw.includes(marker));

    ok('the grimoire keeps its 25s leash', raw.includes('timeoutMs:25000'));
    ok('Ganymede pops the unanswered turn on failure',
       /if\(failure\)\{[\s\S]{0,400}gHistory\.pop\(\)/.test(raw));
    ok('Venus pops the unanswered turn on failure',
       /if\(failure\)\{[\s\S]{0,400}vHistory\.pop\(\)/.test(raw));
    ok('Ganymede restores the visitor\'s words', /if\(inp&&!inp\.value\)inp\.value=q;/.test(raw));
    ok('the pool now says something when it fails',
       raw.includes('The pool does not settle. Ask again.'));
  }

  console.log('\nK. A failed council falls quiet rather than improvising');
  {
    const raw = fs.readFileSync(__dirname + '/index.html', 'utf8');

    // 1 — never produces fabricated oracle content
    for (const line of [
      'Venus: The heart already knows the answer.',
      'Persephone: Something beneath this is ready to move.',
      'Psyche: What if it was simpler than you think?',
      'Ganymede: Name the first step and take it.',
    ]) ok('no canned line: "' + line.slice(0, 28) + '…"', !raw.includes(line));
    ok('no fabricated RECOMMENDS in a failure path', !/RECOMMENDS: Venus`/.test(raw));

    // isolate the council catch block and prove what it does and does not do
    const c = raw.indexOf("{chamber:'council'}");
    const block = raw.slice(c, raw.indexOf('}', raw.indexOf('return;', c)) + 1);
    ok('the failure path falls quiet', /councilQuiet\(\);/.test(block));
    ok('  …and returns immediately', /councilQuiet\(\);\s*\n\s*return;/.test(block));

    // 2 — never triggers navigation
    ok('no navigation in the failure path',
       !/flashTo|enterVenusApproach|enterGanymede|showScreen/.test(block));
    ok('councilQuiet itself renders no lines and routes nowhere', (() => {
      const q = grabFn('councilQuiet');
      return !/flashTo|enterVenus|enterGanymede|showScreen|appendChild|innerHTML\s*=\s*[`'"][^`'"]/.test(
        q.replace("lines.innerHTML='';", ''));
    })());
    ok('the recommendation panel is explicitly hidden',
       /recEl\.style\.display='none'/.test(grabFn('councilQuiet')));

    // 3 — the visitor's input remains recoverable
    ok('the question is captured before the request',
       raw.indexOf('lastCouncilInput=q;') < raw.indexOf("{chamber:'council'}"));
    ok('councilQuiet does not clear the field',
       !/inp\.value=''/.test(grabFn('councilQuiet')));
    ok('retry restores their words',
       /inp&&lastCouncilInput\)inp\.value=lastCouncilInput/.test(grabFn('councilRetry')));

    // 4 — a retry can succeed without a reload
    ok('the busy gate is released when it falls quiet',
       /cBusy=false;\s*oracleEnd\('council'\)/.test(grabFn('councilQuiet')));
    ok('retry asks again in-place, no reload',
       /window\.sendCouncil\(\)/.test(grabFn('councilRetry'))
       && !/location\.reload/.test(grabFn('councilRetry')));
    ok('retry cannot be double-tapped', /if\(cBusy\)return;/.test(grabFn('councilRetry')));
    ok('the council takes the shared in-flight gate', raw.includes("oracleBegin('council')"));

    // 5 — no history to contaminate: the council request is stateless
    const req = raw.slice(c - 260, c);
    ok('the request carries only this one message, no accumulated history',
       /messages:\[\{role:'user',content:q\}\]/.test(req));

    ok('the flag is retained but no longer means "fabricated"',
       raw.includes('window.__temenosCouncilFellBack')
       && /now means fell quiet, never fabricated/.test(raw));

    // the quiet state is actually reachable and dressed
    ok('the quiet panel exists in the markup', raw.includes('id="c-quiet"'));
    ok('it says the council has fallen quiet', raw.includes('The council has fallen quiet.'));
    ok('it tells them their words are held', raw.includes('Your words remain here.'));
    ok('it offers a try-again control', raw.includes('id="c-retry"') && raw.includes('councilRetry()'));
    ok('the control is a 44px target', /#c-retry\{[^}]*min-height:44px/.test(raw));
    ok('reset clears the quiet panel before the next reading',
       /const qz=document\.getElementById\('c-quiet'\);\s*\n\s*if\(qz\)qz\.style\.display='none';/.test(
         grabFn('councilReset') || ''));
  }

  console.log('\nL. A new card comes to rest at its first line');
  {
    const raw = fs.readFileSync(__dirname + '/index.html', 'utf8');
    const render = grabFn('vaRenderCard');

    // the three old trips to the bottom are gone from the renderer
    ok('no scroll-to-bottom left in vaRenderCard',
       !/vg\.scrollTop\s*=\s*vg\.scrollHeight/.test(render));
    ok('the first-card special case is gone', !/isFirstCard/.test(render));
    ok('paragraph reveals no longer re-scroll', !/[;{]\s*pin\(\)\s*[;}]/.test(render));
    ok('the renderer settles to the card element', /vaSettleToCard\(vg,d\)/.test(render));
    ok('nothing is focused after rendering', !/\.focus\(\)/.test(render));

    const settle = grabFn('vaSettleToCard');
    ok('reduced motion is respected',
       /prefers-reduced-motion: reduce/.test(settle) && /reduced \? 'auto' : 'smooth'/.test(settle));
    ok('it waits for layout and the keyboard before measuring',
       /setTimeout/.test(settle) && /requestAnimationFrame\(\(\) => requestAnimationFrame/.test(settle));
    ok('it yields the moment the visitor scrolls',
       /touchstart/.test(settle) && /wheel/.test(settle));
    ok('leaving the chamber abandons a pending settle',
       /vaCancelSettle\(\);/.test(grabFn('enterVenusApproach')));

    // the target itself, as pure geometry
    const gctx = vm.createContext({ Math, console });
    vm.runInContext(
      'const VA_CARD_TOP_MARGIN = ' +
        (raw.match(/const VA_CARD_TOP_MARGIN\s*=\s*(\d+)/) || [, '12'])[1] + ';\n' +
      grabFn('vaCardScrollTarget') + '\nglobalThis.target = vaCardScrollTarget;', gctx);

    const scroller = (scrollTop, clientHeight, scrollHeight, rectTop) => ({
      scrollTop, clientHeight, scrollHeight,
      getBoundingClientRect: () => ({ top: rectTop }),
    });
    const card = rectTop => ({ getBoundingClientRect: () => ({ top: rectTop }) });

    // panel 600 tall showing 1400 of content; the new card starts 820px down
    let vg = scroller(0, 600, 2400, 100);
    ok('lands on the card top, less a small margin',
       gctx.target(vg, card(920)) === 820 - 12, String(gctx.target(vg, card(920))));

    // already scrolled: the delta is measured, not assumed
    vg = scroller(300, 600, 1400, 100);
    ok('correct when the panel is already scrolled',
       gctx.target(vg, card(400)) === 300 + 300 - 12, String(gctx.target(vg, card(400))));

    // a card near the end cannot scroll past what exists
    vg = scroller(0, 600, 1400, 100);
    ok('never scrolls past the end of the content',
       gctx.target(vg, card(1500)) === 800, String(gctx.target(vg, card(1500))));

    // a short thread that does not overflow stays at the top
    vg = scroller(0, 600, 500, 100);
    ok('a card that fits needs no scrolling', gctx.target(vg, card(140)) === 0);

    // never negative
    vg = scroller(0, 600, 1400, 100);
    ok('a card at the very top clamps to zero', gctx.target(vg, card(100)) === 0);

    ok('the target is the top of the card, never its bottom — height is unread',
       !/offsetHeight|scrollHeight\s*\)|clientHeight\s*\+/.test(grabFn('vaCardScrollTarget')
         .replace('vg.scrollHeight - vg.clientHeight', '')));
  }

  console.log('\nM. Card parsing tolerates what the model actually returns');
  ok('bare JSON', octx.parse('{"mirror":"a"}').mirror === 'a');
  ok('JSON wrapped in prose', octx.parse('Here you go:\n{"mirror":"b"}\nhope that helps').mirror === 'b');
  ok('prose with no JSON still becomes a card', octx.parse('just words').mirror === 'just words');

  console.log('\n' + (fail === 0
    ? `\x1b[32mALL ${pass} CHECKS PASSED\x1b[0m`
    : `\x1b[31m${fail} FAILED\x1b[0m, ${pass} passed`));
  process.exit(fail === 0 ? 0 : 1);
})();
