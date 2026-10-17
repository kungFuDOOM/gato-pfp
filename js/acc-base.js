function star(c, x, y, R, r) { c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; c[i ? 'lineTo' : 'moveTo'](x + Math.cos(a) * rr, y + Math.sin(a) * rr); } c.closePath(); c.fill(); }
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

  party(c) {
    c.fillStyle = '#ff5fa2'; c.strokeStyle = '#b8336f'; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(0, -85); c.lineTo(52, 50); c.lineTo(-52, 50); c.closePath(); c.fill(); c.stroke();
    c.save(); c.clip(); c.strokeStyle = '#ffe27a'; c.lineWidth = 12;
    for (let i = -3; i < 4; i++) { c.beginPath(); c.moveTo(-70, i * 28 + 30); c.lineTo(70, i * 28 - 20); c.stroke(); } c.restore();
    c.fillStyle = '#6ab7ff'; c.beginPath(); c.arc(0, -88, 15, 0, 7); c.fill();
    c.fillStyle = '#6ab7ff'; c.beginPath(); c.roundRect(-55, 42, 110, 14, 7); c.fill();
  },
  santa(c) {
    c.fillStyle = '#d62839'; c.strokeStyle = '#8f1522'; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-80, 40); c.quadraticCurveTo(-70, -70, 20, -75); c.quadraticCurveTo(70, -70, 85, -10); c.lineTo(95, 40); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; c.strokeStyle = '#d9d9d9';
    c.beginPath(); c.roundRect(-92, 22, 200, 38, 19); c.fill(); c.stroke();
    c.beginPath(); c.arc(92, -4, 18, 0, 7); c.fill(); c.stroke();
  },
  wizard(c) {
    c.fillStyle = '#4b3a9c'; c.strokeStyle = '#2a1f66'; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.ellipse(0, 55, 100, 17, 0, 0, 7); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-58, 50); c.quadraticCurveTo(-30, -20, 10, -95); c.quadraticCurveTo(30, -40, 58, 50); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ffd23f'; c.fillRect(-52, 22, 104, 14);
    star(c, -8, -20, 14, 6); star(c, 18, 2, 9, 4);
  },
  halo(c) {
    c.strokeStyle = '#ffd23f'; c.lineWidth = 14; c.shadowColor = '#fff3b0'; c.shadowBlur = 20;
    c.beginPath(); c.ellipse(0, 0, 80, 22, 0, 0, 7); c.stroke();
    c.lineWidth = 4; c.strokeStyle = '#fff3b0'; c.beginPath(); c.ellipse(0, -4, 78, 18, 0, Math.PI * 1.1, Math.PI * 1.7); c.stroke();
  },
  flowers(c) {
    c.strokeStyle = '#3f9b4f'; c.lineWidth = 10; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-98, 25); c.quadraticCurveTo(0, -40, 98, 25); c.stroke();
    const f = (x, y, col, r) => { c.fillStyle = col; for (let i = 0; i < 5; i++) { const a = i * 1.2566; c.beginPath(); c.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, r * .8, 0, 7); c.fill(); } c.fillStyle = '#ffe27a'; c.beginPath(); c.arc(x, y, r * .7, 0, 7); c.fill(); };
    f(-80, 12, '#ff7aa8', 13); f(-42, -8, '#ffffff', 12); f(0, -14, '#b48cff', 15); f(42, -8, '#ff9a5a', 12); f(80, 12, '#ff7aa8', 13);
    c.fillStyle = '#3f9b4f'; for (const x of [-60, -20, 22, 62]) { c.beginPath(); c.ellipse(x, 0, 9, 5, .5, 0, 7); c.fill(); }
  },
  headphones(c) {
    c.strokeStyle = '#2b2b36'; c.lineWidth = 14; c.lineCap = 'round';
    c.beginPath(); c.arc(0, 20, 88, Math.PI * 1.03, Math.PI * 1.97); c.stroke();
    for (const s of [-1, 1]) {
      c.fillStyle = '#2b2b36'; c.beginPath(); c.roundRect(s * 92 - 20, -2, 40, 70, 16); c.fill();
      c.fillStyle = '#ff5f5f'; c.beginPath(); c.roundRect(s * 92 - 12 + s * 4, 8, 22, 50, 10); c.fill();
    }
  },
  bandana(c) {
    c.fillStyle = '#e63946'; c.strokeStyle = '#9d1f2b'; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.moveTo(-100, -20); c.quadraticCurveTo(0, -45, 100, -20); c.lineTo(96, 8); c.quadraticCurveTo(0, 55, -96, 8); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fff'; for (let i = -3; i <= 3; i++) { c.beginPath(); c.arc(i * 28, 4 + 8 * (1 - Math.abs(i) / 3), 5, 0, 7); c.fill(); }
    c.fillStyle = '#e63946'; c.beginPath(); c.moveTo(96, 0); c.lineTo(130, -18); c.lineTo(122, 12); c.lineTo(138, 34); c.lineTo(100, 22); c.closePath(); c.fill(); c.stroke();
  },
  monocle(c) {
    c.strokeStyle = '#d4a017'; c.lineWidth = 9; c.fillStyle = 'rgba(180,220,255,.25)';
    c.beginPath(); c.arc(0, 0, 50, 0, 7); c.fill(); c.stroke();
    c.lineWidth = 3; c.strokeStyle = '#d4a017'; c.beginPath(); c.moveTo(30, 44); c.quadraticCurveTo(46, 100, 20, 150); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 5; c.beginPath(); c.arc(0, 0, 36, Math.PI * 1.1, Math.PI * 1.5); c.stroke();
  },
  eyepatch(c) {
    c.strokeStyle = '#111'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-50, -34); c.lineTo(-110, -78); c.moveTo(48, 30); c.lineTo(110, 70); c.stroke();
    c.fillStyle = '#15151c'; c.beginPath(); c.ellipse(0, 0, 54, 46, -.2, 0, 7); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.2)'; c.lineWidth = 4; c.beginPath(); c.ellipse(0, 0, 44, 36, -.2, Math.PI * 1.1, Math.PI * 1.6); c.stroke();
  },
  laser(c) {
    for (const x of [-66, 66]) {
      const g = c.createRadialGradient(x, 0, 2, x, 0, 34); g.addColorStop(0, '#fff'); g.addColorStop(.35, '#ff6b6b'); g.addColorStop(1, 'rgba(255,0,0,0)');
      c.fillStyle = g; c.beginPath(); c.arc(x, 0, 34, 0, 7); c.fill();
      c.fillStyle = 'rgba(255,40,40,.85)'; c.beginPath(); c.moveTo(x, -9); c.lineTo(x + Math.sign(x) * 400, -26); c.lineTo(x + Math.sign(x) * 400, 26); c.lineTo(x, 9); c.closePath(); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x, -4); c.lineTo(x + Math.sign(x) * 400, -8); c.lineTo(x + Math.sign(x) * 400, 8); c.lineTo(x, 4); c.closePath(); c.fill();
    }
  },
  mustache(c) {
    c.fillStyle = '#3b2314'; c.strokeStyle = '#1f110a'; c.lineWidth = 4; c.lineJoin = 'round';
    for (const s of [-1, 1]) {
      c.beginPath(); c.moveTo(0, -14); c.quadraticCurveTo(s * 40, -40, s * 82, -6); c.quadraticCurveTo(s * 112, 6, s * 100, -30);
      c.quadraticCurveTo(s * 116, 22, s * 70, 20); c.quadraticCurveTo(s * 30, 22, 0, 12); c.closePath(); c.fill(); c.stroke();
    }
  },
  scarf(c) {
    c.fillStyle = '#2a9d8f'; c.strokeStyle = '#17665c'; c.lineWidth = 5; c.lineJoin = 'round';
    c.beginPath(); c.roundRect(-100, -30, 200, 52, 26); c.fill(); c.stroke();
    c.fillStyle = '#e9c46a'; for (const x of [-60, -20, 20, 60]) c.fillRect(x - 6, -28, 12, 48);
    c.fillStyle = '#2a9d8f'; c.beginPath(); c.roundRect(34, 6, 44, 100, 10); c.fill(); c.stroke();
    c.fillStyle = '#e9c46a'; c.fillRect(35, 58, 42, 12);
  },
};
