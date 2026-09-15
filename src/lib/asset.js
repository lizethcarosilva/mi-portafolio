// Resolves a root-relative path (e.g. "/images/foo.png") against Vite's
// configured base, so static assets still load when the site is deployed
// under a subpath (GitHub Pages project sites, e.g. /mi-portafolio/).
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
