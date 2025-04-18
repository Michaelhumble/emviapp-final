import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";
import { UserRole } from "@/context/auth/types";
import { useState } from "react";

interface WelcomeHeroProps {
  userRole?: UserRole;
  onContinue: () => void;
  onSkip: () => void;
}

const WelcomeHero = ({ 
  userRole = 'customer',
  onContinue,
  onSkip
}: WelcomeHeroProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const getRoleDisplayName = () => {
    switch(userRole) {
      case 'artist':
        return "Beauty Professional";
      case 'nail technician/artist':
        return "Nail Technician/Artist";
      case 'owner':
        return "Salon Owner";
      case 'renter':
        return "Booth Renter";
      case 'supplier':
        return "Supplier";
      case 'beauty supplier':
        return "Beauty Supplier";
      case 'freelancer':
        return "Freelancer";
      case 'salon':
        return "Salon Business";
      case 'customer':
        return "Beauty Enthusiast";
      default:
        return "EmviApp User";
    }
  };

  const getWelcomeMessage = () => {
    switch(userRole) {
      case 'artist':
      case 'nail technician/artist':
        return "Your artistic journey starts here. Find amazing opportunities and showcase your talent.";
      case 'owner':
      case 'salon':
        return "Grow your salon business with powerful tools designed for success.";
      case 'renter':
        return "Maximize your booth rental income and build your client base with EmviApp.";
      case 'supplier':
      case 'beauty supplier':
        return "Connect with salons and professionals looking for quality products like yours.";
      case 'freelancer':
        return "Build your independent career with tools designed for success on your own terms.";
      case 'customer':
        return "Discover talented professionals and amazing salons for your beauty needs.";
      default:
        return "Explore a world of beauty connections and opportunities.";
    }
  };

  const getWelcomeImage = () => {
    switch(userRole) {
      case 'artist':
      case 'nail technician/artist':
        return "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png";
      case 'renter':
        return "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png";
      case 'owner':
      case 'salon':
        return "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png";
      case 'supplier':
      case 'beauty supplier':
        return "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png";
      case 'freelancer':
        return "/lovable-uploads/1763ca30-ecb0-409f-8bb0-11b851ea743f.png";
      case 'customer':
        return "/lovable-uploads/f6bb9656-c400-4f28-ba97-69d71c651a97.png";
      default:
        return "/lovable-uploads/8c7d4688-5f67-42e1-952b-1e4eb4bd4679.png";
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center relative"
      >
        <button 
          onClick={handleClose}
          aria-label="Close welcome message" 
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-full"
        >
          <X className="h-6 w-6" />
        </button>

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
