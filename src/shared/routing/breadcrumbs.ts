import { getRoute, type StaticRouteId } from './route-manifest';

export interface Crumb {
  name: string;
  path: string;
}

/** Item de trilha de uma rota estática, com nome e path vindos do manifest. */
export function crumb(id: StaticRouteId): Crumb {
  const { label, path } = getRoute(id);
  return { name: label, path };
}

/**
 * Trilha a partir da home. A mesma lista alimenta o componente visual e o
 * JSON-LD BreadcrumbList: uma fonte, dois consumidores.
 */
export function breadcrumbsFrom(...items: Crumb[]): Crumb[] {
  return [crumb('home'), ...items];
}

/** Trilha padrão de uma página estática de primeiro nível: Início › Página. */
export function pageBreadcrumbs(id: StaticRouteId): Crumb[] {
  return breadcrumbsFrom(crumb(id));
}
