import { DownIcon } from '@synthra.io/ui-kit';

import styles from './FaqList.module.scss';

export interface FaqListProps {
  items: ReadonlyArray<{ question: string; answer: string }>;
}

/** Acordeão nativo (<details>): teclado, leitor de tela e Ctrl+F funcionam sem JS. */
export function FaqList({ items }: FaqListProps) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.question} className={styles.item} data-reveal>
          <summary className={styles.question}>
            <span>{item.question}</span>
            <DownIcon aria-hidden className={styles.chevron} />
          </summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
