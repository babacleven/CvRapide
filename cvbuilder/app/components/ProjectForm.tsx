import { Project } from "@/type";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import React, { useState } from "react";

type Props = {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
};

const ProjectForm: React.FC<Props> = ({ projects, setProjects }) => {
  const [newProject, setNewProject] = useState<Project>({
    name: "",
    description: "",
    technologies: "",
    link: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Project,
  ) => {
    setNewProject({ ...newProject, [field]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = newProject;
      setProjects(updated);
      setEditingIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }
    setNewProject({ name: "", description: "", technologies: "", link: "" });
  };

  const handleEdit = (index: number) => {
    setNewProject(projects[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewProject({ name: "", description: "", technologies: "", link: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setNewProject({ name: "", description: "", technologies: "", link: "" });
  };

  return (
    <div className="space-y-4">
      {/* Formulaire d'ajout / modification */}
      <div className="space-y-3 p-4 border border-base-300 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nom du projet"
            value={newProject.name}
            onChange={(e) => handleChange(e, "name")}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Lien (optionnel)"
            value={newProject.link ?? ""}
            onChange={(e) => handleChange(e, "link")}
            className="input input-bordered w-full"
          />
        </div>
        <textarea
          placeholder="Décrivez le projet et sa valeur ajoutée."
          value={newProject.description}
          onChange={(e) => handleChange(e, "description")}
          className="textarea textarea-bordered w-full"
        />
        <input
          type="text"
          placeholder="Technologies (ex: React, Node.js...)"
          value={newProject.technologies}
          onChange={(e) => handleChange(e, "technologies")}
          className="input input-bordered w-full"
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

      {/* Liste des projets avec boutons modifier/supprimer */}
      {projects.length > 0 && (
        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-sm">Projets ajoutés :</h3>
          {projects.map((proj, index) => (
            <div
              key={index}
              className="bg-base-200 p-3 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <div className="font-semibold">{proj.name}</div>
                <div className="text-sm text-base-content/70">
                  {proj.description}
                </div>
                <div className="text-xs text-base-content/50">
                  {proj.technologies}
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

export default ProjectForm;