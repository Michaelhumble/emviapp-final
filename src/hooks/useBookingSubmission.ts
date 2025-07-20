import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth/useAuth';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
}

export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitBooking = async (serviceId: string, providerId: string, formData: BookingFormData) => {
    try {
      setIsSubmitting(true);

      // Create booking record
      const { error } = await supabase
        .from('bookings')
        .insert({
          sender_id: user?.id || null,
          recipient_id: providerId,
          service_id: serviceId,
          client_name: formData.name,
          date_requested: formData.date,
          time_requested: formData.time,
          note: formData.notes,
          status: 'pending',
        });

      if (error) throw error;

      toast.success('Booking request sent successfully!');
      return true;
    } catch (err) {
      console.error('Error submitting booking:', err);
      toast.error('Failed to send booking request. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitBooking,
    isSubmitting,
  };
};