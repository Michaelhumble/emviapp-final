
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CreditOptionCardProps {
  title: string;
  description: string;
  cost: number;
  icon: LucideIcon;
  isDisabled: boolean;
  isProcessing: boolean;
  isSuccess: boolean;
  onRedeem: () => void;
}

const CreditOptionCard = ({ 
  title, 
  description, 
  cost, 
  icon: Icon, 
  isDisabled,
  isProcessing, 
  isSuccess,
  onRedeem 
}: CreditOptionCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-purple-100 hover:border-purple-300 transition-all shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="text-purple-800 font-semibold">{title}</span>
        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
          {cost} Credits
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>
      {isSuccess ? (
        <div className="w-full bg-green-100 text-green-800 py-2 px-3 rounded-md flex items-center justify-center">
          <span className="flex items-center font-medium">
            ✅ {title === 'Profile Boost' ? 'Boost Activated!' : 'Credit Applied!'}
          </span>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:bg-purple-200"
          disabled={isDisabled || isProcessing}
          onClick={onRedeem}
        >
          <div className="flex items-center">
            {isProcessing ? (
              <Loader className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Icon className="h-4 w-4 mr-1" />
            )}
            {isProcessing ? "Processing..." : "Redeem"}
          </div>
          <ArrowRight className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default CreditOptionCard;
