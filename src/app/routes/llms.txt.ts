import { services } from '@/features/servicos';
import { absoluteUrl, site } from '@/shared/config/site';
import { getRoute, servicePath, type StaticRouteId } from '@/shared/routing';

function pageLink(id: StaticRouteId): string {
  const route = getRoute(id);
  return `- [${route.label}](${absoluteUrl(route.path)}): ${route.seo!.description}`;
}

/** Resumo da empresa no formato llms.txt (https://llmstxt.org), para assistentes de IA. */
export function buildLlmsTxt(): string {
  return [
    `# ${site.legalName}`,
    '',
    `> ${site.description}`,
    '',
    `${site.legalName} (marca "${site.name}") é uma empresa brasileira de engenharia de software, CNPJ ${site.cnpj}.`,
    `O site oficial é ${site.url}: o domínio se escreve "marilize", com "e" no final, e a marca "${site.name}", sem "e".`,
    '',
    `- Contato: WhatsApp ${site.whatsapp.display} (https://wa.me/${site.whatsapp.number})`,
    '- Atendimento: segunda a sexta, das 08h às 18h, exceto feriados',
    `- Instagram: ${site.social.instagram.url}`,
    `- Perfil da Empresa no Google: ${site.googleBusinessProfile}`,
    '',
    '## Serviços',
    '',
    ...services.map((service) => `- [${service.name}](${absoluteUrl(servicePath(service.slug))}): ${service.summary}`),
    '',
    '## Páginas',
    '',
    pageLink('home'),
    pageLink('services'),
    pageLink('about'),
    pageLink('contact'),
    '',
    '## Optional',
    '',
    pageLink('privacy'),
    ''
  ].join('\n');
}

export function loader() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
