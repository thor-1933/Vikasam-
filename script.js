// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// How It Works Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Add active class to clicked
    btn.classList.add('active');
    const target = document.getElementById(btn.getAttribute('data-target'));
    if (target) {
      target.classList.add('active');
    }
  });
});

// Audio Player Simulators for "Hear the AI"
const voiceCards = document.querySelectorAll('.voice-card');
let activeInterval = null;

voiceCards.forEach(card => {
  const playBtn = card.querySelector('.play-btn');
  const fill = card.querySelector('.wave-fill');
  const timeCurrent = card.querySelector('.time-current');
  const maxTimeStr = card.querySelector('.time-total').textContent;
  
  // Parse simple max time (e.g., "0:45" -> 45s)
  const maxTimeParts = maxTimeStr.split(':');
  const maxSeconds = parseInt(maxTimeParts[0]) * 60 + parseInt(maxTimeParts[1]);
  
  let isPlaying = false;
  let currentSec = 0;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      // Pause
      clearInterval(activeInterval);
      isPlaying = false;
      playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>'; // Play Icon
    } else {
      // Pause others
      voiceCards.forEach(c => {
         c.querySelector('.play-btn').innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>';
         c.querySelector('.wave-fill').style.width = '0%';
         c.querySelector('.time-current').textContent = '0:00';
      });
      clearInterval(activeInterval);
      
      // Play Current
      isPlaying = true;
      currentSec = 0;
      playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'; // Pause Icon
      
      activeInterval = setInterval(() => {
        currentSec++;
        let percentage = (currentSec / maxSeconds) * 100;
        fill.style.width = percentage + '%';
        
        let displaySec = currentSec % 60;
        let displayMin = Math.floor(currentSec / 60);
        timeCurrent.textContent = `${displayMin}:${displaySec.toString().padStart(2, '0')}`;

        if (currentSec >= maxSeconds) {
          clearInterval(activeInterval);
          isPlaying = false;
          playBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>';
          fill.style.width = '0%';
          timeCurrent.textContent = '0:00';
        }
      }, 1000); // 1 second tick
    }
  });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Request Sent ✓';
    btn.disabled = true;
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

// Scroll Reveal Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
  observer.observe(el);
});
