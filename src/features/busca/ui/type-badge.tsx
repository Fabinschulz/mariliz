import type { SearchDocumentType } from '../core/types';
import styles from './type-badge.module.scss';

const singularLabels: Record<SearchDocumentType, string> = {
  servico: 'Serviço',
  pagina: 'Página',
  pergunta: 'Pergunta'
};

export function TypeBadge({ type }: { type: SearchDocumentType }) {
  return <span className={styles.badge}>{singularLabels[type]}</span>;
}
