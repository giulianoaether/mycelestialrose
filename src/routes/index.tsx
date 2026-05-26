import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StarField } from "@/components/StarField";
import { Particles } from "@/components/Particles";

export const Route = createFileRoute("/")({
  component: Intro,
  head: () => ({
    meta: [
      { title: "Em um universo inteiro…" },
      { name: "description", content: "Uma carta para você, em forma de constelação." },
    ],
  }),
});

function Intro() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1800);
    const t2 = setTimeout(() => setStage(2), 5200);
    const t3 = setTimeout(() => setStage(3), 8200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <StarField density={1.2} />
      <Particles count={14} />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <AnimatePresence mode="wait">
          {stage >= 1 && stage < 3 && (
            <motion.div
              key="line"
              initial={{ opacity: 0, filter: "blur(12px)", y: 12 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(12px)", y: -12 }}
              transition={{ duration: 2.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <p className="font-serif text-2xl italic leading-relaxed text-foreground/90 glow-text-soft sm:text-3xl md:text-4xl">
                Em um universo inteiro…
              </p>
              {stage >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, delay: 0.4 }}
                  className="mt-6 font-serif text-2xl italic leading-relaxed text-gold glow-text sm:text-3xl md:text-4xl"
                >
                  eu encontrei você.
                </motion.p>
              )}
            </motion.div>
          )}

          {stage >= 3 && (
            <motion.div
              key="enter"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.8 }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-serif text-xl italic text-foreground/70 sm:text-2xl">
                Uma carta para você.
              </p>
              <button
                onClick={() => navigate({ to: "/inicio" })}
                className="group relative inline-flex items-center gap-3 border border-foreground/20 px-8 py-3 font-serif text-sm uppercase tracking-[0.4em] text-foreground/80 transition-all duration-700 hover:border-gold hover:text-gold hover:tracking-[0.5em]"
              >
                <span className="relative z-10">Entrar</span>
                <span className="absolute inset-0 -z-0 bg-gold/0 transition-colors duration-700 group-hover:bg-gold/5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-gold-glow)" }} />
    </main>
  );
}
