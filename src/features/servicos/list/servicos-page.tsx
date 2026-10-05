import { engagementModels } from '@/features/empresa';
import { ContactCta, PageHeader, Section, SectionHeader } from '@/shared/components/ui';
import { pageBreadcrumbs } from '@/shared/routing';
import { services } from '../domain';
import { ServiceGrid } from '../service-grid';
import styles from './servicos-page.module.scss';

const breadcrumbs = pageBreadcrumbs('services');

export function ServicosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Serviços"
        title="Engenharia de ponta a ponta para o seu produto digital."
        intro="Atuamos onde o seu sistema precisa: da interface ao modelo de IA, passando pela nuvem que sustenta tudo."
        breadcrumbs={breadcrumbs}
      />

      <Section labelledBy="services-list-title" tone="mist">
        <h2 id="services-list-title" className="visually-hidden">
          Frentes de atuação
        </h2>
        <ServiceGrid services={services} />
      </Section>

      <Section labelledBy="models-title">
        <SectionHeader
          id="models-title"
          eyebrow="Modelos de contratação"
          title="Escolha o formato que cabe no seu momento."
          intro="Todos incluem documentação, código na sua organização e transferência de conhecimento."
        />
        <ul role="list" className={styles.models}>
          {engagementModels.map((model) => (
            <li key={model.id} className={styles.model} data-reveal>
              <h3 className={styles.modelName}>{model.name}</h3>
              <p className={styles.modelDescription}>{model.description}</p>
              <p className={styles.bestFor}>
                <span className={styles.bestForLabel}>Indicado para</span>
                {model.bestFor}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCta
        title="Não sabe por onde começar?"
        description="Conte o problema e ajudamos a definir a frente e o formato certos antes de qualquer proposta."
      />
    </>
  );
}
