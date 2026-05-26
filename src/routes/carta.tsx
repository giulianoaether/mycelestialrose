import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";
import { SectionTransition } from "@/components/SectionTransition";
import paper from "@/assets/paper-texture.jpg";

export const Route = createFileRoute("/carta")({
  component: Carta,
  head: () => ({
    meta: [
      { title: "Uma carta para você" },
      { name: "description", content: "3 anos de nós. E eu ainda sinto que isso é só o começo." },
      { property: "og:title", content: "Uma carta para você" },
      { property: "og:url", content: "/carta" },
    ],
    links: [{ rel: "canonical", href: "/carta" }],
  }),
});

function Carta() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={0.5} />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative w-full overflow-hidden rounded-sm shadow-glow"
          style={{
            backgroundImage: `url(${paper})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-[oklch(0.92_0.03_80)] mix-blend-multiply opacity-10" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 30% 20%, transparent 40%, oklch(0.18 0.04 60 / 0.25) 100%)" }} />

          <article className="relative p-10 sm:p-16 text-[oklch(0.22_0.04_60)]">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.8, delay: 0.4 }}
              className="font-hand text-2xl leading-relaxed sm:text-3xl"
            >
              meu amor,
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 2.4, delay: 1 }}
              className="mt-8 space-y-6 font-serif text-lg italic leading-loose sm:text-xl"
            >
              <p>
                Eu poderia tentar escrever algo perfeito, mas a verdade é que nenhuma frase
                cabe o tamanho do que eu sinto por você.
              </p>
              <p>
                Em três anos, você virou o lugar onde eu descanso, a piada que eu lembro sozinho,
                a voz que eu procuro quando o mundo aperta. Você é a minha parte mais leve e
                a minha parte mais séria, tudo ao mesmo tempo.
              </p>
              <p>
                Obrigado por me deixar te cativar. Por me cativar de volta. Por escolher,
                todos os dias, esse pequeno universo que a gente foi construindo juntos.
              </p>
              <p className="font-hand text-2xl not-italic leading-relaxed text-[oklch(0.45_0.14_18)] sm:text-3xl">
                3 anos de nós. E eu ainda sinto que isso é só o começo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 2, delay: 2.6 }}
              className="mt-12 text-right"
            >
              <p className="font-hand text-2xl leading-relaxed sm:text-3xl">
                com amor,
                <br />
                do seu garoto favorito.
              </p>
            </motion.div>
          </article>
        </motion.div>

        <SectionTransition to="/essencial" label="O essencial" />
      </section>
    </main>
  );
}
