"use client";

import "./landing-styles/main.css";
import { useEffect, useRef, useState } from "react";

type Review = {
  name: string;
  initial: string;
  title: string;
  stars: number;
  quote: string;
};

const faqData = [
  {
    question: "Est-ce gratuit ?",
    answer:
      "Oui, vous pouvez créer votre premier CV gratuitement. Aucune carte de crédit requise.",
  },
  {
    question: "Puis-je modifier mon CV ?",
    answer:
      "Oui, vos CV restent modifiables à tout moment. Vous pouvez les mettre à jour et les retélécharger.",
  },
  {
    question: "Quels formats sont disponibles ?",
    answer:
      "Vous pouvez exporter votre CV en PDF et en DOCX pour une compatibilité maximale.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. Nous utilisons le chiffrement de bout en bout et ne partageons jamais vos données avec des tiers.",
  },
];

const reviewsInit: Review[] = [
  {
    name: "Kevin M.",
    initial: "K",
    title: "Étudiant",
    stars: 5,
    quote:
      "J'ai créé mon CV en moins de 10 minutes. Très simple à utiliser, les modèles sont modernes et professionnels.",
  },
  {
    name: "Grâce N.",
    initial: "G",
    title: "Développeuse",
    stars: 4,
    quote:
      "J'aimerais avoir plus de modèles, mais le résultat est très propre. Mon CV a été bien reçu par les recruteurs.",
  },
  {
    name: "Mohamed A.",
    initial: "M",
    title: "Chef de projet",
    stars: 5,
    quote:
      "La version gratuite est déjà très complète. J'ai pu personnaliser mon CV facilement et l'exporter en PDF.",
  },
];

export default function LandingPage() {
  const [isLight, setIsLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState<"oui" | "non">("oui");
  const [submitting, setSubmitting] = useState(false);
  const [ratingError, setRatingError] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(reviewsInit);

  const statsRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme-cvfast");
    const light = saved === "light";
    setIsLight(light);
    document.body.classList.toggle("theme-clair", light);
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

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            el.querySelectorAll<HTMLElement>("[data-count]").forEach((stat) => {
              const target = parseInt(stat.dataset.count || "0", 10);
              const duration = 2000;
              const start = performance.now();
              const updateCounter = (t: number) => {
                const progress = Math.min((t - start) / duration, 1);
                const current = Math.floor(progress * target);
                stat.textContent =
                  current >= 1000 ? current.toLocaleString("fr-FR") : String(current);
                if (progress < 1) requestAnimationFrame(updateCounter);
                else
                  stat.textContent =
                    target >= 1000 ? target.toLocaleString("fr-FR") : String(target);
              };
              requestAnimationFrame(updateCounter);
            });
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = termRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let delay = 0;
            el.querySelectorAll("[data-terminal-line]").forEach((line) => {
              setTimeout(() => line.classList.add("est-visible"), delay);
              delay += 200;
            });
            const progress = el.querySelector<HTMLElement>("[data-terminal-progress]");
            if (progress) {
              setTimeout(() => {
                progress.style.width = "100%";
              }, delay);
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const next = !prev;
      document.body.classList.toggle("theme-clair", next);
      localStorage.setItem("theme-cvfast", next ? "light" : "dark");
      return next;
    });
  };

  const renderStars = (count: number) => (
    <span className="stars">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );

  const handleSubmitReview = () => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setRatingError(false);
    setSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        initial: "U",
        name: "Utilisateur CVFast",
        title: recommend === "oui" ? "Recommande 👍" : "Utilisateur",
        stars: rating,
        quote: comment.trim() || "Aucun commentaire",
      };
      setReviews((prev) => [newReview, ...prev]);
      setModalOpen(false);
      setRating(0);
      setHoverRating(0);
      setRecommend("oui");
      setComment("");
      setSubmitting(false);
      import("canvas-confetti").then(({ default: confetti }) => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
      });
    }, 1500);
  };

  const ratingLabels = ["", "Pas satisfait", "Moyen", "Bien", "Très bien", "Excellent !"];

  return (
    <>
      <header className="entete" id="entete">
        <div className="entete-contenu">
          <a className="logo" href="/" aria-label="CVFast - accueil">
            <i className="fa-solid fa-file-pen"></i>
            <span>
              CV<span style={{ color: "var(--color-primary)" }}>Fast</span>
            </span>
          </a>

          <nav
            className={`nav-principale ${menuOpen ? "est-ouvert" : ""}`}
            id="navigation"
            aria-label="Navigation principale"
          >
            <a href="#templates" onClick={() => setMenuOpen(false)}>Modèles</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Fonctionnalités</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Avis</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <a
              href="https://github.com"
              className="lien-source"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>
            <a
              href="/builder"
              className="lien-navigation-cta"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-file-pen"></i>
              <span>Créer mon CV</span>
            </a>
          </nav>

          <div className="entete-actions">
            <button
              className="theme-btn"
              id="themeToggle"
              aria-label="Changer de thème"
              onClick={toggleTheme}
            >
              <i className={isLight ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
            </button>
            <a href="/builder" className="bouton-principal">
              Créer mon CV
            </a>
          </div>

          <button
            className={`bouton-navigation-mobile ${menuOpen ? "est-ouvert" : ""}`}
            type="button"
            id="menuToggle"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="icone-navigation" aria-hidden="true">
              <i className="fa-solid fa-bars"></i>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="conteneur hero-grille">
            <div className="hero-contenu">
              <span className="badge-cvfast">
                <span className="pulse"></span>
                Création de CV nouvelle génération
              </span>
              <h1 className="hero-titre">
                Créez un CV professionnel{" "}
                <span className="gradient-text">qui décroche des entretiens</span>
              </h1>
              <p className="hero-texte">
                Choisissez un modèle moderne, personnalisez votre CV et téléchargez-le en PDF en
                quelques minutes.
              </p>
              <div className="hero-buttons"></div>
              <div className="hero-trust">
                <div>
                  <i className="fa-solid fa-check"></i> Modèles professionnels
                </div>
                <div>
                  <i className="fa-solid fa-check"></i> Optimisé ATS
                </div>
                <div>
                  <i className="fa-solid fa-check"></i> Export PDF
                </div>
              </div>
            </div>
            <div className="terminal-colonne">
              <div className="terminal">
                <div className="terminal-barre">
                  <div className="terminal-pastilles">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="terminal-label">CVFast</span>
                </div>
                <div
                  className="terminal-corps"
                  ref={termRef}
                  role="img"
                  aria-label="Génération d'un CV professionnel"
                >
                  <div data-terminal-line>
                    <span className="terminal-prompt">&gt;</span> Initialisation de CVFast
                  </div>
                  <div className="terminal-ligne-vide" data-terminal-line></div>
                  <div data-terminal-line>
                    <span className="terminal-info">[i] Chargement des modèles...</span>
                  </div>
                  <div className="terminal-ligne-vide" data-terminal-line></div>
                  <div data-terminal-line>
                    Modèle Moderne
                    <span className="terminal-ok">[OK]</span>
                  </div>
                  <div data-terminal-line>
                    Modèle ATS Friendly
                    <span className="terminal-ok">[OK]</span>
                  </div>
                  <div data-terminal-line>
                    Modèle Développeur
                    <span className="terminal-ok">[OK]</span>
                  </div>
                  <div className="terminal-ligne-vide" data-terminal-line></div>
                  <div data-terminal-line>
                    <span className="terminal-prompt">&gt;</span> Personnalisation en cours
                  </div>
                  <div className="terminal-ligne-vide" data-terminal-line></div>
                  <div data-terminal-line>
                    <span className="terminal-info">[i] Application des informations...</span>
                  </div>
                  <div className="terminal-ligne-vide" data-terminal-line></div>
                  <div data-terminal-line>Expériences importées</div>
                  <div data-terminal-line data-terminal-progress-start>
                    Compétences formatées
                  </div>
                  <div className="terminal-progression">
                    <div
                      className="terminal-progression-barre"
                      data-terminal-progress
                    ></div>
                  </div>
                  <div className="terminal-ligne-vide" data-terminal-line></div>
                  <div data-terminal-line>
                    <span className="terminal-success">SUCCESS: CV prêt en 3 minutes.</span>
                  </div>
                </div>
              </div>
              <a href="/builder" className="bouton-principal">
                Créer mon CV maintenant
                <i className="fa-solid fa-arrow-right fleche"></i>
              </a>
            </div>
          </div>
        </section>

        <section className="stats-section" ref={statsRef}>
          <div className="conteneur stats-grid">
            <div className="stat-card">
              <h2 data-count="50000">0</h2>
              <p>CV créés</p>
            </div>
            <div className="stat-card">
              <h2 data-count="3280">0</h2>
              <p>Utilisateurs inscrits</p>
            </div>
            <div className="stat-card">
              <div className="stars">★★★★★</div>
              <h2>4.8</h2>
              <p className="rating-text">/ 5 de satisfaction</p>
            </div>
            <div className="stat-card">
              <div className="stars">★★★★★</div>
              <h2>96%</h2>
              <p className="rating-text">des utilisateurs recommandent</p>
            </div>
          </div>
        </section>

        <section className="process">
          <div className="conteneur">
            <div className="section-title">
              <h2>Comment ça marche ?</h2>
              <p>Créez votre CV en trois étapes simples.</p>
            </div>
            <div className="process-grid">
              <div className="process-card">
                <span>01</span>
                <h3>Choisissez un modèle</h3>
                <p>Sélectionnez un design adapté à votre métier.</p>
              </div>
              <div className="process-card">
                <span>02</span>
                <h3>Ajoutez vos informations</h3>
                <p>Remplissez vos expériences et compétences.</p>
              </div>
              <div className="process-card">
                <span>03</span>
                <h3>Téléchargez votre CV</h3>
                <p>Exportez votre CV professionnel en PDF.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="reviews" id="reviews">
          <div className="conteneur">
            <div className="section-title">
              <h2>Ce que nos utilisateurs disent</h2>
              <p>Des avis authentiques de personnes qui ont utilisé CVFast</p>
            </div>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div className="review-card" key={`${review.name}-${index}`}>
                  {renderStars(review.stars)}
                  <blockquote>&quot;{review.quote}&quot;</blockquote>
                  <div className="author">
                    <div className="initial">{review.initial}</div>
                    <div>
                      <div className="name">{review.name}</div>
                      <div className="title">{review.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="templates" id="templates">
          <div className="conteneur">
            <div className="section-title">
              <h2>Nos modèles de CV</h2>
              <p>Des designs modernes adaptés à chaque profil.</p>
            </div>
            <div className="template-grid">
              <div className="template-card">
                <div className="template-image">
                  <img src="/moderne.png" alt="Modèle Moderne" />
                </div>
                <h3>Moderne</h3>
                <a href="/builder">
                  Utiliser ce modèle <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <div className="template-card">
                <div className="template-image">
                  <img src="/experience.png" alt="Modèle ATS Friendly" />
                </div>
                <h3>ATS Friendly</h3>
                <a href="/builder">
                  Utiliser ce modèle <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
              <div className="template-card">
                <div className="template-image">
                  <img src="/classic.png" alt="Modèle Développeur" />
                </div>
                <h3>Développeur</h3>
                <a href="/builder">
                  Utiliser ce modèle <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="conteneur">
            <div className="section-title">
              <h2>Pourquoi choisir CVFast ?</h2>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                <h3>Création rapide</h3>
                <p>Un CV professionnel en quelques minutes.</p>
              </div>
              <div className="feature-card">
                <i className="fa-solid fa-file-pdf"></i>
                <h3>Export PDF</h3>
                <p>Téléchargez un fichier haute qualité.</p>
              </div>
              <div className="feature-card">
                <i className="fa-solid fa-robot"></i>
                <h3>Compatible ATS</h3>
                <p>Optimisé pour les logiciels RH.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="faq" id="faq">
          <div className="conteneur">
            <div className="section-title">
              <h2>Questions fréquentes</h2>
            </div>
            <div className="faq-list">
              {faqData.map((item, index) => (
                <div
                  className={`faq-item ${openFaq === index ? "active" : ""}`}
                  key={item.question}
                >
                  <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                    {item.question} <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <div className="answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="conteneur">
            <h2 className="cta-titre">Votre prochain emploi commence avec un bon CV.</h2>
            <a href="/builder" className="bouton-principal">
              <i className=""></i>
              Créer mon CV gratuitement
            </a>
            <div className="cta-avis">
              <button
                className="lien-secondaire"
                onClick={() => setModalOpen(true)}
              >
                <i className=""></i>
                Donner mon avis
              </button>
            </div>
          </div>
        </section>

        {modalOpen && (
          <div className="review-modal open" id="reviewModal">
            <div className="review-modal-content">
              <div className="modal-header">
                <span className="emoji">🎉</span>
                <h3>Votre CV est prêt !</h3>
                <p>Si cette plateforme vous a fait gagner du temps, pourriez-vous lui donner une note ?</p>
              </div>
              <div className="star-rating" id="starRating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    data-value={value}
                    aria-label={`${value} étoile${value > 1 ? "s" : ""}`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <i
                      className={
                        value <= (hoverRating || rating)
                          ? ""
                          : "fa-regular fa-star"
                      }
                    ></i>
                  </button>
                ))}
              </div>
              <div
                className="rating-label"
                id="ratingLabel"
                style={ratingError ? { color: "var(--color-danger)" } : undefined}
              >
                {ratingError
                  ? "⚠️ Veuillez sélectionner une note"
                  : rating > 0
                    ? ratingLabels[rating]
                    : "Cliquez sur une étoile pour noter"}
              </div>
              <textarea
                placeholder="Votre commentaire (optionnel)..."
                id="reviewComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="recommend">
                <p>Recommanderiez-vous cette plateforme à un ami ?</p>
                <div className="buttons">
                  <button
                    id="recommendYes"
                    className={recommend === "oui" ? "selected-yes" : ""}
                    onClick={() => setRecommend("oui")}
                  >
                    Oui
                  </button>
                  <button
                    id="recommendNo"
                    className={recommend === "non" ? "selected-no" : ""}
                    onClick={() => setRecommend("non")}
                  >
                    Non
                  </button>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-secondaire" id="closeReviewModal" onClick={() => setModalOpen(false)}>
                  Annuler
                </button>
                <button
                  className="bouton-principal"
                  id="submitReview"
                  onClick={handleSubmitReview}
                  disabled={submitting}
                >
                  {submitting ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-regular fa-paper-plane"></i>
                  )}
                  {submitting ? " Envoi..." : " Envoyer mon avis"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="pied-de-page">
        <div className="conteneur">
          <div className="footer-marque">
            <i className="fa-solid fa-file-pen"></i>
            <span>
              CV<span style={{ color: "var(--color-primary)" }}>Fast</span>
            </span>
          </div>
          <p>&copy; 2026 CVFast  baba aristote cleven. Tous droits réservés.</p>
          <div className="footer-liens">
            <a href="#templates">Modèles</a>
            <a href="#features">Fonctionnalités</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
