
import { useState } from "react";
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
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-40 w-[320px] bg-white border border-amber-200 rounded-lg shadow-md p-3">
      <div className="flex items-start gap-2">
        <div className="bg-amber-100 rounded-full p-1.5 flex-shrink-0">
          <Megaphone className="h-4 w-4 text-amber-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-amber-700 mb-2">
            <strong>{salonName}</strong> just turned on visibility to {customerCount} nearby customers
          </p>
          <Button 
            size="sm" 
            className="w-full h-8 text-xs bg-amber-600 hover:bg-amber-700 text-white"
            asChild
          >
            <Link to="/visibility/upgrade">
              Show My Offers to Customers
            </Link>
          </Button>
        </div>
        <button 
          className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default VisibilityNotification;
