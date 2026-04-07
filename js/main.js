// ===========================
// Sticky Stacked Cards Portfolio
// ===========================

const heroGroups = Array.from(document.querySelectorAll('.hero-group'));

// ── Word splitter ─────────────────────────────────────────────
function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  el.innerHTML = el.textContent
    .split(/(\s+)/)
    .map(chunk => chunk.trim() ? `<span class="word">${chunk}</span>` : chunk)
    .join('');
}

// ── Hero: scroll-driven word reveal ──────────────────────────
// Hero gets 200vh — scroll through it reveals groups 0-5
function initHeroReveal() {
  heroGroups.slice(0, 3).forEach(g => splitWords(g));

  const hero = document.getElementById('section-hero');
  const GROUP_COUNT = heroGroups.length; // 6

  function update() {
    const rect = hero.getBoundingClientRect();
    const scrolled = -rect.top;
    const total = hero.offsetHeight;
    // Only start revealing after user has scrolled at least 40px
    const progress = Math.min(Math.max((scrolled - 40) / (total * 0.8), 0), 1);

    heroGroups.forEach((group, i) => {
      // Spread groups across 0.05 → 1.0 so group 0 needs real scroll
      const threshold = 0.05 + (i / GROUP_COUNT) * 0.95;
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
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ── Content sections: IntersectionObserver reveal ────────────
const WORD_SELECTORS = '.section-tag, .section-title, .about-text, .skills-title, .contact-description';
const BLOCK_SELECTORS = '.skill-card, .experience-card, .project-card, .highlight-item, .contact-item, .contact-form-wrapper';

function initSectionReveal(sectionEl) {
  // Split and collect all items in DOM order
  const items = [];

  sectionEl.querySelectorAll(WORD_SELECTORS).forEach(el => {
    splitWords(el);
    el.querySelectorAll('.word').forEach(w => items.push(w));
  });

  sectionEl.querySelectorAll(BLOCK_SELECTORS).forEach(el => {
    el.classList.add('slide-block');
    items.push(el);
  });

  // Only reveal after page has had a chance to settle (not on initial load)
  let ready = false;
  setTimeout(() => { ready = true; }, 300);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && ready) {
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('revealed'), i * 35);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(sectionEl);
}

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
initHeroReveal();

document.querySelectorAll('.card-section:not(#section-hero)').forEach(s => {
  initSectionReveal(s);
});

// ── Console easter egg ────────────────────────────────────────
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect: rutwijpatil25@gmail.com', 'font-size: 14px; color: #cbd5e1;');
