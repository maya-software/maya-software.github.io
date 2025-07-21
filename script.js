// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const themeToggle = document.getElementById("theme-toggle");

  // Theme toggle functionality
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Update theme toggle icon based on current theme
  function updateThemeIcon() {
    const icon = themeToggle.querySelector("i");
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }

  // Initialize theme icon
  updateThemeIcon();

  // Screenshot theme toggle functionality
  const screenshotToggleBtns = document.querySelectorAll(".toggle-btn");
  const lightScreenshot = document.querySelector(".app-screenshot.light-mode");
  const darkScreenshot = document.querySelector(".app-screenshot.dark-mode");

  screenshotToggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme");

      // Update active button
      screenshotToggleBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Toggle screenshots
      if (theme === "light") {
        lightScreenshot.style.opacity = "1";
        darkScreenshot.style.opacity = "0";
      } else {
        lightScreenshot.style.opacity = "0";
        darkScreenshot.style.opacity = "1";
      }
    });
  });

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon();
  });

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll("span");
    spans.forEach((span, index) => {
      span.style.transform = navMenu.classList.contains("active")
        ? `rotate(${index === 0 ? "45deg" : index === 1 ? "0deg" : "-45deg"}) ${
            index === 1 ? "scale(0)" : ""
          }`
        : "none";
    });
  });

  // Close mobile menu when link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const spans = navToggle.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transform = "none";
      });
    });
  });

  // Navbar scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop;
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .stat-item, .tech-category, .contact-item"
  );
  animateElements.forEach((el) => observer.observe(el));

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.");
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }

  // Parallax effect for hero background orbs
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".gradient-orb");

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Typing effect for hero title (optional enhancement)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Counter animation for statistics
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent =
          Math.floor(start) +
          (element.textContent.includes("%")
            ? "%"
            : element.textContent.includes("/")
            ? "/7"
            : "+");
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent =
          target +
          (element.textContent.includes("%")
            ? "%"
            : element.textContent.includes("/")
            ? "/7"
            : "+");
      }
    }
    updateCounter();
  }

  // Trigger counter animation when stats section is visible
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll(".stat-number");
          statNumbers.forEach((stat) => {
            const text = stat.textContent;
            let target = parseInt(text);

            if (text.includes("100%")) target = 100;
            else if (text.includes("50+")) target = 50;
            else if (text.includes("24/7")) target = 24;

            animateCounter(stat, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".about-stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Product showcase interaction
  const productCards = document.querySelectorAll(".floating-card");
  productCards.forEach((card, index) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(10deg) scale(1.05)";
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.zIndex = "";
    });
  });

  // Service cards hover effect enhancement
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".service-icon");
      icon.style.transform = "scale(1.1) rotate(5deg)";
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".service-icon");
      icon.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // Technology items interaction
  const techItems = document.querySelectorAll(".tech-item");
  techItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Create a ripple effect
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(188, 156, 34, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.width = "100px";
      ripple.style.height = "100px";
      ripple.style.marginLeft = "-50px";
      ripple.style.marginTop = "-50px";

      this.style.position = "relative";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation CSS
  const style = document.createElement("style");
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Phone mockup interaction
  const phoneMockup = document.querySelector(".phone-mockup");
  if (phoneMockup) {
    phoneMockup.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotateY(-5deg)";
    });

    phoneMockup.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotateY(0deg)";
    });
  }

  // App tabs interaction in phone mockup
  const appTabs = document.querySelectorAll(".tab");
  appTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      appTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Lazy loading for images (if any are added later)
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });

  // Add easter egg - Konami code
  let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Easter egg activated!
        document.body.style.animation = "rainbow 2s infinite";
        setTimeout(() => {
          document.body.style.animation = "";
        }, 5000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Add rainbow animation for easter egg
  const rainbowStyle = document.createElement("style");
  rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
  document.head.appendChild(rainbowStyle);

  // Performance optimization: Throttle scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Apply throttling to scroll events
  window.addEventListener(
    "scroll",
    throttle(function () {
      // Any additional scroll-based functionality can go here
    }, 16)
  ); // ~60fps

  console.log("Maya Software website loaded successfully! 🚀");
});
