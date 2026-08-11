import CVBold from "./CVBold";
import CVClassic from "./CVClassic";
import CVMinimal from "./CVMinimal";
import CVModern from "./CVModern";
import CVProfile from "./CVProfile";
import CVSkills from "./CVSkills";

export { default as CVClassic } from "./CVClassic";
export { default as CVModern } from "./CVModern";
export { default as CVMinimal } from "./CVMinimal";
export { default as CVBold } from "./CVBold";
export { default as CVProfile } from "./CVProfile";
export { default as CVSkills } from "./CVSkills";

export const templates = {
  classic: CVClassic,
  modern: CVModern,
  minimal: CVMinimal,
  bold: CVBold,
  profile: CVProfile,
  skills: CVSkills,
} as const;

export const templateLabels: Record<keyof typeof templates, string> = {
  classic: "Classique",
  modern: "Moderne",
  minimal: "Minimaliste",
  bold: "Audacieux",
  profile: "Profil",
  skills: "Compétences",
};
