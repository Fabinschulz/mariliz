import { AlertIcon, CheckCircleIcon, SearchIcon } from '@synthra.io/ui-kit';
import type { ReactNode } from 'react';

import { cn } from '@/shared/utils';

import styles from './state-message.module.scss';

type Tone = 'neutral' | 'error' | 'success';

const toneIcon = {
  neutral: SearchIcon,
  error: AlertIcon,
  success: CheckCircleIcon
} as const satisfies Record<Tone, unknown>;

export interface StateMessageProps {
  tone?: Tone;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  /** Páginas de erro usam h1; estados dentro de uma página usam h2/h3. */
  headingLevel?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/** Estrutura única para estados vazio, de erro e de sucesso (EmptyState/ErrorState). */
export function StateMessage({
  tone = 'neutral',
  title,
  description,
  actions,
  headingLevel: Heading = 'h2',
  className
}: StateMessageProps) {
  const ToneIcon = toneIcon[tone];

  return (
    <div className={cn(styles.state, styles[tone], className)}>
      <span className={styles.icon}>
        <ToneIcon aria-hidden fontSize="small" />
      </span>
      <Heading className={styles.title}>{title}</Heading>
      {description && <div className={styles.description}>{description}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
