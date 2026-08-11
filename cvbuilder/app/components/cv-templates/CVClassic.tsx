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
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPinCheckInside,
  Phone,
  Star,
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
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const getStarRating = (proficiency: string) => {
  const maxStars = 5;
  let filledStars = 0;
  switch (proficiency) {
    case "Debutant":
      filledStars = 1;
      break;
    case "Intermediaire":
      filledStars = 3;
      break;
    case "Avance":
      filledStars = 5;
      break;
    default:
      filledStars = 0;
  }
  return (
    <>
      {Array.from({ length: filledStars }, (_, i) => (
        <Star key={i} className="text-primary" />
      ))}
      {Array.from({ length: maxStars - filledStars }, (_, i) => (
        <Star key={i + filledStars} className="text-gray-300" />
      ))}
    </>
  );
};

const CVClassic: React.FC<Props> = ({
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
      className={`flex p-16 w-[950px] min-h-[1200px] shadow-lg ${download ? "mb-10" : ""}`}
    >
      {/* Colonne gauche */}
      <div className="flex flex-col w-1/3">
        <div className="h-80 rounded-full border-8 overflow-hidden border-primary">
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={300}
              height={300}
              className="w-full h-full rounded-lg object-cover"
              alt="Photo de profil"
              onLoad={() => {
                if (typeof file !== "string")
                  URL.revokeObjectURL(URL.createObjectURL(file));
              }}
            />
          )}
        </div>
        <div className="mt-4 flex-col w-full">
          <div>
            <h1 className="uppercase font-bold my-2">Contact</h1>
            <ul className="space-y-2">
              <li className="flex">
                <div className="break-all text-sm relative">
                  <div className="ml-8">{personalDetails.phone}</div>
                  {personalDetails.phone && (
                    <div className="absolute left-0 top-0">
                      <Phone className="w-5 text-primary" />
                    </div>
                  )}
                </div>
              </li>
              <li className="flex">
                <div className="break-all text-sm relative">
                  <div className="ml-8">{personalDetails.email}</div>
                  {personalDetails.email && (
                    <div className="absolute left-0 top-0">
                      <Mail className="w-5 text-primary" />
                    </div>
                  )}
                </div>
              </li>
              <li className="flex">
                <div className="break-all text-sm relative">
                  <div className="ml-8">{personalDetails.address}</div>
                  {personalDetails.address && (
                    <div className="absolute left-0 top-0">
                      <MapPinCheckInside className="w-5 text-primary" />
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <h1 className="uppercase font-bold my-2">Compétences</h1>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <p key={i} className="badge badge-primary uppercase">
                  {skill.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h1 className="uppercase font-bold my-2">Langues</h1>
            <div className="flex flex-col space-y-2">
              {languages.map((lang, i) => (
                <div key={i}>
                  <span className="capitalize font-semibold">
                    {lang.language}
                  </span>
                  <div className="flex mt-2">
                    {getStarRating(lang.proficiency)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h1 className="uppercase font-bold my-2">Loisirs</h1>
            <div className="flex flex-col space-y-2">
              {hobbies.map((hobby, i) => (
                <div key={i}>
                  <span className="capitalize">{hobby.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Colonne droite */}
      <div className="w-2/3 ml-8">
        <div className="w-full flex flex-col space-y-4">
          <h1 className="uppercase text-xl">{personalDetails.fullName}</h1>
          <h2 className="uppercase text-5xl text-primary font-bold">
            {personalDetails.postSeeking}
          </h2>
          <p className="break-words whitespace-pre-wrap w-full text-sm leading-relaxed">
            {personalDetails.description}
          </p>
        </div>
        <section className="w-full h-fit p-5">
          {/* Expériences */}
          <div>
            <h1 className="uppercase font-bold mb-2">Expériences</h1>
            <ul className="steps steps-vertical space-y-3">
              {experiences.map((exp, i) => (
                <li className="step step-primary" key={i}>
                  <div className="text-left">
                    <h2 className="flex text-md uppercase font-bold">
                      <BriefcaseBusiness className="w-5" />
                      <span className="ml-2">{exp.jobTitle}</span>
                    </h2>
                    <div className="text-sm my-2">
                      <span className="badge badge-primary">
                        {exp.companyName}
                      </span>
                      <span className="italic ml-2">
                        {formatDate(exp.startDate)} -{" "}
                        {formatDate(exp.endDate, exp.isCurrent)}
                      </span>
                    </div>
                    <p className="text-sm break-words whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Formations */}
          <div className="mt-6">
            <h1 className="uppercase font-bold mb-2">Formations</h1>
            <ul className="steps steps-vertical space-y-3">
              {educations.map((edu, i) => (
                <li className="step step-primary" key={i}>
                  <div className="text-left">
                    <h2 className="flex text-md uppercase font-bold">
                      <GraduationCap className="w-5" />
                      <span className="ml-2">
                        {edu.degree} ({edu.level})
                      </span>
                    </h2>
                    <div className="text-sm my-2">
                      <span className="badge badge-primary">{edu.school}</span>
                      <span className="italic ml-2">
                        {formatDate(edu.startDate)} -{" "}
                        {formatDate(edu.endDate, edu.isCurrent)}
                      </span>
                    </div>
                    <p className="text-sm break-words whitespace-pre-wrap">
                      {edu.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVClassic;
