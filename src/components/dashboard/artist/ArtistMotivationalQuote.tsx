
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { UserRole } from "@/context/auth/types";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Predefined quotes per role
const ROLE_QUOTES: Record<string, string> = {
  artist: "You've worked hard to build your craft. Now let EmviApp help you get seen. Boost your profile and let your art shine.",
  freelancer: "You wear many hats. EmviApp is the one partner that gets it. We've got your back.",
  salon: "Running a business is hard — finding great talent shouldn't be. EmviApp was built to make hiring easy, fast, and beautiful.",
  supplier: "Your products. Their salons. EmviApp makes the connection effortless. Get your business in front of verified professionals.",
  other: "Whatever your dream looks like — you belong here. EmviApp was made for you.",
  "nail technician/artist": "Your artistic talents deserve to be seen. Let EmviApp connect you with clients who appreciate your craft.",
  renter: "Independence with support. EmviApp helps you build your clientele while maintaining your freedom.",
  owner: "Your salon deserves the best talent. EmviApp connects you with professionals who match your vision.",
  customer: "Beauty services tailored to you. EmviApp helps you discover professionals who match your style.",
  vendor: "Quality products need visibility. EmviApp connects you with the professionals who need what you offer.",
  "beauty supplier": "Bridge the gap between your products and salon professionals with EmviApp's targeted connections."
};

// Default quote for fallback
const DEFAULT_QUOTE = "Whatever your dream looks like — you belong here. EmviApp was made for you.";

const ArtistMotivationalQuote = () => {
  const { userRole } = useAuth();
  const [quote, setQuote] = useState<string>("");
  
  useEffect(() => {
    // Get quote based on role, or use default if not found
    const roleKey = userRole || "other";
    const motivationalQuote = ROLE_QUOTES[roleKey] || DEFAULT_QUOTE;
    
    setQuote(motivationalQuote);
  }, [userRole]);

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="bg-white shadow-md border border-gray-100 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-bl-full opacity-40"></div>
        
        <div className="flex items-start gap-4">
          <Sparkles className="h-6 w-6 text-purple-500 mt-1 flex-shrink-0" />
          
          <div>
            <h3 className="text-lg font-serif font-medium mb-2">
              Your Personal Emvi Insight
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {quote}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistMotivationalQuote;
