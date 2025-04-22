
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CalendarDays, GalleryHorizontal, Star, MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useArtistProfile } from "@/hooks/artist/useArtistProfile";

// Import our clean, modular components
import ArtistProfile from "./ArtistProfile";
import ClientTestimonials from "./ClientTestimonials";
import PortfolioShowcase from "./PortfolioShowcase";
import ProfileHighlights from "./ProfileHighlights";
import PersonalMessageBanner from "./PersonalMessageBanner";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1,
      duration: 0.5 
    } 
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 } 
  }
};

export default function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { profile, isLoading } = useArtistProfile();
  
  // Handle portfolio upload
  const handlePortfolioUpload = () => {
    // Navigate to portfolio upload page or open upload modal
    window.location.href = "/profile/portfolio";
  };
  
  return (
    <motion.div 
      className="space-y-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* Artist Profile Section */}
      <motion.div variants={sectionVariants}>
        <ArtistProfile artistProfile={profile} />
      </motion.div>
      
      {/* Dashboard Tabs */}
      <motion.div variants={sectionVariants}>
        <Tabs 
          defaultValue="overview" 
          className="space-y-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="flex-wrap border border-gray-200 p-1 bg-gray-50/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <GalleryHorizontal className="h-4 w-4 mr-2 text-purple-500" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="h-4 w-4 mr-2 text-purple-500" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Star className="h-4 w-4 mr-2 text-purple-500" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center py-2 px-4 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CalendarDays className="h-4 w-4 mr-2 text-purple-500" />
              Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8 pt-4">
            <ProfileHighlights 
              stats={{
                rating: 4.9,
                clients: profile?.credits || 156,
                completionRate: 98,
                responseTime: "2 hrs",
                repeatClients: 42,
                experience: profile?.years_experience ? `${profile.years_experience} years` : "5+ years"
              }} 
            />
            
            <PersonalMessageBanner artistName={profile?.full_name} />
            
            <PortfolioShowcase 
              limit={3} 
              isPreview={true} 
              onAddClick={handlePortfolioUpload}
            />
            
            <ClientTestimonials />
          </TabsContent>
          
          <TabsContent value="portfolio" className="pt-4">
            <PortfolioShowcase onAddClick={handlePortfolioUpload} />
          </TabsContent>
          
          <TabsContent value="clients" className="pt-4">
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Client Management</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Track and manage all your clients in one place. This feature is coming soon!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-4">
            <ClientTestimonials title="My Reviews" />
          </TabsContent>
          
          <TabsContent value="messages" className="pt-4">
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Messaging</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Chat with your clients and manage appointments. This feature is coming soon!
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="pt-4">
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <CalendarDays className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">Appointment Calendar</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Manage your schedule and bookings. This feature is coming soon!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
