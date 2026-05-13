/* ============================================================
   PortoFlow — script.js
   Vanilla JS — No dependencies — GitHub Pages compatible
   Version V4.3.2 DesignOps — Compact Runtime
   ============================================================ */

/* ============================================================
   UTILITAIRES
   ============================================================ */
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function ready(fn) {
  if (document.readyState !== 'loading') { fn(); }
  else { document.addEventListener('DOMContentLoaded', fn); }
}

/* ============================================================
   1. MENU MOBILE BURGER — ACCESSIBLE
   ============================================================ */
function initMobileMenu() {
  var burger = qs('.nav-burger');
  var navMenu = qs('.nav-menu');
  var overlay = qs('.nav-overlay');
  if (!burger || !navMenu) return;

  if (!navMenu.id) navMenu.id = 'main-nav-menu';
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
  burger.setAttribute('aria-controls', 'main-nav-menu');
  if (overlay) overlay.setAttribute('aria-hidden', 'true');

  function openMenu() {
    burger.classList.add('is-active');
    navMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    document.body.classList.add('menu-open');
    if (overlay) { overlay.classList.add('is-visible'); overlay.setAttribute('aria-hidden', 'false'); }
    var firstLink = qs('a', navMenu);
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    burger.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
    if (overlay) { overlay.classList.remove('is-visible'); overlay.setAttribute('aria-hidden', 'true'); }
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    navMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  qsa('.nav-menu a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) { closeMenu(); burger.focus(); }
  });

  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('is-open') && !navMenu.contains(e.target) && !burger.contains(e.target)) closeMenu();
  });

  navMenu.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var els = qsa('a, button', navMenu).filter(function (el) { return el.offsetParent !== null; });
    if (!els.length) return;
    var first = els[0], last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}

/* ============================================================
   2. NAV ACTIVE — PAGE COURANTE
   ============================================================ */
function initActiveNav() {
  var file = (window.location.pathname.split('/').pop() || 'index.html');
  if (!file || file === '/') file = 'index.html';
  qsa('.nav-menu a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').split('/').pop();
    if (href === file) { a.classList.add('is-active'); a.setAttribute('aria-current', 'page'); }
  });
}

/* ============================================================
   3. STICKY HEADER
   ============================================================ */
function initStickyHeader() {
  var header = qs('.site-header, header');
  if (!header) return;
  var threshold = 60;
  function onScroll() {
    if (window.scrollY > threshold) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   4. SCROLL ANIMATIONS LÉGÈRES
   ============================================================ */
function initScrollAnimations() {
  var els = qsa('[data-animate], .bento-card, .metric-card, .callout-panel, .rail-card, .hero-split');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { el.classList.add('anim-ready'); obs.observe(el); });
}

/* ============================================================
   5. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  var btn = qs('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ============================================================
   6. SMOOTH SCROLL ANCRES
   ============================================================ */
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ============================================================
   7. COMPTEURS MÉTRIQUES
   ============================================================ */
function initCounters() {
  var els = qsa('[data-counter]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseFloat(el.getAttribute('data-counter')) || 0;
      var duration = 1200;
      var start = performance.now();
      var isFloat = String(target).includes('.');
      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var val = target * (1 - Math.pow(1 - progress, 3));
        el.textContent = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString('fr-FR');
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(function (el) { obs.observe(el); });
}

/* ============================================================
   8. TABS
   ============================================================ */
function initTabs() {
  qsa('[role="tablist"]').forEach(function (tablist) {
    var tabs = qsa('[role="tab"]', tablist);
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); t.classList.remove('is-active'); });
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('is-active');
        var panelId = tab.getAttribute('aria-controls');
        var container = tablist.closest('[data-tabs]') || document;
        qsa('[role="tabpanel"]', container).forEach(function (p) { p.hidden = true; });
        var panel = qs('#' + panelId, container);
        if (panel) panel.hidden = false;
      });
    });
  });
}

/* ============================================================
   9. ACCORDION
   ============================================================ */
function initAccordion() {
  qsa('.accordion-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var panelId = btn.getAttribute('aria-controls');
      var panel = panelId ? qs('#' + panelId) : btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
}

/* ============================================================
   10. FOCUS VISIBLE — ACCESSIBILITÉ CLAVIER
   ============================================================ */
function initFocusVisible() {
  document.addEventListener('mousedown', function () {
    document.body.classList.add('using-mouse');
    document.body.classList.remove('using-keyboard');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
      document.body.classList.add('using-keyboard');
    }
  });
}

/* ============================================================
   11. SKIP LINK
   ============================================================ */
function initSkipLink() {
  var skip = qs('.skip-link');
  if (!skip) return;
  skip.addEventListener('click', function (e) {
    var id = skip.getAttribute('href');
    if (!id || id === '#') return;
    var target = document.querySelector(id);
    if (target) { e.preventDefault(); target.setAttribute('tabindex', '-1'); target.focus(); }
  });
}

/* ============================================================
   12. LAZY IMAGES
   ============================================================ */
function initLazyImages() {
  var imgs = qsa('img[data-src]');
  if (!imgs.length) return;
  if (!('IntersectionObserver' in window)) {
    imgs.forEach(function (img) { img.src = img.getAttribute('data-src'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var img = entry.target;
      var src = img.getAttribute('data-src');
      if (src) { img.src = src; img.removeAttribute('data-src'); img.classList.add('is-loaded'); }
      obs.unobserve(img);
    });
  }, { rootMargin: '200px 0px' });
  imgs.forEach(function (img) { obs.observe(img); });
}

/* ============================================================
   13. INITIALISATION
   ============================================================ */
ready(function () {
  initSkipLink();
  initFocusVisible();
  initMobileMenu();
  initActiveNav();
  initStickyHeader();
  initScrollAnimations();
  initBackToTop();
  initSmoothScroll();
  initCounters();
  initTabs();
  initAccordion();
  initLazyImages();
});