import { SEARCH_DOCUMENT_TYPES, type SearchDocumentType, type SearchQuery, type SearchSort } from './types';

/** Nomes de parâmetro em português: a URL também é interface com o usuário. */
const PARAM = { term: 'q', type: 'tipo', sort: 'ordem', page: 'pagina' } as const;

const SORT_TO_URL: Record<SearchSort, string> = { relevance: 'relevancia', title: 'titulo' };
const URL_TO_SORT: Record<string, SearchSort> = { relevancia: 'relevance', titulo: 'title' };

export const SEARCH_PAGE_SIZE = 8;

export interface SearchUrlState {
  term: string;
  type?: SearchDocumentType;
  sort: SearchSort;
  page: number;
}

function parseType(value: string | null): SearchDocumentType | undefined {
  return SEARCH_DOCUMENT_TYPES.find((type) => type === value);
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function parseSearchParams(params: URLSearchParams): SearchUrlState {
  return {
    term: (params.get(PARAM.term) ?? '').trim(),
    type: parseType(params.get(PARAM.type)),
    sort: URL_TO_SORT[params.get(PARAM.sort) ?? ''] ?? 'relevance',
    page: parsePage(params.get(PARAM.page))
  };
}

/** Só serializa o que difere do padrão: URLs curtas e canônicas. */
export function toSearchParams(state: SearchUrlState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.term) params.set(PARAM.term, state.term);
  if (state.type) params.set(PARAM.type, state.type);
  if (state.sort !== 'relevance') params.set(PARAM.sort, SORT_TO_URL[state.sort]);
  if (state.page > 1) params.set(PARAM.page, String(state.page));
  return params;
}

export function toSearchQuery(state: SearchUrlState): SearchQuery {
  return {
    term: state.term,
    types: state.type ? [state.type] : undefined,
    sort: state.sort,
    page: state.page,
    pageSize: SEARCH_PAGE_SIZE
  };
}
