
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SalonBoostBannerProps {
  onBoostClick: () => void;
  loading?: boolean;
  isPremium?: boolean;
}

const SalonBoostBanner = ({ onBoostClick, loading = false, isPremium = false }: SalonBoostBannerProps) => {
  if (loading) {
    return (
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-200 h-6 w-6 rounded-full"></div>
                <div className="bg-gray-200 h-6 w-32 rounded"></div>
              </div>
              <div className="bg-gray-200 h-4 w-full max-w-sm rounded"></div>
              <div className="bg-gray-200 h-4 w-3/4 mt-2 rounded"></div>
            </div>
            <div className="bg-gray-200 h-10 w-32 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (isPremium) {
    return (
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-indigo-50 via-purple-50 to-purple-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-medium text-purple-800">Premium Visibility Active</h3>
              </div>
              <p className="text-purple-700">
                Your salon is currently featured in premium positions! You're getting up to 3x more visibility.
              </p>
            </div>
            <Button 
              className="bg-white text-purple-700 hover:bg-purple-50 hover:text-purple-800 border border-purple-200"
              onClick={onBoostClick}
            >
              Extend Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-slate-50 to-blue-50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-blue-800">Boost Your Salon Visibility</h3>
            </div>
            <p className="text-blue-700">
              Get featured at the top of search results and attract more clients to your salon.
            </p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={onBoostClick}
          >
            Boost Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonBoostBanner;
