/* ============================================================
   PortoFlow — script.js
   Vanilla JS — No dependencies — GitHub Pages compatible
   Version V4.2 — Consolidation complète
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

  function openMenu() {
    burger.classList.add('is-active');
    navMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu');
    document.body.classList.add('menu-open');
    if (overlay) overlay.classList.add('is-visible');
  }

  function closeMenu() {
    burger.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
    if (overlay) overlay.classList.remove('is-visible');
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
    overlay.addEventListener('click', function () {
      closeMenu();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
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
}

/* ============================================================
   3. NAVIGATION ACTIVE — PAGE COURANTE
   ============================================================ */

function initActiveNav() {
  var currentPath = window.location.pathname;
  var currentFile = currentPath.split('/').pop() || 'index.html';

  if (currentFile === '' || currentFile === '/') currentFile = 'index.html';

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
  var scrollThreshold = 80;
  var hideThreshold = 300;

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
          }, index * 100);
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
    } else {
      btn.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', updateVisibility, { passive: true });

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    var speed = 24;

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

      trigger.setAttribute('aria-expanded', 'false');

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
    });
  });
}

/* ============================================================
   13. PARALLAXE LÉGÈRE SUR HERO
   ============================================================ */

function initParallax() {
  var parallaxEls = qsa('[data-parallax]');
  if (parallaxEls.length === 0) return;

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
    document.body.appendChild(container);
  }

  var toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  toast.textContent = message;
  toast.setAttribute('role', 'status');
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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
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
        var firstInvalid = qs('.is-invalid', form);
        if (firstInvalid) firstInvalid.focus();
      } else {
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

    setInterval(function () {
      var newVal = randomVariation(base, range);
      newVal = Math.max(0, newVal);
      el.textContent = newVal.toLocaleString('fr-FR') + suffix;
      el.classList.add('stat-updated');
      setTimeout(function () {
        el.classList.remove('stat-updated');
      }, 600);
    }, 4000 + Math.random() * 3000);
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

      bar.className = bar.className.replace(/traffic--(low|medium|high)/g, '');
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

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var particles = [];
  var particleCount = 40;
  var animFrame;

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
      cancelAnimationFrame(animFrame);
      resize();
      initParticles();
      drawParticles();
    }, 200);
  });
}

/* ============================================================
   20. SAISON TOGGLE — TERRITOIRE
   ============================================================ */

function initSeasonToggle() {
  var toggleBtns = qsa('[data-season-toggle]');
  var seasonPanels = qsa('[data-season-panel]');

  if (toggleBtns.length === 0 || seasonPanels.length === 0) return;

  function activateSeason(season) {
    toggleBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-season-toggle') === season);
    });
    seasonPanels.forEach(function (panel) {
      var isTarget = panel.getAttribute('data-season-panel') === season;
      panel.classList.toggle('is-active', isTarget);
      if (isTarget) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
    });
  }

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateSeason(btn.getAttribute('data-season-toggle'));
    });
  });

  if (toggleBtns[0]) {
    activateSeason(toggleBtns[0].getAttribute('data-season-toggle'));
  }
}

/* ============================================================
   21. MODULES APP — NAVIGATION INTERNE
   ============================================================ */

function initAppModules() {
  var moduleBtns = qsa('[data-module-btn]');
  var modulePanels = qsa('[data-module-panel]');

  if (moduleBtns.length === 0 || modulePanels.length === 0) return;

  function activateModule(moduleId) {
    moduleBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-module-btn') === moduleId);
    });
    modulePanels.forEach(function (panel) {
      var isTarget = panel.getAttribute('data-module-panel') === moduleId;
      panel.classList.toggle('is-active', isTarget);
    });
  }

  moduleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateModule(btn.getAttribute('data-module-btn'));
    });
  });

  if (moduleBtns[0]) {
    activateModule(moduleBtns[0].getAttribute('data-module-btn'));
  }
}

/* ============================================================
   22. PARTNER CARDS — HOVER INTERACTIF
   ============================================================ */

function initPartnerCards() {
  var cards = qsa('.partner-card[data-partner]');

  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      card.classList.add('is-hovered');
    });
    card.addEventListener('mouseleave', function () {
      card.classList.remove('is-hovered');
    });
    card.addEventListener('focus', function () {
      card.classList.add('is-hovered');
    });
    card.addEventListener('blur', function () {
      card.classList.remove('is-hovered');
    });
  });
}

/* ============================================================
   23. TECH STACK — ANIMATION BOUCLE RÉCURSIVE
   ============================================================ */

function initTechLoop() {
  var loopEl = qs('.tech-loop-visual');
  if (!loopEl) return;

  var steps = qsa('.tech-loop-step', loopEl);
  if (steps.length === 0) return;

  var currentStep = 0;

  function activateStep(index) {
    steps.forEach(function (s, i) {
      s.classList.toggle('is-active', i === index);
    });
  }

  activateStep(0);

  setInterval(function () {
    currentStep = (currentStep + 1) % steps.length;
    activateStep(currentStep);
  }, 2200);
}

/* ============================================================
   24. GALERIE PHOTO LOCALE
   Prévisualisation locale, localStorage, ajout par fichier ou URL
   ============================================================ */

function initPhotoGallery() {
  var gallery = qs('[data-photo-gallery]');
  if (!gallery) return;

  var grid = qs('[data-gallery-grid]', gallery);
  var fileInput = qs('[data-gallery-file-input]', gallery);
  var urlInput = qs('[data-gallery-url-input]', gallery);
  var addUrlBtn = qs('[data-gallery-add-url]', gallery);
  var clearBtn = qs('[data-gallery-clear]', gallery);

  var storageKey = 'portoflow_gallery_v1';

  function loadFromStorage() {
    try {
      var raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveToStorage(items) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (e) {
      showToast('Stockage local indisponible.', 'error');
    }
  }

  function renderGallery(items) {
    if (!grid) return;
    grid.innerHTML = '';

    if (items.length === 0) {
      var empty = document.createElement('p');
      empty.className = 'gallery-empty';
      empty.textContent = 'Aucune photo locale. Ajoutez des images ci-dessus.';
      grid.appendChild(empty);
      return;
    }

    items.forEach(function (src, index) {
      var item = document.createElement('div');
      item.className = 'gallery-item';

      var img = document.createElement('img');
      img.src = src;
      img.alt = 'Photo locale Porto-Vecchio ' + (index + 1);
      img.loading = 'lazy';
      img.onerror = function () {
        item.classList.add('gallery-item--error');
        img.alt = 'Image non disponible';
      };

      var removeBtn = document.createElement('button');
      removeBtn.className = 'gallery-item-remove';
      removeBtn.setAttribute('aria-label', 'Supprimer cette photo');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', function () {
        var current = loadFromStorage();
        current.splice(index, 1);
        saveToStorage(current);
        renderGallery(current);
      });

      item.appendChild(img);
      item.appendChild(removeBtn);
      grid.appendChild(item);
    });
  }

  function addImageSrc(src) {
    if (!src || typeof src !== 'string') return;
    var current = loadFromStorage();
    if (current.indexOf(src) === -1) {
      current.push(src);
      saveToStorage(current);
      renderGallery(current);
      showToast('Photo ajoutée à la galerie.', 'success');
    } else {
      showToast('Cette image est déjà dans la galerie.', 'info');
    }
  }

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var files = Array.from(fileInput.files || []);
      files.forEach(function (file) {
        if (!file.type.startsWith('image/')) return;
        var reader = new FileReader();
        reader.onload = function (e) {
          addImageSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      fileInput.value = '';
    });
  }

  if (addUrlBtn && urlInput) {
    addUrlBtn.addEventListener('click', function () {
      var url = urlInput.value.trim();
      if (!url) return;
      addImageSrc(url);
      urlInput.value = '';
    });

    urlInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addUrlBtn.click();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      saveToStorage([]);
      renderGallery([]);
      showToast('Galerie vidée.', 'info');
    });
  }

  renderGallery(loadFromStorage());
}

/* ============================================================
   25. IMAGE SLOTS — FALLBACK GRACIEUX
   Applique un gradient CSS si l'image ne charge pas
   ============================================================ */

function initImageSlots() {
  var slots = qsa('[data-image-slot]');

  slots.forEach(function (slot) {
    var img = slot.tagName === 'IMG' ? slot : qs('img', slot);
    if (!img) return;

    img.addEventListener('error', function () {
      slot.classList.add('image-slot--fallback');
      img.style.display = 'none';
    });

    if (img.complete && img.naturalWidth === 0) {
      slot.classList.add('image-slot--fallback');
      img.style.display = 'none';
    }
  });
}

/* ============================================================
   26. FOCUS TRAP — MENU MOBILE ACCESSIBLE
   ============================================================ */

function initFocusTrap() {
  var navMenu = qs('.nav-menu');
  var burger = qs('.nav-burger');
  if (!navMenu || !burger) return;

  document.addEventListener('keydown', function (e) {
    if (!navMenu.classList.contains('is-open')) return;
    if (e.key !== 'Tab') return;

    var focusable = qsa(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      navMenu
    );

    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

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

/* ============================================================
   27. MICRO-INTERACTIONS — BOUTONS ET LIENS
   ============================================================ */

function initMicroInteractions() {
  qsa('.btn, .cta-btn, [data-ripple]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var ripple = document.createElement('span');
      ripple.className = 'ripple-effect';

      var rect = el.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + x + 'px',
        'top:' + y + 'px'
      ].join(';');

      el.style.position = el.style.position || 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(ripple);

      setTimeout(function () {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 600);
    });
  });
}

/* ============================================================
   28. SKIP LINK — ACCESSIBILITÉ
   ============================================================ */

function initSkipLink() {
  var skip = qs('.skip-link');
  if (!skip) return;

  skip.addEventListener('click', function (e) {
    var targetId = skip.getAttribute('href');
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
   29. RESPONSIVE NAV — RESIZE HANDLER
   ============================================================ */

function initResponsiveNav() {
  var navMenu = qs('.nav-menu');
  var burger = qs('.nav-burger');
  if (!navMenu || !burger) return;

  var resizeTimer;

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth >= 1024) {
        navMenu.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        var overlay = qs('.nav-overlay');
        if (overlay) overlay.classList.remove('is-visible');
      }
    }, 150);
  });
}

/* ============================================================
   30. INIT GLOBAL
   ============================================================ */

ready(function () {
  initSkipLink();
  initMobileMenu();
  initFocusTrap();
  initResponsiveNav();
  initActiveNav();
  initStickyHeader();
  initScrollAnimations();
  initBackToTop();
  initCounters();
  initSmoothScroll();
  initTabs();
  initAccordion();
  initParallax();
  initReadingProgress();
  initForms();
  initDashboardStats();
  initTrafficSimulation();
  initHeroParticles();
  initSeasonToggle();
  initAppModules();
  initPartnerCards();
  initTechLoop();
  initAIAssistant();
  initMapSimulation();
  initPhotoGallery();
  initImageSlots();
  initMicroInteractions();
});