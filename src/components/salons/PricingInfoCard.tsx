
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingInfoCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm border border-blue-100 text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center">
          <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5">
            Standard Listing: $20
          </Badge>
        </div>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5">
            Nationwide Boost: +$10
          </Badge>
        </div>
        <Button variant="default" className="bg-gradient-to-r from-purple-600 to-blue-600">
          Post Your Salon For Sale
        </Button>
      </div>
    </div>
  );
};

export default PricingInfoCard;
