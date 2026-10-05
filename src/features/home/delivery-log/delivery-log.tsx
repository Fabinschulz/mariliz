import { isBelowFold, useGsap } from '@/shared/motion';
import { useRef } from 'react';
import styles from './delivery-log.module.scss';

interface LogStep {
  label: string;
  status: string;
}

/** O método, não uma métrica: sem durações nem contagens inventadas. */
const STEPS: readonly LogStep[] = [
  { label: 'lint e typecheck', status: 'ok' },
  { label: 'testes automatizados', status: 'ok' },
  { label: 'revisão de código', status: 'ok' },
  { label: 'build e imagem', status: 'ok' },
  { label: 'deploy em produção', status: 'ok' },
  { label: 'métricas e alertas', status: 'ativos' }
];

const LINE_SELECTOR = '[data-log-line]';

/** Terminal com o pipeline de entrega. Sem JS ou com movimento reduzido, nasce completo. */
export function DeliveryLog() {
  const rootRef = useRef<HTMLElement>(null);

  useGsap(rootRef, ({ gsap }, root) => {
    if (!isBelowFold(root)) return;
    const lines = root.querySelectorAll(LINE_SELECTOR);

    gsap.set(lines, { autoAlpha: 0, x: -6 });
    gsap.to(lines, {
      autoAlpha: 1,
      x: 0,
      duration: 0.45,
      ease: 'expo.out',
      stagger: 0.32,
      scrollTrigger: { trigger: root, start: 'top 75%', once: true }
    });
  });

  return (
    <figure ref={rootRef} className={styles.window}>
      <figcaption className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.file}>pipeline · main</span>
        <span className={styles.badge}>exemplo</span>
      </figcaption>

      <div className={styles.body}>
        <p className={styles.comment}># toda mudança passa pelo mesmo caminho</p>
        <p className={styles.prompt}>
          <span aria-hidden="true">$ </span>git push origin main
        </p>
        <ol role="list" className={styles.steps}>
          {STEPS.map((step) => (
            <li key={step.label} className={styles.step} data-log-line>
              <span className={styles.mark} aria-hidden="true">
                ✓
              </span>
              <span className={styles.label}>{step.label}</span>
              <span className={styles.status}>{step.status}</span>
            </li>
          ))}
        </ol>
        <span className={styles.cursor} aria-hidden="true" />
      </div>
    </figure>
  );
}
