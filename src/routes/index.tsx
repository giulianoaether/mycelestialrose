import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { StarField } from "@/components/StarField";
import { Particles } from "@/components/Particles";
import planeImg from "@/assets/little-prince-plane.png";

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
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1800);
    const t2 = setTimeout(() => setStage(2), 5200);
    const t3 = setTimeout(() => setStage(3), 8200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => navigate({ to: "/inicio" }), 1900);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <StarField density={1.2} />
      <Particles count={14} />

      {/* The Little Prince in his airplane — slowly drifting across the sky */}
      <motion.img
        src={planeImg}
        alt="O Pequeno Príncipe em seu avião"
        initial={{ x: "-18vw", y: 0, opacity: 0 }}
        animate={
          leaving
            ? {
                x: "120vw",
                y: "-14vh",
                scale: 1.15,
                opacity: 0.95,
                filter: "blur(2px)",
              }
            : {
                x: ["-18vw", "-8vw", "-18vw"],
                y: [0, -14, 0],
                opacity: 0.85,
                filter: "blur(0px)",
              }
        }
        transition={
          leaving
            ? { duration: 1.9, ease: [0.22, 0.61, 0.36, 1] }
            : {
                x: { duration: 18, ease: "easeInOut", repeat: Infinity },
                y: { duration: 9, ease: "easeInOut", repeat: Infinity },
                opacity: { duration: 3, delay: 0.6 },
              }
        }
        className="pointer-events-none absolute left-[8vw] top-[16vh] z-20 h-auto w-[26vw] max-w-[320px] min-w-[180px] select-none"
        style={{ filter: "drop-shadow(0 10px 40px oklch(0.62 0.14 60 / 0.35))" }}
      />

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
              animate={{ opacity: leaving ? 0 : 1, y: 0 }}
              transition={{ duration: leaving ? 1.2 : 1.8 }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-serif text-xl italic text-foreground/70 sm:text-2xl">
                Uma carta para você.
              </p>
              <button
                onClick={handleEnter}
                disabled={leaving}
                className="group relative inline-flex items-center gap-3 border border-foreground/20 px-8 py-3 font-serif text-sm uppercase tracking-[0.4em] text-foreground/80 transition-all duration-700 hover:border-gold hover:text-gold hover:tracking-[0.5em] disabled:opacity-50"
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

      {/* Fade-to-black overlay for the cinematic exit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: leaving ? 1 : 0 }}
        transition={{ duration: 1.9, ease: [0.22, 0.61, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-30 bg-background"
      />
    </main>
  );
}
