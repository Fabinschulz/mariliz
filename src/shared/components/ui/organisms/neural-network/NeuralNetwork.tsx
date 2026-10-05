import { useEffect, useRef } from 'react';

import { cn } from '@/shared/utils';

import styles from './NeuralNetwork.module.scss';
import { mountNeuralNetwork } from './neural-network-renderer';

/**
 * Fundo de "rede neural": brilho em CSS (presente já no HTML pré-renderizado)
 * e a malha de nós em canvas, ligada só no cliente. Puramente decorativo.
 */
export function NeuralNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    return canvas ? mountNeuralNetwork(canvas) : undefined;
  }, []);

  return (
    <div className={cn(styles.backdrop, className)} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
