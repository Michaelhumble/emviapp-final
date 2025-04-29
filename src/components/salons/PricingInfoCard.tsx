
import { InfoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const PricingInfoCard = () => {
  return (
    <Card className="mb-6 p-4 bg-blue-50 border border-blue-100">
      <div className="flex items-start gap-3">
        <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-700">
          <p className="font-medium mb-1">Salon Value Considerations</p>
          <p className="text-blue-600">
            Prices reflect current market values and may vary based on location, size, equipment, and clientele.
            Always perform due diligence and consider consulting with a business advisor before purchasing.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PricingInfoCard;
