"use client";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { CVFastLogo } from "./Logo";

interface IntroSplashProps {
  onFinish?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = () => {
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-brand pointer-events-auto"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex flex-col items-center select-none"
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <CVFastLogo
          draw="mount"
          duration={1.25}
          delay={0.15}
          className="w-[min(64vw,440px)] text-white"
        />
        <motion.p
          className="font-display mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-white/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.1,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Créez votre CV en quelques minutes
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
