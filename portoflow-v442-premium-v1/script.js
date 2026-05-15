/**
 * PortoFlow — script.js
 * ID2App V4.4.4 Creative Controlled Workflow
 * Minimal · Progressif · Sans dépendance externe
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
   * 1. UTILITAIRES
   * ───────────────────────────────────────── */

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function debounce(fn, delay) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, delay);
    };
  }

  /* ─────────────────────────────────────────
   * 2. NAVIGATION — ACTIVE PAGE CLASS
   * Détecte la page courante et pose .nav-active
   * sur le lien correspondant dans tous les navs.
   * ───────────────────────────────────────── */

  function setActiveNav() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    if (current === '' || current === '/') current = 'index.html';

    $$('.nav-link, .nav__link').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.remove('nav-active', 'active');
      if (href === current) {
        link.classList.add('nav-active', 'active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ─────────────────────────────────────────
   * 3. NAVIGATION MOBILE — BURGER TOGGLE
   * ───────────────────────────────────────── */

  function initMobileNav() {
    var burger = $('.nav__burger, .burger-btn, [data-burger]');
    var navMenu = $('.nav__menu, .nav-menu, [data-nav-menu]');
    var overlay = $('.nav__overlay, [data-nav-overlay]');

    if (!burger || !navMenu) return;

    function openMenu() {
      navMenu.classList.add('is-open');
      burger.classList.add('is-active');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      if (overlay) overlay.classList.add('is-visible');
    }

    function closeMenu() {
      navMenu.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      if (overlay) overlay.classList.remove('is-visible');
    }

    burger.addEventListener('click', function () {
      var isOpen = navMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    /* Fermeture sur lien cliqué */
    $$('.nav__link, .nav-link', navMenu).forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Fermeture sur Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Fermeture si resize vers desktop */
    window.addEventListener('resize', debounce(function () {
      if (window.innerWidth >= 1024) closeMenu();
    }, 150));
  }

  /* ─────────────────────────────────────────
   * 4. HEADER — SCROLL SHADOW
   * Ajoute .header--scrolled quand on défile
   * ───────────────────────────────────────── */

  function initHeaderScroll() {
    var header = $('header, .site-header, [data-header]');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────
   * 5. INTERSECTION OBSERVER — REVEAL
   * Anime les sections et cartes à l'entrée
   * dans le viewport (.reveal → .is-visible)
   * ───────────────────────────────────────── */

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    $$('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────
   * 6. COMPTEURS ANIMÉS — METRICS PANEL
   * Anime les chiffres clés au scroll
   * Cible : [data-counter] avec data-target="N"
   * ───────────────────────────────────────── */

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1400;
    var start = null;
    var isFloat = target % 1 !== 0;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var value = target * ease;
      el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (isFloat ? target.toFixed(1) : target) + suffix;
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = $$('[data-counter]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { obs.observe(el); });
  }

  /* ─────────────────────────────────────────
   * 7. TABS — COMPOSANT ONGLETS
   * Cible : [data-tabs] > [data-tab-trigger]
   *         [data-tab-panel]
   * ───────────────────────────────────────── */

  function initTabs() {
    $$('[data-tabs]').forEach(function (tabsRoot) {
      var triggers = $$('[data-tab-trigger]', tabsRoot);
      var panels = $$('[data-tab-panel]', tabsRoot);

      function activate(index) {
        triggers.forEach(function (t, i) {
          t.classList.toggle('is-active', i === index);
          t.setAttribute('aria-selected', i === index ? 'true' : 'false');
          t.setAttribute('tabindex', i === index ? '0' : '-1');
        });
        panels.forEach(function (p, i) {
          p.classList.toggle('is-active', i === index);
          p.hidden = i !== index;
        });
      }

      triggers.forEach(function (trigger, i) {
        trigger.addEventListener('click', function () { activate(i); });
        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight') activate((i + 1) % triggers.length);
          if (e.key === 'ArrowLeft') activate((i - 1 + triggers.length) % triggers.length);
        });
      });

      activate(0);
    });
  }

  /* ─────────────────────────────────────────
   * 8. ACCORDION — FAQ / CONTENU PLIANT
   * Cible : [data-accordion] > [data-accordion-item]
   *         [data-accordion-trigger] / [data-accordion-panel]
   * ───────────────────────────────────────── */

  function initAccordion() {
    $$('[data-accordion]').forEach(function (root) {
      var items = $$('[data-accordion-item]', root);
      var allowMultiple = root.hasAttribute('data-accordion-multiple');

      items.forEach(function (item) {
        var trigger = $('[data-accordion-trigger]', item);
        var panel = $('[data-accordion-panel]', item);
        if (!trigger || !panel) return;

        trigger.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');

          if (!allowMultiple) {
            items.forEach(function (other) {
              other.classList.remove('is-open');
              var otherTrigger = $('[data-accordion-trigger]', other);
              var otherPanel = $('[data-accordion-panel]', other);
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
              if (otherPanel) otherPanel.hidden = true;
            });
          }

          item.classList.toggle('is-open', !isOpen);
          trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
          panel.hidden = isOpen;
        });

        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─────────────────────────────────────────
   * 9. MOCKUP SMARTPHONE — CAROUSEL D'ÉCRANS
   * Cible : [data-mockup-carousel]
   *         [data-mockup-slide]
   *         [data-mockup-prev] / [data-mockup-next]
   *         [data-mockup-dots]
   * ───────────────────────────────────────── */

  function initMockupCarousel() {
    $$('[data-mockup-carousel]').forEach(function (carousel) {
      var slides = $$('[data-mockup-slide]', carousel);
      var prevBtn = $('[data-mockup-prev]', carousel);
      var nextBtn = $('[data-mockup-next]', carousel);
      var dotsContainer = $('[data-mockup-dots]', carousel);
      var current = 0;
      var autoTimer = null;

      if (!slides.length) return;

      /* Création des dots */
      var dots = [];
      if (dotsContainer) {
        slides.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.className = 'mockup-dot';
          dot.setAttribute('aria-label', 'Écran ' + (i + 1));
          dot.addEventListener('click', function () { goTo(i); });
          dotsContainer.appendChild(dot);
          dots.push(dot);
        });
      }

      function goTo(index) {
        slides[current].classList.remove('is-active');
        if (dots[current]) dots[current].classList.remove('is-active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('is-active');
        if (dots[current]) dots[current].classList.add('is-active');

        /* Mise à jour label info si présent */
        var infoTitle = $('[data-mockup-title]', carousel);
        var infoText = $('[data-mockup-text]', carousel);
        var activeSlide = slides[current];
        if (infoTitle) infoTitle.textContent = activeSlide.getAttribute('data-slide-title') || '';
        if (infoText) infoText.textContent = activeSlide.getAttribute('data-slide-text') || '';
      }

      function startAuto() {
        autoTimer = setInterval(function () {
          goTo(current + 1);
        }, 3800);
      }

      function stopAuto() {
        clearInterval(autoTimer);
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          stopAuto();
          goTo(current - 1);
          startAuto();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          stopAuto();
          goTo(current + 1);
          startAuto();
        });
      }

      /* Swipe tactile */
      var touchStartX = 0;
      carousel.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      carousel.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          stopAuto();
          goTo(dx < 0 ? current + 1 : current - 1);
          startAuto();
        }
      }, { passive: true });

      goTo(0);
      startAuto();
    });
  }

  /* ─────────────────────────────────────────
   * 10. DASHBOARD — MINI SPARKLINES SVG
   * Génère des sparklines SVG légères
   * Cible : [data-sparkline] avec data-values="1,2,3…"
   * ───────────────────────────────────────── */

  function initSparklines() {
    $$('[data-sparkline]').forEach(function (el) {
      var raw = el.getAttribute('data-values') || '';
      var values = raw.split(',').map(Number).filter(function (n) { return !isNaN(n); });
      if (values.length < 2) return;

      var w = el.clientWidth || 120;
      var h = el.clientHeight || 40;
      var min = Math.min.apply(null, values);
      var max = Math.max.apply(null, values);
      var range = max - min || 1;
      var step = w / (values.length - 1);
      var pad = 4;

      var points = values.map(function (v, i) {
        var x = i * step;
        var y = h - pad - ((v - min) / range) * (h - pad * 2);
        return x + ',' + y;
      }).join(' ');

      var color = el.getAttribute('data-color') || 'var(--color-accent, #E07B39)';

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      svg.setAttribute('aria-hidden', 'true');

      var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
      polyline.setAttribute('points', points);
      polyline.setAttribute('fill', 'none');
      polyline.setAttribute('stroke', color);
      polyline.setAttribute('stroke-width', '2');
      polyline.setAttribute('stroke-linejoin', 'round');
      polyline.setAttribute('stroke-linecap', 'round');

      svg.appendChild(polyline);
      el.appendChild(svg);
    });
  }

  /* ─────────────────────────────────────────
   * 11. FORMULAIRE CONTACT — VALIDATION LÉGÈRE
   * Cible : [data-contact-form]
   * ───────────────────────────────────────── */

  function initContactForm() {
    var form = $('[data-contact-form]');
    if (!form) return;

    var feedback = $('[data-form-feedback]', form);

    function showFeedback(msg, type) {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = 'form-feedback form-feedback--' + type;
      feedback.hidden = false;
      setTimeout(function () { feedback.hidden = true; }, 6000);
    }

    function validateField(field) {
      var val = field.value.trim();
      var type = field.type;
      var required = field.hasAttribute('required');
      if (required && !val) return false;
      if (type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return false;
      return true;
    }

    $$('input, textarea, select', form).forEach(function (field) {
      field.addEventListener('blur', function () {
        var ok = validateField(field);
        field.classList.toggle('field--error', !ok);
        field.classList.toggle('field--ok', ok && field.value.trim() !== '');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = $$('input, textarea, select', form);
      var allValid = true;

      fields.forEach(function (field) {
        var ok = validateField(field);
        field.classList.toggle('field--error', !ok);
        if (!ok) allValid = false;
      });

      if (!allValid) {
        showFeedback('Veuillez corriger les champs indiqués.', 'error');
        return;
      }

      /* Simulation d'envoi (pas de backend requis) */
      var submitBtn = $('[type="submit"]', form);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }

      setTimeout(function () {
        showFeedback('Message envoyé. Nous vous répondrons rapidement.', 'success');
        form.reset();
        fields.forEach(function (f) { f.classList.remove('field--ok', 'field--error'); });
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Envoyer';
        }
      }, 1200);
    });
  }

  /* ─────────────────────────────────────────
   * 12. SMOOTH SCROLL — ANCRES INTERNES
   * ───────────────────────────────────────── */

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var headerH = ($('header, .site-header') || { offsetHeight: 0 }).offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ─────────────────────────────────────────
   * 13. BACK TO TOP
   * Cible : [data-back-top] ou #back-top
   * ───────────────────────────────────────── */

  function initBackTop() {
    var btn = $('[data-back-top], #back-top');
    if (!btn) return;

    window.addEventListener('scroll', debounce(function () {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, 100), { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────
   * 14. IMAGE PLACEHOLDERS — LAZY LOAD NATIF
   * Ajoute loading="lazy" si absent
   * ───────────────────────────────────────── */

  function initLazyImages() {
    $$('img:not([loading])').forEach(function (img) {
      img.setAttribute('loading', 'lazy');
    });

    /* Placeholder fallback si src manquant */
    $$('img[data-placeholder]').forEach(function (img) {
      if (!img.src || img.src === window.location.href) {
        var w = img.getAttribute('width') || 400;
        var h = img.getAttribute('height') || 300;
        var label = encodeURIComponent(img.getAttribute('alt') || 'Image');
        img.src = 'https://placehold.co/' + w + 'x' + h + '/1a2b4a/f5f0e8?text=' + label;
      }
      img.addEventListener('error', function () {
        var w = img.getAttribute('width') || 400;
        var h = img.getAttribute('height') || 300;
        img.src = 'https://placehold.co/' + w + 'x' + h + '/1a2b4a/f5f0e8?text=PortoFlow';
      });
    });
  }

  /* ─────────────────────────────────────────
   * 15. TOOLTIP LÉGER
   * Cible : [data-tooltip="texte"]
   * ───────────────────────────────────────── */

  function initTooltips() {
    var tip = null;

    $$('[data-tooltip]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        tip = document.createElement('div');
        tip.className = 'pf-tooltip';
        tip.textContent = el.getAttribute('data-tooltip');
        document.body.appendChild(tip);

        var rect = el.getBoundingClientRect();
        tip.style.left = (rect.left + rect.width / 2 - tip.offsetWidth / 2 + window.scrollX) + 'px';
        tip.style.top = (rect.top - tip.offsetHeight - 8 + window.scrollY) + 'px';
        tip.classList.add('is-visible');
      });

      el.addEventListener('mouseleave', function () {
        if (tip) { tip.remove(); tip = null; }
      });
    });
  }

  /* ─────────────────────────────────────────
   * 16. THEME / PRÉFÉRENCE SYSTÈME
   * Détecte prefers-color-scheme et pose
   * data-theme sur <html> (extensible)
   * ───────────────────────────────────────── */

  function initTheme() {
    var stored = localStorage.getItem('pf-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);

    var toggleBtn = $('[data-theme-toggle]');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('pf-theme', next);
      });
    }
  }

  /* ─────────────────────────────────────────
   * 17. STAGGER REVEAL — GRILLES DE CARTES
   * Ajoute un délai progressif aux enfants
   * d'un conteneur .feature-grid, .card-grid
   * ───────────────────────────────────────── */

  function initStaggerReveal() {
    $$('.feature-grid, .card-grid, [data-stagger]').forEach(function (grid) {
      var children = Array.from(grid.children);
      children.forEach(function (child, i) {
        child.classList.add('reveal');
        child.style.transitionDelay = (i * 80) + 'ms';
      });
    });
  }

  /* ─────────────────────────────────────────
   * 18. INIT GLOBAL
   * ───────────────────────────────────────── */

  ready(function () {
    initTheme();
    setActiveNav();
    initMobileNav();
    initHeaderScroll();
    initStaggerReveal();
    initReveal();
    initCounters();
    initTabs();
    initAccordion();
    initMockupCarousel();
    initSparklines();
    initContactForm();
    initSmoothScroll();
    initBackTop();
    initLazyImages();
    initTooltips();
  });

})();