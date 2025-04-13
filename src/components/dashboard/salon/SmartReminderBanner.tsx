
import React, { useState } from "react";
import { Bell, Calendar, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface SmartReminderBannerProps {
  className?: string;
  onDismiss?: () => void;
}

const SmartReminderBanner: React.FC<SmartReminderBannerProps> = ({ 
  className,
  onDismiss
}) => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  const today = format(new Date(), "EEEE, MMMM d");
  const [dismissed, setDismissed] = useState(false);
  
  // You can customize this logic to show different messages based on user data
  const getActionMessage = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return "You have 2 clients scheduled for today";
    } else if (hour < 17) {
      return "Update your availability for next week";
    } else {
      return "Review today's bookings and prepare for tomorrow";
    }
  };
  
  const message = getActionMessage();
  const actionPath = "/dashboard/salon?tab=bookings";
  
  const handleAction = () => {
    navigate(actionPath);
  };
  
  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) onDismiss();
  };
  
  if (dismissed) return null;
  
  return (
    <div className={`bg-primary/5 border-l-4 border-l-primary rounded-lg p-2 mb-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-1 rounded-full">
          <Calendar className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-gray-700">{message}</p>
            <span className="text-[10px] text-gray-500">{today}</span>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-xs text-primary hover:bg-primary/10 p-0 px-1"
              onClick={handleAction}
            >
              <span className="mr-1">View</span>
              <ChevronRight className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-500"
              onClick={handleDismiss}
              title="Dismiss"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartReminderBanner;
