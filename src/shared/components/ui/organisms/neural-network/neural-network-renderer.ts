import { canAffordMotion, MOTION_OK_QUERY } from '@/shared/motion';

import { createNodes, defaultNetworkConfig, findLinks, stepNodes, type NeuralNode } from './neural-network-model';

const MAX_PIXEL_RATIO = 2;
const FRAME_MS = 1000 / 60;
/** Evita "saltos" depois de uma aba voltar do segundo plano. */
const MAX_FRAMES_PER_TICK = 3;
const POINTER_REACH = 180;

interface Pointer {
  x: number;
  y: number;
}

/** Cor do sinal da marca a partir do token CSS (fonte única), em "r g b". */
function signalRgb(element: Element): string {
  const hex = getComputedStyle(element).getPropertyValue('--color-signal').trim() || '#33c1ba';
  const value = Number.parseInt(hex.replace('#', ''), 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

function drawNetwork(context: CanvasRenderingContext2D, nodes: NeuralNode[], rgb: string, pointer: Pointer | null) {
  const { width, height } = context.canvas;
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  for (const { from, to, strength } of findLinks(nodes, defaultNetworkConfig.linkDistance)) {
    context.strokeStyle = `rgb(${rgb} / ${(strength * 0.32).toFixed(3)})`;
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
  }

  if (pointer) {
    for (const node of nodes) {
      const distance = Math.hypot(node.x - pointer.x, node.y - pointer.y);
      if (distance > POINTER_REACH) continue;
      context.strokeStyle = `rgb(${rgb} / ${((1 - distance / POINTER_REACH) * 0.45).toFixed(3)})`;
      context.beginPath();
      context.moveTo(pointer.x, pointer.y);
      context.lineTo(node.x, node.y);
      context.stroke();
    }
  }

  for (const node of nodes) {
    if (node.hub) {
      context.fillStyle = `rgb(${rgb} / 0.12)`;
      context.beginPath();
      context.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
      context.fill();
    }
    context.fillStyle = `rgb(${rgb} / ${node.hub ? 0.95 : 0.7})`;
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fill();
  }
}

/**
 * Liga a rede ao canvas e devolve a função de limpeza. Só anima quando está na
 * tela, com movimento permitido e em hardware que aguenta; caso contrário,
 * desenha um único quadro estático (o visual continua lá, sem custo contínuo).
 */
export function mountNeuralNetwork(canvas: HTMLCanvasElement): () => void {
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  const animated = window.matchMedia(MOTION_OK_QUERY).matches && canAffordMotion();
  const interactive = animated && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const rgb = signalRgb(canvas);

  let nodes: NeuralNode[] = [];
  let width = 0;
  let height = 0;
  let pointer: Pointer | null = null;
  let frameId = 0;
  let lastTime = 0;
  let onScreen = true;

  const render = () => drawNetwork(context, nodes, rgb, pointer);

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    nodes = createNodes(width, height);
    render();
  }

  function tick(time: number) {
    const frames = lastTime ? Math.min((time - lastTime) / FRAME_MS, MAX_FRAMES_PER_TICK) : 1;
    lastTime = time;
    stepNodes(nodes, width, height, frames);
    render();
    frameId = requestAnimationFrame(tick);
  }

  function start() {
    if (!animated || !onScreen || frameId) return;
    lastTime = 0;
    frameId = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(frameId);
    frameId = 0;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // Fora da tela, nenhum frame é gasto.
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    onScreen = Boolean(entry?.isIntersecting);
    if (onScreen) start();
    else stop();
  });
  visibilityObserver.observe(canvas);

  const host = canvas.parentElement;
  const trackPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const releasePointer = () => {
    pointer = null;
  };
  if (interactive && host) {
    host.addEventListener('pointermove', trackPointer);
    host.addEventListener('pointerleave', releasePointer);
  }

  resize();
  start();

  return () => {
    stop();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    host?.removeEventListener('pointermove', trackPointer);
    host?.removeEventListener('pointerleave', releasePointer);
  };
}
