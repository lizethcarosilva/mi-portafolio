import { useState } from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "../data/portfolio";
import GradientBorder from "./ui/GradientBorder";

const socials = [
  { Icon: HiOutlineMail, href: `mailto:${profile.email}`, label: "Email" },
  { Icon: FaLinkedinIn, href: profile.linkedin, label: "LinkedIn" },
  { Icon: FaGithub, href: profile.github, label: "GitHub" },
];

const FORM_ENDPOINT = "https://formspree.io/f/mvkoeyqo";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "sending" | "sent" | "error"

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacto"
      data-particle-shape="sphere"
      data-particle-side="right"
      className="mx-auto max-w-6xl px-5 py-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl leading-tight font-extrabold text-gradient sm:text-5xl">
            <span className="block text-left">CREEMOS</span>
            <span className="ml-12 block w-fit sm:ml-20">ALGO</span>
            <span className="block text-left">JUNTOS</span>
          </h2>
          <div className="mt-8 flex gap-3">
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

        <form
          action={FORM_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          className="panel flex flex-col gap-5 rounded-3xl p-7 sm:p-9"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1 border-b border-white/20 pb-2 text-sm">
              <span className="text-xs tracking-wide text-white/70 uppercase">Nombre</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className="bg-transparent py-1 text-white outline-none placeholder:text-white/45"
              />
            </label>
            <label className="flex flex-col gap-1 border-b border-white/20 pb-2 text-sm">
              <span className="text-xs tracking-wide text-white/70 uppercase">Teléfono</span>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+57 300 000 0000"
                className="bg-transparent py-1 text-white outline-none placeholder:text-white/45"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 border-b border-white/20 pb-2 text-sm">
            <span className="text-xs tracking-wide text-white/70 uppercase">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              required
              className="bg-transparent py-1 text-white outline-none placeholder:text-white/45"
            />
          </label>

          <label className="flex flex-col gap-1 border-b border-white/20 pb-2 text-sm">
            <span className="text-xs tracking-wide text-white/70 uppercase">Mensaje</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escríbeme ..."
              rows={2}
              required
              className="resize-none bg-transparent py-1 text-white outline-none placeholder:text-white/45"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-[10px] bg-gradient-to-r from-brand-gold to-brand-pink px-6 py-3 font-semibold text-bg transition-transform hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-brand-gold">¡Gracias! Tu mensaje fue enviado.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Algo salió mal. Intenta de nuevo o escríbeme directamente a{" "}
              <a href={`mailto:${profile.email}`} className="underline">
                {profile.email}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
