import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "./type";

export const personalDetailsPreset: PersonalDetails = {
  fullName: "Aristote Cleven Baba",
  email: "aristote.baba@email.com",
  phone: "+242 06 123 45 67",
  address: "Brazzaville, Congo-Brazzaville",
  photoUrl: "/profile.jpg",
  postSeeking: "Développeur Full Stack",
  description:
    "Développeur passionné avec 5 ans d'expérience.\nSpécialisé en React, Node.js et TypeScript.",
};

export const experiencesPreset: Experience[] = [
  {
    jobTitle: "Développeur Full Stack",
    companyName: "TechCongo",
    startDate: "2021-01-01",
    endDate: "",
    isCurrent: true,
    description: "Création d'applications web avec React et Node.js.",
    city: "Brazzaville, Congo-Brazzaville",
  },
  {
    jobTitle: "Développeur Front-End",
    companyName: "WebStudio Pointe-Noire",
    startDate: "2019-06-01",
    endDate: "2020-12-31",
    isCurrent: false,
    description: "Intégration de maquettes et optimisation des performances.",
    city: "Pointe-Noire, Congo-Brazzaville",
  },
];

export const educationsPreset: Education[] = [
  {
    school: "Université Marien Ngouabi",
    degree: "Master Informatique",
    level: "Master",
    description: "Spécialisation Génie Logiciel",
    startDate: "2018-09-01",
    endDate: "2020-06-30",
    isCurrent: false,
    city: "Brazzaville, Congo-Brazzaville",
  },
  {
    school: "Institut Guy Pasteur",
    degree: "Brevet d'études du premier cycle (BEPC)",
    level: "Bac+2",
    description: "",
    startDate: "2016-09-01",
    endDate: "2018-06-30",
    isCurrent: false,
    city: "Brazzaville, Congo-Brazzaville",
  },
];

export const languagesPreset: Language[] = [
  { language: "Français", proficiency: "Avance" },
  { language: "Anglais", proficiency: "Intermediaire" },
];

export const skillsPreset: Skill[] = [
  { name: "React" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "Tailwind CSS" },
];

export const hobbiesPreset: Hobby[] = [
  { name: "Lecture" },
  { name: "Running" },
];
