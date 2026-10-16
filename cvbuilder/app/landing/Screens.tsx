"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, animate, useMotionValue } from "motion/react";
import {
  Eye,
  ChevronDown,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
  User,
  Briefcase,
  GraduationCap,
  Globe,
  FolderGit2,
  Star,
  Target,
  Check,
  Loader2,
} from "lucide-react";

/* Palette identique au builder CVFast (thème daisyUI "cvfast") */
const C = {
  bg: "#0d0d0f", // base-200
  panel: "#18181b", // base-300 / neutral
  border: "#27272a",
  input: "#050505", // base-100
  text: "#ffffff",
  muted: "#a1a1aa",
  primary: "#60a5fa",
  primaryContent: "#0a1120",
  accent: "#22d3ee",
  success: "#22c55e",
};

const SECTIONS: { title: string; icon: React.ElementType }[] = [
  { title: "Informations personnelles", icon: User },
  { title: "Experiences professionnelles", icon: Briefcase },
  { title: "Formations", icon: GraduationCap },
  { title: "Langues", icon: Globe },
  { title: "Projets réalisés", icon: FolderGit2 },
  { title: "Competences", icon: Star },
  { title: "Loisirs", icon: Target },
];

const BuilderHeader: React.FC = () => (
  <div className="flex items-center justify-between">
    <h1 className="text-[15px] font-bold italic tracking-tight">
      CVFast<span style={{ color: C.primary }}> Builder</span>
    </h1>
    <button
      type="button"
      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold shadow-sm"
      style={{ background: C.primary, color: C.primaryContent }}
    >
      Previsualiser
      <Eye className="size-3" />
    </button>
  </div>
);

const SelectChip: React.FC<{ value: string }> = ({ value }) => (
  <div
    className="flex flex-1 items-center justify-between rounded-lg border px-2.5 py-1.5 text-[10px]"
    style={{ background: C.input, borderColor: C.border, color: C.text }}
  >
    <span className="truncate">{value}</span>
    <ChevronDown className="ml-1 size-3 shrink-0" style={{ color: C.muted }} />
  </div>
);

const SectionRow: React.FC<{
  title: string;
  icon: React.ElementType;
  open?: boolean;
}> = ({ title, icon: Icon, open }) => (
  <div
    className="flex items-center gap-2.5 rounded-xl border px-2.5 py-2.5"
    style={{
      background: C.panel,
      borderColor: open ? C.primary : C.border,
    }}
  >
    <Icon className="size-4 shrink-0" style={{ color: C.primary }} />
    <span className="min-w-0 flex-1 truncate text-[11px] font-medium">
      {title}
    </span>
    <RotateCw className="size-3 shrink-0" style={{ color: C.muted }} />
    <ChevronDown
      className={`size-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      style={{ color: open ? C.primary : C.muted }}
    />
  </div>
);

/* SCREEN 1 — Builder: choix du modèle + thème */
export const ScreenChoose: React.FC = () => (
  <div className="absolute inset-0 flex flex-col px-4 pt-12 pb-4">
    <BuilderHeader />

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-3 flex gap-2"
    >
      <SelectChip value="Classique" />
      <SelectChip value="cupcake" />
    </motion.div>

    <div className="mt-3 space-y-2 overflow-hidden">
      {SECTIONS.map((s, idx) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + idx * 0.07, duration: 0.5 }}
        >
          <SectionRow title={s.title} icon={s.icon} />
        </motion.div>
      ))}
    </div>
  </div>
);

/* SCREEN 2 — Builder: saisie des informations personnelles */
export const ScreenFill: React.FC = () => {
  const fields = [
    { label: "Nom complet", value: "Aristote BABA" },
    { label: "Titre du poste", value: "Développeur Full-Stack" },
    { label: "Email", value: "aristote@cvfast.app" },
    { label: "Téléphone", value: "+242 06 80 38 524" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col px-4 pt-12 pb-4">
      <BuilderHeader />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-3 overflow-hidden rounded-xl border"
        style={{ background: C.panel, borderColor: C.primary }}
      >
        <div className="flex items-center gap-2.5 px-2.5 py-2.5">
          <User className="size-4" style={{ color: C.primary }} />
          <span className="min-w-0 flex-1 truncate text-[11px] font-semibold">
            Informations personnelles
          </span>
          <RotateCw className="size-3" style={{ color: C.muted }} />
          <ChevronDown
            className="size-3.5 rotate-180"
            style={{ color: C.primary }}
          />
        </div>

        <div
          className="space-y-2 border-t p-3"
          style={{ borderColor: C.border }}
        >
          {fields.map((field, idx) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.08, duration: 0.45 }}
            >
              <p
                className="mb-1 text-[8px] font-semibold uppercase tracking-wide"
                style={{ color: C.muted }}
              >
                {field.label}
              </p>
              <div
                className="rounded-lg border px-2.5 py-1.5 text-[11px]"
                style={{
                  background: C.input,
                  borderColor: C.border,
                  color: C.text,
                }}
              >
                {field.value}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-2.5 space-y-2"
      >
        <SectionRow title="Experiences professionnelles" icon={Briefcase} />
        <SectionRow title="Formations" icon={GraduationCap} />
      </motion.div>
    </div>
  );
};

/* Mini CV (aperçu du builder, thème clair "cupcake") */
const MiniCvDoc: React.FC = () => (
  <div className="rounded-lg bg-white p-3 shadow-lg">
    <div className="flex items-center gap-2.5">
      <span
        className="grid size-9 place-items-center rounded-full text-[11px] font-bold text-white"
        style={{ background: C.primary }}
      >
        A
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-[12px] font-bold text-[#050505]">
          Aristote BABA
        </p>
        <p className="truncate text-[9px] text-[#52525b]">
          Développeur Full-Stack
        </p>
      </div>
    </div>
    <div className="mt-2.5 space-y-1.5">
      {[92, 78, 86, 64, 88].map((w, i) => (
        <div key={i} className="space-y-1">
          <div
            className="h-1.5 rounded-full"
            style={{ width: "35%", background: C.primary }}
          />
          <div
            className="h-1 rounded-full bg-[#050505]/15"
            style={{ width: `${w}%` }}
          />
        </div>
      ))}
    </div>
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {["React", "Next.js", "TypeScript", "Node.js"].map((t) => (
        <span
          key={t}
          className="rounded-full px-1.5 py-0.5 text-[8px] font-semibold"
          style={{ background: "rgba(96,165,250,0.14)", color: "#2563eb" }}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* SCREEN 3 — Builder: prévisualisation du CV */
export const ScreenCustomize: React.FC = () => (
  <div className="absolute inset-0 flex flex-col px-3 pt-12 pb-4">
    <div
      className="flex flex-1 flex-col rounded-xl p-3 shadow-lg"
      style={{ background: C.panel }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold">Previsualisation</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid size-5 place-items-center rounded-full"
            style={{ color: C.muted }}
          >
            <ZoomOut className="size-3" />
          </button>
          <span
            className="w-9 text-center text-[10px] font-mono"
            style={{ color: C.text }}
          >
            77%
          </span>
          <button
            type="button"
            className="grid size-5 place-items-center rounded-full"
            style={{ color: C.muted }}
          >
            <ZoomIn className="size-3" />
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 flex-1 overflow-hidden rounded-lg p-3"
        style={{ background: C.input }}
      >
        <MiniCvDoc />
      </motion.div>

      <button
        type="button"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-[11px] font-semibold shadow-sm"
        style={{ background: C.primary, color: C.primaryContent }}
      >
        <Download className="size-3.5" />
        Telecharger mon CV
      </button>
    </div>
  </div>
);

/* SCREEN 4 — Builder: téléchargement / export PDF */
export const ScreenExport: React.FC = () => {
  const progress = useMotionValue(0);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 4,
      ease: [0.45, 0, 0.4, 1],
      onUpdate: (v) => {
        setPct(Math.round(v * 100));
        if (v > 0.99) setDone(true);
      },
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <div className="absolute inset-0 flex flex-col items-center px-5 pt-14 text-center">
      <div className="relative mt-4 grid size-24 place-items-center">
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const colors = [C.success, C.primary, C.accent];
          return (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute size-2 rounded-full"
              style={{ background: colors[i % 3] }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(angle) * 65,
                y: Math.sin(angle) * 65,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0.5],
              }}
              transition={{
                delay: 0.4,
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 2.2,
                ease: "easeOut",
              }}
            />
          );
        })}

        <motion.span
          className="grid size-22 place-items-center rounded-full"
          style={{
            background: C.success,
            boxShadow: "0 20px 40px -12px rgba(34,197,94,0.6)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 16,
            delay: 0.1,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-11 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
            />
          </svg>
        </motion.span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="font-display mt-6 text-[24px] font-bold leading-none"
      >
        {done ? "CV téléchargé !" : "Génération du PDF…"}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="mt-2 text-[11px]"
        style={{ color: C.muted }}
      >
        Export PDF · Optimisé ATS
      </motion.p>

      <div
        ref={ref}
        className="mt-6 w-full rounded-xl border p-3.5 text-left"
        style={{ background: C.panel, borderColor: C.border }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="size-4" style={{ color: C.primary }} />
            <span className="text-[11px] font-semibold">
              cv-aristote-baba.pdf
            </span>
          </div>
          <span className="text-[10px] font-bold" style={{ color: C.success }}>
            {done ? "Terminé" : `${pct}%`}
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full"
          style={{ background: C.input }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: C.primary }}
          />
        </div>
        <div
          className="mt-3 flex items-center justify-center gap-1.5 text-[10px]"
          style={{ color: C.muted }}
        >
          <Check className="size-3" strokeWidth={3} style={{ color: C.success }} />
          Sauvegardé dans vos téléchargements
        </div>
      </div>

      <button
        type="button"
        className="mt-auto mb-8 flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-[12px] font-semibold"
        style={{ background: C.primary, color: C.primaryContent }}
      >
        {done ? (
          <>
            <Download className="size-3.5" />
            Telecharger mon CV
          </>
        ) : (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Téléchargement…
          </>
        )}
      </button>
    </div>
  );
};

/* Rotating showcase used in the hero (cycling through the 4 screens) */
export const ScreenTrack: React.FC = () => {
  const screens = [ScreenChoose, ScreenFill, ScreenCustomize, ScreenExport];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % screens.length), 3200);
    return () => clearInterval(t);
  }, []);

  const Current = screens[idx];

  return (
    <div className="absolute inset-0">
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Current />
      </motion.div>
    </div>
  );
};
