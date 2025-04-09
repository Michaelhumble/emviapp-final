
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import ProgressTracker from '@/components/progress/ProgressTracker';
import ArtistDashboardProfile from '@/components/dashboard/artist/ArtistDashboardProfile';
import ArtistProfileSetupSection from '@/components/dashboard/artist/ArtistProfileSetupSection';
import ArtistDashboardWidgets from '@/components/dashboard/artist/ArtistDashboardWidgets';
import ArtistPortfolioSection from '@/components/portfolio/ArtistPortfolioSection';
import ArtistServicesSection from '@/components/dashboard/artist/ArtistServicesSection';
import ArtistUpgradeSection from '@/components/dashboard/artist/ArtistUpgradeSection';

const ArtistDashboardContent = () => {
  const { userProfile, userRole } = useAuth();
  const [showSetupGuide, setShowSetupGuide] = useState(true);

  // Check if the profile is complete enough to hide the setup guide
  const isProfileComplete = !!(
    userProfile?.bio && 
    userProfile?.specialty && 
    userProfile?.avatar_url &&
    userProfile?.location
  );

  return (
    <div className="space-y-6">
      <ProgressTracker />
      
      <ArtistDashboardProfile artistProfile={userProfile} />
      
      {/* Show setup guide unless profile is complete or user dismissed it */}
      {!isProfileComplete && showSetupGuide && (
        <ArtistProfileSetupSection />
      )}
      
      <ArtistDashboardWidgets />
      
      <ArtistPortfolioSection />
      
      <ArtistServicesSection />
      
      <ArtistUpgradeSection />
    </div>
  );
};

export default ArtistDashboardContent;
