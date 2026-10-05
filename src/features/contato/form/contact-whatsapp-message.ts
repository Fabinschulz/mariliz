import type { ContactFormValues } from './contact-form-schema';

export const UNDECIDED_SERVICE_LABEL = 'Ainda não sei / quero orientação';

export function buildContactMessage(values: ContactFormValues, serviceName?: string): string {
  const company = values.company?.trim();
  const greeting = `Olá! Me chamo ${values.name.trim()}${company ? `, da ${company}` : ''}.`;
  const interest = `Interesse: ${serviceName ?? UNDECIDED_SERVICE_LABEL}`;

  return [greeting, interest, '', values.message.trim()].join('\n');
}
