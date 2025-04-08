
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CustomerVisibilityBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100">
      <CardContent className="py-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Gift className="h-6 w-6 text-amber-500" />
              <h3 className="text-lg font-medium text-amber-800">Boost Your Business!</h3>
            </div>
            <p className="text-amber-700 text-sm">
              90% of salons who add weekly offers see a 35% increase in new customer visits. 
              Share a special discount to attract new clients.
            </p>
          </div>
          <div className="flex items-end">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
              <Link to="/offers/create">Create Special Offer</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerVisibilityBanner;
