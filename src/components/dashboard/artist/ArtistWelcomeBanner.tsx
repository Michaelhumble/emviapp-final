
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface ArtistWelcomeBannerProps {
  isProfileTrending?: boolean;
  customMessage?: string;
}

const ArtistWelcomeBanner = ({ isProfileTrending = false, customMessage }: ArtistWelcomeBannerProps) => {
  const { userProfile } = useAuth();
  
  const getRandomMotivationalQuote = () => {
    const quotes = [
      "Your art speaks when words cannot.",
      "Beauty professionals don't just change looks, they change lives.",
      "Your creativity is your superpower.",
      "Each client is a new canvas for your art.",
      "Today is your opportunity to build the tomorrow you want.",
    ];
    return customMessage || quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="border-purple-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600"></div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-purple-800 flex items-center">
                Welcome, {userProfile?.full_name || "Artist"}!
                <Sparkles className="ml-2 h-5 w-5 text-amber-400" />
              </h1>
              
              <p className="text-gray-600 mt-2 max-w-2xl">{getRandomMotivationalQuote()}</p>
            </div>
            
            {isProfileTrending && (
              <div className="bg-amber-50 border border-amber-200 rounded-full px-3 py-1 flex items-center text-amber-700 font-medium text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-amber-500" />
                Trending Profile
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistWelcomeBanner;
