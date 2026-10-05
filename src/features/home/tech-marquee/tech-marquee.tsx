import { useState } from 'react';

import type { Service } from '@/features/servicos';

import styles from './tech-marquee.module.scss';

/**
 * Faixa de tecnologias que rola sozinha logo abaixo do hero. As tecnologias vêm do conteúdo dos serviços
 * (sem duplicatas). A lista é renderizada duas vezes para o laço ser contínuo; a cópia fica oculta para
 * leitores de tela. Com `prefers-reduced-motion`, nasce estática, em linhas, sem cópia nem botão.
 */
export function TechMarquee({ services }: { services: readonly Service[] }) {
  const [paused, setPaused] = useState(false);
  const technologies = [...new Set(services.flatMap((service) => service.stack))];

  return (
    <section
      aria-label="Tecnologias que usamos"
      className={styles.marquee}
      data-surface="dark"
      data-paused={paused || undefined}
    >
      <div className={styles.viewport}>
        <div className={styles.track}>
          <TechGroup items={technologies} />
          <TechGroup items={technologies} decorative />
        </div>
      </div>

      <button
        type="button"
        className={styles.toggle}
        aria-label={paused ? 'Retomar a rolagem das tecnologias' : 'Pausar a rolagem das tecnologias'}
        onClick={() => setPaused((value) => !value)}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true" focusable="false">
          {paused ? (
            <path d="M4.5 2.8v10.4a.5.5 0 0 0 .77.42l8.1-5.2a.5.5 0 0 0 0-.84l-8.1-5.2a.5.5 0 0 0-.77.42Z" />
          ) : (
            <>
              <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
            </>
          )}
        </svg>
      </button>
    </section>
  );
}

function TechGroup({ items, decorative = false }: { items: readonly string[]; decorative?: boolean }) {
  return (
    <ul
      role="list"
      className={decorative ? `${styles.group} ${styles.copy}` : styles.group}
      aria-hidden={decorative || undefined}
    >
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
