# Design System

## Identidade

| Cor       | Papel                          | Onde aparece                                                                    |
| --------- | ------------------------------ | ------------------------------------------------------------------------------- |
| `#050C0C` | autoridade / tecnologia        | "ink": base do site (header, hero, faixas escuras, footer)                      |
| `#FFFFFF` | simplicidade / espaço          | faixas de respiro alternadas com o preto                                        |
| `#33C1BA` | inovação / ação / inteligência | **pontos pequenos**: CTAs, pontos-sinal, foco, ponto final do título, progresso |

Estética: ink + branco + pequenos pontos de turquesa + motion com GSAP. Motivo visual
"blueprint" (grade sutil, nós e conexões) e rótulos em mono.

Os neutros são tingidos de turquesa (`--neutral-*`): o ink `#050C0C` substitui o preto puro e a
"névoa" `#F1F7F6` (`--neutral-50`) é o terceiro tom claro. `#000000` continua como primitivo
(`--neutral-1000`), sem uso semântico.

## Superfícies

O preto é o tema base (`:root`). Cada faixa declara a sua superfície:

- `Section tone="dark"` (padrão), `"raised"` (ink elevado com grade), `"light"` (branco) ou `"mist"`
  (névoa `#F1F7F6`, alterna com o branco para dar ritmo sem voltar ao escuro).
- `tone="accent"`: turquesa cheio com texto e botões em ink (8,9:1; texto secundário teal-900
  5,2:1). Reservado ao `ContactCta`: o único fundo colorido do site, no ponto de conversão. O tema
  MUI tem a superfície `accent` equivalente.
- A mesma prop aplica os tokens CSS (`data-surface`) **e** o tema MUI/Synthra equivalente.

## Tokens

Primitivos (`--teal-*`, `--neutral-*`) → semânticos (`--color-primary`, `--color-text-muted`,
`--color-signal`...) → componentes. O tema MUI espelha os primitivos em
`shared/components/providers/brand-palette.ts` (um teste impede divergência).

## Contraste (WCAG 2.2, verificado)

| Par                                           | Razão         | Uso                             |
| --------------------------------------------- | ------------- | ------------------------------- |
| `#33C1BA` sobre branco                        | 2,2:1         | ❌ nunca como texto             |
| ink sobre `#33C1BA`                           | 8,9:1         | botões no ink, botão flutuante  |
| `#33C1BA` sobre ink                           | 8,9:1         | texto/realce no ink             |
| branco sobre teal-700 `#116B67`               | 6,3:1         | botões na faixa branca          |
| `--neutral-50` sobre ink                      | 18,2:1        | texto no ink                    |
| `--neutral-350` sobre ink                     | 8,2:1         | texto secundário no ink         |
| `--neutral-350` sobre `--neutral-900`         | 6,7:1         | texto secundário em superfícies |
| `--neutral-600` sobre branco / névoa          | 7,2:1 / 6,6:1 | texto secundário no claro       |
| borda de input `--neutral-400` / branco       | 3,1:1         | limite de controle (≥ 3:1)      |
| borda de input `--neutral-500` / ink          | 4,0:1         | limite de controle no escuro    |
| links da navbar (pílula ink 86%) sobre branco | 9,9:1         | navbar sobre faixas claras      |

O "ponto de turquesa" (`@include signal-dot`) é decorativo e usa o teal puro em qualquer superfície.

## Componentes

- **Synthra:** `Button`, `TextFormField`, `SelectFormField`, `FormProvider`, `Breadcrumb`, `Alert`,
  `Drawer` (menu mobile), `Modal` (busca), ícones.
- **Próprios** (`shared/components/ui`): atoms `Container`, `Logo`, `TagList`, `WhatsAppIcon`;
  molecules `Section`/`SectionHeader`, `PageHeader`, `FaqList`, `WhatsAppButton`;
  organisms `ContactCta`; templates `SplitLayout`. Comuns: `StateMessage`, `ErrorBoundary`, `ErrorContent`.

## Cards e rótulos

- Rótulo de seção (`@include eyebrow-pill`): mono, ponto de sinal e pílula com fundo leve da cor
  primária. Usado no `SectionHeader`, no `PageHeader` e no selo do hero.
- Cards (`ServiceGrid`): soltos, raio `--radius-lg`, contorno `--color-hairline`, fundo
  `--color-surface-raised` e `--shadow-card`; no hover sobem 4 px com `--ease-spring`.
- Cards de princípios: fundo `--color-surface`, sem sombra e sem numeração (não são sequência).
- `WhatsAppButton` `contained` (padrão) renderiza o `PillLink` com o ícone do WhatsApp no círculo:
  todo CTA principal de contato tem o mesmo desenho do hero e da navbar.

## Home: diferenciais

- `ServiceTabs` (servicos): seletor de frentes no padrão WAI-ARIA Tabs (setas, Home/End, foco
  móvel). Todos os painéis vão no HTML; só o ativo aparece. A home usa as abas; `/servicos` mantém
  os cards.
- `DeliveryLog` (home): janela de terminal com o pipeline de entrega, marcada como "exemplo" e sem
  números inventados. As linhas entram uma a uma com GSAP; sem JS ou com movimento reduzido, nasce
  completa. O cursor pisca 4 vezes (< 5 s, WCAG 2.2.2).
- `TechMarquee` (home): faixa de tecnologias que rola sozinha logo abaixo do hero, com as tecnologias
  derivadas dos serviços (sem duplicatas). Laço contínuo em CSS puro (lista duplicada, cópia com
  `aria-hidden`), bordas esmaecidas e pausa ao passar o mouse, ao focar e pelo botão (WCAG 2.2.2). Com
  `prefers-reduced-motion`, vira uma lista estática em linhas, sem cópia nem botão.
- Rodapé: cartão de contato com o WhatsApp em tamanho de título.
- Botão flutuante do WhatsApp sai de cena quando uma área com `data-hides-float` (CTA final e
  rodapé) está visível, e volta a aparecer ao rolar para cima.

## Navbar e hero

- Navbar em pílula flutuante, mesma largura (`--frame-max`) da coluna do hero.
- `PillLink` (molecule): CTA em pílula com o ícone num círculo - sólido (turquesa) ou contorno.
- Hero sobre `NeuralNetwork` (organism): nós e conexões em turquesa sobre preto, brilho lateral.
- A faixa de destaques usa compromissos verificáveis, nunca métricas inventadas.

## Tipografia

Geist (texto/display) e Geist Mono (rótulos), self-hosted, subset latin, com `preload`; aplicada
também a todas as variantes tipográficas do tema MUI. Títulos usam o eixo variável em peso 620
(`--font-weight-display`); hero com `--letter-spacing-display` (−0,045em) e entrelinha 1,03.

## Forma e profundidade

Raios 8 / 16 / 24 / 32 px + pílula. Sombras tingidas (`--shadow-card`) e brilho turquesa no CTA
sólido (`--shadow-glow`).

## Motion

CSS para hover/foco, entrada do botão flutuante e diagrama do hero; GSAP (lazy) para revelações e
progresso do método. Tudo respeita `prefers-reduced-motion`.

Curvas: `--ease-spring` (`cubic-bezier(.32,.72,0,1)`, hover e estados, `--duration-slow` 500 ms) e
`--ease-expo` (`cubic-bezier(.16,1,.3,1)`, entradas). As revelações do GSAP usam `expo.out` em
950 ms com opacidade, deslocamento e blur.
