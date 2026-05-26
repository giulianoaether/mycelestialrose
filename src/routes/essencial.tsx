import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { StarField } from "@/components/StarField";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <StarField density={0.4} />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, filter: "blur(14px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 3.4, ease: [0.22, 0.61, 0.36, 1] }}
          className="font-serif text-2xl italic leading-relaxed text-foreground/90 glow-text-soft sm:text-3xl md:text-4xl"
        >
          O essencial
          <br />
          <span className="text-gold glow-text">é invisível aos olhos.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="font-hand text-2xl text-foreground/60">— eu te amo</p>
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
