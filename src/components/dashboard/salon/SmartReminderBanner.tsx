
import React from "react";
import { Bell, Clock, ChevronRight } from "lucide-react";
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
  
  return (
    <div className={`bg-primary/5 border-l-4 border-l-primary rounded-lg p-3 mb-6 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-1.5 rounded-full">
          <Bell className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-700">{message}</p>
            <span className="text-xs text-gray-500">{today}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs text-primary hover:bg-primary/10"
            onClick={handleAction}
          >
            <span className="mr-1">View</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SmartReminderBanner;
