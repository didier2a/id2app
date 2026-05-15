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
   * 2. NAVIGATION ACTIVE
   * Détecte la page courante et pose la classe
   * "active" sur le lien correspondant.
   * ───────────────────────────────────────── */

  function initActiveNav() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    if (current === '' || current === '/') current = 'index.html';

    $$('.nav-link, .nav__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var target = href.split('/').pop();
      if (target === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ─────────────────────────────────────────
   * 3. MENU MOBILE (hamburger)
   * ───────────────────────────────────────── */

  function initMobileMenu() {
    var toggle = $('.nav-toggle, .hamburger, [data-nav-toggle]');
    var menu   = $('.nav-menu, .nav__menu, [data-nav-menu]');
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', menu.id || 'nav-menu');

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });

    /* Fermer sur clic extérieur */
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      }
    });

    /* Fermer sur Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        menu.classList.remove('is-open');
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
    var header = $('header, .site-header, [data-header]');
    if (!header) return;

    var threshold = 60;

    function onScroll() {
      if (window.scrollY > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
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
      /* Fallback : tout visible */
      $$('[data-reveal]').forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    $$('[data-reveal]').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────
   * 6. COMPTEURS ANIMÉS (metrics panel)
   * Anime les éléments [data-count] vers leur
   * valeur cible quand ils entrent dans le
   * viewport.
   * ───────────────────────────────────────── */

  function animateCount(el) {
    var target   = parseFloat(el.getAttribute('data-count')) || 0;
    var duration = parseInt(el.getAttribute('data-count-duration'), 10) || 1400;
    var suffix   = el.getAttribute('data-count-suffix') || '';
    var prefix   = el.getAttribute('data-count-prefix') || '';
    var decimals = (String(target).split('.')[1] || '').length;
    var start    = null;
    var from     = 0;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      /* Ease-out cubic */
      var ease = 1 - Math.pow(1 - progress, 3);
      var value = from + (target - from) * ease;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = $$('[data-count]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ─────────────────────────────────────────
   * 7. TABS (onglets génériques)
   * Structure attendue :
   *   [data-tabs]
   *     [data-tab-trigger="id"]  (boutons)
   *     [data-tab-panel="id"]    (panneaux)
   * ───────────────────────────────────────── */

  function initTabs() {
    $$('[data-tabs]').forEach(function (container) {
      var triggers = $$('[data-tab-trigger]', container);
      var panels   = $$('[data-tab-panel]', container);

      if (!triggers.length || !panels.length) return;

      function activate(id) {
        triggers.forEach(function (btn) {
          var active = btn.getAttribute('data-tab-trigger') === id;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', String(active));
          btn.setAttribute('tabindex', active ? '0' : '-1');
        });
        panels.forEach(function (panel) {
          var active = panel.getAttribute('data-tab-panel') === id;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
        });
      }

      /* Init : premier onglet actif */
      var firstId = triggers[0].getAttribute('data-tab-trigger');
      activate(firstId);

      triggers.forEach(function (btn) {
        btn.addEventListener('click', function () {
          activate(btn.getAttribute('data-tab-trigger'));
        });

        /* Navigation clavier */
        btn.addEventListener('keydown', function (e) {
          var idx = triggers.indexOf(btn);
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            var next = triggers[(idx + 1) % triggers.length];
            next.focus();
            activate(next.getAttribute('data-tab-trigger'));
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            var prev = triggers[(idx - 1 + triggers.length) % triggers.length];
            prev.focus();
            activate(prev.getAttribute('data-tab-trigger'));
          }
        });
      });
    });
  }

  /* ─────────────────────────────────────────
   * 8. CARROUSEL / SLIDER MOCKUP SMARTPHONE
   * Structure attendue :
   *   [data-slider]
   *     [data-slider-track]
   *       [data-slide] × N
   *     [data-slider-prev]
   *     [data-slider-next]
   *     [data-slider-dots]  (optionnel)
   * ───────────────────────────────────────── */

  function initSliders() {
    $$('[data-slider]').forEach(function (slider) {
      var track  = $('[data-slider-track]', slider);
      var slides = $$('[data-slide]', slider);
      var prev   = $('[data-slider-prev]', slider);
      var next   = $('[data-slider-next]', slider);
      var dotsEl = $('[data-slider-dots]', slider);

      if (!track || slides.length < 2) return;

      var current  = 0;
      var total    = slides.length;
      var autoplay = slider.hasAttribute('data-slider-auto');
      var interval = parseInt(slider.getAttribute('data-slider-interval'), 10) || 3800;
      var timer    = null;

      /* Créer les dots */
      var dots = [];
      if (dotsEl) {
        slides.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.setAttribute('type', 'button');
          dot.setAttribute('aria-label', 'Écran ' + (i + 1));
          dot.classList.add('slider-dot');
          dot.addEventListener('click', function () { goTo(i); });
          dotsEl.appendChild(dot);
          dots.push(dot);
        });
      }

      function updateDots() {
        dots.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === current);
        });
      }

      function updateSlides() {
        slides.forEach(function (slide, i) {
          slide.classList.toggle('is-active', i === current);
          slide.setAttribute('aria-hidden', String(i !== current));
        });
        /* Translate track */
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        updateDots();
      }

      function goTo(idx) {
        current = (idx + total) % total;
        updateSlides();
      }

      function goNext() { goTo(current + 1); }
      function goPrev() { goTo(current - 1); }

      if (next) next.addEventListener('click', function () { goNext(); resetAuto(); });
      if (prev) prev.addEventListener('click', function () { goPrev(); resetAuto(); });

      /* Swipe tactile */
      var touchStartX = null;
      track.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      track.addEventListener('touchend', function (e) {
        if (touchStartX === null) return;
        var delta = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 40) {
          delta < 0 ? goNext() : goPrev();
          resetAuto();
        }
        touchStartX = null;
      }, { passive: true });

      /* Autoplay */
      function startAuto() {
        if (!autoplay) return;
        timer = setInterval(goNext, interval);
      }
      function resetAuto() {
        clearInterval(timer);
        startAuto();
      }

      /* Pause au survol */
      slider.addEventListener('mouseenter', function () { clearInterval(timer); });
      slider.addEventListener('mouseleave', startAuto);

      /* Init */
      updateSlides();
      startAuto();
    });
  }

  /* ─────────────────────────────────────────
   * 9. ACCORDÉON
   * Structure attendue :
   *   [data-accordion]
   *     [data-accordion-item] × N
   *       [data-accordion-trigger]
   *       [data-accordion-panel]
   * ───────────────────────────────────────── */

  function initAccordions() {
    $$('[data-accordion]').forEach(function (acc) {
      var items = $$('[data-accordion-item]', acc);
      var single = acc.hasAttribute('data-accordion-single');

      items.forEach(function (item) {
        var trigger = $('[data-accordion-trigger]', item);
        var panel   = $('[data-accordion-panel]', item);
        if (!trigger || !panel) return;

        var panelId = 'acc-panel-' + Math.random().toString(36).slice(2, 7);
        panel.id = panelId;
        trigger.setAttribute('aria-controls', panelId);
        trigger.setAttribute('aria-expanded', 'false');
        panel.hidden = true;

        trigger.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');

          if (single) {
            items.forEach(function (other) {
              other.classList.remove('is-open');
              var t = $('[data-accordion-trigger]', other);
              var p = $('[data-accordion-panel]', other);
              if (t) t.setAttribute('aria-expanded', 'false');
              if (p) p.hidden = true;
            });
          }

          if (!isOpen) {
            item.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
            panel.hidden = false;
          }
        });
      });
    });
  }

  /* ─────────────────────────────────────────
   * 10. FORMULAIRE CONTACT — VALIDATION LÉGÈRE
   * ───────────────────────────────────────── */

  function initContactForm() {
    var form = $('[data-contact-form]');
    if (!form) return;

    var feedback = $('[data-form-feedback]', form);

    function showFeedback(msg, type) {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = 'form-feedback form-feedback--' + type;
      feedback.removeAttribute('hidden');
      feedback.setAttribute('role', 'alert');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      $$('[required]', form).forEach(function (field) {
        var val = field.value.trim();
        var empty = val === '';
        var emailField = field.type === 'email' && val !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

        if (empty || emailField) {
          field.classList.add('field-error');
          field.setAttribute('aria-invalid', 'true');
          valid = false;
        } else {
          field.classList.remove('field-error');
          field.removeAttribute('aria-invalid');
        }
      });

      if (!valid) {
        showFeedback('Veuillez compléter tous les champs obligatoires.', 'error');
        return;
      }

      /* Simulation envoi */
      var btn = $('[type="submit"]', form);
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Envoi en cours…';
      }

      setTimeout(function () {
        showFeedback('Votre message a bien été transmis. Nous vous répondrons sous 48 h.', 'success');
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Envoyer';
        }
      }, 1200);
    });

    /* Nettoyage erreur à la saisie */
    $$('[required]', form).forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('field-error');
        field.removeAttribute('aria-invalid');
      });
    });
  }

  /* ─────────────────────────────────────────
   * 11. SMOOTH SCROLL (ancres internes)
   * ───────────────────────────────────────── */

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        /* Focus pour accessibilité */
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ─────────────────────────────────────────
   * 12. TOOLTIP LÉGER
   * Ajoute un tooltip natif amélioré sur
   * [data-tooltip="texte"]
   * ───────────────────────────────────────── */

  function initTooltips() {
    var tip = null;

    $$('[data-tooltip]').forEach(function (el) {
      el.setAttribute('tabindex', el.getAttribute('tabindex') || '0');

      function show() {
        if (tip) tip.remove();
        tip = document.createElement('div');
        tip.className = 'pf-tooltip';
        tip.textContent = el.getAttribute('data-tooltip');
        tip.setAttribute('role', 'tooltip');
        var id = 'tip-' + Math.random().toString(36).slice(2, 7);
        tip.id = id;
        el.setAttribute('aria-describedby', id);
        document.body.appendChild(tip);

        var rect = el.getBoundingClientRect();
        var scrollY = window.scrollY;
        var scrollX = window.scrollX;
        tip.style.top  = (rect.top + scrollY - tip.offsetHeight - 8) + 'px';
        tip.style.left = (rect.left + scrollX + rect.width / 2 - tip.offsetWidth / 2) + 'px';
        tip.classList.add('is-visible');
      }

      function hide() {
        if (tip) {
          tip.remove();
          tip = null;
        }
        el.removeAttribute('aria-describedby');
      }

      el.addEventListener('mouseenter', show);
      el.addEventListener('mouseleave', hide);
      el.addEventListener('focus', show);
      el.addEventListener('blur', hide);
    });
  }

  /* ─────────────────────────────────────────
   * 13. DASHBOARD — MINI GRAPHIQUES SVG
   * Génère des sparklines SVG dans
   * [data-sparkline="v1,v2,v3,..."]
   * ───────────────────────────────────────── */

  function initSparklines() {
    $$('[data-sparkline]').forEach(function (el) {
      var raw    = el.getAttribute('data-sparkline');
      var values = raw.split(',').map(Number).filter(function (n) { return !isNaN(n); });
      if (values.length < 2) return;

      var w      = parseInt(el.getAttribute('data-sparkline-width'), 10)  || 120;
      var h      = parseInt(el.getAttribute('data-sparkline-height'), 10) || 36;
      var color  = el.getAttribute('data-sparkline-color') || 'var(--color-accent, #C87941)';
      var min    = Math.min.apply(null, values);
      var max    = Math.max.apply(null, values);
      var range  = max - min || 1;
      var step   = w / (values.length - 1);

      var points = values.map(function (v, i) {
        var x = i * step;
        var y = h - ((v - min) / range) * (h - 6) - 3;
        return x.toFixed(1) + ',' + y.toFixed(1);
      }).join(' ');

      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">'
        + '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>'
        + '</svg>';

      el.innerHTML = svg;
    });
  }

  /* ─────────────────────────────────────────
   * 14. LAZY LOAD IMAGES
   * Charge les images [data-src] quand elles
   * entrent dans le viewport.
   * ───────────────────────────────────────── */

  function initLazyImages() {
    var images = $$('img[data-src]');
    if (!images.length) return;

    if (!('IntersectionObserver' in window)) {
      images.forEach(function (img) {
        img.src = img.getAttribute('data-src');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    images.forEach(function (img) {
      observer.observe(img);
    });
  }

  /* ─────────────────────────────────────────
   * 15. BACK TO TOP
   * Affiche un bouton [data-back-top] après
   * défilement.
   * ───────────────────────────────────────── */

  function initBackToTop() {
    var btn = $('[data-back-top]');
    if (!btn) return;

    var threshold = 400;

    function toggle() {
      btn.classList.toggle('is-visible', window.scrollY > threshold);
    }

    window.addEventListener('scroll', debounce(toggle, 80), { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggle();
  }

  /* ─────────────────────────────────────────
   * 16. NOTIFICATION / TOAST
   * API publique : PortoFlow.notify(msg, type)
   * types : 'info' | 'success' | 'warning' | 'error'
   * ───────────────────────────────────────── */

  var toastContainer = null;

  function getToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'pf-toast-container';
      toastContainer.setAttribute('aria-live', 'polite');
      toastContainer.setAttribute('aria-atomic', 'false');
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  function notify(msg, type) {
    type = type || 'info';
    var container = getToastContainer();
    var toast = document.createElement('div');
    toast.className = 'pf-toast pf-toast--' + type;
    toast.textContent = msg;
    toast.setAttribute('role', 'status');
    container.appendChild(toast);

    /* Entrée */
    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });

    /* Sortie automatique */
    setTimeout(function () {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', function () {
        toast.remove();
      }, { once: true });
    }, 4000);
  }

  /* ─────────────────────────────────────────
   * 17. INITIALISATION GLOBALE
   * ───────────────────────────────────────── */

  ready(function () {
    initActiveNav();
    initMobileMenu();
    initHeaderScroll();
    initReveal();
    initCounters();
    initTabs();
    initSliders();
    initAccordions();
    initContactForm();
    initSmoothScroll();
    initTooltips();
    initSparklines();
    initLazyImages();
    initBackToTop();
  });

  /* ─────────────────────────────────────────
   * 18. API PUBLIQUE
   * ───────────────────────────────────────── */

  window.PortoFlow = window.PortoFlow || {};
  window.PortoFlow.notify    = notify;
  window.PortoFlow.goToSlide = function (sliderEl, idx) {
    /* Permet de piloter un slider depuis l'extérieur */
    var event = new CustomEvent('pf:goto', { detail: { index: idx } });
    if (sliderEl) sliderEl.dispatchEvent(event);
  };
  window.PortoFlow.version = '4.4.4';

}());