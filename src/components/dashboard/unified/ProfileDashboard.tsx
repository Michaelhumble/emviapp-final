import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/auth';
import { 
  Home, 
  Image, 
  Calendar, 
  Star, 
  Trophy, 
  Vote, 
  Settings, 
  User,
  Camera,
  MessageSquare,
  Briefcase,
  Zap
} from 'lucide-react';

// Unified Components
import ProfileAnimatedHero from './sections/ProfileAnimatedHero';
import ProfileMobileActionBar from './sections/ProfileMobileActionBar';
import ProfileMobileBookingButton from './sections/ProfileMobileBookingButton';

// Tab Content Components (unified)
import ProfileOverviewTab from './tabs/ProfileOverviewTab';
import ProfilePortfolioTab from './tabs/ProfilePortfolioTab';
import ProfileBookingsTab from './tabs/ProfileBookingsTab';
import ProfileTestimonialsTab from './tabs/ProfileTestimonialsTab';
import ProfileLeaderboardTab from './tabs/ProfileLeaderboardTab';
import ProfileFeatureVotingTab from './tabs/ProfileFeatureVotingTab';
import ProfileSettingsTab from './tabs/ProfileSettingsTab';

// Role-specific Components
import FreelancerGigRequestsTab from './tabs/FreelancerGigRequestsTab';
import ArtistClientBookingsTab from './tabs/ArtistClientBookingsTab';

// Centralized theme configuration
import { getProfileTheme, ProfileThemeConfig } from '../../../utils/profileThemes';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1,
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  const { userRole } = useAuth();
  
  // Get theme configuration for current role
  const theme = getProfileTheme(userRole);
  
  // Base tabs available to all roles
  const baseTabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'voting', label: 'Feature Voting', icon: Vote },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Role-specific tabs
  const getRoleSpecificTabs = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return [
          { id: 'bookings', label: 'Bookings', icon: Calendar },
          { id: 'clients', label: 'Clients', icon: User }
        ];
      case 'freelancer':
        return [
          { id: 'gigs', label: 'Gig Requests', icon: Briefcase },
          { id: 'availability', label: 'Availability', icon: Calendar }
        ];
      default:
        return [];
    }
  };

  // Combine base tabs with role-specific tabs
  const tabs = [
    ...baseTabs.slice(0, 2), // overview, portfolio
    ...getRoleSpecificTabs(),
    ...baseTabs.slice(2) // testimonials, leaderboard, voting, settings
  ];

  return (
    <div className={`min-h-screen ${theme.backgroundGradient} relative overflow-hidden`}>
      {/* Enhanced Background with Dynamic Theme */}
      <div className={`absolute inset-0 ${theme.backgroundOverlay1}`} />
      <div className={`absolute inset-0 ${theme.backgroundOverlay2}`} />
      <div className={`absolute inset-0 ${theme.backgroundOverlay3}`} />
      
      {/* Floating Orbs with Theme Colors */}
      <div className={`absolute top-10 left-10 w-32 h-32 ${theme.floatingOrb1} rounded-full blur-xl animate-float opacity-60`} />
      <div className={`absolute top-40 right-20 w-24 h-24 ${theme.floatingOrb2} rounded-full blur-xl float-gentle opacity-40`} />
      <div className={`absolute bottom-20 left-1/4 w-40 h-40 ${theme.floatingOrb3} rounded-full blur-xl animate-float opacity-50`} style={{ animationDelay: '2s' }} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Animated Hero */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <ProfileAnimatedHero theme={theme} />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Mobile: Horizontal scrolling tabs */}
              {isMobile ? (
                <div className="overflow-x-auto pb-3 scrollbar-hide">
                  <TabsList className={`inline-flex min-w-max space-x-2 ${theme.tabsBackground} backdrop-blur-lg p-2 rounded-3xl shadow-xl ${theme.tabsBorder} card-glass`}>
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.id}
                          className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-2xl ${theme.tabTriggerActive} ${theme.tabTriggerHover} transition-all duration-300 min-w-[130px] justify-center data-[state=active]:scale-105`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              ) : (
                /* Desktop: Grid layout */
                <TabsList className={`grid gap-3 ${theme.tabsBackground} backdrop-blur-lg p-3 rounded-3xl shadow-xl ${theme.tabsBorder} card-glass h-auto`} style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className={`flex flex-col items-center gap-3 px-4 py-5 text-sm font-semibold rounded-2xl ${theme.tabTriggerActive} ${theme.tabTriggerHover} transition-all duration-300 h-auto data-[state=active]:scale-105 relative overflow-hidden`}
                      >
                        <IconComponent className="h-6 w-6 relative z-10" />
                        <span className="relative z-10">{tab.label}</span>
                        
                        {/* Active indicator glow */}
                        <div className={`absolute inset-0 ${theme.tabActiveGlow} rounded-2xl opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300`} />
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              )}

              {/* Tab Content with role-based rendering */}
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="overview" className="mt-0">
                      <ProfileOverviewTab theme={theme} />
                    </TabsContent>
                    
                    <TabsContent value="portfolio" className="mt-0">
                      <ProfilePortfolioTab theme={theme} />
                    </TabsContent>
                    
                    {/* Role-specific tabs */}
                    {(userRole === 'artist' || userRole === 'nail technician/artist') && (
                      <>
                        <TabsContent value="bookings" className="mt-0">
                          <ProfileBookingsTab theme={theme} />
                        </TabsContent>
                        
                        <TabsContent value="clients" className="mt-0">
                          <ArtistClientBookingsTab theme={theme} />
                        </TabsContent>
                      </>
                    )}
                    
                    {userRole === 'freelancer' && (
                      <>
                        <TabsContent value="gigs" className="mt-0">
                          <FreelancerGigRequestsTab theme={theme} />
                        </TabsContent>
                        
                        <TabsContent value="availability" className="mt-0">
                          <ProfileBookingsTab theme={theme} />
                        </TabsContent>
                      </>
                    )}
                    
                    <TabsContent value="testimonials" className="mt-0">
                      <ProfileTestimonialsTab theme={theme} />
                    </TabsContent>
                    
                    <TabsContent value="leaderboard" className="mt-0">
                      <ProfileLeaderboardTab theme={theme} />
                    </TabsContent>
                    
                    <TabsContent value="voting" className="mt-0">
                      <ProfileFeatureVotingTab theme={theme} />
                    </TabsContent>
                    
                    <TabsContent value="settings" className="mt-0">
                      <ProfileSettingsTab theme={theme} />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>
          </motion.div>
        </div>

        {/* Mobile Action Bar */}
        <ProfileMobileActionBar 
          theme={theme}
          onAction={(action) => {
            if (action === 'portfolio') setActiveTab('portfolio');
            else if (action === 'bookings') setActiveTab(userRole === 'freelancer' ? 'gigs' : 'bookings');
            else if (action === 'reviews') setActiveTab('testimonials');
            else if (action === 'settings') setActiveTab('settings');
            else if (action === 'upload') setActiveTab('portfolio');
          }}
          unreadNotifications={0}
        />
        
        {/* Mobile Booking Button - Role-specific */}
        <ProfileMobileBookingButton theme={theme} userRole={userRole} />
      </motion.div>
    </div>
  );
};

export default ProfileDashboard;