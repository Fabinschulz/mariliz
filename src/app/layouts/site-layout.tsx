import type { ReactNode } from 'react';
import { isRouteErrorResponse, Outlet } from 'react-router';

import { SearchLauncher } from '@/features/busca';
import { NaoEncontradoPage } from '@/features/nao-encontrado';
import { services } from '@/features/servicos';
import { Container, ErrorContent } from '@/shared/components';
import { servicePath } from '@/shared/routing';
import { AppShell } from '@/shared/shell';

import type { Route } from './+types/site-layout';
import styles from './site-layout.module.scss';

const footerServiceLinks = services.map((service) => ({ label: service.name, to: servicePath(service.slug) }));

function SiteShell({ children }: { children: ReactNode }) {
  return (
    <AppShell headerActions={<SearchLauncher />} footerServiceLinks={footerServiceLinks}>
      {children}
    </AppShell>
  );
}

export default function SiteLayout() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}

/** Erro numa página: header, footer e WhatsApp continuam disponíveis para a pessoa se recuperar. */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <SiteShell>
      {notFound ? (
        <NaoEncontradoPage />
      ) : (
        <Container className={styles.error}>
          <ErrorContent error={error} source="route-error" />
        </Container>
      )}
    </SiteShell>
  );
}
