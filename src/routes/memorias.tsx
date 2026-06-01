import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { StarField } from "@/components/StarField";
import { RevealText } from "@/components/RevealText";
import { SectionTransition } from "@/components/SectionTransition";
import { X } from "lucide-react";

export const Route = createFileRoute("/memorias")({
  component: Memorias,
  head: () => ({
    meta: [
      { title: "Constelação de Memórias" },
      { name: "description", content: "Cada estrela, uma lembrança nossa." },
      { property: "og:title", content: "Constelação de Memórias" },
      { property: "og:url", content: "/memorias" },
    ],
    links: [{ rel: "canonical", href: "/memorias" }],
  }),
});

type Memory = {
  id: string;
  title: string;
  date: string;
  text: string;
  x: number;
  y: number;
};

const memories: Memory[] = [
  { id: "1", title: "Sushi", date: "UM JANTAR QUALQUER", x: 18, y: 31, text: "Engraçado como uma comida acabou virando uma lembrança.\n\nTalvez porque, toda vez que sentamos juntos para comer sushi, eu perceba que a melhor parte nunca foi a comida. Foi você." },
  { id: "2", title: "A primeira viagem", date: "nosso primeiro mundo juntos", x: 24, y: 15, text: "Acordar e te ver dormindo perto de uma janela qualquer foi a primeira vez que entendi o que é casa." },
  { id: "3", title: "Os pulinhos", date: "UM DIA FELIZ", x: 39, y: 24, text: "Quando você fica feliz de verdade, seu sorriso aparece antes mesmo de qualquer palavra.\n\nE às vezes vêm aqueles pulinhos espontâneos que me fazem lembrar o quanto eu amo te ver feliz." },
  { id: "4", title: "Nosso pequeno mundo", date: "quando tudo ficou mais nosso", x: 48, y: 10, text: "Entre conversas, planos pequenos e jeitos só nossos, a gente foi criando um lugar no mundo que parece caber exatamente em nós dois." },
  { id: "5", title: "O rímel", date: "UMA MANHÃ COMUM", x: 62, y: 16, text: "Toda vez que você passa rímel, coloca a língua pra fora sem perceber.\n\nÉ uma daquelas coisas pequenas que provavelmente passam despercebidas por quase todo mundo. Mas eu sempre noto. E sempre sorrio." },
  { id: "6", title: "A conversa difícil", date: "quando crescemos juntos", x: 73, y: 8, text: "A gente discordou, chorou, e ainda assim escolheu ficar. Foi ali que eu soube: isso é raro." },
  { id: "7", title: "Aquele abraço", date: "um dia ruim que você salvou", x: 60, y: 39, text: "Sem dizer nada, você me segurou. E o mundo, por um instante, voltou a fazer sentido." },
  { id: "8", title: "Risadas no carro", date: "uma estrada qualquer", x: 52, y: 55, text: "Música alta, janela aberta, sua mão na minha. Eu queria que a estrada nunca acabasse." },
  { id: "9", title: "O brilho de agora", date: "mais uma estrela no nosso céu", x: 36, y: 47, text: "Tem algo bonito em perceber que a nossa história ainda está acendendo pontos novos, mesmo depois de tanto caminho já iluminado." },
  { id: "10", title: "3 anos", date: "hoje", x: 27, y: 60, text: "E aqui estamos. Mais nós do que nunca. Eu te escolheria de novo, em qualquer universo, mil vezes." },
];

const constellationLines = [
  ["1", "2"], ["2", "3"], ["3", "4"], ["4", "5"], ["5", "6"],
  ["5", "7"], ["7", "8"], ["8", "9"], ["9", "1"], ["10", "9"],
] as const;

const decorativeRays = [
  { x2: 76, y2: 3.5 },
  { x2: 81, y2: 7 },
  { x2: 79, y2: 12 },
  { x2: 75.5, y2: 13.5 },
] as const;

function Memorias() {
  const [active, setActive] = useState<Memory | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={0.6} />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 py-20 text-center">
        <RevealText as="p" className="font-serif text-xs uppercase tracking-[0.6em] text-gold/80">
          Capítulo III
        </RevealText>
        <RevealText as="h2" delay={0.2} className="mt-6 font-serif text-3xl italic glow-text-soft sm:text-4xl md:text-5xl">
          Nossa constelação
        </RevealText>
        <RevealText delay={0.4} className="mt-6 max-w-xl font-serif text-base italic text-foreground/60">
          Cada estrela aqui é uma lembrança. Toque numa delas.
        </RevealText>

        <div className="relative mt-10 h-[clamp(320px,52vh,520px)] w-full max-w-3xl">
          <svg
            viewBox="0 0 100 62.5"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {constellationLines.map(([from, to], i) => {
              const start = memories.find((m) => m.id === from);
              const end = memories.find((m) => m.id === to);
              if (!start || !end) return null;

              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke="oklch(0.82 0.11 78 / 0.32)"
                  strokeWidth="0.16"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 3, delay: 0.6 + i * 0.08 }}
                />
              );
            })}
            {decorativeRays.map((ray, i) => {
              const anchor = memories.find((m) => m.id === "6");
              if (!anchor) return null;

              return (
                <motion.line
                  key={`ray-${i}`}
                  x1={anchor.x} y1={anchor.y} x2={ray.x2} y2={ray.y2}
                  stroke="oklch(0.82 0.11 78 / 0.28)"
                  strokeWidth="0.12"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, delay: 1.6 + i * 0.12 }}
                />
              );
            })}
            {decorativeRays.map((ray, i) => (
              <motion.circle
                key={`ray-star-${i}`}
                cx={ray.x2}
                cy={ray.y2}
                r="0.42"
                fill="oklch(0.95 0.02 80 / 0.7)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 1.9 + i * 0.1 }}
                style={{ filter: "drop-shadow(0 0 1.4px oklch(0.82 0.11 78 / 0.55))" }}
              />
            ))}
          </svg>

          {memories.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setActive(m)}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.15 }}
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${m.x}%`, top: `${m.y * (100 / 62.5)}%` }}
              aria-label={m.title}
            >
              <span className="relative flex items-center justify-center">
                <span className="absolute h-10 w-10 rounded-full bg-gold/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute h-6 w-6 rounded-full bg-gold/30 opacity-40 blur-sm animate-twinkle" />
                <span className="relative h-2 w-2 rounded-full bg-cream shadow-glow transition-transform duration-500 group-hover:scale-150" />
              </span>
              <span className="absolute left-1/2 mt-3 -translate-x-1/2 whitespace-nowrap font-serif text-[10px] uppercase tracking-[0.3em] text-foreground/0 transition-colors duration-500 group-hover:text-foreground/70">
                {m.title}
              </span>
            </motion.button>
          ))}
        </div>

        <SectionTransition to="/voce" label="O que eu amo em você" />
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 px-6 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative max-w-xl rounded-sm border border-gold/30 bg-card/90 p-10 text-left shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Fechar"
                className="absolute right-4 top-4 text-foreground/50 transition-colors hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="font-serif text-[10px] uppercase tracking-[0.5em] text-gold/80">
                {active.date}
              </p>
              <h3 className="mt-3 font-serif text-3xl italic text-cream">{active.title}</h3>
              <p className="mt-6 font-serif text-lg leading-relaxed italic text-foreground/80">
                {active.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
