
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Link, Edit } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useArtistData } from '../context/ArtistDataContext';

// Soft luxury background gradient using EmviApp palette
const HEADER_BG =
  "bg-gradient-to-br from-[#F7F5FE]/80 via-[#E5DEFF]/75 to-white/90";
const CARD_SHADOW =
  "shadow-[0_8px_32px_0_rgba(155,135,245,0.09)]";

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
    <section>
      <Card
        className={`
          ${HEADER_BG} ${CARD_SHADOW} border-0 rounded-3xl px-0 pb-6 pt-0
          flex flex-col items-center
          transition-all
        `}
        style={{
          overflow: "visible",
        }}
      >
        {/* Centered avatar block */}
        <div className="flex flex-col items-center w-full pt-7 md:pt-12">
          <div className="relative flex justify-center items-center">
            <div
              className="
                rounded-full
                bg-white
                border-4 border-white
                shadow-lg
                transition
                p-2
                "
              style={{
                boxShadow: "0 4px 20px 0 rgba(155,135,245,0.08)"
              }}
            >
              <Avatar className="h-28 w-28 md:h-36 md:w-36 bg-emvi-offwhite border-0">
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
            {/* Edit button absolute on avatar (mobile: below avatar, md+: top right of card) */}
            <div className="absolute right-0 top-0 md:right-[-60px] md:top-2 z-20">
              <Button
                size="sm"
                variant="secondary"
                asChild
                className="
                  rounded-full bg-[#f7f5fe]/70 hover:bg-[#e5deff]/80 text-emvi-accent font-medium flex items-center gap-2 shadow-md transition-all duration-150
                  px-3 py-2
                  ring-1 ring-[#e5deff]/50
                  border-0
                "
                aria-label="Edit Profile"
              >
                <RouterLink to="/profile/edit">
                  <Edit className="h-4 w-4 mr-1 text-emvi-accent" />
                  <span className="sr-only md:not-sr-only">Edit</span>
                  {/* Hide text on mobile for pure icon button */}
                </RouterLink>
              </Button>
            </div>
          </div>

          {/* Name & Role */}
          <div className="flex flex-col items-center mt-5 mb-2">
            <h1 className="font-playfair text-[1.75rem] md:text-3xl font-bold text-[#1A1F2C] text-center tracking-tight leading-none">
              {full_name}
            </h1>
            <span className="text-sm md:text-lg text-[#7E69AB] font-light mt-1 text-center block">
              {specialty}
            </span>
          </div>

          {/* Minimalist icon links under name */}
          {(instagram || website) && (
            <div className="flex flex-row items-center justify-center gap-4 mt-3 mb-3">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-2 rounded-full bg-white/70 hover:bg-[#e5deff]/80 hover:shadow transition text-[#9b87f5]"
                  style={{ minWidth: 40, minHeight: 40 }}
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
                  className="group flex items-center p-2 rounded-full bg-white/70 hover:bg-[#e5deff]/80 hover:shadow transition text-[#7E69AB]"
                  style={{ minWidth: 40, minHeight: 40 }}
                  aria-label="Website"
                >
                  <Link className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          )}

          {/* Motivational tagline */}
          <div className="w-full flex justify-center mt-2">
            <span className="italic font-playfair text-[#444] text-sm md:text-base text-center opacity-60">
              "Your artistry is the heart of EmviApp."
            </span>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default ArtistHero;
