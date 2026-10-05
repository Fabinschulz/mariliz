import { generalFaq } from '@/features/empresa';
import { services } from '@/features/servicos';
import { FAQ_ANCHOR, isDynamicRoute, pathTo, routeManifest, servicePath } from '@/shared/routing';
import type { FaqItem } from '@/shared/types';

import type { SearchDocument } from '../core/types';

function pageDocuments(): SearchDocument[] {
  return routeManifest
    .filter((route) => route.sitemap && route.seo && !isDynamicRoute(route))
    .map((route) => ({
      id: `pagina:${route.id}`,
      type: 'pagina',
      title: route.label,
      description: route.seo!.description,
      url: route.path
    }));
}

function serviceDocuments(): SearchDocument[] {
  return services.map((service) => ({
    id: `servico:${service.slug}`,
    type: 'servico',
    title: service.name,
    description: service.summary,
    url: servicePath(service.slug),
    keywords: [...service.keywords, ...service.stack],
    body: [
      service.intro,
      ...service.problems.flatMap((problem) => [problem.title, problem.description]),
      ...service.deliverables
    ].join(' ')
  }));
}

function faqDocument(item: FaqItem, id: string, pagePath: string, keywords?: string[]): SearchDocument {
  return {
    id: `pergunta:${id}`,
    type: 'pergunta',
    title: item.question,
    description: item.answer,
    url: `${pagePath}#${FAQ_ANCHOR}`,
    keywords
  };
}

function faqDocuments(): SearchDocument[] {
  const general = generalFaq.map((item, index) => faqDocument(item, `geral-${index}`, pathTo('home')));
  const perService = services.flatMap((service) =>
    service.faq.map((item, index) =>
      faqDocument(item, `${service.slug}-${index}`, servicePath(service.slug), [service.name])
    )
  );

  return [...general, ...perService];
}

export function buildSearchIndex(): SearchDocument[] {
  return [...serviceDocuments(), ...pageDocuments(), ...faqDocuments()];
}
