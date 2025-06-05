
import { RadioGroup } from "@/components/ui/radio-group";
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
    <div className="py-6">
      <RadioGroup
        value={selectedRole}
        onValueChange={(value) => onRoleSelect(value as UserRole)}
        className="space-y-4"
      >
        {roleOptions.map((role) => (
          <RoleOption
            key={role.id}
            role={role}
            isSelected={selectedRole === role.id}
            onSelect={onRoleSelect}
          />
        ))}
      </RadioGroup>
    </div>
  );
};

export default RoleSelectionList;
