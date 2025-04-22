
import { Card, CardContent } from "@/components/ui/card";

export const EarningsCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Earnings Snapshot</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-playfair font-bold text-gray-900">$2,450</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-playfair font-bold text-gray-900">$8,920</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
