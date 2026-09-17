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
    .querySelectorAll(".about > *, .build-item, .proj, .skill, .contact > *")
    .forEach((element) => {
      element.style.opacity = "0";
      revealObserver.observe(element);
    });
}

// Kinetic character-by-character reveal for hero + section headings
function splitKinetic(heading) {
  const text = heading.textContent.replace(/\s+/g, " ").trim();
  heading.setAttribute("aria-label", text);

  let index = 0;

  function makeChar(char) {
    const span = document.createElement("span");
    span.className = "kt";
    span.textContent = char;
    span.style.setProperty("--i", String(index++));
    return span;
  }

  function makeWord(word) {
    const group = document.createElement("span");
    group.className = "kt-word";
    group.setAttribute("aria-hidden", "true");
    Array.from(word).forEach((char) => group.appendChild(makeChar(char)));
    return group;
  }

  function wrap(parent) {
    Array.from(parent.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        let buffer = "";

        Array.from(node.textContent).forEach((char) => {
          if (/\s/.test(char)) {
            if (buffer) {
              fragment.appendChild(makeWord(buffer));
              buffer = "";
            }
            fragment.appendChild(document.createTextNode(char));
          } else {
            buffer += char;
          }
        });

        if (buffer) fragment.appendChild(makeWord(buffer));
        parent.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === "BR") {
          parent.replaceChild(document.createElement("br"), node);
        } else {
          wrap(node);
        }
      }
    });
  }

  wrap(heading);
  heading.classList.add("kt-setup");
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const kineticObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("kt-in");
        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.05,
    },
  );

  document.querySelectorAll("h1, .sec-head h2").forEach((heading) => {
    splitKinetic(heading);
    if (heading.matches(".hero h1")) {
      heading.classList.add("kt-in");
    } else {
      kineticObserver.observe(heading);
    }
  });
}

// Terminal hover snippets for project cards
const TERMINAL_SNIPPETS = {
  "001": [
    ["cmd", '$ curl -X POST /api/query -d \'{"query":"how does RBAC work?"}\''],
    ["out", "→ grounded answer · page 12 · citations [12, 14]"],
    ["cmd", "$ curl /api/stats"],
    ["out", "→ tenants 3 · docs indexed 42 · latency 1.4s"],
  ],
  "002": [
    ["cmd", '$ curl -N /api/search -d \'{"query":"langgraph vs langchain"}\''],
    ["out", "data: arxiv.org → 200"],
    ["out", "data: stream open · sse chunk 1/6"],
    ["out", "data: citation #3 attached"],
  ],
  "003": [
    ["cmd", "$ socket.io client"],
    ["out", "connected :: id 9f2c · room prod-ide"],
    ["cmd", "$ container boot webcontainers"],
    ["out", "→ sandbox ready · memory 128mb"],
  ],
  "004": [
    ["cmd", "$ docker compose up -d"],
    ["out", "✔ api → jwt issued · tenant=acme"],
    ["out", "✔ mongo → replica up · auth enabled"],
    ["out", "→ rbac:admin /api/tenants 200"],
  ],
  "005": [
    ["cmd", "$ claude --watch"],
    ["out", "→ trimmed boilerplate across 12 files"],
    ["out", "→ tokens 14,208 vs 22,940 baseline"],
  ],
  "006": [
    ["cmd", "$ node editor.js portrait.png"],
    ["out", "canvas 1200×800 · preset cinematic"],
    ["out", "✓ noise reduced · output webp 214kb"],
  ],
  _fallback: [
    ["cmd", "$ git checkout main"],
    ["out", "→ already on main"],
  ],
};

function buildTerminal(proj) {
  const numberEl = proj.querySelector(".row > .mono");
  const key = (numberEl && numberEl.textContent.trim()) || "";
  const lines = TERMINAL_SNIPPETS[key] || TERMINAL_SNIPPETS._fallback;
  const desc = proj.querySelector(".desc");
  if (!desc) return;

  const term = document.createElement("div");
  term.className = "proj-term";
  term.setAttribute("aria-hidden", "true");

  const pre = document.createElement("pre");
  lines.forEach((line) => {
    const span = document.createElement("span");
    span.className = `term-line ${line[0] === "cmd" ? "term-cmd" : "term-out"}`;
    span.textContent = line[1];
    pre.appendChild(span);
  });

  const caret = document.createElement("span");
  caret.className = "term-caret";
  caret.setAttribute("aria-hidden", "true");

  term.appendChild(pre);
  term.appendChild(caret);
  desc.after(term);
}

document.querySelectorAll(".proj").forEach(buildTerminal);

// Generative hero canvas sketch
(function () {
  const canvas = document.querySelector(".hero-sketch");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function themeColors() {
    const style = getComputedStyle(document.documentElement);
    return {
      accent: style.getPropertyValue("--accent").trim(),
      ink: style.getPropertyValue("--ink").trim(),
      paper: style.getPropertyValue("--paper").trim(),
    };
  }

  let width = 0;
  let height = 0;
  let colors = themeColors();
  let particles = [];
  let visible = false;
  let running = false;
  const mouse = { x: -9999, y: -9999, active: false };
  let energy = 0;

  function bounds() {
    const rect = canvas.getBoundingClientRect();
    visible = rect.width > 0 && rect.height > 0;
    if (!visible) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    const count = Math.max(30, Math.round((width * height) / 1300));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 1.6,
      accent: Math.random() > 0.45,
    }));
  }

  function drawFrame() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = colors.paper;
    ctx.fillRect(0, 0, width, height);

    particles.forEach((p) => {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);

      if (mouse.active && dist < 110 && dist > 0.001) {
        const pull = (110 - dist) / 110;
        p.vx += (dx / dist) * pull * 0.06;
        p.vy += (dy / dist) * pull * 0.06;
      }

      if (energy > 0) {
        p.vx += (Math.random() - 0.5) * energy;
        p.vy += (Math.random() - 0.5) * energy;
      }

      p.vx *= 0.985;
      p.vy *= 0.985;

      const speed = Math.hypot(p.vx, p.vy);
      const max = 1.6;
      if (speed > max) {
        p.vx = (p.vx / speed) * max;
        p.vy = (p.vy / speed) * max;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = p.accent ? colors.accent : colors.ink;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 70) {
          ctx.strokeStyle = colors.ink;
          ctx.globalAlpha = (1 - dist / 70) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function step() {
    if (!visible) {
      running = false;
      return;
    }
    drawFrame();
    energy *= 0.94;
    requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(step);
  }

  if (reduced) {
    bounds();
    seed();
    if (visible) drawFrame();
  } else {
    bounds();
    if (visible) {
      seed();
      start();
    }
  }

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener("pointerleave", () => {
    mouse.active = false;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  window.addEventListener(
    "scroll",
    () => {
      energy = Math.min(3, energy + 0.18);
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    const wasVisible = visible;
    bounds();

    if (!visible) {
      running = false;
      return;
    }

    seed();
    if (!wasVisible) start();
    if (reduced) drawFrame();
  });
})();

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

// Hover click sound via Web Audio, muted by default
(function () {
  const toggle = document.getElementById("sound-toggle");
  if (!toggle) return;

  const STORAGE_KEY = "portfolio.sound";
  let enabled = false;
  try {
    enabled = localStorage.getItem(STORAGE_KEY) === "on";
  } catch (_err) {
    enabled = false;
  }

  let context = null;
  let lastClick = 0;

  function label() {
    toggle.textContent = enabled ? "sound: on" : "sound: off";
  }

  label();
  toggle.setAttribute("aria-pressed", String(enabled));

  function ensureContext() {
    if (!context) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) context = new Ctx();
    }
    if (context && context.state === "suspended") context.resume();
    return context;
  }

  function click() {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastClick < 40) return;
    lastClick = now;
    const ctx = ensureContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1900, t);
    oscillator.frequency.exponentialRampToValueAtTime(820, t + 0.045);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.045, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(t);
    oscillator.stop(t + 0.065);
  }

  function setEnabled(value) {
    enabled = value;
    try {
      localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    } catch (_err) {
      /* ignore */
    }
    toggle.setAttribute("aria-pressed", String(value));
    label();
    if (value) ensureContext();
  }

  toggle.addEventListener("click", () => setEnabled(!enabled));

  document
    .querySelectorAll(".proj, .rail a, .mobile-menu a")
    .forEach((node) => {
      node.addEventListener("mouseenter", click);
    });
})();
