import { Link } from "react-router-dom";
import { HiOutlineMapPin } from "react-icons/hi2";
import { GiGems } from "react-icons/gi";
import { locations, valuePillars } from "../data/portfolio";
import { asset } from "../lib/asset";
import GradientBorder from "./ui/GradientBorder";
import MagicRings from "./MagicRings";
import SkillsCarousel from "./SkillsCarousel";

export default function About() {
  return (
    <section
      id="sobre-mi"
      data-particle-shape="cube"
      data-particle-side="left"
      className="mx-auto max-w-6xl px-5 py-16"
    >
      <div className="flex flex-col gap-8">
        <div className="panel rounded-3xl p-7">
          <div className="flex flex-col items-center gap-6">
            <h3 className="w-full text-left font-display text-xl font-bold text-white">
              Disciplina & Confianza
            </h3>

            <div className="relative flex h-40 w-full items-center justify-center sm:h-48">
              <div className="absolute inset-0">
                <MagicRings
                  color="#973EF7"
                  colorTwo="#BC08D3"
                  ringCount={5}
                  speed={0.8}
                  attenuation={9}
                  lineThickness={2}
                  baseRadius={0.3}
                  radiusStep={0.08}
                  opacity={0.9}
                />
              </div>
              <img
                src={asset("/images/photo_about.png")}
                alt="Lizeth Andrea Caro"
                className="relative h-40 w-40 rounded-full border border-line object-cover object-top sm:h-48 sm:w-48"
              />
            </div>

            <div className="w-full text-left">
              <p className="mx-auto max-w-md text-sm text-white">
                Construyo con constancia y cuidado, cumpliendo lo que prometo en cada proyecto.
              </p>
              <GradientBorder
                as={Link}
                to="/acerca-de-mi"
                className="mx-auto mt-6 w-fit"
                innerClassName="items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Más sobre mí →
              </GradientBorder>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="panel relative flex min-h-[26rem] flex-col overflow-hidden rounded-3xl lg:col-span-2">
            <img
              src={asset("/images/map.png")}
              alt="Mapa de Colombia iluminado"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/40 to-transparent" />

            <div className="relative flex flex-1 flex-col gap-6 p-7 [text-shadow:0_2px_10px_rgba(0,0,0,0.85)]">
              <h3 className="font-display text-xl font-bold text-white">
                Disponibilidad remota
              </h3>

              <ul className="space-y-3">
                {locations.map((loc) =>
                  loc.primary ? (
                    <GradientBorder
                      key={loc.code}
                      as="li"
                      innerClassName="items-center justify-start gap-2 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <HiOutlineMapPin className="text-brand-pink" />
                      {loc.code} {loc.label}
                    </GradientBorder>
                  ) : (
                    <li key={loc.code} className="flex items-center gap-3 text-sm">
                      <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[10px] bg-white/10 text-xs font-semibold text-white/80">
                        {loc.code}
                      </span>
                      <span className="text-white/80">{loc.label}</span>
                    </li>
                  ),
                )}
              </ul>


            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-3">
            <div className="panel rounded-3xl p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[10px] bg-white/5 text-xl text-brand-pink">
                  <GiGems />
                </span>
                <p className="font-semibold text-white/90">
                  Mi perfil combina desarrollo Full Stack, análisis de datos, diseño técnico con
                  AutoCAD y una fuerte capacidad de comunicación desarrollada a través de mi
                  experiencia como monitora académica. Esta combinación me permite abordar un
                  proyecto desde diferentes perspectivas: comprender, analizar, diseñar, construir
                  y explicar.
                </p>
              </div>
              <SkillsCarousel />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {valuePillars.map((pillar) => (
                <div key={pillar.title} className="panel rounded-2xl p-5">
                  <pillar.Icon className="text-xl text-brand-pink" />
                  <h4 className="font-display mt-2 font-semibold text-white">{pillar.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
