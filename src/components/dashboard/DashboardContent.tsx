
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
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
import { GradientBackground } from "@/components/ui/gradient-background";

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
  
  // Get variant based on user role
  const getVariant = () => {
    if (isArtistOrTechnician) return "artist";
    if (isSalon) return "salon";
    if (isCustomer) return "customer";
    return "default";
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <GradientBackground variant={getVariant()} className={`max-w-4xl mx-auto ${className} rounded-xl shadow-sm border border-gray-100`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <DashboardGreeting />
        </motion.div>
        
        {/* Profile Completion Card */}
        <motion.div variants={itemVariants} className="mb-6">
          <ProfileCompletionCard />
        </motion.div>
        
        {/* AI Dashboard Widgets - showing fewer for better focus */}
        <motion.div variants={itemVariants} className="mb-8">
          <AIDashboardWidgets />
        </motion.div>
        
        {/* Subscription Status */}
        {(isSalon || isSupplier) && (
          <motion.div variants={itemVariants} className="mb-6">
            <SubscriptionStatusCard />
          </motion.div>
        )}
        
        {/* Role-specific dashboard content */}
        {isArtistOrTechnician && <ArtistDashboardWidgets />}
        {isFreelancer && <FreelancerDashboardWidgets />}
        {isSalon && <SalonOwnerDashboardWidgets />}
        {isSupplier && <SupplierDashboardWidgets />}
        {isCustomer && <CustomerDashboardWidgets />}
        {isOther && <OtherDashboardWidgets />}
      </motion.div>
    </GradientBackground>
  );
};

export default DashboardContent;
