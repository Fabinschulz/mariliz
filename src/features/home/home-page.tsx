import { generalFaq, PrinciplesGrid, ProcessSteps } from '@/features/empresa';
import { services, ServiceTabs } from '@/features/servicos';
import { ContactCta, FaqList, Section, SectionHeader, SplitLayout } from '@/shared/components/ui';
import { FAQ_ANCHOR } from '@/shared/routing';

import { DeliveryLog } from './delivery-log';
import { Hero } from './hero';
import styles from './home-page.module.scss';
import { StackList } from './stack-list';

/** Ritmo da página: ink (autoridade) alternando com faixas claras em névoa e branco (respiro). */
export function HomePage() {
  return (
    <>
      <Hero />

      <Section labelledBy="services-title" tone="mist">
        <SectionHeader
          id="services-title"
          eyebrow="O que fazemos"
          title="Quatro frentes, uma engenharia."
          intro="Cada projeto combina as frentes de que o seu produto precisa, sempre com o mesmo padrão de qualidade, documentação e operação."
        />
        <ServiceTabs services={services} />
      </Section>

      <Section labelledBy="process-title">
        <SplitLayout
          stickyAside
          aside={
            <SectionHeader
              id="process-title"
              eyebrow="Como trabalhamos"
              title="Do problema certo ao sistema em produção."
              intro="Um método simples e previsível. Você sabe o que está sendo feito, por que, e o que vem a seguir."
            />
          }
        >
          <ProcessSteps />
        </SplitLayout>
      </Section>

      <Section labelledBy="principles-title" tone="light">
        <SectionHeader
          id="principles-title"
          eyebrow="O que você pode esperar"
          title="Princípios que não entram na negociação."
        />
        <PrinciplesGrid />
      </Section>

      <Section labelledBy="stack-title" tone="raised" spacing="compact">
        <div className={styles.stackIntro}>
          <SplitLayout
            aside={
              <SectionHeader
                id="stack-title"
                eyebrow="Tecnologias"
                title="Ferramentas escolhidas pelo problema, não pela moda."
                intro="Qualquer que seja a stack, toda mudança segue o mesmo caminho até a produção: verificada, revisada e observada."
              />
            }
          >
            <DeliveryLog />
          </SplitLayout>
        </div>
        <StackList services={services} />
      </Section>

      <Section labelledBy="faq-title" id={FAQ_ANCHOR} tone="mist">
        <SplitLayout
          aside={<SectionHeader id="faq-title" eyebrow="Perguntas frequentes" title="Antes de conversarmos." />}
        >
          <FaqList items={generalFaq} />
        </SplitLayout>
      </Section>

      <ContactCta />
    </>
  );
}
