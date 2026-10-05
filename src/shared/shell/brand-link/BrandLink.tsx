import { Link } from 'react-router';

import { Logo } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { pathTo } from '@/shared/routing';

export function BrandLink({ className }: { className?: string }) {
  return (
    <Link to={pathTo('home')} className={className} aria-label={`${site.name}, página inicial`}>
      <Logo />
    </Link>
  );
}
