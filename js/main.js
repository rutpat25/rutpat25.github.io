// ===========================
// Scroll-Driven Portfolio
// ===========================

const SLIDE_COUNT = 5;
let currentSlide = 0;

const slides = Array.from(document.querySelectorAll('.slide'));
const dots   = Array.from(document.querySelectorAll('.dot'));
const navbar = document.querySelector('.navbar');

// ── Word splitter ─────────────────────────────────────────────
// Wraps every word in targeted elements with <span class="word">
function splitWords(el) {
  // Don't double-split
  if (el.dataset.split) return;
  el.dataset.split = '1';

  el.innerHTML = el.textContent
    .split(/(\s+)/)
    .map(chunk => chunk.trim()
      ? `<span class="word">${chunk}</span>`
      : chunk
    )
    .join('');
}

// Selectors whose text gets word-split per slide
const WORD_SELECTORS = [
  '.hero-title',
  '.hero-subtitle',
  '.hero-description',
  '.section-title',
  '.section-tag',
  '.about-text',
  '.skills-title',
  '.contact-description',
  '.section-header h2',
];

// Selectors that animate in as whole blocks (cards, items)
const BLOCK_SELECTORS = [
  '.skill-card',
  '.experience-card',
  '.project-card',
  '.highlight-item',
  '.contact-item',
  '.hero-stats',
  '.hero-cta',
  '.hero-image',
  '.contact-form-wrapper',
];

function prepareSlide(slideEl) {
  // Split words in this slide
  slideEl.querySelectorAll(WORD_SELECTORS.join(',')).forEach(el => splitWords(el));

  // Mark blocks
  slideEl.querySelectorAll(BLOCK_SELECTORS.join(',')).forEach(el => {
    if (!el.classList.contains('slide-block')) {
      el.classList.add('slide-block');
    }
  });
}

// Reveal words + blocks with staggered delay
function revealContent(slideEl) {
  const words  = Array.from(slideEl.querySelectorAll('.word'));
  const blocks = Array.from(slideEl.querySelectorAll('.slide-block'));

  // Reset everything first (so re-entering a slide re-animates)
  words.forEach(w  => w.classList.remove('revealed'));
  blocks.forEach(b => b.classList.remove('revealed'));

  // Stagger words: 30ms apart, max cap so it doesn't drag too long
  const wordDelay = 30;
  const maxWordDelay = 800;
  words.forEach((w, i) => {
    const delay = Math.min(i * wordDelay, maxWordDelay);
    setTimeout(() => w.classList.add('revealed'), delay);
  });

  // Blocks come in after a base delay, staggered 80ms each
  const blockBase = 200;
  blocks.forEach((b, i) => {
    setTimeout(() => b.classList.add('revealed'), blockBase + i * 80);
  });
}

// ── Slide transition ──────────────────────────────────────────
function goToSlide(index, updateScroll = true) {
  if (index < 0 || index >= SLIDE_COUNT) return;
  if (index === currentSlide && slides[index].classList.contains('active')) return;

  const prev = currentSlide;
  currentSlide = index;

  // Mark outgoing as leaving
  slides[prev].classList.remove('active');
  slides[prev].classList.add('leaving');
  setTimeout(() => slides[prev].classList.remove('leaving'), 700);

  // Activate incoming
  slides[index].classList.add('active');
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');

  // Trigger word + block reveal
  revealContent(slides[index]);

  // Navbar style
  navbar.classList.toggle('scrolled', index > 0);

  // Sync scroll
  if (updateScroll) {
    const trackEl = document.querySelector('.scroll-track');
    const target = (index / SLIDE_COUNT) * trackEl.scrollHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
}

// ── Map scroll → slide ────────────────────────────────────────
function onScroll() {
  const track    = document.querySelector('.scroll-track');
  const maxScroll = track.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;

  const progress = Math.min(window.scrollY / maxScroll, 1);
  const index    = Math.min(Math.floor(progress * SLIDE_COUNT + 0.15), SLIDE_COUNT - 1);

  if (index !== currentSlide) goToSlide(index, false);
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Dot nav ───────────────────────────────────────────────────
dots.forEach(dot => {
  dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.slide)));
});

// ── Nav / data-slide links ────────────────────────────────────
document.querySelectorAll('[data-slide]').forEach(el => {
  el.addEventListener('click', e => {
    if (el.tagName.toLowerCase() === 'a') e.preventDefault();
    goToSlide(parseInt(el.dataset.slide));
  });
});

// ── Mobile menu ───────────────────────────────────────────────
const mobileToggle      = document.querySelector('.mobile-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileClose       = document.querySelector('.mobile-close');

mobileToggle?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
mobileClose?.addEventListener('click', closeMobileMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobileMenu));

// ── Dark mode ─────────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  themeIcon.classList.replace(dark ? 'fa-moon' : 'fa-sun', dark ? 'fa-sun' : 'fa-moon');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

// ── Experience accordion ──────────────────────────────────────
document.querySelectorAll('.experience-card').forEach(card => {
  card.querySelector('.experience-header').addEventListener('click', () => {
    const expanded = card.getAttribute('data-expanded') === 'true';
    document.querySelectorAll('.experience-card').forEach(c => c.setAttribute('data-expanded', 'false'));
    card.setAttribute('data-expanded', String(!expanded));
  });
});

// ── Typing animation ──────────────────────────────────────────
// (runs after split, so we target the first .word inside .gradient-text)
function startTyping() {
  const container = document.querySelector('.gradient-text');
  if (!container) return;
  const fullText = 'Rutwij Patil';
  container.textContent = '';
  container.style.cssText = 'border-right: 3px solid; padding-right: 5px; animation: blink-cursor 0.8s step-end infinite;';
  let i = 0;
  function type() {
    if (i < fullText.length) {
      container.textContent += fullText[i++];
      setTimeout(type, 100);
    }
  }
  setTimeout(type, 400);
}

// ── Parallax orbs ─────────────────────────────────────────────
document.addEventListener('mousemove', e => {
  if (currentSlide !== 0) return;
  const mx = e.clientX / window.innerWidth - 0.5;
  const my = e.clientY / window.innerHeight - 0.5;
  document.querySelectorAll('.gradient-orb').forEach((orb, i) => {
    const s = (i + 1) * 2;
    orb.style.transform = `translate(${mx * s}px, ${my * s}px)`;
  });
});

// ── EmailJS ───────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID   = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID  = 'YOUR_TEMPLATE_ID';

if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn  = this.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    window.location.href = `mailto:rutwijpatil25@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name: name, from_email: email, message });
    alert(`Thanks ${name}! Message sent.`);
    this.reset();
  } catch {
    alert('Something went wrong. Email me at rutwijpatil25@gmail.com');
  } finally {
    btn.disabled = false;
    btn.innerHTML = orig;
  }
});

// ── Init ──────────────────────────────────────────────────────
// Prepare all slides (split words, mark blocks)
slides.forEach(s => prepareSlide(s));

// Activate first slide (no scroll sync needed)
slides[0].classList.add('active');
dots[0].classList.add('active');

// Start typing then reveal hero content
startTyping();
setTimeout(() => revealContent(slides[0]), 300);

// ── Console easter egg ────────────────────────────────────────
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect: rutwijpatil25@gmail.com', 'font-size: 14px; color: #cbd5e1;');
