
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const SalonOverviewCard = () => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            Logo
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Beautiful Nails LA</h2>
              <Badge 
                variant="outline" 
                className="bg-green-50 text-green-700 border-green-200"
              >
                Open Now
              </Badge>
            </div>
            <p className="text-gray-600 mt-1 text-sm">
              123 Beverly Hills Blvd, Los Angeles, CA 90210
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
