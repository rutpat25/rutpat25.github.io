// ===========================
// Scroll-Driven Portfolio
// ===========================

// ── Layout constants ──────────────────────────────────────────
// Total scroll track: 800vh
// Zone 0:   0%  → 25%   = Hero (200vh)
// Zone 1:  25%  → 43.75% = About (150vh)
// Zone 2: 43.75% → 62.5% = Experience (150vh)
// Zone 3: 62.5% → 81.25% = Projects (150vh)
// Zone 4: 81.25% → 100%  = Contact (150vh)

const HERO_ZONE_END = 0.25;
const CONTENT_ZONES = [
  { start: 0.25,   end: 0.4375 },  // About
  { start: 0.4375, end: 0.625  },  // Experience
  { start: 0.625,  end: 0.8125 },  // Projects
  { start: 0.8125, end: 1.0    },  // Contact
];

const slides     = Array.from(document.querySelectorAll('.slide'));
const dots       = Array.from(document.querySelectorAll('.dot'));
const navbar     = document.querySelector('.navbar');
const heroGroups = Array.from(document.querySelectorAll('.hero-group'));

let currentSection = -1; // -1 = hero, 0-3 = content slides

// ── Word splitter ─────────────────────────────────────────────
function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  el.innerHTML = el.textContent
    .split(/(\s+)/)
    .map(chunk => chunk.trim() ? `<span class="word">${chunk}</span>` : chunk)
    .join('');
}

// ── Build scroll-reveal groups for each content slide ────────
// Each element tagged with data-reveal-group="N" will reveal
// when scroll progress through that slide's zone passes N/totalGroups

function buildSlideGroups(slideEl) {
  // Collect all animatable elements in DOM order
  const allItems = [];

  // Section header words
  slideEl.querySelectorAll('.section-tag, .section-title').forEach(el => {
    splitWords(el);
    el.querySelectorAll('.word').forEach(w => allItems.push({ el: w, type: 'word' }));
  });

  // Body text words
  slideEl.querySelectorAll('.about-text, .skills-title, .contact-description').forEach(el => {
    splitWords(el);
    el.querySelectorAll('.word').forEach(w => allItems.push({ el: w, type: 'word' }));
  });

  // Block elements (cards, items, form)
  slideEl.querySelectorAll(
    '.skill-card, .experience-card, .project-card, .highlight-item, .contact-item, .contact-form-wrapper'
  ).forEach(el => allItems.push({ el, type: 'block' }));

  // Tag each item with its reveal threshold (0→1 within the slide zone)
  const total = allItems.length;
  allItems.forEach((item, i) => {
    item.threshold = total > 1 ? i / (total - 1) * 0.85 : 0; // spread across 0→85% of zone
    item.el.dataset.revealThreshold = item.threshold;
    item.el.classList.remove('revealed');
    // Ensure base hidden styles
    if (item.type === 'word') {
      item.el.classList.add('word');
    } else {
      item.el.classList.add('slide-block');
    }
  });

  return allItems;
}

// Store item lists per slide index (0=about, 1=exp, 2=proj, 3=contact)
const slideItems = [null, null, null, null];

function prepareAllSlides() {
  slides.slice(1).forEach((slideEl, i) => {
    slideItems[i] = buildSlideGroups(slideEl);
  });
}

// ── Update a content slide's reveal based on progress ────────
function updateSlideReveal(slideIndex, progress) {
  // progress = 0→1 within this slide's zone
  const items = slideItems[slideIndex];
  if (!items) return;

  items.forEach(item => {
    if (progress >= item.threshold) {
      item.el.classList.add('revealed');
    } else {
      item.el.classList.remove('revealed');
    }
  });
}

// ── Hero scroll reveal ────────────────────────────────────────
function updateHeroReveal(progress) {
  // 6 groups, each unlocks at i/6 of hero progress
  const GROUP_COUNT = 6;
  heroGroups.forEach((group, i) => {
    const threshold = i / GROUP_COUNT;
    if (progress >= threshold) {
      group.classList.add('revealed');
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

  // Navbar fades in after hero is fully revealed
  if (progress >= 0.95) {
    navbar.classList.remove('navbar-hidden');
    navbar.classList.add('navbar-visible');
  } else {
    navbar.classList.add('navbar-hidden');
    navbar.classList.remove('navbar-visible');
  }
}

// ── Slide visibility (just opacity/transform, no content reveal) ─
function setActiveSlide(index) {
  // index: -1=hero, 0-3=content
  if (index === currentSection) return;
  const prev = currentSection;
  currentSection = index;

  const heroSlide = document.getElementById('slide-hero');

  if (index === -1) {
    slides.forEach(s => {
      s.classList.remove('active');
      s.classList.add('leaving');
    });
    setTimeout(() => slides.forEach(s => s.classList.remove('leaving')), 700);
    heroSlide.classList.add('active');
    dots.forEach(d => d.classList.remove('active'));
    dots[0].classList.add('active');
  } else {
    slides.forEach((s, i) => {
      const isTarget = i === index + 1; // +1: slides[0]=hero, slides[1]=about
      if (isTarget) {
        s.classList.remove('leaving');
        s.classList.add('active');
      } else if (s.classList.contains('active')) {
        s.classList.remove('active');
        s.classList.add('leaving');
        setTimeout(() => s.classList.remove('leaving'), 700);
      }
    });
    dots.forEach(d => d.classList.remove('active'));
    dots[index + 1].classList.add('active');
    navbar.classList.add('scrolled');
  }
}

// ── Main scroll handler ───────────────────────────────────────
function onScroll() {
  const track = document.querySelector('.scroll-track');
  const maxScroll = track.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;

  const p = Math.min(window.scrollY / maxScroll, 1);

  if (p < HERO_ZONE_END) {
    // Hero zone
    const heroP = p / HERO_ZONE_END;
    updateHeroReveal(heroP);
    setActiveSlide(-1);
    document.getElementById('slide-hero').classList.add('active');
  } else {
    // Content zones
    CONTENT_ZONES.forEach((zone, i) => {
      if (p >= zone.start && p < zone.end) {
        const zoneP = (p - zone.start) / (zone.end - zone.start); // 0→1 within zone
        setActiveSlide(i);
        updateSlideReveal(i, zoneP);
      }
    });

    // Edge: last slide at exactly 100%
    if (p >= CONTENT_ZONES[3].start) {
      const zoneP = (p - CONTENT_ZONES[3].start) / (1 - CONTENT_ZONES[3].start);
      setActiveSlide(3);
      updateSlideReveal(3, Math.min(zoneP, 1));
    }
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── Dot + nav clicks ──────────────────────────────────────────
function jumpToSlide(index) {
  const track = document.querySelector('.scroll-track');
  const maxScroll = track.scrollHeight - window.innerHeight;
  let p;
  if (index === 0) {
    p = 0;
  } else {
    const zone = CONTENT_ZONES[index - 1];
    p = zone.start + 0.01;
  }
  window.scrollTo({ top: p * maxScroll, behavior: 'smooth' });
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
// Split hero text groups
heroGroups.slice(0, 3).forEach(g => splitWords(g));

// Build reveal item lists for all content slides
prepareAllSlides();

// Hero slide active on load, all groups hidden
slides[0].classList.add('active');
dots[0].classList.add('active');

// ── Console easter egg ────────────────────────────────────────
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect: rutwijpatil25@gmail.com', 'font-size: 14px; color: #cbd5e1;');
