// Scroll-reveal for any element with class="reveal"
const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealTargets.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const willOpen = navMenu.classList.contains('hidden');
    navMenu.classList.toggle('hidden');
    navToggle.setAttribute('aria-expanded', String(willOpen));
  });
}

// Project filter (School / Personal / Professional)
const filterButtons = document.querySelectorAll('[data-filter]');
const filterCards = document.querySelectorAll('[data-category]');
if (filterButtons.length && filterCards.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterCards.forEach((card) => {
        const show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

// About page: the first (leftmost) photo stays put. The rest start lined up
// beside it like a row of cards, then slide left and overlap it as you scroll,
// converging into a stack. Positions are derived from the photo count, so
// adding/removing <div data-mag-img> blocks in the HTML "just works" with no
// numbers to update here.
const magPinWrap = document.getElementById('mag-pin-wrap');
if (magPinWrap) {
  const magImgs = Array.from(magPinWrap.querySelectorAll('[data-mag-img]'));
  const SPREAD_STEP = 106; // % of a photo's own width between adjacent photos when laid out in a row
  const STACK_STEP = 26; // % of own width each later photo offsets once stacked
  const ROTATIONS = [-4, 3, 0, -2, 2, -1]; // cycles for however many photos there are

  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  let ticking = false;

  const updateMag = () => {
    ticking = false;
    const rect = magPinWrap.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
    magImgs.forEach((el, i) => {
      const start = i * SPREAD_STEP;
      const end = i * STACK_STEP;
      const rotEnd = i === 0 ? 0 : ROTATIONS[(i - 1) % ROTATIONS.length];
      const x = start + (end - start) * progress;
      const rot = rotEnd * progress;
      el.style.zIndex = String(i + 1);
      el.style.transform = `translateX(${x}%) rotate(${rot}deg)`;
    });
  };

  const requestMagUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateMag);
    }
  };

  updateMag();
  window.addEventListener('scroll', requestMagUpdate, { passive: true });
  window.addEventListener('resize', requestMagUpdate);
}

// Highlight the current page's nav link
const here = location.pathname.replace(/index\.html$/, '');
document.querySelectorAll('[data-nav-link]').forEach((link) => {
  const target = new URL(link.getAttribute('href'), location.origin).pathname.replace(/index\.html$/, '');
  if (target === here || (target !== '/' && here.startsWith(target))) {
    link.classList.add('text-black');
    link.classList.remove('text-gray-400');
  }
});
