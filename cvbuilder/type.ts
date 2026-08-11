export type PersonalDetails = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photoUrl?: string;
  description?: string;
  postSeeking?: string;
};

export type Education = {
  id?: string;
  school: string;
  degree: string;
  level: "Bac" | "Bac+2" | "Bac+3" | "Master" | "Doctorat" | "Autre";
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

export type Experience = {
  id?: string;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
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
