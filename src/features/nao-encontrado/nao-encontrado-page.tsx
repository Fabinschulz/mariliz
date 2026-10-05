import { ArrowRightIcon, Button } from '@synthra.io/ui-kit';

import { SearchForm } from '@/features/busca';
import { Container, StateMessage, WhatsAppButton } from '@/shared/components';
import { pathTo } from '@/shared/routing';

import styles from './nao-encontrado-page.module.scss';

/**
 * 404: em vez de um beco sem saída, oferece busca, os caminhos mais prováveis e
 * o WhatsApp. Vive em `app` porque compõe features (busca) com o shell.
 */
export function NaoEncontradoPage() {
  return (
    <Container className={styles.page}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <StateMessage
        headingLevel="h1"
        title="Página não encontrada"
        description={
          <>
            <p>O endereço pode ter mudado ou não existir mais. Tente buscar o que procura:</p>
            <SearchForm id="not-found-search" />
          </>
        }
        actions={
          <>
            <Button href={pathTo('home')} variant="contained" endIcon={<ArrowRightIcon />}>
              Página inicial
            </Button>
            <Button href={pathTo('services')} variant="outlined" color="inherit">
              Ver serviços
            </Button>
            <WhatsAppButton variant="text" color="inherit">
              Perguntar no WhatsApp
            </WhatsAppButton>
          </>
        }
      />
    </Container>
  );
}
