import { SobrePage } from '@/features/sobre';
import { routeMeta } from '@/shared/seo';

import type { Route } from './+types/sobre';

export const meta: Route.MetaFunction = () => routeMeta('about');

export default function Sobre() {
  return <SobrePage />;
}
