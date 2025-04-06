
import { ReactNode } from "react";
import { useAuth } from "@/context/auth";
import { 
  Sparkles, Scissors, Building2, User, Briefcase, 
  ShoppingBag, HelpCircle, StarIcon, PaintBrush, 
  BarChart3, MapPin 
} from "lucide-react";

interface RoleDashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const RoleDashboardLayout = ({ children, className = "" }: RoleDashboardLayoutProps) => {
  const { userRole, userProfile } = useAuth();
  
  // Get role-specific styling
  const getRoleIcon = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return <PaintBrush className="h-5 w-5 text-purple-500" />;
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
        return <StarIcon className="h-5 w-5 text-rose-500" />;
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
        return "border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50";
      case 'salon':
      case 'owner':
        return "border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50";
      case 'supplier':
      case 'beauty supplier':
      case 'vendor':
        return "border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50";
      case 'freelancer':
        return "border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50";
      case 'customer':
        return "border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50";
      default:
        return "border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50";
    }
  };
  
  return (
    <div className={`${className}`}>
      <div className="mb-8 flex items-center justify-between">
        <div className={`inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm ${getRoleAccentColor()} border`}>
          {getRoleIcon()}
          <span className="ml-2 font-medium">{getRoleName()}</span>
          <Sparkles className="h-4 w-4 ml-2 text-amber-400" />
        </div>
        
        {userProfile?.location && (
          <div className="text-sm text-gray-500 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {userProfile.location}
          </div>
        )}
      </div>
      
      <div className={`rounded-xl overflow-hidden border ${getRoleAccentColor()}`}>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RoleDashboardLayout;
