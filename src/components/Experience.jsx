import { experience } from "../data/portfolio";
import TechTag from "./ui/TechTag";

export default function Experience() {
  return (
    <section
      id="experiencia"
      data-particle-shape="cube"
      data-particle-side="left"
      className="mx-auto max-w-6xl px-5 py-16"
    >
      <h2 className="font-display text-2xl font-bold text-white">Experiencia Profesional</h2>

      <ol className="relative mt-9 space-y-10 border-l border-line pl-8">
        {experience.map((job) => (
          <li key={`${job.role}-${job.period}`} className="relative">
            <span className="absolute top-1.5 -left-[2.35rem] grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-brand-gold to-brand-pink">
              <span className="h-2 w-2 rounded-full bg-bg" />
            </span>

            <p className="text-xs font-semibold tracking-wide text-brand-violet uppercase">
              {job.period}
            </p>
            <h3 className="mt-1 font-display font-bold text-white">
              {job.role} <span className="font-normal text-white/60">— {job.company}</span>
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-white/70">{job.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <TechTag key={tag} name={tag} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
