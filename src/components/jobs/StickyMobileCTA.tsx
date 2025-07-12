import React, { useState, useEffect } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show after scrolling down a bit
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Trigger animation every few seconds
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className={`bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-2xl border border-purple-500/20 backdrop-blur-sm overflow-hidden ${isAnimating ? 'animate-bounce' : ''}`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 animate-pulse"></div>
        
        <div className="relative p-4">
          <div className="flex items-center justify-between gap-3">
            {/* Post Job Button */}
            <button
              onClick={() => navigate('/post-job')}
              className="flex-1 bg-white/95 hover:bg-white text-purple-600 font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Post Job</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            </button>

            {/* Find Jobs Button */}
            <button
              onClick={() => {
                const jobsSection = document.querySelector('#jobs-section');
                if (jobsSection) {
                  jobsSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigate('/jobs');
                }
              }}
              className="flex-1 bg-purple-800/80 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 border border-white/20"
            >
              <Search className="w-5 h-5" />
              <span>Find Jobs</span>
            </button>
          </div>

          {/* Micro-animation elements */}
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 blur-xl -z-10"></div>
      </div>

      {/* Optional: Floating notification badge */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          🔥 23 new jobs today
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCTA;