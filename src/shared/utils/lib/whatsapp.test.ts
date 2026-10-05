import { site } from '../../config/site';
import { openWhatsApp, whatsappUrl } from './whatsapp';

describe('whatsappUrl', () => {
  it('usa wa.me com o número em E.164 e a mensagem padrão', () => {
    const url = new URL(whatsappUrl());
    expect(url.origin + url.pathname).toBe(`https://wa.me/${site.whatsapp.number}`);
    expect(url.searchParams.get('text')).toBe(site.whatsapp.defaultMessage);
  });

  it('preserva quebras de linha e acentos da mensagem', () => {
    const url = new URL(whatsappUrl('Olá!\nInteresse: IA'));
    expect(url.searchParams.get('text')).toBe('Olá!\nInteresse: IA');
  });
});

describe('openWhatsApp', () => {
  afterEach(() => vi.restoreAllMocks());

  it('abre em nova aba e corta o vínculo com o site (opener)', () => {
    const popup = { opener: window } as unknown as Window;
    const open = vi.spyOn(window, 'open').mockReturnValue(popup);
    openWhatsApp('Oi');
    expect(open).toHaveBeenCalledWith(whatsappUrl('Oi'), '_blank');
    expect(popup.opener).toBeNull();
  });

  it('com pop-up bloqueado, navega na mesma aba para não perder a mensagem', () => {
    vi.spyOn(window, 'open').mockReturnValue(null);
    const assign = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({ assign } as unknown as Location);
    openWhatsApp('Oi');
    expect(assign).toHaveBeenCalledWith(whatsappUrl('Oi'));
  });
});
