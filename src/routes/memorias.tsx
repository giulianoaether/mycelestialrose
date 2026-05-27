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
  { id: "1", title: "O primeiro olhar", date: "começo de tudo", x: 30, y: 12, text: "Eu não sabia, mas o universo já estava conspirando. Você riu de algo bobo, e algo dentro de mim mudou de lugar — para sempre." },
  { id: "2", title: "A primeira viagem", date: "nosso primeiro mundo juntos", x: 18, y: 20, text: "Acordar e te ver dormindo perto de uma janela qualquer foi a primeira vez que entendi o que é casa." },
  { id: "3", title: "A noite das estrelas", date: "uma madrugada qualquer", x: 16, y: 32, text: "Você apontou pro céu, eu apontei pra você. Ganhei. Sempre ganho quando o prêmio é olhar pra você." },
  { id: "4", title: "Um café às pressas", date: "uma manhã comum", x: 50, y: 22, text: "Não tinha nada de especial — só você, descalça, falando de coisas pequenas. Era tudo." },
  { id: "5", title: "A conversa difícil", date: "quando crescemos juntos", x: 70, y: 12, text: "A gente discordou, chorou, e ainda assim escolheu ficar. Foi ali que eu soube: isso é raro." },
  { id: "6", title: "Aquele abraço", date: "um dia ruim que você salvou", x: 82, y: 20, text: "Sem dizer nada, você me segurou. E o mundo, por um instante, voltou a fazer sentido." },
  { id: "7", title: "Risadas no carro", date: "uma estrada qualquer", x: 84, y: 32, text: "Música alta, janela aberta, sua mão na minha. Eu queria que a estrada nunca acabasse." },
  { id: "8", title: "3 anos", date: "hoje", x: 50, y: 54, text: "E aqui estamos. Mais nós do que nunca. Eu te escolheria de novo, em qualquer universo, mil vezes." },
];

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
          <svg viewBox="0 0 100 62.5" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {memories.map((m, i) =>
              memories.slice(i + 1).map((n, j) => {
                const dist = Math.hypot(m.x - n.x, m.y - n.y);
                if (dist > 30) return null;
                return (
                  <motion.line
                    key={`${i}-${j}`}
                    x1={m.x} y1={m.y} x2={n.x} y2={n.y}
                    stroke="oklch(0.82 0.11 78 / 0.18)"
                    strokeWidth="0.1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, delay: 0.8 }}
                  />
                );
              })
            )}
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
