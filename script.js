// IntersectionObserver reveal
const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;

      entry.target.style.animationDelay = `${index * 0.07}s`;
      entry.target.classList.add("rv");

      observerInstance.unobserve(entry.target);
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -6% 0px",
  },
);

document
  .querySelectorAll(
    "section > .sec-head, .about > *, .build-item, .proj, .skill, .beyond-item, .contact > *",
  )
  .forEach((element) => {
    element.style.opacity = "0";
    observer.observe(element);
  });

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
}
