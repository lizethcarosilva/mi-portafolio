import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";
import GradientBorder from "./ui/GradientBorder";

const username = profile.github.replace(/\/+$/, "").split("/").pop();

export default function GithubActivity() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setStats({
          followers: data.followers,
          publicRepos: data.public_repos,
          following: data.following,
          memberSince: new Date(data.created_at).getFullYear(),
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const githubStats = stats
    ? [
        { label: "Seguidores", value: `${stats.followers}` },
        { label: "Repositorios públicos", value: `${stats.publicRepos}` },
        { label: "Siguiendo", value: `${stats.following}` },
        { label: "En GitHub desde", value: `${stats.memberSince}` },
      ]
    : [];

  return (
    <section
      data-particle-shape="spiral"
      data-particle-side="right"
      className="mx-auto max-w-6xl px-5 py-16"
    >
      <h2 className="font-display text-gradient text-2xl font-bold text-center">Actividad Github</h2>

      <div className="panel mt-7 rounded-3xl p-6">
        <p className="text-sm font-semibold text-white/80">Contribuciones del último año</p>

        <div className="mt-4 rounded-xl bg-bg/40 p-3">
          <img
            src={`https://ghchart.rshah.org/BC08D3/${username}`}
            alt={`Calendario de contribuciones de ${username} en GitHub`}
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        {status === "error" ? (
          <p className="mt-6 text-center text-xs text-white/40">
            No se pudieron cargar las estadísticas de GitHub en este momento.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(status === "loading" ? Array.from({ length: 4 }) : githubStats).map((stat, i) => (
              <GradientBorder
                key={stat?.label ?? i}
                className="w-full"
                innerClassName="flex-col items-center justify-center px-4 py-4 text-center"
              >
                {status === "loading" ? (
                  <div className="h-9 w-12 animate-pulse rounded bg-white/10" />
                ) : (
                  <p className="font-display text-lg font-bold text-white">{stat.value}</p>
                )}
                <p className="mt-1 text-xs text-white/60">{stat?.label ?? ""}</p>
              </GradientBorder>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
