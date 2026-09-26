/**
 * 페이지 템플릿 — 모든 HTML은 여기서 생성됩니다.
 * 각 함수는 c(컨텍스트: {site, L, lang, other, projects, posts, md})를 받아 HTML 문자열을 반환합니다.
 */
import { existsSync } from 'node:fs';
import { kmap } from '../content/kmap.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- 헬퍼 ---------- */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nl2br = s => esc(s).replace(/\n/g, '<br>');
const photo = name => {
  for (const ext of ['jpg', 'webp']) {
    if (existsSync(join(ROOT, 'assets/img/photos', name + '.' + ext))) return `/assets/img/photos/${name}.${ext}`;
  }
  return null;
};
// img 필드 우선, 없으면 slug와 동명의 파일
const bizImg = name => existsSync(join(ROOT, 'assets/img/business', name + '.jpg')) ? `/assets/img/business/${name}.jpg` : null;
const projImg = p => {
  for (const name of [p.img, p.slug].filter(Boolean)) {
    if (existsSync(join(ROOT, 'assets/img/projects', name + '.jpg'))) return `/assets/img/projects/${name}.jpg`;
  }
  return null;
};

const CAT_CLASS = { development: 'c-dev', pm: 'c-pm', cm: 'c-cm', consulting: 'c-con', golf: 'c-golf' };
const initials = name => /[가-힣]/.test(name)
  ? name.replace(/[^0-9A-Za-z가-힣]/g, '').slice(0, 2)
  : name.split(/[\s-]+/).map(w => w[0]).join('').toUpperCase().slice(0, 2);

/* 사업영역 아이콘 (인라인 SVG) */
const ICONS = {
  development: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 42V20l10-7 10 7v22M28 42V14l12-6v34M14 26h4m-4 7h4m16-16h2m-2 7h2m-2 7h2M4 42h40"/></svg>',
  pm: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="10" y="6" width="28" height="36" rx="2"/><path d="M17 14h6m-6 8h6m-6 8h6m8-16h6m-6 8h6m-6 8h6M4 42h40"/></svg>',
  cm: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 42l6-24h24l6 24M12 30h24M24 18V8m-6 4V8h12v4M4 42h40"/></svg>',
  consulting: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="21" cy="21" r="12"/><path d="M30 30l12 12M16 21h10m-5-5v10"/></svg>',
  golf: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 42V8l16 6-16 6M12 42c0-3 5-5 11-5s11 2 11 5"/></svg>',
  materials: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M24 6l16 9v18l-16 9-16-9V15z"/><path d="M24 24l16-9M24 24v18M24 24L8 15"/></svg>',
};

const ARROW = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

/* ---------- 공통 레이아웃 ---------- */
function layout(c, { title, desc, path, body, cls = '', ogType = 'website' }) {
  const { L, lang, other, site, v = '' } = c;
  const com = site.company[lang];
  const nav = L.nav;
  const url = p => `/${lang}/${p}`;
  const canonical = `${site.baseUrl}/${path.replace(/index\.html$/, '')}`;
  const bare = path.replace(/^(ko|en)\//, '');
  const dd = (items, base) => items.map(([k, label]) => `<li><a href="${url(`${base}/${k}/`)}">${esc(label)}</a></li>`).join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="ko" href="${site.baseUrl}/ko/${bare}">
<link rel="alternate" hreflang="en" href="${site.baseUrl}/en/${bare}">
<link rel="alternate" hreflang="x-default" href="${site.baseUrl}/ko/${bare}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${lang === 'ko' ? 'ko_KR' : 'en_US'}">
<meta property="og:image" content="${site.baseUrl}/assets/img/og.jpg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/favicon-180.png">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="/assets/css/main.css${v ? `?v=${v}` : ''}">
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization',
    name: com.legalName, url: site.baseUrl, logo: site.baseUrl + '/assets/img/logo.png',
    address: com.address, telephone: com.tel,
  })}</script>
</head>
<body class="${cls}" data-lang="${lang}">
<a class="skip" href="#main">${lang === 'ko' ? '본문 바로가기' : 'Skip to content'}</a>
<header class="gnb" id="gnb">
  <div class="gnb-in">
    <a class="logo" href="${url('')}" aria-label="${esc(com.name)}"><img src="/assets/img/logo${lang === 'en' ? '-en' : ''}.png" alt="${esc(com.name)}" height="40"></a>
    <nav class="nav" aria-label="main">
      <ul class="nav-l1">
        <li><a href="${url('about/ceo/')}">${nav.about}</a><ul class="nav-l2">${dd(nav.aboutItems, 'about')}</ul></li>
        <li><a href="${url('business/')}">${nav.business}</a><ul class="nav-l2">${dd(nav.businessItems, 'business')}<li><a href="${url('business/')}">${lang === 'ko' ? '사업영역 총괄' : 'Overview'}</a></li></ul></li>
        <li><a href="${url('projects/')}">${nav.projects}</a></li>
        <li><a href="${url('ir/finance/')}">${nav.ir}</a><ul class="nav-l2">${nav.irMenu.map(([path, label]) => `<li><a href="${url(path)}">${esc(label)}</a></li>`).join('')}</ul></li>
        <li><a href="${url('esg/policy/')}">${nav.esg}</a><ul class="nav-l2">${nav.esgMenu.map(([path, label]) => `<li><a href="${url(path)}">${esc(label)}</a></li>`).join('')}</ul></li>
        <li><a href="${url('news/')}">${nav.news}</a><ul class="nav-l2">${nav.newsMenu.map(([path, label]) => `<li><a href="${url(path)}">${esc(label)}</a></li>`).join('')}</ul></li>
      </ul>
    </nav>
    <div class="gnb-right">
      <div class="lang">
        <span class="lang-cur">${lang === 'ko' ? FLAG_KR + 'KOR' : FLAG_US + 'ENG'}</span><i class="lang-sep" aria-hidden="true"></i><a class="lang-alt" href="/${other}/${path.replace(/^(ko|en)\//, '')}" title="${esc(L.langSwitchTitle)}" data-langswitch>${lang === 'ko' ? FLAG_US + 'ENG' : FLAG_KR + 'KOR'}</a>
      </div>
      <button class="burger" aria-label="${lang === 'ko' ? '메뉴' : 'Menu'}" aria-expanded="false" aria-controls="mnav" data-burger><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mnav" id="mnav" data-mnav hidden>
  <nav aria-label="mobile">
    <details open><summary>${nav.about}</summary><ul>${dd(nav.aboutItems, 'about')}</ul></details>
    <details><summary>${nav.business}</summary><ul><li><a href="${url('business/')}">${lang === 'ko' ? '사업영역 총괄' : 'Overview'}</a></li>${dd(nav.businessItems, 'business')}</ul></details>
    <a class="mnav-link" href="${url('projects/')}">${nav.projects}</a>
    <details><summary>${nav.ir}</summary><ul>${nav.irMenu.map(([path, label]) => `<li><a href="${url(path)}">${esc(label)}</a></li>`).join('')}</ul></details>
    <details><summary>${nav.esg}</summary><ul>${nav.esgMenu.map(([path, label]) => `<li><a href="${url(path)}">${esc(label)}</a></li>`).join('')}</ul></details>
    <details><summary>${nav.news}</summary><ul>${nav.newsMenu.map(([path, label]) => `<li><a href="${url(path)}">${esc(label)}</a></li>`).join('')}</ul></details>
  </nav>
</div>
<main id="main">
${body}
</main>
<footer class="foot">
  <i class="foot-accent" aria-hidden="true"></i>
  <div class="foot-in">
    <div class="foot-grid">
      <div class="foot-brand">
        <img class="foot-logo" src="/assets/img/logo-white${lang === 'en' ? '-en' : ''}.png" alt="${esc(com.name)}" height="44">
        <p class="foot-slogan">${esc(com.slogan)}</p>
      </div>
      <dl class="foot-info">
        <div><dt>Address</dt><dd>${esc(com.address)}</dd></div>
        <div><dt>Tel</dt><dd>${esc(com.tel)}</dd></div>
        <div><dt>Fax</dt><dd>${esc(com.fax)}</dd></div>
      </dl>
      <div class="foot-util">
        <label class="visually-hidden" for="family">${L.common.familySites}</label>
        <select id="family" data-family>
          <option value="">${L.common.familySites}</option>
          ${site.familySites.map(f => `<option value="${f.url}">${esc(f[lang])}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="foot-bottom">
      <p class="foot-copy">Copyright © DB World. All Rights Reserved.</p>
      <p>${esc(com.legalName)} · ${lang === 'ko' ? '대표이사' : 'CEO'} ${esc(com.ceo)} · ${lang === 'ko' ? '사업자등록번호' : 'Business Reg. No.'} ${esc(com.bizNo)}</p>
    </div>
  </div>
</footer>
<button class="totop" data-totop aria-label="${esc(L.common.backTop)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m-6 6 6-6 6 6"/></svg></button>
<script src="/assets/js/main.js${v ? `?v=${v}` : ''}" defer></script>
</body>
</html>`;
}

/* 서브페이지 상단 히어로 */
/* 언어 전환용 미니 국기 (사용자 제공 SVG, 원형 크롭) */
const FLAG_KR = `<img class="lang-flag" src="/assets/img/flags/kr.png" alt="" width="17" height="17">`;
const FLAG_US = `<img class="lang-flag" src="/assets/img/flags/us.png" alt="" width="17" height="17">`;

const PHERO_IMG = { about: 'about', business: 'business', projects: 'projects', news: 'news', esg: 'esg', ir: 'ir' };
function pageHero(c, { title, crumbs, slogan, sec }) {
  const { L, lang } = c;
  const img = PHERO_IMG[sec]
    ? ` class="phero phero-img" style="background-image:linear-gradient(90deg, rgba(6, 22, 14, .78), rgba(6, 22, 14, .38) 55%, rgba(6, 22, 14, .2)), url('/assets/img/phero/${PHERO_IMG[sec]}.jpg')"`
    : ' class="phero"';
  return `<section${img.startsWith(' class') ? img : ''}>
  <div class="phero-in">
    <nav class="crumbs" aria-label="breadcrumb"><a href="/${lang}/">${L.common.breadcrumbHome}</a>${crumbs.map(([t, href]) =>
      href ? ` <span>/</span> <a href="/${lang}/${href}">${esc(t)}</a>` : ` <span>/</span> <span aria-current="page">${esc(t)}</span>`).join('')}</nav>
    <h1 class="rv">${esc(title)}${slogan ? ` <span class="ttl-slg">/ ${esc(slogan)}</span>` : ''}</h1>
  </div>
  <div class="phero-deco" aria-hidden="true"></div>
</section>`;
}

const sect = (title, sub, extra = '') => `<div class="sect-head rv"><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ''}${extra}</div>`;

/* 프로젝트 카드 */
function projCard(c, p) {
  const { lang, L } = c;
  const d = p[lang];
  const img = projImg(p);
  const catNames = Object.fromEntries(L.projects.filters);
  return `<a class="pcard rv" href="/${lang}/projects/${p.slug}/" data-cats="${p.cats.join(' ')}" data-city="${esc(p.map.city[lang])}">
    <div class="pcard-media ${CAT_CLASS[p.cats[0]]}">${img ? `<img src="${img}" alt="" loading="lazy">` : `<div class="ph-pattern" aria-hidden="true"><span>${esc(initials(d.name))}</span></div>`}</div>
    <div class="pcard-body">
      <strong>${esc(d.name)}</strong>
      <span>${esc(d.location)}</span>
    </div>
  </a>`;
}

/* 한국 지도 SVG */
// 도시별 라벨 위치(겹침 방지): [dx, dy, anchor]
const MAP_LABELS = {
  '서울': [0, -19, 'middle'], '인천': [-16, 7, 'end'], '성남': [-14, 28, 'end'],
  '광주(경기)': [17, 8, 'start'], '음성': [-16, 12, 'end'], '양양': [16, 1, 'start'],
  '동해안': [16, 8, 'start'], '삼척': [16, 24, 'start'], '부산': [17, 8, 'start'],
};
function koreaMap(c) {
  const { projects, lang } = c;
  const byCity = new Map();
  for (const p of projects) {
    const key = p.map.city.ko;
    if (!byCity.has(key)) byCity.set(key, { x: p.map.x, y: p.map.y, n: 0, label: p.map.city[lang] });
    byCity.get(key).n++;
  }
  const pins = [...byCity.entries()].map(([key, v]) => {
    const [dx, dy, anchor] = MAP_LABELS[key] || [12, 4, 'start'];
    return `<g class="map-pin" data-city="${esc(v.label)}" tabindex="0" role="button" aria-label="${esc(v.label)} (${v.n})">
      <circle cx="${v.x}" cy="${v.y}" r="21" class="pin-halo"/>
      <circle cx="${v.x}" cy="${v.y}" r="9" class="pin-dot"/>
      <text x="${v.x + dx}" y="${v.y + dy}" text-anchor="${anchor}">${esc(v.label)} <tspan>${v.n}</tspan></text>
    </g>`;
  }).join('\n');
  const [dkx, dky] = kmap.dokdo;
  return `<svg class="kmap" viewBox="0 0 ${kmap.w} ${kmap.h}" role="group" aria-label="Project map of Korea">
  <defs>
    <linearGradient id="kmap-g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2E9862"/>
      <stop offset="1" stop-color="#155C39"/>
    </linearGradient>
    <filter id="kmap-sh" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0A2B1A" flood-opacity="0.35"/>
    </filter>
  </defs>
  <g class="kmap-geo" filter="url(#kmap-sh)">
    ${kmap.provinces.map(p => `<path class="kmap-prov" d="${p.d}"><title>${esc(p.name)}</title></path>`).join('\n    ')}
    <g class="kmap-dokdo"><circle cx="${dkx - 2.4}" cy="${dky}" r="1.6"/><circle cx="${dkx + 2.4}" cy="${dky - 1}" r="1.3"/></g>
  </g>
  ${pins}
</svg>`;
}

/* ================= 페이지 ================= */

export function home(c) {
  const { L, lang } = c;
  const H = L.home;

  const slides = H.hero.map((s, i) => {
    const img = photo(s.img);
    return `<div class="hero-slide${i === 0 ? ' on' : ''}" data-slide>
      <div class="hero-bg${img ? '' : ' hero-bg-brand'}"${img ? ` style="background-image:url('${img}')"` : ''}></div>
      <div class="hero-shade"></div>
      <div class="hero-copy">
        <em>${esc(s.eyebrow)}</em>
        <h${i === 0 ? 1 : 2}>${nl2br(s.title)}</h${i === 0 ? 1 : 2}>
        <p>${esc(s.sub)}</p>
      </div>
    </div>`;
  }).join('');

  const areas = L.nav.businessItems.map(([k, name]) => {
    const a = L.business.areas[k];
    return `<a class="acard acard-img rv" href="/${lang}/business/${k}/" style="background-image:url('/assets/img/business/area-${k}.jpg')">
      <span class="acard-ic">${ICONS[k]}</span>
      <strong>${esc(name)}</strong>
      <p>${esc(a.headline)}</p>
      <span class="acard-go">${ARROW}</span>
    </a>`;
  }).join('');

  return layout(c, {
    title: H.title, desc: H.desc, path: `${lang}/`, cls: 'is-home',
    body: `
<section class="hero" data-hero>
  ${slides}
  <div class="hero-ui">
    <div class="hero-dots">${H.hero.map((_, i) => `<button data-dot="${i}" ${i === 0 ? 'class="on"' : ''} aria-label="slide ${i + 1}"></button>`).join('')}</div>

  </div>
</section>

<section class="sec sec-areas">
  <div class="wrap">
    ${sect(H.areasTitle, H.areasSub)}
    <div class="agrid">${areas}</div>
  </div>
</section>`,
  });
}

/* ---------- 회사소개 ---------- */
export function aboutCeo(c) {
  const { L, lang } = c;
  const A = L.about.ceo;
  return layout(c, {
    title: A.docTitle, desc: A.headline.replace(/\n/g, ' '), path: `${lang}/about/ceo/`,
    body: pageHero(c, { sec: 'about', title: A.title, crumbs: [[L.nav.about, 'about/ceo/'], [A.title]] }) + `
<section class="sec"><div class="wrap ceo">
  <div class="ceo-head rv"><h2>${nl2br(A.headline)}</h2></div>
  <div class="ceo-body">
    ${A.body.map(p => `<p class="rv">${esc(p)}</p>`).join('')}
    <p class="ceo-sign rv">${esc(A.sign)} <strong>${esc(A.signName)}</strong></p>
  </div>
</div></section>`,
  });
}

export function aboutOverview(c) {
  const { L, lang } = c;
  const O = L.about.overview;
  const logoSrc = `/assets/img/logo${lang === 'en' ? '-en' : ''}.png`;
  return layout(c, {
    title: O.docTitle, desc: O.paras[0], path: `${lang}/about/overview/`,
    body: pageHero(c, { sec: 'about', title: O.title, crumbs: [[L.nav.about, 'about/ceo/'], [O.title]] }) + `
<section class="sec"><div class="wrap">
  <div class="ovw-intro">
    <div class="ovw-copy">
      <h2>${nl2br(O.headTop)}<br><em>${esc(O.headAccent)}</em><br><strong>${esc(O.headName)}</strong></h2>
      ${O.paras.map(t => `<p>${esc(t)}</p>`).join('')}
    </div>
    <figure class="ovw-photo"><img src="/assets/img/photos/overview-tower.jpg" alt="DB금융센터" loading="lazy"></figure>
  </div>

  <h3 class="ovw-h3">${esc(O.factsTitle)}</h3>
  <dl class="ovw-facts">
    ${O.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
  </dl>

  <h3 class="ovw-h3">${esc(O.bizTitle)}</h3>
  <div class="ovw-cycle" role="img" aria-label="${esc(O.bizTitle)}">
    <svg class="cycle-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" pathLength="100"/></svg>
    <div class="ovw-center"><img src="${logoSrc}" alt="" height="40"></div>
    ${O.bizNodes.map((n, i) => `
    <div class="ovw-node n${i}">
      <strong>${nl2br(n.name)}</strong>
      ${n.subs.length ? `<span>${n.subs.map(esc).join('<br>')}</span>` : ''}
    </div>`).join('')}
  </div>
</div></section>`,
  });
}

export function aboutVision(c) {
  const { L, lang } = c;
  const V = L.about.vision;
  return layout(c, {
    title: V.docTitle, desc: V.mission.replace(/\n/g, ' '), path: `${lang}/about/vision/`,
    body: pageHero(c, { sec: 'about', title: V.title, crumbs: [[L.nav.about, 'about/ceo/'], [V.title]] }) + `
<section class="sec"><div class="wrap">
  <div class="vis-block rv"><em>${esc(V.missionLabel)}</em><h2>${nl2br(V.mission)}</h2><p>${esc(V.missionSub)}</p></div>
  <div class="vis-block vis-vision rv"><em>${esc(V.visionLabel)}</em><h2>${nl2br(V.vision)}</h2><p>${esc(V.visionSub)}</p></div>
  <div class="vis-values">
    <em class="rv">${esc(V.valuesLabel)}</em>
    <div class="vgrid">
      ${V.values.map(([t, s, d]) => `<div class="vcard rv"><strong>${esc(t)}</strong><em>${esc(s)}</em><p>${esc(d)}</p></div>`).join('')}
    </div>
  </div>
</div></section>`,
  });
}

export function aboutHistory(c) {
  const { L, lang } = c;
  const H = L.about.history;
  return layout(c, {
    title: H.docTitle, desc: H.intro, path: `${lang}/about/history/`,
    body: pageHero(c, { sec: 'about', title: H.title, crumbs: [[L.nav.about, 'about/ceo/'], [H.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead rv">${esc(H.intro)}</p>
  <div class="tl">
    ${H.eras.map(era => `
    <div class="tl-era rv">
      <div class="tl-side"><strong>${esc(era.era)}</strong><span>${esc(era.label)}</span></div>
      <ul class="tl-items">
        ${era.items.map(([d, t]) => `<li class="rv"><time>${esc(d)}</time><p>${esc(t)}</p></li>`).join('')}
      </ul>
    </div>`).join('')}
  </div>
  <div class="roots rv"><strong>${esc(H.rootsTitle)}</strong><p>${esc(H.roots)}</p></div>
</div></section>`,
  });
}

export function aboutCi(c) {
  const { L, lang } = c;
  const CI = L.about.ci;
  return layout(c, {
    title: CI.docTitle, desc: CI.intro, path: `${lang}/about/ci/`,
    body: pageHero(c, { sec: 'about', title: CI.title, crumbs: [[L.nav.news, 'news/'], [CI.title]] }) + `
<section class="sec"><div class="wrap">
  <div class="ci-logo rv"><img src="/assets/img/logo${lang === 'en' ? '-en' : ''}.png" alt="DB WORLD" width="285"></div>
  <p class="lead rv">${esc(CI.intro)}</p>
  <h3 class="rv">${esc(CI.symbolTitle)}</h3>
  <div class="ci-symbol rv">
    <div class="ci-symbol-visual" aria-hidden="true"><img src="/assets/img/symbol.png" alt="" width="169" height="214"></div>
    <div class="ci-symbol-text">
      <h4>${nl2br(CI.symbolHeadline)}</h4>
      ${CI.symbolBody.map(t => `<p>${esc(t)}</p>`).join('')}
      <div class="ci-meanings">
        ${CI.symbolMeanings.map(([n, sub, hex, d]) => `<div class="ci-meaning"><i style="background:${hex}"></i><div><strong>${esc(n)} <em>${esc(sub)}</em></strong><span>${esc(d)}</span></div></div>`).join('')}
      </div>
      <p class="ci-symbol-note">${esc(CI.symbolNote)}</p>
    </div>
  </div>
  <h3 class="rv">${esc(CI.colorsTitle)}</h3>
  <div class="ci-colors">
    ${CI.colors.map(([n, hex, d]) => `<div class="ci-swatch rv"><span style="background:${hex}"></span><strong>${esc(n)}</strong><em>${hex}</em><p>${esc(d)}</p></div>`).join('')}
  </div>
  <h3 class="rv">${lang === 'ko' ? '그라디언트' : 'Gradations'}</h3>
  <div class="ci-grads rv" aria-hidden="true">
    <div><span style="background:linear-gradient(135deg,#F47920,#C9252C)"></span><em>DB Red Gradation</em><i>#F47920 → #C9252C</i></div>
    <div><span style="background:linear-gradient(135deg,#8DC63F,#009559)"></span><em>DB Green Gradation</em><i>#8DC63F → #009559</i></div>
    <div><span style="background:linear-gradient(135deg,#14B1E7,#0061AF)"></span><em>DB Blue Gradation</em><i>#14B1E7 → #0061AF</i></div>
  </div>
  <h3 class="rv">${esc(CI.usageTitle)}</h3>
  <ul class="ci-usage rv">${CI.usage.map(u => `<li>${esc(u)}</li>`).join('')}</ul>
  <a class="btn-line rv" href="https://ci.dbgroup.co.kr" target="_blank" rel="noopener">${esc(CI.guideLink)} ${ARROW}</a>
</div></section>`,
  });
}

export function aboutGroup(c) {
  const { L, lang } = c;
  const G = L.about.group;
  // 계열사명 자동 강조
  const NAMES = ['DB손해보험', 'DB생명', 'DB증권', 'DB자산운용', 'DB저축은행', 'DB캐피탈', 'DB하이텍', 'DB글로벌칩', 'DB Inc.', 'DB메탈', 'DB월드', 'DB커뮤니케이션즈',
    'DB Insurance', 'DB Life', 'DB Securities', 'DB Asset Management', 'DB Savings Bank', 'DB Capital', 'DB HiTek', 'DB GlobalChip', 'DB Metal', 'DB World', 'DB Communications'];
  const emph = t => NAMES.reduce((acc, n) => acc.split(esc(n)).join(`<strong>${esc(n)}</strong>`), esc(t));
  return layout(c, {
    title: G.docTitle, desc: G.sections[0].paras[0], path: `${lang}/about/group/`,
    body: pageHero(c, { sec: 'about', title: G.title, crumbs: [[L.nav.about, 'about/ceo/'], [G.title]] }) + `
<section class="sec"><div class="wrap">
  <figure class="grp-banner"><img src="/assets/img/group/banner.webp" alt="${esc(G.heroAlt)}"></figure>

  ${G.sections.map(sec => `
  <div class="grp-sec">
    <div class="grp-label"><strong>${esc(sec.label)}</strong><span>${esc(sec.sublabel)}</span></div>
    <div class="grp-body">
      ${sec.paras.map(t => `<p>${esc(t)}</p>`).join('')}
      ${sec.closing ? `<p class="grp-closing">${esc(sec.closing)}</p>` : ''}
    </div>
  </div>`).join('')}

  <div class="grp-biz">
    <em class="ad-eyebrow">${esc(G.bizEyebrow)}</em>
    <h2>${esc(G.bizTitle)}</h2>
    ${G.bizGroups.map(g => `
    <div class="grp-biz-row">
      <figure><img src="/assets/img/group/${g.img}.png" alt="" loading="lazy"></figure>
      <div><h3>${esc(g.name)}</h3><p>${emph(g.body)}</p></div>
    </div>`).join('')}
  </div>
  <div class="grp-vm">
    <em class="ad-eyebrow">${esc(G.vmEyebrow)}</em>
    <h2>${nl2br(G.vmHeadline)}</h2>
    <p class="grp-vm-sub">${esc(G.vmSub)}</p>
    <div class="grp-vm-grid">
      <div class="grp-vm-card">
        <img src="/assets/img/group/vision.jpg" alt="" loading="lazy">
        <strong>${esc(G.vision.title)}</strong>
        <p>${esc(G.vision.body)}</p>
      </div>
      <div class="grp-vm-card">
        <img src="/assets/img/group/mission.jpg" alt="" loading="lazy">
        <strong>${esc(G.mission.title)}</strong>
        <p>${esc(G.mission.body)}</p>
      </div>
    </div>
  </div>
</div></section>`,
  });
}

export function aboutLocation(c) {
  const { L, lang } = c;
  const Lo = L.about.location;
  return layout(c, {
    title: Lo.docTitle, desc: Lo.tabs[0].addr, path: `${lang}/about/location/`,
    body: pageHero(c, { sec: 'about', title: Lo.title, crumbs: [[L.nav.about, 'about/ceo/'], [Lo.title]] }) + `
<section class="sec"><div class="wrap">
  ${Lo.tabs.length > 1 ? `<div class="loc-tabs" role="tablist">
    ${Lo.tabs.map((t, i) => `<button role="tab" id="loctab-${i}" aria-controls="locpanel-${i}" aria-selected="${i === 0}" data-loctab="${i}" ${i === 0 ? 'class="on"' : ''}>${esc(t.name)}</button>`).join('')}
  </div>` : ''}
  ${Lo.tabs.map((t, i) => `
  <div class="loc-panel${i === 0 ? ' on' : ''}" id="locpanel-${i}" role="tabpanel" aria-labelledby="loctab-${i}" data-locpanel="${i}">
    <div class="loc-map">
      <iframe src="https://maps.google.com/maps?q=${encodeURIComponent(t.mapQuery)}&z=16&hl=${lang}&output=embed" title="${esc(t.name)} map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
    <div class="loc-info">
      <h3>${esc(t.name)}</h3>
      <p class="loc-addr">${esc(t.addr)}</p>
      <dl>${t.transit.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      <div class="loc-btns">
        <a class="btn-line" href="https://map.kakao.com/?q=${encodeURIComponent(t.mapQuery)}" target="_blank" rel="noopener">${esc(Lo.mapBtnKakao)}</a>
        <a class="btn-line" href="https://map.naver.com/p/search/${encodeURIComponent(t.mapQuery)}" target="_blank" rel="noopener">${esc(Lo.mapBtnNaver)}</a>
      </div>
    </div>
  </div>`).join('')}
</div></section>`,
  });
}

/* ---------- 사업영역 ---------- */
export function businessIndex(c) {
  const { L, lang } = c;
  const B = L.business;
  return layout(c, {
    title: B.docTitle, desc: B.introSub, path: `${lang}/business/`,
    body: pageHero(c, { sec: 'business', title: B.pageTitle, crumbs: [[B.pageTitle]] }) + `
<section class="sec"><div class="wrap">
  <div class="biz-intro rv"><h2>${nl2br(B.introTitle)}</h2><p>${esc(B.introSub)}</p></div>
  <div class="cycle rv" aria-label="${esc(B.cycleTitle)}">
    <div class="cycle-center"><span>Real Estate</span><strong>Life Cycle</strong></div>
    ${B.cycleSteps.map(([en, ko, d, slug], i) => `
    <a class="cycle-node n${i}" href="/${lang}/business/${slug}/">
      <em>${esc(en)}</em><strong>${esc(ko)}</strong><p>${esc(d)}</p>
    </a>`).join('')}
    <svg class="cycle-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" pathLength="100"/></svg>
  </div>
</div></section>`,
  });
}

/* 부동산 개발: 도심개발/지역개발/도시계획 탭 페이지 (기존 사이트 구성 계승) */
function businessDevTabs(c, a) {
  const { lang, v } = c;
  const multi = a.tabs.length > 1;
  return `
  ${multi ? `<div class="dev-tabs" role="tablist" aria-label="${esc(a.name)}">
    ${a.tabs.map((t, i) => `<button role="tab" id="devtab-${i}" aria-controls="devpanel-${i}" aria-selected="${i === 0}" data-devtab="${i}" ${i === 0 ? 'class="on"' : ''}>${esc(t.name)}</button>`).join('')}
  </div>` : ''}
  ${a.tabs.map((t, i) => `
  <div class="dev-panel${i === 0 ? ' on' : ''}" id="devpanel-${i}" ${multi ? `role="tabpanel" aria-labelledby="devtab-${i}"` : ''} data-devpanel="${i}">
    ${t.head ? `<div class="dev-head${multi ? '' : ' solo'}">
      <h3>${esc(t.head[0])}<em>${esc(t.head[1])}</em>${esc(t.head[2])}</h3>
      ${t.note ? `<p class="dev-note">${esc(t.note)}</p>` : ''}
    </div>` : ''}
    <div class="dev-row">
      <h4 class="dev-lb">${esc(a.fieldsLabel)}</h4>
      <div class="dev-body">
        <ul class="dev-fields" role="list">${t.fields.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
        ${t.fieldNotes ? `<dl class="dev-fnotes">${t.fieldNotes.map(([k, d]) => `<div><dt>${esc(k)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>` : ''}
      </div>
    </div>
    <div class="dev-row">
      <h4 class="dev-lb">${esc(a.worksLabel)}</h4>
      <div class="dev-body">
        <div class="devgrid2">
          ${t.groups.map(g => g.items.map(it => `
          <a class="devcard2" href="/${lang}/projects/${it.slug}/">
            ${bizImg(it.img) ? `<img src="${bizImg(it.img)}?v=${v}" alt="" loading="lazy">` : `<span class="ph-pattern" aria-hidden="true"><span>${esc(initials(it.name))}</span></span>`}
            <span class="devcard2-info">
              <strong>${esc(it.name)}</strong>
              <span class="devcard2-specs">${it.specs.map((s, si) => `<span><b>${esc(a.specLabels[si])}</b>${esc(s)}</span>`).join('')}</span>
            </span>
          </a>`).join('')).join('')}
        </div>
      </div>
    </div>
  </div>`).join('')}`;
}

export function businessDetail(c, key) {
  const { L, lang, projects } = c;
  const a = L.business.areas[key];
  const related = projects.filter(p => p.cats.includes(a.projectFilter));
  const relatedHtml = related.length ? `
  <h3 class="rv">${esc(L.common.related)}</h3>
  <div class="pgrid">${related.map(p => projCard(c, p)).join('')}</div>` : '';

  const facts = a.facts ? `<dl class="facts rv">${a.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : '';
  const tour = a.tournaments ? `<div class="callout rv"><p>${esc(a.tournaments)}</p></div>` : '';
  const golfBtn = a.reserveBtn ? `<a class="btn-solid rv" href="https://www.rainbowhills.co.kr" target="_blank" rel="noopener">${esc(a.reserveBtn)} ${ARROW}</a>` : '';
  const matBtn = a.siteBtn ? `<a class="btn-solid rv" href="https://dbmetal.co" target="_blank" rel="noopener">${esc(a.siteBtn)} ${ARROW}</a>` : '';
  const heroImg = a.tabs ? null : key === 'golf' ? photo('golf-rainbowhills') : null;

  return layout(c, {
    title: `${a.name} | ${c.site.company[lang].name}`, desc: a.desc, path: `${lang}/business/${key}/`,
    body: pageHero(c, { sec: 'business', title: a.name, slogan: a.slogan, crumbs: [[L.business.pageTitle, 'business/'], [a.name]] }) + `
<section class="sec"><div class="wrap">
  ${a.tabs
    ? `<div class="biz-head biz-head-tabs rv"><em>${esc(a.en)}</em><p class="lead">${esc(a.desc)}</p></div>`
    : `<div class="biz-head rv"><em>${esc(a.en)}</em><h2>${esc(a.headline)}</h2><p class="lead">${esc(a.desc)}</p></div>`}
  ${heroImg ? `<figure class="biz-photo rv"><img src="${heroImg}" alt="${esc(a.name)}"></figure>` : ''}
  ${facts}
  ${a.tabs ? businessDevTabs(c, a) : ''}
  ${a.subAreas ? `<div class="sub-areas">${a.subAreas.map(([t, d]) => `<div class="subcard rv"><strong>${esc(t)}</strong><p>${esc(d)}</p></div>`).join('')}</div>` : ''}
  ${tour}
  ${golfBtn}${matBtn}
  ${a.tabs ? '' : relatedHtml}
</div></section>`,
  });
}

/* ---------- 사업실적 ---------- */
export function projectsIndex(c) {
  const { L, lang, projects } = c;
  const P = L.projects;
  return layout(c, {
    title: P.docTitle, desc: P.intro, path: `${lang}/projects/`,
    body: pageHero(c, { sec: 'projects', title: P.title, crumbs: [[P.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead rv">${esc(P.intro)}</p>
  <div class="proj-layout">
    <aside class="proj-map rv">
      <h3>${esc(P.mapTitle)}</h3>
      <p>${esc(P.mapSub)}</p>
      ${koreaMap(c)}
      <button class="btn-line btn-reset" data-mapreset hidden>${esc(P.filterAll)} ${ARROW}</button>
    </aside>
    <div class="proj-main">
      <div class="pgrid" data-pgrid>
        ${projects.map(p => projCard(c, p)).join('')}
      </div>
      <p class="noresult" data-noresult hidden>${esc(L.common.noResult)}</p>
    </div>
  </div>
</div></section>`,
  });
}

export function projectDetail(c, p) {
  const { L, lang, projects } = c;
  const d = p[lang];
  const P = L.projects;
  const img = projImg(p);
  const idx = projects.indexOf(p);
  const prev = projects[idx - 1], next = projects[idx + 1];
  const catNames = Object.fromEntries(P.filters);
  return layout(c, {
    title: `${d.name} | ${c.site.company[lang].name}`, desc: d.desc, path: `${lang}/projects/${p.slug}/`,
    body: pageHero(c, { sec: 'projects', title: d.name, crumbs: [[P.title, 'projects/'], [d.name]] }) + `
<section class="sec"><div class="wrap">
  <div class="pd-media ${CAT_CLASS[p.cats[0]]} rv">${img ? `<img src="${img}" alt="${esc(d.name)}">` : `<div class="ph-pattern big" aria-hidden="true"><span>${esc(initials(d.name))}</span></div>`}</div>
  <div class="pd-grid">
    <dl class="facts rv">
      <div><dt>${esc(P.specLabels.location)}</dt><dd>${esc(d.location)}</dd></div>
      <div><dt>${esc(P.specLabels.scale)}</dt><dd>${esc(d.scale)}</dd></div>
      <div><dt>${esc(P.specLabels.area)}</dt><dd>${esc(d.area)}</dd></div>
      <div><dt>${esc(P.specLabels.status)}</dt><dd>${esc(d.completed)}</dd></div>
    </dl>
    <div class="pd-desc rv"><p>${esc(d.desc)}</p></div>
  </div>
  <nav class="pn rv">
    ${prev ? `<a class="pn-prev" href="/${lang}/projects/${prev.slug}/"><span>${esc(L.common.prev)}</span><strong>${esc(prev[lang].name)}</strong></a>` : '<span></span>'}
    <a class="btn-line" href="/${lang}/projects/">${esc(L.common.list)}</a>
    ${next ? `<a class="pn-next" href="/${lang}/projects/${next.slug}/"><span>${esc(L.common.next)}</span><strong>${esc(next[lang].name)}</strong></a>` : '<span></span>'}
  </nav>
</div></section>`,
  });
}

/* ---------- 홍보센터 ---------- */
export function newsList(c, { cat, page, nPages, items }) {
  const { L, lang } = c;
  const N = L.news;
  const catNames = N.catNames;
  const base = cat === 'all' ? `/${lang}/news/` : `/${lang}/news/category/${cat}/`;
  const pageUrl = i => i === 1 ? base : `${base}page/${i}/`;
  const pageSuffix = page > 1 ? (lang === 'ko' ? ` (${page}페이지)` : ` (page ${page})`) : '';
  const title = (cat === 'all' ? N.title : `${catNames[cat]} | ${N.title}`) + pageSuffix;
  return layout(c, {
    title: `${title} | ${c.site.company[lang].name}`, desc: N.intro, path: pageUrl(page).slice(1),
    body: pageHero(c, { sec: 'news', title: N.title, crumbs: cat === 'all' ? [[N.title]] : [[N.title, 'news/'], [catNames[cat]]] }) + `
<section class="sec"><div class="wrap">
  <div class="news-head rv">
    <div class="filters" role="group">
      ${L.nav.newsCats.map(([k, n]) => {
        const href = k === 'all' ? `/${lang}/news/` : `/${lang}/news/category/${k}/`;
        return `<a class="${k === cat ? 'on' : ''}" href="${href}">${esc(n)}</a>`;
      }).join('')}
    </div>
    <div class="search"><input type="search" placeholder="${esc(L.common.searchPlaceholder)}" data-search aria-label="${esc(L.common.search)}"></div>
  </div>
  <ul class="board" data-board>
    ${items.length ? items.map(p => `<li class="rv${p.pinned ? ' pinned' : ''}"><a href="/${lang}/news/${p.slug}/">
      <em class="chip">${esc(catNames[p.category] || p.category)}</em>
      <strong>${esc(lang === 'ko' ? p.title : p.title_en)}</strong>
      <time datetime="${p.date}">${p.date.replace(/-/g, '.')}</time>
    </a></li>`).join('') : `<li class="empty">${esc(L.common.noResult)}</li>`}
  </ul>
  <ul class="board board-search" data-sresults hidden></ul>
  ${nPages > 1 ? `<nav class="pager rv" aria-label="pagination">
    ${Array.from({ length: nPages }, (_, i) => `<a class="${i + 1 === page ? 'on' : ''}" href="${pageUrl(i + 1)}">${i + 1}</a>`).join('')}
  </nav>` : ''}
</div></section>`,
  });
}

export function newsPost(c, p) {
  const { L, lang, md } = c;
  const N = L.news;
  const body = lang === 'ko' ? p.body : (p.body_en || p.body);
  // 본문 첫 부분을 마크다운 기호 제거 후 요약으로 사용
  const excerpt = body.replace(/[#*>|\-\[\]]/g, '').replace(/\s+/g, ' ').trim().slice(0, 150);
  return layout(c, {
    title: `${lang === 'ko' ? p.title : p.title_en} | ${N.title}`, desc: excerpt || (lang === 'ko' ? p.title : p.title_en),
    ogType: 'article', path: `${lang}/news/${p.slug}/`,
    body: pageHero(c, { sec: 'news', title: N.title, crumbs: [[N.title, 'news/'], [N.catNames[p.category] || p.category]] }) + `
<section class="sec"><div class="wrap"><div class="post">
  <header class="post-head rv">
    <em class="chip">${esc(N.catNames[p.category] || p.category)}</em>
    <h2>${esc(lang === 'ko' ? p.title : p.title_en)}</h2>
    <time datetime="${p.date}">${L.common.date} ${p.date.replace(/-/g, '.')}</time>
  </header>
  ${p.files && p.files.length ? `<ul class="post-files rv">${p.files.map(f => `<li><a href="${esc(f.src)}" download><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m21.4 11.05-8.84 8.84a5.5 5.5 0 0 1-7.78-7.78l8.84-8.84a3.67 3.67 0 0 1 5.19 5.19l-8.85 8.84a1.83 1.83 0 0 1-2.59-2.59l8.49-8.49"/></svg>${esc(f.name)}</a></li>`).join('')}</ul>` : ''}
  <div class="post-body rv">${md(body)}</div>
  <div class="post-foot rv"><a class="btn-line" href="/${lang}/news/">${esc(L.common.list)}</a></div>
</div></div></section>`,
  });
}

/* ---------- DB광고 ---------- */
// 유튜브 링크에서 영상 ID 추출 (watch?v=, youtu.be/, shorts/, ID 단독 모두 지원)
function ytId(u) {
  if (!u) return null;
  const m = String(u).match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/) || String(u).match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}
const ytEmbed = (id, title) => `<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${esc(title || 'video')}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
const ytPlaceholder = lang => `<div class="yt yt-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m10 9 5 3-5 3z"/></svg><span>${lang === 'ko' ? '영상 준비 중' : 'Coming soon'}</span></div>`;

export function newsAds(c) {
  const { L, lang, ads } = c;
  const A = L.news.ads;
  const f = ads.featured;
  const fid = ytId(f.youtube);
  const items = (ads.items || []).filter(i => ytId(i.youtube) || (i.title && i.title[lang]));
  return layout(c, {
    title: A.docTitle, desc: A.intro, path: `${lang}/news/ads/`,
    body: pageHero(c, { sec: 'news', title: A.title, crumbs: [[L.nav.news, 'news/'], [A.title]] }) + `
<section class="sec"><div class="wrap">
  <div class="ad-feature">
    <div class="ad-copy rv">
      <em class="ad-eyebrow">BRAND CAMPAIGN</em>
      <h2>${esc(f[lang].title)}</h2>
      ${f[lang].body.map(t => `<p>${esc(t)}</p>`).join('')}
      <a class="btn-line" href="${esc(ads.channelUrl)}" target="_blank" rel="noopener">DB Youtube ${ARROW}</a>
    </div>
    <div class="ad-main rv">${fid ? ytEmbed(fid, f[lang].title) : ytPlaceholder(lang)}</div>
  </div>
  ${items.length ? `<div class="ad-grid">
    ${items.map(i => {
      const id = ytId(i.youtube);
      return `<div class="ad-item rv">${id ? ytEmbed(id, i.title?.[lang]) : ytPlaceholder(lang)}${i.title?.[lang] ? `<strong>${esc(i.title[lang])}</strong>` : ''}</div>`;
    }).join('')}
  </div>` : `<p class="ad-empty rv">${esc(A.empty)}</p>`}
</div></section>`,
  });
}

/* ---------- 문의 · 404 · 루트 ---------- */
/* ---------- 투자정보 ---------- */
const finNum = n => n == null ? '-' : n < 0 ? `(${Math.abs(n).toLocaleString('ko-KR')})` : n.toLocaleString('ko-KR');

export function irFinance(c) {
  const { L, lang, finance } = c;
  const F = L.ir.finance;
  let body;
  if (!finance.ready) {
    body = `<div class="fin-empty rv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3v18h18"/><path d="m7 15 4-5 3 3 5-7"/></svg><p>${esc(F.empty)}</p></div>`;
  } else {
    const unit = esc(finance.unit[lang]);
    const yearTh = finance.years.map(y => `<th scope="col">${esc(y.label)}<em>${esc(y.year)}</em></th>`).join('');
    const table = (rows, title, catSpan) => `
    <div class="fin-tablewrap rv" data-hint="${esc(F.swipe)}">
      <div class="fin-thead"><h3>${esc(title)}</h3><span>(${unit})</span></div>
      <table class="fin-table">
        <colgroup>${catSpan > 1 ? '<col style="width:110px"><col>' : '<col>'}<col style="width:22%"><col style="width:22%"><col style="width:22%"></colgroup>
        <thead><tr><th scope="col"${catSpan > 1 ? ` colspan="${catSpan}"` : ''}>${esc(F.catLabel)}</th>${yearTh}</tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
    const bsRows = finance.bs.map(g => {
      if (g.rows.length === 1 && !g.rows[0].ko) {
        const r = g.rows[0];
        return `<tr class="strong"><th scope="row" colspan="2" class="fin-group">${esc(g.group[lang])}</th>${r.v.map(v => `<td>${finNum(v)}</td>`).join('')}</tr>`;
      }
      return g.rows.map((r, ri) => `<tr${r.strong ? ' class="strong"' : ''}>
      ${ri === 0 ? `<th scope="rowgroup" rowspan="${g.rows.length}" class="fin-group">${esc(g.group[lang])}</th>` : ''}
      <td class="fin-name">${esc(lang === 'ko' ? r.ko : r.en)}</td>${r.v.map(v => `<td>${finNum(v)}</td>`).join('')}</tr>`).join('');
    }).join('');
    const isRows = finance.is.map(r => `<tr${r.strong ? ' class="strong"' : ''}>
      <td class="fin-name">${esc(lang === 'ko' ? r.ko : r.en)}</td>${r.v.map(v => `<td>${finNum(v)}</td>`).join('')}</tr>`).join('');
    const notes = (finance.notes && finance.notes[lang] && finance.notes[lang].length)
      ? `<ul class="fin-notes rv">${finance.notes[lang].map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : '';
    const asOf = finance.asOf[lang] ? `<p class="fin-asof rv">${esc(finance.asOf[lang])}</p>` : '';
    body = `
  ${asOf}
  ${table(bsRows, F.bsTableTitle, 2)}
  ${table(isRows, F.isTableTitle, 1)}
  ${notes}`;
  }
  return layout(c, {
    title: F.docTitle, desc: F.intro, path: `${lang}/ir/finance/`,
    body: pageHero(c, { sec: 'ir', title: F.title, crumbs: [[L.nav.ir, 'ir/finance/'], [F.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead esg-intro rv">${esc(F.intro)}</p>
  ${body}
</div></section>`,
  });
}

export function irDisclosure(c) {
  const { L, lang } = c;
  const D = L.ir.disclosure;
  const dartEmbed = 'https://dart.fss.or.kr/html/search/SearchCompanyIR3_M.html?textCrpNm=%EB%94%94%EB%B9%84%EC%9B%94%EB%93%9C';
  const dartLink = 'https://dart.fss.or.kr/dsab007/main.do?option=corp&textCrpNm=%EB%94%94%EB%B9%84%EC%9B%94%EB%93%9C';
  return layout(c, {
    title: D.docTitle, desc: D.intro, path: `${lang}/ir/disclosure/`,
    body: pageHero(c, { sec: 'ir', title: D.title, crumbs: [[L.nav.ir, 'ir/finance/'], [D.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead esg-intro rv">${esc(D.intro)}</p>
  <div class="dart-frame rv" data-dartfit="1080"><iframe src="${dartEmbed}" title="DART" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  <p class="dart-note rv">${esc(D.note)}</p>
  <a class="btn-solid rv" href="${dartLink}" target="_blank" rel="noopener">${esc(D.btn)} ${ARROW}</a>
</div></section>`,
  });
}

/* ---------- ESG ---------- */
export function esgPolicy(c) {
  const { L, lang } = c;
  const E = L.esg.policy;
  return layout(c, {
    title: E.docTitle, desc: E.intro, path: `${lang}/esg/policy/`, cls: 'gnb-clear',
    body: pageHero(c, { sec: 'esg', title: E.title, crumbs: [[L.nav.esg, 'esg/policy/'], [E.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead esg-intro rv">${esc(E.intro)}</p>
  <ol class="esg-list">
    ${E.items.map((item, i) => `<li class="rv"><em>${String(i + 1).padStart(2, '0')}</em><p>${esc(item)}</p></li>`).join('')}
  </ol>
</div></section>`,
  });
}

export function esgEthics(c) {
  const { L, lang } = c;
  const E = L.esg.ethics;
  return layout(c, {
    title: E.docTitle, desc: E.intro, path: `${lang}/esg/ethics/`, cls: 'gnb-clear',
    body: pageHero(c, { sec: 'esg', title: E.title, crumbs: [[L.nav.esg, 'esg/policy/'], [E.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead esg-intro rv">${esc(E.intro)}</p>
  <div class="ethics-grid">
    ${E.items.map(([k, d]) => `<div class="ethcard rv"><strong>${esc(k)}</strong><p>${esc(d)}</p></div>`).join('')}
  </div>
</div></section>`,
  });
}

export function contact(c) {
  const { L, lang } = c;
  const T = L.contact;
  return layout(c, {
    title: T.docTitle, desc: T.intro, path: `${lang}/contact/`,
    body: pageHero(c, { title: T.title, crumbs: [[T.title]] }) + `
<section class="sec"><div class="wrap">
  <p class="lead rv">${esc(T.intro)}</p>
  <dl class="facts contact-facts rv">
    ${T.items.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.startsWith('www.') ? `<a class="tlink" href="https://${esc(v)}" target="_blank" rel="noopener">${esc(v)}</a>` : esc(v)}</dd></div>`).join('')}
  </dl>
  <div class="callout rv"><strong>${esc(T.hoursTitle)}</strong><p>${esc(T.hours)}</p></div>
  <a class="btn-solid rv" href="/${lang}/about/location/">${esc(T.locationBtn)} ${ARROW}</a>
</div></section>`,
  });
}

export function notFound(c) {
  const { L, lang } = c;
  return layout(c, {
    title: `404 | ${c.site.company[lang].name}`, desc: L.notFound.desc, path: `${lang}/404.html`,
    body: `<section class="sec nf"><div class="wrap rv">
  <strong class="nf-code">404</strong>
  <h1>${esc(L.notFound.title)}</h1>
  <p>${esc(L.notFound.desc)}</p>
  <a class="btn-solid" href="/${lang}/">${esc(L.notFound.home)} ${ARROW}</a>
</div></section>`,
  });
}

export function rootRedirect({ site }) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>DB WORLD</title>
<meta http-equiv="refresh" content="0; url=/ko/">
<script>
  var l = (navigator.language || 'ko').toLowerCase();
  location.replace(l.indexOf('ko') === 0 ? '/ko/' : '/en/');
</script>
<link rel="canonical" href="${site.baseUrl}/ko/">
</head>
<body><a href="/ko/">한국어</a> · <a href="/en/">English</a></body>
</html>`;
}
