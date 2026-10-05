import { Link, useSearchParams } from 'react-router';

import { PageHeader, Section, WhatsAppButton } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { useHydrated } from '@/shared/hooks';
import { pageBreadcrumbs, pathTo } from '@/shared/routing';
import { formatOrdinal } from '@/shared/utils';

import styles from './contato-page.module.scss';
import { ContactForm } from './form';

const breadcrumbs = pageBreadcrumbs('contact');

const nextSteps = [
  { title: 'Você chama no WhatsApp', description: 'Direto pelo botão ou com a mensagem montada pelo formulário.' },
  { title: 'Conversa de 30 minutos', description: 'Entendemos o problema, sem custo e sem compromisso.' },
  {
    title: 'Proposta clara',
    description: 'Escopo, formato e investimento. Ou uma indicação honesta, se não formos o melhor caminho.'
  }
];

export function ContatoPage() {
  const [searchParams] = useSearchParams();
  const hydrated = useHydrated();

  const initialService = hydrated ? (searchParams.get('servico') ?? '') : '';

  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Conte o seu desafio no WhatsApp."
        intro="Seja um sistema novo, uma migração para a nuvem ou um piloto de IA, a conversa começa pelo problema."
        breadcrumbs={breadcrumbs}
      >
        <div className={styles.headerActions}>
          <WhatsAppButton size="large">Chamar no WhatsApp</WhatsAppButton>
          <span className={styles.phone}>{site.whatsapp.display}</span>
        </div>
      </PageHeader>

      <Section tone="mist" labelledBy="form-title">
        <div className={styles.layout}>
          <div className={styles.formColumn}>
            <h2 id="form-title" className={styles.columnTitle}>
              Prefere escrever com calma?
            </h2>
            <p className={styles.columnIntro}>
              Preencha abaixo e abrimos o WhatsApp com a mensagem pronta. Nada é enviado antes de você confirmar lá.
            </p>

            <div className={styles.frame}>
              <div className={styles.card}>
                <p className={styles.context}>
                  Este contato chega ao nosso time pelo WhatsApp{' '}
                  <span className={styles.contextAccent}>{site.whatsapp.display}</span> ·{' '}
                  <Link to={pathTo('privacy')} prefetch="intent" className={styles.contextLink}>
                    Política de Privacidade
                  </Link>
                </p>
                <ContactForm key={initialService || 'default'} initialService={initialService} />
              </div>
            </div>
          </div>

          <aside aria-labelledby="next-steps-title" className={styles.aside}>
            <h2 id="next-steps-title" className={styles.columnTitle}>
              O que acontece depois
            </h2>
            <ol role="list" className={styles.steps}>
              {nextSteps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepIndex} aria-hidden="true">
                    {formatOrdinal(index)}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Section>
    </>
  );
}
