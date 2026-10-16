"use client";
import React from "react";
import { ArrowUp, ArrowUpRight, Mail, Star } from "lucide-react";
import { CVFastLogo } from "./Logo";
import { SOCIAL } from "./data";

export type LegalDocType = "confidentialite" | "conditions" | "cookies" | "securite";

interface FooterProps {
  onOpenLegal: (tab: LegalDocType) => void;
  onOpenReview: () => void;
}

const COLUMNS: {
  title: string;
  links: { label: string; href: string; badge?: string; external?: boolean }[];
}[] = [
  {
    title: "Produit",
    links: [
      { label: "Modèles", href: "#templates" },
      { label: "Avantages", href: "#avantages" },
      { label: "Comment ça marche", href: "#comment" },
      { label: "Créateur de CV", href: "/builder", badge: "Nouveau" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Guide ATS", href: "#avantages" },
      { label: "Conseils CV", href: "#comment" },
      { label: "Modèle Moderne", href: "#templates" },
      { label: "Modèle Classique", href: "#templates" },
      { label: "Modèle Expérience", href: "#templates" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "#top" },
      { label: "Avis clients", href: "#faq" },
      { label: "Contact", href: "mailto:contact@cvfast.app" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Étudiants", href: "#templates" },
      { label: "Développeurs", href: "#templates" },
      { label: "Chefs de projet", href: "#templates" },
      { label: "Freelances", href: "#templates" },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenReview }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-panel pb-10 pt-20 text-panel-fg">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-panel-fg/10 pb-16 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] text-panel-fg">
              Prêt à convaincre ?
              <br />
              <span className="text-brand">Un CV.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <CreateCTA />
            <button
              type="button"
              onClick={onOpenReview}
              className="group inline-flex h-15 items-center gap-2 rounded-2xl bg-panel-fg/10 px-6 font-semibold text-panel-fg ring-1 ring-panel-fg/10 transition-colors hover:bg-panel-fg/15"
            >
              <Star className="size-4 text-brand" />
              <span>Donner mon avis</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 py-16 text-sm md:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-display text-base font-bold text-panel-fg">
                {col.title}
              </p>
              <ul className="space-y-2.5 font-medium text-panel-fg/70">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-panel-fg"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">
                          {link.badge}
                        </span>
                      )}
                      {link.external && (
                        <ArrowUpRight className="size-3.5 opacity-60" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="mb-4 font-display text-base font-bold text-panel-fg">
              Contact
            </p>
            <ul className="space-y-2.5 font-medium text-panel-fg/70">
              <li>
                <a
                  href="mailto:contact@cvfast.app"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-panel-fg"
                >
                  <Mail className="size-3.5 opacity-60" />
                  <span>contact@cvfast.app</span>
                </a>
              </li>
            </ul>

            <p className="mb-4 mt-6 font-display text-base font-bold text-panel-fg">
              Suivez-nous
            </p>
            <ul className="space-y-2.5 font-medium text-panel-fg/70">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-panel-fg"
                  >
                    <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="currentColor">
                      <path d={s.path} />
                    </svg>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="px-2 py-6 text-brand"
          aria-hidden="true"
        >
          <div className="mx-auto block w-full max-w-[1200px]">
            <CVFastLogo draw="inView" duration={1.4} />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-panel-fg/10 pt-8 text-xs text-panel-fg/50 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>© {currentYear} CVFast. Tous droits réservés.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => onOpenLegal("confidentialite")}
              className="transition-colors hover:text-panel-fg underline-offset-4 hover:underline"
            >
              Confidentialité
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal("conditions")}
              className="transition-colors hover:text-panel-fg underline-offset-4 hover:underline"
            >
              Conditions
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal("cookies")}
              className="transition-colors hover:text-panel-fg underline-offset-4 hover:underline"
            >
              Cookies
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal("securite")}
              className="transition-colors hover:text-panel-fg underline-offset-4 hover:underline"
            >
              Sécurité
            </button>

            <a
              href="#top"
              aria-label="Retour en haut de page"
              className="ml-2 grid size-9 place-items-center rounded-full bg-panel-fg/10 text-panel-fg transition-all hover:-translate-y-1 hover:bg-panel-fg/20"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CreateCTA = () => (
  <a
    href="/builder"
    className="group inline-flex h-15 items-center gap-3 rounded-2xl bg-brand px-6 font-semibold text-white shadow-md transition-colors hover:bg-brand-600"
  >
    <span>Créer mon CV</span>
    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </a>
);
