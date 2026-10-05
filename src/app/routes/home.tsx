import { HomePage } from '@/features/home';
import { organizationSchema, routeMeta, websiteSchema } from '@/shared/seo';

import type { Route } from './+types/home';

export const meta: Route.MetaFunction = () =>
  routeMeta('home', { structuredData: [organizationSchema(), websiteSchema()] });

export default function Home() {
  return <HomePage />;
}
