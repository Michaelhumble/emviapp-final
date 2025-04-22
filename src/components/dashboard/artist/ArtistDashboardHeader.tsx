
import { Card } from "@/components/ui/card";
import { UserProfile as AuthUserProfile } from "@/context/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Instagram, Globe, Pencil, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ArtistDashboardHeaderProps {
  profile: AuthUserProfile | null;
}

const ArtistDashboardHeader = ({ profile }: ArtistDashboardHeaderProps) => {
  const coverImage = "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden shadow-sm border-0 rounded-xl bg-white">
        {/* Reduced height gradient banner (20% reduction applied) */}
        <div className="h-28 md:h-36 w-full relative">
          <div className="absolute inset-0 overflow-hidden">
            <ImageWithFallback 
              src={coverImage}
              alt="Profile cover"
              className="w-full h-full object-cover"
              fallbackImage="https://emvi.app/images/fallback-profile.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20 backdrop-blur-[1px]" />
          </div>
          
          {/* Edit Cover Button */}
          <Button 
            size="sm" 
            variant="secondary" 
            className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white/90 transition-all duration-300"
          >
            <Pencil className="h-4 w-4 mr-1.5" />
            Edit Cover
          </Button>
        </div>
        
        {/* Profile Content Section - Improved alignment and padding */}
        <div className="px-6 pb-6 pt-16 md:pt-6 relative flex flex-col items-center md:items-start">
          {/* Avatar with enhanced premium styling */}
          <div className="absolute -top-12 left-6 md:relative md:top-0 md:left-0 md:float-left md:mr-6 md:-mt-16">
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-xl rounded-full transition-transform duration-200 hover:scale-[1.02]">
              <AvatarImage 
                src={profile?.avatar_url || ''} 
                alt={profile?.full_name || 'Artist'} 
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700">
                {profile?.full_name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
          </div>
          
          {/* Profile Information - Better aligned */}
          <div className="md:flex md:justify-between md:items-start w-full">
            <div className="space-y-3 w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-medium text-gray-900">
                    {profile?.full_name || 'Your Name'}
                  </h1>
                  <p className="text-gray-600 mt-0.5">
                    {profile?.specialty || 'Nail Artist'}
                  </p>
                </div>
                
                {/* Edit Profile Button - Repositioned to top-right */}
                <div className="hidden md:flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-gray-700 border-gray-200 hover:bg-gray-50 transition-colors rounded-lg"
                    asChild
                  >
                    <Link to="/profile/edit">
                      <Pencil className="h-4 w-4 mr-1.5" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Location and Social Links */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {profile?.location && (
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
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
                    <Instagram className="h-4 w-4 mr-1.5 text-gray-400" />
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
                    <Globe className="h-4 w-4 mr-1.5 text-gray-400" />
                    Website
                  </a>
                )}
              </div>
              
              {/* Bio Section */}
              <p className="text-gray-600 text-sm max-w-2xl leading-relaxed">
                {profile?.bio || 'Add your bio to tell potential clients about your experience and style.'}
              </p>
              
              {/* Elegant Tip Message - As requested */}
              <p className="text-sm text-[#999] italic font-light text-center md:text-left mt-2">
                Tip: Complete your profile to attract more clients.
              </p>
              
              {/* Action Buttons - For mobile and repositioned */}
              <div className="flex md:hidden justify-end items-center gap-3 mt-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-gray-700 border-gray-200 hover:bg-gray-50 transition-colors rounded-lg"
                  asChild
                >
                  <Link to="/profile/edit">
                    <Pencil className="h-4 w-4 mr-1.5" />
                    Edit Profile
                  </Link>
                </Button>
              </div>
              
              <div className="flex justify-end items-center gap-3">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:bg-gray-50 transition-colors"
                  asChild
                >
                  <Link to={`/profile/${profile?.id || ''}`}>
                    View Public Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistDashboardHeader;
