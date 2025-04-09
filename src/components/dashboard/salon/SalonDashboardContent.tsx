
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { adaptUserProfile } from '@/utils/profileAdapter';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { MoreHorizontal, PlusCircle, TrendingUp, Store, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Import dashboard components
import SalonWelcomeBanner from './components/SalonWelcomeBanner';
import SalonMetricsCards from './components/SalonMetricsCards';
import SalonQuickActions from './components/SalonQuickActions';
import SalonInfoSection from './components/SalonInfoSection';
import SalonManagementTools from './components/SalonManagementTools';
import SalonCreditSystem from './components/SalonCreditSystem';
import SalonReferralSection from './components/SalonReferralSection';

const SalonDashboardContent = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const adaptedProfile = adaptUserProfile(userProfile);
  const { t } = useTranslation();
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      } 
    }
  };
  
  // Update credit balance if profile changes
  useEffect(() => {
    if (adaptedProfile && 'credits' in adaptedProfile) {
      setCredits(adaptedProfile.credits || 0);
    }
  }, [adaptedProfile]);
  
  const handleBuyCredits = () => {
    console.log("Opening credit purchase flow");
    window.location.href = "/credits/purchase";
  };
  
  const handleBoostVisibility = () => {
    console.log("Opening visibility boost flow");
    window.location.href = "/boost/salon";
  };
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 py-4"
    >
      {/* Premium Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          {t("Business Dashboard")}
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            {t("New Post")}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info("Coming soon")}>
                {t("Export Data")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = "/settings/business"}>
                {t("Business Settings")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Welcome Banner */}
      <motion.div variants={item}>
        <SalonWelcomeBanner 
          salonName={adaptedProfile?.salon_name || adaptedProfile?.company_name || 'Your Salon'} 
        />
      </motion.div>
      
      {/* Metrics Cards */}
      <motion.div variants={item}>
        <SalonMetricsCards />
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t("Quick Actions")}
        </h2>
        <SalonQuickActions />
      </motion.div>
      
      {/* Credit System */}
      <motion.div variants={item}>
        <SalonCreditSystem 
          credits={credits} 
          onBuyCredits={handleBuyCredits}
          onBoostVisibility={handleBoostVisibility}
        />
      </motion.div>
      
      {/* Management Tools */}
      <motion.div variants={item}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
          {t("Salon Management")}
          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <Link to="/dashboard/salon/manage">
              {t("View All")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </h2>
        <SalonManagementTools />
      </motion.div>
      
      {/* Salon Info Section */}
      <motion.div variants={item}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t("Business Profile")}
        </h2>
        <SalonInfoSection 
          profile={adaptedProfile} 
          isLoading={isLoading}
          onProfileUpdate={() => refreshUserProfile()}
        />
      </motion.div>
      
      {/* Referral Section */}
      <motion.div variants={item}>
        <SalonReferralSection />
      </motion.div>
    </motion.div>
  );
};

export default SalonDashboardContent;
