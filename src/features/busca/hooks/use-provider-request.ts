import { useEffect, useEffectEvent, useState } from 'react';

import type { SearchProvider } from '../core/types';

/** Chunk separado: o índice só é baixado quando alguém de fato busca. */
export function loadSearchProvider(): Promise<SearchProvider> {
  return import('../search-provider').then((module) => module.searchProvider);
}

export type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading'; previous?: T }
  | { status: 'success'; data: T }
  | { status: 'error'; error: unknown };

interface Settled<T> {
  key: string;
  data?: T;
  error?: unknown;
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export function useProviderRequest<T>(
  key: string | null,
  request: (provider: SearchProvider, signal: AbortSignal) => Promise<T>
): RequestState<T> {
  const [settled, setSettled] = useState<Settled<T> | null>(null);
  const runRequest = useEffectEvent(request);

  useEffect(() => {
    if (key === null) return;
    const controller = new AbortController();

    loadSearchProvider()
      .then((provider) => runRequest(provider, controller.signal))
      .then(
        (data) => setSettled({ key, data }),
        (error: unknown) => {
          if (!isAbortError(error)) setSettled({ key, error });
        }
      );

    return () => controller.abort();
  }, [key]);

  if (key === null) return { status: 'idle' };
  if (settled?.key !== key) return { status: 'loading', previous: settled?.data };
  if (settled.error !== undefined) return { status: 'error', error: settled.error };
  return { status: 'success', data: settled.data as T };
}
