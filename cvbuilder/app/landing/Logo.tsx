"use client";
import React from "react";
import { motion } from "motion/react";

export interface CVFastLogoProps {
  className?: string;
  draw?: "mount" | "inView" | false;
  duration?: number;
  delay?: number;
}

export const CVFastLogo: React.FC<CVFastLogoProps> = ({
  className = "h-9 w-auto",
  draw = false,
  duration = 1.2,
  delay = 0,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        viewBox="0 0 48 48"
        className="h-8 w-8 shrink-0"
        initial={draw ? { opacity: 0, scale: 0.8 } : {}}
        animate={draw === "mount" ? { opacity: 1, scale: 1 } : undefined}
        whileInView={draw === "inView" ? { opacity: 1, scale: 1 } : undefined}
        viewport={draw === "inView" ? { once: true, amount: 0.6 } : undefined}
        transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <rect
          x="6"
          y="8"
          width="28"
          height="32"
          rx="6"
          fill="currentColor"
          opacity="0.92"
        />
        <rect
          x="12"
          y="16"
          width="16"
          height="2.5"
          rx="1.25"
          fill="rgb(var(--wy-panel-fg))"
        />
        <rect
          x="12"
          y="22"
          width="16"
          height="2.5"
          rx="1.25"
          fill="rgb(var(--wy-panel-fg))"
        />
        <rect
          x="12"
          y="28"
          width="12"
          height="2.5"
          rx="1.25"
          fill="rgb(var(--wy-panel-fg))"
        />
        <circle cx="30" cy="18" r="6" fill="rgb(var(--wy-page))" />
        <path
          d="M27 18.5l2 2 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <motion.span
        className="font-display text-xl sm:text-2xl font-extrabold tracking-tight"
        initial={draw ? { opacity: 0, y: 6 } : {}}
        animate={draw === "mount" ? { opacity: 1, y: 0 } : undefined}
        whileInView={draw === "inView" ? { opacity: 1, y: 0 } : undefined}
        viewport={draw === "inView" ? { once: true, amount: 0.6 } : undefined}
        transition={{ delay: delay + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        CVFast
      </motion.span>
    </div>
  );
};
