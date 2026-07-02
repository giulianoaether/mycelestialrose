import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface SectionTransitionProps {
  to: string;
  label: string;
  className?: string;
}

export function SectionTransition({ to, label, className = "mt-24" }: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay: 0.4 }}
      className={`${className} flex flex-col items-center gap-4`}
    >
      <Link
        to={to}
        className="group relative inline-flex items-center gap-3 font-serif text-sm uppercase tracking-[0.4em] text-foreground/70 transition-colors duration-500 hover:text-gold"
      >
        <span>{label}</span>
        <span className="block h-px w-12 bg-foreground/30 transition-all duration-500 group-hover:w-20 group-hover:bg-gold" />
      </Link>
    </motion.div>
  );
}
