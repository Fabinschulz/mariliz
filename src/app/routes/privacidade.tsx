import { PrivacidadePage } from '@/features/privacidade';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/privacidade';

export const meta: Route.MetaFunction = () => routeMeta('privacy');

export default function Privacidade() {
  return <PrivacidadePage />;
}
