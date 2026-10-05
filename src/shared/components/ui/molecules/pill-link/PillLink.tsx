import { ArrowRightIcon, Button, type ButtonProps } from '@synthra.io/ui-kit';
import type { ReactNode } from 'react';

import { cn, externalLinkProps } from '@/shared/utils';

import styles from './PillLink.module.scss';

export interface PillLinkProps extends Omit<ButtonProps, 'variant' | 'color' | 'endIcon' | 'href'> {
  /** Sem `href`, a pílula vira um <button> (ex.: submit de formulário). */
  href?: string;
  /** solid = ação principal (turquesa); outline = secundária (contorno claro). */
  tone?: 'solid' | 'outline';
  /** Ícone dentro do círculo à direita. Padrão: seta. */
  icon?: ReactNode;
  /** Link para fora do site: nova aba, sem vínculo de `opener`, e aviso para leitores de tela. */
  external?: boolean;
}

/** CTA em pílula com o ícone num círculo: um único <a> (ou <button>, sem `href`) da Synthra. */
export function PillLink({
  href,
  tone = 'solid',
  icon = <ArrowRightIcon />,
  external = false,
  className,
  children,
  ...rest
}: PillLinkProps) {
  return (
    <Button
      href={href}
      variant={tone === 'solid' ? 'contained' : 'outlined'}
      color={tone === 'solid' ? 'primary' : 'inherit'}
      className={cn(styles.pill, styles[tone], className)}
      endIcon={<span className={styles.iconCircle}>{icon}</span>}
      {...(external ? externalLinkProps : {})}
      {...rest}
    >
      {children}
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </Button>
  );
}
