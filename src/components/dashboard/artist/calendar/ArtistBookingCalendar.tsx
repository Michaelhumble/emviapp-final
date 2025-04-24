
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { format } from 'date-fns';
import { motion } from "framer-motion";

// Mock data for calendar view
const mockBookings = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    service: 'Makeup Session',
    date: '2025-04-25',
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: '2',
    clientName: 'Emma Smith',
    service: 'Hair Styling',
    date: '2025-04-26',
    time: '2:00 PM',
    status: 'pending'
  }
];

const ArtistBookingCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const nextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 7);
    setCurrentDate(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 7);
    setCurrentDate(prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-serif">Booking Calendar</CardTitle>
              <CardDescription>Manage your appointments and schedule</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={prevWeek}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={nextWeek}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const date = new Date(currentDate);
                date.setDate(currentDate.getDate() - currentDate.getDay() + i);
                return (
                  <div key={i} className="min-h-[120px] border rounded-lg p-2">
                    <div className="text-sm font-medium mb-2">
                      {format(date, 'EEE, MMM d')}
                    </div>
                    {mockBookings
                      .filter(booking => booking.date === format(date, 'yyyy-MM-dd'))
                      .map(booking => (
                        <motion.div
                          key={booking.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-purple-50 rounded-md p-2 mb-2 cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowBookingDetails(true);
                          }}
                        >
                          <div className="font-medium">{booking.clientName}</div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="h-3 w-3 mr-1" />
                            {booking.time}
                          </div>
                        </motion.div>
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      {showBookingDetails && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-medium mb-4">Booking Details</h3>
            <div className="space-y-3">
              <p><span className="font-medium">Client:</span> {selectedBooking.clientName}</p>
              <p><span className="font-medium">Service:</span> {selectedBooking.service}</p>
              <p><span className="font-medium">Date:</span> {selectedBooking.date}</p>
              <p><span className="font-medium">Time:</span> {selectedBooking.time}</p>
              <p><span className="font-medium">Status:</span> {selectedBooking.status}</p>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowBookingDetails(false)}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ArtistBookingCalendar;
