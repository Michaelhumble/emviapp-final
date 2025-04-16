
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistBookings } from "@/hooks/useArtistBookings";
import BookingCard from "../booking/BookingCard";
import { addDays, format, startOfWeek } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

const BookingsTab = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const { bookings, loading } = useArtistBookings();

  // Get dates for current week
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Start from Monday
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Group bookings by date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date_requested);
      return format(bookingDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });
  };

  const nextWeek = () => setCurrentWeek(date => addDays(date, 7));
  const previousWeek = () => setCurrentWeek(date => addDays(date, -7));

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-xl font-serif">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              My Bookings
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={previousWeek}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentWeek(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextWeek}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDates.map((date, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-center p-2 bg-muted rounded-t-lg">
                  <div className="text-xs uppercase">{format(date, 'EEE')}</div>
                  <div className="text-lg">{format(date, 'd')}</div>
                </div>
                <div className="flex-1 min-h-[300px] p-2 border rounded-b-lg space-y-2 overflow-y-auto">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      <div className="h-20 bg-muted rounded" />
                      <div className="h-20 bg-muted rounded" />
                    </div>
                  ) : (
                    getBookingsForDate(date).map(booking => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking}
                        compact
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsTab;
