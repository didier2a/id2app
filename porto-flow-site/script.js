/* ============================================================
   Porto Flow — script.js
   Vanilla JS — No dependencies — GitHub Pages compatible
   ============================================================ */

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

/* ============================================================
   2. MENU MOBILE — BURGER TOGGLE
   ============================================================ */

function initMobileMenu() {
  var burger = qs('.nav-burger');
  var navMenu = qs('.nav-menu');
  var navLinks = qsa('.nav-menu a');
  var overlay = qs('.nav-overlay');

  if (!burger || !navMenu) return;

  function openMenu() {
    burger.classList.add('is-active');
    navMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (overlay) overlay.classList.add('is-visible');
  }

  function closeMenu() {
    burger.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (overlay) overlay.classList.remove('is-visible');
  }

  burger.addEventListener('click', function () {
    var isOpen = navMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', function () {
      closeMenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

/* ============================================================
   3. NAVIGATION ACTIVE — MISE À JOUR SELON PAGE COURANTE
   ============================================================ */

function initActiveNav() {
  var currentPath = window.location.pathname;
  var currentFile = currentPath.split('/').pop() || 'index.html';

  var navLinks = qsa('.nav-menu a, .nav-link');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var linkFile = href.split('/').pop();

    link.classList.remove('is-active');

    if (
      linkFile === currentFile ||
      (currentFile === '' && linkFile === 'index.html') ||
      (currentFile === 'index.html' && linkFile === 'index.html')
    ) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ============================================================
   4. ANIMATIONS D'ENTRÉE AU SCROLL — INTERSECTION OBSERVER
   ============================================================ */

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
        setTimeout(function () {
          el.classList.add('is-visible');
        }, parseInt(delay, 10));
        observer.unobserve(el);
      }
    });
  }, options);

  qsa('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });

  var staggerGroups = qsa('[data-stagger]');
  staggerGroups.forEach(function (group) {
    var children = qsa('[data-stagger-item]', group);
    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          children.forEach(function (child, index) {
            setTimeout(function () {
              child.classList.add('is-visible');
            }, index * 120);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

    staggerObserver.observe(group);
  });
}

/* ============================================================
   5. BOUTON RETOUR HAUT DE PAGE
   ============================================================ */

function initBackToTop() {
  var btn = qs('.back-to-top');
  if (!btn) return;

  var scrollThreshold = 400;

  function updateVisibility() {
    if (window.scrollY > scrollThreshold) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  updateVisibility();
}

/* ============================================================
   6. HEADER — COMPORTEMENT AU SCROLL (STICKY + SHADOW)
   ============================================================ */

function initStickyHeader() {
  var header = qs('.site-header, header');
  if (!header) return;

  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.scrollY;

    if (currentScroll > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    if (currentScroll > lastScroll && currentScroll > 200) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ============================================================
   7. COMPTEURS ANIMÉS
   ============================================================ */

function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-target') || el.textContent, 10);
  var duration = parseInt(el.getAttribute('data-duration') || '1800', 10);
  var suffix = el.getAttribute('data-suffix') || '';
  var prefix = el.getAttribute('data-prefix') || '';
  var start = 0;
  var startTime = null;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    var elapsed = timestamp - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = easeOutQuart(progress);
    var current = Math.round(start + (target - start) * eased);

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
  if (!('IntersectionObserver' in window)) {
    qsa('[data-counter]').forEach(function (el) {
      animateCounter(el);
    });
    return;
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  qsa('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });
}

/* ============================================================
   8. SIMULATION ASSISTANT IA VISUEL
   ============================================================ */

function initAIAssistant() {
  var assistant = qs('.ai-assistant-demo');
  if (!assistant) return;

  var messages = [
    { role: 'user', text: 'Où manger ce soir à Porto-Vecchio ?' },
    { role: 'ai', text: 'Je vous recommande La Table du Pêcheur, à 800 m. Terrasse disponible, spécialités locales, ouvert jusqu\'à 23h.' },
    { role: 'user', text: 'Y a-t-il de la place au port ce soir ?' },
    { role: 'ai', text: 'Le port de plaisance affiche 12 anneaux disponibles. Réservation possible directement depuis l\'app.' },
    { role: 'user', text: 'Quel est le trafic vers la citadelle ?' },
    { role: 'ai', text: 'Trafic fluide. Temps estimé depuis votre position : 6 minutes. Parking Génois disponible.' }
  ];

  var chatContainer = qs('.ai-chat-messages', assistant);
  if (!chatContainer) return;

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
    var speed = 28;

    function type() {
      if (i < content.length) {
        textEl.textContent += content.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function showNextMessage() {
    if (currentIndex >= messages.length) {
      setTimeout(function () {
        chatContainer.innerHTML = '';
        currentIndex = 0;
        setTimeout(showNextMessage, 800);
      }, 3000);
      return;
    }

    var msg = messages[currentIndex];
    var created = createMessageEl(msg);

    chatContainer.appendChild(created.el);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    var delay = msg.role === 'ai' ? 600 : 200;

    setTimeout(function () {
      typeText(created.textEl, msg.text, function () {
        currentIndex++;
        var nextDelay = msg.role === 'ai' ? 1400 : 800;
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
  }, { threshold: 0.4 });

  aiObserver.observe(assistant);
}

/* ============================================================
   9. SIMULATION CARTE / DASHBOARD TERRITORIAL
   ============================================================ */

function initMapSimulation() {
  var mapCanvas = qs('.map-simulation-canvas');
  if (!mapCanvas) return;

  var points = [
    { x: 30, y: 40, label: 'Port', active: true },
    { x: 55, y: 25, label: 'Citadelle', active: false },
    { x: 70, y: 60, label: 'Plage', active: true },
    { x: 20, y: 70, label: 'Marché', active: false },
    { x: 80, y: 35, label: 'Hôtel', active: true }
  ];

  var dots = qsa('.map-dot', mapCanvas);

  if (dots.length === 0) {
    points.forEach(function (point) {
      var dot = document.createElement('div');
      dot.className = 'map-dot' + (point.active ? ' map-dot--active' : '');
      dot.style.left = point.x + '%';
      dot.style.top = point.y + '%';
      dot.setAttribute('title', point.label);
      dot.setAttribute('aria-label', point.label);

      var pulse = document.createElement('span');
      pulse.className = 'map-dot-pulse';
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
  }, 2000);
}

/* ============================================================
   10. SMOOTH SCROLL POUR ANCRES INTERNES
   ============================================================ */

function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      var headerHeight = 0;
      var header = qs('.site-header, header');
      if (header) {
        headerHeight = header.getBoundingClientRect().height;
      }

      var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
}

/* ============================================================
   11. TABS / ONGLETS SIMPLES
   ============================================================ */

function initTabs() {
  var tabGroups = qsa('[data-tabs]');

  tabGroups.forEach(function (group) {
    var tabs = qsa('[data-tab]', group);
    var panels = qsa('[data-tab-panel]', group);

    function activateTab(tabEl) {
      var target = tabEl.getAttribute('data-tab');

      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });

      panels.forEach(function (p) {
        p.classList.remove('is-active');
        p.setAttribute('hidden', '');
      });

      tabEl.classList.add('is-active');
      tabEl.setAttribute('aria-selected', 'true');

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
      });
    });

    if (tabs.length > 0) {
      activateTab(tabs[0]);
    }
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

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        items.forEach(function (i) {
          i.classList.remove('is-open');
          var c = qs('[data-accordion-content]', i);
          var t = qs('[data-accordion-trigger]', i);
          if (c) c.style.maxHeight = null;
          if (t) t.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      trigger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================================
   13. PARALLAXE LÉGÈRE SUR HERO
   ============================================================ */

function initParallax() {
  var heroParallax = qsa('[data-parallax]');
  if (heroParallax.length === 0) return;

  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var scrollY = window.scrollY;

        heroParallax.forEach(function (el) {
          var speed = parseFloat(el.getAttribute('data-parallax') || '0.3');
          var offset = scrollY * speed;
          el.style.transform = 'translateY(' + offset + 'px)';
        });

        ticking = false;
      });

      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   14. NOTIFICATION / TOAST LÉGER
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
    document.body.appendChild(container);
  }

  var toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  toast.textContent = message;
  toast.setAttribute('role', 'status');

  container.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add('is-visible');
  });

  setTimeout(function () {
    toast.classList.remove('is-visible');
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, duration);
}

/* ============================================================
   15. FORMULAIRE — VALIDATION LÉGÈRE
   ============================================================ */

function initForms() {
  var forms = qsa('[data-validate]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var valid = true;
      var fields = qsa('[required]', form);

      fields.forEach(function (field) {
        var errorEl = qs('[data-error-for="' + field.name + '"]', form);

        field.classList.remove('is-invalid');
        if (errorEl) errorEl.textContent = '';

        if (!field.value.trim()) {
          valid = false;
          field.classList.add('is-invalid');
          if (errorEl) errorEl.textContent = 'Ce champ est requis.';
        } else if (field.type === 'email') {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            valid = false;
            field.classList.add('is-invalid');
            if (errorEl) errorEl.textContent = 'Adresse email invalide.';
          }
        }
      });

      if (!valid) {
        e.preventDefault();
        var firstInvalid = qs('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
      } else {
        e.preventDefault();
        showToast('Message envoyé. Nous vous répondrons rapidement.', 'success');
        form.reset();
      }
    });
  });
}

/* ============================================================
   16. INDICATEUR DE PROGRESSION DE LECTURE
   ============================================================ */

function initReadingProgress() {
  var bar = qs('.reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(progress, 100) + '%';
  }, { passive: true });
}

/* ============================================================
   17. INITIALISATION GLOBALE
   ============================================================ */

ready(function () {
  initMobileMenu();
  initActiveNav();
  initScrollAnimations();
  initBackToTop();
  initStickyHeader();
  initCounters();
  initAIAssistant();
  initMapSimulation();
  initSmoothScroll();
  initTabs();
  initAccordion();
  initParallax();
  initForms();
  initReadingProgress();
});