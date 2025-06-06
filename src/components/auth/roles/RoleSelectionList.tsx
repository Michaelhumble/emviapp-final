
import { UserRole } from "@/context/auth/types";
import React from "react";
import { roleOptions } from "./roleData";
import RoleOption from "./RoleOption";

interface RoleSelectionListProps {
  selectedRole: UserRole;
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelectionList: React.FC<RoleSelectionListProps> = ({
  selectedRole,
  onRoleSelect
}) => {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {roleOptions.map((role) => (
          <div
            key={role.id}
            className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all ${
              selectedRole === role.id 
                ? "border-indigo-600 bg-indigo-50" 
                : "border-gray-200 bg-white hover:border-indigo-200"
            }`}
            onClick={() => onRoleSelect(role.id)}
          >
            <div className="flex w-full items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                {role.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="block text-sm font-medium text-gray-900">
                  {role.label}
                </span>
                <span className="block text-xs text-gray-500">
                  {role.description}
                </span>
              </div>
            </div>
            <div 
              className={`absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center ${
                selectedRole === role.id 
                  ? "bg-indigo-600" 
                  : "border border-gray-300"
              }`}
            >
              {selectedRole === role.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelectionList;
