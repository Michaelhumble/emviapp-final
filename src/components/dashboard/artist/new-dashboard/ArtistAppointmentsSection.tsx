
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ChevronRight } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ArtistAppointmentsSectionProps {
  profileData?: UserProfile;
}

const ArtistAppointmentsSection = ({ profileData }: ArtistAppointmentsSectionProps) => {
  // Sample appointments - in a real app these would come from the database
  const appointments = [
    {
      id: "1",
      clientName: "Sarah Johnson",
      service: "Gel Manicure",
      date: "Today",
      time: "3:00 PM",
      status: "confirmed"
    },
    {
      id: "2",
      clientName: "Emma Williams",
      service: "Full Set Acrylic",
      date: "Tomorrow",
      time: "10:30 AM",
      status: "confirmed"
    },
    {
      id: "3",
      clientName: "Maria Garcia",
      service: "Nail Art",
      date: "Apr 12",
      time: "2:15 PM",
      status: "pending"
    }
  ];
  
  const handleStatusUpdate = (id: string, newStatus: string) => {
    toast.info(`Appointment status would be updated to: ${newStatus}`);
  };
  
  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center text-purple-900">
          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
          Upcoming Appointments
        </CardTitle>
        
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="border-purple-200 text-purple-800 hover:bg-purple-50"
        >
          <Link to="/appointments">
            View All
          </Link>
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="flex flex-col md:flex-row justify-between border border-purple-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <User className="h-4 w-4 text-purple-400 mr-2" />
                    <h4 className="font-medium">{appointment.clientName}</h4>
                    
                    <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{appointment.service}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    <span className="mr-3">{appointment.date}</span>
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0 space-x-2">
                  {appointment.status === 'pending' && (
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                    >
                      Confirm
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusUpdate(appointment.id, 'rescheduled')}
                  >
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="text-purple-700"
              >
                <Link to="/appointments" className="flex items-center">
                  Manage All Appointments
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              You don't have any scheduled appointments. Share your booking link with clients to get started.
            </p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <Link to="/appointments/settings">
                Set Up Appointment Booking
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistAppointmentsSection;
