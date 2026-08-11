import { Skill } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
};

const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState<Skill>({ name: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill({ name: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...skills];
      updated[editingIndex] = newSkill;
      setSkills(updated);
      setEditingIndex(null);
    } else {
      setSkills([...skills, newSkill]);
    }
    setNewSkill({ name: "" });
  };

  const handleEdit = (index: number) => {
    setNewSkill(skills[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewSkill({ name: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewSkill({ name: "" });
  };

  return (
    <div className="space-y-5">
      {/* Ligne input + bouton */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Compétence (ex: React, Figma...)"
          value={newSkill.name}
          onChange={handleChange}
          className="input input-bordered flex-1"
        />
        <div className="flex gap-2">
          {editingIndex !== null && (
            <button onClick={handleCancelEdit} className="btn btn-ghost btn-sm">
              <X className="w-4" />
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
          </button>
        </div>
      </div>

      {/* Liste des compétences - espacement généreux */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm"
            >
              <span>{skill.name}</span>
              <button
                onClick={() => handleEdit(index)}
                className="hover:opacity-70"
                type="button"
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="hover:opacity-70"
                type="button"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillForm;
