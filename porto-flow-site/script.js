/* ============================================================
   Porto Flow — script.js
   Vanilla JS — No dependencies — GitHub Pages compatible
   Version V3.1 — Enrichissement local + Galerie photo
   ============================================================ */

/* ============================================================
   CONSTANTE WEBHOOK FUTUR (non utilisée tant que vide)
   ============================================================ */
var PHOTO_UPLOAD_WEBHOOK_URL = '';
/* Pour activer un futur upload serveur, renseigner l'URL ci-dessus.
   Le code vérifie si cette constante est non vide avant tout appel. */

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
   2. MENU MOBILE — BURGER TOGGLE ROBUSTE
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

  if (currentFile === '') currentFile = 'index.html';

  var navLinks = qsa('.nav-menu a, .nav-link');

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
      (linkFile === 'index.html' || linkFile === '')
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
   24. GALERIE PHOTO LOCALE — PORTO FLOW
   Prévisualisation locale, localStorage, ajout par fichier ou URL
   ============================================================ */

/* Taille max recommandée pour localStorage : 800 Ko en base64 */
var GALLERY_MAX_FILE_SIZE_BYTES = 800 * 1024;
var GALLERY_STORAGE_KEY = 'portoflow_local_gallery_v1';

/* Catégories disponibles */
var GALLERY_CATEGORIES = [
  'Littoral',
  'Port',
  'Plage',
  'Mobilité',
  'Économie locale',
  'Technologie',
  'Événement'
];

/* État en mémoire de la galerie */
var galleryItems = [];

/* Vérifie si localStorage est disponible */
function isLocalStorageAvailable() {
  try {
    var test = '__pf_ls_test__';
    localStorage.setItem(test, '1');
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/* Sauvegarde la galerie dans localStorage */
function saveGalleryToStorage() {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(galleryItems));
  } catch (e) {
    /* localStorage plein ou indisponible — on continue sans planter */
    showToast('Espace de stockage local insuffisant. Certaines photos ne seront pas conservées.', 'warning');
  }
}

/* Charge la galerie depuis localStorage */
function loadGalleryFromStorage() {
  if (!isLocalStorageAvailable()) return [];
  try {
    var raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) return [];
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    return [];
  }
}

/* Génère un identifiant unique simple */
function generateId() {
  return 'pf_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
}

/* Crée une carte photo dans la galerie DOM */
function createGalleryCard(item) {
  var card = document.createElement('div');
  card.className = 'local-gallery-card';
  card.setAttribute('data-gallery-id', item.id);

  var imgWrap = document.createElement('div');
  imgWrap.className = 'local-gallery-img-wrap';

  var img = document.createElement('img');
  img.src = item.src;
  img.alt = item.title || 'Photo locale Porto Flow';
  img.loading = 'lazy';
  img.className = 'local-gallery-img';

  img.onerror = function () {
    imgWrap.classList.add('local-gallery-img-error');
    img.style.display = 'none';
    var errMsg = document.createElement('span');
    errMsg.className = 'local-gallery-img-error-msg';
    errMsg.textContent = 'Image non disponible';
    imgWrap.appendChild(errMsg);
  };

  imgWrap.appendChild(img);

  var info = document.createElement('div');
  info.className = 'local-gallery-info';

  if (item.title) {
    var titleEl = document.createElement('p');
    titleEl.className = 'local-gallery-title';
    titleEl.textContent = item.title;
    info.appendChild(titleEl);
  }

  if (item.category) {
    var catEl = document.createElement('span');
    catEl.className = 'local-gallery-category';
    catEl.textContent = item.category;
    info.appendChild(catEl);
  }

  var removeBtn = document.createElement('button');
  removeBtn.className = 'local-gallery-remove';
  removeBtn.setAttribute('aria-label', 'Supprimer cette photo');
  removeBtn.setAttribute('type', 'button');
  removeBtn.textContent = '✕';
  removeBtn.addEventListener('click', function () {
    removeGalleryItem(item.id, card);
  });

  card.appendChild(imgWrap);
  card.appendChild(info);
  card.appendChild(removeBtn);

  return card;
}

/* Supprime un item de la galerie */
function removeGalleryItem(id, cardEl) {
  galleryItems = galleryItems.filter(function (item) {
    return item.id !== id;
  });
  saveGalleryToStorage();
  if (cardEl && cardEl.parentNode) {
    cardEl.classList.add('local-gallery-card--removing');
    setTimeout(function () {
      if (cardEl.parentNode) cardEl.parentNode.removeChild(cardEl);
      updateGalleryEmptyState();
    }, 300);
  }
}

/* Met à jour l'état vide de la galerie */
function updateGalleryEmptyState() {
  var grid = qs('.local-gallery-grid');
  var empty = qs('.local-gallery-empty');
  if (!grid || !empty) return;

  var cards = qsa('.local-gallery-card', grid);
  if (cards.length === 0) {
    empty.style.display = 'block';
  } else {
    empty.style.display = 'none';
  }
}

/* Ajoute un item à la galerie */
function addGalleryItem(src, title, category) {
  var item = {
    id: generateId(),
    src: src,
    title: title || '',
    category: category || '',
    addedAt: new Date().toISOString()
  };

  galleryItems.push(item);
  saveGalleryToStorage();

  var grid = qs('.local-gallery-grid');
  if (grid) {
    var card = createGalleryCard(item);
    grid.appendChild(card);

    /* Animation d'entrée */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add('local-gallery-card--visible');
      });
    });
  }

  updateGalleryEmptyState();
  showToast('Photo ajoutée à la galerie locale.', 'success');
}

/* Initialise la galerie locale */
function initLocalGallery() {
  var gallerySection = qs('.local-gallery-section');
  if (!gallerySection) return;

  var grid = qs('.local-gallery-grid', gallerySection);
  var fileInput = qs('.local-gallery-file-input', gallerySection);
  var urlInput = qs('.local-gallery-url-input', gallerySection);
  var titleInput = qs('.local-gallery-title-input', gallerySection);
  var categorySelect = qs('.local-gallery-category-select', gallerySection);
  var addFileBtn = qs('.local-gallery-add-file-btn', gallerySection);
  var addUrlBtn = qs('.local-gallery-add-url-btn', gallerySection);
  var resetBtn = qs('.local-gallery-reset-btn', gallerySection);
  var fileLabel = qs('.local-gallery-file-label', gallerySection);

  if (!grid) return;

  /* Peupler le select des catégories si vide */
  if (categorySelect && categorySelect.options.length <= 1) {
    GALLERY_CATEGORIES.forEach(function (cat) {
      var opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  /* Charger depuis localStorage */
  galleryItems = loadGalleryFromStorage();

  if (galleryItems.length > 0) {
    galleryItems.forEach(function (item) {
      var card = createGalleryCard(item);
      grid.appendChild(card);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          card.classList.add('local-gallery-card--visible');
        });
      });
    });
  }

  updateGalleryEmptyState();

  /* Gestion du bouton déclencheur de l'input file */
  if (addFileBtn && fileInput) {
    addFileBtn.addEventListener('click', function () {
      fileInput.click();
    });
  }

  /* Lecture du fichier sélectionné */
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('Veuillez sélectionner un fichier image (JPG, PNG, WebP…)', 'error');
        fileInput.value = '';
        return;
      }

      if (file.size > GALLERY_MAX_FILE_SIZE_BYTES) {
        showToast(
          'Cette image est trop lourde (' + Math.round(file.size / 1024) + ' Ko). ' +
          'Pour un stockage local optimal, utilisez une image de moins de 800 Ko.',
          'warning',
          5000
        );
        /* On continue quand même pour l'aperçu en mémoire, mais on avertit */
      }

      var title = titleInput ? titleInput.value.trim() : '';
      var category = categorySelect ? categorySelect.value : '';

      var reader = new FileReader();
      reader.onload = function (e) {
        var src = e.target.result;
        addGalleryItem(src, title, category);
        fileInput.value = '';
        if (titleInput) titleInput.value = '';
        if (categorySelect) categorySelect.selectedIndex = 0;
        if (fileLabel) fileLabel.textContent = 'Aucun fichier sélectionné';
      };
      reader.onerror = function () {
        showToast('Erreur lors de la lecture du fichier.', 'error');
        fileInput.value = '';
      };
      reader.readAsDataURL(file);
    });

    /* Mise à jour du label fichier */
    if (fileLabel) {
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        fileLabel.textContent = file ? file.name : 'Aucun fichier sélectionné';
      });
    }
  }

  /* Ajout par URL externe */
  if (addUrlBtn && urlInput) {
    addUrlBtn.addEventListener('click', function () {
      var url = urlInput.value.trim();
      if (!url) {
        showToast('Veuillez saisir une URL d\'image valide.', 'error');
        return;
      }

      /* Validation basique d'URL */
      var isValidUrl = false;
      try {
        var parsed = new URL(url);
        isValidUrl = parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch (e) {
        isValidUrl = false;
      }

      if (!isValidUrl) {
        showToast('L\'URL saisie ne semble pas valide. Elle doit commencer par http:// ou https://', 'error');
        return;
      }

      var title = titleInput ? titleInput.value.trim() : '';
      var category = categorySelect ? categorySelect.value : '';

      addGalleryItem(url, title, category);
      urlInput.value = '';
      if (titleInput) titleInput.value = '';
      if (categorySelect) categorySelect.selectedIndex = 0;
    });

    /* Ajout par URL avec touche Entrée */
    urlInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addUrlBtn.click();
      }
    });
  }

  /* Réinitialisation de la galerie */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (!confirm('Réinitialiser la galerie locale ? Toutes les photos ajoutées seront supprimées de votre navigateur.')) {
        return;
      }
      galleryItems = [];
      if (isLocalStorageAvailable()) {
        try {
          localStorage.removeItem(GALLERY_STORAGE_KEY);
        } catch (e) {
          /* silencieux */
        }
      }
      var cards = qsa('.local-gallery-card', grid);
      cards.forEach(function (card) {
        if (card.parentNode) card.parentNode.removeChild(card);
      });
      updateGalleryEmptyState();
      showToast('Galerie locale réinitialisée.', 'info');
    });
  }

  /* Filtrage par catégorie */
  var filterBtns = qsa('.local-gallery-filter-btn', gallerySection);
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filterCat = btn.getAttribute('data-filter-cat') || 'all';

      filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var cards = qsa('.local-gallery-card', grid);
      cards.forEach(function (card) {
        var id = card.getAttribute('data-gallery-id');
        var item = galleryItems.find(function (i) { return i.id === id; });
        if (!item) {
          card.style.display = '';
          return;
        }
        if (filterCat === 'all' || item.category === filterCat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   25. IMAGES HERO — FALLBACK GRACIEUX
   Gère les images de fond qui pourraient ne pas charger
   ============================================================ */

function initHeroImageFallbacks() {
  var heroImgs = qsa('.hero-bg-img');
  heroImgs.forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var parent = img.closest('.hero-bg-wrap') || img.parentElement;
      if (parent) {
        parent.classList.add('hero-bg--fallback');
      }
    });
  });

  /* Gestion des background-image inline avec data-bg */
  var bgEls = qsa('[data-bg]');
  bgEls.forEach(function (el) {
    var url = el.getAttribute('data-bg');
    if (!url) return;

    var testImg = new Image();
    testImg.onload = function () {
      el.style.backgroundImage = 'url("' + url + '")';
      el.classList.add('bg-loaded');
    };
    testImg.onerror = function () {
      el.classList.add('bg-fallback');
      /* Le gradient CSS de fallback prend le relais */
    };
    testImg.src = url;
  });
}

/* ============================================================
   26. PHOTO CARDS TERRITOIRE — HOVER OVERLAY
   ============================================================ */

function initPhotoCards() {
  var photoCards = qsa('.photo-card');

  photoCards.forEach(function (card) {
    var overlay = qs('.photo-card-overlay', card);
    if (!overlay) return;

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
   27. LIGHTBOX SIMPLE POUR GALERIE LOCALE
   ============================================================ */

function initGalleryLightbox() {
  var lightbox = qs('.gallery-lightbox');
  if (!lightbox) {
    /* Créer le lightbox dynamiquement */
    lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Aperçu photo');
    lightbox.setAttribute('hidden', '');

    var lbInner = document.createElement('div');
    lbInner.className = 'gallery-lightbox-inner';

    var lbImg = document.createElement('img');
    lbImg.className = 'gallery-lightbox-img';
    lbImg.alt = 'Aperçu agrandi';

    var lbCaption = document.createElement('p');
    lbCaption.className = 'gallery-lightbox-caption';

    var lbClose = document.createElement('button');
    lbClose.className = 'gallery-lightbox-close';
    lbClose.setAttribute('type', 'button');
    lbClose.setAttribute('aria-label', 'Fermer l\'aperçu');
    lbClose.textContent = '✕';

    lbInner.appendChild(lbClose);
    lbInner.appendChild(lbImg);
    lbInner.appendChild(lbCaption);
    lightbox.appendChild(lbInner);
    document.body.appendChild(lightbox);

    function closeLightbox() {
      lightbox.setAttribute('hidden', '');
      lightbox.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /* Délégation d'événements sur les images de galerie */
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.local-gallery-img');
    if (!img) return;

    var card = img.closest('.local-gallery-card');
    var id = card ? card.getAttribute('data-gallery-id') : null;
    var item = id ? galleryItems.find(function (i) { return i.id === id; }) : null;

    var lbImg = qs('.gallery-lightbox-img', lightbox);
    var lbCaption = qs('.gallery-lightbox-caption', lightbox);

    if (lbImg) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Aperçu photo';
    }
    if (lbCaption && item) {
      lbCaption.textContent = [item.title, item.category].filter(Boolean).join(' — ');
    } else if (lbCaption) {
      lbCaption.textContent = '';
    }

    lightbox.removeAttribute('hidden');
    lightbox.classList.add('is-open');
    document.body.classList.add('lightbox-open');

    var closeBtn = qs('.gallery-lightbox-close', lightbox);
    if (closeBtn) closeBtn.focus();
  });
}

/* ============================================================
   28. INITIALISATION GLOBALE
   ============================================================ */

ready(function () {
  initMobileMenu();
  initActiveNav();
  initStickyHeader();
  initScrollAnimations();
  initBackToTop();
  initCounters();
  initAIAssistant();
  initMapSimulation();
  initSmoothScroll();
  initTabs();
  initAccordion();
  initParallax();
  initForms();
  initReadingProgress();
  initDashboardStats();
  initTrafficSimulation();
  initHeroParticles();
  initSeasonToggle();
  initAppModules();
  initPartnerCards();
  initTechLoop();
  initLocalGallery();
  initHeroImageFallbacks();
  initPhotoCards();
  initGalleryLightbox();
});