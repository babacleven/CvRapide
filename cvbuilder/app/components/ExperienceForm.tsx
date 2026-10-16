import { Experience } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  experience: Experience[];
  setExperiences: (experience: Experience[]) => void;
};

const labelClass =
  "text-[11px] font-semibold uppercase tracking-wide text-base-content/50";

const ExperienceForm: React.FC<Props> = ({ experience, setExperiences }) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    city: "",
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
      city: "",
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
      city: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Formulaire d'ajout / modification */}
      <div className="space-y-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Poste occupé</span>
          <input
            type="text"
            placeholder="ex : Chargé de communication"
            value={newExperience.jobTitle}
            onChange={(e) => handleChange(e, "jobTitle")}
            className="input input-bordered w-full"
          />
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Entreprise</span>
            <input
              type="text"
              placeholder="ex : Akieni"
              value={newExperience.companyName}
              onChange={(e) => handleChange(e, "companyName")}
              className="input input-bordered w-full"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Ville / Lieu</span>
            <input
              type="text"
              placeholder="ex : Brazzaville"
              value={newExperience.city}
              onChange={(e) => handleChange(e, "city")}
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Début</span>
            <input
              type="month"
              value={newExperience.startDate}
              onChange={(e) => handleChange(e, "startDate")}
              className="input input-bordered w-full"
            />
          </label>
          {!newExperience.isCurrent && (
            <label className="flex flex-col gap-1.5">
              <span className={labelClass}>Fin</span>
              <input
                type="month"
                value={newExperience.endDate}
                onChange={(e) => handleChange(e, "endDate")}
                className="input input-bordered w-full"
              />
            </label>
          )}
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer rounded-lg border border-base-300 px-3 py-2.5 transition-colors hover:bg-base-200">
          <input
            type="checkbox"
            checked={newExperience.isCurrent}
            onChange={(e) => handleChange(e, "isCurrent")}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="text-sm">
            En poste actuellement (jusqu&apos;à présent)
          </span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Missions & résultats</span>
          <textarea
            rows={4}
            placeholder="Décrivez vos missions et les résultats obtenus pour ce poste."
            value={newExperience.description}
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
                  {exp.city && <span> - {exp.city}</span>}
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
