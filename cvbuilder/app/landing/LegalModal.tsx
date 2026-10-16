"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { LegalDocType } from "./Footer";

interface LegalModalProps {
  doc: LegalDocType | null;
  onChange: (doc: LegalDocType) => void;
  onClose: () => void;
}

const TABS: { id: LegalDocType; label: string }[] = [
  { id: "confidentialite", label: "Confidentialité" },
  { id: "conditions", label: "Conditions" },
  { id: "cookies", label: "Cookies" },
  { id: "securite", label: "Sécurité" },
];

export const LegalModal: React.FC<LegalModalProps> = ({
  doc,
  onChange,
  onClose,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!doc) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [doc, onClose]);

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-panel/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-card p-6 text-fg/75 shadow-2xl sm:p-10"
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-fg/5 text-fg transition-colors hover:bg-fg/10"
            >
              <X className="size-5" />
            </button>

            <h2 id="legal-title" className="font-display pr-12 text-3xl font-bold text-fg">
              Informations légales
            </h2>

            <div role="tablist" className="mt-6 flex flex-wrap gap-2">
              {TABS.map((tab) => {
                const isActive = doc === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => onChange(tab.id)}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-white" : "text-fg/60 hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="legal-tab"
                        className="absolute inset-0 rounded-full bg-panel"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-4 text-sm leading-relaxed sm:text-base">
              {doc === "confidentialite" && (
                <>
                  <p>
                    CVFast respecte votre vie privée. Les données que vous renseignez
                    pour créer un CV ne sont utilisées que pour générer votre
                    document et ne sont jamais revendues.
                  </p>
                  <p>
                    Vos informations restent sur votre appareil autant que possible.
                    Pour toute demande d'accès, de rectification ou de suppression,
                    écrivez à{" "}
                    <a
                      href="mailto:contact@cvfast.app"
                      className="font-semibold text-brand hover:underline"
                    >
                      contact@cvfast.app
                    </a>
                    .
                  </p>
                </>
              )}

              {doc === "conditions" && (
                <>
                  <p>
                    CVFast est un créateur de CV en ligne. L'utilisation du service
                    implique l'acceptation des présentes conditions générales
                    d'utilisation.
                  </p>
                  <p>
                    Le service est gratuit pour créer et modifier vos CV. Vous restez
                    propriétaire du contenu que vous saisissez et des documents
                    exportés.
                  </p>
                  <p>
                    Vous vous engagez à ne pas utiliser CVFast à des fins illicites ni
                    à importer de contenu malveillant.
                  </p>
                </>
              )}

              {doc === "cookies" && (
                <>
                  <p>
                    CVFast utilise uniquement des cookies essentiels au
                    fonctionnement, notamment pour mémoriser vos préférences comme le
                    thème d'affichage.
                  </p>
                  <p>
                    Aucun cookie publicitaire n'est déposé sans votre accord. Vous
                    pouvez à tout moment effacer ces préférences depuis les réglages
                    de votre navigateur.
                  </p>
                </>
              )}

              {doc === "securite" && (
                <>
                  <p>
                    La sécurité de vos données est une priorité. Vos contenus sont
                    traités de manière chiffrée et nous n'accédons jamais à vos
                    documents sans votre accord.
                  </p>
                  <p>
                    Aucun partage avec des tiers à des fins commerciales. En cas
                    d'incident, les utilisateurs concernés sont informés dans les
                    meilleurs délais.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
