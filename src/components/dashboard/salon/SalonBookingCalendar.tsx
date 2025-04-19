
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const SalonBookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Dummy booking data for demonstration
  const dummyBookings = [
    { id: 1, clientName: "Alice Smith", service: "Haircut & Style", time: "09:00 AM", duration: 60 },
    { id: 2, clientName: "John Davis", service: "Color Treatment", time: "11:00 AM", duration: 90 },
    { id: 3, clientName: "Maria Garcia", service: "Blowout", time: "01:30 PM", duration: 45 },
    { id: 4, clientName: "Robert Brown", service: "Beard Trim", time: "03:00 PM", duration: 30 },
  ];
  
  const formattedDate = date ? format(date, "MMMM d, yyyy") : "";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-playfair text-emvi-dark">Booking Calendar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-muted shadow-sm md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="border-muted shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-playfair">
              Appointments for {formattedDate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dummyBookings.length > 0 ? (
              <div className="space-y-4">
                {dummyBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium font-inter">{booking.clientName}</h3>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium font-inter">{booking.time}</p>
                      <p className="text-sm text-muted-foreground">{booking.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No appointments scheduled for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonBookingCalendar;
