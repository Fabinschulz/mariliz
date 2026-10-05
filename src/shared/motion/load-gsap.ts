import type { gsap as GsapInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger';

export interface GsapModules {
  gsap: typeof GsapInstance;
  ScrollTrigger: typeof ScrollTriggerPlugin;
}

let modulesPromise: Promise<GsapModules> | null = null;

/**
 * GSAP + ScrollTrigger num chunk separado, baixado uma única vez e só depois
 * da hidratação. Nada no caminho crítico de renderização depende disto.
 */
export function loadGsap(): Promise<GsapModules> {
  modulesPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    }
  );
  return modulesPromise;
}
