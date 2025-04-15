
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface CustomerVisibilityBannerProps {
  loading?: boolean;
  credits?: number;
}

const CustomerVisibilityBanner = ({ loading = false, credits = 0 }: CustomerVisibilityBannerProps) => {
  if (loading) {
    return (
      <Card className="border-0 shadow-sm bg-gradient-to-r from-slate-50 to-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="animate-pulse">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-gray-200 h-6 w-6 rounded-full"></div>
                <div className="bg-gray-200 h-6 w-40 rounded"></div>
              </div>
              <div className="bg-gray-200 h-4 w-full max-w-sm rounded"></div>
            </div>
            <div className="bg-gray-200 h-10 w-32 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const hasCredits = credits > 0;
  
  return (
    <Card className={`border-0 shadow-sm ${hasCredits 
      ? 'bg-gradient-to-r from-green-50 to-emerald-50' 
      : 'bg-gradient-to-r from-amber-50 to-yellow-50'}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Eye className={`h-6 w-6 ${hasCredits ? 'text-emerald-600' : 'text-amber-600'}`} />
              <h3 className={`text-lg font-medium ${hasCredits ? 'text-emerald-800' : 'text-amber-800'}`}>
                {hasCredits 
                  ? `You have ${credits} credits for visibility` 
                  : "Enhance Your Customer Visibility"
                }
              </h3>
            </div>
            <p className={hasCredits ? 'text-emerald-700' : 'text-amber-700'}>
              {hasCredits 
                ? "Use your credits to boost job posts or feature your salon in search results." 
                : "Add credits to your account to boost visibility and attract more clients."
              }
            </p>
          </div>
          <Button 
            className={`${hasCredits 
              ? 'bg-emerald-600 hover:bg-emerald-700' 
              : 'bg-amber-600 hover:bg-amber-700'}`}
            asChild
          >
            <Link to="/credits">
              {hasCredits ? "Use Credits" : "Get Credits"}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerVisibilityBanner;
