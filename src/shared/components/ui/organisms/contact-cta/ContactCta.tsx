import { Link } from 'react-router';

import { Section } from '../../molecules/section';
import { WhatsAppButton } from '../../molecules/whatsapp-button';
import { site } from '@/shared/config/site';
import { contactPathFor, pathTo } from '@/shared/routing';

import styles from './ContactCta.module.scss';

export interface ContactCtaProps {
  title?: string;
  description?: string;
  /** Mensagem pré-preenchida do WhatsApp (ex.: a de um serviço específico). */
  whatsappMessage?: string;
  /** Pré-seleciona o serviço no formulário, para quem prefere escrever com calma. */
  serviceSlug?: string;
}

/** Faixa de conversão no fim das páginas: WhatsApp direto ou formulário. */
export function ContactCta({
  title = 'Vamos conversar sobre o seu próximo sistema?',
  description = 'Conte o contexto e o desafio pelo WhatsApp. Marcamos uma conversa inicial, sem custo e sem compromisso.',
  whatsappMessage,
  serviceSlug
}: ContactCtaProps) {
  const formHref = serviceSlug ? contactPathFor(serviceSlug) : pathTo('contact');

  return (
    <Section tone="accent" labelledBy="contact-cta-title" spacing="compact" data-hides-float>
      <div className={styles.cta} data-reveal>
        <div className={styles.text}>
          <h2 id="contact-cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.actions}>
          <WhatsAppButton size="large" message={whatsappMessage} />
          <p className={styles.alternative}>
            {site.whatsapp.display} ·{' '}
            <Link to={formHref} prefetch="intent" className={styles.formLink}>
              prefiro escrever com calma
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
