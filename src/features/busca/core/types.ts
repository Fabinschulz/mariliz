/**
 * Contrato da busca. A UI depende só destes tipos, nunca de uma implementação.
 * Trocar o índice local por uma API ou um motor externo (Algolia, Meilisearch,
 * Typesense) = nova implementação de SearchProvider.
 */

export const SEARCH_DOCUMENT_TYPES = ['servico', 'pagina', 'pergunta'] as const;
export type SearchDocumentType = (typeof SEARCH_DOCUMENT_TYPES)[number];

export const DEFAULT_SUGGESTION_LIMIT = 6;

export interface SearchDocument {
  id: string;
  type: SearchDocumentType;
  title: string;
  description: string;
  url: string;
  /** Termos extras que não aparecem no texto mas devem encontrar o documento. */
  keywords?: string[];
  body?: string;
}

export type SearchSort = 'relevance' | 'title';

export interface SearchQuery {
  term: string;
  types?: SearchDocumentType[];
  sort?: SearchSort;
  /** 1-based. */
  page?: number;
  pageSize?: number;
}

export interface SearchHit {
  document: SearchDocument;
  score: number;
}

export interface SearchResult {
  hits: SearchHit[];
  total: number;
  page: number;
  pageCount: number;
  /** Contagem por tipo para os resultados do termo (antes do filtro de tipo). */
  facets: Record<SearchDocumentType, number>;
}

export interface SearchSuggestion {
  id: string;
  title: string;
  url: string;
  type: SearchDocumentType;
}

export interface SearchProvider {
  search(query: SearchQuery, signal?: AbortSignal): Promise<SearchResult>;
  suggest(term: string, limit?: number, signal?: AbortSignal): Promise<SearchSuggestion[]>;
}

export const searchTypeLabels: Record<SearchDocumentType, string> = {
  servico: 'Serviços',
  pagina: 'Páginas',
  pergunta: 'Perguntas'
};
