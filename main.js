/* =============================================
   Wedding Site — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  function revealVisible(root = document) {
    const items = root.querySelectorAll('.reveal');
    items.forEach((el, i) => {
      if (!el.style.getPropertyValue('--reveal-delay')) {
        el.style.setProperty('--reveal-delay', `${Math.min(i * 60, 400)}ms`);
      }
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(el => io.observe(el));
  }

  function showSection(id) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(a => a.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      target.querySelectorAll('.reveal').forEach(el => el.classList.remove('is-visible'));
      requestAnimationFrame(() => revealVisible(target));
    }

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

  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    showSection(hash);
  } else {
    revealVisible(document.querySelector('.page.active') || document);
  }

  // ---- Carousel + Lightbox ----
  const carousel = document.querySelector('[data-carousel]');
  const lightbox = document.querySelector('[data-lightbox]');

  if (carousel && lightbox) {
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const prevBtn = carousel.querySelector('.carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.carousel__arrow--next');
    const viewport = carousel.querySelector('.carousel__viewport');
    const indexEl = carousel.querySelector('.carousel__index');
    const totalEl = carousel.querySelector('.carousel__total');

    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbIndex = lightbox.querySelector('.lightbox__index');
    const lbTotal = lightbox.querySelector('.lightbox__total');
    const lbPrev = lightbox.querySelector('.lightbox__arrow--prev');
    const lbNext = lightbox.querySelector('.lightbox__arrow--next');
    const lbClose = lightbox.querySelector('.lightbox__close');

    const total = slides.length;
    let current = 0;

    if (totalEl) totalEl.textContent = total;
    if (lbTotal) lbTotal.textContent = total;

    function setIndex(i) {
      current = ((i % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (indexEl) indexEl.textContent = current + 1;
      if (lightbox.classList.contains('is-open')) updateLightbox();
    }

    function updateLightbox() {
      const img = slides[current].querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      if (lbIndex) lbIndex.textContent = current + 1;
    }

    function openLightbox() {
      updateLightbox();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
    }

    prevBtn?.addEventListener('click', e => { e.stopPropagation(); setIndex(current - 1); });
    nextBtn?.addEventListener('click', e => { e.stopPropagation(); setIndex(current + 1); });
    viewport?.addEventListener('click', openLightbox);

    lbPrev?.addEventListener('click', e => { e.stopPropagation(); setIndex(current - 1); });
    lbNext?.addEventListener('click', e => { e.stopPropagation(); setIndex(current + 1); });
    lbClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox || e.target.classList.contains('lightbox__figure')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', e => {
      if (lightbox.classList.contains('is-open')) {
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') setIndex(current - 1);
        else if (e.key === 'ArrowRight') setIndex(current + 1);
      }
    });

    // Touch swipe support on the viewport
    let touchStartX = null;
    viewport?.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    viewport?.addEventListener('touchend', e => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        setIndex(dx < 0 ? current + 1 : current - 1);
      }
      touchStartX = null;
    });

    setIndex(0);
  }

});
