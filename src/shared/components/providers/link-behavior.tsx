import type { Ref } from 'react';
import { Link, type LinkProps } from 'react-router';

type LinkBehaviorProps = Omit<LinkProps, 'to'> & {
  href: LinkProps['to'];
  ref?: Ref<HTMLAnchorElement>;
};

/**
 * Adapta o `href` dos componentes MUI/Synthra para o <Link> do React Router.
 * URLs absolutas (ex.: wa.me) continuam sendo links externos comuns.
 */
export function LinkBehavior({ href, ref, ...props }: LinkBehaviorProps) {
  return <Link ref={ref} to={href} prefetch="intent" {...props} />;
}
