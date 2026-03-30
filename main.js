/* =============================================
   Wedding Site — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navigation ----
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  function showSection(id) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(a => a.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    navLinks.forEach(a => {
      if (a.dataset.section === id || a.getAttribute('href') === '#' + id) {
        a.classList.add('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section || link.getAttribute('href')?.replace('#', '');
      if (section) showSection(section);
    });
  });

  // Handle hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  }

});
