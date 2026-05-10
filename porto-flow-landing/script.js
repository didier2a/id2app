'use strict';

/* ============================================================
   PORTO FLOW — Main Script
   Vanilla JS · No external dependencies
   ============================================================ */

/* ------------------------------------------------------------
   Utility helpers
   ------------------------------------------------------------ */

/**
 * Shorthand querySelectorAll returning an Array
 * @param {string} selector
 * @param {Document|Element} ctx
 * @returns {Element[]}
 */
function $$(selector, ctx = document) {
  return Array.from(ctx.querySelectorAll(selector));
}

/**
 * Shorthand querySelector
 * @param {string} selector
 * @param {Document|Element} ctx
 * @returns {Element|null}
 */
function $(selector, ctx = document) {
  return ctx.querySelector(selector);
}

/**
 * Add one or multiple classes to an element
 * @param {Element} el
 * @param {...string} classes
 */
function addClass(el, ...classes) {
  if (el) el.classList.add(...classes);
}

/**
 * Remove one or multiple classes from an element
 * @param {Element} el
 * @param {...string} classes
 */
function removeClass(el, ...classes) {
  if (el) el.classList.remove(...classes);
}

/**
 * Toggle a class on an element
 * @param {Element} el
 * @param {string} cls
 * @param {boolean} [force]
 */
function toggleClass(el, cls, force) {
  if (el) el.classList.toggle(cls, force);
}

/**
 * Debounce a function call
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle a function call
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/* ------------------------------------------------------------
   Constants
   ------------------------------------------------------------ */

const HEADER_SCROLL_THRESHOLD = 60;        // px before header becomes sticky-styled
const SCROLL_ANIMATION_OFFSET  = 80;       // px from viewport bottom to trigger animation
const SMOOTH_SCROLL_DURATION   = 700;      // ms for custom smooth scroll
const MOBILE_BREAKPOINT        = 768;      // px

/* ------------------------------------------------------------
   1. Header — sticky behaviour & scroll class
   ------------------------------------------------------------ */

function initStickyHeader() {
  const header = $('header, .header, [data-header]');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > HEADER_SCROLL_THRESHOLD) {
      addClass(header, 'is-scrolled');
    } else {
      removeClass(header, 'is-scrolled');
    }
  }

  window.addEventListener('scroll', throttle(onScroll, 100), { passive: true });
  onScroll(); // run once on init
}

/* ------------------------------------------------------------
   2. Mobile menu — burger toggle
   ------------------------------------------------------------ */

function initMobileMenu() {
  const burger   = $('[data-burger], .burger, .hamburger, .nav-toggle');
  const navMenu  = $('[data-nav-menu], .nav-menu, .mobile-menu, .nav__list');
  const navLinks = $$('a[href]', navMenu || document);

  if (!burger || !navMenu) return;

  // Ensure accessibility attributes exist
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', navMenu.id || 'nav-menu');
  burger.setAttribute('role', 'button');
  burger.setAttribute('tabindex', '0');

  if (!navMenu.id) navMenu.id = 'nav-menu';

  function openMenu() {
    addClass(burger, 'is-active');
    addClass(navMenu, 'is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    removeClass(burger, 'is-active');
    removeClass(navMenu, 'is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  }

  burger.addEventListener('click', toggleMenu);

  // Close menu on keyboard Enter / Space
  burger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when a nav link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
      burger.focus();
    }
  });

  // Re-open if window resizes above breakpoint
  window.addEventListener(
    'resize',
    debounce(() => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        closeMenu();
      }
    }, 200)
  );
}

/* ------------------------------------------------------------
   3. Smooth scroll — anchor links
   ------------------------------------------------------------ */

/**
 * Custom smooth scroll with easing
 * @param {number} targetY
 * @param {number} duration
 */
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff   = targetY - startY;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const hash   = link.getAttribute('href');
    if (hash === '#') return;

    const target = $(hash);
    if (!target) return;

    e.preventDefault();

    const header      = $('header, .header, [data-header]');
    const headerH     = header ? header.offsetHeight : 0;
    const targetY     = target.getBoundingClientRect().top + window.scrollY - headerH - 16;

    smoothScrollTo(Math.max(0, targetY), SMOOTH_SCROLL_DURATION);

    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, hash);
    }
  });
}

/* ------------------------------------------------------------
   4. Scroll-reveal animations
   ------------------------------------------------------------ */

function initScrollAnimations() {
  const animatables = $$('[data-animate], .animate-on-scroll, .reveal');

  if (!animatables.length) return;

  // Use IntersectionObserver when available
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            addClass(entry.target, 'is-visible');
            // Once visible, no need to keep observing
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: `0px 0px -${SCROLL_ANIMATION_OFFSET}px 0px`,
      }
    );

    animatables.forEach((el) => {
      // Assign staggered delay if siblings share data-stagger parent
      const staggerParent = el.closest('[data-stagger]');
      if (staggerParent) {
        const siblings = $$('[data-animate], .animate-on-scroll, .reveal', staggerParent);
        const index    = siblings.indexOf(el);
        el.style.transitionDelay = `${index * 0.1}s`;
      }

      observer.observe(el);
    });
  } else {
    // Fallback: check on scroll
    function checkVisibility() {
      animatables.forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - SCROLL_ANIMATION_OFFSET) {
          addClass(el, 'is-visible');
        }
      });
    }

    window.addEventListener('scroll', throttle(checkVisibility, 120), { passive: true });
    checkVisibility();
  }
}

/* ------------------------------------------------------------
   5. Parallax — subtle hero effect
   ------------------------------------------------------------ */

function initParallax() {
  const parallaxEls = $$('[data-parallax]');
  if (!parallaxEls.length) return;

  // Disable on mobile for performance
  if (window.innerWidth < MOBILE_BREAKPOINT) return;

  function applyParallax() {
    const scrollY = window.scrollY;

    parallaxEls.forEach((el) => {
      const speed  = parseFloat(el.dataset.parallax) || 0.3;
      const offset = scrollY * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', throttle(applyParallax, 16), { passive: true });
}

/* ------------------------------------------------------------
   6. Counter animation — numeric stats
   ------------------------------------------------------------ */

function animateCounter(el, target, duration = 1800) {
  const start    = performance.now();
  const startVal = 0;

  function update(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current  = Math.round(startVal + (target - startVal) * ease);

    el.textContent = current.toLocaleString('fr-FR');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('fr-FR');
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.counter, 10);
            if (!isNaN(target)) {
              animateCounter(entry.target, target);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
  } else {
    counters.forEach((el) => {
      const target = parseInt(el.dataset.counter, 10);
      if (!isNaN(target)) el.textContent = target.toLocaleString('fr-FR');
    });
  }
}

/* ------------------------------------------------------------
   7. Active nav link — highlight current section
   ------------------------------------------------------------ */

function initActiveNavLinks() {
  const sections = $$('section[id], main[id], article[id]');
  const navLinks = $$('nav a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const header  = $('header, .header, [data-header]');

  function updateActiveLink() {
    const scrollY   = window.scrollY;
    const headerH   = header ? header.offsetHeight : 0;
    let   current   = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerH - 32;
      if (scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      toggleClass(link, 'is-active', href === current);
    });
  }

  window.addEventListener('scroll', throttle(updateActiveLink, 150), { passive: true });
  updateActiveLink();
}

/* ------------------------------------------------------------
   8. Tooltip — data-tooltip attribute
   ------------------------------------------------------------ */

function initTooltips() {
  const tooltipEls = $$('[data-tooltip]');
  if (!tooltipEls.length) return;

  let tooltipBox = null;

  function createTooltip(text) {
    const el = document.createElement('div');
    el.className   = 'pf-tooltip';
    el.textContent = text;
    el.setAttribute('role', 'tooltip');
    el.style.cssText = `
      position: fixed;
      z-index: 9999;
      background: rgba(10,10,20,0.85);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.78rem;
      pointer-events: none;
      white-space: nowrap;
      transition: opacity 0.2s ease;
      opacity: 0;
    `;
    document.body.appendChild(el);
    return el;
  }

  function positionTooltip(e) {
    if (!tooltipBox) return;
    const gap = 12;
    let x = e.clientX + gap;
    let y = e.clientY - tooltipBox.offsetHeight - gap;

    // Keep within viewport
    if (x + tooltipBox.offsetWidth > window.innerWidth - 8) {
      x = e.clientX - tooltipBox.offsetWidth - gap;
    }
    if (y < 8) {
      y = e.clientY + gap;
    }

    tooltipBox.style.left = `${x}px`;
    tooltipBox.style.top  = `${y}px`;
  }

  tooltipEls.forEach((el) => {
    el.addEventListener('mouseenter', (e) => {
      const text = el.dataset.tooltip;
      if (!text) return;

      tooltipBox = createTooltip(text);
      positionTooltip(e);

      requestAnimationFrame(() => {
        if (tooltipBox) tooltipBox.style.opacity = '1';
      });
    });

    el.addEventListener('mousemove', positionTooltip);

    el.addEventListener('mouseleave', () => {
      if (tooltipBox) {
        tooltipBox.style.opacity = '0';
        setTimeout(() => {
          if (tooltipBox) {
            tooltipBox.remove();
            tooltipBox = null;
          }
        }, 200);
      }
    });
  });
}

/* ------------------------------------------------------------
   9. Accordion / FAQ
   ------------------------------------------------------------ */

function initAccordion() {
  const accordionItems = $$('[data-accordion-item], .accordion-item, .faq-item');
  if (!accordionItems.length) return;

  accordionItems.forEach((item) => {
    const trigger = $('[data-accordion-trigger], .accordion-trigger, .faq-question', item);
    const content = $('[data-accordion-content], .accordion-content, .faq-answer', item);

    if (!trigger || !content) return;

    // Set initial ARIA attributes
    const contentId = content.id || `accordion-${Math.random().toString(36).slice(2, 9)}`;
    content.id = contentId;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', contentId);
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    content.setAttribute('aria-hidden', 'true');

    // Set initial height for transition
    content.style.maxHeight   = '0';
    content.style.overflow    = 'hidden';
    content.style.transition  = 'max-height 0.35s ease, opacity 0.35s ease';
    content.style.opacity     = '0';

    function openItem() {
      addClass(item, 'is-open');
      trigger.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity   = '1';
    }

    function closeItem() {
      removeClass(item, 'is-open');
      trigger.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0';
      content.style.opacity   = '0';
    }

    function toggle() {
      const isOpen = item.classList.contains('is-open');

      // Optional: close siblings (accordion group behaviour)
      const parent = item.parentElement;
      if (parent && parent.dataset.accordionGroup !== undefined) {
        accordionItems.forEach((sibling) => {
          if (sibling !== item && sibling.parentElement === parent) {
            const sibContent = $('[data-accordion-content], .accordion-content, .faq-answer', sibling);
            const sibTrigger = $('[data-accordion-trigger], .accordion-trigger, .faq-question', sibling);
            if (sibContent && sibTrigger) {
              removeClass(sibling, 'is-open');
              sibTrigger.setAttribute('aria-expanded', 'false');
              sibContent.setAttribute('aria-hidden', 'true');
              sibContent.style.maxHeight = '0';
              sibContent.style.opacity   = '0';
            }
          }
        });
      }

      isOpen ? closeItem() : openItem();
    }

    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/* ------------------------------------------------------------
   10. Tabs
   ------------------------------------------------------------ */

function initTabs() {
  const tabGroups = $$('[data-tabs], .tabs-component');
  if (!tabGroups.length) return;

  tabGroups.forEach((group) => {
    const tabButtons = $$('[data-tab], .tab-btn, [role="tab"]', group);
    const tabPanels  = $$('[data-tab-panel], .tab-panel, [role="tabpanel"]', group);

    if (!tabButtons.length || !tabPanels.length) return;

    function activateTab(index) {
      tabButtons.forEach((btn, i) => {
        const isActive = i === index;
        toggleClass(btn, 'is-active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      tabPanels.forEach((panel, i) => {
        const isActive = i === index;
        toggleClass(panel, 'is-active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
        panel.hidden = !isActive;
      });
    }

    // Initialise first tab
    activateTab(0);

    tabButtons.forEach((btn, index) => {
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => activateTab(index));

      btn.addEventListener('keydown', (e) => {
        let newIndex = index;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIndex = (index + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (e.key === 'Home') {
          newIndex = 0;
        } else if (e.key === 'End') {
          newIndex = tabButtons.length - 1;
        } else {
          return;
        }
        e.preventDefault();
        activateTab(newIndex);
        tabButtons[newIndex].focus();
      });
    });
  });
}

/* ------------------------------------------------------------
   11. Back-to-top button
   ------------------------------------------------------------ */

function initBackToTop() {
  const btn = $('[data-back-to-top], .back-to-top, #back-to-top');
  if (!btn) return;

  function onScroll() {
    toggleClass(btn, 'is-visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', throttle(onScroll, 200), { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    smoothScrollTo(0, SMOOTH_SCROLL_DURATION);
  });

  onScroll();
}

/* ------------------------------------------------------------
   12. Lazy load images with fade-in
   ------------------------------------------------------------ */

function initLazyImages() {
  const lazyImages = $$('img[data-src], img[loading="lazy"]');
  if (!lazyImages.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }

          img.addEventListener('load', () => {
            addClass(img, 'is-loaded');
          }, { once: true });

          observer.unobserve(img);
        });
      },
      { rootMargin: '200px' }
    );

    lazyImages.forEach((img) => observer.observe(img));
  }
}

/* ------------------------------------------------------------
   13. Interactive map placeholder — hover glow effect
   ------------------------------------------------------------ */

function initMapInteractions() {
  const mapEl = $('[data-map], .map-container, .porto-map');
  if (!mapEl) return;

  mapEl.addEventListener('mouseenter', () => {
    addClass(mapEl, 'map-glow');
  });

  mapEl.addEventListener('mouseleave', () => {
    removeClass(mapEl, 'map-glow');
  });

  // Marker hover effects
  const markers = $$('[data-marker], .map-marker', mapEl);
  markers.forEach((marker) => {
    marker.addEventListener('mouseenter', () => addClass(marker, 'marker-active'));
    marker.addEventListener('mouseleave', () => removeClass(marker, 'marker-active'));
    marker.addEventListener('focus',      () => addClass(marker, 'marker-active'));
    marker.addEventListener('blur',       () => removeClass(marker, 'marker-active'));
  });
}

/* ------------------------------------------------------------
   14. Form interactions — validation feedback
   ------------------------------------------------------------ */

function initForms() {
  const forms = $$('form[data-validate], .contact-form, .newsletter-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    const inputs = $$('input, textarea, select', form);

    inputs.forEach((input) => {
      // Add floating label behaviour
      function updateFloat() {
        toggleClass(input, 'has-value', input.value.trim().length > 0);
      }

      input.addEventListener('input',  updateFloat);
      input.addEventListener('change', updateFloat);
      updateFloat();

      // Inline validation on blur
      input.addEventListener('blur', () => {
        if (input.required && !input.value.trim()) {
          addClass(input, 'is-invalid');
          removeClass(input, 'is-valid');
        } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
          addClass(input, 'is-invalid');
          removeClass(input, 'is-valid');
        } else if (input.value) {
          addClass(input, 'is-valid');
          removeClass(input, 'is-invalid');
        }
      });

      input.addEventListener('focus', () => {
        removeClass(input, 'is-invalid');
      });
    });

    form.addEventListener('submit', (e) => {
      let valid = true;

      inputs.forEach((input) => {
        if (input.required && !input.value.trim()) {
          addClass(input, 'is-invalid');
          valid = false;
        }
        if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
          addClass(input, 'is-invalid');
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstInvalid = $('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
      }
    });
  });
}

/**
 * Basic email validation
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------
   15. Cursor — custom cursor for desktop
   ------------------------------------------------------------ */

function initCustomCursor() {
  if (window.innerWidth < MOBILE_BREAKPOINT) return;
  if (!document.body.dataset.customCursor) return; // opt-in via data attribute

  const cursor = document.createElement('div');
  cursor.className = 'pf-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--color-accent, #00b4d8);
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s ease, background 0.2s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const cursorOuter = document.createElement('div');
  cursorOuter.className = 'pf-cursor-outer';
  cursorOuter.style.cssText = `
    position: fixed;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1.5px solid var(--color-accent, #00b4d8);
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    transition: transform 0.18s ease, width 0.2s ease, height 0.2s ease;
  `;
  document.body.appendChild(cursorOuter);

  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';

    setTimeout(() => {
      cursorOuter.style.left = mouseX + 'px';
      cursorOuter.style.top  = mouseY + 'px';
    }, 60);
  });

  // Hover on interactive elements
  const interactives = $$('a, button, [role="button"], input, textarea, select, label');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.style.width  = '52px';
      cursorOuter.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursorOuter.style.width  = '36px';
      cursorOuter.style.height = '36px';
    });
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity      = '0';
    cursorOuter.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity      = '1';
    cursorOuter.style.opacity = '1';
  });
}

/* ------------------------------------------------------------
   16. Scroll progress bar
   ------------------------------------------------------------ */

function initScrollProgress() {
  const bar = $('[data-scroll-progress], .scroll-progress');
  if (!bar) return;

  bar.style.cssText += `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--color-accent, #00b4d8);
    z-index: 10000;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;

  function updateProgress() {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = progress + '%';
  }

  window.addEventListener('scroll', throttle(updateProgress, 50), { passive: true });
}

/* ------------------------------------------------------------
   17. Preloader
   ------------------------------------------------------------ */

function initPreloader() {
  const preloader = $('[data-preloader], .preloader, #preloader');
  if (!preloader) return;

  function hidePreloader() {
    addClass(preloader, 'is-hidden');
    preloader.addEventListener(
      'transitionend',
      () => preloader.remove(),
      { once: true }
    );
    addClass(document.body, 'page-loaded');
  }

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hidePreloader, 300));
  }
}

/* ------------------------------------------------------------
   18. Feature cards — tilt effect on hover
   ------------------------------------------------------------ */

function initCardTilt() {
  if (window.innerWidth < MOBILE_BREAKPOINT) return;

  const cards = $$('[data-tilt], .feature-card, .card-tilt');
  if (!cards.length) return;

  cards.forEach((card) => {
    const maxTilt = parseFloat(card.dataset.tiltMax) || 8;

    card.style.transition      = 'transform 0.15s ease';
    card.style.transformOrigin = 'center center';
    card.style.willChange      = 'transform';

    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx      = e.clientX - centerX;
      const dy      = e.clientY - centerY;
      const tiltX   = (-dy / (rect.height / 2)) * maxTilt;
      const tiltY   = ( dx / (rect.width  / 2)) * maxTilt;

      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });
}

/* ------------------------------------------------------------
   19. Section reveal — typed text effect (lightweight)
   ------------------------------------------------------------ */

function initTypedText() {
  const typedEls = $$('[data-typed]');
  if (!typedEls.length) return;

  typedEls.forEach((el) => {
    const strings = (el.dataset.typed || '').split('|').map((s) => s.trim()).filter(Boolean);
    if (!strings.length) return;

    let currentIndex = 0;
    let charIndex    = 0;
    let isDeleting   = false;
    const typeSpeed  = parseInt(el.dataset.typedSpeed, 10)  || 80;
    const deleteSpeed = parseInt(el.dataset.typedDelete, 10) || 40;
    const pauseTime  = parseInt(el.dataset.typedPause, 10)  || 1800;

    // Create cursor span
    const cursor = document.createElement('span');
    cursor.className  = 'typed-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = 'animation: blink 0.8s step-end infinite; margin-left: 2px;';
    el.after(cursor);

    // Inject blink keyframes once
    if (!$('#pf-typed-styles')) {
      const style = document.createElement('style');
      style.id    = 'pf-typed-styles';
      style.textContent = `@keyframes blink { 50% { opacity: 0; } }`;
      document.head.appendChild(style);
    }

    function type() {
      const currentString = strings[currentIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentString.slice(0, charIndex);
      } else {
        charIndex++;
        el.textContent = currentString.slice(0, charIndex);
      }

      let delay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentString.length) {
        delay      = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting   = false;
        currentIndex = (currentIndex + 1) % strings.length;
        delay        = 300;
      }

      setTimeout(type, delay);
    }

    type();
  });
}

/* ------------------------------------------------------------
   20. Notification / toast system
   ------------------------------------------------------------ */

const portoToast = (() => {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.id         = 'pf-toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'false');
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Show a toast notification
   * @param {string} message
   * @param {'info'|'success'|'warning'|'error'} type
   * @param {number} duration ms
   */
  function show(message, type = 'info', duration = 4000) {
    const c = getContainer();

    const colors = {
      info:    '#0ea5e9',
      success: '#22c55e',
      warning: '#f59e0b',
      error:   '#ef4444',
    };

    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert');
    toast.style.cssText = `
      background: #1a1a2e;
      color: #f1f5f9;
      border-left: 4px solid ${colors[type] || colors.info};
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 0.875rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
      pointer-events: auto;
      opacity: 0;
      transform: translateX(40px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      max-width: 320px;
      word-break: break-word;
    `;
    toast.textContent = message;
    c.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.opacity   = '1';
        toast.style.transform = 'translateX(0)';
      });
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateX(40px)';
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  }

  return { show };
})();

/* Expose toast globally */
window.portoToast = portoToast;

/* ------------------------------------------------------------
   21. Cookie consent banner
   ------------------------------------------------------------ */

function initCookieBanner() {
  const banner = $('[data-cookie-banner], .cookie-banner, #cookie-banner');
  if (!banner) return;

  const STORAGE_KEY = 'pf_cookie_consent';

  if (localStorage.getItem(STORAGE_KEY)) {
    banner.remove();
    return;
  }

  addClass(banner, 'is-visible');

  const acceptBtn = $('[data-cookie-accept], .cookie-accept', banner);
  const rejectBtn = $('[data-cookie-reject], .cookie-reject', banner);

  function dismiss() {
    removeClass(banner, 'is-visible');
    banner.addEventListener('transitionend', () => banner.remove(), { once: true });
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      dismiss();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'rejected');
      dismiss();
    });
  }
}

/* ------------------------------------------------------------
   22. Theme toggle (dark / light)
   ------------------------------------------------------------ */

function initThemeToggle() {
  const toggleBtn = $('[data-theme-toggle], .theme-toggle, #theme-toggle');
  if (!toggleBtn) return;

  const STORAGE_KEY = 'pf_theme';
  const root        = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Restore saved or system preference
  const saved     = localStorage.getItem(STORAGE_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || preferred);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(current);
  });

  // Sync with system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* ------------------------------------------------------------
   23. Section fade-up initialisation helper
        (adds data-animate to common elements if not present)
   ------------------------------------------------------------ */

function addAnimationAttributes() {
  const autoAnimate = $$(
    '.section-title, .section-subtitle, .feature-card, .stat-item, .cta-block, .testimonial-card'
  );

  autoAnimate.forEach((el) => {
    if (!el.dataset.animate) {
      el.dataset.animate = 'fade-up';
    }
  });
}

/* ------------------------------------------------------------
   24. Resize observer — recompute scroll heights for accordions
   ------------------------------------------------------------ */

function initResizeObserver() {
  if (!('ResizeObserver' in window)) return;

  const openAccordionContents = $$('.accordion-item.is-open .accordion-content, .faq-item.is-open .faq-answer');
  if (!openAccordionContents.length) return;

  const ro = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (el.style.maxHeight && el.style.maxHeight !== '0px') {
        el.style.maxHeight = el.scrollHeight + 'px';
      }
    });
  });

  openAccordionContents.forEach((el) => ro.observe(el));
}

/* ------------------------------------------------------------
   Bootstrap — DOMContentLoaded
   ------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
  addAnimationAttributes();
  initPreloader();
  initStickyHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initParallax();
  initCounters();
  initActiveNavLinks();
  initTooltips();
  initAccordion();
  initTabs();
  initBackToTop();
  initLazyImages();
  initMapInteractions();
  initForms();
  initCardTilt();
  initTypedText();
  initScrollProgress();
  initCookieBanner();
  initThemeToggle();
  initCustomCursor();
  initResizeObserver();
});

/* ------------------------------------------------------------
   Window load — trigger any remaining animations
   ------------------------------------------------------------ */

window.addEventListener('load', () => {
  addClass(document.body, 'fonts-loaded');

  // Trigger counter check in case sections are already visible
  const counters = $$('[data-counter]');
  counters.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      const target = parseInt(el.dataset.counter, 10);
      if (!isNaN(target) && el.textContent === el.dataset.counter) {
        animateCounter(el, target);
      }
    }
  });
});