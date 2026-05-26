import { useEffect, useRef } from "react";

interface StarFieldProps {
  density?: number;
  className?: string;
}

export function StarField({ density = 1, className = "" }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: { x: number; y: number; r: number; o: number; s: number; t: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.scale(dpr, dpr);
      const count = Math.floor((window.innerWidth * window.innerHeight) / 6000) * density;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.6 + 0.2,
        s: Math.random() * 0.5 + 0.2,
        t: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        star.t += 0.008 * star.s;
        const twinkle = (Math.sin(star.t) + 1) / 2;
        const opacity = star.o * (0.4 + twinkle * 0.6);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.95 0.02 80 / ${opacity})`;
        ctx.shadowBlur = star.r * 4;
        ctx.shadowColor = "oklch(0.82 0.11 78 / 0.6)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      aria-hidden="true"
    />
  );
}
