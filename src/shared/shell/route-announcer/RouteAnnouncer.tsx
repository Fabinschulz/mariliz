import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

/**
 * Navegação client-side é silenciosa para leitores de tela. A cada troca de
 * página: move o foco para o conteúdo principal e anuncia o novo título.
 * Mudanças só de query string ou hash (filtros, âncoras) não disparam.
 */
export function RouteAnnouncer({ focusTargetId }: { focusTargetId: string }) {
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    document.getElementById(focusTargetId)?.focus({ preventScroll: true });
    // Aguarda o <Meta /> atualizar o <title> da nova rota.
    const frame = window.requestAnimationFrame(() => setAnnouncement(document.title));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, focusTargetId]);

  return (
    <div aria-live="polite" aria-atomic="true" className="visually-hidden">
      {announcement}
    </div>
  );
}
