import type { Config } from '@react-router/dev/config';

import { getPrerenderPaths } from './src/app/static-paths';

export default {
  appDirectory: 'src/app',
  // Sem servidor em runtime: cada rota vira HTML estático no build (ver docs/ARCHITECTURE.md §4).
  ssr: false,
  prerender: {
    paths: getPrerenderPaths(),
    concurrency: 4
  }
} satisfies Config;
