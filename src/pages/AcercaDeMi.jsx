import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import Experience from "../components/Experience";
import GithubActivity from "../components/GithubActivity";
import GradientBorder from "../components/ui/GradientBorder";
import useTypewriterCycle from "../hooks/useTypewriterCycle";
import { asset } from "../lib/asset";
import { profile, techStack } from "../data/portfolio";

const socials = [
  { Icon: HiOutlineMail, href: `mailto:${profile.email}`, label: "Email" },
  { Icon: FaLinkedinIn, href: profile.linkedin, label: "LinkedIn" },
  { Icon: FaGithub, href: profile.github, label: "GitHub" },
];

const BULB_COUNT = 8;
const BULB_STEP = 3; // coprime-ish with techStack.length so positions rarely repeat a skill together
const BULB_SWAP_FADE_MS = 5000; // full disappear-then-reappear episode per badge
const BULB_SWAP_HALF_MS = BULB_SWAP_FADE_MS / 2;
const BULB_REVEAL_TOTAL_MS = 10000; // full progressive appearance sweep
const BULB_REVEAL_STEP_MS = BULB_REVEAL_TOTAL_MS / BULB_COUNT;
const BULB_REVEAL_DURATION_MS = 1500; // slow individual fade-in

// Skills change one at a time, in sequence around the curve, each fading out
// then back in with a new icon. The swap is driven by the browser's own
// `transitionend` event (not a guessed setTimeout), so the content only ever
// changes at the exact instant a badge is fully faded out — never before.
// Gated by `enabled` so it never races the initial staggered reveal.
function useBulbSequentialCycle(enabled) {
  const [swapCounts, setSwapCounts] = useState(() =>
    Array.from({ length: BULB_COUNT }, (_, i) => i * BULB_STEP),
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState("idle"); // "idle" | "out" | "in"

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => {
      setActiveIndex(0);
      setPhase("out");
    }, 0);
    return () => clearTimeout(id);
  }, [enabled]);

  function handleOpacityTransitionEnd(i) {
    if (!enabled || i !== activeIndex) return;
    if (phase === "out") {
      setSwapCounts((counts) => {
        const copy = [...counts];
        copy[i] += BULB_COUNT;
        return copy;
      });
      setPhase("in");
    } else if (phase === "in") {
      setActiveIndex((i + 1) % BULB_COUNT);
      setPhase("out");
    }
  }

  const fadingOutIndex = phase === "out" ? activeIndex : -1;
  return { swapCounts, fadingOutIndex, onOpacityTransitionEnd: handleOpacityTransitionEnd };
}

function useBulbLayout() {
  // A gentle arc tucked into the bottom-right quadrant of the photo (10deg to
  // 82deg from the positive x-axis, so it sweeps from "mostly right" to
  // "mostly down"). Deterministic (no Math.random) so it stays a clean curve.
  return useMemo(() => {
    const angleStart = (10 * Math.PI) / 180;
    const angleEnd = (82 * Math.PI) / 180;
    return Array.from({ length: BULB_COUNT }, (_, i) => {
      const t = i / (BULB_COUNT - 1);
      const angle = angleStart + t * (angleEnd - angleStart);
      const floatDuration = 5 + (i % 3) * 0.6;
      const floatDelay = -(i * 0.4);
      const floatDistance = 8 + (i % 4) * 2;
      return {
        cos: Math.cos(angle).toFixed(4),
        sin: Math.sin(angle).toFixed(4),
        floatDuration: `${floatDuration.toFixed(2)}s`,
        floatDelay: `${floatDelay.toFixed(2)}s`,
        floatDistance: `${floatDistance.toFixed(1)}px`,
      };
    });
  }, []);
}

function useBulbReveal() {
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const showId = setTimeout(() => setVisible(true), 50);
    const settleId = setTimeout(
      () => setSettled(true),
      BULB_REVEAL_TOTAL_MS + BULB_REVEAL_DURATION_MS,
    );
    return () => {
      clearTimeout(showId);
      clearTimeout(settleId);
    };
  }, []);

  return { visible, settled };
}

export default function AcercaDeMi() {
  const role = useTypewriterCycle(profile.roles, 6000);
  const { visible: bulbVisible, settled: bulbSettled } = useBulbReveal();
  const { swapCounts, fadingOutIndex, onOpacityTransitionEnd } = useBulbSequentialCycle(bulbSettled);
  const bulbLayout = useBulbLayout();
  return (
    <>
      <section
        data-particle-shape="sphere"
        data-particle-side="right"
        className="mx-auto max-w-6xl px-5 pt-28 pb-12"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <HiOutlineArrowLeft /> Volver al inicio
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="font-display mb-3 w-full text-3xl leading-[1.05] font-extrabold whitespace-nowrap text-white sm:text-5xl lg:text-6xl">
              Soy Lizeth Caro
            </p>
            <h1 className="font-serif bg-gradient-to-r from-brand-gold to-brand-pink bg-clip-text text-5xl leading-tight font-medium text-transparent italic sm:text-5xl">
              Ingeniera de Sistemas
            </h1>

            <p className="typewriter-caret mt-4 min-h-9 text-3xl font-semibold text-white">{role}</p>
            <p className="mt-5 max-w-lg text-white/70">{profile.bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/#proyectos"
                className="inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-brand-gold to-brand-pink px-6 py-3 font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                Ver Proyectos →
              </a>
              <GradientBorder
                as="a"
                href="/#contacto"
                innerClassName="items-center justify-center gap-2 px-6 py-3 font-semibold text-white"
              >
                Contáctame
              </GradientBorder>
            </div>

            <div className="mt-7 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <GradientBorder
                  key={label}
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="h-11 w-11"
                  innerClassName="items-center justify-center text-white/80 hover:text-white"
                >
                  <Icon />
                </GradientBorder>
              ))}
            </div>
          </div>

          <div
            className="relative mx-auto w-56 [--bulb-rx:225px] [--bulb-ry:290px] sm:w-64 sm:[--bulb-rx:250px] sm:[--bulb-ry:320px]"
          >
            <img
              src={asset("/images/photo_about_specific.png")}
              alt="Lizeth Andrea Caro"
              className="relative aspect-2/3 w-full object-cover"
            />

            {bulbLayout.map((layout, i) => {
              const skill = techStack[swapCounts[i] % techStack.length];
              const shown = bulbVisible && fadingOutIndex !== i;
              return (
                <GradientBorder
                  key={i}
                  fill="glass"
                  title={skill.name}
                  className={`animate-bulb-float absolute top-1/2 left-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 transition-[opacity,filter] ease-in-out sm:h-12 sm:w-12 ${
                    shown ? "opacity-100 blur-none" : "opacity-0 blur-sm"
                  }`}
                  innerClassName="items-center justify-center"
                  onTransitionEnd={(e) => {
                    if (e.propertyName === "opacity") onOpacityTransitionEnd(i);
                  }}
                  style={{
                    top: `calc(50% + var(--bulb-ry) * ${layout.sin})`,
                    left: `calc(50% + var(--bulb-rx) * ${layout.cos})`,
                    animationDuration: layout.floatDuration,
                    animationDelay: layout.floatDelay,
                    "--float-y": layout.floatDistance,
                    transitionDuration: bulbSettled ? `${BULB_SWAP_HALF_MS}ms` : `${BULB_REVEAL_DURATION_MS}ms`,
                    transitionDelay: bulbSettled ? "0ms" : `${(i * BULB_REVEAL_STEP_MS).toFixed(0)}ms`,
                  }}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                  />
                </GradientBorder>
              );
            })}
          </div>
        </div>
      </section>
      <Experience />
      <GithubActivity />
    </>
  );
}
