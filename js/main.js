// Modern Portfolio JavaScript
// ===========================

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileClose = document.querySelector('.mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileToggle?.addEventListener('click', () => {
  mobileMenuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileClose?.addEventListener('click', () => {
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || !href) return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Observe skill cards, project cards, and timeline items
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
  observer.observe(el);
});

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// Initialize EmailJS if configured
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Contact Form Handler
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', async function(e) {
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Check if EmailJS is configured
  if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    // Fallback to mailto
    const mailtoLink = `mailto:rutwijpatil25@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

  try {
    // Send email via EmailJS
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      message: message
    });

    // Success
    alert(`Thanks ${name}! Your message has been sent. I'll get back to you soon!`);
    this.reset();
  } catch (error) {
    // Error
    console.error('Email send failed:', error);
    alert('Oops! Something went wrong. Please email me directly at rutwijpatil25@gmail.com');
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

// Add parallax effect to gradient orbs
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.gradient-orb');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.02;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Typing Animation for Name
const typingElement = document.querySelector('.gradient-text');
if (typingElement) {
  const originalText = 'Rutwij Patil';
  typingElement.textContent = '';

  // Add cursor
  typingElement.style.borderRight = '3px solid';
  typingElement.style.paddingRight = '5px';
  typingElement.style.animation = 'blink-cursor 0.8s step-end infinite';

  let charIndex = 0;

  function typeWriter() {
    if (charIndex < originalText.length) {
      typingElement.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100); // Typing speed (100ms per character)
    } else {
      // Keep cursor blinking after typing is complete
      typingElement.style.animation = 'blink-cursor 0.8s step-end infinite';
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// Console Easter Egg
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cLooking at the code? I like your style!', 'font-size: 14px; color: #cbd5e1;');
console.log('%cLet\'s connect: rutwijpatil25@gmail.com', 'font-size: 14px; color: #cbd5e1;');
