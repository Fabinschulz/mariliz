import type { FaqItem, Highlight } from '@/shared/types';

import type { EngagementModel, ProcessStep } from './types';

export const processSteps: readonly ProcessStep[] = [
  {
    id: 'descoberta',
    title: 'Descoberta',
    description:
      'Entendemos o negócio, os usuários e as restrições antes de escrever código. Saímos com o problema certo descrito.',
    output: 'Escopo, riscos e critérios de sucesso'
  },
  {
    id: 'arquitetura',
    title: 'Arquitetura',
    description:
      'Desenhamos a solução mais simples que atende aos requisitos e documentamos por que as alternativas ficaram de fora.',
    output: 'Decisões técnicas registradas'
  },
  {
    id: 'entrega',
    title: 'Entrega contínua',
    description:
      'Ciclos curtos com software funcionando em ambiente real. Você acompanha o progresso pelo produto, não por relatórios.',
    output: 'Incrementos em produção'
  },
  {
    id: 'evolucao',
    title: 'Operação e evolução',
    description: 'Monitoramos, medimos e evoluímos. Ou transferimos tudo documentado para o seu time seguir sozinho.',
    output: 'Sistema observável e time autônomo'
  }
];

export const principles: readonly Highlight[] = [
  {
    title: 'O código é seu',
    description: 'Repositórios, contas de nuvem e documentação ficam na sua organização desde o primeiro commit.'
  },
  {
    title: 'Simples antes de sofisticado',
    description: 'A melhor arquitetura é a menor que resolve o problema. Complexidade só entra quando se paga.'
  },
  {
    title: 'Medido em produção',
    description: 'Performance, erros, custo e uso são observados desde a primeira entrega, e não depois do incidente.'
  },
  {
    title: 'Segurança por padrão',
    description: 'Acessos mínimos, segredos fora do código, dependências auditadas e LGPD considerada no desenho.'
  }
];

export const engagementModels: readonly EngagementModel[] = [
  {
    id: 'projeto',
    name: 'Projeto com escopo definido',
    bestFor: 'Produtos novos, MVPs e migrações com objetivo claro',
    description: 'Escopo, prazo e investimento acordados no início, com entregas incrementais.'
  },
  {
    id: 'squad',
    name: 'Squad dedicado',
    bestFor: 'Produtos em evolução contínua',
    description: 'Um time multidisciplinar integrado ao seu, com prioridades revisadas a cada ciclo.'
  },
  {
    id: 'diagnostico',
    name: 'Diagnóstico técnico',
    bestFor: 'Decisões de arquitetura, custos de nuvem e sistemas legados',
    description: 'Avaliação objetiva com recomendações priorizadas por impacto e esforço.'
  }
];

export const generalFaq: readonly FaqItem[] = [
  {
    question: 'Qual o tamanho de projeto que vocês atendem?',
    answer:
      'De diagnósticos de poucas semanas a produtos que evoluímos continuamente. O ponto de partida é sempre uma conversa sobre o problema.'
  },
  {
    question: 'Como funciona o primeiro contato?',
    answer:
      'Você chama a gente no WhatsApp e conta o contexto. A partir daí combinamos uma conversa de 30 minutos, sem custo e sem compromisso.'
  },
  {
    question: 'Vocês trabalham com o meu time interno?',
    answer:
      'Sim. Boa parte dos projetos acontece lado a lado com times internos, com transferência de conhecimento planejada.'
  },
  {
    question: 'O trabalho é remoto?',
    answer:
      'Trabalhamos de forma remota com empresas de todo o Brasil, com encontros presenciais quando o projeto pede.'
  }
];
