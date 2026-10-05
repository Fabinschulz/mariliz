// @vitest-environment node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { brandPalette } from './brand-palette';

const tokens = readFileSync(fileURLToPath(new URL('../../styles/_tokens.scss', import.meta.url)), 'utf8');

/** `teal400` → `--teal-400`; `black`/`white` são os extremos da escala neutra. */
function tokenName(key: string): string | null {
  if (key === 'black') return '--neutral-1000';
  if (key === 'white') return '--neutral-0';
  const match = /^(teal|neutral)(\d+)$/.exec(key);
  return match ? `--${match[1]}-${match[2]}` : null;
}

function tokenValue(name: string): string | undefined {
  return new RegExp(`${name}:\\s*(#[0-9a-f]{6})`, 'i').exec(tokens)?.[1]?.toLowerCase();
}

describe('brandPalette', () => {
  const primitives = Object.entries(brandPalette).flatMap(([key, value]) => {
    const name = tokenName(key);
    return name ? [[key, name, value] as const] : [];
  });

  it.each(primitives)('%s espelha %s de _tokens.scss', (_key, name, value) => {
    expect(tokenValue(name)).toBe(value);
  });
});
