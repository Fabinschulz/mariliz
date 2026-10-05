import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils';

import { SurfaceTheme, type Surface } from '../../../providers';
import { Container } from '../../atoms/container';
import styles from './Section.module.scss';

export type SectionTone = 'dark' | 'raised' | 'light' | 'mist' | 'accent';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** id do heading que nomeia a seção (landmark acessível). */
  labelledBy?: string;
  /** Superfície da faixa; `accent` (turquesa cheio) é reservado ao CTA de conversão. */
  tone?: SectionTone;
  spacing?: 'default' | 'compact';
  children: ReactNode;
}

const SURFACE_BY_TONE: Record<SectionTone, Surface> = {
  dark: 'dark',
  raised: 'dark',
  light: 'light',
  mist: 'light',
  accent: 'accent'
};

/**
 * Faixa da página. Uma única prop define a superfície para os tokens CSS
 * (data-surface) e para os componentes Synthra/MUI (tema equivalente).
 */
export function Section({
  labelledBy,
  tone = 'dark',
  spacing = 'default',
  className,
  children,
  ...rest
}: SectionProps) {
  const surface = SURFACE_BY_TONE[tone];

  return (
    <section
      aria-labelledby={labelledBy}
      data-surface={surface}
      className={cn(styles.section, styles[tone], spacing === 'compact' && styles.compact, className)}
      {...rest}
    >
      <SurfaceTheme surface={surface}>
        <Container>{children}</Container>
      </SurfaceTheme>
    </section>
  );
}

export interface SectionHeaderProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'start' | 'center';
  /** Nível do heading; seções da página usam h2. */
  level?: 'h2' | 'h3';
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  align = 'start',
  level: Heading = 'h2'
}: SectionHeaderProps) {
  return (
    <header className={cn(styles.header, align === 'center' && styles.center)} data-reveal>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}
