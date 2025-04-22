
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

// Mock booking data
const mockBookings = [
  {
    id: "b1",
    client: "Ava Nguyen",
    service: "Nail Art",
    date: "April 23, 2025",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: "b2",
    client: "Lily Tran",
    service: "Gel Manicure",
    date: "April 23, 2025",
    time: "1:30 PM",
    status: "Pending",
  },
  {
    id: "b3",
    client: "Sofia Lee",
    service: "Classic Manicure",
    date: "April 24, 2025",
    time: "9:00 AM",
    status: "Confirmed",
  },
  {
    id: "b4",
    client: "Grace Kim",
    service: "Hair Styling",
    date: "April 24, 2025",
    time: "2:00 PM",
    status: "Pending",
  },
  {
    id: "b5",
    client: "Mia Choi",
    service: "Pedicure",
    date: "April 25, 2025",
    time: "11:00 AM",
    status: "Confirmed",
  },
];

// Status badge styling
const statusBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-emerald-100 text-emerald-700 border-none";
    case "pending":
      return "bg-amber-100 text-amber-700 border-none";
    default:
      return "bg-gray-100 text-gray-700 border-none";
  }
};

const ArtistBookingsOverview = () => (
  <section className="max-w-4xl mx-auto w-full">
    <Card className="border-0 shadow-none bg-white/70">
      <CardHeader className="pb-1 bg-gradient-to-r from-[#E5DEFF] via-[#fff] to-[#F1F0FB] rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-playfair font-semibold text-[#1A1F2C]">
            My Bookings Overview
          </CardTitle>
          <Button
            variant="ghost"
            className="text-emvi-accent font-medium px-3 py-1 hover:bg-emvi-offwhite/70 transition rounded-md"
            tabIndex={-1}
            aria-label="View All Bookings"
          >
            View All Bookings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockBookings.slice(0, 5).map((booking) => (
            <motion.div
              key={booking.id}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group transition-all"
            >
              <div className="rounded-xl bg-gradient-to-br from-[#f7f6fd] to-white shadow-[0_2px_12px_0_rgba(146,120,202,0.08)] p-4 flex flex-col gap-3 cursor-pointer min-h-[148px]">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#7E69AB]" />
                  <span className="font-medium text-[#1A1F2C] font-playfair text-base truncate">{booking.client}</span>
                  <Badge
                    variant="outline"
                    className={`${statusBadgeStyle(booking.status)} ml-auto px-2 py-0.5 rounded-full text-xs font-medium shadow backdrop-blur-sm`}
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
                  <CalendarDays className="h-3.5 w-3.5 mr-1 text-[#bfa9ee]" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-4">
                  <Clock className="h-3.5 w-3.5 mr-1 text-[#bfa9ee]" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center text-sm text-emvi-accent font-semibold mt-0">
                  {booking.service}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </section>
);

export default ArtistBookingsOverview;
