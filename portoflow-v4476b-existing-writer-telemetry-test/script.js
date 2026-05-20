document.addEventListener('DOMContentLoaded',()=>{const year=document.querySelector('[data-current-year]');if(year)year.textContent=String(new Date().getFullYear());const toggle=document.querySelector('[data-pf-nav-toggle]');const panel=document.querySelector('[data-pf-nav-panel]');if(toggle&&panel){toggle.addEventListener('click',()=>{const open=document.body.classList.toggle('pf-mobile-open');toggle.setAttribute('aria-expanded',String(open));});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('pf-mobile-open');toggle.setAttribute('aria-expanded','false');}));}document.querySelectorAll('.pf-card,.pf-bento,.pf-dashboard__card').forEach(el=>{el.addEventListener('mouseenter',()=>el.style.transform='translateY(-3px)');el.addEventListener('mouseleave',()=>el.style.transform='');});});
/* ID2App Generic UX Pattern Engine V4.4.7.6E.3.4B */
(() => {
  const cfg = {"navLinkSelector":".pf-nav__link[href]","activeClass":"pf-nav__link--active","headerSelector":".pf-header","sectionNavAttr":"data-ux-section-nav","viewportAnchorRatio":0.35,"explainerPanelClass":"ux-explainer-panel","explainerOpenClass":"ux-explainer-open","mediaFrameClass":"ux-media-frame","mediaPlaceholderClass":"ux-media-placeholder","mediaCaptionClass":"ux-media-caption","mediaTranscriptClass":"ux-media-transcript","clickReadyClass":"ux-click-ready","clickBadgeLabel":"Cliquer pour comprendre","clickFallbackTitle":"En savoir plus","clickFallbackBody":"Ce bloc précise le rôle de cette information dans le parcours utilisateur."};
  const normalizeHref = (value) => {
    let path = String(value || '');
    const hashIndex = path.indexOf('#');
    if (hashIndex !== -1) path = path.slice(0, hashIndex);
    const queryIndex = path.indexOf('?');
    if (queryIndex !== -1) path = path.slice(0, queryIndex);
    if (path.endsWith('/index.html')) path = path.slice(0, -10) + '/';
    if (path.startsWith('/')) {
      const parts = path.split('/').filter(Boolean);
      return parts[parts.length - 1] || 'index.html';
    }
    return path || 'index.html';
  };
  const cleanText = (value, fallback) => {
    let text = String(value || fallback || '').replace(/\s+/g, ' ').trim();
    text = text
      .replace(/Ce panneau garantit[^.?!]*(?:[.?!]|$)/gi, '')
      .replace(/réellement\s+cliquable/gi, '')
      .replace(/ouvre\s+une\s+explication\s+lisible/gi, '')
      .replace(/click reliability/gi, '')
      .replace(/undefined|null|\[object Object\]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    return text || String(fallback || 'Ce bloc précise le rôle de cette information dans le parcours utilisateur.').trim();
  };

  const navLinks = Array.from(document.querySelectorAll(cfg.navLinkSelector));
  const linkTarget = (link) => {
    try {
      const url = new URL(link.getAttribute('href'), window.location.href);
      const parts = url.pathname.split('/').filter(Boolean);
      return normalizeHref(parts[parts.length - 1] || 'index.html');
    } catch (_) {
      return normalizeHref(link.getAttribute('href'));
    }
  };
  const setActive = (targetFile, currentKind) => {
    if (!navLinks.length || !targetFile) return;
    navLinks.forEach((link) => {
      const active = linkTarget(link) === targetFile;
      link.classList.toggle(cfg.activeClass, active);
      if (active) link.setAttribute('aria-current', currentKind || 'page');
      else if (link.getAttribute('aria-current')) link.removeAttribute('aria-current');
    });
  };
  const parts = window.location.pathname.split('/').filter(Boolean);
  setActive(normalizeHref(parts[parts.length - 1] || 'index.html'), 'page');
  navLinks.forEach((link) => link.addEventListener('click', () => setActive(linkTarget(link), 'page'), { passive: true }));

  const sections = Array.from(document.querySelectorAll('[' + cfg.sectionNavAttr + ']'));
  if (sections.length) {
    let ticking = false;
    const readActiveSection = () => {
      const header = document.querySelector(cfg.headerSelector);
      const headerBottom = header ? Math.max(0, header.getBoundingClientRect().bottom) : 0;
      const anchorY = headerBottom + (window.innerHeight - headerBottom) * (Number(cfg.viewportAnchorRatio) || 0.35);
      let selected = null;
      let selectedDistance = Infinity;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const containsAnchor = rect.top <= anchorY && rect.bottom > anchorY;
        const distance = containsAnchor ? 0 : Math.min(Math.abs(rect.top - anchorY), Math.abs(rect.bottom - anchorY));
        if (containsAnchor && (!selected || rect.top > selected.getBoundingClientRect().top)) {
          selected = section;
          selectedDistance = 0;
        } else if (!selected && distance < selectedDistance) {
          selected = section;
          selectedDistance = distance;
        }
      });
      if (selected) setActive(normalizeHref(selected.getAttribute(cfg.sectionNavAttr)), 'location');
    };
    const scheduleRead = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        readActiveSection();
      });
    };
    window.addEventListener('scroll', scheduleRead, { passive: true });
    window.addEventListener('resize', scheduleRead, { passive: true });
    readActiveSection();
  }

  const revealLinks = Array.from(document.querySelectorAll('[data-ux-reveal="true"]'));
  const clearReveals = (except) => {
    revealLinks.forEach((link) => {
      if (link !== except) {
        link.classList.remove('ux-reveal-active');
        link.setAttribute('aria-expanded', 'false');
      }
    });
  };
  revealLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => { clearReveals(link); link.classList.add('ux-reveal-active'); link.setAttribute('aria-expanded', 'true'); });
    link.addEventListener('mouseleave', () => { link.classList.remove('ux-reveal-active'); link.setAttribute('aria-expanded', 'false'); });
    link.addEventListener('focus', () => { clearReveals(link); link.classList.add('ux-reveal-active'); link.setAttribute('aria-expanded', 'true'); });
    link.addEventListener('blur', () => { link.classList.remove('ux-reveal-active'); link.setAttribute('aria-expanded', 'false'); });
  });

  const makeText = (tag, className, text) => {
    const value = cleanText(text, '');
    if (!value) return null;
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = value;
    return el;
  };
  const mediaPlaceholder = (label) => {
    const el = document.createElement('div');
    el.className = cfg.mediaPlaceholderClass;
    el.textContent = label || 'Média à connecter';
    return el;
  };
  const buildMedia = (card) => {
    const type = card.getAttribute('data-ux-media-type') || '';
    const imageSrc = card.getAttribute('data-ux-media-image-src') || '';
    const imageAlt = card.getAttribute('data-ux-media-image-alt') || '';
    const placeholderLabel = card.getAttribute('data-ux-media-placeholder-label') || '';
    const videoSrc = card.getAttribute('data-ux-media-video-src') || '';
    const posterSrc = card.getAttribute('data-ux-media-poster-src') || '';
    const iframeSrc = card.getAttribute('data-ux-media-iframe-src') || '';
    if (!type) return null;
    const frame = document.createElement('div');
    frame.className = cfg.mediaFrameClass;
    if (type === 'image') {
      if (imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = imageAlt || card.getAttribute('data-ux-explainer-title') || '';
        img.loading = 'lazy';
        frame.appendChild(img);
      } else {
        frame.appendChild(mediaPlaceholder(placeholderLabel || 'Image ou schéma à connecter'));
      }
    } else if (type === 'video') {
      if (videoSrc) {
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        if (posterSrc) video.poster = posterSrc;
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4';
        video.appendChild(source);
        frame.appendChild(video);
      } else {
        frame.appendChild(mediaPlaceholder(placeholderLabel || 'Vidéo à connecter'));
      }
    } else if (type === 'iframe') {
      if (iframeSrc) {
        const iframe = document.createElement('iframe');
        iframe.src = iframeSrc;
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.title = card.getAttribute('data-ux-explainer-title') || 'Vidéo intégrée';
        frame.appendChild(iframe);
      } else {
        frame.appendChild(mediaPlaceholder(placeholderLabel || 'Iframe vidéo à connecter'));
      }
    } else {
      return null;
    }
    return frame;
  };

  const cardSelector = '[data-ux-explainer-card="true"]';
  const cards = () => Array.from(document.querySelectorAll(cardSelector)).filter((card) => !card.closest('.' + cfg.explainerPanelClass));
  const closeOtherExplainers = (except) => {
    cards().forEach((card) => {
      if (card !== except) {
        card.classList.remove(cfg.explainerOpenClass);
        card.setAttribute('aria-expanded', 'false');
        const next = card.nextElementSibling;
        if (next && next.classList && next.classList.contains(cfg.explainerPanelClass)) next.remove();
      }
    });
  };
  const buildPanel = (card) => {
    const panel = document.createElement('div');
    panel.className = cfg.explainerPanelClass;
    panel.setAttribute('data-ux-generated-panel', 'true');
    const media = buildMedia(card);
    if (media) panel.appendChild(media);
    const title = makeText('strong', '', card.getAttribute('data-ux-explainer-title') || cfg.clickFallbackTitle);
    if (title) panel.appendChild(title);
    const body = makeText('p', '', card.getAttribute('data-ux-explainer-body') || cfg.clickFallbackBody);
    if (body) panel.appendChild(body);
    const caption = makeText('div', cfg.mediaCaptionClass, card.getAttribute('data-ux-media-caption') || '');
    if (caption) panel.appendChild(caption);
    const transcript = makeText('div', cfg.mediaTranscriptClass, card.getAttribute('data-ux-media-transcript') || '');
    if (transcript) panel.appendChild(transcript);
    const ctaLabel = cleanText(card.getAttribute('data-ux-explainer-cta-label') || '', '');
    const ctaHref = card.getAttribute('data-ux-explainer-cta-href');
    if (ctaLabel && ctaHref) {
      const cta = document.createElement('a');
      cta.href = ctaHref;
      cta.textContent = ctaLabel;
      panel.appendChild(cta);
    }
    return panel;
  };
  const toggleCard = (card) => {
    const isOpen = card.classList.contains(cfg.explainerOpenClass);
    closeOtherExplainers(card);
    if (isOpen) {
      card.classList.remove(cfg.explainerOpenClass);
      card.setAttribute('aria-expanded', 'false');
      const next = card.nextElementSibling;
      if (next && next.classList && next.classList.contains(cfg.explainerPanelClass)) next.remove();
      return;
    }
    card.classList.add(cfg.explainerOpenClass);
    card.setAttribute('aria-expanded', 'true');
    const next = card.nextElementSibling;
    if (!next || !next.classList || !next.classList.contains(cfg.explainerPanelClass)) {
      card.insertAdjacentElement('afterend', buildPanel(card));
    }
  };
  cards().forEach((card) => {
    if (!card.getAttribute('role')) card.setAttribute('role', 'button');
    if (!card.getAttribute('tabindex')) card.setAttribute('tabindex', '0');
    if (!card.getAttribute('aria-expanded')) card.setAttribute('aria-expanded', 'false');
    if (!card.getAttribute('data-ux-click-label')) card.setAttribute('data-ux-click-label', cfg.clickBadgeLabel || 'Cliquer pour comprendre');
  });
  document.addEventListener('click', (event) => {
    const panel = event.target.closest && event.target.closest('.' + cfg.explainerPanelClass);
    if (panel) return;
    const card = event.target.closest ? event.target.closest(cardSelector) : null;
    if (!card) {
      closeOtherExplainers(null);
      return;
    }
    const nestedInteractive = event.target.closest('a, video, iframe, button, input, textarea, select');
    if (nestedInteractive && nestedInteractive !== card && !nestedInteractive.hasAttribute('data-ux-explainer-card')) return;
    if (card.tagName === 'A') event.preventDefault();
    event.stopPropagation();
    toggleCard(card);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest ? event.target.closest(cardSelector) : null;
    if (!card) return;
    event.preventDefault();
    toggleCard(card);
  });
})();
