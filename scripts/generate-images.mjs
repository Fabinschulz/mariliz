// Gera favicon, ícones e a imagem Open Graph a partir de SVGs (fonte única da marca).
// Uso: npm run assets:og - os arquivos gerados em public/ são versionados.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Resvg } from '@resvg/resvg-js';

const PUBLIC_DIR = join(import.meta.dirname, '..', 'public');
const TEAL = '#33c1ba';
const INK = '#050c0c';
const WHITE = '#f1f7f6';

// Mesmos traços de src/shared/components/Logo/Logo.tsx.
const WORDMARK_LETTERS =
  'M2 28V13.25a5.25 5.25 0 0 1 10.5 0V28M12.5 13.25a5.25 5.25 0 0 1 10.5 0V28M52 8v20M61 28V16.5A8.5 8.5 0 0 1 69.5 8h.5M78 13v15M87 0v28M96 13v15M104 8h14l-14 20h14';
const M_LETTER = 'M2 28V13.25a5.25 5.25 0 0 1 10.5 0V28M12.5 13.25a5.25 5.25 0 0 1 10.5 0V28';

function wordmark({ x, y, scale, color }) {
  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="${WORDMARK_LETTERS}" fill="none" stroke="${color}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="42" cy="18" r="10" fill="none" stroke="${color}" stroke-width="4.5"/>
    <circle cx="78" cy="3.6" r="2.9" fill="${TEAL}"/>
    <circle cx="96" cy="3.6" r="2.9" fill="${TEAL}"/>
  </g>`;
}

/** Marca quadrada: "m" monoline + nó teal, sobre fundo ink. */
function markSvg(size, { padding = 0 } = {}) {
  const inner = 32 - padding * 2;
  const scale = inner / 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${padding ? 0 : 7}" fill="${INK}"/>
  <g transform="translate(${padding} ${padding}) scale(${scale})">
    <g transform="translate(3.2 1.4) scale(0.86)">
      <path d="${M_LETTER}" fill="none" stroke="${WHITE}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <circle cx="26.4" cy="6.2" r="2.5" fill="${TEAL}"/>
  </g>
</svg>`;
}

function ogSvg() {
  const gridLines = [];
  for (let x = 0; x <= 1200; x += 48) gridLines.push(`<path d="M${x} 0V630"/>`);
  for (let y = 0; y <= 630; y += 48) gridLines.push(`<path d="M0 ${y}H1200"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  <g stroke="${WHITE}" stroke-opacity="0.06" stroke-width="1">${gridLines.join('')}</g>
  ${wordmark({ x: 88, y: 92, scale: 2.4, color: WHITE })}
  <text x="88" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="600" fill="${WHITE}" letter-spacing="-2">Software sob medida,</text>
  <text x="88" y="408" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="600" fill="${WHITE}" letter-spacing="-2">do primeiro commit <tspan fill="${TEAL}">à escala.</tspan></text>
  <rect x="88" y="490" width="10" height="10" fill="${TEAL}"/>
  <text x="112" y="500" font-family="Consolas, monospace" font-size="24" fill="${WHITE}" fill-opacity="0.72" letter-spacing="2">WEB · MOBILE · CLOUD · IA</text>
</svg>`;
}

function renderPng(svg, width) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Arial' }
  })
    .render()
    .asPng();
}

/** ICO com um único PNG embutido (formato suportado por todos os navegadores atuais). */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: ícone
  header.writeUInt16LE(1, 4); // quantidade de imagens
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt16LE(1, 10); // planos de cor
  header.writeUInt16LE(32, 12); // bits por pixel
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18); // offset dos dados
  return Buffer.concat([header, png]);
}

async function main() {
  await mkdir(join(PUBLIC_DIR, 'icons'), { recursive: true });
  await mkdir(join(PUBLIC_DIR, 'og'), { recursive: true });

  const outputs = [
    ['favicon.svg', markSvg(32)],
    ['favicon.ico', pngToIco(renderPng(markSvg(32), 32), 32)],
    ['icons/apple-touch-icon.png', renderPng(markSvg(180, { padding: 3 }), 180)],
    ['icons/icon-192.png', renderPng(markSvg(192), 192)],
    ['icons/icon-512.png', renderPng(markSvg(512), 512)],
    ['icons/icon-maskable-512.png', renderPng(markSvg(512, { padding: 5 }), 512)],
    ['og/default.png', renderPng(ogSvg(), 1200)]
  ];

  await Promise.all(outputs.map(([file, content]) => writeFile(join(PUBLIC_DIR, file), content)));
  console.log(`Gerados ${outputs.length} arquivos em public/`);
}

await main();
