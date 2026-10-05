import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * false no HTML pré-renderizado e durante a hidratação; true depois.
 * Use para ler estado exclusivo do cliente (URL de busca, localStorage) sem
 * causar mismatch de hidratação.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
