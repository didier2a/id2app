(function () {
  'use strict';

  /* =========================================================
     UTILITAIRES
  ========================================================= */

  function qs(selector, context) {
    return (context || document).querySelector(selector);
  }

  function qsa(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  }

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* =========================================================
     MENU MOBILE
  ========================================================= */

  function initMobileMenu() {
    var nav = qs('.site-nav');
    var toggle = qs('.nav-toggle');
    var navList = qs('.nav-list');

    if (!nav || !toggle || !navList) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'nav-list');
    toggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');

    if (!navList.id) {
      navList.id = 'nav-list';
    }

    function openMenu() {
      navList.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fermer le menu de navigation');
      toggle.classList.add('is-active');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
      toggle.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    }

    function toggleMenu() {
      var isOpen = navList.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    document.addEventListener('click', function (e) {
      if (navList.classList.contains('is-open') && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    qsa('.nav-list a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 768) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
  }

  /* =========================================================
     NAVIGATION ACTIVE
  ========================================================= */

  function initActiveNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = qsa('.nav-list a');

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      var linkFile = href.split('/').pop();

      if (
        linkFile === currentPath ||
        (currentPath === '' && linkFile === 'index.html') ||
        (currentPath === '/' && linkFile === 'index.html')
      ) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* =========================================================
     HEADER SCROLL
  ========================================================= */

  function initHeaderScroll() {
    var header = qs('.site-header');
    if (!header) return;

    var lastScrollY = window.scrollY;
    var ticking = false;

    function updateHeader() {
      var scrollY = window.scrollY;

      if (scrollY > 60) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }

      if (scrollY > lastScrollY && scrollY > 120) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  /* =========================================================
     ANIMATIONS AU SCROLL (Intersection Observer)
  ========================================================= */

  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) {
      qsa('[data-animate]').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var options = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay') || '0';
          el.style.transitionDelay = delay + 'ms';
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, options);

    qsa('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });

    autoTagAnimatables();
  }

  function autoTagAnimatables() {
    var selectors = [
      '.section-title',
      '.section-subtitle',
      '.card',
      '.feature-item',
      '.usage-item',
      '.audience-card',
      '.solution-block',
      '.contact-block',
      '.hero-content',
      '.hero-visual',
      '.intro-text',
      '.stat-item',
      '.cta-block'
    ];

    selectors.forEach(function (selector) {
      qsa(selector).forEach(function (el, index) {
        if (!el.hasAttribute('data-animate')) {
          el.setAttribute('data-animate', 'fade-up');
          el.setAttribute('data-delay', String(index * 80));
        }
      });
    });
  }

  /* =========================================================
     RETOUR EN HAUT DE PAGE
  ========================================================= */

  function initBackToTop() {
    var btn = qs('.back-to-top');

    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.setAttribute('aria-label', 'Retour en haut de page');
      btn.setAttribute('title', 'Retour en haut');
      btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' +
        '<path d="M12 4l-8 8h5v8h6v-8h5z" fill="currentColor"/>' +
        '</svg>';
      document.body.appendChild(btn);
    }

    var ticking = false;

    function updateBtn() {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateBtn);
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* =========================================================
     SMOOTH SCROLL POUR ANCRES INTERNES
  ========================================================= */

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var target = qs(targetId);
        if (!target) return;

        e.preventDefault();

        var header = qs('.site-header');
        var offset = header ? header.offsetHeight + 16 : 80;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });

        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* =========================================================
     FORMULAIRE DE CONTACT
  ========================================================= */

  function initContactForm() {
    var form = qs('.contact-form');
    if (!form) return;

    var successMsg = qs('.form-success');
    var errorMsg = qs('.form-error');

    function showMessage(el) {
      if (!el) return;
      el.removeAttribute('hidden');
      el.setAttribute('aria-live', 'polite');
      el.focus();
    }

    function hideMessage(el) {
      if (!el) return;
      el.setAttribute('hidden', '');
    }

    function validateField(field) {
      var value = field.value.trim();
      var type = field.type;
      var required = field.required;
      var valid = true;

      if (required && value === '') {
        valid = false;
      }

      if (type === 'email' && value !== '') {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          valid = false;
        }
      }

      if (!valid) {
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.classList.remove('is-invalid');
        field.setAttribute('aria-invalid', 'false');
      }

      return valid;
    }

    qsa('input, textarea, select', form).forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });

      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      hideMessage(successMsg);
      hideMessage(errorMsg);

      var fields = qsa('input[required], textarea[required], select[required]', form);
      var allValid = true;

      fields.forEach(function (field) {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      if (!allValid) {
        var firstInvalid = qs('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
        showMessage(errorMsg);
        return;
      }

      var submitBtn = qs('[type="submit"]', form);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }

      setTimeout(function () {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.setAttribute('aria-busy', 'false');
        }
        showMessage(successMsg);
      }, 800);
    });
  }

  /* =========================================================
     ACCESSIBILITÉ : FOCUS VISIBLE AU CLAVIER
  ========================================================= */

  function initFocusVisible() {
    var usingMouse = false;

    document.addEventListener('mousedown', function () {
      usingMouse = true;
      document.body.classList.add('using-mouse');
      document.body.classList.remove('using-keyboard');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        usingMouse = false;
        document.body.classList.add('using-keyboard');
        document.body.classList.remove('using-mouse');
      }
    });
  }

  /* =========================================================
     ACCESSIBILITÉ : SKIP LINK
  ========================================================= */

  function initSkipLink() {
    var existing = qs('.skip-link');
    if (existing) return;

    var skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = 'Aller au contenu principal';

    document.body.insertBefore(skip, document.body.firstChild);

    var main = qs('#main-content') || qs('main');
    if (main && !main.id) {
      main.id = 'main-content';
    }
  }

  /* =========================================================
     COMPTEUR ANIMÉ (stats)
  ========================================================= */

  function initCounters() {
    var counters = qsa('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1200;
        var start = null;
        var startValue = 0;

        function step(timestamp) {
          if (!start) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.round(startValue + (target - startValue) * eased);
          el.textContent = current + suffix;

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.textContent = target + suffix;
          }
        }

        window.requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* =========================================================
     LAZY LOADING IMAGES (fallback natif)
  ========================================================= */

  function initLazyImages() {
    var images = qsa('img[data-src]');
    if (!images.length) return;

    if ('loading' in HTMLImageElement.prototype) {
      images.forEach(function (img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.setAttribute('loading', 'lazy');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      images.forEach(function (img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        img.classList.add('is-loaded');
        observer.unobserve(img);
      });
    }, { rootMargin: '200px' });

    images.forEach(function (img) {
      observer.observe(img);
    });
  }

  /* =========================================================
     INITIALISATION PRINCIPALE
  ========================================================= */

  ready(function () {
    initSkipLink();
    initFocusVisible();
    initMobileMenu();
    initActiveNav();
    initHeaderScroll();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
    initCounters();
    initLazyImages();
  });

})();