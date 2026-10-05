import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, FormProvider, SelectFormField, TextFormField } from '@synthra.io/ui-kit';
import { useState } from 'react';

import { services } from '@/features/servicos';
import { PillLink, WhatsAppIcon } from '@/shared/components/ui';
import { site } from '@/shared/config/site';
import { externalLinkProps, openWhatsApp, whatsappUrl } from '@/shared/utils';

import {
    contactFormSchema,
    defaultContactForm,
    MESSAGE_MAX_LENGTH,
    type ContactFormValues
} from './contact-form-schema';
import styles from './contact-form.module.scss';
import { buildContactMessage, UNDECIDED_SERVICE_LABEL } from './contact-whatsapp-message';

const STATIC_LABEL = { inputLabel: { shrink: true } } as const;

const serviceOptions = [
  { value: '', label: UNDECIDED_SERVICE_LABEL },
  ...services.map((service) => ({ value: service.slug, label: service.name }))
];

function serviceName(slug: string | undefined): string | undefined {
  return services.find((service) => service.slug === slug)?.name;
}

function isKnownService(slug: string): boolean {
  return serviceOptions.some((option) => option.value === slug);
}

export interface ContactFormProps {
  initialService?: string;
}

export function ContactForm({ initialService = '' }: ContactFormProps) {
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const defaults = defaultContactForm(isKnownService(initialService) ? initialService : '');

  function handleSubmit(values: ContactFormValues) {
    const message = buildContactMessage(values, serviceName(values.service));
    setSentMessage(message);
    openWhatsApp(message);
  }

  return (
    <FormProvider<ContactFormValues>
      resolver={zodResolver(contactFormSchema)}
      defaultValues={defaults}
      onSubmit={handleSubmit}
    >
      <div className={styles.fields}>
        <div className={styles.row}>
          <TextFormField
            name="name"
            label="Nome completo"
            placeholder="Como podemos te chamar"
            autoComplete="name"
            required
            fullWidth
            slotProps={STATIC_LABEL}
          />
          <TextFormField
            name="company"
            label="Empresa"
            placeholder="Razão social ou nome fantasia"
            autoComplete="organization"
            fullWidth
            slotProps={STATIC_LABEL}
          />
        </div>
        <SelectFormField name="service" label="Frente de interesse" options={serviceOptions} fullWidth />
        <TextFormField
          name="message"
          label="Como podemos ajudar"
          placeholder="Conte rapidamente o contexto, o objetivo e o prazo, se houver."
          multiline
          minRows={4}
          required
          fullWidth
          slotProps={{ ...STATIC_LABEL, htmlInput: { maxLength: MESSAGE_MAX_LENGTH } }}
        />

        <div className={styles.actions}>
          <PillLink type="submit" size="large" icon={<WhatsAppIcon />} className={styles.submit}>
            Enviar contato
          </PillLink>
          <p className={styles.note}>
            Ao enviar, abrimos o WhatsApp com a mensagem pronta para você revisar, e você concorda que a {site.name}{' '}
            utilize seus dados para retornar este contato.
          </p>
        </div>

        {sentMessage && (
          <Alert severity="success" role="status" title="Abrimos o WhatsApp com a sua mensagem">
            Se ele não abriu,{' '}
            <a href={whatsappUrl(sentMessage)} {...externalLinkProps}>
              toque aqui para tentar de novo
            </a>
            .
          </Alert>
        )}
      </div>
    </FormProvider>
  );
}
