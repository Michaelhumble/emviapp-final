
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Settings } from "lucide-react";
import { UserProfile } from "@/context/auth/types";
import { toast } from "sonner";

interface ArtistAppointmentsSectionProps {
  profileData?: UserProfile;
}

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

const ArtistAppointmentsSection = ({ profileData }: ArtistAppointmentsSectionProps) => {
  // Sample appointments - in a real app these would come from the database
  const appointments: Appointment[] = [
    {
      id: '1',
      clientName: 'Sarah Johnson',
      service: 'Gel Manicure',
      date: '2025-04-10',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      clientName: 'Emily Davis',
      service: 'Full Set Acrylic',
      date: '2025-04-11',
      time: '2:30 PM',
      status: 'pending'
    },
    {
      id: '3',
      clientName: 'Maria Rodriguez',
      service: 'Nail Art Design',
      date: '2025-04-09',
      time: '11:15 AM',
      status: 'completed'
    }
  ];
  
  // Status badge color mapping
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-amber-100 text-amber-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  const handleManageSettings = () => {
    toast.info("Booking settings feature coming soon!");
  };
  
  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center text-purple-900">
          <Calendar className="h-5 w-5 mr-2 text-purple-600" />
          Appointments
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleManageSettings}
          className="border-purple-200 text-purple-800 hover:bg-purple-50"
        >
          <Settings className="h-4 w-4 mr-1" />
          Settings
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{appointment.service}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[appointment.status]}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="h-4 w-4 mr-1 text-gray-400" />
                  {appointment.clientName}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {appointment.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Set up your booking availability to start accepting appointments from clients.
            </p>
            <Button 
              onClick={handleManageSettings}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Set Up Booking Availability
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistAppointmentsSection;
