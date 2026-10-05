import { useEffect, useEffectEvent, type DependencyList, type RefObject } from 'react';

import { loadGsap, type GsapModules } from './load-gsap';
import { canAffordMotion, MOTION_OK_QUERY } from './motion-capability';

type GsapSetup = (modules: GsapModules, scope: HTMLElement) => void;

/**
 * Executa animações GSAP com escopo e limpeza automáticos.
 *
 * - Não roda com prefers-reduced-motion (e reverte se a preferência mudar).
 * - Não roda em dispositivos com pouca capacidade ou economia de dados.
 * - gsap.matchMedia reverte tudo o que o setup criou no unmount.
 */
export function useGsap(scopeRef: RefObject<HTMLElement | null>, setup: GsapSetup, deps: DependencyList = []) {
  const runSetup = useEffectEvent(setup);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || !canAffordMotion()) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap().then((modules) => {
      if (cancelled) return;
      const mm = modules.gsap.matchMedia(scope);
      mm.add(MOTION_OK_QUERY, () => runSetup(modules, scope));
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps definidas pelo chamador
  }, [scopeRef, ...deps]);
}
