
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Sparkles, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/auth";

interface ArtistWelcomeBannerProps {
  isProfileTrending?: boolean;
}

const motivationalQuotes = [
  {
    quote: "Your artistic journey is unique — embrace every step of it.",
    author: "EmviApp Team"
  },
  {
    quote: "The artist is nothing without the gift, but the gift is nothing without work.",
    author: "Émile Zola"
  },
  {
    quote: "Creativity takes courage.",
    author: "Henri Matisse"
  },
  {
    quote: "Art enables us to find ourselves and lose ourselves at the same time.",
    author: "Thomas Merton"
  },
  {
    quote: "Every artist was first an amateur.",
    author: "Ralph Waldo Emerson"
  },
  {
    quote: "Your talent deserves to be seen.",
    author: "EmviApp Team"
  }
];

const ArtistWelcomeBanner = ({ isProfileTrending = false }: ArtistWelcomeBannerProps) => {
  const { userProfile } = useAuth();
  const [quote, setQuote] = useState(motivationalQuotes[0]);
  
  // Rotate quotes every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setQuote(motivationalQuotes[randomIndex]);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="text-white">
              <h1 className="text-2xl font-bold mb-2 flex items-center">
                Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Artist'}
                {isProfileTrending && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </motion.div>
                )}
              </h1>
              
              <motion.p
                key={quote.quote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-white/90 max-w-xl italic"
              >
                "{quote.quote}"
                <span className="block text-xs mt-1 text-white/70">— {quote.author}</span>
              </motion.p>
            </div>
            
            <motion.div
              className="mt-4 sm:mt-0 flex-shrink-0 bg-white/10 rounded-lg p-3 backdrop-blur-sm"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-white text-center">
                <div className="flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-amber-300 mr-2" />
                  <span className="font-medium">Today's Goal</span>
                </div>
                <p className="text-sm mt-1 text-white/80">Share 1 portfolio piece</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistWelcomeBanner;
