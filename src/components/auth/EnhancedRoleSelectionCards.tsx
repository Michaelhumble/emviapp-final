
import { UserRole } from "@/context/auth/types";
import { User, Scissors, Building2, Briefcase, ShoppingBag, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  popular?: boolean;
}

const roleOptions: RoleOption[] = [
  {
    id: "customer",
    label: "Customer",
    description: "Book beauty services & discover artists",
    icon: <User className="h-6 w-6" />,
    gradient: "from-blue-500 to-cyan-500",
    popular: true
  },
  {
    id: "artist",
    label: "Beauty Artist",
    description: "Showcase your skills & grow your business",
    icon: <Scissors className="h-6 w-6" />,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: "owner",
    label: "Salon Owner",
    description: "Manage your salon & hire talent",
    icon: <Building2 className="h-6 w-6" />,
    gradient: "from-purple-500 to-indigo-500"
  },
  {
    id: "freelancer",
    label: "Freelancer",
    description: "Offer services independently",
    icon: <Briefcase className="h-6 w-6" />,
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: "supplier",
    label: "Supplier",
    description: "Sell beauty products & supplies",
    icon: <ShoppingBag className="h-6 w-6" />,
    gradient: "from-orange-500 to-amber-500"
  },
  {
    id: "other",
    label: "Other",
    description: "None of the above",
    icon: <HelpCircle className="h-6 w-6" />,
    gradient: "from-gray-500 to-slate-500"
  }
];

interface EnhancedRoleSelectionCardsProps {
  selectedRole: UserRole;
  onChange: (role: UserRole) => void;
}

const EnhancedRoleSelectionCards = ({ selectedRole, onChange }: EnhancedRoleSelectionCardsProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Choose Your Role
        </h3>
        <p className="text-gray-600">
          Select how you'll use EmviApp to get started
        </p>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {roleOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={cn(
              "relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-105",
              selectedRole === option.id 
                ? "border-transparent bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg" 
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
            )}
            onClick={() => onChange(option.id)}
          >
            {/* Popular Badge */}
            {option.popular && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </div>
            )}

            {/* Icon with gradient background */}
            <div className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 text-white bg-gradient-to-br",
              option.gradient
            )}>
              {option.icon}
            </div>
            
            {/* Content */}
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-gray-900">
                {option.label}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {option.description}
              </p>
            </div>
            
            {/* Selection Indicator */}
            <div className={cn(
              "absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300",
              selectedRole === option.id
                ? "border-indigo-500 bg-indigo-500"
                : "border-gray-300"
            )}>
              {selectedRole === option.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-full h-full rounded-full bg-white scale-50"
                />
              )}
            </div>

            {/* Hover Effect Overlay */}
            <div className={cn(
              "absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none",
              selectedRole === option.id
                ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                : "bg-gradient-to-br from-gray-500/0 to-gray-500/0 hover:from-gray-500/5 hover:to-gray-500/5"
            )} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedRoleSelectionCards;
