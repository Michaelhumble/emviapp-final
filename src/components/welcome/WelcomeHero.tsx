
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeHeroProps {
  userRole?: 'artist' | 'owner' | 'renter' | 'supplier' | 'customer' | null;
  onContinue: () => void;
  onSkip: () => void;
}

const WelcomeHero = ({ 
  userRole = 'customer',
  onContinue,
  onSkip
}: WelcomeHeroProps) => {
  // Get role display name
  const getRoleDisplayName = () => {
    switch(userRole) {
      case 'artist':
        return "Beauty Professional";
      case 'owner':
        return "Salon Owner";
      case 'renter':
        return "Booth Renter";
      case 'supplier':
        return "Supplier";
      case 'customer':
        return "Beauty Enthusiast";
      default:
        return "EmviApp User";
    }
  };

  // Get role-specific welcome message
  const getWelcomeMessage = () => {
    switch(userRole) {
      case 'artist':
        return "Your artistic journey starts here. Find amazing opportunities and showcase your talent.";
      case 'owner':
        return "Grow your salon business with powerful tools designed for success.";
      case 'renter':
        return "Maximize your booth rental income and build your client base with EmviApp.";
      case 'supplier':
        return "Connect with salons and professionals looking for quality products like yours.";
      case 'customer':
        return "Discover talented professionals and amazing salons for your beauty needs.";
      default:
        return "Explore a world of beauty connections and opportunities.";
    }
  };

  // Get role-specific image URL
  const getWelcomeImage = () => {
    switch(userRole) {
      case 'artist':
      case 'renter':
        return "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop";
      case 'owner':
        return "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop";
      case 'supplier':
        return "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop";
    }
  };

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="mb-6">
          <Badge className="px-4 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/30 mb-4">
            {getRoleDisplayName()}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
            Welcome to EmviApp
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            {getWelcomeMessage()}
          </p>
        </div>
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
        >
          <img 
            src={getWelcomeImage()}
            alt="Welcome to EmviApp" 
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            We've built EmviApp just for you
          </h2>
          <p className="text-gray-600 mb-6">
            Our platform is designed to make your experience in the beauty industry more connected, 
            efficient, and rewarding. Let us show you how our AI-powered tools can help you succeed.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onContinue}
              className="font-medium px-6"
            >
              Discover AI Features <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onSkip}
              className="font-medium px-6"
            >
              Skip to Dashboard
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeHero;
