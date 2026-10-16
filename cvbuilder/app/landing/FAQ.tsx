"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Mail } from "lucide-react";
import { FAQ_LIST, SOCIAL } from "./data";

const MailIcon = ({ className }: { className?: string }) => (
  <Mail className={className} />
);

const WHATSAPP = SOCIAL.find((s) => s.label === "WhatsApp");

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand/10">
            FAQ
          </span>
          <h2 className="font-display mt-5 text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.95] text-fg">
            Questions
            <br />
            fréquentes.
          </h2>

          <div className="mt-8 rounded-[28px] bg-panel p-7 text-panel-fg shadow-xl">
            <p className="font-display text-xl font-bold">Une autre question ?</p>
            <p className="mt-2 text-sm leading-relaxed text-panel-fg/70">
              Notre équipe vous répond tous les jours.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href="mailto:contact@cvfast.app"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                <MailIcon className="size-4" />
                <span>contact@cvfast.app</span>
              </a>
              <a
                href={WHATSAPP?.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 fill-current"
                  aria-hidden="true"
                >
                  <path d={WHATSAPP?.path ?? ""} />
                </svg>
                <span>Discuter sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-fg/10">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="border-b border-fg/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-bold text-fg sm:text-xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-brand text-white shadow-md shadow-brand/20"
                          : "bg-fg/5 text-fg group-hover:bg-fg/10"
                      }`}
                    >
                      <Plus className="size-5" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-6 text-sm leading-relaxed text-fg/75 sm:pr-12 sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
