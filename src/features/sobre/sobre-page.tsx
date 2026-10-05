import { PrinciplesGrid, ProcessSteps } from '@/features/empresa';
import { ContactCta, Container, PageHeader, Section, SectionHeader, SplitLayout } from '@/shared/components/ui';
import { pageBreadcrumbs } from '@/shared/routing';

import styles from './sobre-page.module.scss';

const breadcrumbs = pageBreadcrumbs('about');

const beliefs = [
  'Tecnologia boa é a que o negócio consegue sustentar depois que o projeto termina.',
  'Clareza vale mais que jargão: toda decisão técnica precisa caber numa explicação simples.',
  'Medir é parte de construir. O que não é observado em produção não está pronto.'
];

export function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre a Mariliz"
        title="Construímos software como quem vai ter que mantê-lo."
        intro="A Mariliz nasceu para ser o time de engenharia que empresas gostariam de ter: técnico o bastante para resolver problemas difíceis, próximo o bastante para entender o negócio."
        breadcrumbs={breadcrumbs}
      />

      <Section labelledBy="mission-title" tone="light">
        <Container size="narrow" className={styles.mission}>
          <h2 id="mission-title" className={styles.missionTitle} data-reveal>
            Nossa missão é transformar desafios de negócio em sistemas confiáveis, simples de evoluir e fáceis de
            operar.
          </h2>
          <ul role="list" className={styles.beliefs}>
            {beliefs.map((belief) => (
              <li key={belief} className={styles.belief} data-reveal>
                {belief}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section labelledBy="about-principles-title">
        <SectionHeader id="about-principles-title" eyebrow="Princípios" title="Como tomamos decisões." />
        <PrinciplesGrid />
      </Section>

      <Section labelledBy="about-process-title" tone="light">
        <SplitLayout
          stickyAside
          aside={
            <SectionHeader
              id="about-process-title"
              eyebrow="Método"
              title="Quatro etapas, nenhuma surpresa."
              intro="O mesmo método vale para um diagnóstico de duas semanas ou para um produto que evoluímos por anos."
            />
          }
        >
          <ProcessSteps />
        </SplitLayout>
      </Section>

      <ContactCta />
    </>
  );
}
