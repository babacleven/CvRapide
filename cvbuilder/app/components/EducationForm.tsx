import { Education } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  educations: Education[];
  setEducations: (educations: Education[]) => void;
};

const labelClass =
  "text-[11px] font-semibold uppercase tracking-wide text-base-content/50";

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    school: "",
    degree: "",
    level: "Bac",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    city: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: keyof Education,
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setNewEducation({ ...newEducation, [field]: value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...educations];
      updated[editingIndex] = newEducation;
      setEducations(updated);
      setEditingIndex(null);
    } else {
      setEducations([...educations, newEducation]);
    }
    setNewEducation({
      school: "",
      degree: "",
      level: "Bac",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      city: "",
    });
  };

  const handleEdit = (index: number) => {
    setNewEducation(educations[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewEducation({
        school: "",
        degree: "",
        level: "Bac",
        description: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewEducation({
      school: "",
      degree: "",
      level: "Bac",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      city: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Établissement</span>
          <input
            type="text"
            placeholder="ex : Université Marien Ngouabi"
            value={newEducation.school}
            onChange={(e) => handleChange(e, "school")}
            className="input input-bordered w-full"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Diplôme</span>
          <input
            type="text"
            placeholder="ex : Licence en informatique"
            value={newEducation.degree}
            onChange={(e) => handleChange(e, "degree")}
            className="input input-bordered w-full"
          />
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Ville / Lieu</span>
            <input
              type="text"
              placeholder="ex : Brazzaville"
              value={newEducation.city}
              onChange={(e) => handleChange(e, "city")}
              className="input input-bordered w-full"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Niveau d&apos;études</span>
            <select
              value={newEducation.level}
              onChange={(e) => handleChange(e, "level")}
              className="select select-bordered w-full"
            >
              <option value="">Sélectionner…</option>
              <option value="Bac">Bac</option>
              <option value="Bac+2">Bac+2 (BTS, DUT)</option>
              <option value="Bac+3">Bac+3 (Licence)</option>
              <option value="Master">Master (Bac+5)</option>
              <option value="Doctorat">Doctorat</option>
              <option value="Autre">Autre</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Début</span>
            <input
              type="month"
              value={newEducation.startDate}
              onChange={(e) => handleChange(e, "startDate")}
              className="input input-bordered w-full"
            />
          </label>
          {!newEducation.isCurrent && (
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Fin</span>
              <input
                type="month"
                value={newEducation.endDate}
                onChange={(e) => handleChange(e, "endDate")}
                className="input input-bordered w-full"
              />
            </label>
          )}
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer rounded-lg border border-base-300 px-3 py-2.5 transition-colors hover:bg-base-200">
          <input
            type="checkbox"
            checked={newEducation.isCurrent}
            onChange={(e) => handleChange(e, "isCurrent")}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="text-sm">En cours (jusqu&apos;à présent)</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Description</span>
          <textarea
            rows={3}
            placeholder="Décrivez votre formation et les compétences acquises."
            value={newEducation.description}
            onChange={(e) => handleChange(e, "description")}
            className="textarea textarea-bordered w-full"
          />
        </label>
        <div className="flex gap-2 justify-end">
          {editingIndex !== null && (
            <button onClick={handleCancelEdit} className="btn btn-ghost btn-sm">
              <X className="w-4" /> Annuler
            </button>
          )}
          <button
            onClick={handleAddOrUpdate}
            className="btn btn-primary btn-sm"
          >
            {editingIndex !== null ? (
              <Check className="w-4" />
            ) : (
              <Plus className="w-4" />
            )}
            {editingIndex !== null ? "Mettre à jour" : "Ajouter"}
          </button>
        </div>
      </div>

      {educations.length > 0 && (
        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-sm">Formations ajoutées :</h3>
          {educations.map((edu, index) => (
            <div
              key={index}
              className="bg-base-200 p-3 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="font-semibold">
                  {edu.degree}
                  {edu.level && ` (${edu.level})`}
                </div>
                <div className="text-sm text-base-content/70">
                  {edu.school}
                  {edu.city && <span> - {edu.city}</span>}
                </div>
                <div className="text-xs text-base-content/50">
                  {edu.startDate} - {edu.isCurrent ? "présent" : edu.endDate}
                </div>
              </div>
              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="btn btn-xs btn-ghost"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-xs btn-ghost text-error"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
