"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { TEMPLATES } from "./data";

export const Templates: React.FC = () => {
  const [active, setActive] = useState(0);
  const tpl = TEMPLATES[active];

  return (
    <section id="templates" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand/10">
            3 modèles professionnels
          </span>
          <h2 className="font-display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] text-fg">
            Choisissez votre <span className="text-brand">style de CV.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg/70 sm:text-lg">
            Moderne, Classique ou Expérience : trois mises en page pensées pour
            convaincre les recruteurs. Personnalisez-les à votre guise.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-start md:gap-12">
          {/* Sélecteur */}
          <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:flex-col md:gap-3 md:overflow-visible md:pb-0">
            {TEMPLATES.map((t, idx) => {
              const on = idx === active;
              return (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => setActive(idx)}
                  onMouseEnter={() => setActive(idx)}
                  aria-pressed={on}
                  className={`group flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 md:min-w-0 md:p-4 ${
                    on
                      ? "border-brand/60 bg-brand-50 shadow-md"
                      : "border-fg/10 bg-card hover:border-fg/25"
                  }`}
                >
                  <span className="h-12 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-fg/10">
                    <img
                      src={t.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-display block truncate text-sm font-bold text-fg">
                      0{idx + 1}. {t.title}
                    </span>
                    <span className="block truncate text-xs text-fg/60">
                      {t.points[0]}
                    </span>
                  </span>
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full transition-colors ${
                      on ? "bg-brand text-white" : "border border-fg/20"
                    }`}
                  >
                    {on && <Check className="size-3.5" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grand aperçu */}
          <div className="order-1 md:order-2 md:sticky md:top-24">
            <div className="relative overflow-hidden rounded-[28px] bg-panel p-4 ring-1 ring-fg/10 shadow-2xl sm:p-6">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-fg/15" />
                <span className="size-2.5 rounded-full bg-fg/15" />
                <span className="size-2.5 rounded-full bg-fg/15" />
                <span className="ml-2 text-xs font-medium text-panel-fg/50">
                  cvfast.app — {tpl.title}
                </span>
              </div>

              <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={tpl.image}
                    src={tpl.image}
                    alt={`Aperçu du modèle ${tpl.title}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </AnimatePresence>
                <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                  Aperçu live
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="font-display text-2xl font-extrabold text-fg">
                  {tpl.title}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {tpl.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-1.5 text-xs text-fg/70"
                    >
                      <Check className="size-3.5 text-leaf" strokeWidth={3} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <motion.a
                href={tpl.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-sm font-semibold text-[#0a1120] shadow-md"
              >
                Utiliser ce modèle
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
