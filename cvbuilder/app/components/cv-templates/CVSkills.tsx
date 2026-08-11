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

const CVSkills: React.FC<Props> = ({
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
      className={`w-[950px] min-h-[1200px] bg-base-100 flex flex-col p-8 shadow-lg ${download ? "mb-10" : ""}`}
    >
      {/* En-tête avec photo + identité */}
      <div className="flex items-center gap-6 border-b-2 border-primary pb-6 mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              alt="Photo"
              onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-primary">
            {personalDetails.fullName || "Votre nom"}
          </h1>
          <p className="text-xl text-base-content/80">
            {personalDetails.postSeeking || "Poste recherché"}
          </p>
          <div className="flex gap-4 mt-2 text-sm text-base-content/60">
            {personalDetails.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {personalDetails.phone}
              </span>
            )}
            {personalDetails.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {personalDetails.email}
              </span>
            )}
            {personalDetails.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {personalDetails.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Section compétences principales (en vedette) */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Compétences techniques */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider text-primary mb-2">
              Compétences
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="badge badge-primary">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <div>
            <h2 className="text-md font-bold uppercase tracking-wider text-primary mb-2">
              Langues
            </h2>
            <div className="space-y-1">
              {languages.map((l, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{l.language}</span>
                  {getStarRating(l.proficiency)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profil / Description */}
      {personalDetails.description && (
        <div className="mb-8">
          <h2 className="text-md font-bold uppercase tracking-wider text-primary mb-2">
            Profil
          </h2>
          <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            {personalDetails.description}
          </p>
        </div>
      )}

      {/* Expériences professionnelles (plus compact) */}
      {experiences.length > 0 && (
        <div className="mb-8">
          <h2 className="text-md font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
            <BriefcaseBusiness className="w-4 h-4" /> Expériences
          </h2>
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.jobTitle}</h3>
                  <span className="text-xs text-base-content/60">
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate, exp.isCurrent)}
                  </span>
                </div>
                <p className="text-primary text-sm font-medium">
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
          <h2 className="text-md font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Formations
          </h2>
          <div className="space-y-3">
            {educations.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">
                    {edu.degree}{" "}
                    <span className="text-sm font-normal">({edu.level})</span>
                  </h3>
                  <span className="text-xs text-base-content/60">
                    {formatDate(edu.startDate)} -{" "}
                    {formatDate(edu.endDate, edu.isCurrent)}
                  </span>
                </div>
                <p className="text-primary text-sm font-medium">{edu.school}</p>
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

      {/* Loisirs en bas (optionnel) */}
      {hobbies.length > 0 && (
        <div className="mt-6 pt-4 border-t border-base-300">
          <p className="text-sm text-base-content/60">
            Loisirs : {hobbies.map((h) => h.name).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default CVSkills;
