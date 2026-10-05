import { useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router';

import { useScrollReveal } from '@/shared/motion';

import { Footer, type FooterLink } from '../footer';
import { Header } from '../header';
import { RouteAnnouncer } from '../route-announcer';
import { WhatsAppFloat } from '../whatsapp-float';
import styles from './app-shell.module.scss';

export const MAIN_CONTENT_ID = 'conteudo';

export interface AppShellProps {
  children: ReactNode;
  /** Ações do header vindas de features (ex.: busca). O shell não conhece features. */
  headerActions?: ReactNode;
  /** Links de serviços do rodapé, fornecidos pela camada app. */
  footerServiceLinks: FooterLink[];
}

export function AppShell({ children, headerActions, footerServiceLinks }: AppShellProps) {
  const mainRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  // Um único ponto liga as revelações de scroll de todas as páginas.
  useScrollReveal(mainRef, pathname);

  return (
    <>
      <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <Header actions={headerActions} />
      <main ref={mainRef} id={MAIN_CONTENT_ID} tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Footer serviceLinks={footerServiceLinks} />
      <WhatsAppFloat />
      <RouteAnnouncer focusTargetId={MAIN_CONTENT_ID} />
    </>
  );
}
