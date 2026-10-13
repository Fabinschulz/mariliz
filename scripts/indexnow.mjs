// Avisa os buscadores compatíveis com IndexNow (Bing, Yandex, Seznam, Naver...) de que
// as URLs do sitemap mudaram, para recrawl imediato. O ChatGPT busca pelo índice do Bing.
// Roda depois do deploy de produção (.github/workflows/indexnow.yml), porque lê o sitemap no ar.
// A chave é pública por definição: o buscador a confere em /<chave>.txt.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const KEY = 'c3a96ca8777b2054e941ff6d38273304';
const siteUrl = (process.env.SITE_URL || 'https://www.marilize.com.br').replace(/\/+$/, '');

if (!existsSync(join(import.meta.dirname, '..', 'public', `${KEY}.txt`))) {
  console.error(`indexnow: arquivo da chave public/${KEY}.txt não encontrado`);
  process.exit(1);
}

const sitemap = await fetch(`${siteUrl}/sitemap.xml`);
if (!sitemap.ok) {
  console.error(`indexnow: sitemap respondeu ${sitemap.status}`);
  process.exit(1);
}

const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(siteUrl).host,
    key: KEY,
    keyLocation: `${siteUrl}/${KEY}.txt`,
    urlList
  })
});

// 200 = recebido; 202 = recebido, chave ainda em validação.
if (!response.ok) {
  console.error(`indexnow: ${response.status} ${await response.text()}`);
  process.exit(1);
}

console.log(`indexnow: ${urlList.length} URLs enviadas (HTTP ${response.status})`);
