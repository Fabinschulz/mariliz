import { Breadcrumb } from '@synthra.io/ui-kit';
import type { ReactNode } from 'react';

import type { Crumb } from '@/shared/routing';

import { Container } from '../../atoms/container';
import styles from './PageHeader.module.scss';

export interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Cabeçalho das páginas internas. Contém o único h1 da página. */
export function PageHeader({ eyebrow, title, intro, breadcrumbs, children }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader} data-surface="dark">
      <Container>
        {breadcrumbs && (
          <Breadcrumb
            aria-label="Trilha de navegação"
            className={styles.breadcrumb}
            links={breadcrumbs.map(({ name, path }) => ({ title: name, url: path }))}
          />
        )}
        <div className={styles.content}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={styles.title}>{title}</h1>
          {intro && <p className={styles.intro}>{intro}</p>}
          {children}
        </div>
      </Container>
    </header>
  );
}
