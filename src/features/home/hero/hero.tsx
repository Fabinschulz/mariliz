import { services } from '@/features/servicos';
import { Container, NeuralNetwork, PillLink, WhatsAppIcon } from '@/shared/components/ui';
import { pathTo } from '@/shared/routing';
import { whatsappUrl } from '@/shared/utils';

import styles from './hero.module.scss';

interface Commitment {
  value: string;
  /** Parte do valor destacada em turquesa (ex.: "%"). */
  accent?: string;
  label: string;
}

/**
 * Compromissos verificáveis no lugar de métricas: sem números de clientes ou
 * projetos inventados. A quantidade de frentes vem do próprio conteúdo.
 */
const commitments: Commitment[] = [
  { value: String(services.length), label: 'Frentes integradas' },
  { value: '100', accent: '%', label: 'Do código na sua organização' },
  { value: 'Dia 1', label: 'Observabilidade em produção' },
  { value: 'WCAG', accent: ' AA', label: 'Acessibilidade como critério' }
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className={styles.hero} data-surface="dark">
      <NeuralNetwork />

      <Container className={styles.content}>
        <p className={styles.badge}>Engenharia de software · Cloud · IA</p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>Software sob medida.</span>
          <span className={styles.line}>
            Feito para <span className={styles.accent}>escalar</span>.
          </span>
        </h1>

        <p className={styles.lede}>
          A Mariliz projeta, desenvolve e opera aplicações web, apps mobile, infraestrutura em nuvem e sistemas de IA,
          com arquitetura documentada, código que é seu e um time que continua com você depois do lançamento.
        </p>

        <div className={styles.footer}>
          <dl className={styles.highlights}>
            {commitments.map((item) => (
              <div key={item.label} className={styles.highlight}>
                <dt className={styles.highlightLabel}>{item.label}</dt>
                <dd className={styles.highlightValue}>
                  {item.value}
                  {item.accent && <span className={styles.accent}>{item.accent}</span>}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.actions}>
            <PillLink href={whatsappUrl()} external icon={<WhatsAppIcon />} size="large">
              Fale com a Mariliz
            </PillLink>
            <PillLink href={pathTo('services')} tone="outline" size="large">
              Ver os serviços
            </PillLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
