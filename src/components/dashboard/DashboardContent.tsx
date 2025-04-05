
import { useAuth } from "@/context/auth";
import ProfileCompletionCard from "../profile/ProfileCompletionCard";
import AIDashboardWidgets from "../ai/AIDashboardWidgets";
import DashboardGreeting from "./common/DashboardGreeting";
import ArtistDashboardWidgets from "./artist/ArtistDashboardWidgets";
import SalonOwnerDashboardWidgets from "./salon/SalonOwnerDashboardWidgets";
import CustomerDashboardWidgets from "./customer/CustomerDashboardWidgets";
import SubscriptionStatusCard from "./SubscriptionStatusCard";

interface DashboardContentProps {
  className?: string;
}

const DashboardContent = ({ className = "" }: DashboardContentProps) => {
  const { userRole, userProfile } = useAuth();

  const isArtistOrFreelancer = userRole === 'artist' || userRole === 'freelancer' || userRole === 'nail technician/artist' || userRole === 'renter';
  
  const isSalonOrVendor = userRole === 'salon' || userRole === 'owner' || userRole === 'vendor' || userRole === 'supplier' || userRole === 'beauty supplier';
  
  const isCustomerOrOther = userRole === 'customer' || userRole === 'other' || !userRole;
  
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
      {isSalonOrVendor && (
        <div className="mb-6">
          <SubscriptionStatusCard />
        </div>
      )}
      
      {/* Role-specific dashboard content */}
      {isArtistOrFreelancer && <ArtistDashboardWidgets />}
      {isSalonOrVendor && <SalonOwnerDashboardWidgets />}
      {isCustomerOrOther && <CustomerDashboardWidgets />}
    </div>
  );
};

export default DashboardContent;
