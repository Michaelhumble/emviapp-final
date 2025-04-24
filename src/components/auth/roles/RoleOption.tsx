
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/context/auth/types";
import React from "react";
import { RoleOption as RoleOptionType } from "./roleData";

interface RoleOptionProps {
  role: RoleOptionType;
  isSelected: boolean;
  onSelect: (role: UserRole) => void;
}

const RoleOption: React.FC<RoleOptionProps> = ({ role, isSelected, onSelect }) => {
  // Create an instance of the icon component
  const IconComponent = role.icon;
  
  return (
    <div
      key={role.id}
      className={`flex items-start space-x-3 rounded-lg border p-4 transition-all cursor-pointer ${
        isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      }`}
      onClick={() => onSelect(role.id)}
    >
      <RadioGroupItem value={role.id} id={role.id} className="mt-1" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <IconComponent className="h-5 w-5 text-indigo-500" />
          </div>
          <Label htmlFor={role.id} className="text-base font-medium">
            {role.label}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
      </div>
    </div>
  );
};

export default RoleOption;
