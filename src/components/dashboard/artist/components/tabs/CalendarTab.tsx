
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyCalendarView from "../../calendar/MonthlyCalendarView";
import { Calendar } from "lucide-react";

const CalendarTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border-purple-100">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Booking Calendar
          </CardTitle>
        </CardHeader>
      </Card>
      
      <MonthlyCalendarView />
    </div>
  );
};

export default CalendarTab;
