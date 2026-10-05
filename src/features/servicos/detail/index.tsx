import { CheckCircleIcon } from '@synthra.io/ui-kit';

import {
  ContactCta,
  FaqList,
  PageHeader,
  Section,
  SectionHeader,
  TagList,
  WhatsAppButton
} from '@/shared/components/ui';
import { breadcrumbsFrom, crumb, FAQ_ANCHOR, servicePath, type Crumb } from '@/shared/routing';
import { breadcrumbSchema, buildMeta, serviceSchema } from '@/shared/seo';

import { serviceWhatsAppMessage, services, type Service } from '../domain';
import { ServiceGrid } from '../service-grid';
import styles from './servico-detail.module.scss';

export function serviceBreadcrumbs(service: Service): Crumb[] {
  return breadcrumbsFrom(crumb('services'), { name: service.name, path: servicePath(service.slug) });
}

export function serviceMeta(service: Service) {
  const path = servicePath(service.slug);
  return buildMeta({
    ...service.seo,
    path,
    structuredData: [
      serviceSchema({ name: service.name, description: service.seo.description, path }),
      breadcrumbSchema(serviceBreadcrumbs(service))
    ]
  });
}

export function ServicoDetailPage({ service }: { service: Service }) {
  const relatedServices = services.filter((other) => other.slug !== service.slug);
  const whatsappMessage = serviceWhatsAppMessage(service);

  return (
    <>
      <PageHeader
        eyebrow={service.name}
        title={service.headline}
        intro={service.intro}
        breadcrumbs={serviceBreadcrumbs(service)}
      >
        <div className={styles.headerActions}>
          <WhatsAppButton size="large" message={whatsappMessage}>
            Conversar sobre {service.shortName}
          </WhatsAppButton>
        </div>
      </PageHeader>

      <Section labelledBy="problems-title" tone="light">
        <SectionHeader id="problems-title" eyebrow="O que resolvemos" title="Situações em que podemos ajudar." />
        <ul role="list" className={styles.problems}>
          {service.problems.map((problem) => (
            <li key={problem.title} className={styles.problem} data-reveal>
              <h3 className={styles.problemTitle}>{problem.title}</h3>
              <p className={styles.problemDescription}>{problem.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="deliverables-title">
        <div className={styles.deliverablesLayout}>
          <div>
            <SectionHeader
              id="deliverables-title"
              eyebrow="O que entregamos"
              title="Resultado concreto, não só horas."
            />
            <ul role="list" className={styles.deliverables}>
              {service.deliverables.map((item) => (
                <li key={item} className={styles.deliverable} data-reveal>
                  <CheckCircleIcon aria-hidden fontSize="small" className={styles.check} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside aria-labelledby="stack-title" className={styles.stack} data-reveal>
            <h3 id="stack-title" className={styles.stackTitle}>
              Tecnologias frequentes
            </h3>
            <TagList items={service.stack} />
          </aside>
        </div>
      </Section>

      <Section labelledBy="service-faq-title" id={FAQ_ANCHOR} tone="mist">
        <SectionHeader id="service-faq-title" eyebrow="Perguntas frequentes" title="O que costumam nos perguntar." />
        <FaqList items={service.faq} />
      </Section>

      <Section labelledBy="related-title">
        <SectionHeader id="related-title" eyebrow="Outras frentes" title="Projetos raramente usam uma só." />
        <ServiceGrid services={relatedServices} />
      </Section>

      <ContactCta whatsappMessage={whatsappMessage} serviceSlug={service.slug} />
    </>
  );
}
