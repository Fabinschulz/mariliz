import { useId, useRef, useState, type KeyboardEvent } from 'react';

import { PillLink, TagList } from '@/shared/components/ui';
import { servicePath } from '@/shared/routing';

import type { Service } from '../domain';

import styles from './service-tabs.module.scss';

interface ServiceTabsProps {
  services: readonly Service[];
  /** Nível do título de cada painel conforme a hierarquia da página. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * Seletor de frentes no padrão WAI-ARIA Tabs (setas, Home/End). Todos os painéis
 * vão no HTML, para SEO e sem JS; só o ativo aparece.
 */
export function ServiceTabs({ services, headingLevel: Heading = 'h3' }: ServiceTabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  function select(index: number) {
    setActive(index);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = services.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
  }

  return (
    <div className={styles.tabs} data-reveal>
      <div role="tablist" aria-label="Frentes de serviço" className={styles.tablist}>
        {services.map((service, index) => (
          <button
            key={service.slug}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={tabId(index)}
            aria-selected={index === active}
            aria-controls={panelId(index)}
            tabIndex={index === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            {service.shortName}
          </button>
        ))}
      </div>

      {services.map((service, index) => (
        <div
          key={service.slug}
          role="tabpanel"
          id={panelId(index)}
          aria-labelledby={tabId(index)}
          hidden={index !== active}
          tabIndex={0}
          className={styles.panel}
        >
          <div className={styles.intro}>
            <Heading className={styles.title}>{service.name}</Heading>
            <p className={styles.summary}>{service.summary}</p>
            <PillLink href={servicePath(service.slug)} tone="outline" className={styles.link}>
              Saiba mais<span className="visually-hidden"> sobre {service.name}</span>
            </PillLink>
          </div>

          <div className={styles.details}>
            <div className={styles.block}>
              <p className={styles.label}>O que entregamos</p>
              <ul role="list" className={styles.deliverables}>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.block}>
              <p className={styles.label}>Stack</p>
              <TagList items={service.stack} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
