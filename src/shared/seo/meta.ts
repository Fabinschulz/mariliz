import type { MetaDescriptor } from 'react-router';

import { absoluteUrl, site } from '../config/site';
import { getRoute, isDynamicRoute, pageBreadcrumbs, type RouteId, type StaticRouteId } from '../routing';
import { breadcrumbSchema } from './structured-data';

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>[];
}

export function formatTitle(title: string): string {
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}

export function buildMeta({
  title,
  description,
  path,
  image = site.defaultOgImage,
  noindex = false,
  structuredData = []
}: PageMetaInput): MetaDescriptor[] {
  const fullTitle = formatTitle(title);
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const descriptors: MetaDescriptor[] = [
    { title: fullTitle },
    { name: 'description', content: description },
    {
      name: 'robots',
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: site.locale },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl }
  ];

  // Página não indexável não declara canonical nem og:url: evita sinal contraditório.
  if (!noindex) {
    descriptors.push({ tagName: 'link', rel: 'canonical', href: url }, { property: 'og:url', content: url });
  }

  if (structuredData.length > 0) {
    descriptors.push({ 'script:ld+json': structuredData });
  }

  return descriptors;
}

export function routeMeta(id: RouteId, overrides: Partial<PageMetaInput> = {}): MetaDescriptor[] {
  const route = getRoute(id);
  if (!route.seo) throw new Error(`Rota "${id}" não declara seo no manifest.`);

  const hasBreadcrumbs = route.sitemap && id !== 'home' && !isDynamicRoute(route);
  const breadcrumbs = hasBreadcrumbs ? [breadcrumbSchema(pageBreadcrumbs(id as StaticRouteId))] : [];

  return buildMeta({
    ...route.seo,
    path: route.path,
    noindex: !route.sitemap,
    ...overrides,
    structuredData: [...breadcrumbs, ...(overrides.structuredData ?? [])]
  });
}
