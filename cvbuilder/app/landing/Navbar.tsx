"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CVFastLogo } from "./Logo";
import { NAV_LINKS } from "./data";

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (current) => {
    setIsScrolled(current > 24);
  });

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      html.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <nav
          aria-label="Navigation principale"
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow] duration-500 ${
            isScrolled && !mobileMenuOpen
              ? "bg-page/80 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.45)] ring-1 ring-fg/5 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a
            href="#top"
            aria-label="CVFast, retour en haut de page"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center"
          >
            <CVFastLogo className="text-fg transition-transform hover:scale-105" />
          </a>

          <ul
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className="relative block px-4 py-2 text-sm font-medium text-fg/80 transition-colors hover:text-fg"
                >
                  {hoveredHref === link.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-fg/[0.06]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <motion.a
                href="/builder"
                whileTap={{ scale: 0.96 }}
                className={`group inline-flex h-11 items-center gap-1.5 rounded-full pl-5 pr-4 text-sm font-semibold transition-colors ${
                  mobileMenuOpen
                    ? "bg-page text-fg hover:bg-card"
                    : "bg-brand text-white hover:bg-brand-600 shadow-md shadow-brand/20"
                }`}
              >
                <span>Créer mon CV</span>
                <span className="relative grid size-6 place-items-center overflow-hidden rounded-full bg-white/20">
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className={`relative grid size-11 place-items-center rounded-full transition-colors lg:hidden ${
                mobileMenuOpen ? "bg-page text-fg" : "bg-panel text-panel-fg"
              }`}
            >
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-current"
                animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3.5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute h-[2px] w-4 rounded-full bg-current"
                animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3.5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-panel px-6 pb-10 pt-24 text-panel-fg sm:pt-28 lg:hidden"
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-panel-fg/40">
                Menu
              </p>
              <ul className="space-y-2">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-3 font-display text-3xl font-bold text-panel-fg hover:text-brand"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="size-6 text-panel-fg/30 transition-transform group-hover:translate-x-2 group-hover:text-brand" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="space-y-3 border-t border-panel-fg/10 pt-6"
            >
              <a
                href="/builder"
                onClick={() => setMobileMenuOpen(false)}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand pl-6 pr-5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-600"
              >
                <span>Créer mon CV</span>
                <span className="relative grid size-6 place-items-center overflow-hidden rounded-full bg-white/20">
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
