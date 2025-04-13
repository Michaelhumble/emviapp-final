
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Clock, Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AISmartReminderProps {
  className?: string;
}

type ReminderPriority = "low" | "medium" | "high";

interface ReminderData {
  message: string;
  action: string;
  path: string;
  priority: ReminderPriority;
}

const AISmartReminder = ({ className = "" }: AISmartReminderProps) => {
  const { user, userRole } = useAuth();
  const [reminder, setReminder] = useState<ReminderData | null>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    // Generate a random reminder based on user role
    // In a real app, these would be based on actual user data
    const generateReminder = (): ReminderData => {
      const randomSelector = Math.floor(Math.random() * 3);
      let priority: ReminderPriority = "medium";
      
      switch(userRole) {
        case 'artist':
          if (randomSelector === 0) {
            priority = "high";
            return {
              message: "Your job application for 'Senior Nail Artist' expires in 2 days.",
              action: "Complete Application",
              path: "/jobs",
              priority
            };
          } else if (randomSelector === 1) {
            return {
              message: "You have 3 unread messages from potential employers.",
              action: "View Messages",
              path: "/messages",
              priority
            };
          } else {
            priority = "low";
            return {
              message: "Your portfolio is missing contact information.",
              action: "Update Profile",
              path: "/profile/artist/setup",
              priority
            };
          }
          
        case 'salon':
        case 'owner':
          if (randomSelector === 0) {
            priority = "high";
            return {
              message: "Your job posting expires in 3 days. Renew now.",
              action: "Renew Post",
              path: "/post-job",
              priority
            };
          } else if (randomSelector === 1) {
            return {
              message: "5 unreviewed applications for your recent job post.",
              action: "Review Now",
              path: "/dashboard/owner",
              priority
            };
          } else {
            priority = "low";
            return {
              message: "Complete your salon profile to appear in featured listings.",
              action: "Complete Profile",
              path: "/profile/salon/setup",
              priority
            };
          }
          
        default:
          return {
            message: "Select your role to get personalized reminders.",
            action: "Choose Role",
            path: "/dashboard/other",
            priority: "medium"
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
  
  // Get color based on priority
  const getPriorityColor = () => {
    switch(reminder.priority) {
      case "high": return "border-rose-300 bg-rose-50/40";
      case "medium": return "border-amber-300 bg-amber-50/40";
      case "low": return "border-primary/40 bg-primary/5";
      default: return "border-primary/40 bg-primary/5";
    }
  };
  
  // Get icon based on priority
  const getPriorityIcon = () => {
    switch(reminder.priority) {
      case "high": return <Clock className="h-3 w-3 text-rose-500" />;
      case "medium": return <Info className="h-3 w-3 text-amber-500" />;
      case "low": return <Bell className="h-3 w-3 text-primary" />;
      default: return <Bell className="h-3 w-3 text-primary" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-l-2 rounded-lg p-1.5 relative ${getPriorityColor()} ${className}`}
      >
        <button 
          onClick={() => setShow(false)} 
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="h-2.5 w-2.5" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="bg-white/60 p-1 rounded-full">
            {getPriorityIcon()}
          </div>
          <div>
            <p className="text-[10px] text-gray-700 pr-4">{reminder.message}</p>
            <Button variant="link" className="h-4 p-0 text-xs font-medium" asChild>
              <a href={reminder.path}>{reminder.action}</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AISmartReminder;
