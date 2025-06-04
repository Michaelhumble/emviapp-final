
import React, { useState, useEffect } from "react";
import { Heart, Star, Users, Sparkles } from "lucide-react";

const SocialProofStats = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "EmviApp helped me find the perfect nail artist! Amazing service! 💅",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "I love earning credits while booking my beauty appointments! 🎉",
      author: "Jessica K.",
      rating: 5
    },
    {
      text: "The referral system is amazing - I've earned so many credits! ✨",
      author: "Maria L.",
      rating: 5
    },
    {
      text: "Found my go-to salon through EmviApp. Highly recommend! 💖",
      author: "Ashley D.",
      rating: 5
    },
    {
      text: "The app makes booking appointments so easy and rewarding! 🌟",
      author: "Taylor W.",
      rating: 5
    }
  ];

  const stats = {
    happyCustomers: "12,847",
    completedBookings: "45,293",
    creditsEarned: "892,156"
  };

  // Rotate testimonials every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
      {/* Main Stats */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-1 mb-2">
          <Heart className="h-4 w-4 text-rose-500" />
          <h4 className="font-semibold text-gray-900 text-sm">Community Love</h4>
          <Heart className="h-4 w-4 text-rose-500" />
        </div>
        
        <div className="bg-white/60 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Users className="h-5 w-5 text-rose-500" />
            <span className="text-lg font-bold text-gray-800">{stats.happyCustomers}</span>
          </div>
          <p className="text-xs text-gray-600">happy customers this month</p>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/40 rounded-lg p-2">
            <div className="text-sm font-semibold text-gray-800">{stats.completedBookings}</div>
            <div className="text-xs text-gray-600">Bookings</div>
          </div>
          <div className="bg-white/40 rounded-lg p-2">
            <div className="text-sm font-semibold text-gray-800">{stats.creditsEarned}</div>
            <div className="text-xs text-gray-600">Credits Earned</div>
          </div>
        </div>
      </div>

      {/* Rotating Testimonial */}
      <div className="bg-white/70 rounded-lg p-3 min-h-[80px] relative overflow-hidden">
        <div className="flex items-center space-x-1 mb-2">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          <span className="text-xs font-medium text-gray-700">Customer Love</span>
          <div className="flex space-x-1 ml-auto">
            {[...Array(currentTestimonialData.rating)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        
        <div 
          key={currentTestimonial} 
          className="animate-fade-in"
        >
          <p className="text-xs text-gray-700 leading-relaxed mb-2">
            "{currentTestimonialData.text}"
          </p>
          <p className="text-xs font-medium text-gray-600">
            - {currentTestimonialData.author}
          </p>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-1 mt-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-rose-400' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-3">
        <p className="text-xs text-gray-500">
          Join thousands of happy beauty lovers! 💕
        </p>
      </div>
    </div>
  );
};

export default SocialProofStats;
