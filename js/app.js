// Gato PFP by kungFuDOOM. No build step.
const S = 1024;
const cv = document.getElementById('c'), ctx = cv.getContext('2d');
const $ = id => document.getElementById(id);

// Cat cutout geometry (in the 800px source) and face area
const CAT = { w: 800, h: 799, bx: 272, by: 12, bw: 377, bh: 743, faceX: 450, faceY: 215, faceR: 150 };

const BGS = [
  ['#ffb04a'], ['#ff7aa8'], ['#7bd88f'], ['#6ab7ff'], ['#b48cff'], ['#ffe27a'], ['#2b2740'], ['#f2eee6'],
  ['#ff9a8b', '#ff6a88'], ['#a1c4fd', '#c2e9fb'], ['#fbc2eb', '#a6c1ee'], ['#f6d365', '#fda085'],
  ['#0f2027', '#2c5364'], ['#43e97b', '#38f9d7'],
];
const PATS = ['none', 'dots', 'stripes', 'checks', 'rays', 'stars'];
const FRAMES = ['circle', 'rounded', 'square'];
const ACCS = ['hat', 'sunglasses', 'bowtie', 'crown'];
const NAMES = { hat: 'Top hat', sunglasses: 'Sunglasses', bowtie: 'Bow tie', crown: 'Crown' };

const st = { bg: 0, pat: 'dots', frame: 'circle', zoom: 1.25, items: [], sel: -1, photo: null, photoMode: 'face', pface: { x: CAT.faceX, y: CAT.faceY, s: 1 } };

const catImg = new Image(); catImg.src = 'assets/gato-cutout.png';
catImg.onload = () => { defaults(); draw(); window.__ready = true; };

// Default placements in cat-source coords (so stickers follow the cat)
const DEF = {
  hat: { x: 450, y: 92, s: 1.0 }, sunglasses: { x: 446, y: 225, s: 1.0 },
  bowtie: { x: 452, y: 400, s: 0.8 }, crown: { x: 450, y: 70, s: 1.0 },
};
function defaults() { if (!st.items.length) { addAcc('hat'); } }

// ---- coordinate transform: cat source -> canvas
function T() {
  const base = (S * 0.92) / CAT.bh * 1.0;
  const sc = base * st.zoom;
  // keep the face roughly centred as zoom grows
  const fx = CAT.faceX, fy = CAT.faceY;
  const t = Math.min(1, Math.max(0, (st.zoom - 0.8) / 0.9));
  const cx = S / 2, cy = S * (0.54 - 0.06 * t * 0) ;
  // anchor point blends from body-centre to face
  const ax = CAT.bx + CAT.bw / 2, ay = CAT.by + CAT.bh / 2;
  const px = ax + (fx - ax) * t, py = ay + (fy - ay) * t;
  const tx = S / 2 - px * sc, ty = S * (0.5 + 0.0 * t) - py * sc + (1 - t) * 0 ;
  return { sc, tx, ty: ty + S * 0.04 * (1 - t) * 0 };
}
const toC = (x, y) => { const t = T(); return [x * t.sc + t.tx, y * t.sc + t.ty]; };
const toS = (x, y) => { const t = T(); return [(x - t.tx) / t.sc, (y - t.ty) / t.sc]; };

function frameMask(c) {
  c.beginPath();
  if (st.frame === 'circle') c.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2);
  else if (st.frame === 'rounded') c.roundRect(0, 0, S, S, S * 0.2);
  else c.rect(0, 0, S, S);
  c.clip();
}

function drawBg(c) {
  const b = BGS[st.bg];
  if (b.length === 1) c.fillStyle = b[0];
  else { const g = c.createLinearGradient(0, 0, S, S); g.addColorStop(0, b[0]); g.addColorStop(1, b[1]); c.fillStyle = g; }
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
function star(c, x, y, R, r) { c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; c[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fill(); }

function cover(c, img) { const k = Math.max(S / img.width, S / img.height); const w = img.width * k, h = img.height * k; c.drawImage(img, (S - w) / 2, (S - h) / 2, w, h); }

// ---- stickers: drawn in a 200x200 box centred on origin
const DRAW = {
  hat(c) {
    c.fillStyle = '#1d1b26'; c.beginPath(); c.ellipse(0, 45, 100, 18, 0, 0, 7); c.fill();
    c.beginPath(); c.roundRect(-58, -70, 116, 118, 10); c.fill();
    c.fillStyle = '#c0392b'; c.fillRect(-58, 14, 116, 24);
    c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(-46, -62, 14, 70);
  },
  sunglasses(c) {
    c.fillStyle = '#111'; c.strokeStyle = '#111'; c.lineWidth = 10; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-100, -20); c.lineTo(-80, -22); c.stroke();
    c.beginPath(); c.moveTo(100, -20); c.lineTo(80, -22); c.stroke();
    c.beginPath(); c.moveTo(-14, -14); c.quadraticCurveTo(0, -28, 14, -14); c.stroke();
    for (const s of [-1, 1]) { c.beginPath(); c.roundRect(s < 0 ? -84 : 10, -30, 74, 56, [10, 10, 30, 30]); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,.3)';
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo((s < 0 ? -72 : 22), -22); c.lineTo((s < 0 ? -50 : 44), -22); c.lineTo((s < 0 ? -66 : 28), 4); c.closePath(); c.fill(); }
  },
  bowtie(c) {
    c.fillStyle = '#e63946'; c.strokeStyle = '#9d1f2b'; c.lineWidth = 5;
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(0, 0); c.lineTo(s * 85, -48); c.quadraticCurveTo(s * 98, 0, s * 85, 48); c.closePath(); c.fill(); c.stroke(); }
    c.beginPath(); c.roundRect(-18, -24, 36, 48, 10); c.fill(); c.stroke();
  },
  crown(c) {
    c.fillStyle = '#ffd23f'; c.strokeStyle = '#b8860b'; c.lineWidth = 6; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-85, 50); c.lineTo(-95, -50); c.lineTo(-45, -5); c.lineTo(0, -65); c.lineTo(45, -5); c.lineTo(95, -50); c.lineTo(85, 50); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#e63946'; c.beginPath(); c.arc(0, 18, 12, 0, 7); c.fill();
    c.fillStyle = '#3aa0ff'; for (const x of [-48, 48]) { c.beginPath(); c.arc(x, 24, 8, 0, 7); c.fill(); }
    for (const [x, y] of [[-95, -50], [0, -65], [95, -50]]) { c.fillStyle = '#fff3b0'; c.beginPath(); c.arc(x, y, 9, 0, 7); c.fill(); c.stroke(); }
  },
};
const BOX = 200; // sticker box size in sticker units; displayed size = BOX * 0.9 * s * scale
function itemScale(it) { return T().sc * 0.9 * it.s; }
function drawItem(c, it) {
  const [x, y] = toC(it.x, it.y); const k = itemScale(it);
  c.save(); c.translate(x, y); c.rotate(it.r * Math.PI / 180); c.scale(k, k);
  c.shadowColor = 'rgba(0,0,0,.25)'; c.shadowBlur = 8; c.shadowOffsetY = 3;
  DRAW[it.type](c); c.restore();
}

function drawPhotoFace(c) {
  const p = st.pface, [x, y] = toC(p.x, p.y), r = CAT.faceR * T().sc * p.s;
  c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip();
  const im = st.photo, k = (2 * r) / Math.min(im.width, im.height);
  c.drawImage(im, x - im.width * k / 2, y - im.height * k / 2, im.width * k, im.height * k);
  c.restore(); c.save(); c.lineWidth = 8; c.strokeStyle = '#fff'; c.beginPath(); c.arc(x, y, r, 0, 7); c.stroke(); c.restore();
}

function render(c, ui) {
  c.clearRect(0, 0, S, S);
  c.save(); frameMask(c);
  drawBg(c);
  if (st.photo && st.photoMode === 'bg') cover(c, st.photo);
  const t = T();
  if (catImg.complete && catImg.naturalWidth) { c.save(); c.shadowColor = 'rgba(0,0,0,.3)'; c.shadowBlur = 24; c.shadowOffsetY = 10; c.drawImage(catImg, t.tx, t.ty, CAT.w * t.sc, CAT.h * t.sc); c.restore(); }
  if (st.photo && st.photoMode === 'face') drawPhotoFace(c);
  st.items.forEach(it => drawItem(c, it));
  c.restore();
  if (ui && st.sel >= 0) { // selection ring
    c.save(); const it = st.items[st.sel]; const [x, y] = toC(it.x, it.y); c.strokeStyle = '#fff'; c.setLineDash([14, 10]); c.lineWidth = 4; c.shadowColor = '#000'; c.shadowBlur = 4;
    c.beginPath(); c.arc(x, y, itemScale(it) * 100, 0, 7); c.stroke(); c.restore();
  }
}
function draw() { render(ctx, true); }

// ---- UI building
function chips(el, list, key, label) {
  el.innerHTML = '';
  list.forEach(v => { const b = document.createElement('button'); b.textContent = label ? label(v) : v; b.dataset.v = v; b.onclick = () => { st[key] = v; sync(); draw(); }; el.appendChild(b); });
}
function sync() {
  document.querySelectorAll('#bgs .sw').forEach((b, i) => b.classList.toggle('on', i === st.bg));
  document.querySelectorAll('#pats button').forEach(b => b.classList.toggle('on', b.dataset.v === st.pat));
  document.querySelectorAll('#frames button').forEach(b => b.classList.toggle('on', b.dataset.v === st.frame));
  $('pface').classList.toggle('on', st.photoMode === 'face'); $('pbg').classList.toggle('on', st.photoMode === 'bg');
  $('zoom').value = st.zoom;
  const it = st.items[st.sel]; $('sel').classList.toggle('hidden', !it);
  if (it) { $('selname').textContent = NAMES[it.type]; $('selsize').value = it.s; $('selrot').value = it.r; }
}
BGS.forEach((b, i) => { const s = document.createElement('button'); s.className = 'sw'; s.title = 'Background ' + (i + 1); s.style.background = b.length > 1 ? `linear-gradient(135deg,${b[0]},${b[1]})` : b[0]; s.onclick = () => { st.bg = i; sync(); draw(); }; $('bgs').appendChild(s); });
chips($('pats'), PATS, 'pat'); chips($('frames'), FRAMES, 'frame');
ACCS.forEach(a => { const b = document.createElement('button'); b.textContent = '+ ' + NAMES[a]; b.onclick = () => { addAcc(a); }; $('acc').appendChild(b); });
function addAcc(type) { const d = DEF[type]; st.items.push({ type, x: d.x, y: d.y, s: d.s, r: 0 }); st.sel = st.items.length - 1; sync(); draw(); }

$('zoom').oninput = e => { st.zoom = +e.target.value; draw(); };
$('selsize').oninput = e => { const it = st.items[st.sel]; if (it) { it.s = +e.target.value; draw(); } };
$('selrot').oninput = e => { const it = st.items[st.sel]; if (it) { it.r = +e.target.value; draw(); } };
$('seldel').onclick = () => { if (st.sel >= 0) { st.items.splice(st.sel, 1); st.sel = -1; sync(); draw(); } };
$('file').onchange = e => { const f = e.target.files[0]; if (!f) return; const im = new Image(); im.onload = () => { st.photo = im; st.pface = { x: CAT.faceX, y: CAT.faceY, s: 1 }; sync(); draw(); window.__photo = true; }; im.src = URL.createObjectURL(f); };
$('pface').onclick = () => { st.photoMode = 'face'; sync(); draw(); };
$('pbg').onclick = () => { st.photoMode = 'bg'; sync(); draw(); };
$('pclear').onclick = () => { st.photo = null; $('file').value = ''; draw(); };

// ---- drag / pinch
const pts = new Map(); let drag = null, pinch = null;
function pos(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * S / r.width, (e.clientY - r.top) * S / r.height]; }
function hit(x, y) {
  for (let i = st.items.length - 1; i >= 0; i--) { const it = st.items[i]; const [cx, cy] = toC(it.x, it.y); if (Math.hypot(x - cx, y - cy) < itemScale(it) * 100) return i; }
  if (st.photo && st.photoMode === 'face') { const p = st.pface, [cx, cy] = toC(p.x, p.y); if (Math.hypot(x - cx, y - cy) < CAT.faceR * T().sc * p.s) return 'photo'; }
  return -1;
}
cv.addEventListener('pointerdown', e => {
  cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, pos(e));
  if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), tgt: drag && drag.tgt, s: drag && drag.s0 }; return; }
  const [x, y] = pos(e); const h = hit(x, y);
  if (h === 'photo') { st.sel = -1; drag = { tgt: 'photo', ox: x, oy: y, x0: st.pface.x, y0: st.pface.y, s0: st.pface.s }; }
  else if (h >= 0) { st.sel = h; const it = st.items[h]; drag = { tgt: it, ox: x, oy: y, x0: it.x, y0: it.y, s0: it.s }; } else { st.sel = -1; drag = null; }
  sync(); draw();
});
cv.addEventListener('pointermove', e => {
  if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, pos(e));
  if (pts.size === 2 && pinch && pinch.tgt) { const [a, b] = [...pts.values()]; const k = Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d; if (pinch.tgt === 'photo') st.pface.s = clamp(pinch.s * k, .4, 3); else pinch.tgt.s = clamp(pinch.s * k, .2, 3); sync(); draw(); return; }
  if (!drag || pts.size > 1) return; const [x, y] = pos(e); const sc = T().sc;
  const o = drag.tgt === 'photo' ? st.pface : drag.tgt; o.x = drag.x0 + (x - drag.ox) / sc; o.y = drag.y0 + (y - drag.oy) / sc; draw();
});
const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch = null; if (!pts.size) drag = null; };
cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
cv.addEventListener('wheel', e => { const it = st.items[st.sel]; if (!it) return; e.preventDefault(); it.s = clamp(it.s * (e.deltaY < 0 ? 1.06 : 0.94), .2, 3); sync(); draw(); }, { passive: false });
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// ---- randomize / download
const pick = a => a[Math.floor(Math.random() * a.length)];
$('rand').onclick = () => {
  st.bg = Math.floor(Math.random() * BGS.length); st.pat = pick(PATS); st.frame = pick(FRAMES); st.zoom = +(1 + Math.random() * 0.6).toFixed(2);
  st.items = []; const n = pick([1, 1, 2, 2, 3]); const pool = ['hat', 'crown', 'sunglasses', 'bowtie'];
  // at most one headwear
  const head = pick(['hat', 'crown', null]); if (head) st.items.push({ type: head, ...DEF[head], r: Math.round((Math.random() - .5) * 16) });
  ['sunglasses', 'bowtie'].sort(() => Math.random() - .5).slice(0, Math.max(0, n - (head ? 1 : 0))).forEach(t => st.items.push({ type: t, ...DEF[t], r: Math.round((Math.random() - .5) * 12) }));
  st.sel = -1; sync(); draw();
};
$('dl').onclick = () => {
  const o = document.createElement('canvas'); o.width = o.height = S; render(o.getContext('2d'), false);
  o.toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'gato-pfp.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }, 'image/png');
};
sync();
