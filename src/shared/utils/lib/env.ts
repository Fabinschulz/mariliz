import { z } from 'zod';

const envSchema = z.object({
  VITE_SITE_URL: z
    .url()
    .default('https://www.mariliz.com.br')
    .transform((url) => url.replace(/\/+$/, ''))
});

export type PublicEnv = z.infer<typeof envSchema>;

/**
 * Variáveis públicas validadas na borda: um valor inválido quebra o build com
 * mensagem clara, em vez de gerar canonical/sitemap errados em silêncio.
 */
export function getPublicEnv(): PublicEnv {
  const parsed = envSchema.safeParse({ VITE_SITE_URL: import.meta.env?.VITE_SITE_URL || undefined });
  if (!parsed.success) throw new Error(`Env inválida: ${z.prettifyError(parsed.error)}`);
  return parsed.data;
}
