import { WhatsAppIcon } from '@/shared/components/ui';
import { cn, externalLinkProps, whatsappUrl } from '@/shared/utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './whatsapp-float.module.scss';

/** Áreas que já oferecem o WhatsApp (CTA final, rodapé). */
const HIDES_FLOAT_SELECTOR = '[data-hides-float]';

/** Esconde o botão enquanto alguma área marcada estiver visível; reavalia a cada rota. */
function useHiddenNearContact(pathname: string): boolean {
  const [state, setState] = useState({ pathname, hidden: false });

  useEffect(() => {
    const targets = document.querySelectorAll(HIDES_FLOAT_SELECTOR);
    if (targets.length === 0 || !('IntersectionObserver' in window)) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setState({ pathname, hidden: visible.size > 0 });
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  // Estado de outra rota não vale para a atual.
  return state.pathname === pathname && state.hidden;
}

/** Atalho fixo para o WhatsApp. A entrada é CSS: visível já no HTML pré-renderizado. */
export function WhatsAppFloat() {
  const { pathname } = useLocation();
  const hidden = useHiddenNearContact(pathname);

  return (
    <a
      href={whatsappUrl()}
      {...externalLinkProps}
      className={cn(styles.float, hidden && styles.hidden)}
      aria-label="Conversar no WhatsApp (abre em nova aba)"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <span className={styles.halo} aria-hidden="true" />
      <WhatsAppIcon className={styles.icon} />
    </a>
  );
}
