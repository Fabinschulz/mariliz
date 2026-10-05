import { useDebouncedValue } from '@/shared/hooks';

import { tokenize } from '../core/normalize';
import { DEFAULT_SUGGESTION_LIMIT, type SearchQuery, type SearchResult, type SearchSuggestion } from '../core/types';
import { useProviderRequest } from './use-provider-request';

const SUGGESTION_DEBOUNCE_MS = 150;

function hasSearchableTerm(term: string): boolean {
  return tokenize(term).length > 0;
}

export function useSearchResults(query: SearchQuery | null) {
  const key = query && hasSearchableTerm(query.term) ? JSON.stringify(query) : null;
  return useProviderRequest<SearchResult>(key, (provider, signal) => provider.search(query!, signal));
}

/** Autocomplete: debounce para não consultar a cada tecla. */
export function useSuggestions(term: string) {
  const debouncedTerm = useDebouncedValue(term, SUGGESTION_DEBOUNCE_MS);
  const key = hasSearchableTerm(debouncedTerm) ? debouncedTerm : null;
  return useProviderRequest<SearchSuggestion[]>(key, (provider, signal) =>
    provider.suggest(debouncedTerm, DEFAULT_SUGGESTION_LIMIT, signal)
  );
}
