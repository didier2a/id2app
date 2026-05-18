document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector('[data-pf-nav-toggle]');
  const panel = document.querySelector('[data-pf-nav-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('pf-mobile-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      document.body.classList.remove('pf-mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('.pf-card,.pf-bento,.pf-dashboard__card').forEach(el => {
    el.addEventListener('mouseenter', () => el.style.transform = 'translateY(-3px)');
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });

  /* ID2App UX Harmonizer V4.4.7.6C */

  // Helper to get current page path without query/hash
  function getCurrentPath() {
    return window.location.pathname.replace(/\/$/, '');
  }

  // Set aria-current and active class on nav links matching current page
  function setActiveNavLinks() {
    const navLinks = document.querySelectorAll('nav a[href]');
    const currentPath = getCurrentPath();
    navLinks.forEach(link => {
      // Normalize link href path
      const url = new URL(link.href, window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, '');
      if (linkPath === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Add click active state for nav links (toggle active class on click)
  function addClickActiveState() {
    const navLinks = document.querySelectorAll('nav a[href]');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        // Update aria-current accordingly
        navLinks.forEach(l => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
      });
    });
  }

  // Scrollspy implementation using IntersectionObserver
  function initScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    if (navLinks.length === 0) return;

    // Map href to section element, create ids if missing
    const sections = navLinks.map(link => {
      let id = link.getAttribute('href').slice(1);
      let section = document.getElementById(id);
      if (!section) {
        // Try to find by name attribute or create id dynamically
        section = document.querySelector(`[name="${id}"]`);
        if (!section) {
          // Create a dummy section to avoid errors (skip if no section found)
          return null;
        }
        // If found by name but no id, add id for scrollspy
        if (!section.id) section.id = id;
      }
      return section;
    }).filter(Boolean);

    if (sections.length === 0) return;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let activeLink = null;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -70% 0px', // Trigger when section top is near top of viewport
      threshold: prefersReducedMotion ? 0.5 : 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = navLinks.find(a => a.getAttribute('href') === `#${id}`);
        if (!link) return;

        if (entry.isIntersecting) {
          if (activeLink && activeLink !== link) {
            activeLink.classList.remove('active');
            activeLink.removeAttribute('aria-current');
          }
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          activeLink = link;
        } else {
          if (link === activeLink) {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            activeLink = null;
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // Focus visible polyfill for keyboard focus indication
  function initFocusVisible() {
    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
      }
    }
    function handleMouseDownOnce() {
      document.body.classList.remove('user-is-tabbing');
      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleFirstTab);
    }
    window.addEventListener('keydown', handleFirstTab);
  }

  // Initialize all UX enhancements
  function initUX() {
    setActiveNavLinks();
    addClickActiveState();
    initScrollSpy();
    initFocusVisible();
  }

  initUX();

});