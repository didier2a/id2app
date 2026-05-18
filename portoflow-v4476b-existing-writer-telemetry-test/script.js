document.addEventListener('DOMContentLoaded',()=>{const year=document.querySelector('[data-current-year]');if(year)year.textContent=String(new Date().getFullYear());const toggle=document.querySelector('[data-pf-nav-toggle]');const panel=document.querySelector('[data-pf-nav-panel]');if(toggle&&panel){toggle.addEventListener('click',()=>{const open=document.body.classList.toggle('pf-mobile-open');toggle.setAttribute('aria-expanded',String(open));});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('pf-mobile-open');toggle.setAttribute('aria-expanded','false');}));}document.querySelectorAll('.pf-card,.pf-bento,.pf-dashboard__card').forEach(el=>{el.addEventListener('mouseenter',()=>el.style.transform='translateY(-3px)');el.addEventListener('mouseleave',()=>el.style.transform='');});});
/* ID2App Generic UX Pattern Engine V4.4.7.6E */
(() => {
  const cfg = {"navLinkSelector":".pf-nav__link[href]","activeClass":"pf-nav__link--active","sectionNavAttr":"data-ux-section-nav","enablePageActive":true,"enableScrollspy":true};
  const navLinks = Array.from(document.querySelectorAll(cfg.navLinkSelector));
  if (!navLinks.length) return;

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
    navLinks.forEach((link) => {
      const active = linkTarget(link) === targetFile;
      link.classList.toggle(cfg.activeClass, active);
      if (active) link.setAttribute('aria-current', currentKind || 'page');
      else if (link.getAttribute('aria-current')) link.removeAttribute('aria-current');
    });
  };

  if (cfg.enablePageActive) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    setActive(normalizeHref(parts[parts.length - 1] || 'index.html'), 'page');
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => setActive(linkTarget(link), 'page'), { passive: true });
  });

  if (cfg.enableScrollspy && 'IntersectionObserver' in window) {
    const sections = Array.from(document.querySelectorAll('[' + cfg.sectionNavAttr + ']'));
    if (sections.length) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(normalizeHref(visible.target.getAttribute(cfg.sectionNavAttr)), 'location');
      }, { rootMargin: '-24% 0px -60% 0px', threshold: [0.16, 0.32, 0.55] });
      sections.forEach((section) => observer.observe(section));
    }
  }
})();
