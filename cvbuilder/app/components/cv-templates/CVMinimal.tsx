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

const CVMinimal: React.FC<Props> = ({
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
      className={`w-[950px] min-h-[1200px] bg-white text-gray-900 p-20 ${download ? "mb-10" : ""}`}
    >
      {/* Header */}
      <header className="border-b-2 border-gray-900 pb-8 mb-12">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-light tracking-tight mb-2">
              {personalDetails.fullName || "Votre nom"}
            </h1>
            <p className="text-xl text-gray-600 font-light">
              {personalDetails.postSeeking}
            </p>
          </div>
          {file && (
            <div className="w-24 h-24 grayscale">
              <Image
                src={URL.createObjectURL(file)}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                alt="Photo"
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
              />
            </div>
          )}
        </div>
        <div className="flex gap-6 mt-6 text-sm text-gray-600">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>{personalDetails.phone}</span>}
          {personalDetails.address && <span>{personalDetails.address}</span>}
        </div>
      </header>

      {/* Grille 2 colonnes */}
      <div className="grid grid-cols-3 gap-12">
        {/* Colonne gauche */}
        <div className="space-y-10">
          {personalDetails.description && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Profil
              </h2>
              <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
                {personalDetails.description}
              </p>
            </section>
          )}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Compétences
              </h2>
              <div className="space-y-1">
                {skills.map((s, i) => (
                  <p key={i} className="text-sm">
                    {s.name}
                  </p>
                ))}
              </div>
            </section>
          )}
          {languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Langues
              </h2>
              <div className="space-y-1">
                {languages.map((l, i) => (
                  <p key={i} className="text-sm">
                    {l.language} — {l.proficiency}
                  </p>
                ))}
              </div>
            </section>
          )}
          {hobbies.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Loisirs
              </h2>
              <p className="text-sm">{hobbies.map((h) => h.name).join(", ")}</p>
            </section>
          )}
        </div>

        {/* Colonne droite */}
        <div className="col-span-2 space-y-10">
          {experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Expérience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium">{exp.jobTitle}</h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} —{" "}
                        {formatDate(exp.endDate, exp.isCurrent)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.companyName}
                    </p>
                    <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {educations.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Formation
              </h2>
              <div className="space-y-6">
                {educations.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium">
                        {edu.degree} ({edu.level})
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} —{" "}
                        {formatDate(edu.endDate, edu.isCurrent)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    {edu.description && (
                      <p className="break-words whitespace-pre-wrap text-sm text-gray-600 mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVMinimal;
