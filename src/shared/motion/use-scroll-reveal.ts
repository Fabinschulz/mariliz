import type { RefObject } from 'react';

import { useGsap } from './use-gsap';
import { isBelowFold } from './viewport';

const REVEAL_SELECTOR = '[data-reveal]';
const OFFSET_Y = 24;
const BLUR = 'blur(6px)';

/**
 * Revela elementos marcados com `data-reveal` ao entrarem na viewport.
 *
 * Aprimoramento progressivo: o HTML nasce visível. Só elementos ainda abaixo
 * da dobra são escondidos no init (o usuário nunca vê nada "sumir") e,
 * sem JS ou com movimento reduzido, tudo simplesmente aparece.
 * Anima opacity/transform/filter (sem layout shift); a curva `expo.out` equivale
 * ao token CSS `--ease-expo`, e o blur é limpo ao fim para não custar composição.
 */
export function useScrollReveal(scopeRef: RefObject<HTMLElement | null>, resetKey: string) {
  useGsap(
    scopeRef,
    ({ gsap, ScrollTrigger }, scope) => {
      const targets = Array.from(scope.querySelectorAll(REVEAL_SELECTOR)).filter(isBelowFold);
      if (targets.length === 0) return;

      gsap.set(targets, { autoAlpha: 0, y: OFFSET_Y, filter: BLUR });

      ScrollTrigger.batch(targets, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'expo.out',
            stagger: 0.08,
            overwrite: true,
            clearProps: 'filter'
          })
      });
    },
    [resetKey]
  );
}
