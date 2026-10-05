import { Button, ReloadIcon } from '@synthra.io/ui-kit';
import { useEffect } from 'react';

import { pathTo } from '@/shared/routing';
import { reportRenderError } from '@/shared/utils';

import { StateMessage } from '../state-message';

export interface ErrorContentProps {
  error: unknown;
  /** Identifica o boundary que capturou, para a telemetria. */
  source: string;
}

export function ErrorContent({ error, source }: ErrorContentProps) {
  useEffect(() => {
    reportRenderError(error, { source });
  }, [error, source]);

  return (
    <StateMessage
      tone="error"
      headingLevel="h1"
      title="Algo não saiu como esperado"
      description={
        <p>
          Tivemos um problema ao exibir esta página. Já registramos o ocorrido. Tente novamente e, se o problema
          persistir, volte para a página inicial.
        </p>
      }
      actions={
        <>
          <Button variant="contained" startIcon={<ReloadIcon />} onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
          <Button variant="outlined" color="inherit" component="a" href={pathTo('home')}>
            Ir para a página inicial
          </Button>
        </>
      }
    />
  );
}
