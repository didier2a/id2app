/**
 * PortoFlow V4.4.5 — Premium UX Shell · script.js
 * Interactions légères : nav mobile, états actifs, année courante, scroll header
 * Aucune dépendance externe — Vanilla JS ES6+
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
   * 1. ANNÉE COURANTE
   * ───────────────────────────────────────────── */
  function injectCurrentYear() {
    const targets = document.querySelectorAll('[data-year]');
    const year = new Date().getFullYear();
    targets.forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ─────────────────────────────────────────────
   * 2. NAVIGATION MOBILE — DRAWER TOGGLE
   * ───────────────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const drawer = document.querySelector('[data-nav-drawer]');
    const overlay = document.querySelector('[data-nav-overlay]');
    const body = document.body;

    if (!toggle || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      body.classList.add('nav-open');
      if (overlay) overlay.classList.add('is-visible');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('nav-open');
      if (overlay) overlay.classList.remove('is-visible');
    }

    toggle.addEventListener('click', function () {
      const isOpen = drawer.classList.contains('is-open');
      isOpen ? closeDrawer() : openDrawer();
    });

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    /* Fermeture sur Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
        toggle.focus();
      }
    });

    /* Fermeture sur clic d'un lien du drawer */
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ─────────────────────────────────────────────
   * 3. ÉTAT ACTIF DE NAVIGATION
   * ───────────────────────────────────────────── */
  function setActiveNavItem() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.pf-nav a, [data-nav-drawer] a');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkFile = href.split('/').pop();

      /* Cas index : index.html ou '' ou '/' */
      const isIndex =
        (currentPath === '' || currentPath === 'index.html') &&
        (linkFile === 'index.html' || linkFile === '' || href === '/');

      const isMatch = linkFile === currentPath;

      if (isIndex || isMatch) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');

        /* Remonte au li parent si présent */
        const li = link.closest('li');
        if (li) li.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
        const li = link.closest('li');
        if (li) li.classList.remove('is-active');
      }
    });
  }

  /* ─────────────────────────────────────────────
   * 4. HEADER STICKY — GLASS SCROLL STATE
   * ───────────────────────────────────────────── */
  function initStickyHeader() {
    const header = document.querySelector('.pf-header');
    if (!header) return;

    let lastScroll = 0;
    const THRESHOLD = 60;

    function onScroll() {
      const current = window.scrollY;

      if (current > THRESHOLD) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      /* Masquage au scroll vers le bas, réapparition vers le haut */
      if (current > lastScroll && current > 200) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }

      lastScroll = current <= 0 ? 0 : current;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─────────────────────────────────────────────
   * 5. ANIMATIONS D'ENTRÉE — INTERSECTION OBSERVER
   * ───────────────────────────────────────────── */
  function initRevealAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
   * 6. COMPTEURS ANIMÉS — MÉTRIQUES / KPI
   * ───────────────────────────────────────────── */
  function initCounters() {
    if (!('IntersectionObserver' in window)) return;

    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function animateCounter(el) {
      const target = parseFloat(el.getAttribute('data-counter')) || 0;
      const duration = parseInt(el.getAttribute('data-counter-duration')) || 1600;
      const decimals = parseInt(el.getAttribute('data-counter-decimals')) || 0;
      const prefix = el.getAttribute('data-counter-prefix') || '';
      const suffix = el.getAttribute('data-counter-suffix') || '';
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        /* Ease out cubic */
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = (eased * target).toFixed(decimals);
        el.textContent = prefix + value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
   * 7. TABS / PANELS LÉGERS
   * ───────────────────────────────────────────── */
  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-tabs]');
    if (!tabGroups.length) return;

    tabGroups.forEach(function (group) {
      const tabs = group.querySelectorAll('[data-tab]');
      const panels = group.querySelectorAll('[data-tab-panel]');

      function activateTab(targetId) {
        tabs.forEach(function (tab) {
          const isTarget = tab.getAttribute('data-tab') === targetId;
          tab.classList.toggle('is-active', isTarget);
          tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        });
        panels.forEach(function (panel) {
          const isTarget = panel.getAttribute('data-tab-panel') === targetId;
          panel.classList.toggle('is-active', isTarget);
          panel.hidden = !isTarget;
        });
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activateTab(tab.getAttribute('data-tab'));
        });
        tab.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activateTab(tab.getAttribute('data-tab'));
          }
        });
      });

      /* Activer le premier tab par défaut */
      if (tabs.length > 0) {
        const firstId = tabs[0].getAttribute('data-tab');
        if (firstId) activateTab(firstId);
      }
    });
  }

  /* ─────────────────────────────────────────────
   * 8. SMOOTH SCROLL — ANCRES INTERNES
   * ───────────────────────────────────────────── */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector('.pf-header');
      const offset = header ? header.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────
   * 9. HERO — PARALLAX LÉGER (optionnel, réduit)
   * ───────────────────────────────────────────── */
  function initHeroParallax() {
    const hero = document.querySelector('[data-hero-parallax]');
    if (!hero) return;

    /* Désactivé sur mobile pour performance */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    function onScroll() {
      const scrolled = window.scrollY;
      const rate = parseFloat(hero.getAttribute('data-hero-parallax')) || 0.3;
      hero.style.transform = 'translateY(' + scrolled * rate + 'px)';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─────────────────────────────────────────────
   * 10. FOCUS TRAP — ACCESSIBILITÉ DRAWER
   * ───────────────────────────────────────────── */
  function initFocusTrap() {
    const drawer = document.querySelector('[data-nav-drawer]');
    if (!drawer) return;

    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;
      if (e.key !== 'Tab') return;

      const focusable = drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ─────────────────────────────────────────────
   * INIT — DOMContentLoaded
   * ───────────────────────────────────────────── */
  function init() {
    injectCurrentYear();
    setActiveNavItem();
    initMobileNav();
    initStickyHeader();
    initRevealAnimations();
    initCounters();
    initTabs();
    initSmoothScroll();
    initHeroParallax();
    initFocusTrap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();