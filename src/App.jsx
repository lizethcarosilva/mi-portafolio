import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ParticleField from "./components/ParticleField";
import Home from "./pages/Home";
import AcercaDeMi from "./pages/AcercaDeMi";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-bg">
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="brandIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF7A" />
              <stop offset="50%" stopColor="#BC08D3" />
              <stop offset="100%" stopColor="#973EF7" />
            </linearGradient>
          </defs>
        </svg>
        <ParticleField />
        <ScrollManager />
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acerca-de-mi" element={<AcercaDeMi />} />
          </Routes>
        </main>
        <footer className="relative z-10 border-t border-white/5 py-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Lizeth Andrea Caro. Todos los derechos reservados.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
