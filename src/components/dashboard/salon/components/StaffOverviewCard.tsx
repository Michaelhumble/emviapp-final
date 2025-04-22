
import { Card, CardContent } from "@/components/ui/card";

export const StaffOverviewCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Staff Overview</h3>
        <div className="text-3xl font-playfair font-bold text-purple-600">5</div>
        <p className="text-sm text-gray-600 mt-1">Active Staff Members</p>
      </CardContent>
    </Card>
  );
};
