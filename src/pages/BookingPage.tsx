
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
import { supabaseBypass } from '@/types/supabase-bypass';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useAvailableTimeSlots } from '@/hooks/useAvailableTimeSlots';
import { BookingStateWrapper } from '@/components/booking/BookingStateWrapper';
import { useBookingErrorHandler } from '@/hooks/useBookingErrorHandler';

const BookingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { handleBookingError } = useBookingErrorHandler();

  const [providerId, setProviderId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Use our new availability hook
  const { availableTimeSlots, isDateAvailable } = useAvailableTimeSlots(providerId, bookingDate);

  // Fetch providers (artists and salons) for selection
  const { data: providers, isLoading: loadingProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabaseBypass
        .from('profiles')
        .select('id, full_name, role')
        .in('role' as any, ['artist' as any, 'salon' as any, 'owner' as any])
        .eq('accepts_bookings' as any, true)
        .order('full_name' as any);
      
      if (error) throw error;
      return (data as any) || [];
    }
  });

  // Fetch services for selection
  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ['services', providerId],
    queryFn: async () => {
      if (!providerId) return [];

      const { data, error } = await supabaseBypass
        .from('services')
        .select('id, title')
        .eq('user_id' as any, providerId)
        .eq('is_visible' as any, true)
        .order('title' as any);
      
      if (error) throw error;
      return (data as any) || [];
    },
    enabled: !!providerId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to make a booking');
      navigate('/signin');
      return;
    }

    if (!providerId || !serviceType || !bookingDate || !bookingTime) {
      toast.error('Please fill out all required fields');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Format the date for database storage
      const formattedDate = bookingDate ? format(bookingDate, 'yyyy-MM-dd') : null;

      // Create booking in Supabase
      const { data, error } = await supabaseBypass
        .from('bookings')
        .insert({
          customer_id: user.id,
          provider_id: providerId,
          service_id: serviceType,
          date: formattedDate,
          time: bookingTime,
          notes: notes,
          status: 'pending',
          created_at: new Date().toISOString(),
          sender_id: user.id,
          recipient_id: providerId,
          date_requested: formattedDate,
          time_requested: bookingTime
        } as any)
        .select();

      if (error) throw error;

      toast.success('Booking request submitted successfully!');
      navigate('/my-bookings');
    } catch (err) {
      handleBookingError(err);
      setError(err instanceof Error ? err : new Error('Failed to submit booking'));
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
            <BookingStateWrapper 
              loading={submitting} 
              error={error}
              loadingComponent={<div className="p-8 text-center">Processing your booking...</div>}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="provider">Select Artist or Salon</Label>
                  <Select
                    value={providerId}
                    onValueChange={(value) => {
                      setProviderId(value);
                      setServiceType(''); // Reset service when provider changes
                      setBookingDate(undefined); // Reset date
                      setBookingTime(''); // Reset time
                    }}
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

                {providerId && (
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
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {providerId && serviceType && (
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={bookingDate}
                      onSelect={(date) => {
                        setBookingDate(date);
                        setBookingTime(''); // Reset time when date changes
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || !isDateAvailable(date);
                      }}
                      className="border rounded-md p-3"
                    />
                  </div>
                )}

                {providerId && serviceType && bookingDate && (
                  <div className="space-y-2">
                    <Label htmlFor="time">Select Time</Label>
                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableTimeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={bookingTime === time ? "default" : "outline"}
                            className={bookingTime === time ? "bg-primary-600" : ""}
                            onClick={() => setBookingTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800">
                        No availability for this day. Please select another date.
                      </div>
                    )}
                  </div>
                )}

                {providerId && serviceType && bookingDate && bookingTime && (
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
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitting || !providerId || !serviceType || !bookingDate || !bookingTime}
                >
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
            </BookingStateWrapper>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BookingPage;
