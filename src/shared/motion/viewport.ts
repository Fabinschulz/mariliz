/** Elemento ainda abaixo da dobra: pode nascer escondido sem o usuário vê-lo sumir. */
export function isBelowFold(element: Element): boolean {
  return element.getBoundingClientRect().top > window.innerHeight;
}
