import { Container, PageHeader } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { pageBreadcrumbs } from '@/shared/routing';
import styles from './privacidade-page.module.scss';

const breadcrumbs = pageBreadcrumbs('privacy');

const sections = [
  {
    title: 'Quais dados coletamos',
    body: 'Este site não armazena dados pessoais. O formulário de contato apenas monta uma mensagem no seu próprio navegador e a abre no WhatsApp: nada é enviado a servidores da Mariliz.'
  },
  {
    title: 'Atendimento pelo WhatsApp',
    body: 'Ao enviar a mensagem no WhatsApp, recebemos o seu número, nome de perfil e o conteúdo que você escolher compartilhar. O WhatsApp é um serviço da Meta, com política de privacidade própria.'
  },
  {
    title: 'Para que usamos',
    body: 'Usamos essas informações exclusivamente para responder ao seu contato e conduzir a conversa comercial que você iniciou. Não vendemos nem compartilhamos dados com terceiros para fins de marketing.'
  },
  {
    title: 'Base legal',
    body: 'O tratamento se baseia no legítimo interesse de responder a uma solicitação feita por você e, quando houver proposta, nos procedimentos preliminares de um contrato (LGPD, art. 7º).'
  },
  {
    title: 'Por quanto tempo guardamos',
    body: 'Mantemos as conversas pelo tempo necessário para a finalidade do contato ou enquanto houver relação comercial, e as excluímos quando deixam de ser necessárias.'
  },
  {
    title: 'Cookies e medição',
    body: 'Este site não usa cookies de publicidade nem ferramentas de rastreamento.'
  },
  {
    title: 'Seus direitos',
    body: `Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo WhatsApp ${site.whatsapp.display}.`
  }
];

export function PrivacidadePage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacidade"
        title="Política de privacidade"
        intro="Como tratamos dados pessoais neste site e no atendimento pelo WhatsApp, de acordo com a Lei Geral de Proteção de Dados (LGPD)."
        breadcrumbs={breadcrumbs}
      />
      <Container size="narrow" className={styles.content}>
        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.title}>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </Container>
    </>
  );
}
