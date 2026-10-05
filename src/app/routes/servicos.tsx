import { ServicosPage } from '@/features/servicos';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/servicos';

export const meta: Route.MetaFunction = () => routeMeta('services');

export default function Servicos() {
  return <ServicosPage />;
}
