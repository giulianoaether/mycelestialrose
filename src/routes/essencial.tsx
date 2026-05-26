import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import princeRose from "@/assets/little-prince-rose.png";
import couplePhoto from "@/assets/couple-placeholder.jpg";

export const Route = createFileRoute("/essencial")({
  component: Essencial,
  head: () => ({
    meta: [
      { title: "O essencial é invisível aos olhos" },
      { name: "description", content: "O essencial é invisível aos olhos." },
      { property: "og:title", content: "O essencial é invisível aos olhos" },
      { property: "og:url", content: "/essencial" },
    ],
    links: [{ rel: "canonical", href: "/essencial" }],
  }),
});

function Essencial() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-24">
      <StarField density={0.4} />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Symbolic parallel — us / him and his rose */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 sm:grid-cols-[1fr_auto_1fr]"
        >
          {/* Left — couple */}
          <motion.figure
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div
              className="relative overflow-hidden rounded-sm border border-gold/30 shadow-glow"
              style={{ boxShadow: "0 0 40px -10px oklch(0.82 0.11 78 / 0.35)" }}
            >
              <img
                src={couplePhoto}
                alt="Nós"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-56 w-56 object-cover sm:h-64 sm:w-64"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            <figcaption className="mt-5 font-hand text-2xl text-cream">nós</figcaption>
          </motion.figure>

          {/* Center — connecting ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 1.4 }}
            className="flex flex-col items-center justify-center gap-3 text-gold/70"
            aria-hidden="true"
          >
            <span className="h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:hidden" />
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:block" />
            <span className="font-serif text-xl italic">~</span>
            <span className="h-10 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:hidden" />
            <span className="hidden h-px w-10 bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:block" />
          </motion.div>

          {/* Right — prince + rose */}
          <motion.figure
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 2.2, delay: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
              <div
                className="pointer-events-none absolute inset-0 rounded-full blur-3xl opacity-60"
                style={{ background: "var(--gradient-rose-glow)" }}
              />
              <img
                src={princeRose}
                alt="O Pequeno Príncipe e sua rosa"
                loading="lazy"
                width={1024}
                height={1024}
                className="relative z-10 h-full w-full object-contain animate-float-slow"
                style={{ filter: "drop-shadow(0 0 30px oklch(0.62 0.14 18 / 0.35))" }}
              />
            </div>
            <figcaption className="mt-5 font-hand text-2xl text-cream">ele e sua rosa</figcaption>
          </motion.figure>
        </motion.div>

        {/* Final line */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(14px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 3.4, delay: 2.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto mt-20 max-w-2xl font-serif text-2xl italic leading-relaxed text-foreground/90 glow-text-soft sm:text-3xl md:text-4xl"
        >
          O essencial
          <br />
          <span className="text-gold glow-text">é invisível aos olhos.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 5 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="font-hand text-2xl text-foreground/60">— eu te amo, minha rosa</p>
          <Link
            to="/"
            className="mt-6 font-serif text-[10px] uppercase tracking-[0.5em] text-foreground/40 transition-colors hover:text-gold"
          >
            voltar ao início
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
