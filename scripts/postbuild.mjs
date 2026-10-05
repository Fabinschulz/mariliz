// Pós-build para hospedagem estática (Vercel):
// a página 404 pré-renderizada vira build/client/404.html, servida com status 404
// para qualquer URL inexistente. O diretório /404 é removido para não existir
// uma URL indexável respondendo 200.
import { existsSync } from 'node:fs';
import { rename, rm } from 'node:fs/promises';
import { join } from 'node:path';

const clientDir = join(import.meta.dirname, '..', 'build', 'client');
const prerendered404 = join(clientDir, '404', 'index.html');

if (!existsSync(prerendered404)) {
  console.error('postbuild: 404 pré-renderizado não encontrado em', prerendered404);
  process.exit(1);
}

await rename(prerendered404, join(clientDir, '404.html'));
await rm(join(clientDir, '404'), { recursive: true, force: true });
console.log('postbuild: build/client/404.html gerado');
