const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const videos = document.querySelectorAll('video[autoplay]');
const videoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Browsers can block autoplay until the page receives interaction.
        });
      } else {
        video.pause();
      }
    });
  },
  { threshold: 0.35 }
);

videos.forEach((video) => videoObserver.observe(video));

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');
const orbs = document.querySelectorAll('.hero .orb');
const featurePanels = document.querySelectorAll('.feature-panel:not(.hero)');

if (!motionQuery.matches && window.matchMedia('(pointer: fine)').matches) {
  hero?.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (heroVideo) {
      heroVideo.style.transform = `scale(1.1) translate(${x * -10}px, ${y * -8}px)`;
    }

    orbs.forEach((orb, index) => {
      const intensity = index === 0 ? 22 : -16;
      orb.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    });
  });

  hero?.addEventListener('pointerleave', () => {
    if (heroVideo) heroVideo.style.transform = 'scale(1.08)';
    orbs.forEach((orb) => {
      orb.style.transform = '';
    });
  });

  featurePanels.forEach((panel) => {
    panel.addEventListener('pointermove', (event) => {
      const bounds = panel.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      panel.style.backgroundPosition = `${50 + x * 2}% ${50 + y * 2}%`;
    });

    panel.addEventListener('pointerleave', () => {
      panel.style.backgroundPosition = '';
    });
  });
}

const countdownEls = document.querySelectorAll('.countdown');
const pad = (value) => String(value).padStart(2, '0');

function updateCountdown(el) {
  const target = new Date(el.dataset.target);
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    const values = el.querySelectorAll('.count-value');
    values.forEach((valueEl) => {
      valueEl.textContent = '00';
    });
    el.parentElement.querySelector('.live-tag').textContent = 'LIVE';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const values = el.querySelectorAll('.count-value');
  values[0].textContent = pad(days);
  values[1].textContent = pad(hours);
  values[2].textContent = pad(minutes);
  values[3].textContent = pad(seconds);
}

countdownEls.forEach((counter) => {
  updateCountdown(counter);
  setInterval(() => updateCountdown(counter), 1000);
});
