"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Check, FileDown, FileText, ArrowRight, Sparkles, ScanLine } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { ScreenTrack } from "./Screens";
import { TARGET_CREATION_MINUTES } from "./data";

const FloatingBadge: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  floatY?: number;
}> = ({ children, className = "", delay = 0, floatY = 8 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: [0, -floatY, 0], scale: 1 }}
      transition={{
        opacity: { delay, duration: 0.8 },
        scale: { delay, duration: 0.8 },
        y: {
          delay: delay + 0.8,
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
        className={`absolute z-30 flex items-center gap-3 rounded-2xl bg-card/95 p-3 text-fg shadow-[0_20px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-fg/5 backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
};

const FEATURES = [
  { icon: FileText, label: "PDF & DOCX" },
  { icon: ScanLine, label: "Optimisé ATS" },
  { icon: Sparkles, label: "Gratuit" },
];

export const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    damping: 25,
    stiffness: 150,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    damping: 25,
    stiffness: 150,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[95vh] overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.16),transparent_65%)]"
      />

      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10">
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-leaf/10 px-3.5 py-1.5 text-xs font-semibold text-leaf ring-1 ring-leaf/20"
            >
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-leaf animate-ping" />
                <span className="relative size-2 rounded-full bg-leaf" />
              </span>
              Le créateur de CV moderne
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-display mt-6 text-[clamp(2.3rem,6vw,5rem)] font-extrabold leading-[0.94] tracking-tight text-fg"
            >
              Votre CV,
              <br />
              prêt en{" "}
              <span className="relative inline-block text-brand">
                {TARGET_CREATION_MINUTES} minutes.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.14em] left-0 h-[0.22em] w-[98%]"
                >
                  <motion.path
                    d="M3 13 C 60 5, 140 4, 220 9 S 300 15, 317 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      delay: 0.9,
                      duration: 0.9,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-7 max-w-[34rem] text-base sm:text-lg leading-relaxed text-fg/75"
            >
              Choisissez un modèle, renseignez vos informations et exportez un CV
              professionnel, optimisé ATS. Sans inscription, gratuit, sans filigrane.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="/builder"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="group inline-flex h-14 items-center gap-2.5 rounded-2xl bg-brand px-7 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-600 sm:px-8"
              >
                <span>Créer mon CV</span>
                <span className="grid size-7 place-items-center rounded-full bg-white/20">
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </motion.a>

              <motion.a
                href="#templates"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="inline-flex h-14 items-center gap-2 rounded-2xl bg-panel px-7 text-sm font-semibold text-panel-fg ring-1 ring-fg/10 shadow-md transition-colors hover:bg-panel/90"
              >
                <FileDown className="size-4 text-brand" />
                <span>Voir les modèles</span>
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-fg/60"
            >
              <span className="uppercase tracking-[0.16em] font-semibold text-fg/40">
                Disponible
              </span>
              {FEATURES.map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1.5 text-fg/80">
                  <f.icon className="size-3.5 text-leaf" />
                  {f.label}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[500px] justify-center pt-8 lg:pt-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[115%] max-w-[560px] -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                className="absolute inset-[14%] rounded-full bg-brand"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              />
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full text-brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{
                  opacity: { delay: 0.6, duration: 1 },
                  rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.4"
                  strokeDasharray="1 2.2"
                />
              </motion.svg>
            </div>

            <div style={{ perspective: 1200 }}>
              <motion.div
                style={{ rotateX, rotateY }}
                initial={{ y: 80, opacity: 0, rotate: 6 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                <PhoneMockup className="w-[min(270px,78vw)] sm:w-[300px]">
                  <ScreenTrack />
                </PhoneMockup>
              </motion.div>
            </div>

            <FloatingBadge delay={0.9} floatY={6} className="-left-2 top-12 sm:left-0 lg:-left-8">
              <span className="grid size-8 place-items-center rounded-full bg-leaf text-white shadow-sm">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <div className="text-left leading-tight">
                <span className="block text-[13px] font-bold text-fg">CV exporté</span>
                <span className="text-[11px] text-fg/50">cv-aristote-baba.pdf</span>
              </div>
            </FloatingBadge>

            <FloatingBadge delay={1.1} floatY={-8} className="-right-2 top-[48%] sm:right-0 lg:-right-8">
              <span className="grid h-8 min-w-8 place-items-center rounded-lg bg-brand-50 px-1 text-[11px] font-bold text-brand shadow-sm">
                ATS
              </span>
              <div className="text-left leading-tight">
                <span className="block text-[13px] font-bold text-fg">Optimisé ATS</span>
                <span className="text-[11px] text-fg/50">Lisibles par les robots</span>
              </div>
            </FloatingBadge>

            <FloatingBadge delay={1.3} floatY={7} className="bottom-28 -left-4 hidden sm:flex lg:-left-16">
              <span className="grid size-8 place-items-center rounded-full bg-brand-50 text-brand shadow-sm">
                <FileText className="size-4" />
              </span>
              <div className="text-left leading-tight">
                <span className="block text-[13px] font-bold text-fg">3 modèles</span>
                <span className="text-[11px] text-fg/50">Moderne · Classique · Expérience</span>
              </div>
            </FloatingBadge>
          </div>
        </div>
      </div>
    </section>
  );
};
