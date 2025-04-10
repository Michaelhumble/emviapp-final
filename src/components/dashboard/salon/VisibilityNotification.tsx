
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
    <div className="fixed bottom-4 right-4 z-50 w-[380px] bg-white border border-amber-200 rounded-lg shadow-lg p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
          <Megaphone className="h-5 w-5 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-amber-800">Visibility Opportunity</h3>
          <p className="text-sm text-amber-700 mt-1">
            <strong>{salonName}</strong> just turned on visibility. Their offer is now shown to {customerCount} customers nearby.
          </p>
          <Button 
            size="sm" 
            className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white"
            asChild
          >
            <Link to="/visibility/upgrade">
              Show My Offers to Customers — $25/mo
            </Link>
          </Button>
        </div>
        <button 
          className="flex-shrink-0 text-gray-400 hover:text-gray-500"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default VisibilityNotification;
