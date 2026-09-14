export type PersonalDetails = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photoUrl?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  description?: string;
  postSeeking?: string;
};

export type Project = {
  id?: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
};

export type Education = {
  id?: string;
  school: string;
  degree: string;
  level: "" | "Bac" | "Bac+2" | "Bac+3" | "Master" | "Doctorat" | "Autre";
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  city?: string;
};

export type Experience = {
  id?: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  city?: string;
};

export type Skill = {
  id?: string;
  name: string;
};

export type Language = {
  id?: string;
  language: string;
  proficiency: string;
};

export type Hobby = {
  id?: string;
  name: string;
};

export type CVTemplate =
  | "classic"
  | "modern"
  | "minimal"
  | "bold"
  | "profile"
  | "skills";
