import type { gsap as GsapInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger';

export interface GsapModules {
  gsap: typeof GsapInstance;
  ScrollTrigger: typeof ScrollTriggerPlugin;
}

let modulesPromise: Promise<GsapModules> | null = null;

export function loadGsap(): Promise<GsapModules> {
  modulesPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    }
  );
  return modulesPromise;
}
