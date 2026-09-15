import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineDownload, HiMenu, HiX } from "react-icons/hi";
import { asset } from "../lib/asset";
import GradientBorder from "./ui/GradientBorder";

const LINKS = [
  { to: "/#inicio", label: "Inicio" },
  { to: "/#sobre-mi", label: "Sobre mí" },
  { to: "/acerca-de-mi", label: "Experiencia" },
  { to: "/#proyectos", label: "Proyectos" },
  { to: "/#certificaciones", label: "Certificaciones" },
  { to: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/#inicio" className="flex items-center gap-2.5 font-display font-semibold">
          <img
            src={asset("/images/icon_navbar.png")}
            alt="Lizeth Caro"
            className="h-9 w-9 rounded-full object-cover"
          />
          Lizeth Caro
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          {LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <GradientBorder
            as="a"
            href={asset("/Hoja_de_Vida_Lizeth_Caro_Silva_.pdf")}
            download
            className="hidden sm:inline-flex"
            innerClassName="items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white/90"
          >
            CV <HiOutlineDownload className="text-base" />
          </GradientBorder>
          <GradientBorder
            as="button"
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-9 w-9 md:hidden"
            innerClassName="items-center justify-center text-white"
            aria-label="Abrir menú"
          >
            {open ? <HiX /> : <HiMenu />}
          </GradientBorder>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/5 bg-bg px-5 py-3 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
