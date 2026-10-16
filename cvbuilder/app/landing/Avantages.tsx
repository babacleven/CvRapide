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
import { TARGET_CREATION_MINUTES, TEMPLATES } from "./data";

const StopwatchVisual: React.FC = () => {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full -rotate-90">
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
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="font-display flex items-baseline text-[clamp(3.8rem,9vw,5.6rem)] font-bold leading-none text-fg">
          {TARGET_CREATION_MINUTES}
          <span className="ml-1 text-2xl font-semibold text-brand">min</span>
        </span>
        <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-fg/50">
          Chrono moyen
        </span>
      </div>
    </div>
  );
};

const AtsScanVisual: React.FC = () => {
  const keywords = ["Structure", "Mots-clés", "Lisibilité", "PDF texte"];

  return (
    <div className="mt-6 w-full max-w-xs rounded-2xl bg-white p-5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.35)] ring-1 ring-fg/10">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-fg/50">
          <ScanLine className="size-3.5 text-leaf" />
          Score ATS
        </span>
        <span className="font-display text-2xl font-extrabold leading-none text-leaf">
          100%
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-fg/10">
        <motion.div
          className="h-full rounded-full bg-leaf"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {keywords.map((k, i) => (
          <motion.span
            key={k}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-1 rounded-full bg-leaf/10 px-2.5 py-1 text-[10px] font-semibold text-leaf ring-1 ring-leaf/15"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            >
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {k}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

const FormatChipsVisual: React.FC = () => {
  const chips = [
    { label: "PDF", bg: "#60a5fa", fg: "#0a1120", rotate: -6 },
    { label: "DOCX", bg: "#2563EB", fg: "#fff", rotate: 4 },
    { label: "A4", bg: "#18181b", fg: "#fff", rotate: -3 },
    { label: "Sans filigrane", bg: "#22c55e", fg: "#fff", rotate: 5 },
    { label: "Portrait", bg: "#eab308", fg: "#18181b", rotate: -4 },
  ];

  return (
    <div>
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

const TemplateFannedVisual: React.FC = () => (
  <div className="mt-8 flex flex-wrap gap-3">
    {TEMPLATES.map((t, idx) => (
      <motion.div
        key={t.title}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 + idx * 0.08, duration: 0.6 }}
        className="h-28 w-20 shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-fg/10"
      >
        <img
          src={t.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </motion.div>
    ))}
  </div>
);

const SectionsChatVisual: React.FC = () => {
  const messages = [
    { from: "me", text: "J'ajoute mes compétences ?" },
    { from: "cv", text: "Prêt ! 6 sections intelligentes à remplir" },
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
  const features = [
    {
      icon: Timer,
      title: "Rapide. Vraiment.",
      desc: "CVFast génère la mise en page au fil de la saisie. Comptez environ 10 minutes pour un CV complet, du formulaire à l'export.",
      Visual: StopwatchVisual,
    },
    {
      icon: ScanLine,
      title: "Optimisé ATS",
      desc: "Les modèles de CVFast gardent une structure sobre et lisible, pensée pour passer les filtres des logiciels de recrutement (ATS).",
      Visual: AtsScanVisual,
    },
    {
      icon: FileDown,
      title: "Exportez comme vous voulez",
      desc: "CVFast exporte votre CV en PDF ou DOCX, sans filigrane, prêt à envoyer ou à imprimer en A4.",
      Visual: FormatChipsVisual,
    },
    {
      icon: FileText,
      title: "3 modèles pro",
      desc: "Le builder CVFast propose trois modèles — Moderne, Classique et Expérience — avec leurs couleurs et leur mise en page.",
      Visual: TemplateFannedVisual,
    },
    {
      icon: Sparkles,
      title: "Sans inscription",
      desc: "Pas de compte : CVFast enregistre automatiquement votre CV dans votre navigateur. Commencez tout de suite.",
      Visual: SectionsChatVisual,
    },
    {
      icon: ListChecks,
      title: "Sections intelligentes",
      desc: "Ajoutez expériences, formations, compétences, langues, projets et loisirs : CVFast les organise et les met en forme pour vous.",
      Visual: SectionListVisual,
    },
  ];

  return (
    <section id="avantages" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand/10">
              Pourquoi CVFast
            </span>
            <h2 className="font-display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] text-fg">
              Un CV professionnel,
              <br />
              en quelques étapes.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-fg/70 sm:text-lg lg:justify-self-end">
            CVFast réunit un éditeur guidé et un aperçu en direct : vous
            remplissez, il met en forme, vous exportez en PDF ou DOCX. Le tout
            dans le navigateur, sans compte.
          </p>
        </div>

        <div className="mt-14 border-t border-fg/10">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-center gap-8 border-b border-fg/10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14"
            >
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-4xl font-extrabold leading-none text-fg/15 sm:text-5xl">
                    0{idx + 1}
                  </span>
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand ring-1 ring-brand/10">
                    <f.icon className="size-5" />
                  </span>
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold text-fg sm:text-3xl">
                  {f.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-fg/70">
                  {f.desc}
                </p>
              </div>
              <f.Visual />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#comment"
            className="group inline-flex items-center gap-1.5 rounded-full border border-fg/15 px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-brand/50 hover:text-brand"
          >
            Voir comment ça marche
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
