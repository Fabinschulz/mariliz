import { useSearchParams } from 'react-router';

import { Container, PageHeader } from '@/shared/components/ui';
import { useHydrated } from '@/shared/hooks';

import styles from './busca-page.module.scss';
import { parseSearchParams } from './core/url-state';
import { SearchForm } from './ui/search-form';
import { SearchResultsView } from './ui/search-results';

export function BuscaPage() {
  const [searchParams] = useSearchParams();
  const hydrated = useHydrated();
  // HTML pré-renderizado não conhece a query string: o estado da URL só é lido no cliente.
  const state = hydrated ? parseSearchParams(searchParams) : null;

  return (
    <>
      <PageHeader eyebrow="Busca" title="Buscar no site">
        <SearchForm id="search-page-input" defaultValue={state?.term} />
      </PageHeader>

      <Container className={styles.results}>{state && <SearchResultsView state={state} />}</Container>
    </>
  );
}
