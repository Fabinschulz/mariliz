import type { Service } from '@/features/servicos';
import { TagList } from '@/shared/components/ui';

import styles from './stack-list.module.scss';

/** Tecnologias agrupadas por frente, derivadas do conteúdo dos serviços. */
export function StackList({ services }: { services: readonly Service[] }) {
  return (
    <dl className={styles.groups}>
      {services.map((service) => (
        <div key={service.slug} className={styles.group} data-reveal>
          <dt className={styles.label}>{service.shortName}</dt>
          <dd className={styles.items}>
            <TagList items={service.stack} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
