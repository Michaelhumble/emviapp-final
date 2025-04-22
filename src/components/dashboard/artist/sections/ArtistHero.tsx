
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Globe, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useArtistData } from '../context/ArtistDataContext';

const ArtistHero = () => {
  const { artistProfile } = useArtistData();
  
  const { 
    full_name = 'Artist Name',
    specialty = 'Nail Artist',
    avatar_url,
    instagram,
    website
  } = artistProfile || {};
  
  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || 'A';
  };
  
  return (
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
              src={avatar_url} 
              alt={full_name} 
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-200 text-purple-700">
              {getInitials(full_name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3 flex-1">
            <h1 className="font-serif text-2xl font-semibold text-gray-900">
              {full_name}
            </h1>
            
            <p className="text-gray-600">
              {specialty}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {instagram && (
                <a 
                  href={`https://instagram.com/${instagram}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center hover:text-purple-600 transition-colors"
                >
                  <Instagram className="h-4 w-4 mr-1.5 text-gray-400" />
                  @{instagram}
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
              "Your artistry is your signature. Make it unforgettable."
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ArtistHero;
