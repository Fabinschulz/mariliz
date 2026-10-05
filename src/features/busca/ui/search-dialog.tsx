import { useId, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router';

import CircularProgress from '@mui/material/CircularProgress';
import { ArrowRightIcon, Modal, SearchIcon } from '@synthra.io/ui-kit';

import { services } from '@/features/servicos';
import { searchPath, servicePath } from '@/shared/routing';
import { pluralize } from '@/shared/utils';

import type { SearchSuggestion } from '../core/types';
import type { RequestState } from '../hooks/use-provider-request';
import { useSuggestions } from '../hooks/use-search';
import styles from './search-dialog.module.scss';
import { TypeBadge } from './type-badge';

const ERROR_MESSAGE = 'Não foi possível buscar agora. Tente novamente.';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Default export: carregado via React.lazy pelo SearchLauncher. O Modal da
 * Synthra (MUI Dialog) cuida de foco preso, Esc, fundo inerte e botão fechar.
 */
export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Buscar no site" sizeModal="medium" closeLabel="Fechar busca">
      {open && <SearchPanel onClose={onClose} />}
    </Modal>
  );
}

function visibleSuggestions(state: RequestState<SearchSuggestion[]>): SearchSuggestion[] {
  if (state.status === 'success') return state.data;
  if (state.status === 'loading') return state.previous ?? [];
  return [];
}

function wrapIndex(index: number, length: number): number {
  return (index + length) % length;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const listboxId = useId();
  const [term, setTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const state = useSuggestions(term);
  const suggestions = visibleSuggestions(state);
  const activeSuggestion = suggestions[activeIndex];
  const trimmedTerm = term.trim();
  const hasTerm = trimmedTerm.length > 0;
  const optionId = (index: number) => `${listboxId}-${index}`;

  function goTo(url: string) {
    onClose();
    navigate(url);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (activeSuggestion) goTo(activeSuggestion.url);
    else if (hasTerm) goTo(searchPath(trimmedTerm));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) return;
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    setActiveIndex((current) => wrapIndex(current + step, suggestions.length));
  }

  return (
    <div className={styles.panel}>
      <form role="search" className={styles.form} onSubmit={handleSubmit}>
        <SearchIcon aria-hidden className={styles.inputIcon} />
        <label htmlFor={`${listboxId}-input`} className="visually-hidden">
          Termo de busca
        </label>
        <input
          id={`${listboxId}-input`}
          className={styles.input}
          type="search"
          role="combobox"
          aria-expanded={suggestions.length > 0}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeSuggestion ? optionId(activeIndex) : undefined}
          placeholder="Buscar serviços, páginas e respostas"
          autoComplete="off"
          enterKeyHint="search"
          // O diálogo abre por ação explícita do usuário: foco direto no campo é esperado.
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={term}
          onChange={(event) => {
            setTerm(event.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
        {state.status === 'loading' && <CircularProgress size={18} color="inherit" aria-hidden />}
      </form>

      <div className={styles.body}>
        <ul id={listboxId} role="listbox" aria-label="Sugestões" className={styles.listbox}>
          {suggestions.map((suggestion, index) => (
            // Opções do combobox: o teclado é tratado no input (aria-activedescendant).
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              key={suggestion.id}
              id={optionId(index)}
              role="option"
              aria-selected={index === activeIndex}
              className={styles.option}
              onClick={() => goTo(suggestion.url)}
              onPointerMove={() => setActiveIndex(index)}
            >
              <span className={styles.optionTitle}>{suggestion.title}</span>
              <TypeBadge type={suggestion.type} />
            </li>
          ))}
        </ul>

        <p role="status" className="visually-hidden">
          {statusMessage(state, trimmedTerm, suggestions.length)}
        </p>

        {state.status === 'error' && <p className={styles.message}>{ERROR_MESSAGE}</p>}
        {state.status === 'success' && suggestions.length === 0 && (
          <p className={styles.message}>Nada encontrado para “{trimmedTerm}”. Tente outro termo ou fale com a gente.</p>
        )}
        {suggestions.length > 0 && (
          <Link to={searchPath(trimmedTerm)} className={styles.allResults} onClick={onClose}>
            Ver todos os resultados para “{trimmedTerm}”
            <ArrowRightIcon aria-hidden fontSize="small" />
          </Link>
        )}

        {!hasTerm && <QuickLinks onNavigate={onClose} />}
      </div>

      <footer className={styles.footer} aria-hidden="true">
        <span>
          <kbd>↑</kbd> <kbd>↓</kbd> navegar
        </span>
        <span>
          <kbd>Enter</kbd> abrir
        </span>
        <span>
          <kbd>Esc</kbd> fechar
        </span>
      </footer>
    </div>
  );
}

/** Texto para a região live (leitores de tela). */
function statusMessage(state: RequestState<SearchSuggestion[]>, term: string, count: number) {
  if (state.status === 'error') return ERROR_MESSAGE;
  if (state.status !== 'success') return '';
  if (count === 0) return `Nada encontrado para “${term}”.`;
  return `${pluralize(count, 'sugestão', 'sugestões')}.`;
}

function QuickLinks({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav aria-label="Atalhos" className={styles.quickLinks}>
      <p className={styles.quickTitle}>Serviços</p>
      <ul role="list">
        {services.map((service) => (
          <li key={service.slug}>
            <Link to={servicePath(service.slug)} className={styles.quickLink} onClick={onNavigate}>
              {service.name}
              <ArrowRightIcon aria-hidden fontSize="small" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
