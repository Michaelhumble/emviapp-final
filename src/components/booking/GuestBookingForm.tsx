import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Loader2, Calendar as CalendarIcon, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { format, addDays, isBefore, isToday } from 'date-fns';
import { useGuestBooking } from '@/hooks/useGuestBooking';
import { useAvailableTimeSlots } from '@/hooks/useAvailableTimeSlots';
import { toast } from 'sonner';

interface GuestBookingFormProps {
  artist: {
    id: string;
    name: string;
    avatar_url?: string;
    location?: string;
  };
  service: {
    id?: string;
    name: string;
    price?: number;
    duration_minutes?: number;
  };
  onSuccess?: (bookingId: string) => void;
  onCancel?: () => void;
}

const GuestBookingForm: React.FC<GuestBookingFormProps> = ({
  artist,
  service,
  onSuccess,
  onCancel
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { submitGuestBooking, submitting } = useGuestBooking();
  const { availableTimeSlots } = useAvailableTimeSlots(artist.id, selectedDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const result = await submitGuestBooking({
      client_name: formData.name.trim(),
      client_email: formData.email.trim(),
      client_phone: formData.phone.trim(),
      service_id: service.id,
      service_name: service.name,
      artist_id: artist.id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      notes: formData.notes.trim(),
      price: service.price
    });

    if (result.success) {
      setShowConfirmation(true);
      onSuccess?.(result.booking_id);
    }
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, new Date()) && !isToday(date);
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Book with {artist.name}</h2>
              <p className="text-sm text-muted-foreground font-normal">
                {service.name} • {service.duration_minutes || 60} min
                {service.price && ` • $${service.price}`}
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Details */}
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {service.duration_minutes || 60} minutes
                      {artist.location && ` • ${artist.location}`}
                    </p>
                  </div>
                  {service.price && (
                    <Badge variant="secondary" className="text-lg font-semibold">
                      ${service.price}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Select Date
              </Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 60)}
                  className="rounded-md border"
                />
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="space-y-3">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Select Time
                </Label>
                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={selectedTime === time ? "default" : "outline"}
                        className="text-sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No available times for this date</p>
                    <p className="text-sm">Please select another date</p>
                  </div>
                )}
              </div>
            )}

            {/* Contact Information */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Your Information</Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="notes">Special Requests (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special requests or notes for your appointment..."
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <div className="flex gap-3">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedTime}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    'Send Booking Request'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                By booking, you agree to receive confirmation emails and SMS updates about your appointment.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              Booking Request Sent!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your booking request has been sent to {artist.name}. 
              You'll receive a confirmation email shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <div className="font-medium mb-2">Booking Details:</div>
              <div className="space-y-1 text-left">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, 'PPP')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artist:</span>
                  <span className="font-medium">{artist.name}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" asChild>
                <a href={`mailto:${formData.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Check Email
                </a>
              </Button>
              <Button
                className="flex-1"
                onClick={() => setShowConfirmation(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuestBookingForm;