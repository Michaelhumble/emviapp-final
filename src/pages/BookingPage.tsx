
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

// Time slots for booking
const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [providerId, setProviderId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch providers (artists and salons) for selection
  const { data: providers, isLoading: loadingProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, role')
        .in('role', ['artist', 'salon', 'owner'])
        .order('full_name');
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch services for selection
  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to make a booking');
      navigate('/auth/signin');
      return;
    }

    if (!providerId || !serviceType || !bookingDate || !bookingTime) {
      toast.error('Please fill out all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Format the date for database storage
      const formattedDate = bookingDate ? format(bookingDate, 'yyyy-MM-dd') : null;

      // Create booking in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          customer_id: user.id,
          provider_id: providerId,
          service_type: serviceType,
          date: formattedDate,
          time: bookingTime,
          notes: notes,
          status: 'pending',
          created_at: new Date().toISOString(),
          sender_id: user.id,
          recipient_id: providerId,
          date_requested: formattedDate,
          time_requested: bookingTime
        })
        .select();

      if (error) throw error;

      toast.success('Booking request submitted successfully!');
      navigate('/my-bookings');
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast.error(`Failed to submit booking: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Book an Appointment</CardTitle>
            <CardDescription>
              Request a booking with your preferred artist or salon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="provider">Select Artist or Salon</Label>
                <Select
                  value={providerId}
                  onValueChange={setProviderId}
                  disabled={loadingProviders}
                >
                  <SelectTrigger id="provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers?.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.full_name} ({provider.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Type</Label>
                <Select
                  value={serviceType}
                  onValueChange={setServiceType}
                  disabled={loadingServices}
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services?.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="manicure">Manicure</SelectItem>
                    <SelectItem value="pedicure">Pedicure</SelectItem>
                    <SelectItem value="gel-nails">Gel Nails</SelectItem>
                    <SelectItem value="nail-art">Nail Art</SelectItem>
                    <SelectItem value="acrylic-nails">Acrylic Nails</SelectItem>
                    <SelectItem value="nail-repair">Nail Repair</SelectItem>
                    <SelectItem value="custom">Custom Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={setBookingDate}
                  disabled={(date) => date < new Date()}
                  className="border rounded-md p-3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select value={bookingTime} onValueChange={setBookingTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests or information"
                  className="resize-none"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Request Booking'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BookingPage;
