
import React from 'react';
import { useArtistData } from '../context/ArtistDataContext';
import { motion } from "framer-motion";
import { Instagram, Globe } from "lucide-react";

const ArtistHero = () => {
  const { firstName, specialty, artistProfile } = useArtistData();
  
  // Safely access social media links, providing fallbacks
  const instagram = artistProfile?.instagram || '';
  const website = artistProfile?.website || '';
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-sm border border-purple-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-semibold">
            {firstName ? firstName.charAt(0) : 'A'}
          </div>
          <div>
            <h1 className="text-2xl font-playfair font-semibold text-gray-900">
              Welcome, {firstName || 'Artist'}
            </h1>
            <p className="text-gray-600 mt-1">{specialty || 'Nail Artist'}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {instagram && (
            <a 
              href={`https://instagram.com/${instagram.replace('@', '')}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-purple-100"
            >
              <Instagram className="h-5 w-5 text-pink-500" />
            </a>
          )}
          
          {website && (
            <a 
              href={website.startsWith('http') ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-purple-100"
            >
              <Globe className="h-5 w-5 text-purple-500" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistHero;
