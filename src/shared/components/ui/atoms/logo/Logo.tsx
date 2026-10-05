import { cn } from '@/shared/utils';

import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
}

/**
 * Wordmark monoline. Os pingos dos dois "i" são nós em teal, o mesmo motivo
 * de conexões usado nos diagramas do site.
 * Decorativo: quem usa (ex.: link para a home) fornece o nome acessível.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg className={cn(styles.logo, className)} viewBox="-2.5 -2.5 123 33.25" aria-hidden="true" focusable="false">
      <path
        className={styles.letters}
        d="M2 28V13.25a5.25 5.25 0 0 1 10.5 0V28M12.5 13.25a5.25 5.25 0 0 1 10.5 0V28M52 8v20M61 28V16.5A8.5 8.5 0 0 1 69.5 8h.5M78 13v15M87 0v28M96 13v15M104 8h14l-14 20h14"
      />
      <circle className={styles.letters} cx="42" cy="18" r="10" />
      <circle className={styles.node} cx="78" cy="3.6" r="2.9" />
      <circle className={styles.node} cx="96" cy="3.6" r="2.9" />
    </svg>
  );
}
