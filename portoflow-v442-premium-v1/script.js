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

  function qs(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }

  function qsa(selector, ctx) {
    return Array.from((ctx || document).querySelectorAll(selector));
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
   * 2. NAVIGATION ACTIVE
   * Détecte la page courante et pose la classe
   * "active" sur le lien correspondant.
   * ───────────────────────────────────────── */

  function setActiveNav() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    if (current === '' || current === '/') current = 'index.html';

    qsa('.nav-link, .nav__link').forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop();
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (href === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ─────────────────────────────────────────
   * 3. MENU MOBILE (hamburger toggle)
   * ───────────────────────────────────────── */

  function initMobileMenu() {
    var toggle = qs('.nav-toggle, .burger, [data-nav-toggle]');
    var nav    = qs('.nav-menu, .nav__menu, [data-nav-menu]');
    if (!toggle || !nav) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', nav.id || 'nav-menu');

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });

    /* Fermer sur clic extérieur */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });

    /* Fermer sur Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        toggle.focus();
      }
    });
  }

  /* ─────────────────────────────────────────
   * 4. HEADER SCROLL (sticky + shadow)
   * ───────────────────────────────────────── */

  function initHeaderScroll() {
    var header = qs('.site-header, header[role="banner"], .header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 48) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }

    window.addEventListener('scroll', debounce(onScroll, 10), { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────
   * 5. INTERSECTION OBSERVER — REVEAL
   * Anime les éléments [data-reveal] à l'entrée
   * dans le viewport.
   * ───────────────────────────────────────── */

  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback : tout afficher immédiatement */
      qsa('[data-reveal]').forEach(function (el) {
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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    qsa('[data-reveal]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────
   * 6. COMPTEURS ANIMÉS (metrics panel)
   * [data-counter="valeur"] déclenche un
   * comptage progressif à l'entrée dans le
   * viewport.
   * ───────────────────────────────────────── */

  function animateCounter(el) {
    var target   = parseFloat(el.dataset.counter) || 0;
    var suffix   = el.dataset.counterSuffix || '';
    var prefix   = el.dataset.counterPrefix || '';
    var decimals = (String(target).split('.')[1] || '').length;
    var duration = 1400;
    var start    = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease     = 1 - Math.pow(1 - progress, 3);
      var value    = (target * ease).toFixed(decimals);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    if (!('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    qsa('[data-counter]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────
   * 7. TABS (onglets génériques)
   * Structure attendue :
   *   [data-tabs]
   *     [data-tab-trigger="id"]  (bouton)
   *     [data-tab-panel="id"]    (panneau)
   * ───────────────────────────────────────── */

  function initTabs() {
    qsa('[data-tabs]').forEach(function (container) {
      var triggers = qsa('[data-tab-trigger]', container);
      var panels   = qsa('[data-tab-panel]', container);

      function activate(id) {
        triggers.forEach(function (t) {
          var active = t.dataset.tabTrigger === id;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
          t.setAttribute('tabindex', active ? '0' : '-1');
        });
        panels.forEach(function (p) {
          var active = p.dataset.tabPanel === id;
          p.classList.toggle('is-active', active);
          p.hidden = !active;
        });
      }

      triggers.forEach(function (trigger) {
        trigger.setAttribute('role', 'tab');
        trigger.addEventListener('click', function () {
          activate(trigger.dataset.tabTrigger);
        });
        trigger.addEventListener('keydown', function (e) {
          var idx = triggers.indexOf(trigger);
          if (e.key === 'ArrowRight') {
            triggers[(idx + 1) % triggers.length].click();
          } else if (e.key === 'ArrowLeft') {
            triggers[(idx - 1 + triggers.length) % triggers.length].click();
          }
        });
      });

      /* Activer le premier par défaut */
      if (triggers.length) activate(triggers[0].dataset.tabTrigger);
    });
  }

  /* ─────────────────────────────────────────
   * 8. ACCORDION
   * Structure attendue :
   *   [data-accordion]
   *     [data-accordion-trigger]  (bouton)
   *     [data-accordion-panel]    (contenu)
   * ───────────────────────────────────────── */

  function initAccordion() {
    qsa('[data-accordion]').forEach(function (accordion) {
      var items = qsa('[data-accordion-item]', accordion);

      items.forEach(function (item) {
        var trigger = qs('[data-accordion-trigger]', item);
        var panel   = qs('[data-accordion-panel]', item);
        if (!trigger || !panel) return;

        trigger.setAttribute('aria-expanded', 'false');
        panel.hidden = true;

        trigger.addEventListener('click', function () {
          var open = trigger.getAttribute('aria-expanded') === 'true';

          /* Fermer tous les autres si mode exclusif */
          if (accordion.dataset.accordion === 'exclusive') {
            items.forEach(function (other) {
              var ot = qs('[data-accordion-trigger]', other);
              var op = qs('[data-accordion-panel]', other);
              if (ot && op && ot !== trigger) {
                ot.setAttribute('aria-expanded', 'false');
                op.hidden = true;
                other.classList.remove('is-open');
              }
            });
          }

          trigger.setAttribute('aria-expanded', String(!open));
          panel.hidden = open;
          item.classList.toggle('is-open', !open);
        });
      });
    });
  }

  /* ─────────────────────────────────────────
   * 9. MOCKUP SMARTPHONE — CAROUSEL D'ÉCRANS
   * Structure attendue :
   *   [data-mockup-carousel]
   *     [data-mockup-slide]  (N slides)
   *   [data-mockup-prev]
   *   [data-mockup-next]
   *   [data-mockup-dots]
   * ───────────────────────────────────────── */

  function initMockupCarousel() {
    qsa('[data-mockup-carousel]').forEach(function (carousel) {
      var slides  = qsa('[data-mockup-slide]', carousel);
      var wrapper = carousel.closest('[data-mockup-wrapper]') || carousel.parentElement;
      var prevBtn = qs('[data-mockup-prev]', wrapper);
      var nextBtn = qs('[data-mockup-next]', wrapper);
      var dotsEl  = qs('[data-mockup-dots]', wrapper);
      var current = 0;
      var total   = slides.length;
      var autoId  = null;

      if (!total) return;

      /* Créer les dots */
      var dots = [];
      if (dotsEl) {
        slides.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.className = 'mockup-dot';
          dot.setAttribute('aria-label', 'Écran ' + (i + 1));
          dot.addEventListener('click', function () { goTo(i); });
          dotsEl.appendChild(dot);
          dots.push(dot);
        });
      }

      function goTo(idx) {
        slides[current].classList.remove('is-active');
        if (dots[current]) dots[current].classList.remove('is-active');
        current = (idx + total) % total;
        slides[current].classList.add('is-active');
        if (dots[current]) dots[current].classList.add('is-active');
      }

      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }

      if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });

      /* Auto-play */
      function startAuto() {
        autoId = setInterval(next, 3200);
      }
      function resetAuto() {
        clearInterval(autoId);
        startAuto();
      }

      /* Touch swipe */
      var touchStartX = 0;
      carousel.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });
      carousel.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          dx < 0 ? next() : prev();
          resetAuto();
        }
      }, { passive: true });

      goTo(0);
      startAuto();
    });
  }

  /* ─────────────────────────────────────────
   * 10. SMOOTH SCROLL (ancres internes)
   * ───────────────────────────────────────── */

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id     = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      /* Focus pour accessibilité */
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  /* ─────────────────────────────────────────
   * 11. BACK TO TOP
   * Bouton [data-back-top] visible après scroll.
   * ───────────────────────────────────────── */

  function initBackToTop() {
    var btn = qs('[data-back-top]');
    if (!btn) return;

    function toggle() {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }

    window.addEventListener('scroll', debounce(toggle, 80), { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggle();
  }

  /* ─────────────────────────────────────────
   * 12. FORMULAIRE CONTACT — VALIDATION LÉGÈRE
   * ───────────────────────────────────────── */

  function initContactForm() {
    var form = qs('[data-contact-form]');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      qsa('[data-required]', form).forEach(function (field) {
        var val = field.value.trim();
        var err = qs('[data-error-for="' + field.name + '"]', form);
        var ok  = val.length > 0;

        if (field.type === 'email') {
          ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }

        field.classList.toggle('is-invalid', !ok);
        if (err) err.hidden = ok;
        if (!ok) valid = false;
      });

      if (valid) {
        var feedback = qs('[data-form-success]', form);
        form.classList.add('is-submitted');
        if (feedback) {
          feedback.hidden = false;
          feedback.focus();
        }
      }
    });

    /* Reset état invalide à la saisie */
    qsa('[data-required]', form).forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
        var err = qs('[data-error-for="' + field.name + '"]', form);
        if (err) err.hidden = true;
      });
    });
  }

  /* ─────────────────────────────────────────
   * 13. DASHBOARD — MINI SPARKLINES SVG
   * [data-sparkline="v1,v2,v3,..."]
   * Génère un SVG inline léger.
   * ───────────────────────────────────────── */

  function initSparklines() {
    qsa('[data-sparkline]').forEach(function (el) {
      var values = el.dataset.sparkline.split(',').map(Number);
      if (!values.length) return;

      var W    = 120;
      var H    = 36;
      var min  = Math.min.apply(null, values);
      var max  = Math.max.apply(null, values);
      var range = max - min || 1;
      var step = W / (values.length - 1 || 1);

      var points = values.map(function (v, i) {
        var x = i * step;
        var y = H - ((v - min) / range) * (H - 4) - 2;
        return x + ',' + y;
      }).join(' ');

      var color   = el.dataset.sparklineColor || '#E8834A';
      var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" '
              + 'aria-hidden="true" focusable="false" style="width:100%;height:' + H + 'px">'
              + '<polyline points="' + points + '" fill="none" stroke="' + color + '" '
              + 'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
              + '</svg>';

      el.innerHTML = svg;
    });
  }

  /* ─────────────────────────────────────────
   * 14. TOOLTIP LÉGER
   * [data-tooltip="texte"]
   * ───────────────────────────────────────── */

  function initTooltips() {
    var tip = document.createElement('div');
    tip.className = 'pf-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.hidden = true;
    document.body.appendChild(tip);

    function show(el) {
      tip.textContent = el.dataset.tooltip;
      tip.hidden = false;
      var rect = el.getBoundingClientRect();
      var scrollY = window.scrollY;
      tip.style.left = (rect.left + rect.width / 2) + 'px';
      tip.style.top  = (rect.top + scrollY - tip.offsetHeight - 8) + 'px';
      tip.classList.add('is-visible');
    }

    function hide() {
      tip.classList.remove('is-visible');
      tip.hidden = true;
    }

    document.addEventListener('mouseover', function (e) {
      var el = e.target.closest('[data-tooltip]');
      if (el) show(el);
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('[data-tooltip]')) hide();
    });
    document.addEventListener('focusin', function (e) {
      if (e.target.dataset && e.target.dataset.tooltip) show(e.target);
    });
    document.addEventListener('focusout', function (e) {
      if (e.target.dataset && e.target.dataset.tooltip) hide();
    });
  }

  /* ─────────────────────────────────────────
   * 15. LAZY LOAD IMAGES
   * Remplace data-src par src quand visible.
   * ───────────────────────────────────────── */

  function initLazyImages() {
    if (!('IntersectionObserver' in window)) {
      qsa('img[data-src]').forEach(function (img) {
        img.src = img.dataset.src;
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('is-loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    qsa('img[data-src]').forEach(function (img) {
      observer.observe(img);
    });
  }

  /* ─────────────────────────────────────────
   * 16. THEME / PREFERENCE SYSTÈME
   * Applique data-theme="dark" si préférence
   * système détectée (optionnel, non forcé).
   * ───────────────────────────────────────── */

  function initThemePreference() {
    var stored = localStorage.getItem('pf-theme');
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    var toggleBtn = qs('[data-theme-toggle]');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next    = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pf-theme', next);
    });
  }

  /* ─────────────────────────────────────────
   * 17. NOTIFICATION / TOAST
   * API publique : PortoFlow.notify(msg, type)
   * type : 'info' | 'success' | 'warning' | 'error'
   * ───────────────────────────────────────── */

  var toastQueue = [];
  var toastActive = false;

  function showToast(message, type) {
    toastQueue.push({ message: message, type: type || 'info' });
    if (!toastActive) processToastQueue();
  }

  function processToastQueue() {
    if (!toastQueue.length) { toastActive = false; return; }
    toastActive = true;
    var item    = toastQueue.shift();
    var toast   = document.createElement('div');
    toast.className = 'pf-toast pf-toast--' + item.type;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = item.message;
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });

    setTimeout(function () {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
        processToastQueue();
      }, { once: true });
    }, 3500);
  }

  /* ─────────────────────────────────────────
   * 18. PROGRESS BAR DE LECTURE
   * Barre fine en haut de page indiquant la
   * progression de lecture (pages éditoriales).
   * ───────────────────────────────────────── */

  function initReadingProgress() {
    var bar = qs('[data-reading-progress]');
    if (!bar) return;

    function update() {
      var docH    = document.documentElement.scrollHeight - window.innerHeight;
      var percent = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = percent.toFixed(1) + '%';
      bar.setAttribute('aria-valuenow', Math.round(percent));
    }

    window.addEventListener('scroll', debounce(update, 8), { passive: true });
    update();
  }

  /* ─────────────────────────────────────────
   * 19. INITIALISATION GLOBALE
   * ───────────────────────────────────────── */

  ready(function () {
    setActiveNav();
    initMobileMenu();
    initHeaderScroll();
    initReveal();
    initCounters();
    initTabs();
    initAccordion();
    initMockupCarousel();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initSparklines();
    initTooltips();
    initLazyImages();
    initThemePreference();
    initReadingProgress();
  });

  /* ─────────────────────────────────────────
   * 20. API PUBLIQUE
   * ───────────────────────────────────────── */

  window.PortoFlow = window.PortoFlow || {};
  window.PortoFlow.notify  = showToast;
  window.PortoFlow.version = '4.4.4';

}());