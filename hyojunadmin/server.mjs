#!/usr/bin/env node
/**
 * DB월드 공지사항 관리자 서버 (의존성 제로, Node 22+)
 *
 * - /hyojunadmin            관리 화면 (ui.html)
 * - /hyojunadmin/api/*      글 목록·작성·수정·삭제, 첨부파일 업로드, 팝업 관리
 * - 글 저장/삭제 시 자동으로 `node build.mjs` 재빌드 → nginx가 곧바로 새 dist 서빙
 *
 * 환경변수:
 *   ADMIN_PASSWORD  관리자 비밀번호 (기본값 dbworld!2026 — 운영 시 반드시 변경)
 *   ADMIN_PORT      포트 (기본 8788)
 */
import http from 'node:http';
import { createHmac, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const POSTS = join(ROOT, 'content/posts');
const FILES = join(ROOT, 'content/files');
const PORT = +(process.env.ADMIN_PORT || 8788);
const PASSWORD = process.env.ADMIN_PASSWORD || 'dbworld!2026';
const SECRET = randomBytes(16).toString('hex'); // 서버 재시작 시 재로그인 필요
const TOKEN = createHmac('sha256', SECRET).update('admin').digest('hex');

const POST_FILE = /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/* ---------- 게시글 파일 입출력 ---------- */
function parsePost(file) {
  const raw = readFileSync(join(POSTS, file), 'utf8');
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return null;
  let head;
  try { head = JSON.parse(m[1]); } catch { return null; }
  return {
    file,
    date: file.slice(0, 10),
    title: head.title || '',
    title_en: head.title_en || '',
    category: head.category || 'notice',
    pinned: !!head.pinned,
    files: Array.isArray(head.files) ? head.files : [],
    body: m[2].trim(),
    body_en: head.body_en || '',
  };
}
function writePost(file, p) {
  const head = { title: p.title, title_en: p.title_en, category: p.category };
  if (p.pinned) head.pinned = true;
  if (p.body_en) head.body_en = p.body_en;
  if (p.files && p.files.length) head.files = p.files.map(f => ({ name: String(f.name), src: String(f.src) }));
  writeFileSync(join(POSTS, file), `---\n${JSON.stringify(head, null, 2)}\n---\n\n${(p.body || '').trim()}\n`);
}

/* ---------- 재빌드 (직렬화) ---------- */
let building = Promise.resolve();
function rebuild() {
  building = building.then(() => new Promise(res => {
    execFile('node', ['build.mjs'], { cwd: ROOT }, (err, out, errOut) => {
      if (err) console.error('[build 실패]', errOut || err.message);
      else console.log('[build]', String(out).trim());
      res();
    });
  }));
  return building;
}

/* ---------- HTTP 유틸 ---------- */
const json = (res, code, data) => { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(data)); };
const readBody = (req, limit) => new Promise((res, rej) => {
  const chunks = []; let size = 0;
  req.on('data', c => { size += c.length; if (size > limit) { rej(new Error('too large')); req.destroy(); } else chunks.push(c); });
  req.on('end', () => res(Buffer.concat(chunks)));
  req.on('error', rej);
});
const authed = req => (req.headers.cookie || '').split(/;\s*/).some(c => c === `admtok=${TOKEN}`);
const safeName = n => String(n).replace(/[\/\\:*?"<>|\x00-\x1f]/g, '').replace(/^\.+/, '').trim().slice(0, 120) || 'file';

/* ---------- 정적 사이트 서빙 (로컬 실행용 — 도커에서는 nginx가 담당) ---------- */
const MIME = {
  html: 'text/html; charset=utf-8', css: 'text/css', js: 'application/javascript', json: 'application/json',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml',
  ico: 'image/x-icon', pdf: 'application/pdf', xml: 'application/xml', txt: 'text/plain; charset=utf-8',
  woff2: 'font/woff2', mp4: 'video/mp4', zip: 'application/zip',
  hwp: 'application/octet-stream', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
function serveStatic(res, urlPath) {
  const DIST = join(ROOT, 'dist');
  let rel = decodeURIComponent(urlPath).replace(/\0/g, '');
  if (rel.includes('..')) { res.writeHead(400); return res.end(); }
  let file = join(DIST, rel);
  if (rel.endsWith('/')) file = join(file, 'index.html');
  else if (existsSync(join(DIST, rel)) === false && existsSync(join(DIST, rel, 'index.html'))) file = join(DIST, rel, 'index.html');
  let code = 200;
  if (!existsSync(file)) { file = join(DIST, 'ko/404.html'); code = 404; }
  if (!existsSync(file)) { res.writeHead(404); return res.end('not found'); }
  const ext = file.split('.').pop().toLowerCase();
  res.writeHead(code, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  res.end(readFileSync(file));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const path = url.pathname;
  try {
    /* 관리자 외 경로 = 정적 사이트 */
    if (!path.startsWith('/hyojunadmin') && req.method === 'GET') return serveStatic(res, path);
    /* 관리 화면 */
    if (req.method === 'GET' && (path === '/hyojunadmin' || path === '/hyojunadmin/')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Frame-Options': 'DENY' });
      return res.end(readFileSync(join(ROOT, 'hyojunadmin/ui.html')));
    }
    /* 로그인 */
    if (req.method === 'POST' && path === '/hyojunadmin/api/login') {
      const body = JSON.parse((await readBody(req, 10_000)).toString() || '{}');
      if (body.password !== PASSWORD) return json(res, 401, { error: '비밀번호가 올바르지 않습니다.' });
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Set-Cookie': `admtok=${TOKEN}; Path=/hyojunadmin; HttpOnly; SameSite=Strict`,
      });
      return res.end('{"ok":true}');
    }
    if (!path.startsWith('/hyojunadmin/api/')) return json(res, 404, { error: 'not found' });
    if (!authed(req)) return json(res, 401, { error: '로그인이 필요합니다.' });

    /* 글 목록 */
    if (req.method === 'GET' && path === '/hyojunadmin/api/posts') {
      const list = readdirSync(POSTS).filter(f => POST_FILE.test(f)).map(parsePost).filter(Boolean);
      list.sort((a, b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date) || b.file.localeCompare(a.file));
      return json(res, 200, list);
    }
    /* 글 단건 */
    if (req.method === 'GET' && path === '/hyojunadmin/api/post') {
      const f = url.searchParams.get('f') || '';
      if (!POST_FILE.test(f) || !existsSync(join(POSTS, f))) return json(res, 404, { error: '글을 찾을 수 없습니다.' });
      return json(res, 200, parsePost(f));
    }
    /* 글 저장 (신규/수정) */
    if (req.method === 'POST' && path === '/hyojunadmin/api/post') {
      const p = JSON.parse((await readBody(req, 1_000_000)).toString() || '{}');
      if (!DATE.test(p.date || '')) return json(res, 400, { error: '날짜 형식이 올바르지 않습니다 (YYYY-MM-DD).' });
      if (!p.title) return json(res, 400, { error: '제목을 입력해 주세요.' });
      if (!['notice', 'news'].includes(p.category)) p.category = 'notice';
      let file = p.file || '';
      if (file) { // 수정
        if (!POST_FILE.test(file) || !existsSync(join(POSTS, file))) return json(res, 404, { error: '글을 찾을 수 없습니다.' });
        if (file.slice(0, 10) !== p.date) { // 날짜 변경 → 파일명 변경 (정렬은 날짜 기준 자동)
          const renamed = p.date + file.slice(10);
          renameSync(join(POSTS, file), join(POSTS, renamed));
          file = renamed;
        }
      } else { // 신규
        file = `${p.date}-p${Date.now().toString(36)}.md`;
      }
      writePost(file, p);
      await rebuild();
      return json(res, 200, { ok: true, file });
    }
    /* 글 삭제 */
    if (req.method === 'DELETE' && path === '/hyojunadmin/api/post') {
      const f = url.searchParams.get('f') || '';
      if (!POST_FILE.test(f) || !existsSync(join(POSTS, f))) return json(res, 404, { error: '글을 찾을 수 없습니다.' });
      unlinkSync(join(POSTS, f));
      await rebuild();
      return json(res, 200, { ok: true });
    }
    /* 첨부파일 업로드 (원본 바이너리 그대로 전송) */
    if (req.method === 'POST' && path === '/hyojunadmin/api/upload') {
      mkdirSync(FILES, { recursive: true });
      const orig = safeName(url.searchParams.get('name') || 'file');
      const dot = orig.lastIndexOf('.');
      const [base, ext] = dot > 0 ? [orig.slice(0, dot), orig.slice(dot)] : [orig, ''];
      let name = orig, i = 1;
      while (existsSync(join(FILES, name))) name = `${base}-${i++}${ext}`;
      const buf = await readBody(req, 25_000_000);
      if (!buf.length) return json(res, 400, { error: '빈 파일입니다.' });
      writeFileSync(join(FILES, name), buf);
      await rebuild(); // dist/files 반영
      return json(res, 200, { ok: true, name, src: `/files/${name}` });
    }
    /* 팝업 목록 */
    if (req.method === 'GET' && path === '/hyojunadmin/api/popups') {
      let arr = [];
      try { arr = JSON.parse(readFileSync(join(ROOT, 'content/popups.json'), 'utf8')); } catch {}
      return json(res, 200, Array.isArray(arr) ? arr : []);
    }
    /* 팝업 전체 저장 (배열 통째로 교체) */
    if (req.method === 'POST' && path === '/hyojunadmin/api/popups') {
      const arr = JSON.parse((await readBody(req, 500_000)).toString() || '[]');
      if (!Array.isArray(arr)) return json(res, 400, { error: '형식이 올바르지 않습니다.' });
      writeFileSync(join(ROOT, 'content/popups.json'), JSON.stringify(arr, null, 2) + '\n');
      await rebuild();
      return json(res, 200, { ok: true });
    }
    /* 수동 재빌드 */
    if (req.method === 'POST' && path === '/hyojunadmin/api/rebuild') {
      await rebuild();
      return json(res, 200, { ok: true });
    }
    return json(res, 404, { error: 'not found' });
  } catch (e) {
    return json(res, 500, { error: e.message === 'too large' ? '파일이 너무 큽니다 (25MB 제한).' : '서버 오류: ' + e.message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`관리자 서버 실행 중: http://127.0.0.1:${PORT}/hyojunadmin`);
  if (PASSWORD === 'dbworld!2026') console.log('⚠ 기본 비밀번호 사용 중 — 운영 배포 시 ADMIN_PASSWORD 환경변수를 설정하세요.');
});
