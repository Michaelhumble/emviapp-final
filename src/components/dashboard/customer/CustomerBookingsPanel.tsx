
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface CustomerBookingsPanelProps {
  bookingsCount: number;
  lastBookingDate: string;
}

const CustomerBookingsPanel: React.FC<CustomerBookingsPanelProps> = ({
  bookingsCount,
  lastBookingDate,
}) => {
  return (
    <Card className="shadow-sm border border-slate-200 bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Your Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total bookings</span>
            <span className="font-medium">{bookingsCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last booking</span>
            <span className="font-medium">{lastBookingDate}</span>
          </div>
          <div className="pt-2">
            <Link to="/my-bookings">
              <Button variant="outline" className="w-full">
                View All Bookings
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsPanel;
