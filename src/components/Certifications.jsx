import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import { certifications } from "../data/portfolio";

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!selected) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <section
      id="certificaciones"
      data-particle-shape="dna"
      data-particle-side="left"
      className="mx-auto max-w-6xl px-5 py-16"
    >
      <p className="text-xs font-semibold tracking-widest text-brand-gold uppercase">
        Certificaciones
      </p>
      <h2 className="font-display text-gradient mt-2 text-3xl font-bold sm:text-4xl">
        Cursos & Certificaciones
      </h2>

      <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
        {certifications.map((cert, i) => (
          <div key={cert.title} className="panel flex w-80 shrink-0 flex-col rounded-2xl p-5">
            <div className="flex h-44 flex-col">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-brand-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display line-clamp-2 text-sm leading-tight font-bold text-white">
                    {cert.title}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-pink">{cert.provider}</p>
                </div>
              </div>

              <p className="mt-4 text-xs font-semibold text-white/80">Skills covered</p>
              <p className="mt-1 line-clamp-2 text-xs text-white/60">{cert.skills}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelected(cert)}
              className="mt-4 block cursor-zoom-in overflow-hidden rounded-xl border border-line"
              aria-label={`Ampliar certificado: ${cert.title}`}
            >
              <img
                src={cert.image}
                alt={`Certificado: ${cert.title}`}
                className="h-56 w-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </button>
          </div>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-bg/90 p-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Cerrar"
            className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
          >
            <HiX />
          </button>
          <img
            src={selected.image}
            alt={`Certificado: ${selected.title}`}
            className="max-h-full max-w-full rounded-2xl border border-line object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
