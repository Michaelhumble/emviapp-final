
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Type for welcome banner messages
interface WelcomeBannerMessage {
  id: number;
  text: string;
}

interface ArtistWelcomeBannerProps {
  firstName: string;
}

const ArtistWelcomeBanner = ({ firstName }: ArtistWelcomeBannerProps) => {
  const [activeMessage, setActiveMessage] = useState(0);
  
  // Motivational messages for the welcome banner
  const welcomeMessages: WelcomeBannerMessage[] = [
    { id: 1, text: "Behind every beautiful nail set is a dream. Let's build yours." },
    { id: 2, text: "You're not alone. EmviApp is your business partner." },
    { id: 3, text: "The hustle is real—but you've got support now." }
  ];
  
  // Rotate welcome messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessage(prev => (prev + 1) % welcomeMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [welcomeMessages.length]);
  
  return (
    <section className="mb-8">
      <Card className="border-none bg-gradient-to-r from-purple-50 to-indigo-50 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-purple-900">
                Welcome back, {firstName}!
              </h1>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={activeMessage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.5 }}
                  className="text-purple-700 mt-2"
                >
                  {welcomeMessages[activeMessage].text}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-purple-700">
                <Clock className="h-4 w-4 inline mr-1" /> 
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistWelcomeBanner;
