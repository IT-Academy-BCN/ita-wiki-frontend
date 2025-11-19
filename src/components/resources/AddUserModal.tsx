import React, { useState } from "react";
import ButtonComponent from "../atoms/ButtonComponent";
import { createRole } from "../../api/endPointRoles";
import { toast } from "sonner";

interface AddUsersModalProps {
  onClose: () => void;
  userRole: string | null;
  userID: number | string;
}

const rolePermissions = {
  superadmin: ["admin", "mentor", "student"],
  admin: ["mentor", "student"],
  mentor: ["student"],
};

export const AddUsersModal: React.FC<AddUsersModalProps> = ({
  onClose,
  userRole,
  userID,
}) => {
  const [githubId, setGithubId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const availableRoles = userRole
    ? rolePermissions[userRole as keyof typeof rolePermissions] || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
      authorized_github_id: Number(userID),
      github_id: Number(githubId),
      role: selectedRole,
    };
    createRole(requestBody)
      .then(() => {
        toast.success("Rol assignat amb èxit!");
        onClose();
      })
      .catch((error) => {
        toast.error("No s'ha pogut assignar el rol...");
        console.error("Failed to create role:", error);
      });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 overflow-visible">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Afegir usuaris</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Github ID
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Ingresi el seu ID"
              value={githubId}
              onChange={(e) => setGithubId(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rol
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
            >
              <option value="">Seleccioni el seu role</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <ButtonComponent
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel·lar
            </ButtonComponent>
            <ButtonComponent type="submit" variant="primary">
              Afegir
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};
