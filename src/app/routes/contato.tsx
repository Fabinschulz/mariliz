import { ContatoPage } from '@/features/contato';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/contato';

export const meta: Route.MetaFunction = () => routeMeta('contact');

export default function Contato() {
  return <ContatoPage />;
}
