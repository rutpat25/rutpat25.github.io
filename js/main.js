// ===========================
// Scroll-Driven Portfolio
// ===========================

const SLIDE_COUNT = 5;
let currentSlide = 0;
let isTransitioning = false;

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const navbar = document.querySelector('.navbar');

// ── Activate a slide ──────────────────────────────────────────
function goToSlide(index, updateScroll = true) {
  if (index < 0 || index >= SLIDE_COUNT) return;
  if (index === currentSlide && slides[index].classList.contains('active')) return;

  // Deactivate all, activate target
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  currentSlide = index;

  // Sync scroll position so back/forward nav doesn't desync
  if (updateScroll) {
    const target = (index / SLIDE_COUNT) * document.querySelector('.scroll-track').scrollHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  // Navbar style
  navbar.classList.toggle('scrolled', index > 0);
}

// ── Map scroll position → active slide ───────────────────────
function onScroll() {
  const trackHeight = document.querySelector('.scroll-track').scrollHeight;
  const scrolled = window.scrollY;
  const maxScroll = trackHeight - window.innerHeight;
  const progress = Math.min(scrolled / maxScroll, 1); // 0 → 1

  // Each slide occupies 1/SLIDE_COUNT of the scroll range
  const rawIndex = progress * SLIDE_COUNT;
  const index = Math.min(Math.floor(rawIndex + 0.15), SLIDE_COUNT - 1);

  goToSlide(index, false);
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Dot nav clicks ────────────────────────────────────────────
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(parseInt(dot.dataset.slide));
  });
});

// ── Nav link & data-slide clicks ─────────────────────────────
document.querySelectorAll('[data-slide]').forEach(el => {
  el.addEventListener('click', (e) => {
    const tag = el.tagName.toLowerCase();
    // Only intercept anchors that would normally jump the page
    if (tag === 'a') e.preventDefault();
    goToSlide(parseInt(el.dataset.slide));
  });
});

// ── Mobile Menu ───────────────────────────────────────────────
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileClose = document.querySelector('.mobile-close');

mobileToggle?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileClose?.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ── Dark Mode ─────────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ── Experience Accordion ──────────────────────────────────────
document.querySelectorAll('.experience-card').forEach(card => {
  card.querySelector('.experience-header').addEventListener('click', () => {
    const isExpanded = card.getAttribute('data-expanded') === 'true';
    document.querySelectorAll('.experience-card').forEach(c => c.setAttribute('data-expanded', 'false'));
    card.setAttribute('data-expanded', String(!isExpanded));
  });
});

// ── Typing animation for hero name ───────────────────────────
const typingEl = document.querySelector('.gradient-text');
if (typingEl) {
  const text = 'Rutwij Patil';
  typingEl.textContent = '';
  typingEl.style.cssText = 'border-right: 3px solid; padding-right: 5px; animation: blink-cursor 0.8s step-end infinite;';
  let i = 0;
  setTimeout(function type() {
    if (i < text.length) {
      typingEl.textContent += text[i++];
      setTimeout(type, 100);
    }
  }, 500);
}

// ── Parallax orbs on hero ─────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  if (currentSlide !== 0) return;
  const mx = e.clientX / window.innerWidth - 0.5;
  const my = e.clientY / window.innerHeight - 0.5;
  document.querySelectorAll('.gradient-orb').forEach((orb, i) => {
    const s = (i + 1) * 0.02 * 100;
    orb.style.transform = `translate(${mx * s}px, ${my * s}px)`;
  });
});

// ── EmailJS Contact Form ──────────────────────────────────────
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    window.location.href = `mailto:rutwijpatil25@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: name, from_email: email, message });
    alert(`Thanks ${name}! Your message has been sent.`);
    this.reset();
  } catch {
    alert('Oops! Something went wrong. Please email me directly at rutwijpatil25@gmail.com');
  } finally {
    btn.disabled = false;
    btn.innerHTML = orig;
  }
});

// ── Init: activate first slide ────────────────────────────────
goToSlide(0, false);

// ── Console Easter Egg ────────────────────────────────────────
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect: rutwijpatil25@gmail.com', 'font-size: 14px; color: #cbd5e1;');
