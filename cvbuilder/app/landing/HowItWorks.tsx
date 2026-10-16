"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhoneMockup } from "./PhoneMockup";
import { ScreenChoose, ScreenFill, ScreenCustomize, ScreenExport } from "./Screens";

interface Step {
  title: string;
  text: string;
  Screen: React.FC;
}

const STEPS: Step[] = [
  {
    title: "Choisissez",
    text: "Parcourez nos modèles professionnels et choisissez celui qui correspond à votre métier et à votre personnalité.",
    Screen: ScreenChoose,
  },
  {
    title: "Renseignez",
    text: "Informations personnelles, expériences, formations, compétences : chaque section est guidée et prête à remplir.",
    Screen: ScreenFill,
  },
  {
    title: "Personnalisez",
    text: "Couleurs, typographies, aperçu en direct. Ajustez les détails jusqu'à obtenir le rendu parfait.",
    Screen: ScreenCustomize,
  },
  {
    title: "Téléchargez",
    text: "Exportez en PDF ou DOCX, sans filigrane, optimisé ATS. Vous pouvez revenir modifier votre CV à tout moment.",
    Screen: ScreenExport,
  },
];

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const CurrentScreen = STEPS[activeStep].Screen;

  return (
    <section
      id="comment"
      className="relative overflow-hidden bg-panel py-24 text-panel-fg sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.2),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-panel-fg/10 px-3.5 py-1 text-xs font-semibold text-brand">
            Comment ça marche
          </span>
          <h2 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.95] text-panel-fg">
            Du template au PDF,
            <br />
            tout est fluide.
          </h2>
        </div>

        <div className="mt-16 hidden items-center lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="space-y-6">
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-3xl p-7 transition-all duration-300 ${
                    isActive
                      ? "bg-panel-fg/10 shadow-lg ring-1 ring-white/10"
                      : "opacity-50 hover:bg-panel-fg/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display text-sm font-bold tabular-nums ${
                        isActive ? "text-brand" : "text-panel-fg/60"
                      }`}
                    >
                      Étape 0{idx + 1}
                    </span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                  </div>
                  <h3 className="font-display mt-2 text-3xl font-bold text-panel-fg sm:text-4xl">
                    {step.title}.
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-panel-fg/75">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="sticky top-28 flex justify-center">
            <PhoneMockup className="w-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <CurrentScreen />
                </motion.div>
              </AnimatePresence>
            </PhoneMockup>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center lg:hidden">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {STEPS.map((step, idx) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeStep === idx
                    ? "bg-brand text-white shadow-md"
                    : "bg-panel-fg/10 text-panel-fg/70 hover:bg-panel-fg/15"
                }`}
              >
                0{idx + 1}. {step.title}
              </button>
            ))}
          </div>

          <div className="mb-8 px-2 text-center">
            <h3 className="font-display text-3xl font-bold text-panel-fg">
              {STEPS[activeStep].title}.
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-panel-fg/75">
              {STEPS[activeStep].text}
            </p>
          </div>

          <div className="flex w-full justify-center">
            <PhoneMockup className="w-[min(290px,82vw)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <CurrentScreen />
                </motion.div>
              </AnimatePresence>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
};
