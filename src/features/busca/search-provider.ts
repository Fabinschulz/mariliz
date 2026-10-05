import { buildSearchIndex } from './content/build-search-index';
import { createLocalSearchProvider } from './core/local-provider';

/**
 * Composição: o único lugar que decide QUAL implementação de busca o site usa.
 * Este módulo (com o índice) é carregado sob demanda: ver loadSearchProvider.
 */
export const searchProvider = createLocalSearchProvider(buildSearchIndex());
