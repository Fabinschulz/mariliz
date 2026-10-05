import { Provider } from '@synthra.io/ui-kit';
import type { ReactNode } from 'react';

import { themes, type Surface } from './theme';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider theme={themes.dark} cssBaseline={false}>
      {children}
    </Provider>
  );
}

/** Aplica o tema MUI da superfície (faixas claras dentro do site escuro). */
export function SurfaceTheme({ surface, children }: { surface: Surface; children: ReactNode }) {
  return (
    <Provider theme={themes[surface]} cssBaseline={false}>
      {children}
    </Provider>
  );
}
