import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { StarField } from "@/components/StarField";
import { Particles } from "@/components/Particles";
import { RevealText, WordReveal } from "@/components/RevealText";
import { SectionTransition } from "@/components/SectionTransition";
import nebulaImg from "@/assets/nebula-bg.jpg";

export const Route = createFileRoute("/futuro")({
  component: Futuro,
  head: () => ({
    meta: [
      { title: "Futuro" },
      { name: "description", content: "Minha parte favorita do futuro é saber que você existe nele." },
      { property: "og:title", content: "Futuro" },
      { property: "og:url", content: "/futuro" },
    ],
    links: [{ rel: "canonical", href: "/futuro" }],
  }),
});

function Futuro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <main ref={ref} className="relative min-h-screen overflow-hidden bg-background">
      <motion.div
        style={{ y, scale, backgroundImage: `url(${nebulaImg})` }}
        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-50"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/60" />
      <StarField density={1.1} />
      <Particles count={22} />

      <section className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <RevealText as="p" className="font-serif text-xs uppercase tracking-[0.6em] text-gold/80">
          Capítulo V — Futuro
        </RevealText>

        <h2 className="mt-10 max-w-3xl font-serif text-3xl italic leading-[1.2] glow-text-soft sm:text-4xl md:text-5xl lg:text-6xl">
          <WordReveal text="Minha parte favorita do futuro…" stagger={0.09} delay={0.4} />
          <br />
          <span className="text-gold glow-text">
            <WordReveal text="é saber que você existe nele." stagger={0.09} delay={2} />
          </span>
        </h2>

        <RevealText
          delay={0.6}
          className="mt-12 max-w-2xl font-serif text-lg italic leading-relaxed text-foreground/70 sm:text-xl"
        >
          Quero crescer ao seu lado. Quero estar ao seu lado em cada versão do futuro que você
          imagina em silêncio, até nas que você ainda tem medo de contar pra alguém. Quero ser a
          casa pra onde você sempre volta, e a estrada que você escolhe quando precisa partir.
        </RevealText>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-16 grid gap-8 text-left sm:grid-cols-3"
        >
          {[
            { k: "crescer", v: "lado a lado, sem pressa" },
            { k: "sonhar", v: "alto, juntos, sempre" },
            { k: "escolher", v: "você, todos os dias" },
          ].map((it, i) => (
            <motion.div
              key={it.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 1.2 + i * 0.3 }}
              className="border-l border-gold/30 pl-5"
            >
              <p className="font-serif text-[10px] uppercase tracking-[0.4em] text-gold/80">{it.k}</p>
              <p className="mt-2 font-serif text-lg italic text-cream">{it.v}</p>
            </motion.div>
          ))}
        </motion.div>

        <SectionTransition to="/carta" label="Uma carta para você" />
      </section>
    </main>
  );
}
