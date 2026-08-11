import { Hobby } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  hobbies: Hobby[];
  setHobbies: (hobbies: Hobby[]) => void;
};

const HobbyForm: React.FC<Props> = ({ hobbies, setHobbies }) => {
  const [newHobby, setNewHobby] = useState<Hobby>({ name: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewHobby({ name: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...hobbies];
      updated[editingIndex] = newHobby;
      setHobbies(updated);
      setEditingIndex(null);
    } else {
      setHobbies([...hobbies, newHobby]);
    }
    setNewHobby({ name: "" });
  };

  const handleEdit = (index: number) => {
    setNewHobby(hobbies[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = hobbies.filter((_, i) => i !== index);
    setHobbies(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewHobby({ name: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewHobby({ name: "" });
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Loisir (ex: Lecture, Voyage...)"
          value={newHobby.name}
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

      {hobbies.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 bg-base-300 rounded-full px-4 py-2 text-sm"
            >
              <span>{hobby.name}</span>
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

export default HobbyForm;
