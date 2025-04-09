
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin } from "lucide-react";

const CustomerBookingsSection = () => {
  // This would normally fetch from an API
  const bookings = [
    {
      id: "b1",
      date: "April 15, 2025",
      time: "2:00 PM",
      service: "Gel Manicure",
      provider: "Jessica W. at Glamour Salon",
      status: "confirmed"
    },
    {
      id: "b2",
      date: "May 2, 2025",
      time: "10:30 AM",
      service: "Hair Styling",
      provider: "Michael T. at Style Studio",
      status: "pending"
    }
  ];
  
  return (
    <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="font-serif flex items-center text-lg">
          <CalendarDays className="h-5 w-5 text-pink-500 mr-2" />
          Your Upcoming Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{booking.service}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full 
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-gray-100 text-gray-700'}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                    {booking.date}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {booking.time}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {booking.provider}
                  </p>
                </div>
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/appointments/${booking.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/appointments">
                  View All Bookings
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
              <CalendarDays className="h-8 w-8 text-pink-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">No bookings yet</h3>
              <p className="text-sm text-gray-500 mb-4">Book your first beauty appointment</p>
              <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600" asChild>
                <Link to="/appointments/book">
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsSection;
