import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PALETTE = ["#D4AF7A", "#BC08D3", "#973EF7", "#C452F9"];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

// Deterministic pseudo-random in [0, 1) from a float seed.
function hash(x) {
  const s = Math.sin(x * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}

function rotateY(x, z, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c + z * s, z: -x * s + z * c };
}

// A filled ball, not just a hollow shell — points spread through the whole
// volume (cbrt(random) radius keeps that fill uniform), slowly spinning so
// it reads as a rotating sphere rather than a flat disc.
function sphereShape(u, t) {
  const cosTheta = hash(u + 0.113) * 2 - 1;
  const theta = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
  const phi = hash(u + 0.911) * Math.PI * 2;
  const r = Math.cbrt(hash(u + 0.417));

  const x = r * Math.sin(theta) * Math.cos(phi);
  const y = r * Math.sin(theta) * Math.sin(phi);
  const z = r * Math.cos(theta);

  const spun = rotateY(x, z, t * 0.25);
  return { x: spun.x, y, z: spun.z };
}

function spiralShape(u, t) {
  const turns = 2.4;
  const angle = u * Math.PI * 2 * turns + t * 0.22;
  const r = 0.08 + u * 0.92;
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function dnaShape(u, t, strand) {
  const y = (u - 0.5) * 2;
  const angle = u * Math.PI * 7 + t * 0.7 + strand * Math.PI;
  return { x: Math.sin(angle) * 0.55, y, z: Math.cos(angle) * 0.3 };
}

// A solid, filled cube — points spread through the whole box volume
// (independent uniform x/y/z) instead of tracing just the 12 edges —
// tilted and slowly spun around Y for a rotating-block feel.
function cubeShape(u, t) {
  const x = hash(u + 0.271) * 2 - 1;
  const y = hash(u + 0.638) * 2 - 1;
  const z = hash(u + 0.954) * 2 - 1;

  const tiltX = 0.5;
  const cosT = Math.cos(tiltX);
  const sinT = Math.sin(tiltX);
  const y1 = y * cosT - z * sinT;
  const z1 = y * sinT + z * cosT;

  const spun = rotateY(x, z1, t * 0.35);
  return { x: spun.x * 0.75, y: y1 * 0.75, z: spun.z * 0.75 };
}

const SHAPES = { sphere: sphereShape, spiral: spiralShape, dna: dnaShape, cube: cubeShape };
const SHAPE_KEYS = Object.keys(SHAPES);

// Each <section> declares its own look via data-particle-shape/-side
// attributes, read straight off the DOM — no fixed array to keep in sync
// with whichever page (route) happens to be mounted.
function readSectionConfig(el, index) {
  const shape = el.dataset.particleShape;
  const side = el.dataset.particleSide;
  return {
    shape: SHAPE_KEYS.includes(shape) ? shape : SHAPE_KEYS[index % SHAPE_KEYS.length],
    side: side === "left" || side === "right" ? side : index % 2 === 0 ? "right" : "left",
  };
}

const PARTICLE_COUNT = 4800;
const DIGITS = ["0", "1"];
const TRANSITION_MS = 1200;

function sectionPoint(cfg, p, t, vw, vh, scale) {
  const cx = cfg.side === "right" ? vw * 0.76 : vw * 0.24;
  const cy = vh * 0.5;
  const pt = SHAPES[cfg.shape](p.u, t, p.strand);
  const depth = pt.z !== undefined ? 1 + pt.z * 0.18 : 1;
  return {
    x: cx + pt.x * scale * depth,
    y: cy + pt.y * scale * depth,
    z: pt.z ?? 0,
  };
}

export default function ParticleField() {
  const canvasRef = useRef(null);
  const collectRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles = [];
    let sections = [];
    let vw = 0;
    let vh = 0;
    let frameId = null;
    let running = true;

    // Only ever interpolate between the section we just left and the one
    // we're entering — never a weighted sum across all sections — and do
    // it on a fixed clock, not tied to scroll pixels, so the swarm visibly
    // travels from one side/shape to the other over ~1.2s instead of
    // snapping or blending several shapes together on tall viewports.
    let currentIndex = 0;
    let previousIndex = 0;
    let transitionStart = -Infinity;

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        u: i / PARTICLE_COUNT,
        strand: i % 2,
        phase: Math.random() * Math.PI * 2,
        freq: 0.5 + Math.random() * 0.7,
        wobble: 2 + Math.random() * 5,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        rBase: 0.9 + Math.random() * 1.4,
        glow: i % 9 === 0,
        char: i % 11 === 0 ? DIGITS[i % 2] : null,
      }));
    }

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function collectSections() {
      const els = Array.from(document.querySelectorAll("main > section"));
      sections = els.map((el, i) => ({ el, ...readSectionConfig(el, i) }));
      currentIndex = Math.min(currentIndex, Math.max(0, sections.length - 1));
      previousIndex = currentIndex;
    }

    function pickDominantSection() {
      const centerY = vh / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].el.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom >= centerY) return i;
        const dist = rect.top > centerY ? rect.top - centerY : centerY - rect.bottom;
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      return best;
    }

    function updateDominant(now) {
      if (!sections.length) return;
      const winner = pickDominantSection();
      if (winner !== currentIndex) {
        previousIndex = currentIndex;
        currentIndex = winner;
        transitionStart = now;
      }
    }

    function drawFrame(now) {
      const t = now * 0.001;
      ctx.clearRect(0, 0, vw, vh);
      if (!sections.length) return;

      const elapsed = now - transitionStart;
      const blend = TRANSITION_MS > 0 ? easeInOutCubic(Math.min(1, Math.max(0, elapsed / TRANSITION_MS))) : 1;
      const cfgA = sections[previousIndex] ?? sections[0];
      const cfgB = sections[currentIndex] ?? sections[0];
      const scale = Math.min(vw * 0.46, vh * 0.5);
      const blending = blend < 1 && previousIndex !== currentIndex;

      for (const p of particles) {
        const b = sectionPoint(cfgB, p, t, vw, vh, scale);
        let x = b.x;
        let y = b.y;
        let z = b.z;

        if (blending) {
          const a = sectionPoint(cfgA, p, t, vw, vh, scale);
          x = lerp(a.x, b.x, blend);
          y = lerp(a.y, b.y, blend);
          z = lerp(a.z, b.z, blend);
        }

        const wobbleX = Math.sin(t * p.freq + p.phase) * p.wobble;
        const wobbleY = Math.cos(t * p.freq * 1.3 + p.phase) * p.wobble;
        const twinkle = 0.75 + 0.25 * Math.sin(t * 1.6 + p.phase * 2);
        const depthAlpha = 0.55 + z * 0.3;

        // A soft, flat dust texture reads closer to the reference than a
        // glowing neon swarm — shadowBlur stays off for almost everyone,
        // dots render as small squares instead of circles, and alpha stays
        // low enough that the shape emerges from density, not brightness.
        ctx.shadowBlur = p.glow ? 4 : 0;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = Math.max(0.18, Math.min(0.85, twinkle * depthAlpha));

        if (p.char) {
          const size = 6 + p.rBase * 2.5;
          ctx.font = `${size}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.char, x + wobbleX, y + wobbleY);
        } else {
          const s = p.rBase * 1.6;
          ctx.fillRect(x + wobbleX - s / 2, y + wobbleY - s / 2, s, s);
        }
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    function step(now) {
      updateDominant(now);
      drawFrame(now);
      if (running) frameId = requestAnimationFrame(step);
    }

    initParticles();
    resize();
    collectRef.current = collectSections;
    collectSections();
    const collectTimeout = setTimeout(collectSections, 60);

    window.addEventListener("resize", resize);

    if (reduceMotion) {
      drawFrame(0);
    } else {
      frameId = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(collectTimeout);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ParticleField lives outside <Routes> and never remounts across page
  // navigations, but the <section> elements underneath it are swapped out
  // completely — re-scan the DOM whenever the route changes so the swarm
  // picks up the new page's sections instead of animating toward stale,
  // detached ones.
  useEffect(() => {
    const id = setTimeout(() => collectRef.current?.(), 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0" />
  );
}
