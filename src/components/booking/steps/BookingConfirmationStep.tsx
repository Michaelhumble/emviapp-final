import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface BookingData {
  service?: any;
  date?: Date;
  time?: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  notes: string;
}

interface BookingConfirmationStepProps {
  bookingData: BookingData;
  artistName: string;
  bookingId: string | null;
  onClose: () => void;
}

export const BookingConfirmationStep: React.FC<BookingConfirmationStepProps> = ({
  bookingData,
  artistName,
  bookingId,
  onClose
}) => {
  const handleAddToCalendar = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.service) return;

    // Create calendar event data
    const startDate = new Date(`${format(bookingData.date, 'yyyy-MM-dd')}T${bookingData.time}:00`);
    const endDate = new Date(startDate.getTime() + (bookingData.service.duration_minutes * 60000));
    
    const eventData = {
      title: `${bookingData.service.name} with ${artistName}`,
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: `Appointment with ${artistName}\n${bookingData.notes || 'No special requests'}`,
      location: `Appointment with ${artistName}`
    };

    // Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.start}/${eventData.end}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleDownloadICS = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.service) return;

    const startDate = new Date(`${format(bookingData.date, 'yyyy-MM-dd')}T${bookingData.time}:00`);
    const endDate = new Date(startDate.getTime() + (bookingData.service.duration_minutes * 60000));
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EmviApp//Booking System//EN
BEGIN:VEVENT
UID:${bookingId}@emviapp.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${bookingData.service.name} with ${artistName}
DESCRIPTION:Appointment with ${artistName}\\n${bookingData.notes || 'No special requests'}
LOCATION:Appointment with ${artistName}
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder: ${bookingData.service.name} with ${artistName} in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-${bookingId}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Booking Request Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Your booking request has been sent to {artistName}. You'll receive a confirmation email shortly.
          {bookingId && (
            <span className="block text-xs mt-2 font-mono bg-muted px-2 py-1 rounded">
              Booking ID: {bookingId}
            </span>
          )}
        </p>
      </div>

      {/* Booking Details Summary */}
      <Card className="text-left">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3 text-center">Booking Details</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">{bookingData.service?.name}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium">
                {bookingData.date && format(bookingData.date, 'PPP')}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{bookingData.time}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Artist:</span>
              <span className="font-medium">{artistName}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{bookingData.client_email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium">{bookingData.client_phone}</span>
            </div>

            {bookingData.service?.price && (
              <div className="flex items-center gap-3 pt-2 border-t">
                <span className="text-muted-foreground">Price:</span>
                <Badge variant="secondary" className="font-semibold">
                  ${bookingData.service.price}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Actions */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Add this appointment to your calendar:</p>
        
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCalendar}
            className="flex-1 max-w-40"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Google Calendar
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadICS}
            className="flex-1 max-w-40"
          >
            <Download className="h-4 w-4 mr-2" />
            Download .ics
          </Button>
        </div>
      </div>

      {/* What's Next */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-left">
          <h4 className="font-medium mb-2 text-blue-900">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• {artistName} will review your request</li>
            <li>• You'll receive an email confirmation within 24 hours</li>
            <li>• If approved, you'll get appointment details and any preparation instructions</li>
            <li>• You can manage your booking from the confirmation email</li>
          </ul>
        </CardContent>
      </Card>

      {/* Close Button */}
      <div className="pt-4">
        <Button onClick={onClose} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
};