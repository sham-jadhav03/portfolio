import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "portfolio.sound";

export default function SoundToggle() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      return false;
    }
  });

  const enabledRef = useRef(enabled);
  const contextRef = useRef<AudioContext | null>(null);
  const lastClickRef = useRef(0);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!enabledRef.current) return;

      const target = e.target as Element | null;
      if (!target || !target.closest(".proj, .rail a, .mobile-menu a")) return;

      const now = performance.now();
      if (now - lastClickRef.current < 40) return;
      lastClickRef.current = now;

      let ctx = contextRef.current;
      if (!ctx) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (Ctx) ctx = new Ctx();
        contextRef.current = ctx;
      }
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();

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

    document.addEventListener("mouseover", onClick);
    return () => document.removeEventListener("mouseover", onClick);
  }, []);

  function toggle() {
    setEnabled((value) => {
      const next = !value;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <button
      id="sound-toggle"
      className="sound-toggle mono"
      type="button"
      aria-pressed={enabled}
      aria-label="Enable or disable hover sounds"
      onClick={toggle}
    >
      {enabled ? "sound: on" : "sound: off"}
    </button>
  );
}