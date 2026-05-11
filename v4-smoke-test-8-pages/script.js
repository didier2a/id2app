(function () {
  'use strict';

  // --- Menu burger mobile ---
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');

  if (burger && navMenu) {
    burger.addEventListener('click', function () {
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isExpanded));
      navMenu.classList.toggle('nav-open');
    });

    // Fermeture du menu après clic sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav-open');
      });
    });

    // Fermeture si clic en dehors du menu
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav-open');
      }
    });

    // Fermeture avec la touche Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        burger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav-open');
        burger.focus();
      }
    });
  }

  // --- Année courante dans le footer ---
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Lien de navigation actif ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-menu a');
  allNavLinks.forEach(function (link) {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

}());