'use strict';

/* =========================================================
   PortoFlow Site V5 — script.js
   Vanilla JS · Menu mobile · Rail swipe · Lazy load · A11y
   ========================================================= */

/* ---------------------------------------------------------
   1. UTILITAIRES
   --------------------------------------------------------- */
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

/* ---------------------------------------------------------
   2. MENU HAMBURGER MOBILE
   --------------------------------------------------------- */
function initNav() {
  var toggle = $('#nav-toggle');
  var menu   = $('#nav-menu');
  if (!toggle || !menu) return;

  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'nav-menu');
  menu.setAttribute('aria-hidden', 'true');

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menu.classList.add('nav-menu--open');
    toggle.classList.add('is-active');
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.classList.remove('nav-menu--open');
    toggle.classList.remove('is-active');
  }

  toggle.addEventListener('click', function () {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) { closeMenu(); }
  });

  var current = location.pathname.split('/').pop().replace('.html', '') || 'index';
  $$('a[data-slug]', menu).forEach(function (a) {
    if (a.dataset.slug === current) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('nav__link--active');
    }
  });
}

/* ---------------------------------------------------------
   3. RAILS — DRAG SCROLL + CLAVIER
   --------------------------------------------------------- */
function initRails() {
  $$('.rail').forEach(function (rail) {
    var dragging = false;
    var startX   = 0;
    var scrollL  = 0;

    rail.addEventListener('mousedown', function (e) {
      dragging = true;
      startX   = e.pageX - rail.offsetLeft;
      scrollL  = rail.scrollLeft;
      rail.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', function () {
      dragging = false;
      rail.style.cursor = '';
    });

    rail.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      var x = e.pageX - rail.offsetLeft;
      rail.scrollLeft = scrollL - (x - startX);
    });

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { rail.scrollLeft += 240; }
      if (e.key === 'ArrowLeft')  { rail.scrollLeft -= 240; }
    });
  });
}

/* ---------------------------------------------------------
   4. LAZY IMAGES
   --------------------------------------------------------- */
function initLazyImages() {
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var img = entry.target;
        if (img.dataset.src)    { img.src    = img.dataset.src; }
        if (img.dataset.srcset) { img.srcset = img.dataset.srcset; }
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        io.unobserve(img);
      });
    }, { rootMargin: '200px' });

    $$('img[data-src], img[data-srcset]').forEach(function (img) {
      io.observe(img);
    });
  } else {
    $$('img[data-src]').forEach(function (img) { img.src = img.dataset.src; });
    $$('img[data-srcset]').forEach(function (img) { img.srcset = img.dataset.srcset; });
  }
}

/* ---------------------------------------------------------
   5. FOCUS VISIBLE — POLYFILL LÉGER
   --------------------------------------------------------- */
function initFocusVisible() {
  var usingMouse = false;
  document.addEventListener('mousedown', function () { usingMouse = true; });
  document.addEventListener('keydown',   function () { usingMouse = false; });
  document.addEventListener('focusin', function (e) {
    if (usingMouse) { e.target.classList.add('focus-mouse'); }
    else            { e.target.classList.remove('focus-mouse'); }
  });
}

/* ---------------------------------------------------------
   6. HEADER SCROLL SHADOW
   --------------------------------------------------------- */
function initHeaderScroll() {
  var header = $('header, .site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('header--scrolled', window.scrollY > 8);
  }, { passive: true });
}

/* ---------------------------------------------------------
   7. CTA LIGHTWEIGHT — ripple + tracking hook
   --------------------------------------------------------- */
function initCTA() {
  $$('.btn-primary, .btn-secondary').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var r = document.createElement('span');
      r.className = 'btn-ripple';
      var rect = btn.getBoundingClientRect();
      r.style.left   = (e.clientX - rect.left) + 'px';
      r.style.top    = (e.clientY - rect.top)  + 'px';
      btn.appendChild(r);
      setTimeout(function () { r.remove(); }, 600);
    });
  });
}

/* ---------------------------------------------------------
   8. INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initRails();
  initLazyImages();
  initFocusVisible();
  initHeaderScroll();
  initCTA();
});