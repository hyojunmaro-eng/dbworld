#!/usr/bin/env node
/**
 * DB월드 홈페이지 정적 사이트 빌더 (의존성 제로, Node 22+)
 *
 * 사용법:
 *   node build.mjs          # dist/ 전체 생성
 *
 * 콘텐츠 수정 위치:
 *   content/site.mjs        회사 정보·메뉴·푸터 (전역)
 *   content/copy.mjs        페이지 문안 (ko/en)
 *   content/projects.mjs    사업실적 데이터
 *   content/posts/*.md      게시글 (파일 1개 = 글 1개)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, statSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

const { site } = await import('./content/site.mjs');
const { copy } = await import('./content/copy.mjs');
const { projects } = await import('./content/projects.mjs');
const { ads } = await import('./content/ads.mjs');
const { finance } = await import('./content/finance.mjs');
const templates = await import('./templates/pages.mjs');

/* ---------------- 게시글 로딩 ---------------- */
// 파일 형식: 첫 줄부터 `---` 사이에 JSON 헤더, 그 아래 마크다운 본문
// 파일명: YYYY-MM-DD-slug.md
function loadPosts() {
  const dir = join(ROOT, 'content/posts');
  const posts = [];
  for (const f of readdirSync(dir).filter(f => f.endsWith('.md')).sort().reverse()) {
    const raw = readFileSync(join(dir, f), 'utf8');
    const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
    if (!m) { console.warn(`! 게시글 형식 오류(건너뜀): ${f}`); continue; }
    let head;
    try { head = JSON.parse(m[1]); }
    catch (e) { console.warn(`! 게시글 헤더 JSON 오류(건너뜀): ${f} — ${e.message}`); continue; }
    const slug = f.replace(/\.md$/, '');
    posts.push({
      slug,
      date: head.date || slug.slice(0, 10),
      category: head.category || 'notice',
      title: head.title || slug,           // 한국어 제목
      title_en: head.title_en || head.title || slug,
      body: m[2].trim(),                    // 한국어 본문 (마크다운)
      body_en: (head.body_en || '').trim(), // 영어 본문 (없으면 한국어 본문 표시)
      files: Array.isArray(head.files) ? head.files : [], // 첨부파일 [{name, src}]
      pinned: !!head.pinned,
    });
  }
  posts.sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date));
  return posts;
}

/* ---------------- 초소형 마크다운 렌더러 ---------------- */
// 지원: #~### 제목, **굵게**, [링크](url), - 목록, 1. 목록, > 인용, 빈 줄 문단, --- 구분선, 표(|)
export function md(src) {
  if (!src) return '';
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const inline = s => esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s"]+|\/[^)\s"]*)\)/g,
      (_, text, href) => href.startsWith('/')
        ? `<a href="${href}">${text}</a>`
        : `<a href="${href}" target="_blank" rel="noopener">${text}</a>`);
  const lines = src.replace(/\r/g, '').split('\n');
  const out = [];
  let list = null, table = null;
  const closeAll = () => {
    if (list) { out.push(list.type === 'ul' ? '</ul>' : '</ol>'); list = null; }
    if (table) { out.push('</tbody></table></div>'); table = null; }
  };
  for (const line of lines) {
    const t = line.trim();
    if (!t) { closeAll(); continue; }
    let m;
    if ((m = t.match(/^(#{1,3})\s+(.*)$/))) { closeAll(); const n = m[1].length + 2; out.push(`<h${n}>${inline(m[2])}</h${n}>`); }
    else if (/^---+$/.test(t)) { closeAll(); out.push('<hr>'); }
    else if ((m = t.match(/^>\s?(.*)$/))) { closeAll(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); }
    else if ((m = t.match(/^[-*]\s+(.*)$/))) {
      if (table) closeAll();
      if (!list) { list = { type: 'ul' }; out.push('<ul>'); }
      out.push(`<li>${inline(m[1])}</li>`);
    }
    else if ((m = t.match(/^\d+\.\s+(.*)$/))) {
      if (table) closeAll();
      if (!list || list.type !== 'ol') { closeAll(); list = { type: 'ol' }; out.push('<ol>'); }
      out.push(`<li>${inline(m[1])}</li>`);
    }
    else if (t.startsWith('|')) {
      const cells = t.slice(1, t.endsWith('|') ? -1 : undefined).split('|').map(c => c.trim());
      if (cells.every(c => /^:?-{2,}:?$/.test(c))) continue; // 구분행
      if (!table) {
        table = { header: false };
        out.push('<div class="table-wrap"><table><thead>');
        out.push(`<tr>${cells.map(c => `<th scope="col">${inline(c)}</th>`).join('')}</tr>`);
        out.push('</thead><tbody>');
        continue;
      }
      out.push(`<tr>${cells.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`);
    }
    else { closeAll(); out.push(`<p>${inline(t)}</p>`); }
  }
  closeAll();
  return out.join('\n');
}

/* ---------------- 파일 유틸 ---------------- */
function write(path, html) {
  const full = join(DIST, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
  pages.push(path);
}
function copyDir(src, dst) {
  mkdirSync(dst, { recursive: true });
  for (const f of readdirSync(src)) {
    const s = join(src, f), d = join(dst, f);
    statSync(s).isDirectory() ? copyDir(s, d) : copyFileSync(s, d);
  }
}

/* ---------------- 빌드 ---------------- */
const pages = [];
rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const posts = loadPosts();
// CSS/JS 내용 해시 → 캐시 버스팅 쿼리 (?v=...)
const v = createHash('md5')
  .update(readFileSync(join(ROOT, 'assets/css/main.css')))
  .update(readFileSync(join(ROOT, 'assets/js/main.js')))
  .digest('hex').slice(0, 8);
const ctx = { site, projects, posts, ads, finance, md, v };

for (const lang of ['ko', 'en']) {
  const L = copy[lang];
  const c = { ...ctx, lang, L, other: lang === 'ko' ? 'en' : 'ko' };

  write(`${lang}/index.html`, templates.home(c));
  write(`${lang}/about/ceo/index.html`, templates.aboutCeo(c));
  write(`${lang}/about/overview/index.html`, templates.aboutOverview(c));
  write(`${lang}/about/vision/index.html`, templates.aboutVision(c));
  write(`${lang}/about/ci/index.html`, templates.aboutCi(c));
  write(`${lang}/about/group/index.html`, templates.aboutGroup(c));
  write(`${lang}/about/location/index.html`, templates.aboutLocation(c));
  write(`${lang}/business/index.html`, templates.businessIndex(c));
  for (const b of ['development', 'pm', 'consulting', 'golf'])
    write(`${lang}/business/${b}/index.html`, templates.businessDetail(c, b));
  write(`${lang}/projects/index.html`, templates.projectsIndex(c));
  for (const p of projects)
    write(`${lang}/projects/${p.slug}/index.html`, templates.projectDetail(c, p));

  // 게시판: 전체 + 카테고리별 목록(페이지네이션) + 상세
  const cats = ['all', 'notice', 'news'];
  const PER = 10;
  for (const cat of cats) {
    const list = cat === 'all' ? posts : posts.filter(p => p.category === cat);
    const nPages = Math.max(1, Math.ceil(list.length / PER));
    for (let i = 0; i < nPages; i++) {
      const path = cat === 'all'
        ? (i === 0 ? `${lang}/news/index.html` : `${lang}/news/page/${i + 1}/index.html`)
        : (i === 0 ? `${lang}/news/category/${cat}/index.html` : `${lang}/news/category/${cat}/page/${i + 1}/index.html`);
      write(path, templates.newsList(c, { cat, page: i + 1, nPages, items: list.slice(i * PER, (i + 1) * PER) }));
    }
  }
  for (const p of posts) write(`${lang}/news/${p.slug}/index.html`, templates.newsPost(c, p));
  write(`${lang}/news/ads/index.html`, templates.newsAds(c));
  write(`${lang}/ir/finance/index.html`, templates.irFinance(c));
  write(`${lang}/ir/disclosure/index.html`, templates.irDisclosure(c));
  write(`${lang}/esg/policy/index.html`, templates.esgPolicy(c));
  write(`${lang}/esg/ethics/index.html`, templates.esgEthics(c));

  write(`${lang}/contact/index.html`, templates.contact(c));
  write(`${lang}/404.html`, templates.notFound(c));
}

// 루트: 언어 감지 리다이렉트
write('index.html', templates.rootRedirect(ctx));

// 검색 인덱스 (클라이언트 검색용)
writeFileSync(join(DIST, 'search-index.json'), JSON.stringify(posts.map(p => ({
  slug: p.slug, date: p.date, category: p.category, title: p.title, title_en: p.title_en,
}))));

// sitemap.xml + robots.txt (404 페이지와 루트 리다이렉트 페이지 제외)
const urls = pages.filter(p => !p.endsWith('404.html') && p !== 'index.html')
  .map(p => site.baseUrl + '/' + p.replace(/index\.html$/, ''));
writeFileSync(join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n') + '\n</urlset>');
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`);

// 정적 에셋
copyDir(join(ROOT, 'assets'), join(DIST, 'assets'));
// 웹 관리자 (GitHub Pages용 — 도커 배포에서는 nginx가 /hyojunadmin을 관리자 서버로 프록시하므로 미사용)
mkdirSync(join(DIST, 'hyojunadmin'), { recursive: true });
copyFileSync(join(ROOT, 'hyojunadmin/web.html'), join(DIST, 'hyojunadmin/index.html'));
// 게시글 첨부파일
try { copyDir(join(ROOT, 'content/files'), join(DIST, 'files')); } catch {}
try { copyFileSync(join(ROOT, 'content/popups.json'), join(DIST, 'popups.json')); } catch {}
copyFileSync(join(ROOT, 'assets/img/favicon-32.png'), join(DIST, 'favicon.ico'));

console.log(`✓ 빌드 완료: ${pages.length} pages → dist/`);
