import { useEffect, useRef, useState } from "react";
import ParticleText from "./ParticleText";

const GATHER_DURATION = 3200;
const STAGGER = 800;
const GATHER_MS = GATHER_DURATION + STAGGER; // ~4s until the name is fully assembled
const HOLD_MS = 2000; // keeps the name on screen for a total of 6s before it explodes
const EXPLODE_MS = 4000; // how long the burst takes to fly apart and fade

const BURST_COLORS = ["#e7e4f5", "#BC08D3", "#973EF7", "#D4AF7A"];

// A one-shot full-viewport particle burst: spawns near the screen center
// (where the assembled name just was) and sends particles flying outward in
// every direction, fading out as they travel. Runs on its own canvas so it
// isn't limited to the narrow box ParticleText renders the name into.
function ExplosionBurst({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = w / 2;
    const cy = h / 2;
    const particles = Array.from({ length: 320 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 2.4;
      return {
        x: cx + (Math.random() - 0.5) * 320,
        y: cy + (Math.random() - 0.5) * 70,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.4 + Math.random() * 2.6,
        color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      };
    });

    const start = performance.now();
    let raf;

    function tick(now) {
      const t = Math.min(1, (now - start) / EXPLODE_MS);
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = Math.max(0, 1 - t);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.012;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        onDone?.();
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" aria-hidden="true" />;
}

export default function IntroSplash() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("gather"); // "gather" | "exploding"

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(id);
    }
    const explodeTimer = setTimeout(() => setPhase("exploding"), GATHER_MS + HOLD_MS);
    return () => clearTimeout(explodeTimer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-bg px-6">
      {phase === "gather" ? (
        <div className="w-full max-w-4xl" style={{ height: 300 }}>
          <ParticleText
            text="Lizeth Andrea Caro Silva"
            particleSize={2.2}
            density={4}
            color="#e7e4f5"
            highlightColor="#BC08D3"
            scatter={190}
            gatherDuration={GATHER_DURATION}
            stagger={STAGGER}
            pointerRepel={42}
            repelRadius={120}
            idleDrift={0.8}
            trigger="mount"
            fontSize="clamp(2rem, 7vw, 4.5rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
          />
        </div>
      ) : (
        <ExplosionBurst onDone={() => setVisible(false)} />
      )}
    </div>
  );
}
