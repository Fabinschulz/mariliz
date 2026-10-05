import { normalizeText, tokenize } from './normalize';
import {
  DEFAULT_SUGGESTION_LIMIT,
  SEARCH_DOCUMENT_TYPES,
  type SearchDocument,
  type SearchDocumentType,
  type SearchHit,
  type SearchProvider,
  type SearchQuery,
  type SearchResult
} from './types';

const DEFAULT_PAGE_SIZE = 10;

/** Peso de cada campo na pontuação: título vale mais que corpo. */
const FIELD_WEIGHTS = { title: 8, keywords: 5, description: 3, body: 1 } as const;
type Field = keyof typeof FIELD_WEIGHTS;

/** Match no início de palavra pontua menos que palavra inteira. */
const PREFIX_FACTOR = 0.6;

interface IndexedDocument {
  document: SearchDocument;
  words: Record<Field, string[]>;
}

function toWords(text: string | undefined): string[] {
  return text ? normalizeText(text).split(' ') : [];
}

function indexDocument(document: SearchDocument): IndexedDocument {
  return {
    document,
    words: {
      title: toWords(document.title),
      keywords: toWords(document.keywords?.join(' ')),
      description: toWords(document.description),
      body: toWords(document.body)
    }
  };
}

function scoreToken(words: string[], token: string, allowPrefix: boolean): number {
  if (words.includes(token)) return 1;
  if (allowPrefix && words.some((word) => word.startsWith(token))) return PREFIX_FACTOR;
  return 0;
}

function scoreDocument(indexed: IndexedDocument, tokens: string[]): number {
  let total = 0;

  for (const [position, token] of tokens.entries()) {
    const allowPrefix = position === tokens.length - 1;
    let tokenScore = 0;

    for (const field of Object.keys(FIELD_WEIGHTS) as Field[]) {
      tokenScore += scoreToken(indexed.words[field], token, allowPrefix) * FIELD_WEIGHTS[field];
    }

    if (tokenScore === 0) return 0;
    total += tokenScore;
  }

  return total;
}

function countByType(hits: SearchHit[]): Record<SearchDocumentType, number> {
  const facets = Object.fromEntries(SEARCH_DOCUMENT_TYPES.map((type) => [type, 0])) as Record<
    SearchDocumentType,
    number
  >;
  for (const hit of hits) facets[hit.document.type] += 1;
  return facets;
}

const byTitle = (a: SearchHit, b: SearchHit) => a.document.title.localeCompare(b.document.title, 'pt-BR');
const byRelevance = (a: SearchHit, b: SearchHit) => b.score - a.score || byTitle(a, b);

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException('Busca cancelada', 'AbortError');
}

export function createLocalSearchProvider(documents: SearchDocument[]): SearchProvider {
  const index = documents.map(indexDocument);

  function findHits(term: string): SearchHit[] {
    const tokens = tokenize(term);
    if (tokens.length === 0) return [];

    return index
      .map((indexed) => ({ document: indexed.document, score: scoreDocument(indexed, tokens) }))
      .filter((hit) => hit.score > 0);
  }

  return {
    async search(
      { term, types, sort = 'relevance', page = 1, pageSize = DEFAULT_PAGE_SIZE }: SearchQuery,
      signal
    ): Promise<SearchResult> {
      throwIfAborted(signal);

      const allHits = findHits(term);
      const filtered = types?.length ? allHits.filter((hit) => types.includes(hit.document.type)) : allHits;
      const sorted = [...filtered].sort(sort === 'title' ? byTitle : byRelevance);

      const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
      const safePage = Math.min(Math.max(1, page), pageCount);
      const start = (safePage - 1) * pageSize;

      return {
        hits: sorted.slice(start, start + pageSize),
        total: sorted.length,
        page: safePage,
        pageCount,
        facets: countByType(allHits)
      };
    },

    async suggest(term, limit = DEFAULT_SUGGESTION_LIMIT, signal) {
      throwIfAborted(signal);

      return findHits(term)
        .sort(byRelevance)
        .slice(0, limit)
        .map(({ document }) => ({
          id: document.id,
          title: document.title,
          url: document.url,
          type: document.type
        }));
    }
  };
}
