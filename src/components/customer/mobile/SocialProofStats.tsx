
import React, { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";

const SocialProofStats = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    "EmviApp helped me find the perfect nail artist! ⭐⭐⭐⭐⭐",
    "Love the credits system and community feel! 💕",
    "Found my dream salon through EmviApp! Highly recommend! ✨"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-4 w-4 text-red-500" />
          <span className="font-medium text-green-800">
            12,847 happy customers this month
          </span>
          <Star className="h-4 w-4 text-yellow-500" />
        </div>
        
        <div className="bg-white/60 rounded-lg p-2 min-h-[40px] flex items-center justify-center">
          <p className="text-xs text-green-700 italic text-center transition-opacity duration-500">
            "{testimonials[currentTestimonial]}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofStats;
