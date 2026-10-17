// New accessories: original hand-drawn canvas art (no brands, no logos). Drawn in a ~200x200 box centred on origin.
const LG = (c, x0, y0, x1, y1, a, b, m) => { const g = c.createLinearGradient(x0, y0, x1, y1); g.addColorStop(0, a); if (m) g.addColorStop(.5, m); g.addColorStop(1, b); return g; };
const FS = (c, f, s, w) => { c.fillStyle = f; if (s) { c.strokeStyle = s; c.lineWidth = w || 5; } c.lineJoin = 'round'; c.lineCap = 'round'; c.fill(); if (s) c.stroke(); };
const TXT = (c, t, x, y, size, f, s, w) => { c.font = `900 ${size}px "Trebuchet MS",system-ui,sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; if (s) { c.strokeStyle = s; c.lineWidth = w || 6; c.strokeText(t, x, y); } c.fillStyle = f; c.fillText(t, x, y); };
const heart = (c, x, y, r) => { c.beginPath(); c.moveTo(x, y + r * .9); c.bezierCurveTo(x - r * 1.5, y - r * .1, x - r * .8, y - r * 1.1, x, y - r * .4); c.bezierCurveTo(x + r * .8, y - r * 1.1, x + r * 1.5, y - r * .1, x, y + r * .9); c.closePath(); };
const gloss = (c, x, y, rx, ry, rot) => { c.save(); c.fillStyle = 'rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(x, y, rx, ry, rot || 0, 0, 7); c.fill(); c.restore(); };
const sparkle = (c, x, y, r, col) => { c.fillStyle = col || '#fff'; c.beginPath(); c.moveTo(x, y - r); c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r); c.fill(); };

Object.assign(DRAW, {
  // ---------- HATS
  beanie(c) {
    c.beginPath(); c.moveTo(-72, 30); c.quadraticCurveTo(-80, -70, 0, -78); c.quadraticCurveTo(80, -70, 72, 30); c.closePath(); FS(c, LG(c, 0, -80, 0, 30, '#6ec1e4', '#2e86ab'), '#1f5f7d');
    c.save(); c.clip(); c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 5; for (let x = -60; x < 70; x += 20) { c.beginPath(); c.moveTo(x, -80); c.lineTo(x * 1.1, 30); c.stroke(); } c.restore();
    c.beginPath(); c.roundRect(-82, 8, 164, 42, 14); FS(c, LG(c, 0, 8, 0, 50, '#f4f1ea', '#cfc8b8'), '#a9a290');
    c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 4; for (let x = -66; x < 80; x += 16) { c.beginPath(); c.moveTo(x, 12); c.lineTo(x, 46); c.stroke(); }
    const g = c.createRadialGradient(-6, -100, 4, 0, -94, 24); g.addColorStop(0, '#fff'); g.addColorStop(1, '#d8d2c4'); c.beginPath(); c.arc(0, -92, 22, 0, 7); FS(c, g, '#a9a290', 4);
  },
  cowboy(c) {
    c.beginPath(); c.moveTo(-105, 30); c.quadraticCurveTo(-90, 55, -40, 38); c.quadraticCurveTo(0, 48, 40, 38); c.quadraticCurveTo(90, 55, 105, 30); c.quadraticCurveTo(100, 62, 40, 60); c.lineTo(-40, 60); c.quadraticCurveTo(-100, 62, -105, 30); c.closePath(); FS(c, LG(c, 0, 30, 0, 62, '#b07a45', '#7a4f26'), '#573815');
    c.beginPath(); c.moveTo(-56, 40); c.quadraticCurveTo(-62, -40, -40, -60); c.quadraticCurveTo(-20, -50, 0, -58); c.quadraticCurveTo(20, -50, 40, -60); c.quadraticCurveTo(62, -40, 56, 40); c.quadraticCurveTo(0, 56, -56, 40); FS(c, LG(c, 0, -60, 0, 50, '#c48d56', '#8c5b2e'), '#573815');
    c.beginPath(); c.moveTo(-58, 18); c.quadraticCurveTo(0, 36, 58, 18); c.lineTo(56, 38); c.quadraticCurveTo(0, 56, -56, 38); c.closePath(); FS(c, '#4a2c17', '#2e1a0c', 3);
    c.fillStyle = '#ffd23f'; c.beginPath(); c.roundRect(-12, 26, 24, 18, 4); c.fill(); gloss(c, -30, -26, 8, 22, .2);
  },
  chef(c) {
    c.beginPath(); c.moveTo(-60, 40); c.bezierCurveTo(-100, 20, -96, -50, -52, -48); c.bezierCurveTo(-48, -96, 48, -96, 52, -48); c.bezierCurveTo(96, -50, 100, 20, 60, 40); c.closePath(); FS(c, LG(c, -80, -80, 80, 40, '#ffffff', '#e4e4ea'), '#bdbdc8');
    c.strokeStyle = 'rgba(0,0,0,.08)'; c.lineWidth = 4; for (const x of [-30, 0, 30]) { c.beginPath(); c.moveTo(x, -20); c.lineTo(x * 1.1, 34); c.stroke(); }
    c.beginPath(); c.roundRect(-62, 30, 124, 34, 8); FS(c, '#fff', '#bdbdc8');
  },
  propeller(c) {
    const cols = ['#ff5f5f', '#ffd23f', '#3aa0ff', '#7bd88f'];
    for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(0, 36); c.ellipse(0, 36, 74, 100, 0, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); c.closePath(); FS(c, cols[i], '#222', 3); }
    c.beginPath(); c.roundRect(-76, 30, 152, 14, 7); FS(c, '#fff', '#444', 3);
    c.fillStyle = '#444'; c.fillRect(-4, -78, 8, 24);
    for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * 28, -84, 30, 9, s * -.2, 0, 7); FS(c, s < 0 ? '#ff5f5f' : '#3aa0ff', '#222', 3); }
    c.beginPath(); c.arc(0, -82, 7, 0, 7); FS(c, '#ffd23f', '#222', 3); gloss(c, -30, -10, 8, 26, .3);
  },
  cap(c) {
    c.beginPath(); c.moveTo(-68, 36); c.quadraticCurveTo(-72, -64, 0, -64); c.quadraticCurveTo(72, -64, 68, 36); c.closePath(); FS(c, LG(c, 0, -64, 0, 36, '#3b82f6', '#1d4ed8'), '#173a9c');
    c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -64); c.quadraticCurveTo(-14, -14, -10, 36); c.moveTo(0, -64); c.quadraticCurveTo(26, -14, 38, 34); c.stroke();
    c.beginPath(); c.moveTo(-10, 28); c.quadraticCurveTo(70, 18, 112, 38); c.quadraticCurveTo(112, 58, 60, 52); c.quadraticCurveTo(10, 48, -10, 40); c.closePath(); FS(c, LG(c, 0, 20, 0, 56, '#ef4444', '#b91c1c'), '#7f1313');
    c.beginPath(); c.arc(0, -64, 6, 0, 7); FS(c, '#1d4ed8', '#173a9c', 3); gloss(c, -34, -28, 8, 22, .4);
  },
  bunny(c) {
    for (const s of [-1, 1]) { c.save(); c.translate(s * 46, 0); c.rotate(s * .18);
      c.beginPath(); c.ellipse(0, -30, 26, 78, 0, 0, 7); FS(c, LG(c, 0, -100, 0, 40, '#fff', '#e6e1ea'), '#bdb6c6');
      c.beginPath(); c.ellipse(0, -26, 12, 58, 0, 0, 7); FS(c, LG(c, 0, -80, 0, 30, '#ffb3cc', '#ff8fb3')); c.restore(); }
    c.beginPath(); c.roundRect(-70, 52, 140, 16, 8); FS(c, '#ff8fb3', '#c95a82', 4);
  },
  // ---------- EYES
  heartglasses(c) {
    for (const s of [-1, 1]) { heart(c, s * 74, -2, 40); FS(c, LG(c, 0, -40, 0, 36, '#ff7aa8', '#e0245e'), '#9b1642', 6); c.save(); c.translate(s * 74, 0); gloss(c, -14, -12, 8, 14, .6); c.restore(); }
    c.strokeStyle = '#9b1642'; c.lineWidth = 7; c.lineCap = 'round'; c.beginPath(); c.moveTo(-18, -14); c.quadraticCurveTo(0, -26, 18, -14); c.moveTo(-112, -10); c.lineTo(-140, -22); c.moveTo(112, -10); c.lineTo(140, -22); c.stroke();
  },
  roundglasses(c) {
    c.strokeStyle = '#3b2a1e'; c.lineWidth = 9;
    for (const s of [-1, 1]) { c.fillStyle = 'rgba(190,225,255,.28)'; c.beginPath(); c.arc(s * 74, 0, 37, 0, 7); c.fill(); c.stroke(); c.save(); c.translate(s * 74, 0); c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, 25, Math.PI * 1.1, Math.PI * 1.45); c.stroke(); c.restore(); c.strokeStyle = '#3b2a1e'; c.lineWidth = 9; }
    c.beginPath(); c.moveTo(-37, -6); c.quadraticCurveTo(0, -20, 37, -6); c.moveTo(-110, -6); c.lineTo(-140, -14); c.moveTo(110, -6); c.lineTo(140, -14); c.stroke();
  },
  goggles(c) {
    c.beginPath(); c.roundRect(-150, -20, 300, 40, 20); FS(c, LG(c, 0, -20, 0, 20, '#ff9a3c', '#d9640a'), '#8a3e04', 4); // strap
    for (const s of [-1, 1]) { c.beginPath(); c.roundRect(s * 74 - 44, -42, 88, 80, 36); FS(c, '#2b2b36', '#111', 4); c.beginPath(); c.roundRect(s * 74 - 35, -33, 70, 62, 28); FS(c, LG(c, 0, -33, 0, 29, '#8fd3ff', '#2f7fc8'), '#111', 3); c.save(); c.translate(s * 74, 0); gloss(c, -12, -14, 8, 14, .6); c.restore(); }
    c.beginPath(); c.roundRect(-20, -12, 40, 22, 8); FS(c, '#2b2b36');
  },
  sparkleeyes(c) {
    for (const s of [-1, 1]) { const g = c.createRadialGradient(s * 74, 0, 2, s * 74, 0, 46); g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,230,120,0)'); c.fillStyle = g; c.beginPath(); c.arc(s * 74, 0, 46, 0, 7); c.fill();
      sparkle(c, s * 74, 0, 34, '#fff'); sparkle(c, s * 74 + 26, -26, 14, '#ffe27a'); sparkle(c, s * 74 - 24, 24, 10, '#ffd1e8'); }
  },
  // ---------- FACE
  blush(c) { for (const s of [-1, 1]) { const g = c.createRadialGradient(s * 122, 0, 2, s * 122, 0, 40); g.addColorStop(0, 'rgba(255,80,130,.65)'); g.addColorStop(1, 'rgba(255,80,130,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(s * 122, 0, 42, 28, 0, 0, 7); c.fill(); } },
  blep(c) {
    c.beginPath(); c.moveTo(-20, -6); c.quadraticCurveTo(-22, 46, 0, 48); c.quadraticCurveTo(22, 46, 20, -6); c.closePath(); FS(c, LG(c, 0, -6, 0, 48, '#ff8fa3', '#ef4f73'), '#b02a4c', 4);
    c.strokeStyle = '#c93a5c'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 30); c.stroke(); gloss(c, -8, 12, 3, 8, 0);
  },
  freckles(c) { c.fillStyle = 'rgba(140,70,30,.7)'; for (const s of [-1, 1]) for (const [x, y] of [[96, -6], [118, -14], [136, 2], [112, 10], [132, 22], [92, 16]]) { c.beginPath(); c.arc(s * x, y, 4.2, 0, 7); c.fill(); } },
  plaster(c) {
    c.save(); c.rotate(-.5); c.beginPath(); c.roundRect(-52, -17, 104, 34, 14); FS(c, LG(c, 0, -17, 0, 17, '#ffd9b0', '#f0b383'), '#c98a5a', 3);
    c.fillStyle = '#f7e6cf'; c.beginPath(); c.roundRect(-18, -17, 36, 34, 3); c.fill(); c.fillStyle = 'rgba(160,100,60,.35)'; for (const x of [-10, 0, 10]) for (const y of [-8, 0, 8]) { c.beginPath(); c.arc(x, y, 1.6, 0, 7); c.fill(); } c.restore();
  },
  // ---------- NECK
  necktie(c) {
    c.beginPath(); c.moveTo(-18, -20); c.lineTo(18, -20); c.lineTo(12, 0); c.lineTo(-12, 0); c.closePath(); FS(c, '#c0392b', '#7d1f15', 4);
    c.beginPath(); c.moveTo(-12, 0); c.lineTo(12, 0); c.lineTo(30, 80); c.lineTo(0, 100); c.lineTo(-30, 80); c.closePath(); FS(c, LG(c, -30, 0, 30, 100, '#e0503f', '#a32a1c'), '#7d1f15', 4);
    c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 7; for (let y = 24; y < 90; y += 22) { c.beginPath(); c.moveTo(-24, y + 10); c.lineTo(24, y - 12); c.stroke(); }
  },
  bell(c) {
    c.beginPath(); c.roundRect(-96, -14, 192, 28, 14); FS(c, LG(c, 0, -14, 0, 14, '#ff5f6d', '#c8283a'), '#7d1520', 4); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(-80, -8, 160, 5);
    const g = c.createRadialGradient(-6, 34, 3, 0, 40, 28); g.addColorStop(0, '#fff3b0'); g.addColorStop(1, '#e0a800'); c.beginPath(); c.arc(0, 40, 26, 0, 7); FS(c, g, '#9a7200', 4);
    c.strokeStyle = '#9a7200'; c.lineWidth = 4; c.beginPath(); c.moveTo(-20, 36); c.quadraticCurveTo(0, 44, 20, 36); c.stroke(); c.beginPath(); c.arc(0, 54, 5, 0, 7); c.fillStyle = '#6b4e00'; c.fill();
  },
  pearls(c) {
    for (let i = 0; i <= 14; i++) { const t = i / 14, x = -92 + t * 184, y = -10 + Math.sin(t * Math.PI) * 54; const g = c.createRadialGradient(x - 3, y - 3, 1, x, y, 10); g.addColorStop(0, '#fff'); g.addColorStop(1, '#d9d4e6'); c.beginPath(); c.arc(x, y, 9.5, 0, 7); FS(c, g, '#aaa4be', 1.5); }
  },
  chain(c) {
    c.strokeStyle = '#8f6a00'; c.lineWidth = 10; c.beginPath(); c.moveTo(-92, -10); c.quadraticCurveTo(0, 90, 92, -10); c.stroke(); c.strokeStyle = LG(c, -90, 0, 90, 60, '#ffe27a', '#e0a800', '#fff3b0'); c.lineWidth = 6; c.setLineDash([9, 5]); c.stroke(); c.setLineDash([]);
    const g = c.createRadialGradient(-8, 62, 3, 0, 68, 34); g.addColorStop(0, '#fff3b0'); g.addColorStop(1, '#e0a800'); c.beginPath(); c.arc(0, 68, 32, 0, 7); FS(c, g, '#8f6a00', 5); star(c, 0, 68, 18, 8); c.fillStyle = '#b8860b'; c.fill();
  },
  // ---------- OUTFIT
  tee(c) {
    c.beginPath(); c.moveTo(-40, -60); c.quadraticCurveTo(0, -36, 40, -60); c.lineTo(100, -34); c.lineTo(86, 12); c.lineTo(56, 0); c.lineTo(58, 90); c.lineTo(-58, 90); c.lineTo(-56, 0); c.lineTo(-86, 12); c.lineTo(-100, -34); c.closePath(); FS(c, LG(c, 0, -60, 0, 90, '#5eead4', '#14b8a6'), '#0b7a6e');
    c.beginPath(); c.moveTo(-40, -60); c.quadraticCurveTo(0, -36, 40, -60); c.strokeStyle = '#0b7a6e'; c.lineWidth = 8; c.stroke(); c.fillStyle = '#fff'; star(c, 0, 28, 26, 11); c.fillStyle = '#fff'; c.fill();
  },
  sweater(c) {
    c.beginPath(); c.moveTo(-44, -60); c.quadraticCurveTo(0, -34, 44, -60); c.lineTo(102, -30); c.lineTo(92, 20); c.lineTo(58, 8); c.lineTo(60, 92); c.lineTo(-60, 92); c.lineTo(-58, 8); c.lineTo(-92, 20); c.lineTo(-102, -30); c.closePath(); FS(c, '#f08a4b', '#a8531f');
    c.save(); c.clip(); for (let y = -50; y < 100; y += 30) { c.fillStyle = y % 60 ? '#fff3d6' : '#f08a4b'; c.fillRect(-110, y, 220, 14); } c.fillStyle = 'rgba(255,255,255,.1)'; for (let x = -100; x < 100; x += 10) c.fillRect(x, -70, 3, 170); c.restore();
    c.beginPath(); c.roundRect(-62, 84, 124, 14, 6); FS(c, '#d9702c', '#a8531f', 3);
    c.beginPath(); c.moveTo(-44, -60); c.quadraticCurveTo(0, -34, 44, -60); c.strokeStyle = '#a8531f'; c.lineWidth = 12; c.stroke();
  },
  vest(c) {
    c.beginPath(); c.moveTo(-62, -60); c.lineTo(-8, -60); c.lineTo(0, 10); c.lineTo(8, -60); c.lineTo(62, -60); c.lineTo(66, 92); c.lineTo(0, 108); c.lineTo(-66, 92); c.closePath(); FS(c, LG(c, 0, -60, 0, 100, '#3a3f5c', '#1e2136'), '#0f1120');
    c.beginPath(); c.moveTo(-8, -60); c.lineTo(0, 10); c.lineTo(8, -60); c.closePath(); FS(c, '#f4f1ea', '#bbb', 2);
    for (const y of [24, 52, 80]) { c.beginPath(); c.arc(0, y, 7, 0, 7); FS(c, LG(c, -7, y - 7, 7, y + 7, '#ffe27a', '#d9a400'), '#8f6a00', 2); }
  },
  cape(c) {
    c.beginPath(); c.moveTo(-60, -80); c.quadraticCurveTo(0, -60, 60, -80); c.quadraticCurveTo(110, 20, 130, 150); c.quadraticCurveTo(0, 175, -130, 150); c.quadraticCurveTo(-110, 20, -60, -80); c.closePath(); FS(c, LG(c, 0, -80, 0, 170, '#e63946', '#8f1522'), '#6a0f19', 6);
    c.save(); c.clip(); c.strokeStyle = 'rgba(0,0,0,.18)'; c.lineWidth = 6; for (const x of [-60, -20, 25, 65]) { c.beginPath(); c.moveTo(x * .5, -70); c.quadraticCurveTo(x * 1.3, 40, x * 1.9, 160); c.stroke(); } c.restore();
    c.beginPath(); c.arc(0, -72, 10, 0, 7); FS(c, LG(c, -10, -80, 10, -64, '#ffe27a', '#d9a400'), '#8f6a00', 3);
  },
  overalls(c) {
    c.beginPath(); c.moveTo(-52, -40); c.lineTo(52, -40); c.lineTo(60, 92); c.lineTo(-60, 92); c.closePath(); FS(c, LG(c, 0, -40, 0, 92, '#5b8bd9', '#33579b'), '#1e3a6e');
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 34, -40); c.lineTo(s * 48, -80); c.lineTo(s * 28, -80); c.lineTo(s * 16, -40); c.closePath(); FS(c, '#4a78c4', '#1e3a6e', 4); c.beginPath(); c.arc(s * 40, -34, 7, 0, 7); FS(c, '#ffd23f', '#8f6a00', 2); }
    c.beginPath(); c.roundRect(-28, -6, 56, 40, 6); FS(c, '#4a78c4', '#1e3a6e', 3); c.setLineDash([4, 4]); c.strokeStyle = '#f5d28a'; c.lineWidth = 2; c.strokeRect(-24, -2, 48, 32); c.setLineDash([]);
  },
  // ---------- PROPS
  fish(c) {
    c.beginPath(); c.moveTo(-90, 0); c.quadraticCurveTo(-30, -62, 50, -8); c.lineTo(100, -42); c.quadraticCurveTo(84, 0, 100, 42); c.lineTo(50, 8); c.quadraticCurveTo(-30, 62, -90, 0); c.closePath(); FS(c, LG(c, 0, -50, 0, 50, '#8fd3ff', '#2f7fc8', '#cfeaff'), '#1d4f86');
    c.beginPath(); c.arc(-58, -8, 7, 0, 7); c.fillStyle = '#fff'; c.fill(); c.beginPath(); c.arc(-56, -8, 3.5, 0, 7); c.fillStyle = '#111'; c.fill();
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 3; for (let x = -20; x < 40; x += 16) { c.beginPath(); c.arc(x, 0, 14, -1, 1); c.stroke(); }
  },
  icecream(c) {
    c.beginPath(); c.moveTo(-34, 0); c.lineTo(34, 0); c.lineTo(0, 110); c.closePath(); FS(c, LG(c, -30, 0, 30, 100, '#f2c47a', '#c98a3a'), '#8a5a1c', 4);
    c.save(); c.clip(); c.strokeStyle = 'rgba(120,70,20,.35)'; c.lineWidth = 3; for (let i = -40; i < 80; i += 18) { c.beginPath(); c.moveTo(i, 0); c.lineTo(i + 60, 110); c.moveTo(i + 60, 0); c.lineTo(i, 110); c.stroke(); } c.restore();
    c.beginPath(); c.arc(0, -8, 42, 0, 7); FS(c, LG(c, -30, -50, 30, 30, '#ffc0da', '#ff7aa8'), '#c94a7c'); c.beginPath(); c.arc(0, -50, 30, 0, 7); FS(c, LG(c, -20, -80, 20, -20, '#a8f0d0', '#4fd1a0'), '#2a8f6b'); gloss(c, -14, -58, 6, 9, .5);
    c.beginPath(); c.arc(0, -82, 9, 0, 7); FS(c, '#e63946', '#8f1522', 3);
  },
  coffee(c) {
    c.beginPath(); c.arc(54, 6, 26, -1.4, 1.4); c.lineWidth = 12; c.strokeStyle = '#fff'; c.stroke(); c.lineWidth = 4; c.strokeStyle = '#bbb'; c.stroke();
    c.beginPath(); c.moveTo(-50, -30); c.lineTo(50, -30); c.lineTo(40, 50); c.quadraticCurveTo(0, 66, -40, 50); c.closePath(); FS(c, LG(c, -50, 0, 50, 0, '#fff', '#dfe3ea', '#fff'), '#aab', 4);
    c.beginPath(); c.ellipse(0, -30, 50, 10, 0, 0, 7); FS(c, '#5a3418', '#3a200d', 3); gloss(c, -10, -31, 24, 3, 0);
    c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 6; c.beginPath(); c.moveTo(-16, -50); c.quadraticCurveTo(-30, -70, -14, -86); c.moveTo(14, -52); c.quadraticCurveTo(0, -72, 16, -90); c.stroke();
    c.fillStyle = '#ff7aa8'; heart(c, 0, 14, 12); c.fill();
  },
  balloon(c) {
    c.strokeStyle = '#777'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 62); c.bezierCurveTo(-18, 100, 18, 130, 0, 170); c.stroke();
    c.beginPath(); c.moveTo(0, 62); c.bezierCurveTo(-70, 30, -56, -86, 0, -86); c.bezierCurveTo(56, -86, 70, 30, 0, 62); FS(c, (() => { const g = c.createRadialGradient(-18, -40, 6, 0, -10, 80); g.addColorStop(0, '#ff9ab5'); g.addColorStop(1, '#e0245e'); return g; })(), '#a8123f');
    c.beginPath(); c.moveTo(-8, 68); c.lineTo(8, 68); c.lineTo(0, 58); c.closePath(); FS(c, '#c8123f'); gloss(c, -22, -44, 9, 20, .5);
  },
  loveheart(c) {
    heart(c, 0, 0, 62); FS(c, LG(c, 0, -60, 0, 60, '#ff8fb3', '#e0245e'), '#9b1642', 6); gloss(c, -28, -26, 10, 18, .7);
    c.fillStyle = '#fff'; c.font = '900 26px system-ui'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('♥', 0, 8);
  },
  gift(c) {
    c.beginPath(); c.roundRect(-64, -26, 128, 92, 8); FS(c, LG(c, 0, -26, 0, 66, '#8b5cf6', '#5b34c4'), '#3a1f8c');
    c.beginPath(); c.roundRect(-72, -50, 144, 34, 8); FS(c, LG(c, 0, -50, 0, -16, '#a78bfa', '#7448e0'), '#3a1f8c');
    c.fillStyle = '#ffd23f'; c.fillRect(-12, -50, 24, 116); c.strokeStyle = '#b8860b'; c.lineWidth = 2; c.strokeRect(-12, -50, 24, 116);
    for (const s of [-1, 1]) { c.beginPath(); c.ellipse(s * 28, -66, 28, 16, s * -.5, 0, 7); FS(c, '#ffd23f', '#b8860b', 4); }
    c.beginPath(); c.arc(0, -52, 9, 0, 7); FS(c, '#ffe27a', '#b8860b', 3);
  },
  trophy(c) {
    c.beginPath(); c.arc(-56, -20, 22, 1.2, 4.8); c.lineWidth = 9; c.strokeStyle = '#d9a400'; c.stroke(); c.beginPath(); c.arc(56, -20, 22, 4.6, 8); c.stroke();
    c.beginPath(); c.moveTo(-50, -70); c.lineTo(50, -70); c.quadraticCurveTo(52, 20, 10, 36); c.lineTo(-10, 36); c.quadraticCurveTo(-52, 20, -50, -70); c.closePath(); FS(c, LG(c, -50, 0, 50, 0, '#ffe27a', '#d9a400', '#fff6c8'), '#8f6a00');
    c.fillStyle = '#d9a400'; c.fillRect(-10, 34, 20, 26); c.beginPath(); c.roundRect(-42, 58, 84, 22, 6); FS(c, LG(c, 0, 58, 0, 80, '#6b4e2a', '#3b2a14'), '#2a1c0a', 3);
    star(c, 0, -26, 20, 9); c.fillStyle = '#fff6c8'; c.fill();
  },
  lollipop(c) {
    c.strokeStyle = '#eee'; c.lineWidth = 9; c.beginPath(); c.moveTo(0, 20); c.lineTo(0, 120); c.stroke(); c.strokeStyle = '#bbb'; c.lineWidth = 2; c.stroke();
    c.beginPath(); c.arc(0, -30, 56, 0, 7); FS(c, '#ff7aa8', '#c94a7c', 5); c.save(); c.clip(); c.strokeStyle = '#fff'; c.lineWidth = 11; c.beginPath(); for (let a = 0; a < 18; a += .2) { const r = a * 3.2; c.lineTo(Math.cos(a) * r, -30 + Math.sin(a) * r); } c.stroke(); c.restore(); gloss(c, -22, -54, 8, 14, .6);
  },
  // ---------- EXTRAS
  wings(c) {
    for (const s of [-1, 1]) { c.save(); c.scale(s, 1); c.beginPath(); c.moveTo(20, 20); c.bezierCurveTo(60, -90, 150, -120, 190, -90); c.bezierCurveTo(176, -60, 190, -40, 170, -14); c.bezierCurveTo(176, 10, 150, 20, 130, 30); c.bezierCurveTo(110, 40, 70, 50, 20, 40); c.closePath(); FS(c, LG(c, 20, -100, 180, 40, '#ffffff', '#cfe4ff'), '#9ab6e0', 5);
      c.strokeStyle = 'rgba(120,150,200,.5)'; c.lineWidth = 3; for (const k of [0, 1, 2]) { c.beginPath(); c.moveTo(30, 24); c.quadraticCurveTo(90 + k * 20, -40 + k * 30, 170 - k * 6, -70 + k * 40); c.stroke(); } c.restore(); }
  },
  sparkles(c) { for (const [x, y, r, col] of [[-70, -40, 26, '#fff'], [50, -64, 34, '#ffe27a'], [90, 10, 20, '#fff'], [-30, 40, 16, '#ffd1e8'], [-100, 30, 12, '#bfe6ff'], [10, -20, 12, '#fff'], [70, 66, 14, '#ffe27a']]) { c.shadowColor = col; c.shadowBlur = 14; sparkle(c, x, y, r, col); } },
  hearts(c) { for (const [x, y, r, col] of [[-60, 30, 22, '#ff7aa8'], [10, -30, 32, '#ff4d85'], [66, 20, 20, '#ff9ab5'], [-20, 70, 14, '#ffb3cc'], [90, -50, 14, '#ff7aa8']]) { heart(c, x, y, r); FS(c, col, '#b81a50', 3); } },
  meowbubble(c) {
    c.beginPath(); c.roundRect(-90, -50, 180, 90, 40); c.moveTo(-40, 36); c.lineTo(-62, 78); c.lineTo(-8, 38); FS(c, '#fff', '#2b2740', 6);
    c.beginPath(); c.roundRect(-84, -44, 168, 78, 36); c.fillStyle = '#fff'; c.fill(); TXT(c, 'meow', 0, -6, 52, '#2b2740');
  },
  butterfly(c) {
    for (const s of [-1, 1]) { c.save(); c.scale(s, 1); c.beginPath(); c.moveTo(4, -6); c.bezierCurveTo(30, -90, 100, -80, 88, -20); c.bezierCurveTo(84, 4, 40, 6, 4, -2); FS(c, LG(c, 0, -80, 90, 0, '#ffb347', '#ff6a3d'), '#8f2f12', 4);
      c.beginPath(); c.moveTo(4, 2); c.bezierCurveTo(50, 8, 76, 30, 60, 62); c.bezierCurveTo(36, 78, 10, 40, 4, 6); FS(c, LG(c, 0, 0, 60, 70, '#ff6a3d', '#ffb347'), '#8f2f12', 4);
      c.fillStyle = '#fff'; c.beginPath(); c.arc(52, -38, 10, 0, 7); c.fill(); c.beginPath(); c.arc(38, 40, 7, 0, 7); c.fill(); c.restore(); }
    c.beginPath(); c.roundRect(-5, -22, 10, 70, 5); FS(c, '#3b2314'); c.strokeStyle = '#3b2314'; c.lineWidth = 3; c.beginPath(); c.moveTo(-3, -22); c.quadraticCurveTo(-14, -48, -26, -50); c.moveTo(3, -22); c.quadraticCurveTo(14, -48, 26, -50); c.stroke();
  },
  raincloud(c) {
    const cloud = () => { c.beginPath(); c.arc(-50, 10, 34, Math.PI * .5, Math.PI * 1.5); c.arc(-14, -26, 40, Math.PI, Math.PI * 1.95); c.arc(40, -6, 36, Math.PI * 1.3, Math.PI * .5); c.closePath(); };
    cloud(); FS(c, LG(c, 0, -60, 0, 46, '#cdd6e4', '#8794ab'), '#5f6b82', 5);
    c.strokeStyle = '#5cb8ff'; c.lineWidth = 6; c.lineCap = 'round'; for (const [x, y] of [[-50, 60], [-14, 70], [24, 58], [58, 72], [-30, 100], [8, 106], [44, 100]]) { c.beginPath(); c.moveTo(x, y); c.lineTo(x - 7, y + 20); c.stroke(); }
  },
  zzz(c) { TXT(c, 'Z', -40, 40, 56, '#bfe6ff', '#2f5f9a', 8); TXT(c, 'Z', 6, -6, 76, '#d8ecff', '#2f5f9a', 9); TXT(c, 'z', 60, -62, 44, '#bfe6ff', '#2f5f9a', 7); },
  // ---------- MEMES
  dealwithit(c) {
    const px = 14; c.fillStyle = '#111'; const rows = ['0000000000000000000', '0111111101111111000', '0111111101111111000', '0111111101111111000', '0111111101111111000', '0001111000011110000'];
    const map = ['1111111111111111111111', '1111111111111111111111', '1111111100011111111111', '0111111100001111111110', '0011111000000111111100', '0001110000000011111000'];
    for (let y = 0; y < 6; y++) for (let x = 0; x < 22; x++) if (map[y][x] === '1') c.fillRect(-154 + x * 14, -42 + y * 14, 14, 14);
    c.fillStyle = '#fff'; for (const [x, y] of [[1, 2], [2, 2], [1, 3], [12, 2], [13, 2], [12, 3]]) c.fillRect(-154 + x * 14 + 14, -42 + y * 14 - 14, 14, 14);
    c.fillStyle = '#2a2a2a'; for (let y = 0; y < 6; y++) for (let x = 0; x < 22; x++) if (map[y][x] === '1' && y === 5) c.fillRect(-154 + x * 14, -42 + y * 14 + 8, 14, 6);
  },
  gm(c) {
    c.beginPath(); c.roundRect(-96, -50, 192, 96, 44); c.moveTo(30, 44); c.lineTo(50, 86); c.lineTo(66, 44); FS(c, '#ffe27a', '#2b2740', 6);
    c.beginPath(); c.roundRect(-90, -44, 180, 84, 40); c.fillStyle = LG(c, 0, -44, 0, 40, '#fff3b0', '#ffd23f'); c.fill(); TXT(c, 'GM', 0, -2, 70, '#2b2740'); sparkle(c, 70, -34, 12, '#fff'); sparkle(c, -72, 22, 8, '#fff');
  },
  wagmi(c) {
    c.fillStyle = '#6b4a2a'; c.fillRect(-9, 40, 18, 90); c.strokeStyle = '#3b2814'; c.lineWidth = 4; c.strokeRect(-9, 40, 18, 90);
    c.beginPath(); c.roundRect(-110, -60, 220, 110, 14); FS(c, LG(c, 0, -60, 0, 50, '#e9c78d', '#c49a58'), '#6b4a2a', 8);
    c.strokeStyle = 'rgba(107,74,42,.3)'; c.lineWidth = 2; for (const y of [-30, 0, 28]) { c.beginPath(); c.moveTo(-104, y); c.lineTo(104, y); c.stroke(); }
    TXT(c, 'WAGMI', 0, -4, 48, '#d6245a', '#fff', 8); for (const [x, y] of [[-96, -46], [96, -46], [-96, 36], [96, 36]]) { c.beginPath(); c.arc(x, y, 4, 0, 7); c.fillStyle = '#6b4a2a'; c.fill(); }
  },
  diamond(c) {
    const P = [[-60, -30], [-30, -66], [30, -66], [60, -30], [0, 70]];
    c.beginPath(); P.forEach(([x, y], i) => c[i ? 'lineTo' : 'moveTo'](x, y)); c.closePath(); FS(c, LG(c, -60, -60, 60, 60, '#c8f4ff', '#27a8e8', '#6fd6ff'), '#146a9c', 5);
    c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-60, -30); c.lineTo(60, -30); c.moveTo(-30, -66); c.lineTo(-18, -30); c.lineTo(0, 70); c.moveTo(30, -66); c.lineTo(18, -30); c.lineTo(0, 70); c.moveTo(-18, -30); c.lineTo(-30, -66); c.stroke();
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(-18, -30); c.lineTo(18, -30); c.lineTo(0, 70); c.fill(); sparkle(c, 56, -56, 18, '#fff'); sparkle(c, -66, 20, 10, '#fff');
  },
  rocket(c) {
    c.beginPath(); c.moveTo(-20, 54); c.quadraticCurveTo(0, 150, 20, 54); FS(c, LG(c, 0, 54, 0, 140, '#fff3b0', '#ff6a1a', '#ffb02e'));
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 26, 10); c.lineTo(s * 62, 66); c.lineTo(s * 26, 56); c.closePath(); FS(c, '#e63946', '#8f1522', 4); }
    c.beginPath(); c.moveTo(0, -100); c.bezierCurveTo(50, -60, 40, 20, 28, 62); c.lineTo(-28, 62); c.bezierCurveTo(-40, 20, -50, -60, 0, -100); FS(c, LG(c, -30, 0, 30, 0, '#ffffff', '#c9d2e0', '#f4f7fb'), '#7d8aa3', 5);
    c.beginPath(); c.moveTo(0, -100); c.bezierCurveTo(24, -84, 34, -66, 36, -52); c.lineTo(-36, -52); c.bezierCurveTo(-34, -66, -24, -84, 0, -100); FS(c, '#e63946', '#8f1522', 4);
    c.beginPath(); c.arc(0, -14, 15, 0, 7); FS(c, LG(c, -10, -26, 10, 0, '#bfe6ff', '#2f7fc8'), '#4a5870', 5); gloss(c, -5, -20, 4, 6, .5);
  },
  pizza(c) {
    c.beginPath(); c.moveTo(-70, -50); c.quadraticCurveTo(0, -80, 70, -50); c.lineTo(0, 100); c.closePath(); FS(c, LG(c, 0, -60, 0, 90, '#ffd36a', '#f2a93a'), '#b36b12', 5);
    c.beginPath(); c.moveTo(-72, -52); c.quadraticCurveTo(0, -86, 72, -52); c.lineTo(66, -34); c.quadraticCurveTo(0, -68, -66, -34); c.closePath(); FS(c, '#e0a050', '#a56a28', 4);
    for (const [x, y, r] of [[-22, -14, 14], [24, -20, 13], [2, 26, 14], [-4, -42, 7], [0, 64, 8]]) { c.beginPath(); c.arc(x, y, r, 0, 7); FS(c, LG(c, x - r, y - r, x + r, y + r, '#e8453c', '#b01f1f'), '#7d1414', 2.5); gloss(c, x - r * .3, y - r * .35, r * .3, r * .2, 0); }
    c.fillStyle = '#6dbb4a'; for (const [x, y] of [[-34, 14], [30, 10], [-10, 46], [12, -4]]) { c.beginPath(); c.ellipse(x, y, 6, 3, .7, 0, 7); c.fill(); }
  },
  coin(c) {
    const g = c.createRadialGradient(-16, -16, 6, 0, 0, 66); g.addColorStop(0, '#fff6c8'); g.addColorStop(.6, '#ffd23f'); g.addColorStop(1, '#d9a400'); c.beginPath(); c.arc(0, 0, 62, 0, 7); FS(c, g, '#8f6a00', 6);
    c.beginPath(); c.arc(0, 0, 48, 0, 7); c.strokeStyle = '#b8860b'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#b8860b';
    c.beginPath(); c.ellipse(0, 12, 17, 14, 0, 0, 7); c.fill(); for (const [x, y] of [[-20, -8], [-8, -22], [8, -22], [20, -8]]) { c.beginPath(); c.ellipse(x, y, 7, 9, 0, 0, 7); c.fill(); } sparkle(c, 44, -44, 16, '#fff');
  },
  gatobanner(c) {
    c.beginPath(); c.moveTo(-130, -20); c.lineTo(-100, -20); c.lineTo(-100, 40); c.lineTo(-130, 40); c.lineTo(-114, 10); c.closePath(); FS(c, '#c22a55', '#7d1536', 4);
    c.beginPath(); c.moveTo(130, -20); c.lineTo(100, -20); c.lineTo(100, 40); c.lineTo(130, 40); c.lineTo(114, 10); c.closePath(); FS(c, '#c22a55', '#7d1536', 4);
    c.beginPath(); c.moveTo(-104, -40); c.quadraticCurveTo(0, -24, 104, -40); c.lineTo(104, 24); c.quadraticCurveTo(0, 8, -104, 24); c.closePath(); FS(c, LG(c, 0, -40, 0, 24, '#ff5f8f', '#e0245e'), '#7d1536', 5);
    TXT(c, 'GATO', 0, -8, 48, '#fff', '#7d1536', 7);
  },
  sushi(c) {
    c.beginPath(); c.roundRect(-66, 0, 132, 52, 26); FS(c, LG(c, 0, 0, 0, 52, '#fff', '#e8e4dc'), '#bdb7a8'); c.fillStyle = 'rgba(0,0,0,.08)'; for (const x of [-46, -22, 2, 26, 50]) c.fillRect(x, 8, 2, 36);
    c.beginPath(); c.moveTo(-76, 6); c.quadraticCurveTo(0, -60, 76, 6); c.quadraticCurveTo(70, 24, 0, 18); c.quadraticCurveTo(-70, 24, -76, 6); FS(c, LG(c, 0, -40, 0, 20, '#ff9f7a', '#f0623a'), '#a8381a', 4);
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 4; for (const x of [-40, -10, 22]) { c.beginPath(); c.moveTo(x, -18 + Math.abs(x) * .12); c.quadraticCurveTo(x + 10, -6, x + 4, 10); c.stroke(); } gloss(c, -36, -12, 18, 4, -.3);
  },
  hoverboard(c) {
    const g = c.createRadialGradient(0, 40, 4, 0, 44, 100); g.addColorStop(0, 'rgba(120,255,255,.8)'); g.addColorStop(1, 'rgba(120,255,255,0)'); c.fillStyle = g; c.beginPath(); c.ellipse(0, 44, 120, 34, 0, 0, 7); c.fill();
    c.beginPath(); c.moveTo(-120, -8); c.quadraticCurveTo(-130, -26, -108, -20); c.lineTo(108, -20); c.quadraticCurveTo(130, -26, 120, -8); c.quadraticCurveTo(110, 18, 80, 18); c.lineTo(-80, 18); c.quadraticCurveTo(-110, 18, -120, -8); FS(c, LG(c, 0, -22, 0, 20, '#ff7ad9', '#7a3ae0'), '#3d1a85', 5);
    c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(-90, -14, 170, 4); for (const x of [-62, 62]) { c.beginPath(); c.roundRect(x - 16, 18, 32, 12, 6); FS(c, '#55e6ff', '#1b8aa6', 3); }
  },
  popper(c) {
    c.fillStyle = '#ffd23f';
    const cols = ['#ff5f8f', '#3aa0ff', '#ffd23f', '#7bd88f', '#b48cff', '#ff9a3c'];
    for (let i = 0; i < 26; i++) { const a = -2.3 + (i % 13) / 13 * 1.9 + (i > 12 ? .06 : 0), d = 50 + (i * 53 % 90); c.save(); c.translate(-30 + Math.cos(a) * d, 30 + Math.sin(a) * d); c.rotate(i); c.fillStyle = cols[i % 6]; if (i % 3) c.fillRect(-6, -3, 12, 6); else { c.beginPath(); c.arc(0, 0, 4, 0, 7); c.fill(); } c.restore(); }
    c.strokeStyle = '#ff5f8f'; c.lineWidth = 4; c.beginPath(); c.moveTo(-10, 0); c.bezierCurveTo(20, -50, 40, -20, 70, -70); c.stroke();
    c.beginPath(); c.moveTo(-50, 30); c.lineTo(10, 12); c.lineTo(-4, 100); c.closePath(); FS(c, LG(c, -50, 20, 10, 100, '#ff5f8f', '#e0245e'), '#7d1536', 4);
    c.save(); c.clip(); c.strokeStyle = '#ffd23f'; c.lineWidth = 7; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-60, 30 + i * 22); c.lineTo(20, 8 + i * 22); c.stroke(); } c.restore();
    c.beginPath(); c.ellipse(-20, 20, 34, 12, -.3, 0, 7); FS(c, '#ffe27a', '#b8860b', 3);
  },
  aura(c) {
    const g = c.createRadialGradient(0, 0, 40, 0, 0, 200); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.45, 'rgba(255,230,120,.55)'); g.addColorStop(.7, 'rgba(255,120,200,.35)'); g.addColorStop(1, 'rgba(120,200,255,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, 200, 0, 7); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 4; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; c.beginPath(); c.moveTo(Math.cos(a) * 110, Math.sin(a) * 110); c.lineTo(Math.cos(a) * (150 + (i % 3) * 18), Math.sin(a) * (150 + (i % 3) * 18)); c.stroke(); }
  },
});
