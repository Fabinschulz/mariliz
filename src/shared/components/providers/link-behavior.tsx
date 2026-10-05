import type { Ref } from 'react';
import { Link, type LinkProps } from 'react-router';

type LinkBehaviorProps = Omit<LinkProps, 'to'> & {
  href: LinkProps['to'];
  ref?: Ref<HTMLAnchorElement>;
};

export function LinkBehavior({ href, ref, ...props }: LinkBehaviorProps) {
  return <Link ref={ref} to={href} prefetch="intent" {...props} />;
}
