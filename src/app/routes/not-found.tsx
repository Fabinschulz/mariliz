import { NaoEncontradoPage } from '@/features/nao-encontrado';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/not-found';

export const meta: Route.MetaFunction = () => routeMeta('notFound');

export default function NotFound() {
  return <NaoEncontradoPage />;
}
