
import React from "react";
import { CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const EmptyAppointments = () => {
  return (
    <div className="py-8 text-center">
      <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <CalendarX className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-1">No Appointments</h3>
      <p className="text-gray-500 mb-4 max-w-md mx-auto">
        You don't have any upcoming appointments. Once clients book with you, they'll appear here.
      </p>
      <Button variant="outline" asChild>
        <Link to="/profile">Set Up Your Profile</Link>
      </Button>
    </div>
  );
};
