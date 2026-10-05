import type { Seo } from '@/shared/routing';
import type { FaqItem, Highlight } from '@/shared/types';

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  seo: Seo;
  headline: string;
  intro: string;
  problems: Highlight[];
  deliverables: string[];
  stack: string[];
  faq: FaqItem[];
  keywords: string[];
}
