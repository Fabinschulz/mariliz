import {
  createNodes,
  defaultNetworkConfig,
  findLinks,
  nodeCountFor,
  stepNodes,
  type NeuralNode
} from './neural-network-model';

/** Gerador determinístico para testes reproduzíveis. */
function seededRandom(seed = 42) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const node = (x: number, y: number, vx = 0, vy = 0): NeuralNode => ({ x, y, vx, vy, radius: 1, hub: false });

describe('nodeCountFor', () => {
  it('escala a densidade com a área, dentro dos limites', () => {
    expect(nodeCountFor(375, 600)).toBe(defaultNetworkConfig.minNodes);
    expect(nodeCountFor(1280, 800)).toBe(64);
    expect(nodeCountFor(3840, 2160)).toBe(defaultNetworkConfig.maxNodes);
  });
});

describe('createNodes', () => {
  it('distribui os nós dentro da área com velocidade limitada', () => {
    const nodes = createNodes(1280, 800, defaultNetworkConfig, seededRandom());
    expect(nodes).toHaveLength(64);
    for (const { x, y, vx, vy } of nodes) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1280);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(800);
      expect(Math.hypot(vx, vy)).toBeLessThanOrEqual(defaultNetworkConfig.maxSpeed + 1e-9);
    }
  });
});

describe('stepNodes', () => {
  it('move proporcionalmente aos frames decorridos', () => {
    const nodes = [node(10, 10, 1, 2)];
    stepNodes(nodes, 100, 100, 2);
    expect(nodes[0]).toMatchObject({ x: 12, y: 14 });
  });

  it('rebate nas bordas e mantém o nó dentro da área', () => {
    const nodes = [node(99, 50, 5, 0)];
    stepNodes(nodes, 100, 100, 1);
    expect(nodes[0]).toMatchObject({ x: 100, vx: -5 });
  });
});

describe('findLinks', () => {
  it('conecta só vizinhos próximos, mais forte quanto mais perto', () => {
    const [a, b, c] = [node(0, 0), node(30, 40), node(500, 500)];
    const links = findLinks([a, b, c], 100);
    expect(links).toHaveLength(1);
    expect(links[0]).toMatchObject({ from: a, to: b, strength: 0.5 });
  });
});
