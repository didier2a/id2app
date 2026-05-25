(() => { const y=document.querySelector('[data-v5-current-year]'); if(y) y.textContent=new Date().getFullYear(); const header=document.querySelector('[data-v5-header]'); const onScroll=()=>{ if(header) header.classList.toggle('is-scrolled', window.scrollY > 24); }; onScroll(); window.addEventListener('scroll', onScroll, {passive:true}); const b=document.querySelector('[data-v5-nav-toggle]'); const n=document.querySelector('[data-v5-nav]'); if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('is-open'); b.setAttribute('aria-expanded', String(o));});} const path=location.pathname.split('/').pop()||'index.html'; document.querySelectorAll('.v5-nav__link').forEach(a=>{ if((a.getAttribute('href')||'')===path){a.classList.add('v5-nav__link--active'); a.setAttribute('aria-current','page'); }}); document.querySelectorAll('[data-v5-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault(); })); })();


(() => {
  const nav = document.querySelector('[data-v5-nav]');
  const toggle = document.querySelector('[data-v5-nav-toggle]');
  if (nav && !nav.id) nav.id = 'navigation-principale';
  if (toggle && nav) toggle.setAttribute('aria-controls', nav.id);
  document.querySelectorAll('[data-v5-form]').forEach((form) => {
    let status = form.querySelector('[data-v5-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.className = 'v5-form-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('data-v5-form-status', '');
      status.hidden = true;
      form.appendChild(status);
    }
    if (!form.dataset.v71StatusBound) {
      form.dataset.v71StatusBound = 'true';
      form.addEventListener('submit', () => {
        const message = 'Votre demande est prête à être transmise. Le formulaire sera raccordé à l’envoi sécurisé lors de la mise en production.';
        status.textContent = message;
        status.hidden = false;
      });
    }
  });
})();


// ID2APP V7 UX SAFE PATCH
(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var path=(location.pathname.split('/').pop()||'index.html');
    document.querySelectorAll('.v5-nav__link').forEach(function(a){
      var href=(a.getAttribute('href')||'').split('#')[0];
      if(href===path){ a.setAttribute('aria-current','page'); }
    });
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      var id=a.getAttribute('href').slice(1);
      if(id && !document.getElementById(id)){ a.setAttribute('data-v7-anchor-warning','missing-target'); }
    });
  });
})();


// ID2APP V7.1 ACCESSIBILITY PATCH
(() => {
  const nav = document.querySelector('[data-v5-nav]');
  const toggle = document.querySelector('[data-v5-nav-toggle]');
  if (nav && !nav.id) nav.id = 'navigation-principale';
  if (toggle && nav) toggle.setAttribute('aria-controls', nav.id);
  document.querySelectorAll('[data-v5-form]').forEach((form) => {
    let status = form.querySelector('[data-v5-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.className = 'v5-form-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('data-v5-form-status', '');
      status.hidden = true;
      form.appendChild(status);
    }
    if (!form.dataset.v71StatusBound) {
      form.dataset.v71StatusBound = 'true';
      form.addEventListener('submit', () => {
        const message = 'Votre demande est prête à être transmise. Le formulaire sera raccordé à l’envoi sécurisé lors de la mise en production.';
        status.textContent = message;
        status.hidden = false;
      });
    }
  });
})();
