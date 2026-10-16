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
  fullName: "",
  email: "",
  phone: "",
  address: "",
  photoUrl: "/profile.png",
  github: "",
  linkedin: "",
  portfolio: "",
  postSeeking: "",
  description: "",
};

export const experiencesPreset: Experience[] = [
  {
    jobTitle: "POSTE OCCUPÉ",
    companyName: "NOM ENTREPRISE",
    startDate: "2020-01",
    endDate: "2020-03",
    isCurrent: false,
    description:
      "Décrivez ici les fonctions que vous avez occupé pour ce poste. Décrivez également vos missions et les résultats que vous avez obtenu.",
    city: "",
  },
  {
    jobTitle: "POSTE OCCUPÉ",
    companyName: "NOM ENTREPRISE",
    startDate: "2020-01",
    endDate: "2020-03",
    isCurrent: false,
    description:
      "Décrivez ici les fonctions que vous avez occupé pour ce poste. Décrivez également vos missions et les résultats que vous avez obtenu.",
    city: "",
  },
];

export const educationsPreset: Education[] = [
  {
    school: "NOM DE L'ÉCOLE",
    degree: "NOM DU DIPLÔME",
    level: "",
    description: "Décrivez ici votre formation et ce que vous y avez appris.",
    startDate: "2020-01",
    endDate: "2020-03",
    isCurrent: false,
    city: "",
  },
];

export const languagesPreset: Language[] = [
  { language: "Langue 1", proficiency: "Avance" },
  { language: "Langue 2", proficiency: "Intermediaire" },
];

export const skillsPreset: Skill[] = [
  { name: "Compétence 1" },
  { name: "Compétence 2" },
  { name: "Compétence 3" },
  { name: "Compétence 4" },
];

export const projectsPreset: Project[] = [];

export const hobbiesPreset: Hobby[] = [
  { name: "Loisir 1" },
  { name: "Loisir 2" },
  { name: "Loisir 3" },
];