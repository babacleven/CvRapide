import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "./type";

export const personalDetailsPreset: PersonalDetails = {
  fullName: "Marie Dupont",
  email: "marie.dupont@email.com",
  phone: "+33 6 12 34 56 78",
  address: "Paris, France",
  photoUrl: "/profile.jpg",
  postSeeking: "Développeuse Full Stack",
  description:
    "Développeuse passionnée avec 5 ans d'expérience.\nSpécialisée en React, Node.js et TypeScript.",
};

export const experiencesPreset: Experience[] = [
  {
    jobTitle: "Développeuse Full Stack",
    companyName: "TechCorp",
    startDate: "2021-01-01",
    endDate: "",
    isCurrent: true,
    description: "Création d'applications web avec React et Node.js.",
  },
  {
    jobTitle: "Développeuse Front-End",
    companyName: "WebStudio",
    startDate: "2019-06-01",
    endDate: "2020-12-31",
    isCurrent: false,
    description: "Intégration de maquettes et optimisation des performances.",
  },
];

export const educationsPreset: Education[] = [
  {
    school: "Université Paris-Saclay",
    degree: "Master Informatique",
    level: "Master",
    description: "Spécialisation Génie Logiciel",
    startDate: "2018-09-01",
    endDate: "2020-06-30",
    isCurrent: false,
  },
  {
    school: "IUT Paris",
    degree: "DUT Informatique",
    level: "Bac+2",
    description: "",
    startDate: "2016-09-01",
    endDate: "2018-06-30",
    isCurrent: false,
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
