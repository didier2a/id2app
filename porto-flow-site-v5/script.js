'use strict';

/* =========================================================
   PortoFlow Site V5 — script.js
   Vanilla JS · Menu mobile · Rail swipe · Accessibilité
   ========================================================= */

/* ---------------------------------------------------------
   1. UTILITAIRES
   --------------------------------------------------------- */
function $(sel, ctx) {
  return (ctx || document).querySelector(sel);
}
function $$(sel, ctx) {
  return Array.from((ctx || document).querySelectorAll(sel));
}

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

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.setAttribute('aria-hidden', String(open));
    menu.classList.toggle('nav-menu--open', !open);
    toggle.classList.toggle('is-active', !open);
  });

  /* Fermer sur Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      menu.classList.remove('nav-menu--open');
      toggle.classList.remove('is-active');
      toggle.focus();
    }
  });

  /* Fermer si clic hors menu */
  document.addEventListener('click', function (e) {
    if (
      toggle.getAttribute('aria-expanded') === 'true' &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      menu.classList.remove('nav-menu--open');
      toggle.classList.remove('is-active');
    }
  });

  /* Marquer le lien actif selon la page courante */
  var current = location.pathname.split('/').pop().replace('.html', '') || 'index';
  $$('a[data-slug]', menu).forEach(function (a) {
    if (a.dataset.slug === current) {
      a.setAttribute('aria-current', 'page');
      a.classList.add('nav__link--active');
    }
  });
}

/* ---------------------------------------------------------
   3. RAILS HORIZONTAUX — SWIPE & SCROLL CLAVIER
   --------------------------------------------------------- */
function initRails() {
  $$('.rail').forEach(function (rail) {
    var startX = 0;
    var scrollLeft = 0;
    var dragging = false;

    /* Touch swipe */
    rail.addEventListener('touchstart', function (e) {
      startX = e.touches[0].pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
    }, { passive: true });

    rail.addEventListener('touchmove', function (e) {
      var x = e.touches[0].pageX - rail.offsetLeft;
      rail.scrollLeft = scrollLeft - (x - startX);
    }, { passive: true });

    /* Drag souris */
    rail.addEventListener('mousedown', function (e) {
      dragging = true;
      startX = e.pageX - rail.offsetLeft;
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

    /* Navigation clavier dans le rail */
    rail.setAttribute('tabindex', '0');
    rail.setAttribute('role', 'region');
    if (!rail.getAttribute('aria-label')) {
      rail.setAttribute('aria-label', 'Contenu défilant');
    }

    rail.addEventListener('keydown', function (e) {
      var step = 240;
      if (e.key === 'ArrowRight') {
        rail.scrollLeft += step;
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        rail.scrollLeft -= step;
        e.preventDefault();
      }
    });
  });
}

/* ---------------------------------------------------------
   4. FOCUS VISIBLE — POLYFILL LÉGER
   --------------------------------------------------------- */
function initFocusVisible() {
  var usingMouse = false;
  document.addEventListener('mousedown', function () { usingMouse = true; });
  document.addEventListener('keydown',   function () { usingMouse = false; });
  document.addEventListener('focusin', function (e) {
    if (usingMouse) {
      e.target.classList.add('focus-mouse');
    } else {
      e.target.classList.remove('focus-mouse');
    }
  });
}

/* ---------------------------------------------------------
   5. INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initRails();
  initFocusVisible();
});