
import { format } from "date-fns";
import { Flame } from "lucide-react";

interface BoostStatusBannerProps {
  isActive: boolean;
  expiresAt: string | null;
}

const BoostStatusBanner = ({ isActive, expiresAt }: BoostStatusBannerProps) => {
  if (!isActive || !expiresAt) return null;
  
  return (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
      <p className="text-amber-700 flex items-center font-medium">
        <Flame className="h-5 w-5 text-amber-500 mr-2" />
        🔥 Your profile is boosted until {format(new Date(expiresAt), 'MMM dd, yyyy')}
      </p>
    </div>
  );
};

export default BoostStatusBanner;
