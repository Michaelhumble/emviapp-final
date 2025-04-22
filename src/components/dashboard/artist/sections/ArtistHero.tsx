
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Link, Edit } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useArtistData } from '../context/ArtistDataContext';

// Refined luxury gradient background
const HEADER_BG = "bg-gradient-to-r from-[#9b87f5]/60 via-[#d1c3ff]/70 to-[#F7F5FE]/80";
const CARD_SHADOW = "shadow-[0_8px_28px_0_rgba(155,135,245,0.12)]";

const ArtistHero: React.FC = () => {
  const { artistProfile } = useArtistData() || {};

  const {
    full_name = "Artist Name",
    specialty = "Nail Artist",
    avatar_url = "",
    instagram,
    website,
  } = artistProfile || {};

  // Helper for Initials fallback
  const getInitials = (name?: string) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : 'A';

  return (
    <section className="mb-6">
      <Card
        className={`
          ${HEADER_BG} ${CARD_SHADOW}
          border-0 rounded-3xl overflow-hidden
          flex flex-col items-center
          py-8 px-4 md:px-6
          transition-all duration-300
        `}
      >
        {/* Centered avatar block */}
        <div className="flex flex-col items-center w-full">
          <div className="relative mb-5">
            <div
              className="
                rounded-full
                bg-white
                border-4 border-white
                shadow-lg
                p-1.5
                transition
                hover:shadow-xl
              "
            >
              <Avatar className="h-28 w-28 md:h-36 md:w-36 bg-gradient-to-br from-purple-50 to-purple-100">
                <AvatarImage
                  src={avatar_url}
                  alt={full_name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-purple-200 text-[#7E69AB] font-playfair text-3xl md:text-4xl">
                  {getInitials(full_name)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {/* Edit button - floating top right */}
            <Button
              size="sm"
              variant="secondary"
              asChild
              className="
                absolute top-0 right-0 md:-right-2 md:top-1
                rounded-full bg-white/90 backdrop-blur-sm hover:bg-white 
                text-emvi-accent font-medium flex items-center gap-1
                shadow-md transition-all duration-150
                px-3 py-1 h-auto
                ring-1 ring-[#e5deff]/70
                border-0
              "
              aria-label="Edit Profile"
            >
              <RouterLink to="/profile/edit">
                <Edit className="h-3.5 w-3.5 mr-1 text-emvi-accent" />
                <span className="text-sm">Edit Profile</span>
              </RouterLink>
            </Button>
          </div>

          {/* Name & Role */}
          <div className="flex flex-col items-center mb-4">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1F2C] text-center tracking-tight mb-1">
              {full_name}
            </h1>
            <span className="text-sm md:text-base text-[#7E69AB] font-medium text-center block">
              {specialty}
            </span>
          </div>

          {/* Minimalist social icon links */}
          {(instagram || website) && (
            <div className="flex flex-row items-center justify-center gap-4 mb-4">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-2 rounded-full bg-white/80 hover:bg-white hover:shadow-md transition-all text-[#9b87f5]"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
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
                  className="group flex items-center p-2 rounded-full bg-white/80 hover:bg-white hover:shadow-md transition-all text-[#7E69AB]"
                  aria-label="Website"
                >
                  <Link className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          )}

          {/* Motivational tagline */}
          <div className="mt-2">
            <p className="italic font-playfair text-[#444]/70 text-sm md:text-base text-center max-w-sm mx-auto">
              "Your artistry is your brand. Let's grow it."
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ArtistHero;
