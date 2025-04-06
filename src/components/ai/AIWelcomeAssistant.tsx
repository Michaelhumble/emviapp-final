
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIWelcomeAssistantProps {
  className?: string;
}

const AIWelcomeAssistant = ({ className = "" }: AIWelcomeAssistantProps) => {
  const { user, userRole } = useAuth();
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionLabel, setActionLabel] = useState("");
  const [actionPath, setActionPath] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const firstName = user.email?.split('@')[0] || 'there';
    const randomNum = Math.floor(Math.random() * 3); // For variety in messages
    
    switch(userRole) {
      case 'artist':
        setWelcomeMessage(`Hi ${firstName}, `);
        
        if (randomNum === 0) {
          setActionMessage("want to apply to 3 high-paying jobs today?");
          setActionLabel("Find Jobs");
          setActionPath("/jobs");
        } else if (randomNum === 1) {
          setActionMessage("your portfolio is getting attention! Add more work samples?");
          setActionLabel("Update Portfolio");
          setActionPath("/profile/artist/setup");
        } else {
          setActionMessage("I found 5 new jobs that match your skills.");
          setActionLabel("View Matches");
          setActionPath("/jobs");
        }
        break;
        
      case 'salon':
      case 'owner':
        setWelcomeMessage(`Hi ${firstName}, `);
        
        if (randomNum === 0) {
          setActionMessage("12 artists looked at your job post. Want to boost it?");
          setActionLabel("Boost Post");
          setActionPath("/post-job");
        } else if (randomNum === 1) {
          setActionMessage("you have 3 new applications to review!");
          setActionLabel("View Applicants");
          setActionPath("/dashboard/owner");
        } else {
          setActionMessage("need help writing your next job description?");
          setActionLabel("Create Job");
          setActionPath("/post-job");
        }
        break;
        
      case 'customer':
        setWelcomeMessage(`Hi ${firstName}, `);
        
        if (randomNum === 0) {
          setActionMessage("I found 3 top-rated artists near you this week.");
          setActionLabel("Discover Artists");
          setActionPath("/artists");
        } else if (randomNum === 1) {
          setActionMessage("ready to try a new look for summer?");
          setActionLabel("Browse Styles");
          setActionPath("/salons");
        } else {
          setActionMessage("you have an unused discount waiting!");
          setActionLabel("See Offers");
          setActionPath("/checkout");
        }
        break;
        
      case 'freelancer':
        setWelcomeMessage(`Hi ${firstName}, `);
        
        if (randomNum === 0) {
          setActionMessage("there are 7 new gigs that match your skills!");
          setActionLabel("View Gigs");
          setActionPath("/jobs");
        } else if (randomNum === 1) {
          setActionMessage("complete your profile to get 3x more client views.");
          setActionLabel("Update Profile");
          setActionPath("/profile/freelancer/setup");
        } else {
          setActionMessage("want to connect with 5 salons looking for your services?");
          setActionLabel("Connect Now");
          setActionPath("/salons");
        }
        break;
        
      case 'vendor':
        setWelcomeMessage(`Hi ${firstName}, `);
        
        if (randomNum === 0) {
          setActionMessage("your products were viewed by 24 salons this week!");
          setActionLabel("See Analytics");
          setActionPath("/product-promotions");
        } else if (randomNum === 1) {
          setActionMessage("ready to launch your summer product line?");
          setActionLabel("Create Listing");
          setActionPath("/supplier-directory");
        } else {
          setActionMessage("3 salons are looking for products like yours right now.");
          setActionLabel("View Leads");
          setActionPath("/supplier-directory");
        }
        break;
        
      case 'other':
      default:
        setWelcomeMessage(`Welcome ${firstName}! `);
        setActionMessage("Let's find your perfect role in EmviApp.");
        setActionLabel("Choose Role");
        setActionPath("/dashboard/other");
        break;
    }
  }, [user, userRole]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!user || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className={`bg-white backdrop-blur-lg border border-gray-100 rounded-xl p-5 shadow-lg ${className}`}
        >
          <div className="relative">
            <button 
              onClick={handleClose} 
              className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close welcome message"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-start gap-4 mt-1">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2.5 rounded-full flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-serif text-lg font-medium text-gray-800 mb-1">
                  {welcomeMessage}
                </h4>
                <p className="text-gray-600 mb-3">
                  {actionMessage}
                </p>
                <Button variant="default" size="sm" className="rounded-full px-4 shadow-sm shadow-primary/20" asChild>
                  <a href={actionPath}>{actionLabel}</a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIWelcomeAssistant;
