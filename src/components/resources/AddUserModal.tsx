import React, { useState } from "react";
// import { useCtxUser } from "../../hooks/useCtxUser";
import ButtonComponent from "../atoms/ButtonComponent";
import { createRole } from "../../api/endPointRoles";
import { ROLE_PERMISSIONS } from "../../config";

interface AddUsersModalProps {
  onClose: () => void;
  userRole: string | null;
  userID: number | string;
}

export const AddUsersModal: React.FC<AddUsersModalProps> = ({
  onClose,
  userRole,
  userID,
}) => {
  const [githubId, setGithubId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const availableRoles = userRole
    ? ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || []
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
        // TODO add a toaster or something on success
        onClose();
      })
      .catch((error) => {
        // TODO add something for errors too
        console.error("Failed to create role:", error);
      });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 overflow-visible">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Users {userRole}</h2>
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
              placeholder="Ingresa su ID"
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
              <option value="">Selecciona su rol</option>
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
              Cancelar
            </ButtonComponent>
            <ButtonComponent type="submit" variant="primary">
              Añadir
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
};
