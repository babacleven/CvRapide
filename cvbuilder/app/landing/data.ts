export const TARGET_CREATION_MINUTES = 10;

export const NAV_LINKS = [
  { href: "#avantages", label: "Avantages" },
  { href: "#comment", label: "Comment ça marche" },
  { href: "#templates", label: "Modèles" },
  { href: "#faq", label: "FAQ" },
];

export const MARQUEE_JOB_ITEMS = [
  "Développeur",
  "Designer",
  "Chef de projet",
  "Commercial",
  "Comptable",
  "Infirmier",
  "Étudiant",
  "Cadre",
  "Freelance",
  "Marketing",
  "RH",
  "Data Analyst",
  "Ingénieur",
];

export const MARQUEE_FEATURE_ITEMS = [
  "Optimisé ATS",
  "Export PDF",
  "Modèles pro",
  "En ligne",
  "Gratuit",
  "Sans filigrane",
  "Modifiable",
  "100% responsive",
  "Export DOCX",
  "Sections intelligentes",
  "Rapide",
  "Pro",
];

export const STATS = [
  { value: 10, unit: "min", label: "Pour créer votre CV" },
  { value: 3, unit: "", label: "Modèles professionnels" },
  { value: 100, unit: "%", label: "Gratuit" },
  { value: 96, unit: "%", label: "Des utilisateurs recommandent" },
];

export const FAQ_LIST = [
  {
    q: "Est-ce gratuit ?",
    a: "Oui, vous pouvez créer votre CV gratuitement. Aucune carte de crédit requise.",
  },
  {
    q: "Puis-je modifier mon CV ?",
    a: "Oui, vos CV restent modifiables à tout moment. Vous pouvez les mettre à jour et les retélécharger.",
  },
  {
    q: "Quels formats sont disponibles ?",
    a: "Vous pouvez exporter votre CV en PDF et en DOCX pour une compatibilité maximale.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Absolument. Nous utilisons le chiffrement de bout en bout et ne partageons jamais vos données avec des tiers.",
  },
  {
    q: "Mon CV est-il optimisé pour les ATS ?",
    a: "Oui, nos modèles sont conçus pour être lisibles par les systèmes de suivi des candidatures (ATS).",
  },
  {
    q: "Ai-je besoin d'un compte ?",
    a: "Non, vous pouvez créer et exporter votre CV sans inscription obligatoire.",
  },
  {
    q: "Puis-je le télécharger sur mobile ?",
    a: "Oui, CVFast est entièrement responsive et fonctionne parfaitement sur mobile, tablette et ordinateur.",
  },
];

export const TEMPLATES = [
  {
    kicker: "Moderne",
    title: "Moderne",
    color: "bg-brand text-white",
    muted: "text-white/75",
    image: "/moderne.png",
    href: "/builder",
    points: [
      "Design épuré et moderne",
      "Idéal pour métiers tech/digital",
      "Très lisible, optimisé ATS",
      "Sections mises en valeur",
    ],
  },
  {
    kicker: "Classique",
    title: "Classique",
    color: "bg-panel text-panel-fg",
    muted: "text-panel-fg/75",
    image: "/classic.png",
    href: "/builder",
    points: [
      "Style sobre et professionnel",
      "Idéal pour tous les secteurs",
      "Structure traditionnelle",
      "Excellent pour les recruteurs",
    ],
  },
  {
    kicker: "Expérience",
    title: "Expérience",
    color: "bg-leaf text-white",
    muted: "text-white/75",
    image: "/experience3.png",
    href: "/builder",
    points: [
      "Mise en avant de l'expérience",
      "Idéal pour profils seniors",
      "Hiérarchie visuelle claire",
      "Focus sur les réalisations",
    ],
  },
];

export const SOCIAL = [
  {
    label: "WhatsApp",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    link: "https://wa.me/242068038524",
  },
  {
    label: "GitHub",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    link: "https://github.com/babacleven/cvbuilder.git",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    link: "https://linkedin.com/in/aristote-cleven-baba-512463302",
  },
];
