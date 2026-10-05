interface NetworkInformationLike {
  saveData?: boolean;
}

interface NavigatorWithHints extends Navigator {
  connection?: NetworkInformationLike;
  deviceMemory?: number;
}

const LOW_MEMORY_GB = 2;
const LOW_CPU_CORES = 2;

/**
 * Efeitos não essenciais ficam desligados em economia de dados ou em
 * aparelhos modestos. prefers-reduced-motion é tratado à parte (matchMedia),
 * porque pode mudar com a página aberta.
 */
export function canAffordMotion(): boolean {
  const nav = navigator as NavigatorWithHints;
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= LOW_MEMORY_GB) return false;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= LOW_CPU_CORES) {
    return false;
  }
  return true;
}

export const MOTION_OK_QUERY = '(prefers-reduced-motion: no-preference)';
