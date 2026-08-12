import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/presets";
import React from "react";
import Image from "next/image";
import { useFileObjectUrl } from "../useFileObjectUrl";

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
  const pd = {
    fullName: personalDetails.fullName || personalDetailsPreset.fullName,
    email: personalDetails.email || personalDetailsPreset.email,
    phone: personalDetails.phone || personalDetailsPreset.phone,
    address: personalDetails.address || personalDetailsPreset.address,
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
  };
  const photoUrl = useFileObjectUrl(file);
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
              {pd.fullName || "Votre nom"}
            </h1>
            <p className="text-xl text-gray-600 font-light">
              {pd.postSeeking}
            </p>
          </div>
          {photoUrl && (
            <div className="w-24 h-24 grayscale">
              <Image
                src={photoUrl}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                alt="Photo"
              />
            </div>
          )}
        </div>
        <div className="flex gap-6 mt-6 text-sm text-gray-600">
          {pd.email && <span>{pd.email}</span>}
          {pd.phone && <span>{pd.phone}</span>}
          {pd.address && <span>{pd.address}</span>}
        </div>
      </header>

      {/* Grille 2 colonnes */}
      <div className="grid grid-cols-3 gap-12">
        {/* Colonne gauche */}
        <div className="space-y-10">
          {pd.description && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Profil
              </h2>
              <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
                {pd.description}
              </p>
            </section>
          )}
          {display.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Compétences
              </h2>
              <div className="space-y-1">
                {display.skills.map((s, i) => (
                  <p key={i} className="text-sm">
                    {s.name}
                  </p>
                ))}
              </div>
            </section>
          )}
          {display.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Langues
              </h2>
              <div className="space-y-1">
                {display.languages.map((l, i) => (
                  <p key={i} className="text-sm">
                    {l.language} — {l.proficiency}
                  </p>
                ))}
              </div>
            </section>
          )}
          {display.hobbies.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Loisirs
              </h2>
              <p className="text-sm">{display.hobbies.map((h) => h.name).join(", ")}</p>
            </section>
          )}
        </div>

        {/* Colonne droite */}
        <div className="col-span-2 space-y-10">
          {display.experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Expérience
              </h2>
              <div className="space-y-6">
                {display.experiences.map((exp, i) => (
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
                      {exp.city && <span> - {exp.city}</span>}
                    </p>
                    <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {display.educations.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Formation
              </h2>
              <div className="space-y-6">
                {display.educations.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium">
                        {edu.degree}
                        {edu.level && ` (${edu.level})`}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} —{" "}
                        {formatDate(edu.endDate, edu.isCurrent)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {edu.school}
                      {edu.city && <span> - {edu.city}</span>}
                    </p>
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
