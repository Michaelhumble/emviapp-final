
import { Badge } from "@/components/ui/badge";
import { Home, Shield } from "lucide-react";

interface JobFeaturesProps {
  weeklyPay: boolean;
  ownerWillTrain: boolean;
  hasHousing?: boolean;
  noSupplyDeduction?: boolean;
}

export const JobFeatures = ({ 
  weeklyPay, 
  ownerWillTrain, 
  hasHousing, 
  noSupplyDeduction 
}: JobFeaturesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {weeklyPay && (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Weekly Pay 💰
        </Badge>
      )}
      {ownerWillTrain && (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          Owner Will Train ✨
        </Badge>
      )}
      {hasHousing && (
        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 flex items-center gap-1">
          <Home className="h-3 w-3" /> Housing 🏠
        </Badge>
      )}
      {noSupplyDeduction && (
        <Badge className="bg-teal-100 text-teal-800 border-teal-200 flex items-center gap-1">
          <Shield className="h-3 w-3" /> No Supply Fee ✅
        </Badge>
      )}
    </div>
  );
};
