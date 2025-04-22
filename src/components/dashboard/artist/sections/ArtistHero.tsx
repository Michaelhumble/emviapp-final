
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Link, Edit } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useArtistData } from '../context/ArtistDataContext';

const ArtistHero = () => {
  const { artistProfile } = useArtistData() || {};

  const {
    full_name = "Artist Name",
    specialty = "Nail Artist",
    avatar_url = "",
    instagram,
    website,
  } = artistProfile || {};

  // Function to get initials from name (for fallback)
  const getInitials = (name?: string) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'A';

  return (
    <section>
      <Card className="overflow-hidden border-0 shadow-none bg-white">
        {/* Soft gradient header */}
        <div className="relative h-36 md:h-48 w-full flex items-end justify-center bg-gradient-to-r from-[#E5DEFF] via-[#fff] to-[#9b87f5]">
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(112deg, #E5DEFF 0%, #fff 62%, #9b87f5 100%)'
          }} />
          {/* Avatar centered below gradient */}
          <div className="relative z-10 -mb-12 md:-mb-16 flex flex-col items-center">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg bg-emvi-offwhite">
              <AvatarImage src={avatar_url} alt={full_name} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-300 text-[#7E69AB] font-playfair text-2xl md:text-3xl">
                {getInitials(full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* Edit button in top-right */}
          <Button
            size="sm"
            variant="secondary"
            asChild
            className="absolute right-4 top-4 bg-white/80 hover:bg-white/90 text-emvi-accent font-medium flex items-center gap-2 shadow transition"
            aria-label="Edit Profile"
          >
            <RouterLink to="/profile/edit">
              <Edit className="h-4 w-4 mr-1 text-emvi-accent" />
              Edit Profile
            </RouterLink>
          </Button>
        </div>
        {/* Info block under avatar */}
        <div className="flex flex-col items-center justify-center px-4 md:px-8 pt-16 md:pt-20 pb-8 space-y-2">
          <h1 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1A1F2C] text-center tracking-tight">
            {full_name}
          </h1>
          <p className="text-md md:text-lg text-[#7E69AB] font-medium text-center">{specialty}</p>
          {(instagram || website) && (
            <div className="flex gap-4 mt-1">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#9b87f5] font-medium hover:underline transition"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 mr-1" />@{instagram.replace('@', '')}
                </a>
              )}
              {website && (
                <a
                  href={
                    website.startsWith('http')
                      ? website
                      : `https://${website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#7E69AB] font-medium hover:underline transition"
                  aria-label="Website"
                >
                  <Link className="h-4 w-4 mr-1" />Website
                </a>
              )}
            </div>
          )}
        </div>
        {/* Motivational tagline */}
        <div className="w-full flex justify-center mb-4">
          <span className="italic text-[#222] text-sm md:text-base font-playfair text-center opacity-90">
            "Your artistry is the heart of EmviApp."
          </span>
        </div>
      </Card>
    </section>
  );
};

export default ArtistHero;
