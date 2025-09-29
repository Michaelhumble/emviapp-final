import React, { useState, useEffect } from 'react';
import { Clock, Users } from 'lucide-react';

export const UrgencyTimer: React.FC = () => {
  const [spotsLeft, setSpotsLeft] = useState(8);
  const [viewingNow, setViewingNow] = useState(23);

  useEffect(() => {
    // Simulate spots filling up
    const spotTimer = setInterval(() => {
      setSpotsLeft(prev => {
        const newValue = prev - 1;
        return newValue < 3 ? 8 : newValue; // Reset if too low
      });
    }, 45000); // Change every 45 seconds

    // Simulate viewers changing
    const viewerTimer = setInterval(() => {
      setViewingNow(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newValue = prev + change;
        return Math.max(15, Math.min(35, newValue)); // Keep between 15-35
      });
    }, 8000); // Change every 8 seconds

    return () => {
      clearInterval(spotTimer);
      clearInterval(viewerTimer);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl shadow-sm">
        <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
          <Clock className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
          <div className="text-2xl font-black text-orange-600">{spotsLeft} Spots Left</div>
          <div className="text-sm text-orange-700 font-medium">Free listings this month</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-sm">
        <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="text-left">
          <div className="text-2xl font-black text-green-600">{viewingNow} Viewing Now</div>
          <div className="text-sm text-green-700 font-medium">Active salon owners</div>
        </div>
      </div>
    </div>
  );
};
