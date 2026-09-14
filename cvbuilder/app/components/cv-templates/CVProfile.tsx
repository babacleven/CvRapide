import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Project,
  Skill,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  projectsPreset,
  skillsPreset,
} from "@/presets";
import React from "react";
import Image from "next/image";
import { useFileObjectUrl } from "../useFileObjectUrl";
import {
  Mail,
  Phone,
  MapPin,
  Star,
  BriefcaseBusiness,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  FolderGit2,
} from "lucide-react";

interface Props {
  personalDetails: PersonalDetails;
  file: File | null;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  projects: Project[];
  download?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function formatDate(dateString: string, isCurrent: boolean = false): string {
  if (!dateString) return "";
  if (isCurrent) return "présent";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", { year: "numeric" });
}

const getStarRating = (proficiency: string) => {
  const maxStars = 5;
  let filled = 0;
  switch (proficiency) {
    case "Debutant":
      filled = 1;
      break;
    case "Intermediaire":
      filled = 3;
      break;
    case "Avance":
      filled = 5;
      break;
  }
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < filled ? "fill-primary text-primary" : "text-base-300"}`}
        />
      ))}
    </div>
  );
};

const CVProfile: React.FC<Props> = ({
  personalDetails,
  file,
  experiences,
  educations,
  languages,
  skills,
  hobbies,
  projects,
  download,
  ref,
}) => {
  const pd = {
    fullName: personalDetails.fullName || personalDetailsPreset.fullName,
    email: personalDetails.email || personalDetailsPreset.email,
    phone: personalDetails.phone || personalDetailsPreset.phone,
    address: personalDetails.address || personalDetailsPreset.address,
    github: personalDetails.github || personalDetailsPreset.github,
    linkedin: personalDetails.linkedin || personalDetailsPreset.linkedin,
    portfolio: personalDetails.portfolio || personalDetailsPreset.portfolio,
    postSeeking:
      personalDetails.postSeeking || personalDetailsPreset.postSeeking,
    description:
      personalDetails.description || personalDetailsPreset.description,
  };
  const display = {
    experiences: experiences.length > 0 ? experiences : experiencesPreset,
    educations: educations.length > 0 ? educations : educationsPreset,
    languages: languages.length > 0 ? languages : languagesPreset,
    skills: skills.length > 0 ? skills : skillsPreset,
    hobbies: hobbies.length > 0 ? hobbies : hobbiesPreset,
    projects: projects.length > 0 ? projects : projectsPreset,
  };
  const photoUrl = useFileObjectUrl(file);
  return (
    <div
      ref={ref}
      className={`w-[950px] min-h-[1200px] bg-base-100 flex shadow-lg ${download ? "mb-10" : ""}`}
    >
      {/* COLONNE GAUCHE (PROFIL) */}
      <div className="w-2/5 bg-base-200 p-8 flex flex-col gap-6">
        {/* Photo */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary mx-auto">
          {photoUrl && (
            <Image
              src={photoUrl}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              alt="Photo"
            />
          )}
        </div>

        {/* Coordonnées */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
            Coordonnées
          </h2>
          <div className="space-y-2 text-sm">
            {pd.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4" /> {pd.phone}
              </div>
            )}
            {pd.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="w-4" /> {pd.email}
              </div>
            )}
            {pd.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4" /> {pd.address}
              </div>
            )}
            {pd.github && (
              <div className="flex items-center gap-2 break-all">
                <Github className="w-4" /> {pd.github}
              </div>
            )}
            {pd.linkedin && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin className="w-4" /> {pd.linkedin}
              </div>
            )}
            {pd.portfolio && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-4" /> {pd.portfolio}
              </div>
            )}
          </div>
        </div>

        {/* Profil (description) */}
        {pd.description && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Profil
            </h2>
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
              {pd.description}
            </p>
          </div>
        )}

        {/* Compétences */}
        {display.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {display.skills.map((s, i) => (
                <span key={i} className="badge badge-primary badge-outline">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {display.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Langues
            </h2>
            <div className="space-y-2">
              {display.languages.map((l, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium">{l.language}</span>
                  {getStarRating(l.proficiency)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loisirs */}
        {display.hobbies.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Loisirs
            </h2>
            <p className="text-sm">{display.hobbies.map((h) => h.name).join(" • ")}</p>
          </div>
        )}
      </div>

      {/* COLONNE DROITE (EXPÉRIENCES & FORMATIONS) */}
      <div className="w-3/5 p-8 flex flex-col gap-6">
        {/* En-tête */}
        <div>
          <h1 className="text-4xl font-bold text-primary">
            {pd.fullName || "Votre nom"}
          </h1>
          <p className="text-xl font-medium text-base-content/80 mt-1">
            {pd.postSeeking || "Poste recherché"}
          </p>
        </div>

        {/* Expériences professionnelles */}
        {display.experiences.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider border-b-2 border-primary pb-1 mb-4 flex items-center gap-2">
              <BriefcaseBusiness className="w-4 h-4" /> Expériences
              professionnelles
            </h2>
            <div className="space-y-4">
              {display.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">{exp.jobTitle}</h3>
                    <span className="text-xs text-base-content/60">
                      {formatDate(exp.startDate)} -{" "}
                      {formatDate(exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <p className="text-primary text-sm font-medium mb-1">
                    {exp.companyName}
                    {exp.city && <span> - {exp.city}</span>}
                  </p>
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formations */}
        {display.educations.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider border-b-2 border-primary pb-1 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Formations
            </h2>
            <div className="space-y-3">
              {display.educations.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">
                      {edu.degree}{" "}
                      {edu.level && (
                        <span className="text-sm font-normal text-base-content/60">
                          ({edu.level})
                        </span>
                      )}
                    </h3>
                    <span className="text-xs text-base-content/60">
                      {formatDate(edu.startDate)} -{" "}
                      {formatDate(edu.endDate, edu.isCurrent)}
                    </span>
                  </div>
                  <p className="text-primary text-sm font-medium">
                    {edu.school}
                    {edu.city && <span> - {edu.city}</span>}
                  </p>
                  {edu.description && (
                    <p className="text-sm mt-1 break-words whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projets réalisés */}
        {display.projects.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider border-b-2 border-primary pb-1 mb-4 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" /> Projets réalisés
            </h2>
            <div className="space-y-4">
              {display.projects.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-bold text-base">{p.name}</h3>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline flex-shrink-0"
                      >
                        ↗
                      </a>
                    )}
                  </div>
                  <p className="text-primary text-sm font-medium">
                    {p.technologies}
                  </p>
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVProfile;
