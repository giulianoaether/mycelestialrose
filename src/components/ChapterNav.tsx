import { Link, useLocation } from "@tanstack/react-router";

const chapters = [
  { to: "/inicio", label: "Início" },
  { to: "/rosa", label: "A Rosa" },
  { to: "/cativar", label: "Cativar" },
  { to: "/memorias", label: "Memórias" },
  { to: "/voce", label: "Você" },
  { to: "/futuro", label: "Futuro" },
  { to: "/carta", label: "Carta" },
  { to: "/essencial", label: "Essencial" },
] as const;

export function ChapterNav() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Capítulos"
      className="fixed right-6 top-1/2 z-40 -translate-y-1/2 hidden md:flex flex-col gap-4"
    >
      {chapters.map((c) => {
        const active = pathname === c.to;
        return (
          <Link
            key={c.to}
            to={c.to}
            aria-label={c.label}
            className="group relative flex items-center"
          >
            <span
              className={`block h-[6px] w-[6px] rounded-full transition-all duration-500 ${
                active
                  ? "bg-gold scale-150 shadow-glow"
                  : "bg-foreground/30 group-hover:bg-foreground/70"
              }`}
            />
            <span
              className={`absolute right-5 whitespace-nowrap font-serif text-xs tracking-[0.3em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-80 ${
                active ? "text-gold" : "text-foreground"
              }`}
            >
              {c.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
