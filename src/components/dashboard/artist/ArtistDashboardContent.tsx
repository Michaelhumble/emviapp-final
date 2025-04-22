
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  GalleryHorizontal, 
  Users, 
  Star, 
  MessageSquare, 
  CalendarDays 
} from 'lucide-react';
import { UserProfile } from '@/context/auth/types';
import ArtistDashboardHeader from './ArtistDashboardHeader';
import OverviewTab from './tabs/OverviewTab';
import PortfolioTab from './tabs/PortfolioTab';
import ClientsTab from './tabs/ClientsTab';
import ReviewsTab from './tabs/ReviewsTab';
import MessagesTab from './tabs/MessagesTab';
import CalendarTab from './tabs/CalendarTab';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
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

interface ArtistDashboardContentProps {
  profile: UserProfile | null;
}

const ArtistDashboardContent = ({ profile }: ArtistDashboardContentProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Store the active tab in localStorage for persistence
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('artist_dashboard_tab', value);
  };

  // Check if there's a stored tab preference
  useState(() => {
    const storedTab = localStorage.getItem('artist_dashboard_tab');
    if (storedTab) {
      setActiveTab(storedTab);
    }
  });
  
  const firstName = profile?.full_name?.split(' ')[0] || 'Artist';
  
  return (
    <motion.div 
      className="space-y-8 px-4 py-6 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <ArtistDashboardHeader profile={profile} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="space-y-8"
        >
          <TabsList className="bg-white/50 backdrop-blur-sm border border-gray-100 shadow-sm p-1 flex-wrap justify-start">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              <BarChart3 className="h-4 w-4 text-purple-500" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              <GalleryHorizontal className="h-4 w-4 text-purple-500" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              <Users className="h-4 w-4 text-purple-500" />
              Clients
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              <Star className="h-4 w-4 text-purple-500" />
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              <MessageSquare className="h-4 w-4 text-purple-500" />
              Messages
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm py-2"
            >
              <CalendarDays className="h-4 w-4 text-purple-500" />
              Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-2">
            <OverviewTab profile={profile} />
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-6 pt-2">
            <PortfolioTab />
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-6 pt-2">
            <ClientsTab />
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6 pt-2">
            <ReviewsTab />
          </TabsContent>
          
          <TabsContent value="messages" className="space-y-6 pt-2">
            <MessagesTab />
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-6 pt-2">
            <CalendarTab />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ArtistDashboardContent;
