"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, FileText, Layout, Briefcase } from "lucide-react";
import { TEMPLATES } from "./data";

const ICONS = [Layout, FileText, Briefcase];

export const Templates: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="templates" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand/10">
              3 modèles professionnels
            </span>
            <h2 className="font-display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)] font-extrabold leading-[0.95] text-fg">
              Choisissez
              <br />
              votre style{" "}
              <span className="text-brand">de CV.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-fg/70 sm:text-lg lg:justify-self-end">
            Moderne, Classique ou Expérience : trois mises en page pensées pour
            convaincre les recruteurs. Personnalisez-les à votre guise.
          </p>
        </div>

        <div className="mt-14 hidden h-[560px] gap-3 lg:flex">
          {TEMPLATES.map((tpl, idx) => {
            const isExpanded = active === idx;
            const Icon = ICONS[idx];

            return (
              <motion.div
                key={tpl.title}
                role="group"
                tabIndex={0}
                aria-label={tpl.title}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setActive(idx)}
                animate={{ flexGrow: isExpanded ? 3.2 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-[32px] p-8 shadow-xl ${tpl.color}`}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 -right-10 opacity-[0.14]"
                  animate={{
                    rotate: isExpanded ? -10 : 0,
                    scale: isExpanded ? 1 : 0.75,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon className="size-72" strokeWidth={1.2} />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex select-none flex-col justify-between p-7"
                  animate={{ opacity: isExpanded ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden={isExpanded}
                >
                  <span className="font-display text-xl font-bold">0{idx + 1}</span>
                  <span className="font-display rotate-180 self-start text-3xl font-bold tracking-wide [writing-mode:vertical-rl]">
                    {tpl.kicker}
                  </span>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="absolute inset-y-0 left-0 flex w-[520px] select-none flex-col justify-between p-10"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          delay: 0.2,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <div>
                        <span className="text-sm font-semibold uppercase tracking-widest opacity-80">
                          Modèle {tpl.kicker}
                        </span>
                        <h3 className="font-display mt-2 text-4xl font-extrabold tracking-tight">
                          {tpl.title}
                        </h3>
                        <p className={`mt-4 text-lg leading-relaxed ${tpl.muted}`}>
                          Une mise en page {tpl.title.toLowerCase()} qui met vos
                          expériences en valeur, sans détour pour les recruteurs.
                        </p>
                        <ul className="mt-6 space-y-3">
                          {tpl.points.map((pt) => (
                            <li
                              key={pt}
                              className="flex items-center gap-2.5 text-sm font-medium"
                            >
                              <span className="grid size-5 place-items-center rounded-full bg-white/20">
                                <Check className="size-3" strokeWidth={3} />
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-8">
                        <div className="flex flex-wrap items-center gap-4">
                          <motion.a
                            href={tpl.href}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-cream px-6 font-semibold text-ink shadow-md transition-colors hover:bg-white"
                          >
                            <span>Utiliser ce modèle</span>
                            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </motion.a>
                          <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/40">
                            <img
                              src={tpl.image}
                              alt={`Aperçu du modèle ${tpl.title}`}
                              loading="lazy"
                              className="h-full w-full object-cover object-top"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 space-y-4 lg:hidden">
          {TEMPLATES.map((tpl, idx) => {
            const Icon = ICONS[idx];
            return (
              <motion.div
                key={tpl.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-[28px] p-7 shadow-lg sm:p-9 ${tpl.color}`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-6 -right-6 opacity-10"
                >
                  <Icon className="size-48" strokeWidth={1} />
                </div>

                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  Modèle {tpl.kicker}
                </span>
                <h3 className="font-display mt-2 text-3xl font-bold">{tpl.title}</h3>
                <p className={`mt-3 text-base leading-relaxed ${tpl.muted}`}>
                  Une mise en page {tpl.title.toLowerCase()} qui met vos expériences
                  en valeur.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {tpl.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-center gap-2.5 text-sm font-medium"
                    >
                      <span className="grid size-5 place-items-center rounded-full bg-white/20">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={tpl.href}
                    className="group inline-flex h-14 items-center gap-2 rounded-2xl bg-cream px-6 font-semibold text-ink shadow-md transition-colors hover:bg-white"
                  >
                    <span>Utiliser ce modèle</span>
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/40">
                    <img
                      src={tpl.image}
                      alt={`Aperçu du modèle ${tpl.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
