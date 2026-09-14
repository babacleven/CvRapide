import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Project,
  Skill,
} from "./type";

export const personalDetailsPreset: PersonalDetails = {
  fullName: "BABA ARISTOTE CLEVEN",
  email: "babaaristote6@gmail.com",
  phone: "+242 06 803 85 24",
  address: "Brazzaville, Congo-Brazzaville",
  photoUrl: "/profile.jpg",
  github: "github.com/babacleven",
  linkedin: "linkedin.com/in/aristote-cleven-baba-512463302",
  portfolio: "portfolio-aristote.vercel.app",
  postSeeking: "Développeur Web Full-Stack",
  description:
    "Développeur Full-Stack avec plus de 2 ans d'expérience et 7+ projets livrés en production. Je conçois des applications web complètes (React, JavaScript, HTML/CSS) avec des back-ends robustes (PHP/Symfony, Laravel, Node.js/Express) adossés à des API REST sécurisées et des bases de données relationnelles ou NoSQL. En formation intensive à Akieni Academy depuis juin 2026.",
};

export const experiencesPreset: Experience[] = [
  {
    jobTitle: "Student Full Stack Developer",
    companyName: "AKIENI ACADEMY",
    startDate: "2026-06-01",
    endDate: "2026-06-01",
    isCurrent: true,
    description:
      "Formation intensive par projets réels : applications web complètes de bout en bout (front-end + back-end), API REST, modélisation de bases de données, déploiement continu (Vercel / Render) et bonnes pratiques de cybersécurité. Projets clés : BrainToSchool (système d'information scolaire), AgriCoop Connect et cvRapide.",
    city: "Brazzaville",
  },
  {
    jobTitle: "Développeur Web Backend",
    companyName: "WEBTINIX",
    startDate: "2025-01-01",
    endDate: "2026-06-01",
    isCurrent: true,
    description:
      "Maintenance et évolution d'un CRM en production (Symfony, Laravel) : résolution de bugs critiques et de vulnérabilités (CSRF, injections SQL), gestion de sprints sur Jira. Collaboration Git/GitHub : branches, pull requests et revues de code.",
    city: "Brazzaville",
  },
  {
    jobTitle: "Stagiaire Développeur Web",
    companyName: "WEBTINIX",
    startDate: "2024-10-01",
    endDate: "2024-12-01",
    isCurrent: false,
    description:
      "Développement d'applications Symfony en architecture modulaire et d'API REST consommées par des interfaces React/Vue.js. Optimisation des performances : mise en cache et optimisation des requêtes SQL.",
    city: "Brazzaville",
  },
];

export const educationsPreset: Education[] = [
  {
    school: "Akieni Academy",
    degree: "Formation Full Stack Developer",
    level: "Autre",
    description: "",
    startDate: "2026-06-01",
    endDate: "2026-06-01",
    isCurrent: true,
    city: "Brazzaville",
  },
  {
    school: "Institut des Sciences et Techniques Professionnelles",
    degree: "Licence Professionnelle en Informatique de Gestion",
    level: "Bac+3",
    description: "",
    startDate: "2022-10-01",
    endDate: "2024-09-01",
    isCurrent: false,
    city: "Brazzaville",
  },
  {
    school: "Lycée de la Révolution",
    degree: "Baccalauréat D",
    level: "Bac",
    description: "",
    startDate: "2020-10-01",
    endDate: "2021-07-01",
    isCurrent: false,
    city: "Brazzaville",
  },
];

export const languagesPreset: Language[] = [
  { language: "Français", proficiency: "Avance" },
  { language: "Anglais", proficiency: "Intermediaire" },
];

export const skillsPreset: Skill[] = [
  { name: "HTML5 / CSS3" },
  { name: "JavaScript ES6" },
  { name: "React JS" },
  { name: "Tailwind CSS" },
  { name: "Next.js / TypeScript" },
  { name: "PHP 8 POO/MVC" },
  { name: "Symfony" },
  { name: "Laravel" },
  { name: "Node.js / Express" },
  { name: "API REST / JWT" },
  { name: "MySQL / PostgreSQL / MongoDB" },
  { name: "Git / GitHub / Docker" },
];

export const projectsPreset: Project[] = [
  {
    name: "BrainToSchool",
    description:
      "Système d'information scolaire complet (gestion administrative, pédagogique et financière) : scolarité, comptabilité, paie et bulletins PDF.",
    technologies: "PHP 8.2, PostgreSQL, Docker, AJAX/jQuery, Render",
    link: "",
  },
  {
    name: "AgriCoop Connect",
    description:
      "Plateforme de gestion de la coopérative agricole COMAKI : authentification, membres, livraisons, paiements, stock, statistiques et gestion des rôles.",
    technologies: "Python/Flask, JavaScript, Vercel",
    link: "",
  },
  {
    name: "cvRapide",
    description:
      "Générateur de CV avec aperçu en direct, modèles multiples, export PDF et données persistantes.",
    technologies: "Next.js, React, TypeScript, Tailwind, jsPDF",
    link: "",
  },
  {
    name: "Festival Congo-Brazzaville",
    description:
      "Plateforme événementielle : programme, artistes et informations billetterie.",
    technologies: "HTML5, CSS3, JavaScript, Jira",
    link: "",
  },
];

export const hobbiesPreset: Hobby[] = [];