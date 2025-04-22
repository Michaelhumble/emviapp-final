import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Link as LinkIcon, Edit } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useArtistData } from "../context/ArtistDataContext";

const ArtistHero: React.FC = () => {
  const { artistProfile } = useArtistData() || {};

  const {
    full_name = "Michael Nguyen",
    specialty = "Nail Design",
    bio = '"Your artistry is your brand. Let\'s grow it."',
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
      <div className="relative max-w-2xl mx-auto overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFDFD] via-[#F7E6FF] to-[#E0CCFF] rounded-[2.2rem] shadow-[0_10px_32px_0_rgba(155,135,245,0.10)]" />

        {/* Content Container */}
        <div className="relative px-6 pt-12 pb-8 md:pt-14 md:pb-10 flex flex-col items-center">
          {/* Floating Edit Button */}
          <Button
            asChild
            size="sm"
            className="absolute top-5 right-5 z-10 
              bg-white/90 hover:bg-white hover:shadow-md
              rounded-full px-4 py-2 text-sm md:text-base
              text-emvi-dark font-medium flex items-center gap-1.5 
              transition-all duration-200 hover:scale-105
              border-0 shadow-sm"
          >
            <RouterLink to="/profile/edit" aria-label="Edit Profile">
              <Edit className="h-4 w-4 md:h-5 md:w-5 text-emvi-accent" />
              <span className="hidden md:inline ml-1">Edit Profile</span>
            </RouterLink>
          </Button>

          {/* Avatar */}
          <div className="mb-5">
            <Avatar className="w-28 h-28 border-4 border-white shadow-lg bg-gradient-to-br from-purple-50 to-white">
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
          <h1 className="font-playfair text-2xl font-bold text-emvi-dark tracking-tight text-center mb-1">
            {full_name}
          </h1>

          {/* Specialty */}
          <span className="font-inter text-base text-[#7e71b4] font-medium">
            {specialty}
          </span>

          {/* Bio or Motivational Quote */}
          <p className="italic font-inter text-sm text-[#7d7a99] mt-2.5 text-center max-w-md">
            {bio}
          </p>

          {/* Social links */}
          {(instagram || website) && (
            <div className="flex items-center justify-center gap-5 mt-5">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#a79cc0] hover:text-emvi-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="text-sm">
                    {instagram.startsWith("@") ? instagram : `@${instagram}`}
                  </span>
                </a>
              )}
              {website && (
                <a
                  href={
                    website.startsWith("http") ? website : `https://${website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#a79cc0] hover:text-emvi-accent transition-colors"
                  aria-label="Website"
                >
                  <LinkIcon className="h-5 w-5" />
                  <span className="text-sm">Website</span>
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
