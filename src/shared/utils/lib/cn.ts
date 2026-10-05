import { clsx, type ClassValue } from 'clsx';

/** Junta classes condicionalmente (padrão shadcn/EmpregaNet, só com `clsx`). */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
