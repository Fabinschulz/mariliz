import type { RefObject } from 'react';
import { useGsap } from './use-gsap';
import { isBelowFold } from './viewport';

const REVEAL_SELECTOR = '[data-reveal]';
const OFFSET_Y = 24;
const BLUR = 'blur(6px)';

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
