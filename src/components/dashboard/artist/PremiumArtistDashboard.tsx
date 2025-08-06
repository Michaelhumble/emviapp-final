
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
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
  MessageSquare
} from 'lucide-react';

// Premium Hero Components
import ArtistAnimatedHero from './sections/ArtistAnimatedHero';
import ArtistMobileActionBar from './sections/ArtistMobileActionBar';
import ArtistMobileBookingButton from './sections/ArtistMobileBookingButton';

// Tab Content Components
import ArtistOverviewTab from './tabs/ArtistOverviewTab';
import ArtistPortfolioTab from './tabs/ArtistPortfolioTab';
import ArtistBookingsTab from './tabs/ArtistBookingsTab';
import ArtistTestimonialsTab from './tabs/ArtistTestimonialsTab';
import ArtistLeaderboardTab from './tabs/ArtistLeaderboardTab';
import ArtistFeatureVotingTab from './tabs/ArtistFeatureVotingTab';
import ArtistSettingsTab from './tabs/ArtistSettingsTab';

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

const PremiumArtistDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'voting', label: 'Feature Voting', icon: Vote },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 relative overflow-hidden">
      {/* Enhanced Background with Floating Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--luxury-gold)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,hsl(var(--premium-purple)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,hsl(var(--diamond-blue)/0.05),transparent_50%)]" />
      
      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float opacity-60" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl float-gentle opacity-40" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-xl animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Animated Hero */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <ArtistAnimatedHero />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Mobile: Horizontal scrolling tabs with enhanced styling */}
              {isMobile ? (
                <div className="overflow-x-auto pb-3 scrollbar-hide">
                  <TabsList className="inline-flex min-w-max space-x-2 bg-white/90 backdrop-blur-lg p-2 rounded-3xl shadow-xl border border-purple-100/50 card-glass">
                    {tabs.map((tab, index) => {
                      const IconComponent = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.id}
                          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 min-w-[130px] justify-center hover:bg-purple-50 data-[state=active]:scale-105"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              ) : (
                /* Desktop: Enhanced grid layout with proper TabsList structure */
                <TabsList className="grid grid-cols-7 gap-3 bg-white/90 backdrop-blur-lg p-3 rounded-3xl shadow-xl border border-purple-100/50 card-glass h-auto">
                  {tabs.map((tab, index) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex flex-col items-center gap-3 px-4 py-5 text-sm font-semibold rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 h-auto hover:bg-purple-50 data-[state=active]:scale-105 relative overflow-hidden"
                      >
                        <IconComponent className="h-6 w-6 relative z-10" />
                        <span className="relative z-10">{tab.label}</span>
                        
                        {/* Active indicator glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300" />
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              )}

              {/* Enhanced Tab Content with staggered animations */}
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
                      <ArtistOverviewTab />
                    </TabsContent>
                    
                    <TabsContent value="portfolio" className="mt-0">
                      <ArtistPortfolioTab />
                    </TabsContent>
                    
                    <TabsContent value="bookings" className="mt-0">
                      <ArtistBookingsTab />
                    </TabsContent>
                    
                    <TabsContent value="testimonials" className="mt-0">
                      <ArtistTestimonialsTab />
                    </TabsContent>
                    
                    <TabsContent value="leaderboard" className="mt-0">
                      <ArtistLeaderboardTab />
                    </TabsContent>
                    
                    <TabsContent value="voting" className="mt-0">
                      <ArtistFeatureVotingTab />
                    </TabsContent>
                    
                    <TabsContent value="settings" className="mt-0">
                      <ArtistSettingsTab />
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tabs>
          </motion.div>
        </div>

        {/* Mobile Action Bar */}
        <ArtistMobileActionBar 
          onAction={(action) => {
            if (action === 'portfolio') setActiveTab('portfolio');
            else if (action === 'bookings') setActiveTab('bookings');
            else if (action === 'reviews') setActiveTab('testimonials');
            else if (action === 'settings') setActiveTab('settings');
            else if (action === 'upload') setActiveTab('portfolio');
          }}
          unreadNotifications={0}
        />
        
        {/* Mobile Booking Button */}
        <ArtistMobileBookingButton />
      </motion.div>
    </div>
  );
};

export default PremiumArtistDashboard;
