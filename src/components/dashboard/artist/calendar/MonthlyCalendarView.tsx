
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { addDays, format, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useArtistBookings } from "@/hooks/artist/hooks/useArtistBookings";

const MonthlyCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { bookings } = useArtistBookings();
  
  // Function to get bookings for a specific date
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      booking.date_requested && isSameDay(new Date(booking.date_requested), date)
    );
  };

  return (
    <Card className="border-purple-100">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("rounded-md border shadow-sm", 
              "pointer-events-auto"
            )}
            components={{
              DayContent: ({ date }) => {
                const dayBookings = getBookingsForDate(date);
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {date.getDate()}
                    {dayBookings.length > 0 && (
                      <Badge 
                        variant="secondary"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-purple-100 text-purple-700"
                      >
                        {dayBookings.length}
                      </Badge>
                    )}
                  </div>
                );
              }
            }}
          />

          {selectedDate && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-purple-500" />
                Appointments for {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              
              {getBookingsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getBookingsForDate(selectedDate).map((booking) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{booking.client_name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.service_name} - {booking.time_requested}
                          </p>
                        </div>
                        <Badge 
                          className={cn(
                            "capitalize",
                            booking.status === 'pending' && "bg-amber-100 text-amber-700 hover:bg-amber-100",
                            booking.status === 'accepted' && "bg-green-100 text-green-700 hover:bg-green-100",
                            booking.status === 'completed' && "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          )}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <CalendarDays className="h-12 w-12 mx-auto text-purple-300 mb-3" />
                  <p className="text-muted-foreground">
                    No appointments yet — your next client is just around the corner!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyCalendarView;
