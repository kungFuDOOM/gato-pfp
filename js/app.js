// Gato PFP v2 by kungFuDOOM. No build step.
const S = 1024;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const $ = id => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const CAT = { w: 800, h: 799, bx: 272, by: 12, bw: 377, bh: 743, faceX: 450, faceY: 215, faceR: 150 };

// ---------- data
const BGS = [
  ['Sunny', '#ffb04a'], ['Bubblegum', '#ff7aa8'], ['Mint', '#7bd88f'], ['Sky', '#6ab7ff'], ['Grape', '#b48cff'], ['Lemon', '#ffe27a'], ['Midnight', '#2b2740'], ['Cream', '#f2eee6'],
  ['Peach fizz', '#ff9a8b', '#ff6a88'], ['Ice', '#a1c4fd', '#c2e9fb'], ['Cotton candy', '#fbc2eb', '#a6c1ee'], ['Sunset', '#f6d365', '#fda085'],
  ['Deep sea', '#0f2027', '#2c5364'], ['Aurora', '#43e97b', '#38f9d7'], ['Ocean wave', '#4facfe', '#00f2fe'], ['Berry', '#f093fb', '#f5576c'],
  ['Forest', '#134e5e', '#71b280'], ['Mango', '#ffe259', '#ffa751'], ['Night sky', '#0f0c29', '#302b63'], ['Candy', '#ff9a9e', '#fad0c4'],
];
const BGMAP = Object.fromEntries(BGS.map(b => [b[0], b]));
const PATS = ['none', 'dots', 'stripes', 'checks', 'rays', 'stars'];
const FRAMES = ['circle', 'rounded', 'square'];
const SIZES = [1024, 2048];
// fur recolor: h target hue (deg), sm saturation multiplier, lc contrast, lo lightness centre, tint = tint for white chest
const SKINS = [
  { id: 'orange', name: 'Orange', sw: '#f0a050' },
  { id: 'grey', name: 'Grey', sw: '#9a9ca6', h: 225, sm: .1, lc: .85, lo: .56 },
  { id: 'black', name: 'Black', sw: '#2a2830', h: 250, sm: .12, lc: .62, lo: .2, white: .45 },
  { id: 'white', name: 'White', sw: '#f4f1ee', h: 30, sm: .12, lc: .5, lo: .9 },
  { id: 'blue', name: 'Blue', sw: '#6a9fe0', h: 214, sm: .75, lc: .95, lo: .62, tint: .3 },
  { id: 'pink', name: 'Pink', sw: '#f58db8', h: 338, sm: .5, lc: .8, lo: .78, tint: .25 },
  { id: 'green', name: 'Green', sw: '#6cc07a', h: 126, sm: .7, lc: .9, lo: .6, tint: .3 },
  { id: 'golden', name: 'Golden', sw: '#e8b82e', h: 45, sm: 1.2, lc: .95, lo: .7 },
  { id: 'purple', name: 'Purple', sw: '#9a78d8', h: 272, sm: .7, lc: .92, lo: .6, tint: .3 },
  { id: 'cream', name: 'Cream', sw: '#efd9b4', h: 38, sm: .4, lc: .6, lo: .8 },
];
const SMAP = Object.fromEntries(SKINS.map(k => [k.id, k]));
const KEY = 'gato-pfp-v2';

const DEFAULT = () => ({ bg: 'Sunny', pat: 'dots', frame: 'circle', zoom: 1.1, skin: 'orange', items: [mk('hat')] });
function mk(id, extra) { const a = AMAP[id]; return { id: nid(), type: id, x: a.x, y: a.y, s: a.s, r: a.r, ...extra }; }
let _n = 1; const nid = () => _n++;
const st = { ...DEFAULT(), sel: null, photo: null, photoMode: 'face', pface: { x: CAT.faceX, y: CAT.faceY, s: 1 }, transp: false, size: 1024, scenes: [] };

// ---------- images
const catImg = new Image(); catImg.src = 'assets/gato-cutout.png';
catImg.onload = () => { buildSkins(); draw(); window.__ready = true; };
const skinCache = {};
function skinCanvas(id) {
  if (skinCache[id]) return skinCache[id];
  const k = SMAP[id], c = document.createElement('canvas'); c.width = CAT.w; c.height = CAT.h; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(catImg, 0, 0);
  if (k.h != null) {
    const im = x.getImageData(0, 0, c.width, c.height), d = im.data;
    for (let i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue;
      let [h, s, l] = rgb2hsl(d[i], d[i + 1], d[i + 2]);
      const dist = Math.min(Math.abs(h - 32), 360 - Math.abs(h - 32));
      const wh = dist < 44 ? 1 : dist < 85 ? 1 - (dist - 44) / 41 : 0;
      const ws = smooth(.04, .22, s) * smooth(.1, .3, l);
      const w = wh * ws;
      const ll = clamp((l - .65) * k.lc + k.lo, 0, 1);
      let nh = h, ns = s, nl = l, snap = false;
      if (w > 0.01) { nh = k.h + (((h - 32 + 540) % 360) - 180) * .2; ns = s + (clamp(s * k.sm, 0, 1) - s) * w; nl = l + (ll - l) * w; snap = true; }
      if (k.tint && w < 1 && l > .5) { const tw = (1 - w) * (1 - smooth(.16, .35, s)) * smooth(.5, .8, l); if (tw > 0.01) { ns = ns + (k.tint - ns) * tw; if (!snap) nh = k.h; snap = true; } }
      const o = hsl2rgb((nh + 360) % 360, clamp(ns, 0, 1), clamp(nl, 0, 1)); d[i] = o[0]; d[i + 1] = o[1]; d[i + 2] = o[2];
    }
    x.putImageData(im, 0, 0);
  }
  return skinCache[id] = c;
}
function smooth(a, b, v) { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
function rgb2hsl(r, g, b) { r /= 255; g /= 255; b /= 255; const M = Math.max(r, g, b), m = Math.min(r, g, b), l = (M + m) / 2; let h = 0, s = 0; if (M !== m) { const d = M - m; s = l > .5 ? d / (2 - M - m) : d / (M + m); h = M === r ? (g - b) / d + (g < b ? 6 : 0) : M === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return [h, s, l]; }
function hsl2rgb(h, s, l) { const f = n => { const k = (n + h / 30) % 12, a = s * Math.min(l, 1 - l); return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); }; return [f(0), f(8), f(4)]; }

// ---------- transform: cat source -> canvas (1024 space)
function T() {
  const sc = (S * 0.92) / CAT.bh * st.zoom;
  const t = clamp((st.zoom - 0.8) / 0.9, 0, 1);
  const ax = CAT.bx + CAT.bw / 2, ay = CAT.by + CAT.bh / 2;
  const px = ax + (CAT.faceX - ax) * t, py = ay + (CAT.faceY - ay) * t;
  return { sc, tx: S / 2 - px * sc, ty: S * 0.5 - py * sc };
}
const toC = (x, y) => { const t = T(); return [x * t.sc + t.tx, y * t.sc + t.ty]; };

// ---------- drawing
let K = 1; // export scale (shadow sizes don't follow the CTM)
function frameMask(c) {
  c.beginPath();
  if (st.frame === 'circle') c.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  else if (st.frame === 'rounded') c.roundRect(0, 0, S, S, S * 0.2);
  else c.rect(0, 0, S, S);
  c.clip();
}
const sceneMap = () => Object.fromEntries(st.scenes.map(s => ['scene:' + s.file, s]));
function drawBg(c) {
  const sc = sceneMap()[st.bg];
  if (sc) { cover(c, sc.img); return; }
  const b = BGMAP[st.bg] || BGS[0];
  if (b.length === 2) c.fillStyle = b[1];
  else { const g = c.createLinearGradient(0, 0, S, S); g.addColorStop(0, b[1]); g.addColorStop(1, b[2]); c.fillStyle = g; }
  c.fillRect(0, 0, S, S);
  c.save(); c.fillStyle = 'rgba(255,255,255,.22)'; c.strokeStyle = 'rgba(255,255,255,.22)';
  const p = st.pat;
  if (p === 'dots') for (let y = 20; y < S; y += 64) for (let x = (y / 64 % 2 ? 52 : 20); x < S; x += 64) { c.beginPath(); c.arc(x, y, 12, 0, 7); c.fill(); }
  if (p === 'stripes') { c.lineWidth = 32; for (let i = -S; i < S * 2; i += 96) { c.beginPath(); c.moveTo(i, S); c.lineTo(i + S, 0); c.stroke(); } }
  if (p === 'checks') for (let y = 0; y < S; y += 128) for (let x = 0; x < S; x += 128) if ((x + y) / 128 % 2 === 0) c.fillRect(x, y, 128, 128);
  if (p === 'rays') { c.beginPath(); for (let i = 0; i < 24; i += 2) { const a1 = i / 24 * 6.2832, a2 = (i + 1) / 24 * 6.2832; c.moveTo(S / 2, S / 2); c.lineTo(S / 2 + Math.cos(a1) * 1500, S / 2 + Math.sin(a1) * 1500); c.lineTo(S / 2 + Math.cos(a2) * 1500, S / 2 + Math.sin(a2) * 1500); } c.fill(); }
  if (p === 'stars') for (let y = 50; y < S; y += 150) for (let x = (y / 150 % 2 ? 125 : 50); x < S; x += 150) star(c, x, y, 26, 11);
  c.restore();
}
function cover(c, img) { const k = Math.max(S / img.width, S / img.height); const w = img.width * k, h = img.height * k; c.drawImage(img, (S - w) / 2, (S - h) / 2, w, h); }

// sticker bounding boxes (in sticker units), measured once per type
const bboxCache = {};
function bbox(type) {
  if (bboxCache[type]) return bboxCache[type];
  const N = 1000, k = .8, o = document.createElement('canvas'); o.width = o.height = N; const c = o.getContext('2d', { willReadFrequently: true }); c.translate(N / 2, N / 2); c.scale(k, k);
  try { DRAW[type](c); } catch (e) { }
  const d = c.getImageData(0, 0, N, N).data; let x0 = N, y0 = N, x1 = 0, y1 = 0;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (d[(y * N + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < x0) { x0 = y0 = 300; x1 = y1 = 700; }
  const f = v => (v - N / 2) / k;
  return bboxCache[type] = { x0: f(x0), y0: f(y0), x1: f(x1 + 1), y1: f(y1 + 1) };
}
const itemScale = it => T().sc * 0.9 * it.s;
function drawItem(c, it) {
  const [x, y] = toC(it.x, it.y); const k = itemScale(it);
  c.save(); c.translate(x, y); c.rotate(it.r * Math.PI / 180); c.scale(k, k);
  c.shadowColor = 'rgba(0,0,0,.25)'; c.shadowBlur = 8 * K; c.shadowOffsetY = 3 * K;
  DRAW[it.type](c); c.restore();
}
function drawPhotoFace(c) {
  const p = st.pface, [x, y] = toC(p.x, p.y), r = CAT.faceR * T().sc * p.s;
  c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip();
  const im = st.photo, k = (2 * r) / Math.min(im.width, im.height);
  c.drawImage(im, x - im.width * k / 2, y - im.height * k / 2, im.width * k, im.height * k);
  c.restore(); c.save(); c.lineWidth = 8; c.strokeStyle = '#fff'; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke(); c.restore();
}
function render(c, ui, N) {
  N = N || S; K = N / S;
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, N, N); c.scale(K, K);
  c.save(); frameMask(c);
  if (!st.transp) drawBg(c);
  if (st.photo && st.photoMode === 'bg') cover(c, st.photo);
  const t = T();
  st.items.filter(i => AMAP[i.type].z === 0).forEach(it => drawItem(c, it));
  if (catImg.complete && catImg.naturalWidth) { c.save(); c.shadowColor = 'rgba(0,0,0,.3)'; c.shadowBlur = 24 * K; c.shadowOffsetY = 10 * K; c.drawImage(skinCanvas(st.skin), t.tx, t.ty, CAT.w * t.sc, CAT.h * t.sc); c.restore(); }
  if (st.photo && st.photoMode === 'face') drawPhotoFace(c);
  st.items.filter(i => AMAP[i.type].z !== 0).forEach(it => drawItem(c, it));
  c.restore();
  if (ui && st.sel) {
    const it = st.sel, b = bbox(it.type), [x, y] = toC(it.x, it.y), k = itemScale(it);
    c.save(); c.translate(x, y); c.rotate(it.r * Math.PI / 180); c.scale(k, k); c.strokeStyle = '#fff'; c.setLineDash([14 / k, 10 / k]); c.lineWidth = 4 / k; c.shadowColor = '#000'; c.shadowBlur = 4;
    c.strokeRect(b.x0 - 8, b.y0 - 8, b.x1 - b.x0 + 16, b.y1 - b.y0 + 16); c.restore();
  }
  c.restore();
}
function draw() { render(ctx, true); }

// ---------- state / history / persistence
const snap = () => JSON.stringify({ bg: st.bg, pat: st.pat, frame: st.frame, zoom: st.zoom, skin: st.skin, items: st.items.map(({ type, x, y, s, r }) => ({ type, x, y, s, r })) });
function apply(js) {
  const o = JSON.parse(js); st.bg = o.bg; st.pat = o.pat; st.frame = o.frame; st.zoom = o.zoom; st.skin = SMAP[o.skin] ? o.skin : 'orange';
  st.items = (o.items || []).filter(i => AMAP[i.type]).map(i => ({ id: nid(), ...i })); sortItems(); st.sel = null;
}
let hist = [], hi = -1;
function commit() { const s = snap(); if (hist[hi] === s) return; hist = hist.slice(0, hi + 1); hist.push(s); if (hist.length > 80) hist.shift(); hi = hist.length - 1; save(); refresh(); }
function undo() { if (hi > 0) { hi--; apply(hist[hi]); save(); refresh(); draw(); } }
function redo() { if (hi < hist.length - 1) { hi++; apply(hist[hi]); save(); refresh(); draw(); } }
function save() { try { localStorage.setItem(KEY, JSON.stringify({ state: JSON.parse(snap()), size: st.size, transp: st.transp })); } catch (e) { } }
function load() { try { const o = JSON.parse(localStorage.getItem(KEY)); if (!o) return false; apply(JSON.stringify(o.state)); if (SIZES.includes(o.size)) st.size = o.size; st.transp = !!o.transp; return true; } catch (e) { return false; } }
function sortItems() { st.items.sort((a, b) => AMAP[a.type].z - AMAP[b.type].z); }
function addAcc(type) {
  const ex = st.items.find(i => i.type === type); if (ex) { st.sel = ex; refresh(); draw(); return; }
  const it = mk(type); st.items.push(it); sortItems(); st.sel = it; commit(); draw();
}
function removeSel() { if (!st.sel) return; st.items = st.items.filter(i => i !== st.sel); st.sel = null; commit(); draw(); }

// ---------- UI
function chips(el, list, key) {
  el.innerHTML = '';
  list.forEach(v => { const b = document.createElement('button'); b.textContent = typeof v === 'number' ? v + ' px' : v; b.dataset.v = v; b.onclick = () => { st[key] = v; if (key === 'size') save(); else commit(); refresh(); draw(); }; el.appendChild(b); });
}
function refresh() {
  document.querySelectorAll('#bgs .tile,#scenes .tile').forEach(b => b.classList.toggle('on', b.dataset.v === st.bg));
  document.querySelectorAll('#pats button').forEach(b => b.classList.toggle('on', b.dataset.v === st.pat));
  document.querySelectorAll('#frames button').forEach(b => b.classList.toggle('on', b.dataset.v === st.frame));
  document.querySelectorAll('#sizes button').forEach(b => b.classList.toggle('on', +b.dataset.v === st.size));
  document.querySelectorAll('#skins .tile').forEach(b => b.classList.toggle('on', b.dataset.v === st.skin));
  $('pface').classList.toggle('on', st.photoMode === 'face'); $('pbg').classList.toggle('on', st.photoMode === 'bg');
  $('zoom').value = st.zoom; $('transp').checked = st.transp;
  document.querySelectorAll('#acc button.acc').forEach(b => { const on = st.items.some(i => i.type === b.dataset.type); b.classList.toggle('added', on); b.setAttribute('aria-pressed', on); });
  const it = st.sel; $('sel').classList.toggle('hidden', !it);
  if (it) { $('selname').textContent = AMAP[it.type].name; $('selsize').value = it.s; $('selrot').value = it.r; }
  $('undo').disabled = hi <= 0; $('redo').disabled = hi >= hist.length - 1;
  $('acccount').textContent = `${st.items.length} on · ${ACCS.length} available`;
}
function tile(label, v, bgcss, parent, onclick, cls) {
  const b = document.createElement('button'); b.className = 'tile ' + (cls || ''); b.dataset.v = v; b.title = label;
  const sw = document.createElement('span'); sw.className = 'sw'; sw.style.cssText = bgcss; b.appendChild(sw);
  const l = document.createElement('span'); l.className = 'lb'; l.textContent = label; b.appendChild(l); b.onclick = onclick; parent.appendChild(b); return b;
}
function buildBgs() {
  $('bgs').innerHTML = '';
  BGS.forEach(b => tile(b[0], b[0], b.length > 2 ? `background:linear-gradient(135deg,${b[1]},${b[2]})` : `background:${b[1]}`, $('bgs'), () => { st.bg = b[0]; commit(); draw(); }));
}
function buildScenes() {
  const box = $('scenes'); box.innerHTML = ''; $('scenegrp').hidden = !st.scenes.length;
  st.scenes.forEach(s => tile(s.name, 'scene:' + s.file, `background:url(assets/bg/${s.file}) center/cover`, box, () => { st.bg = 'scene:' + s.file; commit(); draw(); }, 'scene'));
}
async function loadScenes() {
  try {
    const r = await fetch('assets/bg/scenes.json', { cache: 'no-cache' }); if (!r.ok) throw 0; const list = await r.json();
    const out = await Promise.all(list.map(e => new Promise(res => { const img = new Image(); img.onload = () => res({ name: e.name, file: e.file, img }); img.onerror = () => res(null); img.src = 'assets/bg/' + e.file; })));
    st.scenes = out.filter(Boolean);
  } catch (e) { st.scenes = []; }
  buildScenes(); refresh(); draw();
}
function buildSkins() {
  const box = $('skins'); box.innerHTML = '';
  SKINS.forEach(k => {
    const t = document.createElement('canvas'); t.width = t.height = 120; t.getContext('2d').drawImage(skinCanvas(k.id), 285, 10, 360, 360, 0, 0, 120, 120);
    const b = document.createElement('button'); b.className = 'tile skin'; b.dataset.v = k.id; b.title = k.name; b.appendChild(t);
    const l = document.createElement('span'); l.className = 'lb'; l.textContent = k.name; b.appendChild(l);
    b.onclick = () => { st.skin = k.id; commit(); draw(); }; box.appendChild(b);
  });
  refresh();
}
const thumbCache = {};
function thumb(type) {
  if (thumbCache[type]) return thumbCache[type];
  const b = bbox(type), w = b.x1 - b.x0, h = b.y1 - b.y0, k = 64 / Math.max(w, h);
  const t = document.createElement('canvas'); t.width = t.height = 72; const c = t.getContext('2d');
  c.translate(36 - (b.x0 + w / 2) * k, 36 - (b.y0 + h / 2) * k); c.scale(k, k); DRAW[type](c);
  return thumbCache[type] = t;
}
let cat = 'All';
function buildAcc() {
  const tabs = $('acctabs'), box = $('acc'); tabs.innerHTML = ''; box.innerHTML = '';
  ['All', ...CATEGORIES].forEach(k => { const b = document.createElement('button'); b.textContent = k; b.className = k === cat ? 'on' : ''; b.setAttribute('role', 'tab'); b.onclick = () => { cat = k; buildAcc(); }; tabs.appendChild(b); });
  ACCS.filter(a => cat === 'All' || a.cat === cat).forEach(a => {
    const b = document.createElement('button'); b.className = 'acc'; b.dataset.type = a.id; b.title = a.name;
    const t = document.createElement('canvas'); t.width = t.height = 72; t.getContext('2d').drawImage(thumb(a.id), 0, 0); b.appendChild(t);
    const l = document.createElement('span'); l.textContent = a.name; b.appendChild(l); b.onclick = () => addAcc(a.id); box.appendChild(b);
  });
  refresh();
}
function setup() {
  chips($('pats'), PATS, 'pat'); chips($('frames'), FRAMES, 'frame'); chips($('sizes'), SIZES, 'size'); buildBgs(); buildAcc();
}

// ---------- inputs
$('zoom').oninput = e => { st.zoom = +e.target.value; draw(); }; $('zoom').onchange = commit;
$('selsize').oninput = e => { if (st.sel) { st.sel.s = +e.target.value; draw(); } }; $('selsize').onchange = commit;
$('selrot').oninput = e => { if (st.sel) { st.sel.r = +e.target.value; draw(); } }; $('selrot').onchange = commit;
$('seldel').onclick = removeSel;
$('transp').onchange = e => { st.transp = e.target.checked; save(); draw(); };
$('undo').onclick = undo; $('redo').onclick = redo;
$('reset').onclick = () => { apply(JSON.stringify({ ...DEFAULT(), items: DEFAULT().items.map(i => ({ type: i.type, x: i.x, y: i.y, s: i.s, r: i.r })) })); st.transp = false; st.photo = null; commit(); draw(); toast('Reset – undo brings it back'); };
$('file').onchange = e => { const f = e.target.files[0]; if (!f) return; const im = new Image(); im.onload = () => { st.photo = im; st.pface = { x: CAT.faceX, y: CAT.faceY, s: 1 }; refresh(); draw(); window.__photo = true; }; im.src = URL.createObjectURL(f); };
$('pface').onclick = () => { st.photoMode = 'face'; refresh(); draw(); };
$('pbg').onclick = () => { st.photoMode = 'bg'; refresh(); draw(); };
$('pclear').onclick = () => { st.photo = null; $('file').value = ''; draw(); };

// drag / pinch
const pts = new Map(); let drag = null, pinch = null, moved = false;
function pos(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * S / r.width, (e.clientY - r.top) * S / r.height]; }
function hit(x, y) {
  for (let i = st.items.length - 1; i >= 0; i--) {
    const it = st.items[i], b = bbox(it.type), [cx, cy] = toC(it.x, it.y), k = itemScale(it), a = -it.r * Math.PI / 180;
    const dx = (x - cx) / k, dy = (y - cy) / k, lx = dx * Math.cos(a) - dy * Math.sin(a), ly = dx * Math.sin(a) + dy * Math.cos(a), p = 12;
    if (lx >= b.x0 - p && lx <= b.x1 + p && ly >= b.y0 - p && ly <= b.y1 + p) return it;
  }
  if (st.photo && st.photoMode === 'face') { const p = st.pface, [cx, cy] = toC(p.x, p.y); if (Math.hypot(x - cx, y - cy) < CAT.faceR * T().sc * p.s) return 'photo'; }
  return null;
}
cv.addEventListener('pointerdown', e => {
  cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, pos(e)); moved = false;
  if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), tgt: drag && drag.tgt, s: drag && drag.s0 }; return; }
  const [x, y] = pos(e); const h = hit(x, y);
  if (h === 'photo') { st.sel = null; drag = { tgt: 'photo', ox: x, oy: y, x0: st.pface.x, y0: st.pface.y, s0: st.pface.s }; }
  else if (h) { st.sel = h; drag = { tgt: h, ox: x, oy: y, x0: h.x, y0: h.y, s0: h.s }; } else { st.sel = null; drag = null; }
  refresh(); draw();
});
cv.addEventListener('pointermove', e => {
  if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, pos(e));
  if (pts.size === 2 && pinch && pinch.tgt) { const [a, b] = [...pts.values()]; const k = Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d; moved = true; if (pinch.tgt === 'photo') st.pface.s = clamp(pinch.s * k, .4, 3); else pinch.tgt.s = clamp(pinch.s * k, .2, 3.5); refresh(); draw(); return; }
  if (!drag || pts.size > 1) return; const [x, y] = pos(e); const sc = T().sc;
  const o = drag.tgt === 'photo' ? st.pface : drag.tgt; o.x = drag.x0 + (x - drag.ox) / sc; o.y = drag.y0 + (y - drag.oy) / sc; moved = true; draw();
});
const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) { drag = null; if (moved) commit(); moved = false; } };
cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
let wt; cv.addEventListener('wheel', e => { const it = st.sel; if (!it) return; e.preventDefault(); it.s = clamp(it.s * (e.deltaY < 0 ? 1.06 : 0.94), .2, 3.5); refresh(); draw(); clearTimeout(wt); wt = setTimeout(commit, 400); }, { passive: false });

// keyboard (desktop)
document.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toLowerCase(); if (tag === 'input' && e.target.type !== 'checkbox' && e.target.type !== 'range') return; if (tag === 'textarea') return;
  const mod = e.ctrlKey || e.metaKey, k = e.key;
  if (mod && k.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
  if (mod && k.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
  if (mod && k.toLowerCase() === 's') { e.preventDefault(); download(); return; }
  if (mod || e.altKey) return;
  const it = st.sel;
  if (k === 'Escape') { if (!$('modal').classList.contains('hidden')) closeModal(); else { st.sel = null; refresh(); draw(); } return; }
  if (k.toLowerCase() === 'r' && tag !== 'select') { randomize(); return; }
  if (!it || tag === 'range') return;
  const step = (e.shiftKey ? 20 : 5);
  if (k === 'Delete' || k === 'Backspace') { e.preventDefault(); removeSel(); }
  else if (k.startsWith('Arrow')) { e.preventDefault(); it.x += k === 'ArrowRight' ? step : k === 'ArrowLeft' ? -step : 0; it.y += k === 'ArrowDown' ? step : k === 'ArrowUp' ? -step : 0; draw(); clearTimeout(wt); wt = setTimeout(commit, 350); }
  else if (k === '+' || k === '=') { it.s = clamp(it.s * 1.06, .2, 3.5); refresh(); draw(); clearTimeout(wt); wt = setTimeout(commit, 350); }
  else if (k === '-' || k === '_') { it.s = clamp(it.s / 1.06, .2, 3.5); refresh(); draw(); clearTimeout(wt); wt = setTimeout(commit, 350); }
  else if (k === '[' || k === ']') { it.r = clamp(it.r + (k === ']' ? 5 : -5), -180, 180); refresh(); draw(); clearTimeout(wt); wt = setTimeout(commit, 350); }
});

// ---------- randomize (one per slot, so never duplicates)
const pick = a => a[Math.floor(Math.random() * a.length)];
const bySlot = s => ACCS.filter(a => a.slot === s);
function randomize() {
  const bgs = [...BGS.map(b => b[0]), ...st.scenes.map(s => 'scene:' + s.file)];
  st.bg = pick(bgs); st.pat = pick(PATS); st.frame = pick(FRAMES); st.zoom = +(0.95 + Math.random() * 0.45).toFixed(2); st.skin = pick(SKINS).id;
  const ids = new Set(); const add = (slot, p) => { if (Math.random() < p) ids.add(pick(bySlot(slot)).id); };
  add('hat', .8); add('eyes', .6); add('face', .35); add('neck', .45); add('outfit', .4); add('hand', .45); add('extra', .35);
  if (!ids.size) ids.add(pick(bySlot('hat')).id);
  st.items = [...ids].map(id => mk(id, { r: Math.round(AMAP[id].r + (Math.random() - .5) * 8) })); sortItems(); st.sel = null; commit(); draw();
}
$('rand').onclick = randomize;

// ---------- export / share
const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function toBlob(N) { const o = document.createElement('canvas'); o.width = o.height = N; render(o.getContext('2d'), false, N); K = 1; return new Promise(r => o.toBlob(r, 'image/png')); }
const filename = () => `gato-pfp-${st.skin}-${st.size}.png`;
async function download() {
  const blob = await toBlob(st.size); const url = URL.createObjectURL(blob);
  if (isIOS) { $('mimg').src = url; $('modal').classList.remove('hidden'); return; }
  const a = document.createElement('a'); a.href = url; a.download = filename(); document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000); toast(`Saved ${st.size}×${st.size} PNG`);
}
function closeModal() { $('modal').classList.add('hidden'); }
$('mclose').onclick = closeModal; $('modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
async function share() {
  const blob = await toBlob(st.size), file = new File([blob], filename(), { type: 'image/png' });
  const data = { files: [file], title: 'My Gato PFP', text: 'Made my cat pfp on Gato PFP!', url: location.href.split('#')[0] };
  if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share(data); } catch (e) { if (e.name !== 'AbortError') toast('Share failed'); } return; }
  const link = location.href.split('#')[0];
  try { await navigator.clipboard.writeText(link); } catch (e) { const t = document.createElement('textarea'); t.value = link; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e2) { } t.remove(); }
  toast('Link copied – paste it anywhere to share');
}
$('dl').onclick = download; $('share').onclick = share;
let tt; function toast(m) { const t = $('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2400); }

// test hooks
window.__gato = { st, randomize, undo, redo, snap, apply: o => { apply(JSON.stringify(o)); commit(); draw(); }, addAcc, draw, render, skinCanvas, SKINS, ACCS, BGS, CATEGORIES, toBlob, bbox, sortItems };

// ---------- boot
setup(); const had = load(); hist = []; hi = -1; commit(); refresh(); draw(); loadScenes();
