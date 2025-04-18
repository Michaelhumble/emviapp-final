
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { UserRole } from "@/context/auth/types";
import { useState } from "react";
import { WelcomeHeader } from "./components/WelcomeHeader";
import { WelcomeContent } from "./components/WelcomeContent";

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

        <WelcomeHeader userRole={userRole} />
        <WelcomeContent 
          userRole={userRole}
          onContinue={onContinue}
          onSkip={onSkip}
        />
      </motion.div>
    </div>
  );
};

export default WelcomeHero;
