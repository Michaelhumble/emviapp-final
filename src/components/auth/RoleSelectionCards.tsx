
import { Label } from "@/components/ui/label";
import { UserRole } from "@/context/auth/types";
import { User, Scissors, Building2, Briefcase, ShoppingBag, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

const roleOptions: RoleOption[] = [
  {
    id: "customer",
    label: "Customer",
    description: "I'm looking for beauty services",
    icon: <User className="h-5 w-5 text-indigo-600" />,
    badge: "Most Popular"
  },
  {
    id: "owner",
    label: "Salon Owner",
    description: "I own a salon or beauty business",
    icon: <Building2 className="h-5 w-5 text-purple-600" />
  },
  {
    id: "freelancer",
    label: "Freelancer",
    description: "I offer freelance beauty services",
    icon: <Briefcase className="h-5 w-5 text-green-600" />
  },
  {
    id: "artist",
    label: "Artist",
    description: "I'm a beauty professional",
    icon: <Scissors className="h-5 w-5 text-pink-600" />
  },
  {
    id: "supplier",
    label: "Vendor/Supplier",
    description: "I sell beauty products/supplies",
    icon: <ShoppingBag className="h-5 w-5 text-amber-600" />
  },
  {
    id: "other",
    label: "Other",
    description: "None of the above",
    icon: <HelpCircle className="h-5 w-5 text-gray-600" />
  }
];

interface RoleSelectionCardsProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

const RoleSelectionCards = ({ selectedRole, onChange }: RoleSelectionCardsProps) => {
  return (
    <div className="w-full space-y-4">
      <Label className="text-sm font-semibold text-gray-700">
        I am joining as a:
      </Label>
      <div className="grid gap-3 sm:grid-cols-2">
        {roleOptions.map((option) => (
          <div 
            key={option.id}
            className={cn(
              "relative flex cursor-pointer rounded-xl border-2 p-4 shadow-sm hover:shadow-md transition-all duration-200",
              selectedRole === option.id 
                ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-md" 
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
            onClick={() => onChange(option.id)}
          >
            {option.badge && selectedRole === option.id && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                {option.badge}
              </div>
            )}
            
            <div className="flex w-full items-center gap-x-3">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                selectedRole === option.id 
                  ? "bg-white shadow-sm" 
                  : "bg-gray-50"
              )}>
                {option.icon}
              </div>
              <div className="flex flex-col text-left flex-1">
                <span className={cn(
                  "block text-sm font-semibold transition-colors",
                  selectedRole === option.id ? "text-indigo-900" : "text-gray-900"
                )}>
                  {option.label}
                </span>
                <span className={cn(
                  "block text-xs transition-colors",
                  selectedRole === option.id ? "text-indigo-700" : "text-gray-500"
                )}>
                  {option.description}
                </span>
              </div>
            </div>
            
            <div 
              className={cn(
                "absolute top-4 right-4 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                selectedRole === option.id 
                  ? "bg-indigo-600 ring-2 ring-indigo-200" 
                  : "border-2 border-gray-300 bg-white"
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
