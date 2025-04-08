
import { Button } from "@/components/ui/button";

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
  return (
    <div className="mt-auto pt-4 flex justify-between items-center">
      <Button 
        onClick={onViewDetails}
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
