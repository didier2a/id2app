/* ============================================================
   PortoFlow Site V2 — script.js
   Comportements globaux légers : burger, smooth scroll, form
   Aucune dépendance externe
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. BURGER MENU TOGGLE
  ---------------------------------------------------------- */
  function initBurger() {
    var burger = document.querySelector('[data-burger]');
    var navMenu = document.querySelector('[data-nav-menu]');
    var overlay = document.querySelector('[data-nav-overlay]');

    if (!burger || !navMenu) return;

    function openMenu() {
      navMenu.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.classList.add('is-active');
      if (overlay) overlay.classList.add('is-visible');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      navMenu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('is-active');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.classList.remove('menu-open');
    }

    burger.addEventListener('click', function () {
      var isOpen = navMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ----------------------------------------------------------
     2. SMOOTH SCROLL ANCHORS
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var target = e.target.closest('a[href^="#"]');
      if (!target) return;

      var hash = target.getAttribute('href');
      if (hash === '#') return;

      var destination = document.querySelector(hash);
      if (!destination) return;

      e.preventDefault();

      var headerEl = document.querySelector('[data-header]');
      var offset = headerEl ? headerEl.offsetHeight : 0;
      var top = destination.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });

      history.pushState(null, '', hash);
    });
  }

  /* ----------------------------------------------------------
     3. HEADER SCROLL STATE
  ---------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.querySelector('[data-header]');
    if (!header) return;

    var threshold = 60;

    function onScroll() {
      if (window.scrollY > threshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     4. FORM VALIDATION — CONTACT
  ---------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    var fields = {
      name: { el: form.querySelector('[name="name"]'), min: 2 },
      email: { el: form.querySelector('[name="email"]'), pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      message: { el: form.querySelector('[name="message"]'), min: 10 }
    };

    function showError(el, msg) {
      var err = el.parentElement.querySelector('[data-error]');
      el.classList.add('is-invalid');
      if (err) err.textContent = msg;
    }

    function clearError(el) {
      var err = el.parentElement.querySelector('[data-error]');
      el.classList.remove('is-invalid');
      if (err) err.textContent = '';
    }

    function validateField(key) {
      var f = fields[key];
      if (!f.el) return true;
      var val = f.el.value.trim();

      if (!val) { showError(f.el, 'Ce champ est requis.'); return false; }
      if (f.min && val.length < f.min) { showError(f.el, 'Trop court.'); return false; }
      if (f.pattern && !f.pattern.test(val)) { showError(f.el, 'Format invalide.'); return false; }

      clearError(f.el);
      return true;
    }

    Object.keys(fields).forEach(function (key) {
      var f = fields[key];
      if (f.el) {
        f.el.addEventListener('blur', function () { validateField(key); });
        f.el.addEventListener('input', function () { clearError(f.el); });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = Object.keys(fields).map(validateField).every(Boolean);
      if (!valid) return;

      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }

      var success = form.querySelector('[data-form-success]');
      setTimeout(function () {
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = 'Envoyer'; }
        if (success) success.classList.add('is-visible');
      }, 1200);
    });
  }

  /* ----------------------------------------------------------
     5. INIT
  ---------------------------------------------------------- */
  function init() {
    initBurger();
    initSmoothScroll();
    initHeaderScroll();
    initContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();