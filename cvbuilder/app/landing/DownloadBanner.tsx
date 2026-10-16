"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { ScreenChoose, ScreenExport } from "./Screens";

export const DownloadBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const phone1Y = useTransform(scrollYProgress, [0, 1], [140, -80]);
  const phone2Y = useTransform(scrollYProgress, [0, 1], [180, -40]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  return (
    <section
      id="telecharger"
      ref={containerRef}
      className="relative isolate overflow-hidden bg-brand text-white"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: watermarkX }}
        className="pointer-events-none absolute -bottom-[6vw] left-0 -z-10 w-[130vw] select-none text-white/[0.08]"
      >
        <span className="font-display block text-center text-[22vw] font-extrabold leading-none tracking-tighter">
          CVFast
        </span>
      </motion.div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-24 sm:pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pt-28">
        <div className="pb-8 lg:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-sm"
          >
            Gratuit · Sans inscription
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display mt-5 text-[clamp(2.6rem,6.6vw,5.6rem)] font-extrabold leading-[0.92] text-white"
          >
            Votre prochain
            <br />
            job est à <span className="text-panel">3 clics.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/90 sm:text-lg"
          >
            Choisissez un modèle, remplissez, exportez. Votre CV professionnel est
            prêt en quelques minutes, sans prise de tête.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-9"
          >
            <motion.a
              href="/builder"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="group inline-flex h-15 items-center gap-3 rounded-2xl bg-panel px-7 font-semibold text-panel-fg shadow-md transition-colors hover:bg-panel/90"
            >
              <span>Créer mon CV gratuitement</span>
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="mt-8"
          >
            <a
              href="#faq"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
            >
              <span className="underline-offset-4 group-hover:underline">
                Une question ? Consultez la FAQ
              </span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="relative flex h-[480px] justify-center sm:h-[580px] lg:h-[660px]">
          <motion.div
            style={{ y: phone1Y }}
            className="absolute left-1/2 top-0 -ml-[230px] hidden -rotate-[8deg] select-none sm:block"
          >
            <PhoneMockup className="w-[260px]">
              <ScreenChoose />
            </PhoneMockup>
          </motion.div>

          <motion.div
            style={{ y: phone2Y }}
            className="absolute left-1/2 top-4 -ml-[130px] rotate-[5deg] select-none sm:-ml-[30px]"
          >
            <PhoneMockup className="w-[min(270px,78vw)] sm:w-[290px]">
              <ScreenExport />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
