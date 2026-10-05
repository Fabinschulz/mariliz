import { Link } from 'react-router';

import { ArrowRightIcon } from '@synthra.io/ui-kit';

import { servicePath } from '@/shared/routing';
import { formatOrdinal } from '@/shared/utils';

import type { Service } from '../domain';

import styles from './service-grid.module.scss';

interface ServiceGridProps {
  services: readonly Service[];
  /** Nível dos títulos dos cards conforme a hierarquia da página. */
  headingLevel?: 'h2' | 'h3';
}

export function ServiceGrid({ services, headingLevel: Heading = 'h3' }: ServiceGridProps) {
  return (
    <ul role="list" className={styles.grid}>
      {services.map((service, index) => (
        <li key={service.slug} className={styles.card} data-reveal>
          <div className={styles.meta} aria-hidden="true">
            <span>{formatOrdinal(index)}</span>
            <span>{service.shortName}</span>
          </div>
          <Heading className={styles.title}>
            {/* O link cobre o card inteiro (::after), mantendo um único alvo acessível. */}
            <Link to={servicePath(service.slug)} prefetch="intent" viewTransition className={styles.link}>
              {service.name}
            </Link>
          </Heading>
          <p className={styles.summary}>{service.summary}</p>
          <span className={styles.more} aria-hidden="true">
            Saiba mais <ArrowRightIcon aria-hidden fontSize="inherit" />
          </span>
        </li>
      ))}
    </ul>
  );
}
