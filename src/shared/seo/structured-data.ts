import { absoluteUrl, site } from '../config/site';
import { pathTo, type Crumb } from '../routing';

const CONTEXT = 'https://schema.org';
const ORGANIZATION_ID = `${site.url}/#organization`;
const LOGO = { path: '/icons/icon-512.png', size: 512 };

/** "5511943685632" → "+55-11-94368-5632" (formato recomendado pelo schema.org). */
function toSchemaPhone(e164: string): string {
  return `+${e164.slice(0, 2)}-${e164.slice(2, 4)}-${e164.slice(4, -4)}-${e164.slice(-4)}`;
}

export function organizationSchema() {
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    alternateName: site.alternateNames,
    legalName: site.legalName,
    taxID: site.cnpj,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(LOGO.path),
      width: LOGO.size,
      height: LOGO.size
    },
    description: site.description,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: toSchemaPhone(site.whatsapp.number),
      contactType: 'sales',
      availableLanguage: 'pt-BR',
      areaServed: 'BR'
    },
    sameAs: [site.googleBusinessProfile, ...Object.values(site.social).map((profile) => profile.url)]
  };
}

export function websiteSchema() {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    inLanguage: site.language,
    publisher: { '@id': ORGANIZATION_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl(pathTo('search'))}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
}

export function serviceSchema({ name, description, path }: ServiceSchemaInput) {
  return {
    '@context': CONTEXT,
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    areaServed: { '@type': 'Country', name: 'Brasil' },
    provider: { '@id': ORGANIZATION_ID }
  };
}
