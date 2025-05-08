
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

interface JobCardActionsProps {
  isExpired: boolean;
  isOwner: boolean;
  onViewDetails: () => void;
  onRenew: () => void;
  isRenewing: boolean;
}

export const JobCardActions = ({ 
  isExpired, 
  isOwner, 
  onViewDetails, 
  onRenew, 
  isRenewing 
}: JobCardActionsProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    if (isSignedIn) {
      onViewDetails();
    } else {
      navigate("/signin"); // Redirect users clearly to Sign In page if not authenticated
    }
  };

  return (
    <div className="mt-auto pt-4 flex justify-between items-center">
      <Button 
        onClick={handleViewDetails}
        className={`flex-grow mr-2 ${isExpired ? 'opacity-90' : ''}`}
      >
        Xem Chi Tiết
      </Button>
      
      {isOwner && isExpired && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRenew}
          disabled={isRenewing}
          className="whitespace-nowrap"
        >
          {isRenewing ? "Đang gia hạn..." : "Gia Hạn"}
        </Button>
      )}
    </div>
  );
};
