
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
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

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/80 backdrop-blur-sm border border-purple-100 rounded-lg p-4 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-full">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            <span className="font-semibold">{welcomeMessage}</span>
            <span className="text-gray-700">{actionMessage}</span>
          </p>
          <Button variant="link" className="h-auto p-0 text-primary text-sm mt-1" asChild>
            <a href={actionPath}>{actionLabel}</a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIWelcomeAssistant;
