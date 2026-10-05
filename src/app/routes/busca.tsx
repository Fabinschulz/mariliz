import { BuscaPage } from '@/features/busca';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/busca';

export const meta: Route.MetaFunction = () => routeMeta('search');

export default function Busca() {
  return <BuscaPage />;
}
