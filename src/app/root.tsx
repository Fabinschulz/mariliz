import geistFontUrl from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { AppProviders, Container, ErrorContent } from '@/shared/components';
import { site } from '@/shared/config/site';
import { MAIN_CONTENT_ID } from '@/shared/shell';
import '@/shared/styles/index.scss';

import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [
  { rel: 'preload', href: geistFontUrl, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
  { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' }
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={site.themeColor} />
        <meta name="color-scheme" content="dark" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <main id={MAIN_CONTENT_ID} style={{ paddingBlock: 'var(--space-section)' }}>
      <Container>
        <ErrorContent error={error} source="global-error" />
      </Container>
    </main>
  );
}
