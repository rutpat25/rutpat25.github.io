// ===========================
// Scroll-Driven Portfolio
// ===========================

// ── Layout constants ──────────────────────────────────────────
// Total scroll track: 800vh
// Zone 0:   0  →  200vh  = Hero word-by-word reveal
// Zone 1: 200  →  350vh  = About
// Zone 2: 350  →  500vh  = Experience
// Zone 3: 500  →  650vh  = Projects
// Zone 4: 650  →  800vh  = Contact

const HERO_ZONE  = 0.25;   // first 25% of total scroll = hero reveal (200/800)
const SLIDE_ZONES = [0.25, 0.4375, 0.625, 0.8125, 1.0]; // start % of each of the 4 post-hero slides

// Hero groups: 6 groups, evenly spaced across the hero zone (0 → HERO_ZONE)
const HERO_GROUP_COUNT = 6;

const slides  = Array.from(document.querySelectorAll('.slide'));
const dots    = Array.from(document.querySelectorAll('.dot'));
const navbar  = document.querySelector('.navbar');
const heroGroups = Array.from(document.querySelectorAll('.hero-group'));

// -1 = hero zone, 0-3 = about/exp/proj/contact
let currentSection = -1;

// ── Word splitter ─────────────────────────────────────────────
function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  el.innerHTML = el.textContent
    .split(/(\s+)/)
    .map(chunk => chunk.trim() ? `<span class="word">${chunk}</span>` : chunk)
    .join('');
}

const WORD_SELECTORS = [
  '.section-title', '.section-tag', '.about-text',
  '.skills-title', '.contact-description',
];
const BLOCK_SELECTORS = [
  '.skill-card', '.experience-card', '.project-card',
  '.highlight-item', '.contact-item', '.contact-form-wrapper',
];

function prepareSlide(slideEl) {
  slideEl.querySelectorAll(WORD_SELECTORS.join(',')).forEach(el => splitWords(el));
  slideEl.querySelectorAll(BLOCK_SELECTORS.join(',')).forEach(el => {
    if (!el.classList.contains('slide-block')) el.classList.add('slide-block');
  });
}

function revealContent(slideEl) {
  const words  = Array.from(slideEl.querySelectorAll('.word'));
  const blocks = Array.from(slideEl.querySelectorAll('.slide-block'));

  words.forEach(w  => w.classList.remove('revealed'));
  blocks.forEach(b => b.classList.remove('revealed'));

  words.forEach((w, i)  => setTimeout(() => w.classList.add('revealed'), Math.min(i * 30, 700)));
  blocks.forEach((b, i) => setTimeout(() => b.classList.add('revealed'), 200 + i * 80));
}

// ── Hero scroll reveal ────────────────────────────────────────
function updateHeroReveal(progress) {
  // progress = 0→1 within the hero zone only
  // Each group gets revealed when progress passes its threshold
  heroGroups.forEach((group, i) => {
    const threshold = i / HERO_GROUP_COUNT;
    if (progress >= threshold) {
      group.classList.add('revealed');

      // Word-by-word inside groups 0, 1, 2 (text groups)
      if (i < 3) {
        group.querySelectorAll('.word').forEach((w, wi) => {
          setTimeout(() => w.classList.add('revealed'), wi * 40);
        });
      }
    } else {
      group.classList.remove('revealed');
      group.querySelectorAll('.word').forEach(w => w.classList.remove('revealed'));
    }
  });

  // Show navbar only when hero is fully done (progress >= 0.95)
  if (progress >= 0.95) {
    navbar.classList.remove('navbar-hidden');
    navbar.classList.add('navbar-visible');
  } else {
    navbar.classList.add('navbar-hidden');
    navbar.classList.remove('navbar-visible');
  }
}

// ── Slide transitions ─────────────────────────────────────────
function activateSlide(index) {
  if (index === currentSection) return;
  const prev = currentSection;
  currentSection = index;

  // Deactivate hero slide if moving to content slides
  const heroSlide = document.getElementById('slide-hero');

  if (index === -1) {
    // Back to hero
    slides.forEach(s => { s.classList.remove('active'); s.classList.add('leaving'); });
    setTimeout(() => slides.forEach(s => s.classList.remove('leaving')), 700);
    heroSlide.classList.add('active');
    dots.forEach(d => d.classList.remove('active'));
    dots[0].classList.add('active');
    navbar.classList.add('scrolled');
  } else {
    // Activate a content slide
    slides.forEach((s, i) => {
      if (i === index + 1) {
        // +1 because slides[0] is hero, slides[1] is about, etc.
        s.classList.remove('leaving');
        s.classList.add('active');
      } else {
        if (s.classList.contains('active')) {
          s.classList.remove('active');
          s.classList.add('leaving');
          setTimeout(() => s.classList.remove('leaving'), 700);
        }
      }
    });

    dots.forEach(d => d.classList.remove('active'));
    dots[index + 1].classList.add('active');

    revealContent(slides[index + 1]);
    navbar.classList.add('scrolled');
  }
}

// ── Main scroll handler ───────────────────────────────────────
function onScroll() {
  const track = document.querySelector('.scroll-track');
  const maxScroll = track.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;

  const p = Math.min(window.scrollY / maxScroll, 1); // 0→1

  if (p < HERO_ZONE) {
    // Hero reveal zone
    const heroProgress = p / HERO_ZONE; // 0→1 within hero
    updateHeroReveal(heroProgress);

    if (currentSection !== -1) {
      activateSlide(-1);
      // Make hero slide active again
      const heroSlide = document.getElementById('slide-hero');
      heroSlide.classList.add('active');
    }
  } else {
    // Content slides
    // Map p from HERO_ZONE→1 to 0→3 (4 slides)
    const slideP = (p - HERO_ZONE) / (1 - HERO_ZONE);
    const index = Math.min(Math.floor(slideP * 4), 3);

    if (index !== currentSection) activateSlide(index);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Dot + nav clicks ──────────────────────────────────────────
function jumpToSlide(index) {
  // index 0 = hero, 1 = about, 2 = exp, 3 = proj, 4 = contact
  const track = document.querySelector('.scroll-track');
  let target;
  if (index === 0) {
    target = 0;
  } else {
    // slide index in content: 1→about, 2→exp, 3→proj, 4→contact
    const contentIndex = index - 1; // 0-3
    const p = HERO_ZONE + (contentIndex / 4) * (1 - HERO_ZONE) + 0.01;
    target = p * (track.scrollHeight - window.innerHeight);
  }
  window.scrollTo({ top: target, behavior: 'smooth' });
}

dots.forEach(dot => {
  dot.addEventListener('click', () => jumpToSlide(parseInt(dot.dataset.slide)));
});

document.querySelectorAll('[data-slide]').forEach(el => {
  el.addEventListener('click', e => {
    if (el.tagName.toLowerCase() === 'a') e.preventDefault();
    jumpToSlide(parseInt(el.dataset.slide));
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

// ── Experience accordion ──────────────────────────────────────
document.querySelectorAll('.experience-card').forEach(card => {
  card.querySelector('.experience-header').addEventListener('click', () => {
    const expanded = card.getAttribute('data-expanded') === 'true';
    document.querySelectorAll('.experience-card').forEach(c => c.setAttribute('data-expanded', 'false'));
    card.setAttribute('data-expanded', String(!expanded));
  });
});

// ── EmailJS ───────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

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
// Prepare content slides
slides.slice(1).forEach(s => prepareSlide(s));

// Split words inside hero text groups too
heroGroups.slice(0, 3).forEach(g => splitWords(g));

// Hero slide visible but all groups hidden (scroll will reveal)
slides[0].classList.add('active');
dots[0].classList.add('active');

// ── Console easter egg ────────────────────────────────────────
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect: rutwijpatil25@gmail.com', 'font-size: 14px; color: #cbd5e1;');
