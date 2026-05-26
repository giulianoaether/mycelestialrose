import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import { Particles } from "@/components/Particles";
import { WordReveal } from "@/components/RevealText";
import { SectionTransition } from "@/components/SectionTransition";

export const Route = createFileRoute("/inicio")({
  component: Inicio,
  head: () => ({
    meta: [
      { title: "Início — 3 anos depois" },
      { name: "description", content: "Você ainda é minha parte favorita do universo." },
      { property: "og:title", content: "3 anos depois" },
      { property: "og:description", content: "Você ainda é minha parte favorita do universo." },
      { property: "og:url", content: "/inicio" },
    ],
    links: [{ rel: "canonical", href: "/inicio" }],
  }),
});

function Inicio() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={1.4} />
      <Particles count={20} />

      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="font-serif text-xs uppercase tracking-[0.6em] text-gold/80"
        >
          Para você
        </motion.p>

        <h1 className="mt-10 max-w-4xl font-serif text-4xl leading-[1.15] glow-text-soft sm:text-5xl md:text-6xl lg:text-7xl">
          <WordReveal text="3 anos depois…" stagger={0.12} delay={0.6} />
          <br />
          <span className="text-gold glow-text">
            <WordReveal text="e você ainda é minha parte favorita do universo." stagger={0.07} delay={1.8} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 4.2 }}
          className="mt-12 max-w-xl font-serif text-lg italic leading-relaxed text-foreground/70 sm:text-xl"
        >
          Foi o tempo que passei com você que fez você se tornar tão importante para mim.
        </motion.p>

        <SectionTransition to="/rosa" label="Começar nossa história" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-serif text-[10px] uppercase tracking-[0.4em] text-foreground/40"
        >
          ↓ deslize devagar
        </motion.div>
      </section>

      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl animate-breathe"
        style={{ background: "var(--gradient-gold-glow)" }} />
    </main>
  );
}
