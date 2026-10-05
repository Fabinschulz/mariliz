import type { ReactNode } from 'react';

import { cn } from '@/shared/utils';

import styles from './SplitLayout.module.scss';

interface SplitLayoutProps {
  aside: ReactNode;
  children: ReactNode;
  /** Mantém o aside visível enquanto o conteúdo rola (só desktop, CSS puro). */
  stickyAside?: boolean;
}

/** Duas colunas no desktop (título | conteúdo); empilhado no mobile. */
export function SplitLayout({ aside, children, stickyAside = false }: SplitLayoutProps) {
  return (
    <div className={styles.split}>
      <div className={cn(stickyAside && styles.sticky)}>{aside}</div>
      <div>{children}</div>
    </div>
  );
}
