"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "motion/react";
import { STATS } from "./data";

const AnimatedCounter: React.FC<{ to: number; delay?: number }> = ({ to, delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (val) => {
        node.textContent = String(Math.round(val));
      },
    });
    return () => controls.stop();
  }, [isInView, to, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      0
    </span>
  );
};

export const Metrics: React.FC = () => {
  return (
    <section aria-label="CVFast en chiffres" className="border-y border-fg/10 bg-page/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.8,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`px-5 py-10 sm:py-14 ${
              idx % 2 === 1 ? "border-l border-fg/10" : ""
            } ${idx >= 2 ? "border-t border-fg/10 lg:border-t-0" : ""} ${
              idx === 2 ? "lg:border-l" : ""
            }`}
          >
            <p className="font-display flex items-baseline gap-1.5 text-[clamp(2.8rem,6.5vw,4.8rem)] font-extrabold leading-none text-fg">
              <AnimatedCounter to={stat.value} delay={idx * 0.08} />
              {stat.unit && (
                <span className="text-[0.42em] font-bold text-brand">{stat.unit}</span>
              )}
            </p>
            <p className="mt-3 text-sm font-medium text-fg/65 sm:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
