/**
 * Fonte única de verdade das rotas.
 *
 * Consumido por: app/routes.ts (router), app/static-paths.ts (prerender e sitemap),
 * navegação do shell, SEO e índice de busca. É dado puro (sem JSX, estilos ou
 * imports de features) para poder ser avaliado no Node em build time e para que
 * `shared` não dependa de camadas superiores.
 *
 * Nova página = route module fino em `src/app/routes/` + uma entrada aqui.
 */

export type LayoutId = 'site';

export type RouteId = 'home' | 'services' | 'service' | 'about' | 'contact' | 'search' | 'privacy' | 'notFound';

export interface Seo {
  title: string;
  description: string;
}

export interface SitemapOptions {
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export interface RouteDefinition {
  id: RouteId;
  /** Nome curto da página: navegação, breadcrumbs e resultados de busca. */
  label: string;
  /** Padrão de URL do React Router. */
  path: string;
  /** Route module, relativo a `src/app/`. */
  file: string;
  layout: LayoutId;
  /** Metadata estática. Rotas dinâmicas resolvem a sua no próprio route module. */
  seo?: Seo;
  /** Inclusão no sitemap. Ausente = fora do sitemap e com `noindex`. */
  sitemap?: SitemapOptions;
  /** Incluída na navegação principal do header. */
  inNav?: boolean;
}

export const NOT_FOUND_PRERENDER_PATH = '/404';

export const routeManifest: readonly RouteDefinition[] = [
  {
    id: 'home',
    label: 'Início',
    path: '/',
    file: 'routes/home.tsx',
    layout: 'site',
    seo: {
      title: 'Mariliz | Engenharia de software, cloud e IA',
      description:
        'A Mariliz projeta, desenvolve e opera aplicações web, apps mobile, infraestrutura em nuvem e sistemas de IA para empresas que precisam de software confiável.'
    },
    sitemap: { priority: 1, changefreq: 'monthly' }
  },
  {
    id: 'services',
    label: 'Serviços',
    path: '/servicos',
    file: 'routes/servicos.tsx',
    layout: 'site',
    seo: {
      title: 'Serviços de desenvolvimento web, mobile, cloud e IA',
      description:
        'Conheça os serviços da Mariliz: aplicações web, aplicativos mobile, infraestrutura em nuvem e sistemas de inteligência artificial, e os modelos de contratação.'
    },
    sitemap: { priority: 0.9, changefreq: 'monthly' },
    inNav: true
  },
  {
    id: 'service',
    label: 'Serviço',
    path: '/servicos/:slug',
    file: 'routes/servico.tsx',
    layout: 'site',
    sitemap: { priority: 0.8, changefreq: 'monthly' }
  },
  {
    id: 'about',
    label: 'Sobre',
    path: '/sobre',
    file: 'routes/sobre.tsx',
    layout: 'site',
    seo: {
      title: 'Sobre a Mariliz',
      description:
        'Quem somos, no que acreditamos e como trabalhamos: princípios de engenharia que orientam cada projeto da Mariliz.'
    },
    sitemap: { priority: 0.6, changefreq: 'yearly' },
    inNav: true
  },
  {
    id: 'contact',
    label: 'Contato',
    path: '/contato',
    file: 'routes/contato.tsx',
    layout: 'site',
    seo: {
      title: 'Fale com a Mariliz pelo WhatsApp',
      description:
        'Conte o seu desafio em tecnologia direto no WhatsApp. Marcamos uma conversa inicial sem custo sobre o seu projeto web, mobile, cloud ou de IA.'
    },
    sitemap: { priority: 0.8, changefreq: 'yearly' },
    inNav: true
  },
  {
    id: 'search',
    label: 'Busca',
    path: '/busca',
    file: 'routes/busca.tsx',
    layout: 'site',
    seo: {
      title: 'Buscar no site',
      description: 'Encontre serviços, páginas e respostas no site da Mariliz.'
    }
  },
  {
    id: 'privacy',
    label: 'Privacidade',
    path: '/privacidade',
    file: 'routes/privacidade.tsx',
    layout: 'site',
    seo: {
      title: 'Política de privacidade',
      description:
        'Como a Mariliz trata dados pessoais neste site e no atendimento pelo WhatsApp, em conformidade com a LGPD.'
    },
    sitemap: { priority: 0.2, changefreq: 'yearly' }
  },
  {
    id: 'notFound',
    label: 'Página não encontrada',
    path: '*',
    file: 'routes/not-found.tsx',
    layout: 'site',
    seo: {
      title: 'Página não encontrada',
      description: 'O endereço acessado não existe ou foi movido.'
    }
  }
];

export type StaticRouteId = Exclude<RouteId, 'service' | 'notFound'>;

export function getRoute(id: RouteId): RouteDefinition {
  const route = routeManifest.find((entry) => entry.id === id);
  if (!route) throw new Error(`Rota não registrada no manifest: ${id}`);
  return route;
}

export function isDynamicRoute(route: RouteDefinition): boolean {
  return route.path.includes(':') || route.path.includes('*');
}

export function getSitemapRoutes(): RouteDefinition[] {
  return routeManifest.filter((route) => route.sitemap);
}

export function getNavRoutes(): RouteDefinition[] {
  return routeManifest.filter((route) => route.inNav);
}
