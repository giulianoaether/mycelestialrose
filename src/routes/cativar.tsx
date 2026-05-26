import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import { RevealText, WordReveal } from "@/components/RevealText";
import { SectionTransition } from "@/components/SectionTransition";

export const Route = createFileRoute("/cativar")({
  component: Cativar,
  head: () => ({
    meta: [
      { title: "Cativar" },
      { name: "description", content: "Tu te tornas eternamente responsável por aquilo que cativas." },
      { property: "og:title", content: "Cativar" },
      { property: "og:description", content: "Como dois estranhos se tornaram o lar um do outro." },
      { property: "og:url", content: "/cativar" },
    ],
    links: [{ rel: "canonical", href: "/cativar" }],
  }),
});

// A small constellation drawn as SVG with animated connecting lines
const stars = [
  { x: 12, y: 20 }, { x: 28, y: 38 }, { x: 44, y: 22 },
  { x: 58, y: 52 }, { x: 72, y: 34 }, { x: 86, y: 58 },
  { x: 34, y: 70 }, { x: 64, y: 78 },
];
const lines: [number, number][] = [
  [0, 1], [1, 2], [2, 4], [1, 3], [3, 4], [3, 6], [3, 7], [4, 5],
];

function Constellation() {
  return (
    <svg viewBox="0 0 100 90" className="h-full w-full" aria-hidden="true">
      {lines.map(([a, b], i) => {
        const sa = stars[a], sb = stars[b];
        return (
          <motion.line
            key={i}
            x1={sa.x} y1={sa.y} x2={sb.x} y2={sb.y}
            stroke="oklch(0.82 0.11 78 / 0.5)"
            strokeWidth="0.18"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 0.6 + i * 0.3, ease: "easeInOut" }}
          />
        );
      })}
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x} cy={s.y}
          r="0.6"
          fill="oklch(0.95 0.02 80)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: i * 0.2 }}
          style={{ filter: "drop-shadow(0 0 1.2px oklch(0.82 0.11 78))" }}
        />
      ))}
    </svg>
  );
}

function Cativar() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={0.9} />

      <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <RevealText as="p" className="font-serif text-xs uppercase tracking-[0.6em] text-gold/80">
          Capítulo II — Cativar
        </RevealText>

        <h2 className="mt-10 max-w-3xl font-serif text-3xl italic leading-tight glow-text-soft sm:text-4xl md:text-5xl">
          <WordReveal text="Dois estranhos —" stagger={0.1} delay={0.4} />
          <br />
          <span className="text-gold">
            <WordReveal text="que viraram o lar um do outro." stagger={0.08} delay={1.6} />
          </span>
        </h2>

        <div className="mt-16 h-[40vh] w-full max-w-3xl">
          <Constellation />
        </div>

        <RevealText
          delay={0.6}
          className="mt-10 max-w-2xl font-serif text-base italic leading-relaxed text-foreground/70 sm:text-lg"
        >
          Antes éramos só mais um nome no mundo do outro. Hoje, cada gesto teu carrega memória,
          cada silêncio meu encontra abrigo em ti. Cativar é isso: tornar-se necessário sem nunca pesar.
        </RevealText>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.2 }}
          className="mt-16 max-w-3xl border-l border-gold/40 pl-8 text-left font-serif text-xl italic leading-relaxed text-cream glow-text-soft sm:text-2xl md:text-3xl"
        >
          “Tu te tornas eternamente responsável
          <br />por aquilo que cativas.”
          <footer className="mt-4 font-sans text-[10px] uppercase tracking-[0.4em] not-italic text-foreground/40">
            — Antoine de Saint-Exupéry
          </footer>
        </motion.blockquote>

        <SectionTransition to="/memorias" label="Nossas memórias" />
      </section>
    </main>
  );
}
