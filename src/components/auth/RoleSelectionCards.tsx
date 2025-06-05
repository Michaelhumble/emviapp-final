
import { UserRole } from "@/context/auth/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Scissors, Building, Crown, Users, Package, Wrench, UserCheck } from "lucide-react";

interface RoleSelectionCardsProps {
  selectedRole: UserRole;
  onRoleSelect: (role: UserRole) => void;
}

const RoleSelectionCards = ({ selectedRole, onRoleSelect }: RoleSelectionCardsProps) => {
  const roles = [
    {
      id: "customer" as UserRole,
      title: "Customer",
      description: "Book appointments and discover services",
      icon: User,
      color: "bg-blue-50 border-blue-200"
    },
    {
      id: "artist" as UserRole,
      title: "Nail Artist",
      description: "Showcase your work and manage bookings",
      icon: Scissors,
      color: "bg-pink-50 border-pink-200"
    },
    {
      id: "salon" as UserRole,
      title: "Salon",
      description: "Manage your salon and team",
      icon: Building,
      color: "bg-purple-50 border-purple-200"
    },
    {
      id: "owner" as UserRole,
      title: "Salon Owner",
      description: "Own and operate multiple locations",
      icon: Crown,
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      id: "manager" as UserRole,
      title: "Manager",
      description: "Manage salon operations and staff",
      icon: Users,
      color: "bg-green-50 border-green-200"
    },
    {
      id: "supplier" as UserRole,
      title: "Supplier",
      description: "Provide beauty products and supplies",
      icon: Package,
      color: "bg-orange-50 border-orange-200"
    },
    {
      id: "freelancer" as UserRole,
      title: "Freelancer",
      description: "Independent beauty professional",
      icon: UserCheck,
      color: "bg-teal-50 border-teal-200"
    },
    {
      id: "other" as UserRole,
      title: "Other",
      description: "Other beauty industry professional",
      icon: Wrench,
      color: "bg-gray-50 border-gray-200"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        
        return (
          <Card
            key={role.id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              isSelected 
                ? `ring-2 ring-blue-500 ${role.color}` 
                : `hover:shadow-md ${role.color}`
            }`}
            onClick={() => onRoleSelect(role.id)}
          >
            <CardHeader className="text-center pb-2">
              <Icon className={`h-8 w-8 mx-auto ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
              <CardTitle className="text-sm font-medium">
                {role.title}
                {isSelected && <Badge className="ml-2 text-xs">Selected</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-xs text-center">
                {role.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RoleSelectionCards;
