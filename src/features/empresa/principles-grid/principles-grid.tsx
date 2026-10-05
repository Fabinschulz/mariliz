import { principles } from '../domain';

import styles from './principles-grid.module.scss';

export function PrinciplesGrid({ headingLevel: Heading = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  return (
    <ul role="list" className={styles.grid}>
      {principles.map((principle) => (
        <li key={principle.title} className={styles.item} data-reveal>
          <Heading className={styles.title}>{principle.title}</Heading>
          <p className={styles.description}>{principle.description}</p>
        </li>
      ))}
    </ul>
  );
}
