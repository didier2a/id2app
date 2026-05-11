(function () {
  'use strict';

  // --- Menu burger mobile ---
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');

  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('nav-menu--open');
    });

    // Fermeture du menu après clic sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav-menu--open');
      });
    });

    // Fermeture si clic en dehors du menu
    document.addEventListener('click', function (event) {
      if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav-menu--open');
      }
    });

    // Fermeture avec la touche Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav-menu--open');
        burger.focus();
      }
    });
  }

  // --- Lien de navigation actif ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-menu a');
  allNavLinks.forEach(function (link) {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('nav-link--active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // --- Année courante dans le footer ---
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();