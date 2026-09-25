/* DB월드 — 공통 인터랙션 (의존성 없음) */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- GNB: 스크롤 상태 ---------- */
  const gnb = $('#gnb');
  const isHome = document.body.classList.contains('is-home');
  let lastY = 0;
  function onScroll() {
    const y = scrollY;
    lastY = y;
    $('[data-totop]').classList.toggle('show', y > 700);
  }
  if (!isHome) gnb.classList.add('solid');
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('[data-totop]').addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  /* ---------- 모바일 메뉴 ---------- */
  const burger = $('[data-burger]');
  const mnav = $('[data-mnav]');
  burger.addEventListener('click', () => {
    const open = mnav.hidden;
    mnav.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) gnb.classList.add('solid');
  });

  /* ---------- 패밀리사이트 ---------- */
  const fam = $('[data-family]');
  if (fam) fam.addEventListener('change', () => { if (fam.value) { window.open(fam.value, '_blank', 'noopener'); fam.value = ''; } });

  /* ---------- 언어 전환: 현재 경로 유지 ---------- */
  const langBtn = $('[data-langswitch]');
  if (langBtn) {
    langBtn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.body.dataset.lang === 'ko' ? 'en' : 'ko';
      location.href = location.pathname.replace(/\/(ko|en)\//, '/' + target + '/');
    });
  }

  /* ---------- 히어로 슬라이더 ---------- */
  const hero = $('[data-hero]');
  if (hero) {
    const slides = $$('[data-slide]', hero);
    const dots = $$('[data-dot]', hero);
    let cur = 0, timer;
    function go(i) {
      slides[cur].classList.remove('on'); dots[cur].classList.remove('on');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('on'); dots[cur].classList.add('on');
    }
    function auto() { timer = setInterval(() => go(cur + 1), 6500); }
    dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); go(i); auto(); }));
    if (!reduced && slides.length > 1) {
      auto();
      // 마우스오버/키보드 포커스 중에는 자동 전환 일시정지 (WCAG 2.2.2)
      hero.addEventListener('mouseenter', () => clearInterval(timer));
      hero.addEventListener('mouseleave', () => { clearInterval(timer); auto(); });
      hero.addEventListener('focusin', () => clearInterval(timer));
      hero.addEventListener('focusout', () => { clearInterval(timer); auto(); });
    }
  }

  /* ---------- 카운트업 ---------- */
  const statsEl = $('[data-stats]');
  if (statsEl && !reduced) {
    const so = new IntersectionObserver(es => {
      if (!es[0].isIntersecting) return;
      so.disconnect();
      $$('[data-count]', statsEl).forEach(el => {
        const raw = el.textContent.trim();
        if (/^(19|20)\d{2}$/.test(raw)) return; // 연도는 카운트업 제외
        const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
        if (!isFinite(num)) return;
        const suffix = raw.replace(/^[0-9.,]+/, '');
        const hasComma = raw.includes(',');
        const dec = (raw.match(/\.(\d+)/) || [, ''])[1].length;
        const t0 = performance.now(), dur = 1600;
        (function tick(t) {
          const p = Math.min(Math.max((t - t0) / dur, 0), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          let v = (num * eased).toFixed(dec);
          if (hasComma) v = Number(v).toLocaleString('en-US', { minimumFractionDigits: dec });
          el.textContent = v + suffix;
          if (p < 1) requestAnimationFrame(tick); else el.textContent = raw;
        })(t0);
      });
    }, { threshold: 0.4 });
    so.observe(statsEl);
  }

  /* ---------- 가로 스크롤 드래그 ---------- */
  const drag = $('[data-drag]');
  if (drag) {
    let down = false, sx = 0, sl = 0;
    drag.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sl = drag.scrollLeft; drag.style.cursor = 'grabbing'; });
    addEventListener('pointerup', () => { down = false; drag.style.cursor = 'grab'; });
    drag.addEventListener('pointermove', e => { if (down) drag.scrollLeft = sl - (e.clientX - sx); });
  }

  /* ---------- 사업실적: 필터 + 지도 ---------- */
  const pgrid = $('[data-pgrid]');
  if (pgrid) {
    const cards = $$('.pcard', pgrid);
    const btns = $$('.filters [data-filter]');
    const pins = $$('.map-pin');
    const resetBtn = $('[data-mapreset]');
    const noresult = $('[data-noresult]');
    let cat = 'all', city = null;

    function apply() {
      let n = 0;
      for (const cd of cards) {
        const okCat = cat === 'all' || cd.dataset.cats.split(' ').includes(cat);
        const okCity = !city || cd.dataset.city === city;
        cd.classList.toggle('hidden', !(okCat && okCity));
        if (okCat && okCity) n++;
      }
      noresult.hidden = n > 0;
      pins.forEach(p => {
        p.classList.toggle('on', p.dataset.city === city);
        p.classList.toggle('dim', !!city && p.dataset.city !== city);
      });
      resetBtn.hidden = !city && cat === 'all';
    }
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('on')); b.classList.add('on');
      cat = b.dataset.filter; apply();
    }));
    const pick = p => { city = city === p.dataset.city ? null : p.dataset.city; apply(); if (city) pgrid.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); };
    pins.forEach(p => {
      p.addEventListener('click', () => pick(p));
      p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(p); } });
    });
    if (resetBtn) resetBtn.addEventListener('click', () => { city = null; cat = 'all'; btns.forEach(x => x.classList.toggle('on', x.dataset.filter === 'all')); apply(); });
  }

  /* ---------- 오시는 길 탭 ---------- */
  $$('[data-loctab]').forEach(t => t.addEventListener('click', () => {
    $$('[data-loctab]').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('on'); t.setAttribute('aria-selected', 'true');
    $$('[data-locpanel]').forEach(p => p.classList.toggle('on', p.dataset.locpanel === t.dataset.loctab));
  }));

  /* ---------- 사업영역: 부동산 개발 탭 ---------- */
  $$('[data-devtab]').forEach(t => t.addEventListener('click', () => {
    $$('[data-devtab]').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('on'); t.setAttribute('aria-selected', 'true');
    $$('[data-devpanel]').forEach(p => p.classList.toggle('on', p.dataset.devpanel === t.dataset.devtab));
  }));

  /* ---------- 게시판 검색 (search-index.json) ---------- */
  const search = $('[data-search]');
  if (search) {
    const board = $('[data-board]');
    const results = $('[data-sresults]');
    const lang = document.body.dataset.lang;
    const CATS = lang === 'ko'
      ? { notice: '공지사항', news: '뉴스·보도' }
      : { notice: 'Notice', news: 'News' };
    let index = null, tId;
    search.addEventListener('input', async () => {
      clearTimeout(tId);
      tId = setTimeout(async () => {
        const q = search.value.trim().toLowerCase();
        if (!q) { board.hidden = false; results.hidden = true; return; }
        if (!index) {
          const base = location.pathname.replace(/\/(ko|en)\/.*$/, '');
          index = await fetch(base + '/search-index.json').then(r => r.json()).catch(() => []);
        }
        const hits = index.filter(p => (lang === 'ko' ? p.title : p.title_en).toLowerCase().includes(q)).slice(0, 30);
        board.hidden = true; results.hidden = false;
        results.innerHTML = hits.length
          ? hits.map(p => `<li><a href="/${lang}/news/${esc(p.slug)}/"><em class="chip">${esc(CATS[p.category] || p.category)}</em><strong>${esc(lang === 'ko' ? p.title : p.title_en)}</strong><time>${esc(p.date).replace(/-/g, '.')}</time></a></li>`).join('')
          : `<li class="empty">${lang === 'ko' ? '게시글이 없습니다.' : 'No posts found.'}</li>`;
      }, 200);
    });
  }
})();
