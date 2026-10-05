import { NaoEncontradoPage } from '@/features/nao-encontrado';
import { getService, serviceMeta, ServicoDetailPage } from '@/features/servicos';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/servico';

export const meta: Route.MetaFunction = ({ params }) => {
  const service = getService(params.slug);
  return service ? serviceMeta(service) : routeMeta('notFound');
};

export default function Servico({ params }: Route.ComponentProps) {
  const service = getService(params.slug);
  return service ? <ServicoDetailPage service={service} /> : <NaoEncontradoPage />;
}
