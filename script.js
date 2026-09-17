// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// IntersectionObserver reveal animation
if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        entry.target.style.animationDelay = `${index * 0.06}s`;
        entry.target.classList.add("rv");
        entry.target.style.opacity = "";

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -4% 0px",
    },
  );

  document
    .querySelectorAll(
      "section > .sec-head, .about > *, .build-item, .proj, .skill, .beyond-item, .contact > *",
    )
    .forEach((element) => {
      element.style.opacity = "0";
      revealObserver.observe(element);
    });
}

// ScrollSpy navigation indicator
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(
  ".rail .vert a, .rail .dot, .mobile-menu a",
);

if ("IntersectionObserver" in window && sections.length > 0) {
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
              link.setAttribute("aria-current", "page");
            } else if (href && href.startsWith("#")) {
              link.classList.remove("active");
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "-20% 0px -50% 0px",
    },
  );

  sections.forEach((section) => spyObserver.observe(section));
}

// Mobile navigation toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener("click", () => {
    const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
      mobileToggle.focus();
    }
  });
}
