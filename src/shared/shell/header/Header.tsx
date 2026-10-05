import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

import { PillLink, WhatsAppIcon } from '@/shared/components/ui';
import { getNavRoutes } from '@/shared/routing';
import { whatsappUrl } from '@/shared/utils';

import { BrandLink } from '../brand-link';
import { MobileNav } from '../mobile-nav';
import styles from './header.module.scss';

const navRoutes = getNavRoutes();

/** Navbar em pílula flutuante: translúcida, com a página visível por trás. */
export function Header({ actions }: { actions?: ReactNode }) {
  return (
    <header className={styles.header} data-surface="dark">
      <div className={styles.frame}>
        <div className={styles.bar}>
          <BrandLink className={styles.brand} />

          <nav aria-label="Principal" className={styles.desktopNav}>
            <ul role="list" className={styles.navList}>
              {navRoutes.map((route) => (
                <li key={route.id}>
                  <NavLink to={route.path} prefetch="intent" viewTransition className={styles.navLink}>
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            {actions}
            <PillLink href={whatsappUrl()} external icon={<WhatsAppIcon />} size="small" className={styles.cta}>
              Fale conosco
            </PillLink>
            <MobileNav navRoutes={navRoutes} />
          </div>
        </div>
      </div>
    </header>
  );
}
