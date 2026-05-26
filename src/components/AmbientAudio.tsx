import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

// Soft ambient pad generated on demand (no external file required).
// User-toggleable; remembers preference in localStorage.
export function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      nodesRef.current?.stop();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const start = async () => {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    ctxRef.current = ctx;

    // Two soft sine pads at gentle intervals + slow LFO for breath
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.4;
    filter.connect(master);

    const freqs = [110, 164.81, 220, 329.63]; // A2, E3, A3, E4
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.06 / (i + 1);
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.05 + i * 0.02;
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(filter);
      o.start();
      lfo.start();
      return { o, lfo };
    });

    master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 2.5);

    nodesRef.current = {
      stop: () => {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
        setTimeout(() => {
          oscs.forEach(({ o, lfo }) => {
            try { o.stop(); lfo.stop(); } catch { /* noop */ }
          });
        }, 1300);
      },
    };
  };

  const toggle = async () => {
    if (playing) {
      nodesRef.current?.stop();
      nodesRef.current = null;
      ctxRef.current?.close().catch(() => {});
      ctxRef.current = null;
      setPlaying(false);
      localStorage.setItem("ambient", "off");
    } else {
      await start();
      setPlaying(true);
      localStorage.setItem("ambient", "on");
    }
  };

  if (pathname === "/") return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Silenciar ambiente" : "Ativar ambiente sonoro"}
      className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-background/40 text-foreground/70 backdrop-blur-md transition-all duration-500 hover:border-gold/50 hover:text-gold"
    >
      {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
