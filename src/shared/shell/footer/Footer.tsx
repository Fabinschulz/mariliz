import { Container, InstagramIcon, WhatsAppIcon } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { getRoute, type StaticRouteId } from '@/shared/routing';
import { externalLinkProps, whatsappUrl } from '@/shared/utils';
import { ArrowRightIcon } from '@synthra.io/ui-kit';
import { Link } from 'react-router';
import { BrandLink } from '../brand-link';
import styles from './footer.module.scss';

export interface FooterLink {
  label: string;
  to: string;
}

const COMPANY_ROUTES: StaticRouteId[] = ['about', 'contact', 'search', 'privacy'];

const companyLinks: FooterLink[] = COMPANY_ROUTES.map((id) => {
  const { label, path } = getRoute(id);
  return { label, to: path };
});

function FooterColumn({ id, title, links }: { id: string; title: string; links: FooterLink[] }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className={styles.columnTitle}>
        {title}
      </h2>
      <ul role="list" className={styles.linkList}>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} prefetch="intent" className={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Só o número é o link (esticado sobre o cartão), para o texto de apoio não entrar no nome. */
function ContactCard() {
  return (
    <div className={styles.contactCard}>
      <p className={styles.contactLabel}>
        <WhatsAppIcon fontSize="small" />
        Relacionamento com o Cliente
      </p>
      <a href={whatsappUrl()} {...externalLinkProps} className={styles.contactNumber}>
        {site.whatsapp.display}
        <span className="visually-hidden"> (WhatsApp, abre em nova aba)</span>
      </a>
      <p className={styles.contactHint}>
        Atendimento de Segunda a Sexta-Feira das 08h às 18h, exceto feriados. Este é o nosso WhatsApp para
        Relacionamento com o Cliente. Nele você pode tirar dúvidas, pedir suporte para os sistemas que desenvolvemos e
        operamos para você ou conversar sobre um novo projeto.
      </p>
      <span className={styles.contactArrow} aria-hidden="true">
        <ArrowRightIcon fontSize="inherit" />
      </span>
    </div>
  );
}

function SocialLinks() {
  const { instagram } = site.social;

  return (
    <ul role="list" aria-label="Redes sociais" className={styles.social}>
      <li>
        <a href={instagram.url} {...externalLinkProps} className={styles.socialLink}>
          <InstagramIcon fontSize="small" />
          {instagram.handle}
          <span className="visually-hidden"> no {instagram.label} (abre em nova aba)</span>
        </a>
      </li>
    </ul>
  );
}

export function Footer({ serviceLinks }: { serviceLinks: FooterLink[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-surface="dark" data-hides-float>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <BrandLink className={styles.logo} />
            <p className={styles.tagline}>{site.tagline}.</p>
            <ContactCard />
            <SocialLinks />
          </div>
          <FooterColumn id="footer-services" title="Serviços" links={serviceLinks} />
          <FooterColumn id="footer-company" title="Empresa" links={companyLinks} />
        </div>

        <div className={styles.legal}>
          <p>
            {site.legalName} · CNPJ {site.cnpj}
          </p>
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
