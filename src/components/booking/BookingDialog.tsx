
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { UserProfile } from "@/types/profile";
import { Service } from "@/pages/u/artist-profile/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import BookingForm from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";

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

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          recipient_id: profile.id,
          sender_id: null, // Since we're not requiring login
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
    } catch (error: any) {
      toast.error(error.message);
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
      </DialogContent>
    </Dialog>
  );
};
