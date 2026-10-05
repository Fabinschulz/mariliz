import { lazy, Suspense, useEffect, useEffectEvent, useState } from 'react';

import { SearchIcon } from '@synthra.io/ui-kit';

import { ErrorBoundary } from '@/shared/components/common';
import { reportRenderError } from '@/shared/utils';

import { loadSearchProvider } from '../hooks/use-provider-request';
import styles from './search-launcher.module.scss';

const loadDialog = () => import('./search-dialog');
const SearchDialog = lazy(loadDialog);

/** Antecipa o download do diálogo e do índice quando a intenção de buscar aparece. */
function prefetchSearch() {
  void loadDialog();
  void loadSearchProvider();
}

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

/** Atalhos: ⌘K / Ctrl+K em qualquer lugar; "/" fora de campos de texto. */
function useSearchShortcut(onTrigger: () => void) {
  const trigger = useEffectEvent(onTrigger);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isModK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isSlash = event.key === '/' && !isTypingTarget(event.target);
      if (!isModK && !isSlash) return;
      event.preventDefault();
      trigger();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export function SearchLauncher() {
  const [open, setOpen] = useState(false);
  // Depois de aberto uma vez, o diálogo permanece montado: o <dialog> nativo
  // precisa fechar (não ser removido) para devolver o foco ao botão.
  const [hasOpened, setHasOpened] = useState(false);

  function openSearch() {
    setHasOpened(true);
    setOpen(true);
  }

  useSearchShortcut(openSearch);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Buscar no site"
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K /"
        title="Buscar (Ctrl K)"
        onClick={openSearch}
        onPointerEnter={prefetchSearch}
        onFocus={prefetchSearch}
      >
        <SearchIcon aria-hidden fontSize="small" />
      </button>

      {hasOpened && (
        <ErrorBoundary onError={(error) => reportRenderError(error, { source: 'search-dialog' })} fallback={() => null}>
          <Suspense fallback={null}>
            <SearchDialog open={open} onClose={() => setOpen(false)} />
          </Suspense>
        </ErrorBoundary>
      )}
    </>
  );
}
