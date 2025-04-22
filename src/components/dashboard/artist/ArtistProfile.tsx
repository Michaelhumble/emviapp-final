
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3, Instagram, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/utils/userUtils";
import { ArtistProfile as ArtistProfileType } from "@/types/artist";
import { motion } from "framer-motion";

interface ArtistProfileProps {
  artistProfile: ArtistProfileType | null;
  profileCompletion?: number;
}

const ArtistProfile = ({ artistProfile, profileCompletion }: ArtistProfileProps) => {
  // Use provided profileCompletion or default to profile's value or 0
  const completionPercentage = profileCompletion || 
    artistProfile?.profile_completion || 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      className="mb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="overflow-hidden border border-gray-100 shadow-sm">
        <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
        <CardContent className="relative p-6">
          <motion.div 
            className="flex flex-col md:flex-row gap-6"
            variants={containerVariants}
          >
            <motion.div 
              className="flex-shrink-0 -mt-16"
              variants={itemVariants}
            >
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                {artistProfile?.avatar_url ? (
                  <AvatarImage src={artistProfile.avatar_url} alt={artistProfile.full_name || "Artist"} />
                ) : (
                  <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
                    {getInitials(artistProfile?.full_name || "Nail Artist")}
                  </AvatarFallback>
                )}
              </Avatar>
            </motion.div>
            
            <div className="flex-grow">
              <motion.div 
                className="flex justify-between items-start"
                variants={itemVariants}
              >
                <div>
                  <h2 className="text-xl font-serif font-semibold">
                    {artistProfile?.full_name || "Nail Artist"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {artistProfile?.specialty || (
                      <span className="text-gray-400 italic">Add your specialty to complete your profile</span>
                    )}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="flex items-center gap-1 hover:bg-purple-50"
                >
                  <Link to="/profile/edit">
                    <Edit3 className="h-3 w-3" /> Edit Profile
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-4"
                variants={itemVariants}
              >
                <p className="text-gray-700 text-sm">
                  {artistProfile?.bio || (
                    <span className="text-gray-400 italic">No bio added yet. Click Edit Profile to add one!</span>
                  )}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  {artistProfile?.instagram && (
                    <motion.a 
                      href={`https://instagram.com/${artistProfile.instagram.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      variants={itemVariants}
                    >
                      <Instagram className="h-4 w-4" />
                      @{artistProfile.instagram.replace('@', '')}
                    </motion.a>
                  )}
                  
                  {artistProfile?.website && (
                    <motion.a 
                      href={artistProfile.website.startsWith('http') ? artistProfile.website : `https://${artistProfile.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      variants={itemVariants}
                    >
                      <Globe className="h-4 w-4" />
                      {artistProfile.website.replace(/^https?:\/\//, '')}
                    </motion.a>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="mt-4"
                variants={itemVariants}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm text-gray-500">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                
                {completionPercentage < 100 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Complete your profile to attract more clients!
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default ArtistProfile;
