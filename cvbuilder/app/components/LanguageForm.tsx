import { Language } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
};

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {
  const [newLanguage, setNewLanguage] = useState<Language>({
    language: "",
    proficiency: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Language,
  ) => {
    setNewLanguage({ ...newLanguage, [field]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...languages];
      updated[editingIndex] = newLanguage;
      setLanguages(updated);
      setEditingIndex(null);
    } else {
      setLanguages([...languages, newLanguage]);
    }
    setNewLanguage({ language: "", proficiency: "" });
  };

  const handleEdit = (index: number) => {
    setNewLanguage(languages[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = languages.filter((_, i) => i !== index);
    setLanguages(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewLanguage({ language: "", proficiency: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewLanguage({ language: "", proficiency: "" });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3 p-4 border border-base-300 rounded-lg">
        <input
          type="text"
          placeholder="Langue"
          value={newLanguage.language}
          onChange={(e) => handleChange(e, "language")}
          className="input input-bordered w-full"
        />
        <select
          value={newLanguage.proficiency}
          onChange={(e) => handleChange(e, "proficiency")}
          className="select select-bordered w-full"
        >
          <option value="">Sélectionner la maîtrise</option>
          <option value="Debutant">Débutant</option>
          <option value="Intermediaire">Intermédiaire</option>
          <option value="Avance">Avancé</option>
        </select>
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

      {languages.length > 0 && (
        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-sm">Langues ajoutées :</h3>
          {languages.map((lang, index) => (
            <div
              key={index}
              className="bg-base-200 p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <span className="font-semibold">{lang.language}</span>
                <span className="text-sm text-base-content/70 ml-2">
                  ({lang.proficiency})
                </span>
              </div>
              <div className="flex gap-2">
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

export default LanguageForm;
