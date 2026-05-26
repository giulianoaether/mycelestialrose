import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import { RevealText } from "@/components/RevealText";
import { SectionTransition } from "@/components/SectionTransition";

export const Route = createFileRoute("/voce")({
  component: Voce,
  head: () => ({
    meta: [
      { title: "O que eu amo em você" },
      { name: "description", content: "Pequenos detalhes que só quem ama de verdade percebe." },
      { property: "og:title", content: "O que eu amo em você" },
      { property: "og:url", content: "/voce" },
    ],
    links: [{ rel: "canonical", href: "/voce" }],
  }),
});

const loves = [
  { t: "o seu riso", d: "Aquele que escapa antes de você decidir se queria rir. O som mais bonito que eu já ouvi." },
  { t: "o jeito como você cuida", d: "De mim, da sua família, dos seus amigos — até dos estranhos. Você ama de um jeito raro." },
  { t: "seus olhos quando você fala do que ama", d: "Brilham diferente. Eu fico em silêncio só para te ver brilhar." },
  { t: "as suas manhas", d: "A voz mais baixinha, o jeito mole. Você não sabe, mas isso é meu refúgio favorito." },
  { t: "a sua coragem", d: "Você é mais forte do que imagina. Eu te admiro mais do que consigo dizer." },
  { t: "o silêncio do nosso abraço", d: "Quando o mundo grita lá fora e a gente, sem dizer nada, entende tudo." },
  { t: "a forma como você sonha", d: "Grande, bonito, sem medo. Você me ensinou a sonhar de novo." },
  { t: "você inteira", d: "Cada parte. Até as que você ainda não gosta. Especialmente essas." },
];

function Voce() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={0.7} />

      <section className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <RevealText as="p" className="font-serif text-xs uppercase tracking-[0.6em] text-rose/80">
          Capítulo IV
        </RevealText>
        <RevealText as="h2" delay={0.2} className="mt-6 font-serif text-3xl italic glow-text-soft sm:text-4xl md:text-5xl">
          Coisas que eu amo em você
        </RevealText>
        <RevealText delay={0.4} className="mx-auto mt-6 max-w-xl font-serif text-base italic text-foreground/60">
          Pequenos detalhes que só quem te ama de verdade percebe.
        </RevealText>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loves.map((l, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, delay: (i % 3) * 0.15, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-sm border border-foreground/10 bg-card/40 p-8 text-left backdrop-blur-sm transition-all duration-700 hover:border-gold/40"
            >
              <span className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
              <span className="font-hand text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-serif text-2xl italic leading-tight text-cream">{l.t}</h3>
              <p className="mt-4 font-serif text-base leading-relaxed text-foreground/70">
                {l.d}
              </p>
            </motion.article>
          ))}
        </div>

        <SectionTransition to="/futuro" label="O que vem a seguir" />
      </section>
    </main>
  );
}
