import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import ComingSoonModal from "@/components/common/ComingSoonModal";

const ArtistCalendarPreview = () => {
  // Mock booking data
  const upcomingBookings = [
    {
      id: 1,
      client: "Sarah Johnson",
      service: "Gel Manicure",
      date: "Today",
      time: "2:30 PM",
      status: "confirmed"
    },
    {
      id: 2,
      client: "Emma Wilson",
      service: "Full Set Acrylic",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 3,
      client: "Jessica Miller",
      service: "Nail Art Design",
      date: "Thu, Oct 26",
      time: "3:15 PM",
      status: "pending"
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card className="border-gray-100 shadow-sm">
      <ComingSoonModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        featureName="Manage Appointments"
      />
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
          <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
          Upcoming Appointments
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/calendar" className="flex items-center">
            Full Calendar <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingBookings.map((booking) => (
              <motion.div
                key={booking.id}
                className={`p-4 rounded-lg border ${
                  booking.status === 'confirmed' 
                    ? 'border-blue-100 bg-blue-50' 
                    : 'border-amber-100 bg-amber-50'
                }`}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{booking.client}</h4>
                    <p className="text-sm text-gray-600 mt-1">{booking.service}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </div>
                </div>
                
                <div className="flex items-center mt-3 text-sm text-gray-600">
                  <CalendarDays className="h-4 w-4 mr-1.5 text-gray-500" />
                  <span>{booking.date}</span>
                  <Clock className="h-4 w-4 ml-3 mr-1.5 text-gray-500" />
                  <span>{booking.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={() => setModalOpen(true)}>
            Manage Appointments
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCalendarPreview;
