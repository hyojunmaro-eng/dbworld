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
  const clearHdr = document.body.classList.contains('gnb-clear');
  let lastY = 0;
  function onScroll() {
    const y = scrollY;
    lastY = y;
    $('[data-totop]').classList.toggle('show', y > 700);
    if (clearHdr && !document.body.classList.contains('menu-open')) gnb.classList.toggle('solid', y > 8);
  }
  if (!isHome && !clearHdr) gnb.classList.add('solid');
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $('[data-totop]').addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

  /* ---------- 메가메뉴 (데스크톱) ---------- */
  const navRoot = $('.nav');
  const megaBg = $('.mega-bg');
  if (navRoot && megaBg) {
    let forcedSolid = false;
    /* 패널 높이는 '메뉴가 다 벌어진 최종 상태' 기준으로 미리 잰다.
       열리는 순간 재면 컬럼이 아직 좁아 글자가 더 접히고, 나중에 다시 재면 높이가 줄어 화면이 튄다. */
    let panelH = 0;
    const measurePanel = () => {
      if (!matchMedia('(min-width: 1081px)').matches) return;
      const cols = $$('.nav-l2', navRoot);
      if (!cols.length) return;
      gnb.classList.add('mega-measure');
      cols.forEach(u => { u.style.minHeight = ''; });
      let h = 0;
      cols.forEach(u => { h = Math.max(h, u.offsetHeight); });
      const offset = Math.max(0, cols[0].getBoundingClientRect().top - megaBg.getBoundingClientRect().top);
      gnb.classList.remove('mega-measure');
      cols.forEach(u => { u.style.minHeight = h + 'px'; });
      panelH = h + offset;
    };
    let reMeasure;
    addEventListener('resize', () => { clearTimeout(reMeasure); reMeasure = setTimeout(() => { panelH = 0; measurePanel(); }, 200); }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { panelH = 0; measurePanel(); });
    const openMega = () => {
      if (!matchMedia('(min-width: 1081px)').matches) return;
      if (clearHdr && !gnb.classList.contains('solid')) { gnb.classList.add('solid'); forcedSolid = true; }
      gnb.classList.add('mega-on');
      if (!panelH) measurePanel();
      megaBg.style.height = panelH + 'px';
    };
    const closeMega = () => {
      gnb.classList.remove('mega-on');
      releaseLock();
      lis.forEach(x => x.classList.remove('on'));
      if (forcedSolid && scrollY <= 8) { gnb.classList.remove('solid'); }
      forcedSolid = false;
    };
    const lis = $$('.nav-l1 > li', navRoot);
    const setActive = li => lis.forEach(x => x.classList.toggle('on', x === li));
    /* 패널이 열리며 메뉴 간격이 벌어지는 동안에는 커서가 옆 항목으로 밀려도
       처음 가리킨 메뉴를 유지한다. 전환이 끝난 뒤 실제로 마우스를 움직이면 해제. */
    let locked = false, unlockTimer = null, onMove = null;
    const releaseLock = () => {
      clearTimeout(unlockTimer);
      if (onMove) { navRoot.removeEventListener('mousemove', onMove); onMove = null; }
      locked = false;
    };
    lis.forEach(li => {
      const pick = () => {
        if (locked) return;
        const first = !gnb.classList.contains('mega-on');
        setActive(li);
        openMega();
        if (first && matchMedia('(min-width: 1081px)').matches) {
          locked = true;
          unlockTimer = setTimeout(() => {
            onMove = e => {
              releaseLock();
              const over = e.target.closest && e.target.closest('.nav-l1 > li');
              if (over) setActive(over);
            };
            navRoot.addEventListener('mousemove', onMove);
          }, 380);
        }
      };
      li.addEventListener('mouseenter', pick);
      li.addEventListener('focusin', pick);
    });
    navRoot.addEventListener('mouseleave', closeMega);
    navRoot.addEventListener('focusin', openMega);
    navRoot.addEventListener('focusout', e => { if (!navRoot.contains(e.relatedTarget)) closeMega(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') closeMega(); });
  }

  /* ---------- 모바일 메뉴 ---------- */
  const burger = $('[data-burger]');
  const mnav = $('[data-mnav]');
  burger.addEventListener('click', () => {
    const open = mnav.hidden;
    mnav.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) gnb.classList.add('solid');
    else if (document.body.classList.contains('gnb-clear') && scrollY <= 8) gnb.classList.remove('solid');
  });

  /* ---------- 패밀리사이트 (위로 열리는 드롭다운) ---------- */
  const fam = $('[data-fam]');
  if (fam) {
    const btn = $('[data-famtoggle]', fam);
    const list = $('.fam-list', fam);
    const setOpen = on => {
      fam.classList.toggle('on', on);
      list.hidden = !on;
      btn.setAttribute('aria-expanded', String(on));
    };
    btn.addEventListener('click', e => { e.stopPropagation(); setOpen(list.hidden); });
    document.addEventListener('click', e => { if (!fam.contains(e.target)) setOpen(false); });
    fam.addEventListener('keydown', e => { if (e.key === 'Escape') { setOpen(false); btn.focus(); } });
  }

  /* ---------- 언어 전환: 현재 경로 유지 ---------- */
  const langBtn = $('[data-langswitch]');
  const switchLang = () => {
    const target = document.body.dataset.lang === 'ko' ? 'en' : 'ko';
    location.href = location.pathname.replace(/\/(ko|en)\//, '/' + target + '/');
  };
  if (langBtn) langBtn.addEventListener('click', e => { e.preventDefault(); switchLang(); });
  // 모바일(컴팩트 표시)에서는 필 전체 탭으로 전환
  const langPill = $('.lang');
  if (langPill) langPill.addEventListener('click', e => {
    if (!matchMedia('(max-width: 1080px)').matches || e.target.closest('[data-langswitch]')) return;
    if (document.body.classList.contains('menu-open')) return; // 열림 상태에선 KOR/ENG 각자 탭
    switchLang();
  });

  /* ---------- 히어로 슬라이더 ---------- */
  const hero = $('[data-hero]');
  if (hero) {
    const slides = $$('[data-slide]', hero);
    const dots = $$('[data-dot]', hero);
    const playBtn = $('[data-heroplay]', hero);
    let cur = 0;
    function go(i) {
      slides[cur].classList.remove('on'); dots[cur].classList.remove('on');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('on'); dots[cur].classList.add('on');
    }
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    /* 진행바 애니메이션이 끝나면 다음 슬라이드로 — 진행바와 전환 시점이 항상 일치 */
    hero.addEventListener('animationend', e => {
      if (e.animationName === 'heroFill' && !reduced && slides.length > 1) go(cur + 1);
    });
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const paused = hero.classList.toggle('paused');
        playBtn.setAttribute('aria-label', playBtn.dataset[paused ? 'labelPlay' : 'labelPause'] || '');
        playBtn.setAttribute('aria-pressed', String(paused));
      });
    }
    if (reduced || slides.length < 2) hero.classList.add('paused');
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
    const pick = p => { city = city === p.dataset.city ? null : p.dataset.city; apply(); };
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

  /* ---------- 사업영역: 실적 필터 ---------- */
  $$('[data-devfilter]').forEach(b => b.addEventListener('click', () => {
    const wrap = b.closest('.dev-body');
    wrap.querySelectorAll('[data-devfilter]').forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.devfilter;
    wrap.querySelectorAll('[data-devgroup]').forEach(card => { card.hidden = f !== 'all' && card.dataset.devgroup !== f; });
  }));

  /* ---------- 사업영역: 부동산 개발 탭 ---------- */
  $$('[data-devtab]').forEach(t => t.addEventListener('click', () => {
    $$('[data-devtab]').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('on'); t.setAttribute('aria-selected', 'true');
    $$('[data-devpanel]').forEach(p => p.classList.toggle('on', p.dataset.devpanel === t.dataset.devtab));
  }));

  /* ---------- 약관 모달 (개인정보 처리방침 / 이메일 무단수집 거부) ---------- */
  (function () {
    let opener = null;
    const close = () => {
      const open = $('.emod:not([hidden])');
      if (!open) return;
      open.hidden = true;
      document.body.classList.remove('pop-open');
      if (opener) { opener.focus(); opener = null; }
    };
    const open = (id, btn) => {
      const el = $('#' + id);
      if (!el) return;
      opener = btn || null;
      el.hidden = false;
      document.body.classList.add('pop-open');
      const sc = $('.emod-scroll', el);
      if (sc) { sc.scrollTop = 0; sc.focus(); }
      else { const x = $('.emod-x', el); if (x) x.focus(); }
    };
    $$('[data-privacymodal]').forEach(b => b.addEventListener('click', () => open('privacyModal', b)));
    $$('[data-emailmodal]').forEach(b => b.addEventListener('click', () => open('emailModal', b)));
    $$('.emod').forEach(el => el.addEventListener('click', e => {
      if (e.target === el || e.target.closest('[data-emodclose]')) close();
    }));
    addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  })();

  /* ---------- 팝업 (관리자 등록 — 노출 페이지·기간·기기 조건) ---------- */
  (async () => {
    const pm = location.pathname.match(/^(.*?)\/(ko|en)(\/.*)?$/);
    if (!pm) return;
    const base = pm[1];
    const here = (pm[3] || '/').replace(/index\.html$/, ''); // 언어 무관 페이지 키 (예: /about/ceo/)
    const en = pm[2] === 'en';
    let pops;
    try { pops = await fetch(base + '/popups.json', { cache: 'no-cache' }).then(r => r.ok ? r.json() : []); } catch { return; }
    const d = new Date();
    const today = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const mob = matchMedia('(max-width: 768px)').matches;
    const hidden = id => { try { return localStorage.getItem('dbw_pop_' + id) === today; } catch { return false; } };
    const onPage = p => { const pg = Array.isArray(p.pages) && p.pages.length ? p.pages : ['/']; return pg.includes('*') || pg.includes(here); };
    const src = p => p.img.charAt(0) === '/' ? base + p.img : p.img;
    const href = l => {
      l = String(l || '').trim();
      if (/^https?:\/\//i.test(l)) return l;
      if (l.charAt(0) === '/' && l.charAt(1) !== '/') return base + l;
      if (/^[\w-]+(\.[\w-]+)+(\/|$)/.test(l)) return 'https://' + l;
      return ''; // javascript: 등 그 밖의 형식은 링크 없이 표시
    };
    let act = (Array.isArray(pops) ? pops : []).filter(p => p && p.id && p.img && p.enabled
      && (p.always || ((!p.start || p.start <= today) && (!p.end || today <= p.end)))
      && (!p.device || p.device === 'all' || (p.device === 'mobile') === mob)
      && onPage(p) && !hidden(p.id));
    if (!act.length) return;
    // 이미지를 먼저 받아 두고 표시 (깨진 이미지·높이 튐 방지) — 못 불러온 팝업은 건너뜀
    const ok = await Promise.all(act.map(p => new Promise(res => {
      const im = new Image();
      im.onload = () => res(true); im.onerror = () => res(false);
      im.src = src(p);
    })));
    act = act.filter((_, i) => ok[i]);
    if (!act.length) return;
    const T = en ? { today: "Don't show again today", close: 'Close', label: 'Notice' } : { today: '오늘 하루 보지 않기', close: '닫기', label: '안내 팝업' };
    const ov = document.createElement('div');
    ov.className = 'pop-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', T.label);
    ov.innerHTML = '<div class="pop-box"><div class="pop-row">' + act.map(p => {
      const img = '<img src="' + esc(src(p)) + '" alt="' + T.label + '">';
      const url = href(p.link);
      const body = url
        ? '<a class="pop-img" href="' + esc(url) + '"' + (p.newtab !== false ? ' target="_blank" rel="noopener"' : '') + '>' + img + '</a>'
        : '<div class="pop-img">' + img + '</div>';
      return '<div class="pop-card" data-pid="' + esc(p.id) + '">' + body +
        '<div class="pop-bar"><button type="button" class="pop-today" data-ptoday>' + T.today + '</button>' +
        '<button type="button" class="pop-x" data-pclose aria-label="' + T.close + '"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 4.5l11 11M15.5 4.5l-11 11"/></svg></button></div></div>';
    }).join('') + '</div><div class="pop-dots">' + act.map((_, i) => '<i' + (i === 0 ? ' class="on"' : '') + '></i>').join('') + '</div></div>';
    document.body.appendChild(ov);
    document.body.classList.add('pop-open');
    const row = ov.querySelector('.pop-row');
    const onKey = e => { if (e.key === 'Escape') closeAll(); };
    const closeAll = () => { ov.remove(); document.body.classList.remove('pop-open'); removeEventListener('keydown', onKey); };
    const syncDots = () => {
      const cards = [...ov.querySelectorAll('.pop-card')];
      const wrap = ov.querySelector('.pop-dots');
      if (!wrap) return;
      if (cards.length < 2) return wrap.remove();
      const mid = row.scrollLeft + row.clientWidth / 2;
      let best = 0, bd = Infinity;
      cards.forEach((c, i) => { const cd = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (cd < bd) { bd = cd; best = i; } });
      wrap.innerHTML = cards.map((_, i) => '<i' + (i === best ? ' class="on"' : '') + '></i>').join('');
    };
    const closeCard = card => {
      card.remove();
      if (!ov.querySelector('.pop-card')) return closeAll();
      syncDots();
    };
    ov.addEventListener('click', e => {
      const card = e.target.closest('.pop-card');
      if (e.target.closest('[data-pclose]')) return closeCard(card);
      if (e.target.closest('[data-ptoday]')) {
        try { localStorage.setItem('dbw_pop_' + card.dataset.pid, today); } catch {}
        return closeCard(card);
      }
      if (e.target === ov) closeAll();
    });
    addEventListener('keydown', onKey);
    row.addEventListener('scroll', syncDots, { passive: true });
  })();

  /* ---------- DART iframe 폭맞춤 ---------- */
  const dartWrap = $('[data-dartfit]');
  if (dartWrap) {
    const ifr = $('iframe', dartWrap);
    const BASE = parseInt(dartWrap.dataset.dartfit, 10) || 1080;
    function fitDart() {
      const w = dartWrap.clientWidth;
      if (w >= BASE) {
        const s = w / BASE;
        const h = 1500;
        ifr.style.width = BASE + 'px';
        ifr.style.height = Math.round(h / s) + 'px';
        ifr.style.transform = 'scale(' + s + ')';
        dartWrap.style.height = h + 'px';
      } else {
        ifr.style.width = '100%';
        ifr.style.height = '1000px';
        ifr.style.transform = 'none';
        dartWrap.style.height = 'auto';
      }
    }
    fitDart();
    addEventListener('resize', fitDart, { passive: true });
  }

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
