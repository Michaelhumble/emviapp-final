
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

interface DashboardContentProps {
  className?: string;
}

const DashboardContent = ({ className = "" }: DashboardContentProps) => {
  const { userRole, userProfile } = useAuth();

  const isArtistOrTechnician = userRole === 'artist' || userRole === 'nail technician/artist' || userRole === 'renter';
  
  const isFreelancer = userRole === 'freelancer';
  
  const isSalon = userRole === 'salon' || userRole === 'owner';
  
  const isSupplier = userRole === 'vendor' || userRole === 'supplier' || userRole === 'beauty supplier';
  
  const isCustomer = userRole === 'customer';
  
  const isOther = userRole === 'other' || !userRole;
  
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
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
