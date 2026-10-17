// Accessory registry: id, label, category, slot (used by Randomize), default placement in cat-source coords, z layer.
const CATEGORIES = ['Hats', 'Eyes', 'Face', 'Neck', 'Outfit', 'Props', 'Extras', 'Memes'];
const Z = { Hats: 6, Eyes: 5, Face: 4, Neck: 3, Outfit: 2, Props: 7, Extras: 8, Memes: 8 };
const A = (id, name, cat, slot, x, y, s, r, back) => ({ id, name, cat, slot, x, y, s, r: r || 0, z: back ? 0 : Z[cat] });
const ACCS = [
  A('hat', 'Top hat', 'Hats', 'hat', 450, 92, 1), A('crown', 'Crown', 'Hats', 'hat', 450, 70, 1), A('party', 'Party hat', 'Hats', 'hat', 452, 50, .95),
  A('santa', 'Santa hat', 'Hats', 'hat', 448, 100, 1.4), A('wizard', 'Wizard hat', 'Hats', 'hat', 452, 30, 1.25), A('halo', 'Halo', 'Hats', 'hat', 450, 38, 1),
  A('flowers', 'Flower crown', 'Hats', 'hat', 450, 78, 1.7), A('headphones', 'Headphones', 'Hats', 'hat', 450, 125, 1.72), A('bandana', 'Bandana', 'Hats', 'hat', 450, 125, 1.8),
  A('beanie', 'Beanie', 'Hats', 'hat', 450, 112, 1.45), A('cowboy', 'Cowboy hat', 'Hats', 'hat', 450, 92, 1.5), A('chef', 'Chef hat', 'Hats', 'hat', 450, 84, 1.3),
  A('propeller', 'Propeller cap', 'Hats', 'hat', 450, 118, 1.4), A('cap', 'Ball cap', 'Hats', 'hat', 446, 112, 1.5), A('bunny', 'Bunny ears', 'Hats', 'hat', 450, 62, 1.15),
  A('sunglasses', 'Sunglasses', 'Eyes', 'eyes', 446, 225, 1), A('monocle', 'Monocle', 'Eyes', 'eyes', 515, 228, .78), A('eyepatch', 'Eyepatch', 'Eyes', 'eyes', 515, 226, .8),
  A('laser', 'Laser eyes', 'Eyes', 'eyes', 449, 225, 1.12), A('heartglasses', 'Heart specs', 'Eyes', 'eyes', 449, 226, 1), A('roundglasses', 'Round specs', 'Eyes', 'eyes', 449, 226, 1),
  A('goggles', 'Goggles', 'Eyes', 'eyes', 449, 226, 1), A('sparkleeyes', 'Sparkle eyes', 'Eyes', 'eyes', 449, 226, 1),
  A('mustache', 'Mustache', 'Face', 'face', 442, 318, .75), A('blush', 'Blush', 'Face', 'face', 450, 288, 1), A('blep', 'Blep', 'Face', 'face', 444, 322, .7),
  A('freckles', 'Freckles', 'Face', 'face', 450, 262, 1), A('plaster', 'Plaster', 'Face', 'face', 385, 272, 1.1),
  A('bowtie', 'Bow tie', 'Neck', 'neck', 452, 400, .8), A('scarf', 'Scarf', 'Neck', 'neck', 452, 425, 1.6), A('necktie', 'Necktie', 'Neck', 'neck', 452, 385, 1.2),
  A('bell', 'Bell collar', 'Neck', 'neck', 452, 368, 1.6), A('pearls', 'Pearls', 'Neck', 'neck', 452, 360, 1.55), A('chain', 'Gold chain', 'Neck', 'neck', 452, 360, 1.5),
  A('tee', 'T-shirt', 'Outfit', 'outfit', 450, 510, 1.7), A('sweater', 'Sweater', 'Outfit', 'outfit', 450, 510, 1.7), A('vest', 'Vest', 'Outfit', 'outfit', 450, 520, 1.5),
  A('overalls', 'Overalls', 'Outfit', 'outfit', 450, 520, 1.55), A('cape', 'Hero cape', 'Outfit', 'outfit', 450, 470, 1.8, 0, true),
  A('fish', 'Fish', 'Props', 'hand', 355, 575, 1.5, -25), A('icecream', 'Ice cream', 'Props', 'hand', 335, 520, 1.4, -8), A('coffee', 'Coffee', 'Props', 'hand', 335, 570, 1.25),
  A('balloon', 'Balloon', 'Props', 'hand', 335, 400, 1.8, -8), A('loveheart', 'Love heart', 'Props', 'hand', 335, 565, 1.3), A('gift', 'Gift box', 'Props', 'hand', 340, 590, 1.3),
  A('trophy', 'Trophy', 'Props', 'hand', 338, 545, 1.3), A('lollipop', 'Lollipop', 'Props', 'hand', 335, 515, 1.5, -10),
  A('wings', 'Angel wings', 'Extras', 'extra', 450, 430, 1.7, 0, true), A('sparkles', 'Sparkles', 'Extras', 'extra', 450, 230, 2.1), A('hearts', 'Floating hearts', 'Extras', 'extra', 450, 190, 2.1),
  A('meowbubble', 'Meow bubble', 'Extras', 'extra', 585, 110, 1.3), A('butterfly', 'Butterfly', 'Extras', 'extra', 590, 180, 1.2, 15), A('raincloud', 'Rain cloud', 'Extras', 'extra', 450, 70, 1.15),
  A('zzz', 'Sleepy zzz', 'Extras', 'extra', 590, 115, 1.3),
  A('dealwithit', 'Deal with it', 'Memes', 'eyes', 446, 222, 1), A('gm', 'GM bubble', 'Memes', 'extra', 585, 105, 1.3), A('wagmi', 'WAGMI sign', 'Memes', 'hand', 570, 520, 1.3, 6),
  A('diamond', 'Diamond hands', 'Memes', 'hand', 335, 560, 1.4), A('rocket', 'Rocket', 'Memes', 'hand', 585, 300, 1.6, 35), A('pizza', 'Pizza slice', 'Memes', 'hand', 335, 570, 1.6, -20),
  A('coin', 'Gold coin', 'Memes', 'hand', 335, 565, 1.1), A('gatobanner', 'Gato banner', 'Memes', 'extra', 450, 645, 1.5), A('sushi', 'Sushi', 'Memes', 'hand', 340, 580, 1.3),
  A('hoverboard', 'Hoverboard', 'Memes', 'extra', 450, 655, 1.5), A('popper', 'Party popper', 'Memes', 'hand', 330, 560, 1.6), A('aura', 'Glow aura', 'Memes', 'extra', 450, 380, 3.2, 0, true),
];
const AMAP = Object.fromEntries(ACCS.map(a => [a.id, a]));
