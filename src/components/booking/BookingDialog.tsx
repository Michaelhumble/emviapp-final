
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { UserProfile } from "@/types/profile";
import { Service } from "@/pages/u/artist-profile/types";
import { supabase } from "@/integrations/supabase/client";
import BookingForm from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";
import { useBookingErrorHandler } from "@/hooks/useBookingErrorHandler";
import { BookingStateWrapper } from "./BookingStateWrapper";

interface BookingDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile;
  services: Service[];
}

export const BookingDialog = ({
  isOpen,
  onOpenChange,
  profile,
  services
}: BookingDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const { handleBookingError } = useBookingErrorHandler();

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate availability before proceeding
      const { data: availability, error: availabilityError } = await supabase
        .from('artist_availability')
        .select('*')
        .eq('artist_id', profile.id)
        .eq('day_of_week', new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' }))
        .single();

      if (availabilityError || !availability) {
        throw new Error("Selected time slot is not available");
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          recipient_id: profile.id,
          sender_id: null,
          service_id: formData.service,
          date_requested: formData.date,
          time_requested: formData.time,
          note: formData.note,
          metadata: {
            client_name: formData.name,
            client_phone: formData.phone
          }
        })
        .select()
        .single();

      if (error) throw error;
      
      setBookingDetails(data);
      setShowConfirmation(true);
    } catch (err) {
      handleBookingError(err);
      setError(err instanceof Error ? err : new Error("Failed to submit booking"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            Book with {profile.full_name}
          </DialogTitle>
        </DialogHeader>

        <BookingStateWrapper 
          error={error}
          loading={isSubmitting}
          loadingComponent={<div className="p-8 text-center">Processing your booking...</div>}
        >
          {showConfirmation ? (
            <BookingConfirmation
              profile={profile}
              bookingDetails={bookingDetails}
              onClose={() => onOpenChange(false)}
            />
          ) : (
            <BookingForm
              profile={profile}
              services={services}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </BookingStateWrapper>
      </DialogContent>
    </Dialog>
  );
};
