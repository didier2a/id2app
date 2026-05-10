'use strict';

// ============================================================
// PORTO FLOW — Landing Page Script
// Vanilla JS — No external dependencies
// ============================================================

(function () {

  // ----------------------------------------------------------
  // UTILITY HELPERS
  // ----------------------------------------------------------

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

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

  function getScrollY() {
    return window.scrollY || window.pageYOffset;
  }

  // ----------------------------------------------------------
  // DOM READY
  // ----------------------------------------------------------

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  // ----------------------------------------------------------
  // MOBILE MENU
  // ----------------------------------------------------------

  function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu   = document.querySelector('[data-nav-menu]');
    const overlay = document.querySelector('[data-menu-overlay]');
    const navLinks = document.querySelectorAll('[data-nav-menu] a');

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      if (overlay) overlay.classList.add('is-visible');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      if (overlay) overlay.classList.remove('is-visible');
    }

    function toggleMenu() {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    }

    toggle.addEventListener('click', toggleMenu);

    // Close when a nav link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on overlay click
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on resize to desktop breakpoint
    window.addEventListener('resize', debounce(function () {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    }, 200));
  }

  // ----------------------------------------------------------
  // SMOOTH SCROLL
  // ----------------------------------------------------------

  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const header = document.querySelector('[data-header]');
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + getScrollY() - headerHeight - 8;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        // Update URL without jump
        history.pushState(null, '', href);

        // Focus management for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', function () {
          target.removeAttribute('tabindex');
        }, { once: true });
      });
    });
  }

  // ----------------------------------------------------------
  // STICKY HEADER
  // ----------------------------------------------------------

  function initStickyHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const SCROLL_THRESHOLD = 60;
    const SCROLL_UP_CLASS   = 'header--scrolled';
    const HIDDEN_CLASS      = 'header--hidden';

    let lastScrollY = getScrollY();
    let ticking = false;

    function updateHeader() {
      const currentScrollY = getScrollY();

      if (currentScrollY > SCROLL_THRESHOLD) {
        header.classList.add(SCROLL_UP_CLASS);
      } else {
        header.classList.remove(SCROLL_UP_CLASS);
        header.classList.remove(HIDDEN_CLASS);
      }

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD + 100) {
        header.classList.add(HIDDEN_CLASS);
      } else if (currentScrollY < lastScrollY) {
        header.classList.remove(HIDDEN_CLASS);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ----------------------------------------------------------
  // SCROLL ANIMATIONS (Intersection Observer)
  // ----------------------------------------------------------

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      animatedElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-animate-delay') || '0';

          setTimeout(function () {
            el.classList.add('is-visible');
          }, parseInt(delay, 10));

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ----------------------------------------------------------
  // STAGGERED CHILDREN ANIMATION
  // ----------------------------------------------------------

  function initStaggerAnimations() {
    const staggerGroups = document.querySelectorAll('[data-stagger]');
    if (!staggerGroups.length) return;

    if (!('IntersectionObserver' in window)) {
      staggerGroups.forEach(function (group) {
        Array.from(group.children).forEach(function (child) {
          child.classList.add('is-visible');
        });
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const children = Array.from(entry.target.children);
          const baseDelay = parseInt(entry.target.getAttribute('data-stagger-delay') || '100', 10);

          children.forEach(function (child, index) {
            setTimeout(function () {
              child.classList.add('is-visible');
            }, index * baseDelay);
          });

          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05
    });

    staggerGroups.forEach(function (group) {
      observer.observe(group);
    });
  }

  // ----------------------------------------------------------
  // ACTIVE NAV LINK ON SCROLL
  // ----------------------------------------------------------

  function initActiveNavLinks() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('[data-nav-menu] a[href^="#"], [data-nav-desktop] a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const header = document.querySelector('[data-header]');

    function setActiveLink() {
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const scrollPos = getScrollY() + headerHeight + 20;

      let currentSection = null;

      sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(function (link) {
        link.classList.remove('is-active');
        const href = link.getAttribute('href');
        if (href === '#' + currentSection) {
          link.classList.add('is-active');
        }
      });
    }

    window.addEventListener('scroll', throttle(setActiveLink, 100), { passive: true });
    setActiveLink();
  }

  // ----------------------------------------------------------
  // PARALLAX EFFECT (light, performance-conscious)
  // ----------------------------------------------------------

  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    // Disable on mobile for performance
    if (window.innerWidth < 768) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    let ticking = false;

    function applyParallax() {
      const scrollY = getScrollY();

      parallaxElements.forEach(function (el) {
        const speed  = parseFloat(el.getAttribute('data-parallax') || '0.3');
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        const offset = center * speed;

        el.style.transform = 'translateY(' + offset.toFixed(2) + 'px)';
      });

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ----------------------------------------------------------
  // COUNTER ANIMATION
  // ----------------------------------------------------------

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    if (!('IntersectionObserver' in window)) return;

    function animateCounter(el) {
      const target   = parseFloat(el.getAttribute('data-counter'));
      const duration = parseInt(el.getAttribute('data-counter-duration') || '1800', 10);
      const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
      const prefix   = el.getAttribute('data-counter-prefix') || '';
      const suffix   = el.getAttribute('data-counter-suffix') || '';
      const start    = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function step(timestamp) {
        const elapsed  = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeOutCubic(progress);
        const current  = eased * target;

        el.textContent = prefix + current.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  // ----------------------------------------------------------
  // ACCORDION / FAQ
  // ----------------------------------------------------------

  function initAccordion() {
    const accordions = document.querySelectorAll('[data-accordion]');
    if (!accordions.length) return;

    accordions.forEach(function (accordion) {
      const items = accordion.querySelectorAll('[data-accordion-item]');

      items.forEach(function (item) {
        const trigger = item.querySelector('[data-accordion-trigger]');
        const content = item.querySelector('[data-accordion-content]');

        if (!trigger || !content) return;

        // Set initial aria attributes
        const isOpen = item.classList.contains('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        content.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

        if (!isOpen) {
          content.style.maxHeight = '0';
          content.style.overflow  = 'hidden';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }

        trigger.addEventListener('click', function () {
          const isCurrentlyOpen = item.classList.contains('is-open');

          // Close all others in the same accordion (if not multi-open)
          if (!accordion.hasAttribute('data-accordion-multi')) {
            items.forEach(function (otherItem) {
              if (otherItem !== item && otherItem.classList.contains('is-open')) {
                closeItem(otherItem);
              }
            });
          }

          if (isCurrentlyOpen) {
            closeItem(item);
          } else {
            openItem(item);
          }
        });

        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
          }
        });
      });
    });

    function openItem(item) {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]');

      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    function closeItem(item) {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]');

      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0';
    }
  }

  // ----------------------------------------------------------
  // TABS
  // ----------------------------------------------------------

  function initTabs() {
    const tabGroups = document.querySelectorAll('[data-tabs]');
    if (!tabGroups.length) return;

    tabGroups.forEach(function (group) {
      const tabButtons = group.querySelectorAll('[data-tab-button]');
      const tabPanels  = group.querySelectorAll('[data-tab-panel]');

      function activateTab(targetId) {
        tabButtons.forEach(function (btn) {
          const isActive = btn.getAttribute('data-tab-button') === targetId;
          btn.classList.toggle('is-active', isActive);
          btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
          btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        tabPanels.forEach(function (panel) {
          const isActive = panel.getAttribute('data-tab-panel') === targetId;
          panel.classList.toggle('is-active', isActive);
          panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
      }

      tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          activateTab(btn.getAttribute('data-tab-button'));
        });

        btn.addEventListener('keydown', function (e) {
          const allBtns = Array.from(tabButtons);
          const idx = allBtns.indexOf(btn);

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = allBtns[(idx + 1) % allBtns.length];
            next.click();
            next.focus();
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = allBtns[(idx - 1 + allBtns.length) % allBtns.length];
            prev.click();
            prev.focus();
          }
        });
      });

      // Activate the first tab if none is already active
      const firstActive = group.querySelector('[data-tab-button].is-active');
      if (!firstActive && tabButtons.length > 0) {
        activateTab(tabButtons[0].getAttribute('data-tab-button'));
      }
    });
  }

  // ----------------------------------------------------------
  // SCROLL PROGRESS BAR
  // ----------------------------------------------------------

  function initScrollProgress() {
    const progressBar = document.querySelector('[data-scroll-progress]');
    if (!progressBar) return;

    function updateProgress() {
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled     = getScrollY();
      const progress     = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100).toFixed(2) + '%';
    }

    window.addEventListener('scroll', throttle(updateProgress, 16), { passive: true });
    updateProgress();
  }

  // ----------------------------------------------------------
  // BACK TO TOP BUTTON
  // ----------------------------------------------------------

  function initBackToTop() {
    const btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;

    const SHOW_THRESHOLD = 400;

    function updateVisibility() {
      if (getScrollY() > SHOW_THRESHOLD) {
        btn.classList.add('is-visible');
        btn.setAttribute('aria-hidden', 'false');
      } else {
        btn.classList.remove('is-visible');
        btn.setAttribute('aria-hidden', 'true');
      }
    }

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', throttle(updateVisibility, 100), { passive: true });
    updateVisibility();
  }

  // ----------------------------------------------------------
  // TOOLTIP INTERACTIONS
  // ----------------------------------------------------------

  function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    if (!tooltipTriggers.length) return;

    tooltipTriggers.forEach(function (el) {
      const tooltipText = el.getAttribute('data-tooltip');
      if (!tooltipText) return;

      let tooltip = null;

      function createTooltip() {
        tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.setAttribute('role', 'tooltip');
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        const ttRect = tooltip.getBoundingClientRect();
        const scrollY = getScrollY();

        let top  = rect.top + scrollY - ttRect.height - 8;
        let left = rect.left + (rect.width / 2) - (ttRect.width / 2);

        // Clamp within viewport
        left = Math.max(8, Math.min(left, window.innerWidth - ttRect.width - 8));

        tooltip.style.top  = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.classList.add('tooltip--visible');
      }

      function removeTooltip() {
        if (tooltip) {
          tooltip.remove();
          tooltip = null;
        }
      }

      el.addEventListener('mouseenter', createTooltip);
      el.addEventListener('mouseleave', removeTooltip);
      el.addEventListener('focus', createTooltip);
      el.addEventListener('blur', removeTooltip);
    });
  }

  // ----------------------------------------------------------
  // IMAGE LAZY LOADING (native fallback)
  // ----------------------------------------------------------

  function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');

            const srcset = img.getAttribute('data-srcset');
            if (srcset) img.srcset = srcset;

            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
            img.classList.add('is-loaded');
            imgObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px 0px'
      });

      lazyImages.forEach(function (img) {
        imgObserver.observe(img);
      });
    } else {
      // Fallback: load all immediately
      lazyImages.forEach(function (img) {
        img.src = img.getAttribute('data-src') || '';
        img.removeAttribute('data-src');
      });
    }
  }

  // ----------------------------------------------------------
  // FORM INTERACTIONS
  // ----------------------------------------------------------

  function initForms() {
    const forms = document.querySelectorAll('[data-form]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      const inputs = form.querySelectorAll('input, textarea, select');

      // Floating label effect
      inputs.forEach(function (input) {
        function checkValue() {
          if (input.value.trim() !== '') {
            input.classList.add('has-value');
          } else {
            input.classList.remove('has-value');
          }
        }

        input.addEventListener('input', checkValue);
        input.addEventListener('change', checkValue);
        checkValue();
      });

      // Basic client-side validation feedback
      form.addEventListener('submit', function (e) {
        let valid = true;

        inputs.forEach(function (input) {
          if (input.hasAttribute('required') && input.value.trim() === '') {
            input.classList.add('has-error');
            valid = false;
          } else if (input.type === 'email' && input.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
              input.classList.add('has-error');
              valid = false;
            } else {
              input.classList.remove('has-error');
            }
          } else {
            input.classList.remove('has-error');
          }
        });

        if (!valid) {
          e.preventDefault();
          const firstError = form.querySelector('.has-error');
          if (firstError) firstError.focus();
        }
      });

      // Remove error state on input
      inputs.forEach(function (input) {
        input.addEventListener('input', function () {
          input.classList.remove('has-error');
        });
      });
    });
  }

  // ----------------------------------------------------------
  // CURSOR GLOW EFFECT (decorative, desktop only)
  // ----------------------------------------------------------

  function initCursorGlow() {
    const glow = document.querySelector('[data-cursor-glow]');
    if (!glow) return;

    // Only on non-touch, non-reduced-motion
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX  = 0;
    let glowY  = 0;
    let running = false;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!running) {
        running = true;
        requestAnimationFrame(animateGlow);
      }
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      glow.style.transform = 'translate(' + glowX.toFixed(1) + 'px, ' + glowY.toFixed(1) + 'px) translate(-50%, -50%)';

      if (Math.abs(mouseX - glowX) > 0.5 || Math.abs(mouseY - glowY) > 0.5) {
        requestAnimationFrame(animateGlow);
      } else {
        running = false;
      }
    }
  }

  // ----------------------------------------------------------
  // TESTIMONIAL / SLIDER (simple auto-play)
  // ----------------------------------------------------------

  function initSliders() {
    const sliders = document.querySelectorAll('[data-slider]');
    if (!sliders.length) return;

    sliders.forEach(function (slider) {
      const track    = slider.querySelector('[data-slider-track]');
      const slides   = slider.querySelectorAll('[data-slider-slide]');
      const prevBtn  = slider.querySelector('[data-slider-prev]');
      const nextBtn  = slider.querySelector('[data-slider-next]');
      const dotsContainer = slider.querySelector('[data-slider-dots]');

      if (!track || slides.length === 0) return;

      let currentIndex = 0;
      let autoPlayInterval = null;
      const autoPlay = slider.hasAttribute('data-slider-autoplay');
      const autoPlayDelay = parseInt(slider.getAttribute('data-slider-autoplay') || '4000', 10);

      // Create dots
      if (dotsContainer) {
        slides.forEach(function (_, i) {
          const dot = document.createElement('button');
          dot.className = 'slider__dot';
          dot.setAttribute('type', 'button');
          dot.setAttribute('aria-label', 'Diapositive ' + (i + 1));
          dot.addEventListener('click', function () {
            goTo(i);
          });
          dotsContainer.appendChild(dot);
        });
      }

      function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.slider__dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === currentIndex);
        });
      }

      function goTo(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        slides.forEach(function (slide, i) {
          slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
        });
        updateDots();
      }

      function goNext() { goTo(currentIndex + 1); }
      function goPrev() { goTo(currentIndex - 1); }

      if (prevBtn) prevBtn.addEventListener('click', function () { goPrev(); resetAutoPlay(); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goNext(); resetAutoPlay(); });

      // Keyboard navigation
      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft')  { goPrev(); resetAutoPlay(); }
        if (e.key === 'ArrowRight') { goNext(); resetAutoPlay(); }
      });

      // Touch / swipe support
      let touchStartX = 0;
      let touchEndX   = 0;

      track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const delta = touchStartX - touchEndX;
        if (Math.abs(delta) > 40) {
          delta > 0 ? goNext() : goPrev();
          resetAutoPlay();
        }
      }, { passive: true });

      function startAutoPlay() {
        if (!autoPlay) return;
        autoPlayInterval = setInterval(goNext, autoPlayDelay);
      }

      function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
      }

      // Pause on hover
      slider.addEventListener('mouseenter', function () { clearInterval(autoPlayInterval); });
      slider.addEventListener('mouseleave', startAutoPlay);

      // Init
      goTo(0);
      startAutoPlay();
    });
  }

  // ----------------------------------------------------------
  // VIDEO BACKGROUND CONTROLS
  // ----------------------------------------------------------

  function initVideoBackgrounds() {
    const videos = document.querySelectorAll('[data-bg-video]');
    if (!videos.length) return;

    videos.forEach(function (video) {
      // Ensure the video is muted and plays inline
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Autoplay blocked — show poster
          video.load();
        });
      }

      // Pause/resume based on visibility for performance
      if ('IntersectionObserver' in window) {
        const visibilityObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              video.play().catch(function () {});
            } else {
              video.pause();
            }
          });
        }, { threshold: 0.1 });

        visibilityObserver.observe(video);
      }

      // Respect reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  // ----------------------------------------------------------
  // COPY TO CLIPBOARD
  // ----------------------------------------------------------

  function initCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    if (!copyButtons.length) return;

    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const targetSelector = btn.getAttribute('data-copy');
        const target = document.querySelector(targetSelector);
        const text = target ? target.textContent : btn.getAttribute('data-copy-text') || '';

        if (!text) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopiedFeedback(btn);
          }).catch(function () {
            fallbackCopy(text, btn);
          });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });

    function fallbackCopy(text, btn) {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand('copy');
        showCopiedFeedback(btn);
      } catch (e) {
        // silent fail
      }
      document.body.removeChild(el);
    }

    function showCopiedFeedback(btn) {
      const originalText = btn.textContent;
      btn.textContent = btn.getAttribute('data-copy-success') || 'Copié !';
      btn.classList.add('is-copied');
      setTimeout(function () {
        btn.textContent = originalText;
        btn.classList.remove('is-copied');
      }, 2000);
    }
  }

  // ----------------------------------------------------------
  // REDUCED MOTION RESPECT
  // ----------------------------------------------------------

  function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function applyReducedMotion(mediaQuery) {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('reduced-motion');
      } else {
        document.documentElement.classList.remove('reduced-motion');
      }
    }

    applyReducedMotion(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', applyReducedMotion);
  }

  // ----------------------------------------------------------
  // SECTION HIGHLIGHT / ACTIVE STATE
  // ----------------------------------------------------------

  function initSectionHighlight() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section--in-view');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -30% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ----------------------------------------------------------
  // INITIALISE ALL MODULES
  // ----------------------------------------------------------

  onReady(function () {
    respectReducedMotion();
    initMobileMenu();
    initSmoothScroll();
    initStickyHeader();
    initScrollAnimations();
    initStaggerAnimations();
    initActiveNavLinks();
    initParallax();
    initCounters();
    initAccordion();
    initTabs();
    initScrollProgress();
    initBackToTop();
    initTooltips();
    initLazyImages();
    initForms();
    initCursorGlow();
    initSliders();
    initVideoBackgrounds();
    initCopyButtons();
    initSectionHighlight();
  });

})();