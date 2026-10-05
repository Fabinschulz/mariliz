import { pathTo } from '@/shared/routing';
import { SearchIcon } from '@synthra.io/ui-kit';
import { Form } from 'react-router';
import styles from './search-form.module.scss';

interface SearchFormProps {
  id: string;
  defaultValue?: string;
}

/**
 * Busca por GET nativo para /busca: funciona antes da hidratação (ou sem JS)
 * e produz URLs compartilháveis. Usado na página de busca e na 404.
 */
export function SearchForm({ id, defaultValue }: SearchFormProps) {
  return (
    <Form method="get" action={pathTo('search')} role="search" className={styles.form}>
      <label htmlFor={id} className="visually-hidden">
        Termo de busca
      </label>
      <SearchIcon aria-hidden className={styles.icon} />
      <input
        // Remonta quando o termo da URL muda (campo não controlado).
        key={defaultValue}
        id={id}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Ex.: aplicativo, nuvem, IA"
        enterKeyHint="search"
        className={styles.input}
      />
      <button type="submit" className={styles.submit}>
        Buscar
      </button>
    </Form>
  );
}
