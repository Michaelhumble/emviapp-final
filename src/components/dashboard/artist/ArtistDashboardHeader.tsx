
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/context/auth/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Instagram, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ArtistDashboardHeaderProps {
  profile: UserProfile | null;
}

const ArtistDashboardHeader = ({ profile }: ArtistDashboardHeaderProps) => {
  // Get the first name for personalized welcome message
  const firstName = profile?.full_name?.split(' ')[0] || 'Artist';
  
  // Use a premium gradient cover image
  const coverImage = "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden shadow-sm border-0 rounded-xl bg-white">
        <div className="h-32 md:h-48 w-full relative">
          <div className="absolute inset-0 overflow-hidden">
            <ImageWithFallback 
              src={coverImage}
              alt="Profile cover"
              className="w-full h-full object-cover"
              fallbackImage="https://emvi.app/images/fallback-profile.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 backdrop-blur-[1px]" />
          </div>
          
          {/* Welcome message on cover */}
          <div className="absolute bottom-4 left-6 text-white max-w-2xl hidden md:block">
            <h1 className="text-2xl font-playfair font-medium drop-shadow-sm">
              Welcome back, {firstName} — Your artistry is your power.
            </h1>
            <p className="text-sm text-white/90 mt-1 drop-shadow-sm">
              Let's grow your brand, delight clients, and showcase your talent.
            </p>
          </div>
          
          <Button 
            size="sm" 
            variant="secondary" 
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white/90 transition-all duration-300"
            asChild
          >
            <Link to="/profile/edit">
              <Pencil className="h-4 w-4 mr-1.5" />
              Edit Profile
            </Link>
          </Button>
        </div>
        
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-start gap-6 -mt-12 md:-mt-12">
            <Avatar className="h-24 w-24 rounded-xl ring-4 ring-white shadow-xl">
              <AvatarImage 
                src={profile?.avatar_url || ''} 
                alt={profile?.full_name || 'Artist'} 
                className="object-cover rounded-xl"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 rounded-xl">
                {profile?.full_name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3 flex-1">
              {/* Mobile welcome message */}
              <div className="md:hidden">
                <h1 className="text-xl font-playfair font-medium text-gray-900">
                  Welcome back, {firstName}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Your artistry is your power.
                </p>
              </div>
              
              <h2 className="font-serif text-2xl font-semibold text-gray-900 hidden md:block">
                {profile?.full_name || 'Your Name'}
              </h2>
              
              <p className="text-gray-600">
                {profile?.specialty || 'Nail Artist'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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

              {profile?.bio && (
                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistDashboardHeader;
