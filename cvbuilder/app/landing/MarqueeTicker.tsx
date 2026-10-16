"use client";
import React from "react";
import { motion } from "motion/react";
import { MARQUEE_JOB_ITEMS, MARQUEE_FEATURE_ITEMS } from "./data";

const StarSeparator = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-4 sm:size-5 shrink-0 opacity-80"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 0l2.6 8.2L23 6.6l-6.2 5.4L23 17.4l-8.4-1.6L12 24l-2.6-8.2L1 17.4l6.2-5.4L1 6.6l8.4 1.6z"
    />
  </svg>
);

interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({
  items,
  direction = "left",
  speed = 28,
  className = "",
}) => {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden whitespace-nowrap select-none">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className={`flex shrink-0 items-center ${className}`}
      >
        {repeated.map((item, idx) => (
          <span key={idx} className="flex items-center">
            <span className="px-5 sm:px-7">{item}</span>
            <StarSeparator />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const MarqueeTicker: React.FC = () => {
  return (
    <section
      aria-label="Métiers et fonctionnalités"
      className="relative z-10 overflow-hidden py-14 select-none"
    >
      <div className="-rotate-[2.5deg] scale-[1.04] bg-brand py-3.5 sm:py-5 text-[#0a1120] shadow-[0_20px_60px_-30px_rgba(96,165,250,0.8)]">
        <MarqueeRow
          items={MARQUEE_JOB_ITEMS}
          direction="left"
          speed={32}
          className="font-display text-[clamp(1.8rem,5vw,3.6rem)] font-bold uppercase leading-none"
        />
      </div>

      <div className="-mt-3 rotate-[1.8deg] scale-[1.04] bg-panel py-3.5 sm:py-5 text-panel-fg shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]">
        <MarqueeRow
          items={MARQUEE_FEATURE_ITEMS}
          direction="right"
          speed={30}
          className="font-display text-[clamp(1.8rem,5vw,3.6rem)] font-bold uppercase leading-none"
        />
      </div>
    </section>
  );
};
