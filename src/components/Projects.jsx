import { useEffect, useRef, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import { projects } from "../data/portfolio";
import GradientBorder from "./ui/GradientBorder";
import TechTag from "./ui/TechTag";

const PAGE_SIZE = 2;
const pages = [];
for (let i = 0; i < projects.length; i += PAGE_SIZE) {
  pages.push(projects.slice(i, i + PAGE_SIZE));
}

function ProjectCard({ proj, reverse }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
      <div className={reverse ? "sm:order-2" : ""}>
        <p className="mb-3 max-w-md text-white/80 italic">{proj.tagline}</p>
        <a
          href={proj.url}
          target="_blank"
          rel="noreferrer"
          className="block aspect-video overflow-hidden rounded-2xl"
        >
          <img
            src={proj.image}
            alt={proj.name}
            className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        </a>
      </div>

      <div className={reverse ? "sm:order-1" : ""}>
        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-brand-gold uppercase">
          <span className="h-px w-6 bg-brand-gold" /> Proyecto
        </p>
        <h3 className="font-display mt-2 text-3xl font-bold text-white">{proj.name}</h3>
        <p className="mt-4 text-white/70">{proj.description}</p>

        <ul className="mt-5 space-y-2.5">
          {proj.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-white/70">
              <span className="mt-1 text-[10px] text-brand-pink">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {proj.tags.map((tag) => (
            <TechTag key={tag} name={tag} />
          ))}
        </div>

        <a
          href={proj.url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-pink transition-colors hover:text-brand-lilac"
        >
          Ver proyecto →
        </a>
      </div>
    </div>
  );
}

const ROTATE_MS = 750;
const TOUCH_THRESHOLD = 24;

// The screen holds still while the slide transitions: while this section
// fills most of the viewport, wheel/touch scroll is intercepted and used to
// step to the next or previous page instead of moving the page itself. Once
// the transition finishes and you're at the first or last page, scrolling
// further releases the lock and the page moves on normally.
function useScrollLockSlider(count, sectionRef) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // The section can be taller than the viewport, so "in view" can't be a
    // ratio of the section's own height (that ratio would never reliably
    // reach a fixed threshold). Instead check directly: the viewport's top
    // and bottom both fall inside the section's vertical span.
    function isSectionFillingViewport() {
      const rect = el.getBoundingClientRect();
      const margin = 40;
      return rect.top <= margin && rect.bottom >= window.innerHeight - margin;
    }

    // Returns whether the page's own scroll should be blocked for this tick.
    // That's true any time there's more to reveal in this direction — even
    // while `locked` (mid-transition) — so the outer page never sneaks in a
    // scroll during the animation. Only at the very first/last page, with no
    // more room to step, do we let the native scroll through.
    function shouldCapture(deltaY) {
      if (!isSectionFillingViewport()) return false;
      if (deltaY > 0 && indexRef.current < count - 1) return true;
      if (deltaY < 0 && indexRef.current > 0) return true;
      return false;
    }

    function step(deltaY) {
      if (lockedRef.current) return;
      if (deltaY > 0 && indexRef.current < count - 1) {
        lockedRef.current = true;
        setIndex((i) => i + 1);
        setTimeout(() => {
          lockedRef.current = false;
        }, ROTATE_MS);
      } else if (deltaY < 0 && indexRef.current > 0) {
        lockedRef.current = true;
        setIndex((i) => i - 1);
        setTimeout(() => {
          lockedRef.current = false;
        }, ROTATE_MS);
      }
    }

    function handleWheel(e) {
      if (!shouldCapture(e.deltaY)) return;
      e.preventDefault();
      step(e.deltaY);
    }

    let touchStartY = null;
    function handleTouchStart(e) {
      touchStartY = e.touches[0].clientY;
    }
    function handleTouchMove(e) {
      if (touchStartY == null) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;
      if (!shouldCapture(deltaY)) return;
      e.preventDefault();
      step(deltaY);
      touchStartY = e.touches[0].clientY;
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [count, sectionRef]);

  return { index, goTo: setIndex };
}

export default function Projects() {
  const sectionRef = useRef(null);
  const { index, goTo } = useScrollLockSlider(pages.length, sectionRef);

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      data-particle-shape="spiral"
      data-particle-side="right"
      className="mx-auto max-w-7xl px-5 py-16"
    >
      <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
        Trabajo seleccionado
      </p>
      <h2 className="font-display text-gradient mt-2 text-3xl font-bold sm:text-4xl">
        Proyectos que he construido
      </h2>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
        <div className="relative h-256 w-full overflow-hidden">
          <div
            className="flex h-full w-full flex-col transition-transform ease-in-out"
            style={{
              transform: `translateY(${-index * 100}%)`,
              transitionDuration: `${ROTATE_MS}ms`,
            }}
          >
            {pages.map((pair, i) => (
              <div
                key={i}
                className="flex h-full w-full shrink-0 flex-col justify-center divide-y divide-line overflow-y-auto"
              >
                {pair.map((proj, j) => (
                  <div key={proj.name} className={j === 0 ? "pb-8" : "pt-8"}>
                    <ProjectCard proj={proj} reverse={j === 1} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 sm:flex-col sm:justify-center">
          <GradientBorder
            as="button"
            type="button"
            aria-label="Proyecto anterior"
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
            className={`h-9 w-9 ${index === 0 ? "pointer-events-none opacity-30" : ""}`}
            innerClassName="items-center justify-center text-white"
          >
            <HiOutlineChevronUp />
          </GradientBorder>

          <div className="flex flex-row gap-3 sm:flex-col">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Página ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? "bg-brand-pink" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <GradientBorder
            as="button"
            type="button"
            aria-label="Siguiente proyecto"
            disabled={index === pages.length - 1}
            onClick={() => goTo(index + 1)}
            className={`h-9 w-9 ${index === pages.length - 1 ? "pointer-events-none opacity-30" : ""}`}
            innerClassName="items-center justify-center text-white"
          >
            <HiOutlineChevronDown />
          </GradientBorder>
        </div>
      </div>
    </section>
  );
}
