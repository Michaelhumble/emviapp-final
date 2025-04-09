
import { UserRole } from "@/context/auth/types";
import { cn } from "@/lib/utils";
import { roleOptions } from "./roles/roleData";

interface RoleSelectionCardsProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

const RoleSelectionCards = ({ selectedRole, onChange }: RoleSelectionCardsProps) => {
  return (
    <div className="w-full space-y-3">
      <div className="text-sm font-medium text-gray-700">
        I am joining as a:
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {roleOptions.map((option) => (
          <div 
            key={option.id}
            className={cn(
              "relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-all",
              selectedRole === option.id 
                ? "border-indigo-600 bg-indigo-50" 
                : "border-gray-200 bg-white hover:border-indigo-200"
            )}
            onClick={() => {
              console.log(`RoleSelectionCards: selected role ${option.id}`);
              onChange(option.id);
            }}
          >
            <div className="flex w-full items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                {option.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="block text-sm font-medium text-gray-900">
                  {option.label}
                </span>
                <span className="block text-xs text-gray-500">
                  {option.description}
                </span>
              </div>
            </div>
            <div 
              className={cn(
                "absolute top-3 right-3 h-5 w-5 rounded-full flex items-center justify-center",
                selectedRole === option.id 
                  ? "bg-indigo-600" 
                  : "border border-gray-300"
              )}
            >
              {selectedRole === option.id && (
                <div className="h-2 w-2 rounded-full bg-white"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelectionCards;
