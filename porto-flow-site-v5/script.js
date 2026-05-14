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

  /* Lien actif selon page courante */
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
    var dragging  = false;
    var startX    = 0;
    var scrollLeft = 0;

    rail.addEventListener('mousedown', function (e) {
      dragging   = true;
      startX     = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
      rail.style.cursor = 'grabbing';
      rail.style.userSelect = 'none';
    });

    document.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      rail.style.cursor = '';
      rail.style.userSelect = '';
    });

    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      var x = e.pageX - rail.offsetLeft;
      rail.scrollLeft = scrollLeft - (x - startX);
    });

    /* Touch swipe */
    var touchStartX = 0;
    var touchScrollLeft = 0;
    rail.addEventListener('touchstart', function (e) {
      touchStartX     = e.touches[0].pageX;
      touchScrollLeft = rail.scrollLeft;
    }, { passive: true });

    rail.addEventListener('touchmove', function (e) {
      var dx = touchStartX - e.touches[0].pageX;
      rail.scrollLeft = touchScrollLeft + dx;
    }, { passive: true });

    /* Accessibilité clavier */
    rail.setAttribute('tabindex', '0');
    rail.setAttribute('role', 'region');
    if (!rail.getAttribute('aria-label')) {
      rail.setAttribute('aria-label', 'Contenu défilant');
    }

    rail.addEventListener('keydown', function (e) {
      var step = 240;
      if (e.key === 'ArrowRight') { rail.scrollLeft += step; e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { rail.scrollLeft -= step; e.preventDefault(); }
    });
  });
}

/* ---------------------------------------------------------
   4. LAZY LOADING IMAGES
   --------------------------------------------------------- */
function initLazyImages() {
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
        if (img.dataset.srcset) { img.srcset = img.dataset.srcset; delete img.dataset.srcset; }
        img.classList.add('lazy--loaded');
        observer.unobserve(img);
      });
    }, { rootMargin: '200px 0px' });

    $$('img[data-src], img[data-srcset]').forEach(function (img) {
      observer.observe(img);
    });
  } else {
    /* Fallback : chargement immédiat */
    $$('img[data-src]').forEach(function (img) {
      img.src = img.dataset.src;
    });
    $$('img[data-srcset]').forEach(function (img) {
      img.srcset = img.dataset.srcset;
    });
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
   7. INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initRails();
  initLazyImages();
  initFocusVisible();
  initHeaderScroll();
});