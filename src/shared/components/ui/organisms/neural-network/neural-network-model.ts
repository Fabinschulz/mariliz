/**
 * Modelo puro da rede neural decorativa (sem DOM): nós que derivam devagar e
 * as conexões entre vizinhos próximos. O desenho e o ciclo de vida ficam no
 * componente; aqui só há matemática, fácil de testar e barata de executar.
 */

export interface NeuralNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** Nós "hub" ganham brilho: dão hierarquia à malha, como sinapses mais ativas. */
  hub: boolean;
}

export interface NeuralLink {
  from: NeuralNode;
  to: NeuralNode;
  /** 0–1: quanto mais perto, mais forte a conexão. */
  strength: number;
}

export interface NetworkConfig {
  /** Área (px²) por nó: controla a densidade em qualquer tamanho de tela. */
  areaPerNode: number;
  minNodes: number;
  maxNodes: number;
  /** Distância máxima (px) para dois nós se conectarem. */
  linkDistance: number;
  /** Velocidade máxima de deriva (px por frame a 60fps). */
  maxSpeed: number;
  hubRatio: number;
}

export const defaultNetworkConfig: NetworkConfig = {
  areaPerNode: 16000,
  minNodes: 18,
  maxNodes: 80,
  linkDistance: 150,
  maxSpeed: 0.22,
  hubRatio: 0.12
};

export type RandomSource = () => number;

export function nodeCountFor(width: number, height: number, config = defaultNetworkConfig): number {
  const count = Math.round((width * height) / config.areaPerNode);
  return Math.min(config.maxNodes, Math.max(config.minNodes, count));
}

export function createNodes(
  width: number,
  height: number,
  config = defaultNetworkConfig,
  random: RandomSource = Math.random
): NeuralNode[] {
  return Array.from({ length: nodeCountFor(width, height, config) }, () => {
    const hub = random() < config.hubRatio;
    const angle = random() * Math.PI * 2;
    const speed = (0.25 + random() * 0.75) * config.maxSpeed;
    return {
      x: random() * width,
      y: random() * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: hub ? 2.4 + random() * 1.2 : 1 + random() * 1.1,
      hub
    };
  });
}

/** Avança a simulação; `frames` = quantos frames de 60fps se passaram (independe do refresh rate). */
export function stepNodes(nodes: NeuralNode[], width: number, height: number, frames: number): void {
  for (const node of nodes) {
    node.x += node.vx * frames;
    node.y += node.vy * frames;

    // Rebate nas bordas: a malha nunca "esvazia" um lado da tela.
    if (node.x < 0 || node.x > width) {
      node.vx *= -1;
      node.x = Math.min(width, Math.max(0, node.x));
    }
    if (node.y < 0 || node.y > height) {
      node.vy *= -1;
      node.y = Math.min(height, Math.max(0, node.y));
    }
  }
}

/** Conexões entre pares próximos. O(n²) com n ≤ maxNodes (≈3 mil pares): barato o bastante por frame. */
export function findLinks(nodes: NeuralNode[], linkDistance: number): NeuralLink[] {
  const links: NeuralLink[] = [];
  const maxSquared = linkDistance * linkDistance;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const from = nodes[i]!;
      const to = nodes[j]!;
      const dx = from.x - to.x;
      const dy = from.y - to.y;
      const squared = dx * dx + dy * dy;
      if (squared < maxSquared) links.push({ from, to, strength: 1 - Math.sqrt(squared) / linkDistance });
    }
  }

  return links;
}
