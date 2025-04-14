
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
import { useQuery } from '@tanstack/react-query';
import { UpsellSuggestions } from '@/components/booking/UpsellSuggestions';
import { RebookingReminder } from '@/components/booking/RebookingReminder';
import { useServiceUpsells } from '@/hooks/useServiceUpsells';
import { BookingProvider, useBooking } from '@/context/booking/BookingProvider';
import { useRebookingReminder } from '@/hooks/useRebookingReminder';

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

const BookingPageContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('id, title, price')
        .order('title');
      
      if (error) throw error;
      return data || [];
    }
  });

  const { 
    bookingState, 
    setServiceId, 
    setProviderId, 
    setDate, 
    setTime, 
    setNotes,
    addAdditionalService,
    saveBookingDraft,
    submitBooking,
    isLoading: isSavingBooking
  } = useBooking();

  const {
    shouldShowReminder,
    artistName,
    artistId,
    lastBookingDate,
    dismissReminder
  } = useRebookingReminder();

  // Get the current service price for the upsell calculation
  const currentService = services?.find(s => s.id === serviceType);
  const currentServicePrice = currentService ? parseFloat(String(currentService.price)) : 0;

  const { upsells, loading: loadingUpsells } = useServiceUpsells(
    serviceType, 
    currentServicePrice
  );

  const handleAddUpsell = (upsell: any) => {
    addAdditionalService(upsell);
  };

  const handleSkipUpsells = () => {
    // Just hide the upsells by setting an empty array
    // This is handled in the UpsellSuggestions component
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to make a booking');
      navigate('/auth/signin');
      return;
    }

    if (!selectedProviderId || !serviceType || !bookingDate || !bookingTime) {
      toast.error('Please fill out all required fields');
      return;
    }

    setServiceId(serviceType);
    setProviderId(selectedProviderId);
    setDate(bookingDate);
    setTime(bookingTime);
    setNotes(bookingNotes);

    const draftId = await saveBookingDraft();
    
    if (!draftId) {
      toast.error('Failed to save booking draft');
      return;
    }

    const success = await submitBooking();

    if (success) {
      toast.success('Booking request submitted successfully!');
      navigate('/my-bookings');
    }
  };

  return (
    <Layout>
      <div className="container max-w-3xl mx-auto py-10 px-4">
        {shouldShowReminder && (
          <div className="mb-6">
            <RebookingReminder
              lastBookingDate={lastBookingDate}
              artistName={artistName}
              artistId={artistId}
              onDismiss={dismissReminder}
            />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Book an Appointment</CardTitle>
            <CardDescription>
              Request a booking with your preferred artist or salon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {serviceType && (
                <UpsellSuggestions
                  upsells={upsells}
                  onAddUpsell={handleAddUpsell}
                  onSkip={handleSkipUpsells}
                  isLoading={loadingUpsells}
                />
              )}

              <div className="space-y-2">
                <label htmlFor="provider">Select Artist or Salon</label>
                <Select
                  value={selectedProviderId}
                  onValueChange={setSelectedProviderId}
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
                <label htmlFor="service">Service Type</label>
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

              <div className="space-y-2">
                <label>Select Date</label>
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={setBookingDate}
                  disabled={(date) => date < new Date()}
                  className="border rounded-md p-3"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="time">Select Time</label>
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
                <label htmlFor="notes">Additional Notes</label>
                <Textarea
                  id="notes"
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="Any special requests or information"
                  className="resize-none"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting || isSavingBooking}>
                {submitting || isSavingBooking ? (
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

const BookingPage = () => {
  return (
    <BookingProvider>
      <BookingPageContent />
    </BookingProvider>
  );
};

export default BookingPage;
