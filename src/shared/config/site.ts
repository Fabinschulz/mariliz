import { getPublicEnv } from '../utils/lib/env';

export const site = {
  name: 'Mariliz',
  legalName: 'Mariliz Tecnologia',
  /** Outras formas como a marca é buscada (o domínio é marilize.com.br). */
  alternateNames: ['Marilize', 'Mariliz Tecnologia'],
  cnpj: '46.498.841/0001-71',
  url: getPublicEnv().VITE_SITE_URL,
  locale: 'pt_BR',
  language: 'pt-BR',
  tagline: 'Engenharia de software, cloud e IA',
  description:
    'A Mariliz projeta, desenvolve e opera aplicações web, apps mobile, infraestrutura em nuvem e sistemas de inteligência artificial para empresas que precisam de software confiável.',
  whatsapp: {
    number: '5511943685632',
    display: '(11) 94368-5632',
    defaultMessage: 'Olá! Vim pelo site da Mariliz e gostaria de conversar sobre um projeto.'
  },
  defaultOgImage: '/og/default.png',
  themeColor: '#050c0c',
  // Token público de verificação do Google Search Console (método de metatag).
  googleSiteVerification: 'oXT81t5n27FaSyp2DugtWBfq8i698kV7ol3-1radvrI',
  /** Perfil da Empresa no Google (URL estável pelo CID). */
  googleBusinessProfile: 'https://www.google.com/maps?cid=6340100272920904261',
  /** Redes sociais exibidas no rodapé. */
  social: {
    instagram: { label: 'Instagram', handle: '@mariliz.com.br', url: 'https://www.instagram.com/mariliz.com.br/' }
  }
} as const;

export function absoluteUrl(path: string): string {
  return path === '/' ? site.url : `${site.url}${path}`;
}
