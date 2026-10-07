# Mariliz Web

Site institucional e comercial da Mariliz: engenharia de software, cloud e IA.

React 19 · React Router 8 (framework mode, pré-renderizado) · Vite 8 · TypeScript · Synthra UI (MUI + Emotion) · SCSS Modules · GSAP · Zod · Vitest.

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | O que faz                                                     |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento com HMR                           |
| `npm run build`     | Build de produção + HTML estático por rota em `build/client`  |
| `npm run preview`   | Serve `build/client` como a Vercel serviria (inclui 404 real) |
| `npm run check`     | typecheck + lint + format:check + testes (rodar antes de PR)  |
| `npm test`          | Testes (Vitest)                                               |
| `npm run assets:og` | Regera favicon, ícones e imagem Open Graph a partir dos SVGs  |

## Variáveis de ambiente

Copie `.env.example` para `.env`.

| Variável        | Uso                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL` | URL canônica (canonical, Open Graph, sitemap, JSON-LD). Padrão: `https://www.marilize.com.br` |

O contato é só por WhatsApp; número e mensagem padrão ficam em `src/shared/config/site.ts`.

## Deploy (Vercel)

`vercel.json` já define build, diretório de saída (`build/client`), URLs limpas, headers de
segurança e cache imutável para `/assets`. Configure `VITE_SITE_URL` no projeto da Vercel.
URLs inexistentes recebem `404.html` com status 404.

## Onde está cada coisa

Arquitetura no padrão do frontend EmpregaNet (`app → features → shared`, verificado pelo ESLint).

- **Adicionar uma página:** crie `src/app/routes/<rota>.tsx` (meta + componente da feature) e
  registre-a em `src/shared/routing/route-manifest.ts`.
- **Conteúdo (serviços, FAQ, método):** `src/features/*/domain/`.
- **WhatsApp (número, mensagem padrão):** `src/shared/config/site.ts`.
- **Cores, tipografia, espaçamento:** `src/shared/styles/_tokens.scss` e o tema Synthra em
  `src/shared/components/providers/`.
- **Decisões de arquitetura e trade-offs:** [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- **Design system:** [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).
- **Estado atual e próximos passos:** [docs/HANDOFF.md](docs/HANDOFF.md).
