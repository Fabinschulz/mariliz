import { getRoute, type StaticRouteId } from './route-manifest';

/** URL de uma rota estática, sem duplicar strings de path pelo projeto. */
export function pathTo(id: StaticRouteId): string {
  return getRoute(id).path;
}

export function servicePath(slug: string): string {
  return getRoute('service').path.replace(':slug', encodeURIComponent(slug));
}

export function contactPathFor(serviceSlug: string): string {
  return `${pathTo('contact')}?servico=${encodeURIComponent(serviceSlug)}`;
}

export function searchPath(term: string): string {
  return `${pathTo('search')}?q=${encodeURIComponent(term)}`;
}

/** Âncora das seções de perguntas frequentes (home e páginas de serviço). */
export const FAQ_ANCHOR = 'perguntas';
