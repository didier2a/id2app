/* ============================================================
   PortoFlow — script.js
   Vanilla JS — No dependencies — GitHub Pages compatible
   Version V4.3 DesignOps — Consolidation complète
   ============================================================ */

/* ============================================================
   CONSTANTE WEBHOOK FUTUR (non utilisée tant que vide)
   ============================================================ */
var PHOTO_UPLOAD_WEBHOOK_URL = '';

/* ============================================================
   1. UTILITAIRES
   ============================================================ */

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

function safeEl(selector, context) {
  try {
    return (context || document).querySelector(selector);
  } catch (e) {
    return null;
  }
}

/* ============================================================
   2. MENU MOBILE — BURGER TOGGLE ACCESSIBLE
   ============================================================ */

function initMobileMenu() {
  var burger = qs('.nav-burger');
  var navMenu = qs('.nav-menu');
  var overlay = qs('.nav-overlay');

  if (!burger || !navMenu) return;

  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
  burger.setAttribute('aria-controls', 'main-nav-menu');

  if (!navMenu.id) {
    navMenu.id = 'main-nav-menu';
  }

  function openMenu() {
    burger.classList.add('is-active');
    navMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    document.body.classList.add('menu-open');
    if (overlay) {
      overlay.classList.add('is-visible');
      overlay.setAttribute('aria-hidden', 'false');
    }
    var firstLink = qs('a', navMenu);
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    burger.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
    if (overlay) {
      overlay.classList.remove('is-visible');
      overlay.setAttribute('aria-hidden', 'true');
    }
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (navMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  qsa('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  if (overlay) {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.addEventListener('click', function () {
      closeMenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
      burger.focus();
    }
  });

  document.addEventListener('click', function (e) {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  navMenu.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      var focusableEls = qsa('a, button', navMenu).filter(function (el) {
        return !el.disabled && el.offsetParent !== null;
      });
      if (focusableEls.length === 0) return;
      var first = focusableEls[0];
      var last = focusableEls[focusableEls.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ============================================================
   3. NAVIGATION ACTIVE — PAGE COURANTE
   ============================================================ */

function initActiveNav() {
  var currentPath = window.location.pathname;
  var currentFile = currentPath.split('/').pop() || 'index.html';

  if (currentFile === '' || currentFile === '/') {
    currentFile = 'index.html';
  }

  var navLinks = qsa('.nav-menu a, .nav-link, .footer-nav a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var linkFile = href.split('/').pop().split('?')[0].split('#')[0];

    link.classList.remove('is-active');
    link.removeAttribute('aria-current');

    var isActive = false;

    if (linkFile === currentFile) {
      isActive = true;
    } else if (
      (currentFile === 'index.html' || currentFile === '') &&
      (linkFile === 'index.html' || linkFile === '' || linkFile === '/')
    ) {
      isActive = true;
    }

    if (isActive) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================
   4. HEADER STICKY + COMPORTEMENT AU SCROLL
   ============================================================ */

function initStickyHeader() {
  var header = qs('.site-header');
  if (!header) return;

  var lastScroll = 0;
  var scrollThreshold = 60;
  var hideThreshold = 280;

  window.addEventListener('scroll', function () {
    var currentScroll = window.scrollY;

    if (currentScroll > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
      header.classList.remove('is-hidden');
    }

    if (currentScroll > hideThreshold) {
      if (currentScroll > lastScroll + 5) {
        header.classList.add('is-hidden');
      } else if (currentScroll < lastScroll - 5) {
        header.classList.remove('is-hidden');
      }
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ============================================================
   5. ANIMATIONS AU SCROLL — INTERSECTION OBSERVER
   ============================================================ */

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    qsa('[data-animate], [data-stagger-item]').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var animOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  var animObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () {
          el.classList.add('is-visible');
        }, delay);
        animObserver.unobserve(el);
      }
    });
  }, animOptions);

  qsa('[data-animate]').forEach(function (el) {
    animObserver.observe(el);
  });

  var staggerOptions = {
    root: null,
    rootMargin: '0px 0px -30px 0px',
    threshold: 0.08
  };

  var staggerObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var group = entry.target;
        var items = qsa('[data-stagger-item]', group);
        items.forEach(function (item, index) {
          setTimeout(function () {
            item.classList.add('is-visible');
          }, index * 110);
        });
        staggerObserver.unobserve(group);
      }
    });
  }, staggerOptions);

  qsa('[data-stagger]').forEach(function (group) {
    staggerObserver.observe(group);
  });
}

/* ============================================================
   6. BOUTON RETOUR HAUT DE PAGE
   ============================================================ */

function initBackToTop() {
  var btn = qs('.back-to-top');
  if (!btn) return;

  var threshold = 500;

  function updateVisibility() {
    if (window.scrollY > threshold) {
      btn.classList.add('is-visible');
      btn.setAttribute('aria-hidden', 'false');
    } else {
      btn.classList.remove('is-visible');
      btn.setAttribute('aria-hidden', 'true');
    }
  }

  btn.setAttribute('aria-label', 'Retour en haut de page');
  btn.setAttribute('aria-hidden', 'true');

  window.addEventListener('scroll', updateVisibility, { passive: true });

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    var firstFocusable = qs('a, button, [tabindex]');
    if (firstFocusable) firstFocusable.focus();
  });

  updateVisibility();
}

/* ============================================================
   7. COMPTEURS ANIMÉS
   ============================================================ */

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
  if (isNaN(target)) return;

  var duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
  var suffix = el.getAttribute('data-suffix') || '';
  var prefix = el.getAttribute('data-prefix') || '';
  var startTime = null;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var current = Math.round(easeOutQuart(progress) * target);
    el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target.toLocaleString('fr-FR') + suffix;
    }
  }

  requestAnimationFrame(step);
}

function initCounters() {
  var counters = qsa('[data-counter]');
  if (counters.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(function (el) {
    counterObserver.observe(el);
  });
}

/* ============================================================
   8. SIMULATION ASSISTANT IA
   ============================================================ */

function initAIAssistant() {
  var assistant = qs('.ai-assistant-demo');
  if (!assistant) return;

  var chatContainer = qs('.ai-chat-messages', assistant);
  if (!chatContainer) return;

  var messages = [
    { role: 'user', text: 'Où manger ce soir à Porto-Vecchio ?' },
    { role: 'ai', text: 'Je vous recommande La Table du Pêcheur, à 800 m. Terrasse disponible, spécialités locales, ouvert jusqu\'à 23h.' },
    { role: 'user', text: 'Y a-t-il de la place au port ce soir ?' },
    { role: 'ai', text: 'Le port de plaisance affiche 12 anneaux disponibles. Réservation possible directement depuis l\'app.' },
    { role: 'user', text: 'Quel est le trafic vers la citadelle ?' },
    { role: 'ai', text: 'Trafic fluide. Temps estimé depuis votre position : 6 minutes. Parking Génois disponible.' },
    { role: 'user', text: 'Quelle plage est la moins fréquentée maintenant ?' },
    { role: 'ai', text: 'Palombaggia Nord affiche 34% d\'affluence. Accès libre, parking disponible, eau à 26°C.' }
  ];

  var currentIndex = 0;
  var isRunning = false;

  function createMessageEl(msg) {
    var el = document.createElement('div');
    el.className = 'ai-message ai-message--' + msg.role;

    var bubble = document.createElement('div');
    bubble.className = 'ai-bubble';

    if (msg.role === 'ai') {
      var icon = document.createElement('span');
      icon.className = 'ai-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '◈';
      bubble.appendChild(icon);
    }

    var text = document.createElement('span');
    text.className = 'ai-text';
    text.textContent = '';
    bubble.appendChild(text);
    el.appendChild(bubble);

    return { el: el, textEl: text };
  }

  function typeText(textEl, content, callback) {
    var i = 0;
    var speed = 22;

    function type() {
      if (i < content.length) {
        textEl.textContent += content.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        setTimeout(callback, 0);
      }
    }

    type();
  }

  function showNextMessage() {
    if (currentIndex >= messages.length) {
      setTimeout(function () {
        chatContainer.innerHTML = '';
        currentIndex = 0;
        setTimeout(showNextMessage, 1000);
      }, 3500);
      return;
    }

    var msg = messages[currentIndex];
    var created = createMessageEl(msg);
    chatContainer.appendChild(created.el);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    var delay = msg.role === 'ai' ? 500 : 150;

    setTimeout(function () {
      typeText(created.textEl, msg.text, function () {
        currentIndex++;
        var nextDelay = msg.role === 'ai' ? 1200 : 700;
        setTimeout(showNextMessage, nextDelay);
      });
    }, delay);
  }

  if (!('IntersectionObserver' in window)) {
    showNextMessage();
    return;
  }

  var aiObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !isRunning) {
        isRunning = true;
        showNextMessage();
        aiObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  aiObserver.observe(assistant);
}

/* ============================================================
   9. SIMULATION CARTE TERRITORIALE
   ============================================================ */

function initMapSimulation() {
  var mapCanvas = qs('.map-simulation-canvas');
  if (!mapCanvas) return;

  var points = [
    { x: 28, y: 42, label: 'Port', type: 'port', active: true },
    { x: 52, y: 22, label: 'Citadelle', type: 'monument', active: false },
    { x: 72, y: 58, label: 'Palombaggia', type: 'plage', active: true },
    { x: 18, y: 68, label: 'Marché', type: 'commerce', active: false },
    { x: 82, y: 32, label: 'Hôtel', type: 'hebergement', active: false },
    { x: 45, y: 72, label: 'Parking', type: 'parking', active: true },
    { x: 62, y: 38, label: 'Plage Cala', type: 'plage', active: false }
  ];

  var existingDots = qsa('.map-dot', mapCanvas);
  if (existingDots.length === 0) {
    points.forEach(function (point) {
      var dot = document.createElement('div');
      dot.className = 'map-dot map-dot--' + point.type + (point.active ? ' map-dot--active' : '');
      dot.style.left = point.x + '%';
      dot.style.top = point.y + '%';
      dot.setAttribute('title', point.label);
      dot.setAttribute('aria-label', point.label);
      dot.setAttribute('role', 'img');

      var pulse = document.createElement('span');
      pulse.className = 'map-dot-pulse';
      pulse.setAttribute('aria-hidden', 'true');
      dot.appendChild(pulse);

      var label = document.createElement('span');
      label.className = 'map-dot-label';
      label.textContent = point.label;
      dot.appendChild(label);

      mapCanvas.appendChild(dot);
    });
  }

  var allDots = qsa('.map-dot', mapCanvas);
  var activeIndex = 0;

  setInterval(function () {
    allDots.forEach(function (d) { d.classList.remove('map-dot--active'); });
    if (allDots[activeIndex]) {
      allDots[activeIndex].classList.add('map-dot--active');
    }
    activeIndex = (activeIndex + 1) % allDots.length;
  }, 1800);
}

/* ============================================================
   10. SMOOTH SCROLL ANCRES INTERNES
   ============================================================ */

function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;

      var targetId = href.slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      var header = qs('.site-header');
      var headerHeight = header ? header.getBoundingClientRect().height : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });

      setTimeout(function () {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }, 600);
    });
  });
}

/* ============================================================
   11. TABS / ONGLETS
   ============================================================ */

function initTabs() {
  var tabGroups = qsa('[data-tabs]');

  tabGroups.forEach(function (group) {
    var tabs = qsa('[data-tab]', group);
    var panels = qsa('[data-tab-panel]', group);

    if (tabs.length === 0) return;

    var tabList = qs('[role="tablist"]', group);
    if (!tabList) {
      tabList = qs('[data-tabs-list]', group);
      if (tabList) tabList.setAttribute('role', 'tablist');
    }

    tabs.forEach(function (tab, i) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('tabindex', i === 0 ? '0' : '-1');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      var target = tab.getAttribute('data-tab');
      if (target) tab.setAttribute('aria-controls', 'tab-panel-' + target);
    });

    panels.forEach(function (panel) {
      panel.setAttribute('role', 'tabpanel');
      var key = panel.getAttribute('data-tab-panel');
      if (key) panel.id = 'tab-panel-' + key;
    });

    function activateTab(tabEl) {
      var target = tabEl.getAttribute('data-tab');

      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      panels.forEach(function (p) {
        p.classList.remove('is-active');
        p.setAttribute('hidden', '');
      });

      tabEl.classList.add('is-active');
      tabEl.setAttribute('aria-selected', 'true');
      tabEl.setAttribute('tabindex', '0');

      var panel = qs('[data-tab-panel="' + target + '"]', group);
      if (panel) {
        panel.classList.add('is-active');
        panel.removeAttribute('hidden');
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab);
      });

      tab.addEventListener('keydown', function (e) {
        var idx = tabs.indexOf(tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          var next = tabs[(idx + 1) % tabs.length];
          next.focus();
          activateTab(next);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          var prev = tabs[(idx - 1 + tabs.length) % tabs.length];
          prev.focus();
          activateTab(prev);
        }
        if (e.key === 'Home') {
          e.preventDefault();
          tabs[0].focus();
          activateTab(tabs[0]);
        }
        if (e.key === 'End') {
          e.preventDefault();
          tabs[tabs.length - 1].focus();
          activateTab(tabs[tabs.length - 1]);
        }
      });
    });

    activateTab(tabs[0]);
  });
}

/* ============================================================
   12. ACCORDÉON
   ============================================================ */

function initAccordion() {
  var accordions = qsa('[data-accordion]');

  accordions.forEach(function (accordion) {
    var items = qsa('[data-accordion-item]', accordion);

    items.forEach(function (item) {
      var trigger = qs('[data-accordion-trigger]', item);
      var content = qs('[data-accordion-content]', item);

      if (!trigger || !content) return;

      var contentId = 'accordion-content-' + Math.random().toString(36).slice(2, 8);
      content.id = contentId;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', contentId);
      content.setAttribute('hidden', '');

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        items.forEach(function (i) {
          i.classList.remove('is-open');
          var c = qs('[data-accordion-content]', i);
          var t = qs('[data-accordion-trigger]', i);
          if (c) {
            c.style.maxHeight = null;
            c.setAttribute('hidden', '');
          }
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          content.removeAttribute('hidden');
          content.style.maxHeight = content.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
}

/* ============================================================
   13. PARALLAXE LÉGÈRE SUR HERO
   ============================================================ */

function initParallax() {
  var parallaxEls = qsa('[data-parallax]');
  if (parallaxEls.length === 0) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        parallaxEls.forEach(function (el) {
          var speed = parseFloat(el.getAttribute('data-parallax') || '0.3');
          el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   14. TOAST / NOTIFICATION
   ============================================================ */

function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 3500;

  var container = qs('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    container.setAttribute('role', 'status');
    document.body.appendChild(container);
  }

  var toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });
  });

  setTimeout(function () {
    toast.classList.remove('is-visible');
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 400);
  }, duration);
}

/* ============================================================
   15. FORMULAIRES — VALIDATION
   ============================================================ */

function initForms() {
  var forms = qsa('[data-validate]');

  forms.forEach(function (form) {
    var submitBtn = qs('[type="submit"]', form);

    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var fields = qsa('[required]', form);

      fields.forEach(function (field) {
        var errorEl = qs('[data-error-for="' + field.name + '"]', form);
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.setAttribute('aria-live', 'polite');
        }

        if (!field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
          field.setAttribute('aria-invalid', 'true');
          if (errorEl) errorEl.textContent = 'Ce champ est requis.';
        } else if (field.type === 'email') {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            valid = false;
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.textContent = 'Adresse email invalide.';
          }
        }
      });

      if (!valid) {
        var firstInvalid = qs('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
      } else {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Envoi en cours…';
        }
        setTimeout(function () {
          showToast('Message envoyé. Nous vous répondrons rapidement.', 'success');
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
          }
        }, 800);
      }
    });

    qsa('[required]', form).forEach(function (field) {
      field.addEventListener('blur', function () {
        var errorEl = qs('[data-error-for="' + field.name + '"]', form);
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
        if (errorEl) errorEl.textContent = '';

        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          field.setAttribute('aria-invalid', 'true');
          if (errorEl) errorEl.textContent = 'Ce champ est requis.';
        } else if (field.type === 'email') {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.textContent = 'Adresse email invalide.';
          }
        }
      });
    });
  });
}

/* ============================================================
   16. INDICATEUR DE PROGRESSION DE LECTURE
   ============================================================ */

function initReadingProgress() {
  var bar = qs('.reading-progress');
  if (!bar) return;

  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');
  bar.setAttribute('aria-label', 'Progression de lecture');

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    var clamped = Math.min(Math.max(progress, 0), 100);
    bar.style.width = clamped + '%';
    bar.setAttribute('aria-valuenow', Math.round(clamped));
  }, { passive: true });
}

/* ============================================================
   17. DASHBOARD STATS — MISE À JOUR DYNAMIQUE
   ============================================================ */

function initDashboardStats() {
  var statItems = qsa('[data-live-stat]');
  if (statItems.length === 0) return;

  function randomVariation(base, range) {
    return base + Math.floor((Math.random() - 0.5) * range);
  }

  statItems.forEach(function (el) {
    var base = parseInt(el.getAttribute('data-base') || el.textContent, 10);
    var range = parseInt(el.getAttribute('data-range') || '10', 10);
    var suffix = el.getAttribute('data-suffix') || '';

    if (isNaN(base)) return;

    var intervalDelay = 4000 + Math.random() * 3000;

    setInterval(function () {
      var newVal = Math.max(0, randomVariation(base, range));
      el.textContent = newVal.toLocaleString('fr-FR') + suffix;
      el.classList.add('stat-updated');
      setTimeout(function () {
        el.classList.remove('stat-updated');
      }, 600);
    }, intervalDelay);
  });
}

/* ============================================================
   18. FLUX TEMPS RÉEL — SIMULATION TRAFIC
   ============================================================ */

function initTrafficSimulation() {
  var trafficBars = qsa('[data-traffic-bar]');
  if (trafficBars.length === 0) return;

  function updateBars() {
    trafficBars.forEach(function (bar) {
      var min = parseInt(bar.getAttribute('data-min') || '10', 10);
      var max = parseInt(bar.getAttribute('data-max') || '90', 10);
      var current = parseInt(bar.getAttribute('data-current') || '50', 10);
      var delta = Math.floor((Math.random() - 0.5) * 15);
      var newVal = Math.min(max, Math.max(min, current + delta));

      bar.setAttribute('data-current', newVal);
      bar.style.width = newVal + '%';
      bar.setAttribute('aria-valuenow', newVal);

      bar.className = bar.className.replace(/\btraffic--(low|medium|high)\b/g, '').trim();

      if (newVal < 40) {
        bar.classList.add('traffic--low');
      } else if (newVal < 70) {
        bar.classList.add('traffic--medium');
      } else {
        bar.classList.add('traffic--high');
      }
    });
  }

  updateBars();
  setInterval(updateBars, 3500);
}

/* ============================================================
   19. HERO — ANIMATION PARTICULES LÉGÈRES (CANVAS)
   ============================================================ */

function initHeroParticles() {
  var canvas = qs('.hero-particles-canvas');
  if (!canvas) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.setAttribute('aria-hidden', 'true');

  var particles = [];
  var particleCount = 38;
  var animFrame;
  var isDestroyed = false;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    };
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    if (isDestroyed) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + p.alpha + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.08 * (1 - dist / 80)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(drawParticles);
  }

  resize();
  initParticles();
  drawParticles();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      initParticles();
    }, 200);
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animFrame) cancelAnimationFrame(animFrame);
    } else {
      if (!isDestroyed) drawParticles();
    }
  });
}

/* ============================================================
   20. MICRO-INTERACTIONS — BOUTONS ET CARTES
   ============================================================ */

function initMicroInteractions() {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  qsa('.btn, .cta-btn, .feature-card, .metric-card, .dashboard-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      el.classList.add('is-hovered');
    });
    el.addEventListener('mouseleave', function () {
      el.classList.remove('is-hovered');
    });
  });

  qsa('.btn, .cta-btn').forEach(function (btn) {
    btn.addEventListener('mousedown', function () {
      btn.classList.add('is-pressed');
    });
    btn.addEventListener('mouseup', function () {
      btn.classList.remove('is-pressed');
    });
    btn.addEventListener('mouseleave', function () {
      btn.classList.remove('is-pressed');
    });
  });
}

/* ============================================================
   21. FOCUS VISIBLE — ACCESSIBILITÉ CLAVIER
   ============================================================ */

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
      document.body.classList.remove('using-mouse');
      document.body.classList.add('using-keyboard');
    }
  });
}

/* ============================================================
   22. SKIP LINK — ACCESSIBILITÉ NAVIGATION
   ============================================================ */

function initSkipLink() {
  var skipLink = qs('.skip-link');
  if (!skipLink) return;

  skipLink.addEventListener('click', function (e) {
    var targetId = skipLink.getAttribute('href');
    if (!targetId || targetId === '#') return;
    var target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  });
}

/* ============================================================
   23. LAZY LOADING IMAGES — FALLBACK NATIF
   ============================================================ */

function initLazyImages() {
  var images = qsa('img[data-src]');
  if (images.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    images.forEach(function (img) {
      img.src = img.getAttribute('data-src');
    });
    return;
  }

  var imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        var src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.add('is-loaded');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  images.forEach(function (img) {
    imgObserver.observe(img);
  });
}

/* ============================================================
   24. INITIALISATION PRINCIPALE
   ============================================================ */

ready(function () {
  initSkipLink();
  initFocusVisible();
  initMobileMenu();
  initActiveNav();
  initStickyHeader();
  initScrollAnimations();
  initBackToTop();
  initCounters();
  initSmoothScroll();
  initTabs();
  initAccordion();
  initParallax();
  initForms();
  initReadingProgress();
  initDashboardStats();
  initTrafficSimulation();
  initHeroParticles();
  initAIAssistant();
  initMapSimulation();
  initMicroInteractions();
  initLazyImages();
});