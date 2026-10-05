import { services } from '../features/servicos/domain/services';
import {
  isDynamicRoute,
  NOT_FOUND_PRERENDER_PATH,
  routeManifest,
  servicePath,
  type RouteDefinition,
  type RouteId
} from '../shared/routing';

const dynamicPaths: Partial<Record<RouteId, () => string[]>> = {
  service: () => services.map((service) => servicePath(service.slug))
};

export function getConcretePaths(route: RouteDefinition): string[] {
  const provider = dynamicPaths[route.id];
  if (provider) return provider();
  return isDynamicRoute(route) ? [] : [route.path];
}

export function getPrerenderPaths(): string[] {
  const pagePaths = routeManifest.flatMap(getConcretePaths);
  return [...pagePaths, NOT_FOUND_PRERENDER_PATH, '/sitemap.xml', '/robots.txt'];
}
