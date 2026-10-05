import { z } from 'zod';

export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome (pelo menos 2 caracteres).'),
  company: z.string().trim().max(120, 'Use no máximo 120 caracteres.').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, `Conte um pouco mais (pelo menos ${MESSAGE_MIN_LENGTH} caracteres).`)
    .max(MESSAGE_MAX_LENGTH, `Use no máximo ${MESSAGE_MAX_LENGTH} caracteres.`)
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function defaultContactForm(service = ''): ContactFormValues {
  return { name: '', company: '', service, message: '' };
}
