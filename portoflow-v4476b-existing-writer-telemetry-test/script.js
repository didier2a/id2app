document.addEventListener('DOMContentLoaded',()=>{const year=document.querySelector('[data-current-year]');if(year)year.textContent=String(new Date().getFullYear());const toggle=document.querySelector('[data-pf-nav-toggle]');const panel=document.querySelector('[data-pf-nav-panel]');if(toggle&&panel){toggle.addEventListener('click',()=>{const open=document.body.classList.toggle('pf-mobile-open');toggle.setAttribute('aria-expanded',String(open));});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('pf-mobile-open');toggle.setAttribute('aria-expanded','false');}));}document.querySelectorAll('.pf-card,.pf-bento,.pf-dashboard__card').forEach(el=>{el.addEventListener('mouseenter',()=>el.style.transform='translateY(-3px)');el.addEventListener('mouseleave',()=>el.style.transform='');});});
/* ID2App Deterministic UX MicroPatch V4.4.7.6D.1.2 */
(() => {
  const links = Array.from(document.querySelectorAll('.pf-nav__link[href]'));
  if (!links.length) return;

  const normalizePath = (value) => {
    let path = String(value || '');
    const hashIndex = path.indexOf('#');
    if (hashIndex !== -1) path = path.slice(0, hashIndex);
    const queryIndex = path.indexOf('?');
    if (queryIndex !== -1) path = path.slice(0, queryIndex);
    if (path.endsWith('/index.html')) return path.slice(0, -10) + '/';
    return path;
  };

  const currentPath = normalizePath(window.location.pathname);

  const hrefPath = (link) => {
    try {
      return normalizePath(new URL(link.getAttribute('href'), window.location.href).pathname);
    } catch (_) {
      return '';
    }
  };

  const setActive = (activeLink, currentKind) => {
    links.forEach((link) => {
      const active = link === activeLink;
      link.classList.toggle('pf-nav__link--active', active);
      if (active) link.setAttribute('aria-current', currentKind || 'page');
      else if (link.getAttribute('aria-current')) link.removeAttribute('aria-current');
    });
  };

  const pageLink = links.find((link) => hrefPath(link) === currentPath);
  if (pageLink) setActive(pageLink, 'page');

  links.forEach((link) => {
    link.addEventListener('click', () => setActive(link, (link.getAttribute('href') || '').startsWith('#') ? 'true' : 'page'), { passive: true });
  });

  const anchorLinks = links.filter((link) => (link.getAttribute('href') || '').startsWith('#'));
  const sections = anchorLinks
    .map((link) => document.getElementById((link.getAttribute('href') || '').slice(1)))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const byId = new Map(anchorLinks.map((link) => [(link.getAttribute('href') || '').slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && byId.has(visible.target.id)) setActive(byId.get(visible.target.id), 'true');
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0.12, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
  }
})();
