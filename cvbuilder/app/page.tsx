"use client";

import "./landing-styles/woudy.css";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import { IntroSplash } from "./landing/IntroSplash";
import { ScrollProgress } from "./landing/ScrollProgress";
import { Navbar } from "./landing/Navbar";
import { Hero } from "./landing/Hero";
import { MarqueeTicker } from "./landing/MarqueeTicker";
import { Avantages } from "./landing/Avantages";
import { HowItWorks } from "./landing/HowItWorks";
import { Templates } from "./landing/Templates";
import { Metrics } from "./landing/Metrics";
import { DownloadBanner } from "./landing/DownloadBanner";
import { FAQ } from "./landing/FAQ";
import { Footer } from "./landing/Footer";
import type { LegalDocType } from "./landing/Footer";
import { LegalModal } from "./landing/LegalModal";
import { ReviewModal } from "./landing/ReviewModal";
import type { Review } from "./landing/ReviewModal";

const INTRO_KEY = "cvfast:intro-seen";
const THEME_KEY = "theme-cvfast";

export default function LandingPage() {
  const [intro, setIntro] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem(INTRO_KEY);

    if (seen || prefersReduced) {
      setIntro(false);
      return;
    }

    sessionStorage.setItem(INTRO_KEY, "1");
    const t = setTimeout(() => setIntro(false), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      setIsDark(!document.documentElement.classList.contains("theme-clair"));
    } catch {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    document.title = "CVFast - Créez un CV professionnel en quelques minutes";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Créez un CV moderne, professionnel et optimisé ATS en quelques minutes.",
      );
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("theme-clair", !next);
      try {
        localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleSubmitReview = (review: Review) => {
    setReviewOpen(false);
    void review;
  };

  return (
    <div className="wy-root wy-grain min-h-screen">
      <AnimatePresence>
        {intro && <IntroSplash key="intro" />}
      </AnimatePresence>

      <ScrollProgress />
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <MarqueeTicker />
        <Avantages />
        <HowItWorks />
        <Templates />
        <Metrics />
        <DownloadBanner />
        <FAQ />
      </main>

      <Footer
        onOpenLegal={(tab) => setLegalDoc(tab)}
        onOpenReview={() => setReviewOpen(true)}
      />

      <LegalModal
        doc={legalDoc}
        onChange={(tab) => setLegalDoc(tab)}
        onClose={() => setLegalDoc(null)}
      />

      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
