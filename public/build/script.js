document.addEventListener("DOMContentLoaded", function () {
  // theme toggle function
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const icon = themeToggle.querySelector("i");

  // check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Apply theme based on saved preference or system preference
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    html.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
    document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
  }

  // toggle theme when button is clicked
  themeToggle.addEventListener("click", function () {
    html.classList.toggle("dark");

    //Update the icon
    if (html.classList.contains("dark")) {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "dark");
      document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.removeItem("theme", "light");
      document.querySelector("meta[name=theme-color]").setAttribute("content", "#0070f3");
    }
  });

  // Mobile navigation toggle
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      mobileMenu.classList.add("translate-x-0");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("translate-x-full");
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Tutup menu mobile setelah klik link
          mobileMenu.classList.remove("translate-x-0");
          mobileMenu.classList.add("translate-x-full");
        }
      });
    });
  });

  // form submission hadling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const massage = document.getElementById("massage").value;

      // Here you typically send the form data to your server
      // For demo purposes, we'll just log it and show a success message
      console.log("Form submitted:", {
        name: name,
        email: email,
        massage: massage,
      });
      // Show success message
      const button = contactForm.querySelector("button[type='submit']");
      const originalText = button.textContent;
      button.textContent = "Massage Sent!";

      // Reset form
      contactForm.reset();

      // restore button text after delay
      setTimeout(() => {
        button.textContent = originalText;
      }, 3000);
    });
  }

  // Add scroll events for header shadow and reveral animations
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");

  function checkScroll() {
    // Header shadow
    if (window.scrollY > 0) {
      header.classList.add("shadow-md");
    } else {
      header.classList.remove("shadow-md");
    }

    // Reveral animations for sections
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        section.classList.add("opacify-100", "translate-y-0");
        section.classList.remove("opacify-0", "translate-y-4");
      } else {
        section.classList.remove("reveal");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  // run page load
  checkScroll();

  // Add intersection observer for animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacify-100", "translate-y-0");
        entry.target.classList.remove("opacify-0", "translate-y-4");
        // stop observing once the animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Terminal animation
  const terminalContainer = document.getElementById("terminal-container");
  const terminalContent = document.querySelector(".terminal-content");
  const commandSpan = document.querySelector(".command-text");

  if (terminalContainer && terminalContent && commandSpan) {
    const commandsText = "git clone https://github.com/Ardewss/personal-portfolio.git";

    let i = 0;

    const typeCommand = () => {
      if (i < commandsText.length) {
        commandSpan.textContent += commandsText.charAt(i);
        i++;
        setTimeout(typeCommand, 50);
      } else {
        // add blinking cursor after typing
        const cursor = document.createElement("span");
        cursor.className = "inline-block w-2 h-5 bg-gray-900 ml-1 animate-blink align-middle";
        terminalContainer.appendChild(cursor);
      }
    };

    // start tying after a delay
    setTimeout(typeCommand, 1000);
  } else {
    // Fallback for original terminal structures
    const terminal = document.querySelector(".terminal-body");
    if (terminal) {
      const commandsText = this.querySelector(".command").textContent;
      terminal.querySelector(".command").textContent = "";

      let i = 0;
      const typeCommand = () => {
        if (i < commandsText.length) {
          terminal.querySelector(".command").textContent += commandsText.charAt(i);
          i++;
          setTimeout(typeCommand, 50);
        } else {
          // add blinking cursor
          terminal.querySelector(".command").innerHTML("afterend", ",<span class='animate-blink'>_</span>");
        }
      };
      // start typing after a delay
      setTimeout(typeCommand, 1000);
    }
  }
});
