import { Education } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  educations: Education[];
  setEducations: (educations: Education[]) => void;
};

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    school: "",
    degree: "",
    level: "Bac",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
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
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 p-4 border border-base-300 rounded-lg">
        <input
          type="text"
          placeholder="Nom de l'école"
          value={newEducation.school}
          onChange={(e) => handleChange(e, "school")}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Diplôme (ex: Licence Informatique)"
          value={newEducation.degree}
          onChange={(e) => handleChange(e, "degree")}
          className="input input-bordered w-full"
        />
        <select
          value={newEducation.level}
          onChange={(e) => handleChange(e, "level")}
          className="select select-bordered w-full"
        >
          <option value="Bac">Bac</option>
          <option value="Bac+2">Bac+2 (BTS, DUT)</option>
          <option value="Bac+3">Bac+3 (Licence)</option>
          <option value="Master">Master (Bac+5)</option>
          <option value="Doctorat">Doctorat</option>
          <option value="Autre">Autre</option>
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            placeholder="Date de début"
            value={newEducation.startDate}
            onChange={(e) => handleChange(e, "startDate")}
            className="input input-bordered w-full"
          />
          {!newEducation.isCurrent && (
            <input
              type="date"
              placeholder="Date de fin"
              value={newEducation.endDate}
              onChange={(e) => handleChange(e, "endDate")}
              className="input input-bordered w-full"
            />
          )}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={newEducation.isCurrent}
            onChange={(e) => handleChange(e, "isCurrent")}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm">En cours (jusqu'à présent)</span>
        </label>
        <textarea
          placeholder="Description"
          value={newEducation.description}
          onChange={(e) => handleChange(e, "description")}
          className="textarea textarea-bordered w-full"
        />
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
                  {edu.degree} ({edu.level})
                </div>
                <div className="text-sm text-base-content/70">{edu.school}</div>
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
