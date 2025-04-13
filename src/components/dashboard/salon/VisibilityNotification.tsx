
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Megaphone, X } from "lucide-react";
import { Link } from "react-router-dom";

interface VisibilityNotificationProps {
  salonName?: string;
  customerCount?: number;
  onClose?: () => void;
}

const VisibilityNotification = ({
  salonName = "Glow Beauty Salon",
  customerCount = 243,
  onClose
}: VisibilityNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  
  // Auto-minimize after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimized(true);
    }, 30000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  const toggleMinimize = () => {
    setMinimized(!minimized);
  };
  
  if (!isVisible) return null;
  
  if (minimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 z-40 bg-amber-500 rounded-full p-2 shadow-md cursor-pointer hover:bg-amber-600 transition-colors"
        onClick={toggleMinimize}
        title="Show visibility notification"
      >
        <Megaphone className="h-4 w-4 text-white" />
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-40 w-[280px] bg-white border border-amber-200 rounded-lg shadow-md p-2">
      <div className="flex items-start gap-2">
        <div className="bg-amber-100 rounded-full p-1 flex-shrink-0">
          <Megaphone className="h-3.5 w-3.5 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-amber-700 mb-1.5">
            <strong>{salonName}</strong> just turned on visibility to {customerCount} nearby customers
          </p>
          <Button 
            size="sm" 
            className="w-full h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white"
            asChild
          >
            <Link to="/visibility/upgrade">
              Show My Offers to Customers
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <button 
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
            onClick={toggleMinimize}
            aria-label="Minimize notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button 
            className="flex-shrink-0 text-gray-400 hover:text-gray-500"
            onClick={handleClose}
            aria-label="Close notification"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisibilityNotification;
