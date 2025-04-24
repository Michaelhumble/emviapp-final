
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const CalendarTab = () => {
  const navigate = useNavigate();
  
  // Automatically navigate to the full calendar page
  useEffect(() => {
    navigate("/dashboard/artist/booking-calendar");
  }, [navigate]);

  return (
    <div className="space-y-6">
      <Card className="border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Booking Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500 mb-4">Redirecting to full calendar view...</p>
          <Button 
            onClick={() => navigate("/dashboard/artist/booking-calendar")}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white"
          >
            Go to Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarTab;
