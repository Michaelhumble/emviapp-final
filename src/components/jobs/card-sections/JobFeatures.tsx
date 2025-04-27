
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
        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium transition-colors hover:bg-emerald-100">
          Weekly Pay 💰
        </Badge>
      )}
      {ownerWillTrain && (
        <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium transition-colors hover:bg-amber-100">
          Owner Will Train ✨
        </Badge>
      )}
      {hasHousing && (
        <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium transition-colors hover:bg-indigo-100 flex items-center gap-1">
          <Home className="h-3 w-3" /> Housing 🏠
        </Badge>
      )}
      {noSupplyDeduction && (
        <Badge className="bg-teal-50 text-teal-700 border border-teal-200 font-medium transition-colors hover:bg-teal-100 flex items-center gap-1">
          <Shield className="h-3 w-3" /> No Supply Fee ✅
        </Badge>
      )}
    </div>
  );
};
