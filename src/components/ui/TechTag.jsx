import { techColors } from "../../data/portfolio";

export default function TechTag({ name }) {
  const bg = techColors[name] ?? "bg-violet-700";

  return (
    <span
      className={`${bg} inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white whitespace-nowrap`}
    >
      {name}
    </span>
  );
}
