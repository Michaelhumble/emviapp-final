
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BookingModal from "./BookingModal";

interface ArtistBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookingData: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  booking: any;
  isEditing: boolean;
}

const ArtistBookingDialog = ({
  isOpen,
  onClose,
  booking,
  isEditing
}: ArtistBookingDialogProps) => {
  return (
    <BookingModal
      open={isOpen}
      onClose={onClose}
      existingBooking={isEditing ? booking : undefined}
    />
  );
};

export default ArtistBookingDialog;
