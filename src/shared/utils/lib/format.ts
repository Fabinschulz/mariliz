/** Posição de uma lista em dois dígitos: 0 → "01". */
export function formatOrdinal(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/** "1 resultado", "3 resultados". */
export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
