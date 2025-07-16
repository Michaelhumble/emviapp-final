
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

// Hero and Stats
import ArtistWelcomeHero from './sections/ArtistWelcomeHero';
import ArtistEmpireStats from './sections/ArtistEmpireStats';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* Hero Welcome */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <ArtistWelcomeHero />
          </motion.div>

          {/* Empire Stats */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <ArtistEmpireStats />
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Mobile: Horizontal scrolling tabs */}
              {isMobile ? (
                <div className="overflow-x-auto pb-2">
                  <TabsList className="inline-flex min-w-max space-x-1 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border border-purple-100">
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.id}
                          value={tab.id}
                          className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 min-w-[120px] justify-center"
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
                <TabsList className="grid grid-cols-7 gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-purple-100 h-auto">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex flex-col items-center gap-2 px-4 py-4 text-sm font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 h-auto"
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              )}

              {/* Tab Content */}
              <div className="mt-6 md:mt-8">
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
              </div>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumArtistDashboard;
