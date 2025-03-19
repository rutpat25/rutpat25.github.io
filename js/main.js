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

// Form submission handling
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form values
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // In a real implementation, you would send this data to a server
  // For GitHub Pages, you could use a service like Formspree or EmailJS

  // For now, just show an alert
  alert(`Thank you for your message, ${name}! I'll get back to you soon.`)

  // Reset the form
  this.reset()
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

