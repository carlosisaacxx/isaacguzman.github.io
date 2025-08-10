// Escribe el año actual en cualquier elemento con [data-year] o #currentYear
(function () {
  const y = String(new Date().getFullYear());
  const nodes = document.querySelectorAll('[data-year], #currentYear');
  nodes.forEach(n => n.textContent = y);
})();
