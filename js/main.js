// ========== Tooltips (si usas data-bs-toggle="tooltip") ==========
document.addEventListener('DOMContentLoaded', function () {
  const tts = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tts.forEach(el => new bootstrap.Tooltip(el));
});

// ========== Reveal on scroll ==========
document.addEventListener('DOMContentLoaded', () => {
  const reveal = document.querySelectorAll('.reveal-up');
  if (!('IntersectionObserver' in window)) {
    reveal.forEach(el => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  reveal.forEach(el => io.observe(el));
});

// ========== Brand visible fuera del hero ==========
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('#hero');
  const navbar = document.querySelector('#navbar');
  if (!hero || !navbar || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio > 0.6) {
        navbar.classList.remove('is-stuck'); // estamos en hero → oculto brand
      } else {
        navbar.classList.add('is-stuck');    // fuera de hero → muestro brand
      }
    });
  }, { threshold: [0, 0.6] });
  observer.observe(hero);
});

// ========== Smooth scroll SIN hash + indicador activo robusto ==========
(function () {
  const nav = document.getElementById('navbar');
  const links = Array.from(document.querySelectorAll('.navbar .nav-link[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('section[id]')); // orden real del DOM
  const linkById = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));

  // Calcula el activo por "línea guía" a 35% de la ventana
  function updateActiveByScroll() {
    const guide = window.scrollY + window.innerHeight * 0.35;
    let current = sections[0]?.id;
    for (const sec of sections) {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (top <= guide && bottom > guide) current = sec.id;
    }
    links.forEach(a => a.classList.toggle('active', a === linkById.get(current)));
  }

  // Intercepta clics: smooth + sin hash en URL
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest('.navbar .nav-link[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    ev.preventDefault();
    a.classList.add('active');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // borra el hash si existía
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  });

  // También borra el hash si se llega por deep-link
  window.addEventListener('load', () => {
    if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    updateActiveByScroll();
  });

  window.addEventListener('scroll', updateActiveByScroll, { passive: true });
  window.addEventListener('resize', updateActiveByScroll);
})();

// ===== Skills: Expandir/Contraer todo y rotación de chevrons =====
document.addEventListener('DOMContentLoaded', () => {
  const expandAllBtn = document.getElementById('skillsExpandAll');
  const collapseAllBtn = document.getElementById('skillsCollapseAll');
  const collapses = Array.from(document.querySelectorAll('#skills .collapse'));

  // Utilidad: obtener/crear instancia Bootstrap Collapse
  const getInstance = (el) => bootstrap.Collapse.getOrCreateInstance(el, { toggle: false });

  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      collapses.forEach(el => getInstance(el).show());
      // sincroniza aria-expanded en botones
      document.querySelectorAll('#skills .tech-toggle').forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener('click', () => {
      collapses.forEach(el => getInstance(el).hide());
      document.querySelectorAll('#skills .tech-toggle').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    });
  }

  // Mantén chevron en sync cuando el usuario abre/cierra individualmente
  collapses.forEach(el => {
    el.addEventListener('shown.bs.collapse', () => {
      const btn = el.closest('.tech-card')?.querySelector('.tech-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'true');
    });
    el.addEventListener('hidden.bs.collapse', () => {
      const btn = el.closest('.tech-card')?.querySelector('.tech-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  });
});
