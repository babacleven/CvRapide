"use client";
import React from "react";
import { motion } from "motion/react";
import {
  Timer,
  ScanLine,
  FileDown,
  FileText,
  Sparkles,
  ListChecks,
  ArrowUpRight,
} from "lucide-react";
import { TARGET_CREATION_MINUTES } from "./data";

const StopwatchVisual: React.FC = () => {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative mx-auto mt-10 aspect-square w-full max-w-[280px]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="10"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{
            strokeDashoffset: circumference * (1 - TARGET_CREATION_MINUTES / 60),
          }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {Array.from({ length: 60 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="4"
            x2="100"
            y2={i % 5 === 0 ? 12 : 8}
            stroke="currentColor"
            strokeOpacity={i % 5 === 0 ? 0.5 : 0.18}
            strokeWidth={i % 5 === 0 ? 1.5 : 1}
            transform={`rotate(${i * 6} 100 100)`}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display flex items-baseline text-[clamp(3.8rem,9vw,5.6rem)] font-bold leading-none text-panel-fg">
          {TARGET_CREATION_MINUTES}
          <span className="ml-1 text-2xl font-semibold text-brand">min</span>
        </span>
        <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-panel-fg/50">
          Chrono moyen
        </span>
      </div>
    </div>
  );
};

const AtsScanVisual: React.FC = () => (
  <div className="relative mt-6 h-52 overflow-hidden rounded-2xl bg-card ring-1 ring-fg/5 sm:h-56">
    <div className="absolute inset-0 flex flex-col gap-1.5 p-5">
      {[60, 88, 74, 92, 52, 84, 66].map((w, i) => (
        <div key={i} className="space-y-1">
          <div className="h-2 rounded-full bg-fg/15" style={{ width: `${w * 0.35}%` }} />
          <div className="h-1.5 rounded-full bg-fg/[0.08]" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
    <motion.div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand/40 to-transparent"
      initial={{ y: -70 }}
      whileInView={{ y: 200 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
    />
    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-leaf px-3 py-1.5 text-[10px] font-bold text-white shadow-sm">
      100% ATS-ready
    </span>
  </div>
);

const FormatChipsVisual: React.FC = () => {
  const chips = [
    { label: "PDF", bg: "#60a5fa", fg: "#0a1120", rotate: -6 },
    { label: "DOCX", bg: "#2563EB", fg: "#fff", rotate: 4 },
    { label: "A4", bg: "#18181b", fg: "#fff", rotate: -3 },
    { label: "Sans filigrane", bg: "#22c55e", fg: "#fff", rotate: 5 },
    { label: "Portrait", bg: "#eab308", fg: "#18181b", rotate: -4 },
  ];

  return (
    <div className="mt-8 flex flex-wrap gap-2.5">
      {chips.map((chip, idx) => (
        <motion.span
          key={chip.label}
          initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, rotate: chip.rotate, scale: 1 }}
          whileHover={{ rotate: 0, scale: 1.08, y: -4 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            delay: 0.15 + idx * 0.07,
          }}
          className="inline-flex cursor-default select-none items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold shadow-[0_10px_24px_-14px_rgba(0,0,0,0.4)]"
          style={{ background: chip.bg, color: chip.fg }}
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
};

const TemplateFannedVisual: React.FC = () => {
  const items = [
    { e: "📄", bg: "#60a5fa" },
    { e: "🧾", bg: "#18181b" },
    { e: "🗂️", bg: "#22c55e" },
    { e: "✅", bg: "#eab308" },
    { e: "🎨", bg: "#22d3ee" },
  ];

  return (
    <div className="relative mx-auto mt-8 h-32 w-full max-w-[260px]">
      {items.map((item, idx) => {
        const offset = idx - 2;
        return (
          <motion.div
            key={item.e}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + idx * 0.06, duration: 0.7 }}
            className="absolute left-1/2 top-1/2 -ml-10 -mt-10"
            style={{ zIndex: 5 - Math.abs(offset) }}
          >
            <span
              className="grid size-20 place-items-center rounded-3xl text-4xl shadow-[0_16px_30px_-14px_rgba(0,0,0,0.3)] ring-4 ring-card transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none group-hover:scale-105"
              style={{
                background: item.bg,
                transform: `translateX(${offset * 28}px) rotate(${offset * 6}deg)`,
              }}
            >
              {item.e}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

const SectionsChatVisual: React.FC = () => {
  const messages = [
    { from: "me", text: "J'ajoute mes compétences ?" },
    { from: "cv", text: "Prêt ! 6 sections intelligentes à remplir 🚀" },
  ];

  return (
    <div className="mt-6 space-y-2">
      {messages.map((msg, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            delay: 0.3 + i * 0.5,
            type: "spring",
            stiffness: 300,
            damping: 22,
          }}
          className={`w-fit max-w-[85%] rounded-2xl px-3.5 py-2 text-sm font-medium ${
            msg.from === "me"
              ? "origin-bottom-left rounded-bl-md bg-page text-fg"
              : "ml-auto origin-bottom-right rounded-br-md bg-[#60a5fa] text-[#0a1120] shadow-sm"
          }`}
        >
          {msg.text}
        </motion.p>
      ))}
    </div>
  );
};

const SectionListVisual: React.FC = () => {
  const rows = [
    "Informations",
    "Expérience",
    "Formation",
    "Compétences",
    "Langues",
    "Projets",
  ];

  return (
    <div className="mt-6 space-y-2">
      {rows.map((row, i) => (
        <motion.div
          key={row}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.12 * i, duration: 0.5 }}
          className="flex items-center justify-between rounded-xl bg-page/70 px-3 py-2 text-xs font-medium text-fg ring-1 ring-fg/5"
        >
          <span>{row}</span>
          <span className="grid size-4 place-items-center rounded-full bg-leaf text-white">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export const Avantages: React.FC = () => {
  return (
    <section id="avantages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand/10">
              Pourquoi CVFast
            </span>
            <h2 className="font-display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] text-fg">
              Pensé pour convaincre,
              <br />
              de la première
              <br />
              ligne à l'export.
            </h2>
          </div>
          <p className="max-w-md text-base sm:text-lg leading-relaxed text-fg/70 lg:justify-self-end">
            Des modèles propres, un assistant clair et un export PDF impeccable :
            tout ce qu'il faut pour décrocher un entretien, sans prise de tête.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="group relative isolate flex flex-col overflow-hidden rounded-[28px] bg-panel p-6 text-panel-fg shadow-xl sm:p-8 md:col-span-2 lg:col-span-3 lg:row-span-2"
          >
            <div className="flex items-center gap-2 font-display text-lg font-bold text-panel-fg">
              <span className="grid size-8 place-items-center rounded-xl bg-white/10 text-brand">
                <Timer className="size-5" />
              </span>
              <span>Rapide. Vraiment.</span>
            </div>
            <p className="mt-3 max-w-sm text-sm sm:text-base text-panel-fg/70">
              En moyenne 10 minutes suffisent pour passer de zéro à un CV prêt à
              être envoyé. Le temps que ça prend de boire un café.
            </p>
            <div className="flex flex-1 items-center">
              <StopwatchVisual />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group relative isolate overflow-hidden rounded-[28px] bg-card p-6 text-fg shadow-md ring-1 ring-fg/5 sm:p-8 lg:col-span-3"
          >
            <div className="flex items-center gap-2 font-display text-lg font-bold text-fg">
              <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand">
                <ScanLine className="size-5" />
              </span>
              <span>Optimisé ATS</span>
            </div>
            <p className="mt-3 text-sm sm:text-base text-fg/70">
              Nos modèles sont lisibles par les logiciels de recrutement. Votre CV
              n'est jamais filtré avant d'être vu.
            </p>
            <AtsScanVisual />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative isolate overflow-hidden rounded-[28px] bg-sand p-6 text-fg shadow-md sm:p-8 lg:col-span-3"
          >
            <div className="flex items-center gap-2 font-display text-lg font-bold text-fg">
              <span className="grid size-8 place-items-center rounded-xl bg-fg/5 text-brand">
                <FileDown className="size-5" />
              </span>
              <span>Exportez comme vous voulez</span>
            </div>
            <p className="mt-3 text-sm sm:text-base text-fg/70">
              PDF ou DOCX, sans filigrane, en un clic. Votre CV à vous, prêt à
              envoyer.
            </p>
            <FormatChipsVisual />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative isolate overflow-hidden rounded-[28px] bg-card p-6 text-fg shadow-md ring-1 ring-fg/5 sm:p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-2 font-display text-lg font-bold text-fg">
              <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand">
                <FileText className="size-5" />
              </span>
              <span>3 modèles pro</span>
            </div>
            <p className="mt-3 text-sm text-fg/70">
              Moderne, Classique et Expérience, pensés pour tous les secteurs.
            </p>
            <TemplateFannedVisual />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="group relative isolate overflow-hidden rounded-[28px] bg-panel p-6 text-panel-fg shadow-xl sm:p-8 lg:col-span-2"
          >
            <div className="flex items-center gap-2 font-display text-lg font-bold text-panel-fg">
              <span className="grid size-8 place-items-center rounded-xl bg-white/10 text-brand">
                <Sparkles className="size-5" />
              </span>
              <span>Sans inscription</span>
            </div>
            <p className="mt-3 text-sm text-panel-fg/70">
              On vous guide, sans compte obligatoire. Commencez tout de suite.
            </p>
            <SectionsChatVisual />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative isolate overflow-hidden rounded-[28px] bg-sand p-6 text-fg shadow-md sm:p-8 md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-center gap-2 font-display text-lg font-bold text-fg">
              <span className="grid size-8 place-items-center rounded-xl bg-fg/5 text-brand">
                <ListChecks className="size-5" />
              </span>
              <span>Sections intelligentes</span>
            </div>
            <p className="mt-3 text-sm text-fg/70">
              Expérience, formation, compétences, langues, projets… remplissez, on
              met en forme.
            </p>
            <SectionListVisual />
          </motion.article>
        </div>

        <div className="mt-8 flex justify-end">
          <a
            href="#comment"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline underline-offset-4"
          >
            Voir comment ça marche <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
