
import { Card } from "@/components/ui/card";
import { UserProfile as AuthUserProfile } from "@/context/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, MapPin, Instagram, Globe, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ArtistDashboardHeaderProps {
  profile: AuthUserProfile | null;
}

const ArtistDashboardHeader = ({ profile }: ArtistDashboardHeaderProps) => {
  const coverImage = "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png";
  
  const getInitials = () => {
    if (!profile?.full_name) return "AR";
    return profile.full_name
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden shadow-md border-0 rounded-xl">
        {/* Cover Photo with Overlay */}
        <div className="h-48 md:h-56 w-full relative">
          <div className="absolute inset-0 overflow-hidden">
            <ImageWithFallback 
              src={coverImage}
              alt="Profile cover"
              className="w-full h-full object-cover filter blur-sm transform scale-105"
              fallbackImage="https://emvi.app/images/fallback-profile.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          </div>
          
          {/* Cover Content */}
          <div className="relative h-full flex flex-col justify-end p-6 text-white">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
              {profile?.full_name || 'Your Name'}
            </h1>
            {profile?.specialty && (
              <p className="text-lg font-medium drop-shadow-md">
                {profile.specialty}
              </p>
            )}
          </div>

          <div className="absolute bottom-4 right-4">
            <Button 
              size="sm" 
              variant="secondary" 
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300"
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit Cover
            </Button>
          </div>
        </div>
        
        {/* Profile Info Section */}
        <div className="px-6 pb-6 pt-16 md:pt-6 relative">
          {/* Avatar */}
          <div className="absolute -top-12 left-6 md:relative md:top-0 md:left-0 md:float-left md:mr-6 md:-mt-20">
            <Avatar className="h-24 w-24 border-4 border-white shadow-xl rounded-full transition-transform hover:scale-105">
              <AvatarImage 
                src={profile?.avatar_url || ''} 
                alt={profile?.full_name || 'Artist'} 
                className="object-cover"
              />
              <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">
                <ImageWithFallback
                  src={profile?.avatar_url || ''}
                  alt={profile?.full_name || 'Artist'}
                  className="h-full w-full object-cover"
                  fallbackImage="https://emvi.app/images/fallback-profile.jpg"
                />
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="md:flex md:justify-between md:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                {profile?.specialty && (
                  <span className="flex items-center">
                    <Scissors className="h-4 w-4 mr-1 text-purple-500" />
                    {profile.specialty}
                  </span>
                )}
                
                {profile?.location && (
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-purple-500" />
                    {profile.location}
                  </span>
                )}
                
                {profile?.instagram && (
                  <a 
                    href={`https://instagram.com/${profile.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center hover:text-purple-600 transition-colors"
                  >
                    <Instagram className="h-4 w-4 mr-1 text-purple-500" />
                    @{profile.instagram}
                  </a>
                )}
                
                {profile?.website && (
                  <a 
                    href={profile.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-purple-600 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-1 text-purple-500" />
                    Website
                  </a>
                )}
              </div>
              
              <p className="text-gray-700 line-clamp-3 mb-4 font-sans">
                {profile?.bio || 'Add your bio to tell potential clients about your skills, experience, and style.'}
              </p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button 
                variant="default"
                className="shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to="/profile/edit">Edit Profile</Link>
              </Button>
              <Button 
                variant="outline"
                className="hover:bg-gray-50 transition-all duration-300"
                asChild
              >
                <Link to={`/profile/${profile?.id || ''}`}>View Public Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistDashboardHeader;
