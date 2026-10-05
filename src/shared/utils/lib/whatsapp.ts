import { site } from '../../config/site';

/** Link wa.me com mensagem pré-preenchida (abre o app no celular, o WhatsApp Web no desktop). */
export function whatsappUrl(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Abre o WhatsApp numa nova aba preservando o site. Se o navegador bloquear o
 * pop-up, navega na mesma aba para a mensagem montada não se perder.
 */
export function openWhatsApp(message?: string): void {
  const url = whatsappUrl(message);
  const opened = window.open(url, '_blank');
  if (opened) opened.opener = null;
  else window.location.assign(url);
}
