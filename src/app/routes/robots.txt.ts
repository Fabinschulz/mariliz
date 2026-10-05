import { absoluteUrl } from '@/shared/config/site';

export function buildRobots(): string {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''].join('\n');
}

export function loader() {
  return new Response(buildRobots(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
