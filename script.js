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
