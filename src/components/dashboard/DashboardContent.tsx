
import { useAuth } from "@/context/auth";
import ProfileCompletionCard from "../profile/ProfileCompletionCard";
import AIDashboardWidgets from "../ai/AIDashboardWidgets";
import DashboardGreeting from "./common/DashboardGreeting";
import ArtistDashboardWidgets from "./artist/ArtistDashboardWidgets";
import SalonOwnerDashboardWidgets from "./salon/SalonOwnerDashboardWidgets";
import CustomerDashboardWidgets from "./customer/CustomerDashboardWidgets";
import SubscriptionStatusCard from "./SubscriptionStatusCard";
import FreelancerDashboardWidgets from "./freelancer/FreelancerDashboardWidgets";
import SupplierDashboardWidgets from "./supplier/SupplierDashboardWidgets";
import OtherDashboardWidgets from "./other/OtherDashboardWidgets";
import { isRoleEquivalent } from "@/utils/roleUtils";

interface DashboardContentProps {
  className?: string;
}

const DashboardContent = ({ className = "" }: DashboardContentProps) => {
  const { userRole, userProfile } = useAuth();

  const isArtistOrTechnician = isRoleEquivalent(userRole, ['artist', 'nail technician/artist', 'renter']);
  
  const isFreelancer = isRoleEquivalent(userRole, ['freelancer']);
  
  const isSalon = isRoleEquivalent(userRole, ['salon_owner', 'salon', 'owner']);
  
  const isSupplier = isRoleEquivalent(userRole, ['supplier', 'vendor', 'beauty supplier']);
  
  const isCustomer = isRoleEquivalent(userRole, ['customer']);
  
  const isOther = isRoleEquivalent(userRole, ['other']) || !userRole;
  
  // Generate theme class based on user role
  const getRoleThemeClass = () => {
    if (isArtistOrTechnician) return "bg-gradient-to-br from-purple-50 to-pink-50";
    if (isSalon) return "bg-gradient-to-br from-blue-50 to-indigo-50";
    if (isSupplier) return "bg-gradient-to-br from-emerald-50 to-teal-50";
    if (isFreelancer) return "bg-gradient-to-br from-amber-50 to-yellow-50";
    if (isCustomer) return "bg-gradient-to-br from-rose-50 to-pink-50";
    return "bg-gradient-to-br from-gray-50 to-slate-50";
  };
  
  return (
    <div className={`max-w-4xl mx-auto ${className} p-6 rounded-xl shadow-sm ${getRoleThemeClass()} border border-gray-100`}>
      <DashboardGreeting />
      
      {/* Profile Completion Card */}
      <div className="mb-6">
        <ProfileCompletionCard />
      </div>
      
      {/* AI Dashboard Widgets - showing fewer for better focus */}
      <div className="mb-8">
        <AIDashboardWidgets />
      </div>
      
      {/* Subscription Status */}
      {(isSalon || isSupplier) && (
        <div className="mb-6">
          <SubscriptionStatusCard />
        </div>
      )}
      
      {/* Role-specific dashboard content */}
      {isArtistOrTechnician && <ArtistDashboardWidgets />}
      {isFreelancer && <FreelancerDashboardWidgets />}
      {isSalon && <SalonOwnerDashboardWidgets />}
      {isSupplier && <SupplierDashboardWidgets />}
      {isCustomer && <CustomerDashboardWidgets />}
      {isOther && <OtherDashboardWidgets />}
    </div>
  );
};

export default DashboardContent;
