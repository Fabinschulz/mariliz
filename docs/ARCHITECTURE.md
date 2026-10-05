# Mariliz Web - Arquitetura

Documento vivo com as decisões que moldam o site e os trade-offs de cada uma.

## 1. Contexto

**Mariliz:** empresa de tecnologia (aplicações web, apps mobile, infraestrutura em nuvem e
sistemas de IA) para empresas. **Objetivo do site:** gerar conversas comerciais qualificadas.
**Canal único de contato:** WhatsApp `(11) 94368-5632`.

**Restrições:** React + Vite + TypeScript + SCSS + React Router + GSAP, sem Next.js. UI com a
biblioteca **Synthra** (`@synthra.io/ui-kit`). Hospedagem Vercel. pt-BR.

**Conteúdo:** nada de números, clientes ou depoimentos inventados.

## 2. Páginas

| Rota              | Página                  | Indexável |
| ----------------- | ----------------------- | --------- |
| `/`               | Home                    | sim       |
| `/servicos`       | Serviços                | sim       |
| `/servicos/:slug` | Web, Mobile, Cloud, IA  | sim       |
| `/sobre`          | Sobre                   | sim       |
| `/contato`        | Contato (WhatsApp)      | sim       |
| `/busca`          | Busca (`?q=`)           | noindex   |
| `/privacidade`    | Política de privacidade | sim       |
| `*`               | 404 (status real)       | noindex   |

## 3. Renderização: React Router framework mode, pré-renderizado

| Alternativa                                      | Por que não                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------------------------ |
| SPA pura                                         | OG/Twitter quebrados para crawlers sem JS, LCP pior                            |
| SPA + prerender próprio (Puppeteer)              | Build frágil e código de infraestrutura próprio                                |
| SSR em runtime                                   | Custo e latência de servidor para conteúdo estático                            |
| **RR framework mode, `ssr:false` + `prerender`** | ✔ HTML estático por rota, meta nativo, code splitting e ErrorBoundary por rota |

O Emotion (Synthra/MUI) injeta os estilos inline durante a pré-renderização: o HTML já chega
estilizado, sem flash.

## 4. Estrutura (Vite + React Router framework mode)

`src/app` segue a convenção do React Router (a mesma do template `create-react-router`):
`root.tsx`, `routes.ts`, `routes/` e `layouts/`. Nada de convenções do Next.js (grupos `(...)`,
`page.tsx`, `layout.tsx` por pasta, segmentos `[slug]`).

```text
src/
├── app/                       # só roteamento (appDirectory do React Router)
│   ├── root.tsx               # documento HTML, AppProviders, estilos globais, ErrorBoundary global
│   ├── routes.ts              # RouteConfig gerado do route-manifest
│   ├── static-paths.ts        # paths concretos (prerender + sitemap)
│   ├── layouts/
│   │   └── site-layout.tsx    # AppShell + slots vindos de features + ErrorBoundary de rota
│   └── routes/                # route modules finos: meta + componente da feature
│       ├── home.tsx · servicos.tsx · servico.tsx (/servicos/:slug)
│       ├── sobre.tsx · contato.tsx · busca.tsx · privacidade.tsx · not-found.tsx (*)
│       └── sitemap.xml.ts · robots.txt.ts   # resource routes (só loader)
├── features/                  # um slice por domínio (nomes em pt-BR)
│   ├── home/ · sobre/ · privacidade/ · nao-encontrado/
│   ├── servicos/{domain, list, detail, service-grid, index.ts}
│   ├── empresa/{domain, process-steps, principles-grid, index.ts}
│   ├── contato/{form, contato-page.tsx, index.ts}
│   └── busca/{core, hooks, content, ui, busca-page.tsx, index.ts}
└── shared/
    ├── components/
    │   ├── common/            # error/, state-message/
    │   ├── providers/         # AppProviders, tema MUI/Synthra, LinkBehavior
    │   └── ui/{atoms, molecules, organisms, templates}   # atomic design
    ├── shell/                 # AppShell, Header, MobileNav, Footer, WhatsAppFloat, RouteAnnouncer
    ├── routing/               # route-manifest (fonte única), paths, breadcrumbs
    ├── seo/                   # buildMeta, routeMeta, JSON-LD
    ├── config/site.ts         # nome, URL, WhatsApp
    ├── hooks/ · motion/ · types/ · styles/
    └── utils/lib/             # cn, env (Zod), telemetry, whatsapp
```

Regras (garantidas por ESLint, como no EmpregaNet):

- Camadas `app → features → shared`; `shared` não importa `features`/`app`, `features` não importa `app`.
- Proibido o mega-barrel `@/shared`; importe `@/shared/components`, `@/shared/utils`...
- Entre slices, só a API pública (`@/features/<slice>`); dentro do slice, caminhos relativos.
- Barrels de feature com exports nomeados (sem `export *`).
- Pastas kebab-case; componentes de `ui/` e `shell/` em PascalCase com `index.ts`; tipos derivados de Zod.

Composição em vez de dependência: o shell não conhece features. Ele recebe a busca
(`headerActions`) e os links de serviços (`footerServiceLinks`) de `app/layouts/site-layout.tsx`.

Exceção documentada: `app/static-paths.ts` importa `features/servicos/domain/services` direto,
porque é avaliado no Node pelo `react-router.config.ts` (o barrel puxaria componentes e SCSS).

## 5. Roteamento

- `shared/routing/route-manifest.ts` é dado puro e fonte única: router, prerender, sitemap,
  navegação, breadcrumbs, SEO e índice de busca leem dele.
- Nova página = route module em `src/app/routes/<rota>.tsx` + entrada no manifest (`file`
  relativo a `src/app`). O route module só exporta `meta` (tipado com `Route.MetaFunction`) e um
  componente que renderiza a página da feature; parâmetros chegam por `Route.ComponentProps`.
- A home é a `index` route do layout; `*` é a 404.
- Valores de rotas dinâmicas vêm das features via `app/static-paths.ts`.
- ErrorBoundary global no `root.tsx` e de rota no layout (header, footer e WhatsApp sobrevivem).

## 6. UI: Synthra (MUI v9 + Emotion)

**Decisão:** usar a Synthra nos componentes interativos (Button, campos e `FormProvider`,
Breadcrumb, Alert, Drawer, Modal, ícones) e manter SCSS Modules para layout e identidade.

**Trade-offs medidos (gzip):**

| Item                                | Antes      | Depois                  |
| ----------------------------------- | ---------- | ----------------------- |
| JS pré-carregado na home            | 133 KB     | 224 KB                  |
| Formulário (campos MUI + RHF + Zod) | -          | 40 KB, só em `/contato` |
| GSAP + ScrollTrigger                | 44 KB lazy | igual                   |

- O `DataGrid` (peer obrigatório) **fica fora do bundle** graças ao `sideEffects: false` da lib;
  restam só os overrides de tema e o locale pt-BR.
- A Synthra aplica `overrides` depois do `createTheme`, sem recalcular tons: o tema declara
  **todos** os tons (primary, secondary, brand, action) - senão sobra o azul padrão.
- A fonte é trocada variante a variante (a lib calcula as variantes com Lato).
- Superfície clara usa `primary` = teal-700 (texto/foco 6,3:1); a escura usa `#33C1BA` (9,5:1).
- `MuiPaper` sem o overlay claro do modo escuro; bordas de input com ≥ 3:1 (WCAG 1.4.11).
- `Section tone` aplica ao mesmo tempo os tokens CSS (`data-surface`) e o tema MUI equivalente.

## 7. Contato via WhatsApp (modelo advmariana.com.br, sem os problemas dele)

- Todos os CTAs são um único `<a href="https://wa.me/5511943685632?text=...">` (nunca `<a>`
  dentro de `<button>`), com mensagem pré-preenchida contextual (padrão, por serviço, por busca).
- Botão flutuante visível já no HTML pré-renderizado (entrada em CSS), com pulso curto que para.
- Formulário em `/contato` **não envia nada a servidores**: valida com Zod, monta a mensagem e abre o
  WhatsApp numa nova aba (com fallback na mesma aba se o pop-up for bloqueado) e oferece reabrir.

## 8. SEO

`buildMeta` (title, description, canonical, OG, Twitter, robots), `routeMeta` com BreadcrumbList
automático, `Organization` com `contactPoint` do WhatsApp, `WebSite` + `SearchAction`, `Service`.
Sitemap e robots pré-renderizados do manifest. 404 servido com status 404.

## 9. Busca

Core desacoplado (`SearchProvider`), índice local carregado sob demanda, autocomplete com ARIA
combobox dentro do `Modal` da Synthra, página de resultados com estado na URL.

## 10. Motion

- Navbar: pílula flutuante (fixed) e translúcida; o `<main>` reserva o espaço dela e os blocos de
  topo (hero, `PageHeader`) usam o mixin `bleed-under-header` para o fundo passar por trás.
- Hero: fundo de rede neural em canvas (`organisms/neural-network`): modelo puro e testado,
  renderizador que só anima na tela (IntersectionObserver), DPR ≤ 2, ≤ 80 nós, interação com o
  ponteiro só em desktop, quadro estático com movimento reduzido. O brilho é CSS e já vem no HTML.

- Hero: desenho das conexões em CSS (começa no primeiro frame; o `h1` é LCP e não anima).
- GSAP lazy, pós-hidratação: revelação de seções (só abaixo da dobra) e linha do método com scrub.
- `prefers-reduced-motion`, economia de dados e hardware modesto desligam efeitos.

## 11. Riscos e mitigação

| Risco                                | Mitigação                                              |
| ------------------------------------ | ------------------------------------------------------ |
| Peso de MUI + Emotion                | Tree-shaking, form só em `/contato`, Modal/busca lazy  |
| Duas fontes de cor (SCSS × tema MUI) | Teste garante que `brand-palette.ts` espelha os tokens |
| Hidratação × estado do cliente       | `useHydrated` para `?q=`/`?servico=`                   |
| Contraste de componentes MUI         | Overrides de tema por superfície                       |
