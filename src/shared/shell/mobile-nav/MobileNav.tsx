import { Drawer, MenuLineHorizontalIcon } from '@synthra.io/ui-kit';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { WhatsAppButton } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { getRoute, type RouteDefinition } from '@/shared/routing';

import styles from './mobile-nav.module.scss';

/** Menu de tela cheia no mobile (Drawer da Synthra: foco preso, Esc, fundo inerte). */
export function MobileNav({ navRoutes }: { navRoutes: RouteDefinition[] }) {
  const { pathname } = useLocation();
  // O menu pertence à página em que foi aberto: qualquer navegação (link,
  // voltar/avançar) o fecha automaticamente, sem efeito de sincronização.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const close = () => setOpenedAt(null);
  const routes = [getRoute('home'), ...navRoutes];

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpenedAt(pathname)}
      >
        <MenuLineHorizontalIcon aria-hidden fontSize="small" />
      </button>

      <Drawer open={open} onClose={close} anchor="right" title="Menu" closeLabel="Fechar menu">
        <nav aria-label="Principal (mobile)">
          <ul role="list" className={styles.list}>
            {routes.map((route) => (
              <li key={route.id}>
                <NavLink to={route.path} end={route.id === 'home'} className={styles.link}>
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <WhatsAppButton size="large" fullWidth />
          <p className={styles.phone}>{site.whatsapp.display}</p>
        </div>
      </Drawer>
    </>
  );
}
