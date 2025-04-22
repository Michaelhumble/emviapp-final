
import { Card, CardContent } from "@/components/ui/card";

export const BookingsSummaryCard = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Today's Bookings</h3>
        <div className="text-3xl font-playfair font-bold text-purple-600">8</div>
        <p className="text-sm text-gray-600 mt-1">Appointments Scheduled</p>
      </CardContent>
    </Card>
  );
};
