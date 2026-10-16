"use client";

import "./landing-styles/woudy.css";
import { useEffect, useState } from "react";

import { ScrollProgress } from "./landing/ScrollProgress";
import { Navbar } from "./landing/Navbar";
import { Hero } from "./landing/Hero";
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

export default function LandingPage() {
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);

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

  const handleSubmitReview = (review: Review) => {
    setReviewOpen(false);
    void review;
  };

  return (
    <div className="wy-root wy-grain min-h-screen">
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
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
