import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import React from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Star,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

interface Props {
  personalDetails: PersonalDetails;
  file: File | null;
  experiences: Experience[];
  educations: Education[];
  languages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
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
  download,
  ref,
}) => {
  return (
    <div
      ref={ref}
      className={`w-[950px] min-h-[1200px] bg-base-100 flex shadow-lg ${download ? "mb-10" : ""}`}
    >
      {/* COLONNE GAUCHE (PROFIL) */}
      <div className="w-2/5 bg-base-200 p-8 flex flex-col gap-6">
        {/* Photo */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary mx-auto">
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              alt="Photo"
              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
            />
          )}
        </div>

        {/* Coordonnées */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
            Coordonnées
          </h2>
          <div className="space-y-2 text-sm">
            {personalDetails.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4" /> {personalDetails.phone}
              </div>
            )}
            {personalDetails.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="w-4" /> {personalDetails.email}
              </div>
            )}
            {personalDetails.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4" /> {personalDetails.address}
              </div>
            )}
          </div>
        </div>

        {/* Profil (description) */}
        {personalDetails.description && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Profil
            </h2>
            <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
              {personalDetails.description}
            </p>
          </div>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="badge badge-primary badge-outline">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Langues
            </h2>
            <div className="space-y-2">
              {languages.map((l, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium">{l.language}</span>
                  {getStarRating(l.proficiency)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loisirs */}
        {hobbies.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">
              Loisirs
            </h2>
            <p className="text-sm">{hobbies.map((h) => h.name).join(" • ")}</p>
          </div>
        )}
      </div>

      {/* COLONNE DROITE (EXPÉRIENCES & FORMATIONS) */}
      <div className="w-3/5 p-8 flex flex-col gap-6">
        {/* En-tête */}
        <div>
          <h1 className="text-4xl font-bold text-primary">
            {personalDetails.fullName || "Votre nom"}
          </h1>
          <p className="text-xl font-medium text-base-content/80 mt-1">
            {personalDetails.postSeeking || "Poste recherché"}
          </p>
        </div>

        {/* Expériences professionnelles */}
        {experiences.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider border-b-2 border-primary pb-1 mb-4 flex items-center gap-2">
              <BriefcaseBusiness className="w-4 h-4" /> Expériences
              professionnelles
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, i) => (
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
        {educations.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider border-b-2 border-primary pb-1 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Formations
            </h2>
            <div className="space-y-3">
              {educations.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-base">
                      {edu.degree}{" "}
                      <span className="text-sm font-normal text-base-content/60">
                        ({edu.level})
                      </span>
                    </h3>
                    <span className="text-xs text-base-content/60">
                      {formatDate(edu.startDate)} -{" "}
                      {formatDate(edu.endDate, edu.isCurrent)}
                    </span>
                  </div>
                  <p className="text-primary text-sm font-medium">
                    {edu.school}
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
      </div>
    </div>
  );
};

export default CVProfile;
