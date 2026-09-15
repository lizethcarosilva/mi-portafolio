import { techStack } from "../data/portfolio";

export default function SkillsCarousel() {
  const track = [...techStack, ...techStack];

  return (
    <div className="relative mt-5 w-full min-w-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee flex w-max items-center gap-8">
        {track.map((tech, i) => (
          <div key={`${tech.name}-${i}`} className="flex flex-col items-center gap-1.5">
            <img src={tech.image} alt={tech.name} className="h-7 w-7 object-contain opacity-80" />
            <span className="text-[10px] whitespace-nowrap text-white/40">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
