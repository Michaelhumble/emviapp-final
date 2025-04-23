
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple soft gradient for premium feel
const premiumGradient = "bg-gradient-to-r from-purple-200 via-pink-100 to-yellow-50";

interface ProfileBoostBannerProps {
  hasBoost: boolean;
  boostExpiry?: string;
  onBoostClick?: () => void;
}

export default function ProfileBoostBanner({ 
  hasBoost, 
  boostExpiry, 
  onBoostClick 
}: ProfileBoostBannerProps) {
  return (
    <div className={`w-full rounded-xl overflow-hidden shadow border border-purple-100 my-4 ${premiumGradient} px-4 py-4 flex flex-col items-center sm:flex-row sm:justify-between`}>
      <div className="flex items-center gap-3">
        <span>
          <Rocket className="h-6 w-6 text-purple-500" />
        </span>
        {hasBoost ? (
          <div>
            <span className="font-semibold text-purple-800">
              Your profile is boosted until <span className="font-bold text-purple-600">{boostExpiry}</span>!
            </span>
          </div>
        ) : (
          <div>
            <span className="font-semibold text-gray-900">🚀 Boost Your Profile — Get 30 Days Top Search Placement!</span>
          </div>
        )}
      </div>
      {!hasBoost && (
        <Button
          onClick={onBoostClick}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-purple-700 hover:to-blue-600"
          style={{ minWidth: 160 }}
        >
          Activate Boost ($4.99)
        </Button>
      )}
    </div>
  );
}
