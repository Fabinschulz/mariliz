// prettier-ignore
const STOPWORDS = new Set([
  'a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'para', 'por', 'com', 'que', 'se', 'ao', 'aos', 'ou', 'como',
]);

const DIACRITICS = /\p{Diacritic}/gu;
const NON_WORD = /[^\p{Letter}\p{Number}]+/gu;

/** "Aplicação  Móvel!" -> "aplicacao movel" */
export function normalizeText(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS, '').toLowerCase().replace(NON_WORD, ' ').trim();
}

/** Termos significativos da consulta, sem stopwords e sem repetição. */
export function tokenize(value: string): string[] {
  const tokens = normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 0 && !STOPWORDS.has(token));
  return [...new Set(tokens)];
}
