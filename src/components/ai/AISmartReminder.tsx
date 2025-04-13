
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AISmartReminderProps {
  className?: string;
}

const AISmartReminder = ({ className = "" }: AISmartReminderProps) => {
  const { user, userRole } = useAuth();
  const [reminder, setReminder] = useState<{
    message: string;
    action: string;
    path: string;
  } | null>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Generate a random reminder based on user role
    // In a real app, these would be based on actual user data
    const generateReminder = () => {
      const randomSelector = Math.floor(Math.random() * 3);
      
      switch(userRole) {
        case 'artist':
          if (randomSelector === 0) {
            return {
              message: "Your job application for 'Senior Nail Artist' expires in 2 days.",
              action: "Complete Application",
              path: "/jobs"
            };
          } else if (randomSelector === 1) {
            return {
              message: "You have 3 unread messages from potential employers.",
              action: "View Messages",
              path: "/messages"
            };
          } else {
            return {
              message: "Your portfolio is missing contact information.",
              action: "Update Profile",
              path: "/profile/artist/setup"
            };
          }
          
        case 'salon':
          if (randomSelector === 0) {
            return {
              message: "Your job posting expires in 3 days. Renew now for continued visibility.",
              action: "Renew Post",
              path: "/post-job"
            };
          } else if (randomSelector === 1) {
            return {
              message: "You have 5 unreviewed applications for your recent job post.",
              action: "Review Now",
              path: "/dashboard/owner"
            };
          } else {
            return {
              message: "Complete your salon profile to appear in featured listings.",
              action: "Complete Profile",
              path: "/profile/salon/setup"
            };
          }
          
        case 'customer':
          if (randomSelector === 0) {
            return {
              message: "Your appointment with Glam Nails is tomorrow at 2PM.",
              action: "View Details",
              path: "/dashboard/customer"
            };
          } else if (randomSelector === 1) {
            return {
              message: "A special offer you bookmarked expires in 24 hours.",
              action: "See Offer",
              path: "/checkout"
            };
          } else {
            return {
              message: "Complete your beauty preferences to get personalized recommendations.",
              action: "Set Preferences",
              path: "/profile/customer/setup"
            };
          }
        
        case 'freelancer':
          if (randomSelector === 0) {
            return {
              message: "Your application for the wedding photoshoot gig expires tomorrow.",
              action: "Complete Now",
              path: "/jobs"
            };
          } else if (randomSelector === 1) {
            return {
              message: "Your portfolio has only 2 of 5 recommended samples.",
              action: "Add Samples",
              path: "/profile/freelancer/setup"
            };
          } else {
            return {
              message: "3 potential clients viewed your profile this week.",
              action: "Optimize Profile",
              path: "/profile/freelancer/setup"
            };
          }
          
        case 'supplier':
        case 'vendor':
        case 'beauty supplier':
          if (randomSelector === 0) {
            return {
              message: "Your product promotion expires in 2 days.",
              action: "Renew Promotion",
              path: "/product-promotions"
            };
          } else if (randomSelector === 1) {
            return {
              message: "5 salons inquired about your bulk discount program.",
              action: "View Inquiries",
              path: "/messages"
            };
          } else {
            return {
              message: "Complete your product catalog to improve search visibility.",
              action: "Update Catalog",
              path: "/profile/supplier/setup"
            };
          }
          
        case 'other':
        default:
          return {
            message: "Select your role to get personalized reminders and recommendations.",
            action: "Choose Role",
            path: "/dashboard/other"
          };
      }
    };
    
    // Set a random reminder
    setReminder(generateReminder());
    
    // In a real app, you'd refresh reminders periodically
    const interval = setInterval(() => {
      setReminder(generateReminder());
      setShow(true);
    }, 300000); // Every 5 minutes
    
    return () => clearInterval(interval);
  }, [user, userRole]);

  if (!user || !reminder || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-primary/5 border-l-4 border-l-primary/40 rounded-lg p-2.5 relative ${className}`}
      >
        <button 
          onClick={() => setShow(false)} 
          className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-1 rounded-full">
            <Bell className="h-3 w-3 text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-700">{reminder.message}</p>
            <Button variant="link" className="h-5 p-0 text-primary text-xs" asChild>
              <a href={reminder.path}>{reminder.action}</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AISmartReminder;
