import { Experience } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  experience: Experience[];
  setExperiences: (experience: Experience[]) => void;
};

const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Experience,
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setNewExperience({ ...newExperience, [field]: value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      // Mise à jour
      const updated = [...experience];
      updated[editingIndex] = newExperience;
      setExperiences(updated);
      setEditingIndex(null);
    } else {
      // Ajout
      setExperiences([...experience, newExperience]);
    }
    // Réinitialiser le formulaire
    setNewExperience({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  const handleEdit = (index: number) => {
    setNewExperience(experience[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperiences(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewExperience({
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewExperience({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Formulaire d'ajout / modification */}
      <div className="space-y-3 p-4 border border-base-300 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Poste occupé"
            value={newExperience.jobTitle}
            onChange={(e) => handleChange(e, "jobTitle")}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={newExperience.companyName}
            onChange={(e) => handleChange(e, "companyName")}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            placeholder="Date de début"
            value={newExperience.startDate}
            onChange={(e) => handleChange(e, "startDate")}
            className="input input-bordered w-full"
          />
          {!newExperience.isCurrent && (
            <input
              type="date"
              placeholder="Date de fin"
              value={newExperience.endDate}
              onChange={(e) => handleChange(e, "endDate")}
              className="input input-bordered w-full"
            />
          )}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={newExperience.isCurrent}
            onChange={(e) => handleChange(e, "isCurrent")}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm">
            En poste actuellement (jusqu'à présent)
          </span>
        </label>
        <textarea
          placeholder="Description des missions"
          value={newExperience.description}
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

      {/* Liste des expériences avec boutons modifier/supprimer */}
      {experience.length > 0 && (
        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-sm">Expériences ajoutées :</h3>
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-base-200 p-3 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="font-semibold">{exp.jobTitle}</div>
                <div className="text-sm text-base-content/70">
                  {exp.companyName}
                </div>
                <div className="text-xs text-base-content/50">
                  {exp.startDate} - {exp.isCurrent ? "présent" : exp.endDate}
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

export default ExperienceForm;
