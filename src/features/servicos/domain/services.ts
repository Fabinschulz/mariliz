import type { Service } from './types';

export const services: readonly Service[] = [
  {
    slug: 'aplicacoes-web',
    name: 'Aplicações web',
    shortName: 'Web',
    summary: 'Plataformas, portais e sistemas internos rápidos, acessíveis e preparados para crescer sem reescrita.',
    seo: {
      title: 'Desenvolvimento de aplicações web sob medida',
      description:
        'Desenvolvimento de sistemas web, portais e plataformas SaaS com foco em performance, acessibilidade e arquitetura sustentável. Conheça como a Mariliz trabalha.'
    },
    headline: 'Aplicações web que continuam rápidas quando o negócio cresce.',
    intro:
      'Do portal do cliente ao sistema que roda a operação: desenhamos a arquitetura, construímos a interface e cuidamos da base para que cada nova funcionalidade custe menos que a anterior.',
    problems: [
      {
        title: 'Sistema legado travando a operação',
        description: 'Modernização incremental, módulo a módulo, sem congelar o negócio durante a migração.'
      },
      {
        title: 'Produto novo que precisa ir ao ar',
        description: 'Escopo enxuto, entregas semanais e uma base técnica que não precisa ser descartada depois do MVP.'
      },
      {
        title: 'Lentidão e baixa conversão',
        description: 'Diagnóstico de Core Web Vitals, renderização e carregamento, com metas mensuráveis.'
      }
    ],
    deliverables: [
      'Arquitetura de frontend e backend documentada',
      'Design system implementado em componentes',
      'APIs com contratos versionados',
      'Testes automatizados e pipeline de CI/CD',
      'Monitoramento de erros e performance em produção',
      'Acessibilidade WCAG 2.2 AA como critério de aceite'
    ],
    stack: ['TypeScript', 'React', 'Node.js', '.NET', 'PostgreSQL', 'GraphQL', 'REST'],
    faq: [
      {
        question: 'Vocês trabalham com sistemas que já existem?',
        answer:
          'Sim. Começamos por um diagnóstico do código, da infraestrutura e dos gargalos do time, e propomos um plano de evolução que pode ser executado em paralelo à operação.'
      },
      {
        question: 'O código fica com a minha empresa?',
        answer: 'Sempre. Repositórios, documentação e acessos ficam na sua organização desde o primeiro dia.'
      }
    ],
    keywords: ['site', 'portal', 'saas', 'sistema', 'frontend', 'backend', 'react', 'api', 'legado']
  },
  {
    slug: 'aplicativos-mobile',
    name: 'Aplicativos mobile',
    shortName: 'Mobile',
    summary:
      'Apps iOS e Android com Flutter e React Native, publicação nas lojas e evolução contínua depois do lançamento.',
    seo: {
      title: 'Desenvolvimento de aplicativos iOS e Android',
      description:
        'Criação de aplicativos mobile para iOS e Android: produto, design, desenvolvimento, publicação nas lojas e evolução contínua. Saiba como a Mariliz pode ajudar.'
    },
    headline: 'Apps que as pessoas mantêm instalados.',
    intro:
      'Unimos produto, design e engenharia para criar aplicativos que resolvem uma tarefa real do usuário e que o seu time consegue manter, medir e evoluir.',
    problems: [
      {
        title: 'Levar um serviço para o bolso do cliente',
        description:
          'Do fluxo mais importante ao app publicado, com analytics e crash reporting desde a primeira versão.'
      },
      {
        title: 'App com avaliações ruins',
        description: 'Auditoria de estabilidade, performance e usabilidade, com um plano de correção priorizado.'
      },
      {
        title: 'Duas bases de código caras de manter',
        description:
          'Uma única base para iOS e Android, com Flutter ou React Native, escolhida pelo seu produto e pelo seu time.'
      }
    ],
    deliverables: [
      'Protótipos navegáveis validados com usuários',
      'Apps iOS e Android publicados nas lojas',
      'Notificações, deep links e modo offline quando fizer sentido',
      'Pipeline de build e distribuição automatizados',
      'Crash reporting e métricas de uso'
    ],
    stack: ['Flutter', 'Dart', 'React Native', 'Expo', 'Firebase', 'TypeScript'],
    faq: [
      {
        question: 'Flutter ou React Native?',
        answer:
          'Os dois entregam iOS e Android a partir de uma única base de código. A escolha depende do produto, das integrações necessárias e do time que vai mantê-lo (Dart ou TypeScript). Recomendamos depois de entender o cenário, nunca antes.'
      },
      {
        question: 'Vocês publicam nas lojas?',
        answer: 'Sim. Cuidamos do processo de submissão na App Store e na Google Play, incluindo as revisões das lojas.'
      }
    ],
    keywords: ['app', 'aplicativo', 'ios', 'android', 'flutter', 'dart', 'react native', 'celular', 'smartphone']
  },
  {
    slug: 'infraestrutura-em-nuvem',
    name: 'Infraestrutura em nuvem',
    shortName: 'Cloud',
    summary: 'Ambientes na AWS, Azure ou GCP automatizados, observáveis e com custo sob controle.',
    seo: {
      title: 'Infraestrutura em nuvem, DevOps e redução de custos',
      description:
        'Arquitetura cloud na AWS, Azure e GCP, infraestrutura como código, CI/CD, observabilidade e otimização de custos. Veja como a Mariliz estrutura a sua nuvem.'
    },
    headline: 'Nuvem previsível: deploy sem medo e fatura sem susto.',
    intro:
      'Desenhamos e operamos infraestrutura como produto: versionada em código, monitorada de ponta a ponta e dimensionada para o que o seu sistema realmente precisa.',
    problems: [
      {
        title: 'Deploys manuais e arriscados',
        description: 'Pipelines automatizados com ambientes reproduzíveis e rollback em minutos.'
      },
      {
        title: 'Custo de nuvem crescendo sem explicação',
        description: 'Análise de consumo, rightsizing e arquitetura orientada a custo, com metas acordadas.'
      },
      {
        title: 'Incidentes descobertos pelo cliente',
        description: 'Observabilidade com logs, métricas, traces e alertas que importam.'
      }
    ],
    deliverables: [
      'Arquitetura de referência documentada',
      'Infraestrutura como código (Terraform, CDK ou Bicep)',
      'Pipelines de CI/CD com ambientes de staging',
      'Observabilidade e alertas com runbooks',
      'Relatório de custos e plano de otimização',
      'Revisão de segurança e controle de acesso'
    ],
    stack: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker', 'GitHub Actions'],
    faq: [
      {
        question: 'Vocês migram sistemas para a nuvem?',
        answer:
          'Sim, com um plano por etapas que começa pelos componentes de menor risco e mede o impacto de cada passo.'
      },
      {
        question: 'Fazem a operação no dia a dia?',
        answer: 'Podemos operar junto com o seu time ou entregar a operação documentada para que ele assuma.'
      }
    ],
    keywords: ['cloud', 'nuvem', 'aws', 'azure', 'gcp', 'devops', 'kubernetes', 'custos', 'ci/cd']
  },
  {
    slug: 'inteligencia-artificial',
    name: 'Sistemas de IA',
    shortName: 'IA',
    summary:
      'Assistentes, automações e modelos aplicados a processos reais, com avaliação, segurança e integração aos seus sistemas.',
    seo: {
      title: 'Desenvolvimento de sistemas de inteligência artificial',
      description:
        'Assistentes com LLMs, RAG, automação de processos e modelos de machine learning integrados aos seus sistemas, com avaliação e segurança. Conheça a abordagem da Mariliz.'
    },
    headline: 'IA aplicada ao que o seu negócio já faz, medida pelo resultado.',
    intro:
      'Partimos do processo, não da tecnologia. Identificamos onde a IA gera ganho concreto, construímos com avaliação contínua e integramos aos sistemas que o seu time já usa.',
    problems: [
      {
        title: 'Conhecimento espalhado em documentos',
        description: 'Assistentes com busca semântica (RAG) que respondem com fontes, dentro das suas regras de acesso.'
      },
      {
        title: 'Tarefas repetitivas consumindo o time',
        description: 'Automação de triagem, extração e classificação com revisão humana onde o risco exige.'
      },
      {
        title: 'Piloto de IA que não chega à produção',
        description: 'Avaliação, observabilidade e custos por requisição definidos antes da escala.'
      }
    ],
    deliverables: [
      'Mapeamento de casos de uso com estimativa de impacto',
      'Prova de conceito com critérios de sucesso definidos',
      'Pipelines de dados e avaliação de qualidade',
      'Integração com sistemas e APIs existentes',
      'Guardrails, privacidade e controle de acesso',
      'Monitoramento de qualidade e custo em produção'
    ],
    stack: ['LLMs', 'RAG', 'Python', 'Bancos vetoriais', 'Agentes', 'MLOps'],
    faq: [
      {
        question: 'Meus dados ficam seguros?',
        answer:
          'Definimos com você onde os dados ficam, quem acessa e quais provedores são usados. Dados sensíveis podem permanecer na sua infraestrutura.'
      },
      {
        question: 'Como saber se a IA está funcionando?',
        answer:
          'Cada solução nasce com um conjunto de avaliação e métricas de negócio. Sem medição, não há ida para produção.'
      }
    ],
    keywords: [
      'ia',
      'inteligência artificial',
      'llm',
      'chatbot',
      'assistente',
      'rag',
      'machine learning',
      'automação',
      'agentes'
    ]
  }
];

export function getService(slug: string | undefined): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/** Mensagem pré-preenchida do WhatsApp para quem chega por uma página de serviço. */
export function serviceWhatsAppMessage(service: Pick<Service, 'name'>): string {
  return `Olá! Vim pelo site da Mariliz e quero conversar sobre ${service.name.toLowerCase()}.`;
}
