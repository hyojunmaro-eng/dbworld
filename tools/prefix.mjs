#!/usr/bin/env node
/**
 * GitHub Pages 등 하위 경로 배포용 프리픽서
 * 사용법: node tools/prefix.mjs /dbworld   (dist/ 안의 절대경로를 /dbworld/... 로 재작성)
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.argv[2] || '/dbworld';
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const EXT = new Set(['.html', '.xml', '.txt', '.js', '.css', '.json']);

let n = 0;
function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!EXT.has(extname(f))) continue;
    let s = readFileSync(p, 'utf8');
    const o = s;
    if (f.endsWith('.html')) {
      s = s.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`);
      s = s.replaceAll("url('/assets/", `url('${BASE}/assets/`);
      s = s.replaceAll('content="0; url=/', `content="0; url=${BASE}/`);
      s = s.replaceAll("? '/ko/' : '/en/'", `? '${BASE}/ko/' : '${BASE}/en/'`);
    }
    if (s !== o) { writeFileSync(p, s); n++; }
  }
}
walk(DIST);
console.log(`✓ 경로 프리픽스(${BASE}) 적용: ${n} files`);
