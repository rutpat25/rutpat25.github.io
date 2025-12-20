// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: false,
  mirror: true,
})

// Initialize Swiper
const projectsSwiper = new Swiper(".projects-slider", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
})

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenuClose = document.querySelector(".mobile-menu-close")
const mobileMenu = document.querySelector(".mobile-menu")
const body = document.body

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active")
  body.style.overflow = "hidden"
})

mobileMenuClose.addEventListener("click", () => {
  mobileMenu.classList.remove("active")
  body.style.overflow = "auto"
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    body.style.overflow = "auto"
  })
})

// Skills tabs
const skillsTabs = document.querySelectorAll(".skills-tab")
const skillsTabPanes = document.querySelectorAll(".skills-tab-pane")

skillsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Remove active class from all tabs
    skillsTabs.forEach((t) => t.classList.remove("active"))

    // Add active class to clicked tab
    tab.classList.add("active")

    // Hide all tab panes
    skillsTabPanes.forEach((pane) => pane.classList.remove("active"))

    // Show the corresponding tab pane
    const tabId = tab.getAttribute("data-tab")
    document.getElementById(`${tabId}-tab`).classList.add("active")

    // Animate skill bars in the active tab
    animateSkillBars()
  })
})

// Animate skill bars
function animateSkillBars() {
  const activeTabPane = document.querySelector(".skills-tab-pane.active")
  const skillBars = activeTabPane.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    bar.style.width = "0"

    setTimeout(() => {
      bar.style.width = `${progress}%`
    }, 100)
  })
}

// EmailJS Configuration
// To use this form, you need to:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{message}}
// 4. Replace 'YOUR_PUBLIC_KEY', 'YOUR_SERVICE_ID', and 'YOUR_TEMPLATE_ID' below with your actual values

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID

// Initialize EmailJS (only if credentials are configured)
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Form submission handling
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  const submitButton = this.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  // Check if EmailJS is configured
  if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    // Fallback to mailto if EmailJS is not configured
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:rutwijpatil25@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;

    alert(`Opening your email client... Alternatively, you can email directly at rutwijpatil25@gmail.com`);
    this.reset();
    return;
  }

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

  // Prepare template parameters
  const templateParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  // Send email using EmailJS
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert(`Thank you for your message, ${templateParams.from_name}! I'll get back to you soon.`);
      document.getElementById("contact-form").reset();

      // Reset button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }, function(error) {
      console.log('FAILED...', error);
      alert('Oops! Something went wrong. Please try emailing directly at rutwijpatil25@gmail.com');

      // Reset button
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    });
})

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") return
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for header height
        behavior: "smooth",
      })
    }
  })
})

// Scroll sections active link
function scrollActive() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const header = document.querySelector(".header")

  // Add scrolled class to header when scrolled
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  let currentSection = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })

  mobileNavLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

// Scroll reveal function
function scrollReveal() {
  const sections = document.querySelectorAll(".scroll-section")
  const revealElements = document.querySelectorAll(".reveal-element")

  // Reveal sections
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add("active")
    } else {
      section.classList.remove("active")
    }
  })

  // Reveal elements
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight
    const delay = element.getAttribute("data-delay") || 0

    if (elementTop < windowHeight * 0.85) {
      setTimeout(() => {
        element.classList.add("active")
      }, delay)
    } else {
      element.classList.remove("active")
    }
  })
}

// Parallax effect for particles
window.addEventListener("mousemove", (e) => {
  const particles = document.querySelectorAll(".particle")
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  particles.forEach((particle, index) => {
    const speed = 0.01 + index * 0.01
    const x = (mouseX - 0.5) * speed * 100
    const y = (mouseY - 0.5) * speed * 100

    particle.style.transform = `translate(${x}px, ${y}px)`
  })
})

// Initial calls
animateSkillBars()
scrollActive()
scrollReveal()

// Event listeners
window.addEventListener("scroll", scrollActive)
window.addEventListener("scroll", scrollReveal)
window.addEventListener("resize", scrollReveal)

// Typing effect for hero title (optional)
// Uncomment if you want to add a typing effect
/*
const heroTitle = document.querySelector('.hero-title .highlight');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

setTimeout(typeWriter, 1000);
*/

