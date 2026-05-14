(function () {
  'use strict';

  /* ─── 1. HAMBURGER NAV TOGGLE ─────────────────────────────── */
  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu   = document.querySelector('[data-nav-menu]');
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', menu.id || 'nav-menu');

    if (!menu.id) menu.id = 'nav-menu';

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
      toggle.classList.toggle('is-active', !open);
    });

    /* Ferme le menu si clic en dehors */
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.classList.remove('is-active');
      }
    });

    /* Ferme le menu sur Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.focus();
      }
    });
  }

  /* ─── 2. RAILS HORIZONTAUX SCROLLABLES ───────────────────── */
  function initRails() {
    var rails = document.querySelectorAll('[data-rail]');

    rails.forEach(function (rail) {
      var isDragging  = false;
      var startX      = 0;
      var scrollStart = 0;

      /* Drag-to-scroll souris */
      rail.addEventListener('mousedown', function (e) {
        isDragging  = true;
        startX      = e.pageX - rail.offsetLeft;
        scrollStart = rail.scrollLeft;
        rail.style.cursor = 'grabbing';
        rail.style.userSelect = 'none';
      });

      document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        rail.style.cursor = '';
        rail.style.userSelect = '';
      });

      document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.pageX - rail.offsetLeft;
        rail.scrollLeft = scrollStart - (x - startX);
      });

      /* Scroll clavier pour accessibilité */
      rail.setAttribute('tabindex', '0');
      rail.setAttribute('role', 'region');
      if (!rail.getAttribute('aria-label')) {
        rail.setAttribute('aria-label', 'Contenu défilant horizontalement');
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

      /* Boutons prev/next optionnels [data-rail-prev] / [data-rail-next] */
      var wrap = rail.closest('[data-rail-wrap]');
      if (!wrap) return;

      var btnPrev = wrap.querySelector('[data-rail-prev]');
      var btnNext = wrap.querySelector('[data-rail-next]');

      if (btnPrev) {
        btnPrev.addEventListener('click', function () {
          rail.scrollBy({ left: -280, behavior: 'smooth' });
        });
      }
      if (btnNext) {
        btnNext.addEventListener('click', function () {
          rail.scrollBy({ left: 280, behavior: 'smooth' });
        });
      }
    });
  }

  /* ─── 3. FOCUS VISIBLE ACCESSIBILITÉ ─────────────────────── */
  function initFocusVisible() {
    var usingMouse = false;

    document.addEventListener('mousedown', function () {
      usingMouse = true;
    });
    document.addEventListener('keydown', function () {
      usingMouse = false;
    });

    document.addEventListener('focusin', function (e) {
      if (usingMouse) {
        e.target.classList.add('focus-mouse');
      } else {
        e.target.classList.remove('focus-mouse');
      }
    });
    document.addEventListener('focusout', function (e) {
      e.target.classList.remove('focus-mouse');
    });
  }

  /* ─── 4. ACTIVE NAV LINK ──────────────────────────────────── */
  function initActiveLink() {
    var path  = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('[data-nav-menu] a');
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) {
        a.setAttribute('aria-current', 'page');
        a.classList.add('is-active');
      }
    });
  }

  /* ─── 5. INIT ─────────────────────────────────────────────── */
  function init() {
    initNav();
    initRails();
    initFocusVisible();
    initActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());