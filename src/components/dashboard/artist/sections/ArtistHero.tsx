
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Link, Edit } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useArtistData } from "../context/ArtistDataContext";

// Gradient/background classes for premium feel
const HEADER_BG =
  "bg-gradient-to-r from-[#FDFDFD] via-[#F7E6FF] to-[#E0CCFF]";
const CARD_SHADOW = "shadow-[0_10px_32px_0_rgba(155,135,245,0.10)]";

const ArtistHero: React.FC = () => {
  const { artistProfile } = useArtistData() || {};

  const {
    full_name = "Michael Nguyen",
    specialty = "Nail Design",
    bio = '“Your artistry is your brand. Let\'s grow it.”',
    avatar_url = "",
    instagram,
    website,
  } = artistProfile || {};

  // Helper for Initials fallback
  const getInitials = (name?: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "A";

  return (
    <section className="w-full mb-8">
      <div
        className={`
          relative max-w-2xl mx-auto px-4
          ${HEADER_BG} ${CARD_SHADOW}
          rounded-[2.2rem] md:rounded-3xl
          flex flex-col items-center
          pt-7 pb-7 md:pt-10 md:pb-9
          min-h-[385px]
          transition-all duration-300
        `}
      >
        {/* Floating Edit Button */}
        <Button
          asChild
          size="sm"
          className="
            absolute top-5 right-5 z-10
            bg-emvi-offwhite/90 rounded-full
            px-4 py-2 md:py-2 flex items-center gap-1 md:gap-2
            shadow-md border-0
            text-emvi-dark font-semibold
            hover:scale-105 hover:bg-emvi-accent/10 transition
            focus-visible:ring-2 focus-visible:ring-emvi-accent
            md:text-base text-sm
          "
        >
          <RouterLink to="/profile/edit" aria-label="Edit Profile">
            <Edit className="h-5 w-5 md:mr-2 text-emvi-accent" />
            <span className="hidden md:inline-block">Edit Profile</span>
          </RouterLink>
        </Button>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="mb-6 mt-2">
            <Avatar className="w-28 h-28 border-4 border-white mx-auto shadow-lg bg-gradient-to-br from-emvi-offwhite to-purple-50">
              <AvatarImage
                src={avatar_url}
                alt={full_name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-purple-50 to-purple-100 text-[#7E69AB] font-playfair text-4xl">
                {getInitials(full_name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Artist Name */}
          <h1 className="font-playfair text-2xl font-bold text-emvi-dark tracking-tight text-center leading-tight mb-1">
            {full_name}
          </h1>

          {/* Specialty */}
          <span className="mt-1 text-base text-[#7e71b4] font-inter font-medium text-center">
            {specialty}
          </span>

          {/* Bio or Motivational Quote */}
          <p className="italic font-inter text-sm text-[#7d7a99] mt-2 text-center max-w-lg">
            {bio}
          </p>

          {/* Social links */}
          {(instagram || website) && (
            <div className="flex flex-row items-center justify-center gap-4 mt-5">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-full transition text-[#c9c2e0] hover:text-emvi-accent hover:bg-emvi-offwhite/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emvi-accent"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {website && (
                <a
                  href={
                    website.startsWith("http") ? website : `https://${website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-full transition text-[#c9c2e0] hover:text-emvi-accent hover:bg-emvi-offwhite/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emvi-accent"
                  aria-label="Website"
                >
                  <Link className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistHero;
