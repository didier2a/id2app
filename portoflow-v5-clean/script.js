(() => {
  const year = document.querySelector('[data-v5-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  const button = document.querySelector('[data-v5-nav-toggle]');
  const nav = document.querySelector('[data-v5-nav]');

  if (button && nav) {
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(open));
    });
  }

  const path = location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.v5-nav__link').forEach((link) => {
    if ((link.getAttribute('href') || '') === path) {
      link.classList.add('v5-nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-v5-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Formulaire prêt pour raccordement n8n, email ou CRM.');
    });
  });
})();