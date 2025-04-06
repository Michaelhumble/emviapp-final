
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/types/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, MapPin, Instagram, Globe, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ArtistDashboardHeaderProps {
  profile: UserProfile | null;
}

const ArtistDashboardHeader = ({ profile }: ArtistDashboardHeaderProps) => {
  // Default cover image if none provided
  const coverImage = "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png";
  
  // Get initials for avatar fallback
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
      <Card className="overflow-hidden shadow-md border-0">
        {/* Cover Photo */}
        <div className="h-48 md:h-64 w-full relative">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500" 
            style={{
              backgroundImage: `url(${coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="absolute bottom-4 right-4">
            <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md hover:bg-white/30">
              <Pencil className="h-4 w-4 mr-1" />
              Edit Cover
            </Button>
          </div>
        </div>
        
        {/* Profile Info Section */}
        <div className="px-6 pb-6 pt-16 md:pt-6 relative">
          {/* Avatar - positioned to overflow on mobile, side by side on desktop */}
          <div className="absolute -top-12 left-6 md:relative md:top-0 md:left-0 md:float-left md:mr-6 md:-mt-20">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'Artist'} />
              <AvatarFallback className="text-2xl bg-purple-100 text-purple-700">{getInitials()}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="md:flex md:justify-between md:items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-1">
                {profile?.full_name || 'Your Name'}
              </h1>
              
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
                  <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer" 
                    className="flex items-center hover:text-purple-600 transition-colors">
                    <Instagram className="h-4 w-4 mr-1 text-purple-500" />
                    @{profile.instagram}
                  </a>
                )}
                
                {profile?.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center hover:text-purple-600 transition-colors">
                    <Globe className="h-4 w-4 mr-1 text-purple-500" />
                    Website
                  </a>
                )}
              </div>
              
              <p className="text-gray-700 line-clamp-3 mb-4">
                {profile?.bio || 'Add your bio to tell potential clients about your skills, experience, and style.'}
              </p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button asChild>
                <Link to="/profile/edit">Edit Profile</Link>
              </Button>
              <Button variant="outline">
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
