
import React from "react";
import { motion } from "framer-motion";

const ArtistProfileLoading: React.FC = () => {
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <motion.div 
        className="animate-pulse space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="rounded-full bg-gray-200 h-32 w-32"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        <div className="h-2 bg-gray-200 rounded"></div>
        
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-square bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistProfileLoading;
