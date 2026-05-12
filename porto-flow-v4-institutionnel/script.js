(function () {
  'use strict';

  // --- Utilitaire : sélection sécurisée ---
  function qs(selector, context) {
    return (context || document).querySelector(selector);
  }

  function qsa(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
  }

  // --- Menu hamburger / navigation mobile ---
  function initMobileMenu() {
    var toggle = qs('#nav-toggle');
    var menu = qs('#nav-menu');
    var overlay = qs('#nav-overlay');

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fermer le menu');
      if (overlay) overlay.classList.add('is-visible');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Ouvrir le menu');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        closeMenu();
      });
    }

    // Fermeture via touche Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Fermeture au clic sur un lien du menu
    qsa('a', menu).forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  // --- Lien actif dans la navigation ---
  function initActiveNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    qsa('nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href === currentPath) {
        link.classList.add('nav-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // --- Header : ombre au scroll ---
  function initScrollHeader() {
    var header = qs('header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Apparition progressive des sections au scroll ---
  function initRevealOnScroll() {
    var elements = qsa('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
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
    }, { threshold: 0.12 });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Formulaire de contact : validation légère ---
  function initContactForm() {
    var form = qs('#contact-form');
    if (!form) return;

    var feedback = qs('#form-feedback');

    function showFeedback(message, type) {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.className = 'form-feedback form-feedback--' + type;
      feedback.removeAttribute('hidden');
    }

    function hideFeedback() {
      if (!feedback) return;
      feedback.setAttribute('hidden', '');
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideFeedback();

      var name = qs('[name="name"]', form);
      var email = qs('[name="email"]', form);
      var message = qs('[name="message"]', form);

      var errors = [];

      if (name && name.value.trim().length < 2) {
        errors.push('Veuillez indiquer votre nom.');
      }

      if (email) {
        var emailVal = email.value.trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailVal)) {
          errors.push('Veuillez saisir une adresse e-mail valide.');
        }
      }

      if (message && message.value.trim().length < 10) {
        errors.push('Votre message doit contenir au moins 10 caractères.');
      }

      if (errors.length > 0) {
        showFeedback(errors.join(' '), 'error');
        return;
      }

      // Simulation d'envoi (pas de backend)
      showFeedback('Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.', 'success');
      form.reset();
    });
  }

  // --- Dashboard : animation légère des compteurs ---
  function initCounters() {
    var counters = qsa('[data-counter]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-counter');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-counter'), 10);
        if (isNaN(target)) return;
        var duration = 900;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          el.textContent = Math.floor(progress * target).toLocaleString('fr-FR');
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target.toLocaleString('fr-FR');
          }
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    }, { threshold: 0.3 });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Initialisation globale ---
  function init() {
    initMobileMenu();
    initActiveNav();
    initScrollHeader();
    initRevealOnScroll();
    initContactForm();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();