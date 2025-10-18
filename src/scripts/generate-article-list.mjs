// scripts/generate-article-routes.mjs
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_DIR = path.resolve('src/data/articles');
const OUT_FILE = path.resolve('src/data/articles/list.ts');

function slugFromFile(filename) {
  return filename.replace(/\.mdx?$/, '');
}

async function main() {
  const files = await fs.readdir(ARTICLES_DIR);
  const mdxFiles = files.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const routes = mdxFiles.map((f) => `/articles/${slugFromFile(f)}`).sort();

  const content = `// 🪄 Auto-generated file — do not edit by hand
const routes: string[] = ${JSON.stringify(routes, null, 2)};

export default routes;
`;

  await fs.writeFile(OUT_FILE, content, 'utf8');
  console.log(`[generate-article-routes] wrote ${routes.length} routes → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
