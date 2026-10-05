import type { ElementType, HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import styles from './Container.module.scss';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'default' | 'narrow';
}

export function Container({ as: Tag = 'div', size = 'default', className, ...rest }: ContainerProps) {
  return <Tag className={cn(styles.container, size === 'narrow' && styles.narrow, className)} {...rest} />;
}
