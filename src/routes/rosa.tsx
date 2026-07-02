import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import { RevealText, WordReveal } from "@/components/RevealText";
import { SectionTransition } from "@/components/SectionTransition";
import roseImg from "@/assets/rose-glow.png";

export const Route = createFileRoute("/rosa")({
  component: Rosa,
  head: () => ({
    meta: [
      { title: "A Rosa" },
      { name: "description", content: "Existem muitas rosas no mundo. Mas nenhuma delas é você." },
      { property: "og:title", content: "A Rosa" },
      { property: "og:description", content: "Existem muitas rosas no mundo. Mas nenhuma delas é você." },
      { property: "og:url", content: "/rosa" },
    ],
    links: [{ rel: "canonical", href: "/rosa" }],
  }),
});

function Rosa() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={0.8} />

      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-5 text-center sm:min-h-screen sm:py-0">
        <RevealText as="p" className="font-serif text-xs uppercase tracking-[0.6em] text-rose/80">
          Capítulo I
        </RevealText>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 3.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative mt-6 flex items-center justify-center sm:mt-12"
        >
          <div
            className="pointer-events-none absolute inset-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full blur-3xl"
            style={{ background: "var(--gradient-rose-glow)" }}
          />
          <img
            src={roseImg}
            alt="Uma rosa luminosa"
            width={460}
            height={460}
            className="relative z-10 h-[28svh] max-h-[460px] w-auto animate-float-slow drop-shadow-2xl sm:h-[44vh]"
            style={{ filter: "drop-shadow(0 0 40px oklch(0.62 0.14 18 / 0.5))" }}
          />
        </motion.div>

        <h2 className="mt-7 max-w-3xl font-serif text-2xl italic leading-tight glow-text-soft sm:mt-16 sm:text-4xl md:text-5xl">
          <WordReveal text="Existem muitas rosas no mundo." stagger={0.08} delay={1.5} />
          <br />
          <span className="text-rose">
            <WordReveal text="Mas nenhuma delas é como você." stagger={0.1} delay={3} />
          </span>
        </h2>

        <RevealText
          delay={4}
          className="mt-4 max-w-xl font-serif text-sm italic leading-relaxed text-foreground/60 sm:mt-10 sm:text-lg"
        >
          Você se tornou única para mim — não por acaso, mas pelo tempo que escolhi dedicar a você.
          Pelas conversas, pelos silêncios, pelas pequenas coisas que só nós dois entendemos.
        </RevealText>

        <SectionTransition to="/cativar" label="Continuar" className="mt-7 sm:mt-24" />
      </section>
    </main>
  );
}
