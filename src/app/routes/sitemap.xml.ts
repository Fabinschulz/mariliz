import { absoluteUrl } from '@/shared/config/site';
import { getSitemapRoutes } from '@/shared/routing';

import { getConcretePaths } from '../static-paths';

function toUrlEntry(path: string, changefreq: string, priority: number): string {
  return [
    '  <url>',
    `    <loc>${absoluteUrl(path)}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    '  </url>'
  ].join('\n');
}

export function buildSitemap(): string {
  const entries = getSitemapRoutes().flatMap((route) =>
    getConcretePaths(route).map((path) => toUrlEntry(path, route.sitemap!.changefreq, route.sitemap!.priority))
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>'
  ].join('\n');
}

export function loader() {
  return new Response(buildSitemap(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
