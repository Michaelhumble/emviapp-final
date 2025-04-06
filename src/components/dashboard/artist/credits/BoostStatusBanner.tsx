
import { Card, CardContent } from "@/components/ui/card";
import { RocketIcon, Calendar } from "lucide-react";
import { BoostStatusBannerProps } from "./types";
import { format } from "date-fns";

const BoostStatusBanner = ({ isActive, expiresAt, daysRemaining = 0 }: BoostStatusBannerProps) => {
  if (!isActive) return null;
  
  const formatExpiryDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return "Unknown date";
    }
  };
  
  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-indigo-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-full">
            <RocketIcon className="h-6 w-6 text-indigo-600" />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-indigo-800 mb-1">
              Your Profile Is Boosted!
            </h3>
            <p className="text-indigo-600">
              Your profile has increased visibility to salon owners and clients.
            </p>
          </div>
          
          <div className="flex-shrink-0 bg-white px-4 py-3 rounded-lg shadow-sm border border-indigo-100 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <div>
              <span className="text-sm text-gray-500">Expires</span>
              <p className="font-medium text-indigo-700">
                {formatExpiryDate(expiresAt || '')}
                {daysRemaining > 0 && (
                  <span className="text-xs ml-1 whitespace-nowrap">
                    ({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostStatusBanner;
