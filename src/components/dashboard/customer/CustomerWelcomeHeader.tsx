
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { Sparkles, Gift, Crown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CustomerWelcomeHeader: React.FC = () => {
  const { userProfile } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSpecialOffer, setShowSpecialOffer] = useState(true);
  
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Beautiful';
  
  // Update time every minute for dynamic greetings
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic greeting based on time and user activity
  const getPersonalizedGreeting = () => {
    const hour = currentTime.getHours();
    const credits = userProfile?.credits || 0;
    
    if (hour < 12) {
      return `Good morning, ${firstName}! ☀️ Ready to start your beauty day?`;
    } else if (hour < 17) {
      return `Good afternoon, ${firstName}! ✨ Time for some self-care magic?`;
    } else {
      return `Good evening, ${firstName}! 🌙 Perfect time to plan your next glow-up!`;
    }
  };

  const getTrendingMessage = () => {
    const messages = [
      "🔥 Chrome nails are trending this week!",
      "✨ Your style inspirations are waiting",
      "💅 3 new artists joined near you today",
      "🌟 Valentine's Day specials are live!",
      "💎 Double rewards weekend starts now!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSpecialOfferClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowSpecialOffer(false);
  };

  return (
    <div className="relative">
      {/* Main Welcome Section */}
      <motion.div 
        className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-rose-500 p-8 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-3 flex items-center gap-3">
              {getPersonalizedGreeting()}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-amber-300" />
              </motion.div>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <p className="text-purple-100 text-lg">{getTrendingMessage()}</p>
            <Badge className="bg-amber-400 text-amber-900 font-semibold px-3 py-1 text-sm">
              <Crown className="h-3 w-3 mr-1" />
              Level 3 Explorer
            </Badge>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2">
              <Gift className="h-4 w-4 text-amber-300" />
              <span className="text-white font-medium">
                {userProfile?.credits || 120} credits
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-pink-300" />
              <span className="text-white font-medium">
                3 bookings this month
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-purple-300" />
              <span className="text-white font-medium">
                Next reward: 23 credits away
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Special Offer Banner */}
      <AnimatePresence>
        {showSpecialOffer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border border-amber-200 rounded-xl p-4 cursor-pointer"
            onClick={handleSpecialOfferClick}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-full p-2">
                  <Gift className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800">
                    🎉 Special Offer: Double Credits Weekend!
                  </p>
                  <p className="text-sm text-amber-700">
                    Book any service this weekend and earn 2x reward credits. Limited time only!
                  </p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold px-3 py-1 animate-pulse">
                2x Credits
              </Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Seasonal Touch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute top-4 right-4 text-2xl"
      >
        {currentTime.getMonth() === 1 ? '💕' : currentTime.getMonth() === 11 ? '❄️' : '✨'}
      </motion.div>
    </div>
  );
};

export default CustomerWelcomeHeader;
