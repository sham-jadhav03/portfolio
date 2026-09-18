import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
}

export default function HeroSketch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl || !canvasEl.getContext) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx = canvas.getContext("2d")!;

    const reduced = prefersReducedMotion();

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
    const colors = themeColors();
    let particles: Particle[] = [];
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
      const count = Math.min(
        120,
        Math.max(30, Math.round((width * height) / 1300)),
      );
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

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onScroll() {
      energy = Math.min(3, energy + 0.18);
    }

    function onResize() {
      const wasVisible = visible;
      bounds();

      if (!visible) {
        running = false;
        return;
      }

      seed();
      if (!wasVisible) start();
      if (reduced) drawFrame();
    }

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-sketch" aria-hidden="true" />;
}