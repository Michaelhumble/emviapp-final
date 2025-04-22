import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { 
  Instagram, 
  Globe, 
  CalendarDays, 
  Users, 
  Star, 
  MessageSquare,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import ArtistMetrics from "./sections/ArtistMetrics";
import ArtistPortfolioPreview from "./sections/ArtistPortfolioPreview";
import ArtistTestimonials from "./sections/ArtistTestimonials";
import ArtistCalendarPreview from "./sections/ArtistCalendarPreview";
import ArtistMessagesPreview from "./sections/ArtistMessagesPreview";
import ArtistPortfolioSection from "./sections/ArtistPortfolioSection";
import ArtistBookingsOverview from "./sections/ArtistBookingsOverview";
import ArtistDailyMotivation from "./ArtistDailyMotivation";
import ArtistQuickStats from "./sections/ArtistQuickStats";
import ArtistGrowYourBusinessCard from "./sections/ArtistGrowYourBusinessCard";
import YourNextGoalCard from "./sections/YourNextGoalCard";
import ArtistReferralCenter from "./ArtistReferralCenter";
import ArtistManageServicesSection from "./sections/ArtistManageServicesSection";
import ArtistClientsPreviewSection from "./sections/ArtistClientsPreviewSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.1,
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 } 
  }
};

const ArtistDashboard = () => {
  const { userProfile } = useAuth();
  
  const profileName = userProfile?.full_name || "Artist Name";
  const firstName = profileName.split(" ")[0];
  const specialty = userProfile?.specialty || "Nail Artist";
  const avatarUrl = userProfile?.avatar_url;
  const instagramHandle = userProfile?.instagram;
  const website = userProfile?.website;
  
  const coverImage = "/images/dashboard-cover.jpg";
  
  return (
    <motion.div
      className="mx-auto max-w-5xl px-4 py-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="h-32 md:h-40 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 relative">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
            <Button 
              size="sm" 
              variant="secondary" 
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white/90"
              asChild
            >
              <Link to="/profile/edit">
                <Edit className="h-4 w-4 mr-1.5" />
                Edit Profile
              </Link>
            </Button>
          </div>
          
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row md:items-start gap-6 -mt-12 md:-mt-14">
              <Avatar className="h-24 w-24 border-4 border-white rounded-full shadow-md">
                <AvatarImage 
                  src={avatarUrl} 
                  alt={profileName} 
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-200 text-purple-700">
                  {profileName?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-3 flex-1">
                <h1 className="font-serif text-2xl font-semibold text-gray-900">
                  {profileName}
                </h1>
                
                <p className="text-gray-600">
                  {specialty}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {instagramHandle && (
                    <a 
                      href={`https://instagram.com/${instagramHandle}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center hover:text-purple-600 transition-colors"
                    >
                      <Instagram className="h-4 w-4 mr-1.5 text-gray-400" />
                      @{instagramHandle}
                    </a>
                  )}
                  
                  {website && (
                    <a 
                      href={website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center hover:text-purple-600 transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-1.5 text-gray-400" />
                      Website
                    </a>
                  )}
                </div>
                
                <p className="text-gray-600 font-serif italic">
                  "Your artistry is your brand. Let's grow it."
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistPortfolioSection />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistBookingsOverview />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistDailyMotivation />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistQuickStats />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistGrowYourBusinessCard />
        <YourNextGoalCard />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistReferralCenter />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ArtistManageServicesSection />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistClientsPreviewSection />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ArtistMetrics />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ArtistPortfolioPreview />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ArtistTestimonials />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ArtistMessagesPreview />
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <ArtistCalendarPreview />
      </motion.div>
    </motion.div>
  );
};

export default ArtistDashboard;
