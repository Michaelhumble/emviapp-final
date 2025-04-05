
import { ReactNode } from "react";
import { useAuth } from "@/context/auth";
import { Sparkles, Scissors, Building2, User, Briefcase, ShoppingBag, HelpCircle } from "lucide-react";

interface RoleDashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const { userRole } = useAuth();
  
  // Get role-specific styling
  const getRoleIcon = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
      case 'renter':
        return <Scissors className="h-5 w-5 text-purple-500" />;
      case 'salon':
      case 'owner':
        return <Building2 className="h-5 w-5 text-blue-500" />;
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return <ShoppingBag className="h-5 w-5 text-emerald-500" />;
      case 'freelancer':
        return <Briefcase className="h-5 w-5 text-amber-500" />;
      case 'customer':
        return <User className="h-5 w-5 text-rose-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Get role display name
  const getRoleName = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return "Artist Dashboard";
      case 'renter':
        return "Booth Renter Dashboard";
      case 'salon':
      case 'owner':
        return "Salon Owner Dashboard";
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return "Supplier Dashboard";
      case 'freelancer':
        return "Freelancer Dashboard";
      case 'customer':
        return "Beauty Enthusiast Dashboard";
      default:
        return "Dashboard";
    }
  };
  
  // Get role-specific accent color
  const getRoleAccentColor = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
      case 'renter':
        return "border-purple-200";
      case 'salon':
      case 'owner':
        return "border-blue-200";
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return "border-emerald-200";
      case 'freelancer':
        return "border-amber-200";
      case 'customer':
        return "border-rose-200";
      default:
        return "border-gray-200";
    }
  };
  
  return (
    <div className={`${className}`}>
      <div className="mb-8">
        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm ${getRoleAccentColor()} border`}>
          {getRoleIcon()}
          <span className="ml-2 font-medium">{getRoleName()}</span>
          <Sparkles className="h-4 w-4 ml-2 text-amber-400" />
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default RoleDashboardLayout;
