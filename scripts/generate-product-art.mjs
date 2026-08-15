import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "images");

/* ---------------------------------- helpers ---------------------------------- */

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function mix(a, b, t) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const c = [ar, ag, ab].map((v, i) => Math.round(v + ([br, bg, bb][i] - v) * t));
  return "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
}
const alpha = (hex, t) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${t})`;
};

/* ------------------------------ garment geometry ------------------------------
   Drawn in local coordinates centred on (0,0). The canvas is 800x1000 and the
   garment group is translated to (400, 500). ---------------------------------- */

const STROKE = "#2A2723";
const LINE_WIDTH = 5.5;

function puffSleeve(cx, cy, rx, ry, rot) {
  return `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"
      transform="rotate(${rot} ${cx} ${cy})" fill="var(--garment)" stroke="${STROKE}" stroke-width="${LINE_WIDTH}" stroke-linejoin="round"/>
    <path d="M ${cx - rx * 0.45} ${cy - ry * 0.5} Q ${cx} ${cy - ry * 0.85} ${cx + rx * 0.45} ${cy - ry * 0.5}"
      fill="none" stroke="${alpha(STROKE, 0.55)}" stroke-width="4" stroke-linecap="round"/>`;
}

function buttons(x, yTop, gap, n, r = 5.5) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const y = yTop + gap * i;
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="${mix(STROKE, "#ffffff", 0.9)}" stroke="${STROKE}" stroke-width="3"/>`;
  }
  return out;
}

const ART = {
  blouse: {
    paths: [
      { d: `M -120 -175 C -55 -193 55 -193 120 -175 C 133 -140 148 -40 150 60 C 152 160 150 200 146 225 C 120 252 -120 252 -146 225 C -150 200 -152 160 -150 60 C -148 -40 -133 -140 -120 -175 Z`, fill: "var(--garment)" },
      { d: `M -96 -222 C 0 -236 96 -222 96 -222 C 92 -190 0 -196 -96 -190 Z`, fill: mix("#ffffff", STROKE, 0.06) },
    ],
    strokes: [
      `M -112 -172 L 0 -85 L 112 -172`,
      `M 0 -85 L 0 170`,
      `M -112 -160 Q 0 -128 112 -160`,
    ],
    extra: puffSleeve(-188, -118, 70, 88, -14) + puffSleeve(188, -118, 70, 88, 14),
    buttons: buttons(0, -30, 62, 3),
    shadow: { cx: 0, cy: 268, rx: 178, ry: 17 },
  },

  dress: {
    paths: [
      { d: `M -105 -185 C -52 -202 52 -202 105 -185 C 116 -120 94 -40 76 -12 C 100 60 150 160 172 265 C 160 288 -160 288 -172 265 C -150 160 -100 60 -76 -12 C -94 -40 -116 -120 -105 -185 Z`, fill: "var(--garment)" },
    ],
    strokes: [
      `M -98 -182 L 0 -80 L 98 -182`,
      `M 0 -80 L 0 280`,
      `M 76 -12 Q 0 2 -76 -12`,
    ],
    extra: puffSleeve(-150, -142, 46, 42, -18) + puffSleeve(150, -142, 46, 42, 18),
    buttons: buttons(0, -35, 58, 2, 4.5),
    shadow: { cx: 0, cy: 300, rx: 210, ry: 18 },
  },

  trousers: {
    paths: [
      { d: `M -92 -195 C -96 -40 -118 90 -152 175 L -154 285 C -154 298 -122 298 -118 286 L -86 190 C -78 90 -52 10 -38 -55 C -50 -130 -62 -180 -92 -195 Z`, fill: "var(--garment)" },
      { d: `M 92 -195 C 96 -40 118 90 152 175 L 154 285 C 154 298 122 298 118 286 L 86 190 C 78 90 52 10 38 -55 C 50 -130 62 -180 92 -195 Z`, fill: "var(--garment)" },
      { d: `M -96 -222 C 0 -236 96 -222 96 -222 L 94 -198 C 0 -210 -94 -198 -94 -198 Z`, fill: mix("#ffffff", STROKE, 0.06) },
    ],
    strokes: [
      `M 0 -200 C 0 -160 -34 -105 -40 -58`,
      `M 0 -200 C 0 -160 34 -105 40 -58`,
      `M -104 -240 C 0 -256 104 -240 104 -240`,
      `M -120 110 L -104 105`,
      `M 120 110 L 104 105`,
    ],
    buttons: buttons(0, -208, 0, 0),
    shadow: { cx: 0, cy: 302, rx: 185, ry: 15 },
  },

  coat: {
    paths: [
      { d: `M -122 -180 C -56 -198 56 -198 122 -180 C 140 -120 150 -30 152 70 C 154 180 150 230 148 275 C 130 305 -130 305 -148 275 C -150 230 -154 180 -152 70 C -150 -30 -140 -120 -122 -180 Z`, fill: "var(--garment)" },
      { d: `M -122 -180 C -158 -128 -166 -30 -162 60 C -160 150 -148 196 -134 200 C -132 168 -134 60 -126 -20 C -118 -92 -110 -142 -122 -180 Z`, fill: "var(--garment)", opacity: 0.55 },
      { d: `M 122 -180 C 158 -128 166 -30 162 60 C 160 150 148 196 134 200 C 132 168 134 60 126 -20 C 118 -92 110 -142 122 -180 Z`, fill: "var(--garment)", opacity: 0.55 },
    ],
    strokes: [
      `M -110 -172 C 0 -190 110 -172 110 -172`,
      `M -108 -170 L -58 -122 L -30 -82`,
      `M 108 -170 L 58 -122 L 30 -82`,
      `M 0 -82 L 0 252`,
    ],
    extra: `<path d="M -140 -140 Q -150 -20 -146 120" fill="none" stroke="${alpha(STROKE, 0.5)}" stroke-width="4" stroke-linecap="round"/>
      <path d="M 140 -140 Q 150 -20 146 120" fill="none" stroke="${alpha(STROKE, 0.5)}" stroke-width="4" stroke-linecap="round"/>`,
    buttons: buttons(0, -40, 70, 4),
    shadow: { cx: 0, cy: 312, rx: 192, ry: 17 },
  },

  set: {
    paths: [
      { d: `M -125 -185 C -60 -202 60 -202 125 -185 C 138 -130 145 -30 148 55 C 146 82 60 88 -60 88 C -146 82 -148 55 -145 -30 C -138 -130 -115 -182 -125 -185 Z`, fill: "var(--garment)" },
      { d: `M -80 100 C -84 165 -100 215 -128 260 L -130 293 L -100 294 L -72 240 C -64 175 -42 135 -32 112 C -40 96 -62 96 -80 100 Z`, fill: "var(--garment)" },
      { d: `M 80 100 C 84 165 100 215 128 260 L 130 293 L 100 294 L 72 240 C 64 175 42 135 32 112 C 40 96 62 96 80 100 Z`, fill: "var(--garment)" },
      { d: `M -82 96 C 0 84 82 96 82 96 L 80 112 C 0 100 -80 112 -80 112 Z`, fill: mix("#ffffff", STROKE, 0.06) },
    ],
    strokes: [
      `M -115 -180 L 0 -92 L 115 -180`,
      `M 0 -92 L 0 74`,
      `M 0 106 L 0 40`,
    ],
    extra: puffSleeve(-196, -120, 64, 74, -16) + puffSleeve(196, -120, 64, 74, 16),
    buttons: buttons(0, -42, 55, 3),
    shadow: { cx: 0, cy: 306, rx: 185, ry: 16 },
  },
};

/* --------------------------------- palettes ---------------------------------- */

const PRODUCTS = [
  { slug: "sepide", name: "شومیز سپیده", art: "blouse", hex: "#B98A7D", collection: "spring", featured: true, isNew: true },
  { slug: "maah", name: "شومیز ماه", art: "blouse", hex: "#CBB9A8", collection: "summer", featured: false, isNew: false },
  { slug: "shida", name: "شومیز شیدا", art: "blouse", hex: "#8E94A6", collection: "autumn", featured: false, isNew: true },
  { slug: "taraneh", name: "شومیز ترانه", art: "blouse", hex: "#DDCDBD", collection: "spring", featured: false, isNew: true },
  { slug: "nasim", name: "پیراهن نسیم", art: "dress", hex: "#9AA18B", collection: "spring", featured: true, isNew: true },
  { slug: "ghazal", name: "پیراهن غزل", art: "dress", hex: "#A9B2B8", collection: "summer", featured: false, isNew: false },
  { slug: "delara", name: "پیراهن دلارا", art: "dress", hex: "#C9A79A", collection: "summer", featured: true, isNew: true },
  { slug: "raha", name: "شلوار رها", art: "trousers", hex: "#A79B8C", collection: "spring", featured: true, isNew: false },
  { slug: "aram", name: "شلوار آرام", art: "trousers", hex: "#A9A69E", collection: "summer", featured: false, isNew: false },
  { slug: "sara", name: "شلوار سارا", art: "trousers", hex: "#9B9A94", collection: "autumn", featured: false, isNew: false },
  { slug: "mehr", name: "کت مهر", art: "coat", hex: "#B3A896", collection: "autumn", featured: true, isNew: false },
  { slug: "pegah", name: "مانتو پگاه", art: "coat", hex: "#D5B8AC", collection: "autumn", featured: false, isNew: false },
  { slug: "ava", name: "کت آوا", art: "coat", hex: "#8B8577", collection: "autumn", featured: false, isNew: false },
  { slug: "tooba", name: "ست طوبا", art: "set", hex: "#B48A76", collection: "autumn", featured: true, isNew: false },
  { slug: "nora", name: "ست نورا", art: "set", hex: "#A9A68B", collection: "autumn", featured: false, isNew: true },
  { slug: "yalda", name: "ست یلدا", art: "set", hex: "#B79BA8", collection: "autumn", featured: false, isNew: false },
];

const COLLECTIONS = [
  { slug: "spring", name: "بهار", art: "blouse", hex: "#B98A7D" },
  { slug: "summer", name: "تابستان", art: "dress", hex: "#9AA18B" },
  { slug: "autumn", name: "پاییز", art: "coat", hex: "#B3A896" },
];

const CREAM = "#F8F6F2";

function buildGarm(hex, art, scale = 1, yOff = 0) {
  const ink = STROKE;
  return `
  <g transform="translate(400 ${500 + yOff}) scale(${scale})">
    <ellipse cx="${ART[art].shadow.cx}" cy="${ART[art].shadow.cy}" rx="${ART[art].shadow.rx}" ry="${ART[art].shadow.ry}" fill="${alpha("#1F1D1B", 0.1)}" filter="url(#blur)"/>
    ${ART[art].paths.map((p) => `<path d="${p.d}" fill="${p.fill}" ${p.opacity ? `opacity="${p.opacity}"` : ""} stroke="${ink}" stroke-width="${LINE_WIDTH}" stroke-linejoin="round"/>`).join("\n    ")}
    ${(ART[art].extra || "").replaceAll("var(--garment)", hex)}
    ${ART[art].strokes.map((s) => `<path d="${s}" fill="none" stroke="${alpha(ink, 0.6)}" stroke-width="4" stroke-linecap="round"/>`).join("\n    ")}
    ${ART[art].buttons || ""}
  </g>`;
}

function artSvg(hex, art, options = {}) {
  const { width = 800, height = 1000, scale = 1, yOff = 0, wordmark = true, crop = 40 } = options;
  const tint = mix(CREAM, hex, 0.16);
  const hint = mix(CREAM, hex, 0.34);
  const dk = mix(CREAM, hex, 0.55);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${tint}"/>
      <stop offset="1" stop-color="${CREAM}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.6">
      <stop offset="0" stop-color="${alpha("#ffffff", 0.55)}"/>
      <stop offset="1" stop-color="${alpha("#ffffff", 0)}"/>
    </radialGradient>
    <radialGradient id="crop" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.75" stop-color="${alpha(hint, 0.55)}"/>
      <stop offset="1" stop-color="${alpha(dk, 0.5)}"/>
    </radialGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  ${crop ? `<rect x="${crop}" y="${crop}" width="${width - crop * 2}" height="${height - crop * 2}" fill="none" stroke="${alpha(hint, 0.6)}" stroke-width="1"/>` : ""}
  ${buildGarm(hex, art, scale, yOff)}
  <rect width="100%" height="100%" filter="url(#grain)"/>
  ${wordmark ? `<text x="50%" y="${height - 34}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="9" fill="${alpha("#1F1D1B", 0.35)}">A U R A</text>` : ""}
</svg>`;
}

mkdirSync(join(OUT, "products"), { recursive: true });

for (const p of PRODUCTS) {
  const svg = artSvg(p.hex, p.art, {});
  writeFileSync(join(OUT, "products", `${p.slug}.svg`), svg);
}

/* hero — tall floating dress, wider canvas */
const heroDress = buildGarm("#C9A79A", "dress", 1.05, 60);
writeFileSync(
  join(OUT, "hero.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1180">
  <defs>
    <linearGradient id="hbg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mix(CREAM, "#C9A79A", 0.22)}"/>
      <stop offset="1" stop-color="${CREAM}"/>
    </linearGradient>
    <radialGradient id="hglow" cx="0.5" cy="0.4" r="0.65">
      <stop offset="0" stop-color="${alpha("#ffffff", 0.6)}"/>
      <stop offset="1" stop-color="${alpha("#ffffff", 0)}"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#hbg)"/>
  <rect width="100%" height="100%" fill="url(#hglow)"/>
  <circle cx="180" cy="240" r="7" fill="${alpha("#B98A7D", 0.55)}"/>
  <circle cx="720" cy="880" r="5" fill="${alpha("#9AA18B", 0.5)}"/>
  <circle cx="760" cy="220" r="3" fill="${alpha("#B3A896", 0.5)}"/>
  ${heroDress}
  <rect width="100%" height="100%" filter="url(#grain)"/>
</svg>`
);

/* about — soft draped fabric */
writeFileSync(
  join(OUT, "about.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100">
  <defs>
    <linearGradient id="abg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${mix(CREAM, "#9AA18B", 0.2)}"/>
      <stop offset="1" stop-color="${CREAM}"/>
    </linearGradient>
    <radialGradient id="aglow" cx="0.5" cy="0.45" r="0.7">
      <stop offset="0" stop-color="${alpha("#ffffff", 0.5)}"/>
      <stop offset="1" stop-color="${alpha("#ffffff", 0)}"/>
    </radialGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#abg)"/>
  <rect width="100%" height="100%" fill="url(#aglow)"/>
  <ellipse cx="450" cy="620" rx="300" ry="240" fill="${alpha("#1F1D1B", 0.07)}" filter="url(#blur)"/>
  <path d="M 180 380 C 280 300 420 300 470 380 C 520 460 610 470 720 420 C 770 610 700 760 500 800 C 300 840 130 720 180 540 Z" fill="${mix("#ffffff", "#9AA18B", 0.62)}" stroke="${alpha("#2A2723", 0.35)}" stroke-width="4"/>
  <path d="M 280 520 C 360 480 460 500 540 570" fill="none" stroke="${alpha("#2A2723", 0.45)}" stroke-width="4" stroke-linecap="round"/>
  <path d="M 300 640 C 380 600 480 610 560 680" fill="none" stroke="${alpha("#2A2723", 0.3)}" stroke-width="4" stroke-linecap="round"/>
  <path d="M 220 720 C 260 780 420 820 560 790" fill="none" stroke="${alpha("#2A2723", 0.25)}" stroke-width="4" stroke-linecap="round"/>
  <rect width="100%" height="100%" filter="url(#grain)"/>
</svg>`
);

/* collection covers */
for (const c of COLLECTIONS) {
  const svg = artSvg(c.hex, c.art, { scale: 1.08, wordmark: false, crop: 0 });
  writeFileSync(join(OUT, `collection-${c.slug}.svg`), svg);
}

console.log("Generated", PRODUCTS.length, "product svgs + hero, about, 3 collection covers");
