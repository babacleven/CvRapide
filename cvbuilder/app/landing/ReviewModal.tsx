"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Check } from "lucide-react";

export type Review = {
  name: string;
  initial: string;
  title: string;
  stars: number;
  quote: string;
};

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, onSubmit }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState<"oui" | "non">("oui");
  const [submitting, setSubmitting] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  const handleSubmit = () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setRatingError(false);
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({
        initial: "U",
        name: "Utilisateur CVFast",
        title: recommend === "oui" ? "Recommande" : "Utilisateur",
        stars: rating,
        quote: comment.trim() || "Aucun commentaire",
      });
      setRating(0);
      setHoverRating(0);
      setRecommend("oui");
      setComment("");
      setSubmitting(false);
      import("canvas-confetti").then(({ default: confetti }) => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999,
        });
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
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
            aria-labelledby="review-title"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-card p-6 text-fg shadow-2xl sm:p-8"
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

            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand ring-1 ring-brand/10">
              Votre avis
            </span>

            <h2 id="review-title" className="font-display mt-4 pr-10 text-2xl font-extrabold leading-tight text-fg sm:text-3xl">
              Comment s'est passée votre expérience ?
            </h2>

            <div className="mt-5">
              <div className="flex justify-center gap-1.5" role="radiogroup" aria-label="Note">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-label={`${s} étoile${s > 1 ? "s" : ""}`}
                    onClick={() => {
                      setRating(s);
                      setRatingError(false);
                    }}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`size-8 ${ratingError ? "text-red-400" : "text-amber-400"}`}
                      fill={s <= (hoverRating || rating) ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              {ratingError && (
                <p className="mt-2 text-center text-xs font-semibold text-red-500">
                  Merci de choisir une note.
                </p>
              )}
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-fg">Recommanderiez-vous CVFast ?</p>
              <div className="mt-2 flex gap-2">
                {(["oui", "non"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRecommend(opt)}
                    className={`inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-semibold capitalize transition-colors ${
                      recommend === opt
                        ? "bg-brand text-white shadow-md shadow-brand/20"
                        : "bg-fg/5 text-fg/70 hover:bg-fg/10"
                    }`}
                  >
                    {recommend === opt && <Check className="size-4" strokeWidth={3} />}
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="review-comment"
                className="text-sm font-semibold text-fg"
              >
                Un commentaire ? <span className="font-normal text-fg/50">(facultatif)</span>
              </label>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Dites-nous ce que vous avez aimé…"
                className="mt-2 w-full resize-none rounded-2xl bg-page px-4 py-3 text-sm text-fg ring-1 ring-fg/10 outline-none transition focus:ring-2 focus:ring-brand"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="group mt-5 inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-600 disabled:opacity-60"
            >
              {submitting ? "Envoi en cours…" : "Envoyer mon avis"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
