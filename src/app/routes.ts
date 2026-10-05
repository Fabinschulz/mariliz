import { index, layout, route, type RouteConfig, type RouteConfigEntry } from '@react-router/dev/routes';

import { routeManifest, type LayoutId, type RouteDefinition } from '../shared/routing/route-manifest';

const layoutFiles: Record<LayoutId, string> = {
  site: 'layouts/site-layout.tsx'
};

function toRouteConfig(entry: RouteDefinition): RouteConfigEntry {
  return entry.path === '/' ? index(entry.file, { id: entry.id }) : route(entry.path, entry.file, { id: entry.id });
}

function buildPageRoutes(layoutId: LayoutId): RouteConfigEntry[] {
  return routeManifest.filter((entry) => entry.layout === layoutId).map(toRouteConfig);
}

const resourceRoutes: RouteConfigEntry[] = [
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
  route('robots.txt', 'routes/robots.txt.ts')
];

export default [
  ...resourceRoutes,
  ...(Object.keys(layoutFiles) as LayoutId[]).map((layoutId) =>
    layout(layoutFiles[layoutId], { id: `layout-${layoutId}` }, buildPageRoutes(layoutId))
  )
] satisfies RouteConfig;
