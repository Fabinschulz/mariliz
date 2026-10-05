# Handoff - estado em 05/10/2026

## Feito nesta etapa

- **Contato só por WhatsApp** `(11) 94368-5632`: CTAs com mensagem contextual, botão flutuante em
  todas as páginas e formulário que monta a mensagem e abre o WhatsApp (nada vai para servidor).
  E-mail e endpoint de formulário foram removidos.
- **Arquitetura no padrão do frontend EmpregaNet** (`app → features → shared`, atomic design,
  rotas finas em `src/app/routes` no padrão do React Router, barrels nomeados, ESLint garantindo
  as camadas).
- **Synthra (`@synthra.io/ui-kit`)** integrada com a paleta preto/branco/turquesa.
- **Identidade:** preto como base, faixas brancas alternadas, turquesa só em pontos.
- `npm run check` verde (50 testes) e build com 404 real; fluxo do formulário validado no navegador.

## Pendências que dependem de vocês

1. **Domínio definitivo** → `VITE_SITE_URL` (hoje `https://www.mariliz.com.br`).
2. **Revisão jurídica** da política de privacidade (texto-base atualizado para WhatsApp).
3. Revisar a copy em `src/features/*/domain` (ex.: "conversa de 30 minutos sem custo").
4. Redes sociais em `site.social` (alimenta o `sameAs` do JSON-LD).

## Próximos passos sugeridos

1. Revisão visual em Chrome real (desktop e celular) e Lighthouse - o navegador embutido desta
   sessão estava sem pintar a janela, então as animações foram verificadas só pelo DOM.
2. Avaliar o custo de MUI/Emotion no LCP real; se pesar, carregar o `ContactCta`/header com
   componentes próprios e manter a Synthra só nas áreas interativas.
3. Medir cliques no WhatsApp (evento simples ou UTM no texto) para acompanhar conversão.
4. Testes E2E (Playwright + axe) dos fluxos: WhatsApp, busca, menu mobile, 404.
5. Repositório git + CI (`npm run check`) + projeto na Vercel.
