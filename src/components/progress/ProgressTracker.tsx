
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { checkCredits, getReferralStats } from "@/utils/credits";
import { useState, useEffect } from "react";
import CreditStatusCard from "./CreditStatusCard";
import ReferralProgressCard from "./ReferralProgressCard";
import BoostVisibilityCard from "./BoostVisibilityCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import { useProfileBoost } from "@/components/dashboard/artist/credits/useProfileBoost";

const ProgressTracker = () => {
  const { user, userProfile, userRole } = useAuth();
  const { t } = useTranslation();
  const [credits, setCredits] = useState<number>(0);
  const [referralStats, setReferralStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { boostStatus } = useProfileBoost();

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!userProfile) return 0;
    
    let totalFields = 0;
    let completedFields = 0;
    
    // Common fields for all users
    const commonFields = [
      'full_name', 
      'email', 
      'avatar_url', 
      'bio', 
      'location'
    ];
    
    totalFields += commonFields.length;
    commonFields.forEach(field => {
      if (userProfile[field as keyof typeof userProfile]) completedFields++;
    });
    
    // Role-specific fields
    if (userRole === 'artist' || userRole === 'nail technician/artist') {
      const artistFields = ['portfolio_urls', 'specialty', 'booking_url', 'website', 'instagram'];
      totalFields += artistFields.length;
      artistFields.forEach(field => {
        const value = userProfile[field as keyof typeof userProfile];
        if (Array.isArray(value) ? value.length > 0 : !!value) completedFields++;
      });
    } else if (userRole === 'salon' || userRole === 'owner') {
      const salonFields = ['salon_name', 'website', 'instagram', 'phone'];
      totalFields += salonFields.length;
      salonFields.forEach(field => {
        if (userProfile[field as keyof typeof userProfile]) completedFields++;
      });
    }
    
    return Math.round((completedFields / totalFields) * 100);
  };
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        // Fetch credits
        const userCredits = await checkCredits(user.id);
        setCredits(userCredits);
        
        // Fetch referral stats
        const stats = await getReferralStats(user.id);
        setReferralStats(stats);
        
      } catch (error) {
        console.error("Error fetching user progress data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user?.id]);
  
  const profileCompletionPercentage = calculateProfileCompletion();
  
  // Container animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Card animation
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Generate tip messages based on user data
  const getTipMessage = () => {
    if (!userProfile) return null;
    
    if (profileCompletionPercentage < 80) {
      return {
        icon: '🔍',
        message: t('Complete your profile to show up in search results')
      };
    }
    
    if (referralStats && referralStats.total < 3) {
      return {
        icon: '💎',
        message: t('Invite one more friend to unlock 50 bonus credits')
      };
    }
    
    if (!boostStatus.isActive && userRole === 'artist') {
      return {
        icon: '🔥',
        message: t('Boost now – 8 salons nearby are hiring')
      };
    }
    
    return null;
  };
  
  const tipMessage = getTipMessage();

  return (
    <div className="w-full mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {t('Your Progress Tracker')}
      </h2>
      
      {tipMessage && (
        <motion.div 
          className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg mb-4 border border-amber-100 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm flex items-center text-amber-800">
            <span className="mr-2 text-lg">{tipMessage.icon}</span>
            {tipMessage.message}
          </p>
        </motion.div>
      )}
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Credit Status Card */}
        <motion.div variants={item}>
          <CreditStatusCard credits={credits} loading={loading} />
        </motion.div>
        
        {/* Referral Progress Card */}
        <motion.div variants={item}>
          <ReferralProgressCard referralStats={referralStats} loading={loading} />
        </motion.div>
        
        {/* Boost & Visibility Card */}
        <motion.div variants={item}>
          <BoostVisibilityCard boostStatus={boostStatus} credits={credits} loading={loading} />
        </motion.div>
        
        {/* Profile Completion Card */}
        <motion.div variants={item}>
          <ProfileCompletionCard percentage={profileCompletionPercentage} userProfile={userProfile} loading={loading} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;
