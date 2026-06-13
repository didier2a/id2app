(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('[data-id2-nav-toggle]');
  const panel = document.querySelector('[data-id2-nav-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = !root.classList.contains('id2-mobile-open');
      root.classList.toggle('id2-mobile-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
})();
