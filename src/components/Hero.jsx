import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineBriefcase, HiOutlineCpuChip, HiOutlineAcademicCap } from "react-icons/hi2";
import { profile, stats, heroBadges } from "../data/portfolio";
import useTypewriterCycle from "../hooks/useTypewriterCycle";
import { asset } from "../lib/asset";
import GradientBorder from "./ui/GradientBorder";

const socials = [
  { Icon: HiOutlineMail, href: `mailto:${profile.email}`, label: "Email" },
  { Icon: FaLinkedinIn, href: profile.linkedin, label: "LinkedIn" },
  { Icon: FaGithub, href: profile.github, label: "GitHub" },
];

const badgePositions = [
  "-left-20 top-10",
  "left-1/2 -top-20 -translate-x-1/2",
  "-left-20 bottom-10",
  "left-1/2 -bottom-20 -translate-x-1/2",
  "-left-24 top-1/2 -translate-y-1/2",
];

const badgeFloatDelays = ["0s", "0.6s", "1.2s", "0.3s", "0.9s"];

const statIcons = [HiOutlineBriefcase, HiOutlineCpuChip, HiOutlineAcademicCap];

// Staggered zig-zag placement: left, further right, back left.
const statOffsets = ["", "translate-x-3 sm:translate-x-4", ""];

export default function Hero() {
  const [firstName, ...rest] = profile.name.split(" ");
  const role = useTypewriterCycle(profile.roles, 6000);

  return (
    <section
      id="inicio"
      data-particle-shape="sphere"
      data-particle-side="right"
      className="flex min-h-dvh items-center overflow-x-clip px-5 py-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-medium text-brand-pink">Hola, soy</p>
            <h1 className="font-display text-5xl leading-[1.05] font-extrabold text-gradient sm:text-6xl">
              {firstName} <br /> {rest.join(" ")}
            </h1>
            <p className="typewriter-caret mt-4 min-h-9 text-2xl font-bold text-white">{role}</p>
            <p className="mt-5 max-w-lg text-white/70">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-brand-gold to-brand-pink px-6 py-3 font-semibold text-bg transition-transform hover:scale-[1.03]"
              >
                Ver Proyectos →
              </a>
              <GradientBorder
                as="a"
                href="#contacto"
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

          <div className="relative mx-auto flex w-full max-w-lg items-center justify-center py-10">
            <div className="relative w-72 sm:w-80 md:w-96">
              <img
                src={asset("/images/photo_index.png")}
                alt="Foto de Lizeth Andrea Caro"
                className="w-full drop-shadow-[0_0_25px_rgba(151,62,247,0.25)]"
              />

              {heroBadges.map(({ name, image }, i) => (
                <GradientBorder
                  key={name}
                  fill="glass"
                  className={`absolute ${badgePositions[i]} h-14 w-14 shadow-lg sm:h-16 sm:w-16`}
                  innerClassName="items-center justify-center"
                  title={name}
                >
                  <img
                    src={image}
                    alt={name}
                    className="animate-badge-float h-7 w-7 object-contain sm:h-9 sm:w-9"
                    style={{ animationDelay: badgeFloatDelays[i] }}
                  />
                </GradientBorder>
              ))}
            </div>

            <div className="absolute top-1/2 -right-8 hidden -translate-y-1/2 flex-col gap-4 sm:flex lg:-right-12 2xl:-right-20">
              {stats.map((stat, i) => {
                const StatIcon = statIcons[i % statIcons.length];
                return (
                  <GradientBorder
                    key={stat.label}
                    fill="solid"
                    className={`w-48 ${statOffsets[i % statOffsets.length]}`}
                    innerClassName="flex-row items-center gap-3 px-4 py-3"
                  >
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[8px] bg-white/10 text-brand-gold">
                      <StatIcon className="text-lg" />
                    </span>
                    <span>
                      <p className="font-display text-lg font-bold text-brand-pink">{stat.value}</p>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </span>
                  </GradientBorder>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:hidden">
          {stats.map((stat, i) => {
            const StatIcon = statIcons[i % statIcons.length];
            return (
              <GradientBorder
                key={stat.label}
                fill="solid"
                className="w-full"
                innerClassName="flex-col items-center justify-center gap-1.5 px-3 py-3 text-center"
              >
                <StatIcon className="text-lg text-brand-gold" />
                <p className="font-display text-lg font-bold text-brand-pink">{stat.value}</p>
                <p className="text-[11px] text-white/60">{stat.label}</p>
              </GradientBorder>
            );
          })}
        </div>
      </div>
    </section>
  );
}
