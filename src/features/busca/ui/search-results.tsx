import { StateMessage } from '@/shared/components/common';
import { WhatsAppButton } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { pathTo } from '@/shared/routing';
import { cn, pluralize } from '@/shared/utils';
import CircularProgress from '@mui/material/CircularProgress';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { SEARCH_DOCUMENT_TYPES, searchTypeLabels, type SearchResult } from '../core/types';
import { toSearchParams, toSearchQuery, type SearchUrlState } from '../core/url-state';
import { useSearchResults } from '../hooks/use-search';
import styles from './search-results.module.scss';
import { TypeBadge } from './type-badge';

const SUGGESTED_TERMS = ['aplicativo', 'nuvem', 'inteligência artificial', 'sistema legado'];

function hrefFor(state: SearchUrlState): string {
  const params = toSearchParams(state).toString();
  return params ? `${pathTo('search')}?${params}` : pathTo('search');
}

/** Resultados para o estado da URL. Toda interação é um link: back/forward e compartilhamento funcionam. */
export function SearchResultsView({ state }: { state: SearchUrlState }) {
  const request = useSearchResults(state.term ? toSearchQuery(state) : null);

  if (!state.term) return <EmptyPrompt />;

  if (request.status === 'error') {
    return (
      <StateMessage
        tone="error"
        title="A busca falhou"
        description={<p>Não foi possível buscar agora. Tente novamente em instantes.</p>}
      />
    );
  }

  // Durante uma nova busca, mantém os resultados anteriores esmaecidos (sem "piscar").
  const loading = request.status === 'loading';
  const result = request.status === 'success' ? request.data : loading ? request.previous : undefined;

  if (!result) {
    return (
      <p className={styles.loading} role="status">
        <CircularProgress size={18} color="inherit" aria-hidden /> Buscando…
      </p>
    );
  }

  return (
    <div className={cn(styles.results, loading && styles.stale)} aria-busy={loading}>
      <p role="status" className={styles.summary}>
        {result.total === 0
          ? `Nenhum resultado para “${state.term}”.`
          : `${pluralize(result.total, 'resultado', 'resultados')} para “${state.term}”.`}
      </p>

      <TypeFilters state={state} facets={result.facets} />

      {result.total === 0 ? <NoResults state={state} /> : <ResultList result={result} />}

      <Pagination state={state} pageCount={result.pageCount} />
    </div>
  );
}

function TypeFilters({ state, facets }: { state: SearchUrlState; facets: SearchResult['facets'] }) {
  const total = Object.values(facets).reduce((sum, count) => sum + count, 0);
  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'title', label: 'A–Z' }
  ] as const;

  return (
    <div className={styles.toolbar}>
      <nav aria-label="Filtrar por tipo">
        <ul role="list" className={styles.chips}>
          <li>
            <FilterLink to={hrefFor({ ...state, type: undefined, page: 1 })} active={!state.type}>
              Todos <span className={styles.count}>{total}</span>
            </FilterLink>
          </li>
          {SEARCH_DOCUMENT_TYPES.map((type) => (
            <li key={type}>
              <FilterLink
                to={hrefFor({ ...state, type, page: 1 })}
                active={state.type === type}
                disabled={facets[type] === 0}
              >
                {searchTypeLabels[type]} <span className={styles.count}>{facets[type]}</span>
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Ordenar resultados">
        <ul role="list" className={styles.chips}>
          {sortOptions.map((option) => (
            <li key={option.value}>
              <FilterLink to={hrefFor({ ...state, sort: option.value, page: 1 })} active={state.sort === option.value}>
                {option.label}
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function FilterLink({
  to,
  active,
  disabled = false,
  children
}: {
  to: string;
  active: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  // Filtro sem resultados não é um destino útil: vira texto, não link.
  if (disabled) return <span className={cn(styles.chip, styles.chipDisabled)}>{children}</span>;

  return (
    <Link
      to={to}
      replace
      preventScrollReset
      className={cn(styles.chip, active && styles.chipActive)}
      aria-current={active ? 'true' : undefined}
    >
      {children}
    </Link>
  );
}

function ResultList({ result }: { result: SearchResult }) {
  return (
    <ol role="list" className={styles.list}>
      {result.hits.map(({ document }) => (
        <li key={document.id} className={styles.item}>
          <article className={styles.article}>
            <div className={styles.itemMeta}>
              <TypeBadge type={document.type} />
              <span className={styles.url}>{document.url}</span>
            </div>
            <h2 className={styles.itemTitle}>
              <Link to={document.url} className={styles.itemLink}>
                {document.title}
              </Link>
            </h2>
            <p className={styles.itemDescription}>{document.description}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}

function Pagination({ state, pageCount }: { state: SearchUrlState; pageCount: number }) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Paginação dos resultados" className={styles.pagination}>
      <ul role="list" className={styles.chips}>
        {pages.map((page) => (
          <li key={page}>
            <Link
              to={hrefFor({ ...state, page })}
              className={cn(styles.chip, page === state.page && styles.chipActive)}
              aria-current={page === state.page ? 'page' : undefined}
              aria-label={`Página ${page}`}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SuggestedTerms() {
  return (
    <ul role="list" className={styles.chips} aria-label="Sugestões de busca">
      {SUGGESTED_TERMS.map((term) => (
        <li key={term}>
          <Link to={hrefFor({ term, sort: 'relevance', page: 1 })} className={styles.chip}>
            {term}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function EmptyPrompt() {
  return (
    <StateMessage
      title="O que você procura?"
      description={
        <>
          <p>Busque por serviços, tecnologias ou dúvidas. Algumas ideias:</p>
          <SuggestedTerms />
        </>
      }
    />
  );
}

function NoResults({ state }: { state: SearchUrlState }) {
  const filtered = Boolean(state.type);

  return (
    <StateMessage
      title={filtered ? 'Nada neste filtro' : 'Não encontramos esse termo'}
      description={
        <>
          <p>
            {filtered
              ? 'Tente remover o filtro de tipo.'
              : 'Verifique a grafia ou tente um termo mais amplo. Algumas ideias:'}
          </p>
          {!filtered && <SuggestedTerms />}
        </>
      }
      actions={
        <WhatsAppButton
          variant="outlined"
          color="inherit"
          message={`Olá! Procurei por "${state.term}" no site da ${site.name} e não encontrei. Podem me ajudar?`}
        >
          Perguntar no WhatsApp
        </WhatsAppButton>
      }
    />
  );
}
