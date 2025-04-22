
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Globe, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { useArtistData } from "../context/ArtistDataContext";
import { useAuth } from "@/context/auth";

const ArtistHero: React.FC = () => {
  const { artistProfile } = useArtistData() || {};
  const { userProfile } = useAuth();
  
  // Use data from context or fallback to userProfile
  const profile = artistProfile || userProfile || {};
  
  const {
    full_name = "Michael Nguyen",
    specialty = "Nail Design",
    bio = '"Your artistry is your brand. Let\'s grow it."',
    avatar_url = "",
    instagram,
    website,
  } = profile;

  // Helper for Initials fallback
  const getInitials = (name?: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "A";

  // Format Instagram handle
  const formattedInstagram = instagram ? 
    (instagram.startsWith('@') ? instagram : `@${instagram}`) : 
    '@https://instagram.com/humbleinsider';

  return (
    <section className="w-full mb-8">
      <div className="relative rounded-xl overflow-hidden shadow-sm">
        {/* Purple gradient background */}
        <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 relative flex items-center justify-center">
          {/* Edit profile button */}
          <Button 
            asChild
            variant="secondary"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white/95 text-gray-800"
          >
            <Link to="/profile/edit">
              <Pencil className="h-4 w-4 mr-1.5" />
              Edit Profile
            </Link>
          </Button>

          {/* Centered Name */}
          <h1
            className="
              font-playfair font-bold
              text-3xl md:text-5xl
              text-[#1A1A1A]
              text-center
              w-full
              z-10
              select-none
              pointer-events-none
            "
            style={{ letterSpacing: '-0.02em' }}
          >
            {full_name}
          </h1>
        </div>
        
        {/* Content with avatar */}
        <div className="px-6 pb-6 bg-white">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center -mt-14">
            {/* Avatar */}
            <Avatar className="w-28 h-28 border-4 border-white shadow-md">
              <AvatarImage 
                src={avatar_url} 
                alt={full_name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-200 text-purple-700 text-4xl font-semibold">
                {getInitials(full_name)}
              </AvatarFallback>
            </Avatar>
            
            {/* Profile info */}
            <div className="pt-2 sm:pt-0">
              {/* Name moved to gradient header, nothing here */}
              <p className="text-lg text-gray-600 mt-1">{specialty}</p>
              
              {/* Social links */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <a 
                  href={`https://instagram.com/${formattedInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>{formattedInstagram}</span>
                </a>
                
                {website && (
                  <a 
                    href={website.startsWith('http') ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Globe className="h-5 w-5" />
                    <span>Website</span>
                  </a>
                )}
              </div>
              
              {/* Bio */}
              <p className="text-gray-600 font-serif italic text-sm mt-2">
                {bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistHero;
