
import React from 'react';
import { format } from 'date-fns';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, Clock, CreditCard, Info } from 'lucide-react';
import { UserProfile } from '@/types/profile';
import { Service } from '@/pages/u/artist-profile/types';

interface BookingConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  profile: UserProfile;
  selectedService: Service | null;
  date: Date | undefined;
  time: string;
  note: string;
  isSubmitting: boolean;
}

const BookingConfirmationModal = ({
  open,
  onOpenChange,
  onConfirm,
  profile,
  selectedService,
  date,
  time,
  note,
  isSubmitting
}: BookingConfirmationModalProps) => {
  const isVietnamese = profile?.preferred_language === 'vi';
  
  const translations = {
    title: isVietnamese ? "Xác nhận lịch hẹn" : "Confirm Booking",
    description: isVietnamese 
      ? "Bạn có chắc muốn đặt lịch này?" 
      : "Please review your booking details before confirming.",
    artistLabel: isVietnamese ? "Nghệ sĩ:" : "Artist:",
    serviceLabel: isVietnamese ? "Dịch vụ:" : "Service:",
    dateLabel: isVietnamese ? "Ngày:" : "Date:",
    timeLabel: isVietnamese ? "Thời gian:" : "Time:",
    priceLabel: isVietnamese ? "Giá:" : "Price:",
    noteLabel: isVietnamese ? "Ghi chú:" : "Note:",
    policyTitle: isVietnamese ? "Chính sách hủy:" : "Cancellation Policy:",
    policyText: isVietnamese 
      ? "Vui lòng hủy ít nhất 24 giờ trước lịch hẹn để tránh phí phạt." 
      : "Please cancel at least 24 hours before your appointment to avoid a cancellation fee.",
    confirmButton: isVietnamese ? "Xác nhận đặt lịch" : "Confirm Booking",
    cancelButton: isVietnamese ? "Hủy" : "Cancel",
    submittingText: isVietnamese ? "Đang xử lý..." : "Processing..."
  };
  
  const formattedDate = date ? format(date, 'MMMM d, yyyy') : '';
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-serif">
            {translations.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {translations.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-3 bg-gray-50/80 p-4 rounded-lg">
            <div className="flex items-start">
              <span className="font-medium w-24">{translations.artistLabel}</span>
              <span>{profile.full_name}</span>
            </div>
            
            {selectedService && (
              <>
                <div className="flex items-start">
                  <span className="font-medium w-24">{translations.serviceLabel}</span>
                  <span>{selectedService.title}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="font-medium w-24">{translations.priceLabel}</span>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
                    <span>${selectedService.price}</span>
                  </div>
                </div>
              </>
            )}
            
            <div className="flex items-start">
              <span className="font-medium w-24">{translations.dateLabel}</span>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                <span>{formattedDate}</span>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="font-medium w-24">{translations.timeLabel}</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <span>{time}</span>
              </div>
            </div>
            
            {note && (
              <div className="flex items-start">
                <span className="font-medium w-24">{translations.noteLabel}</span>
                <span className="text-gray-700">{note}</span>
              </div>
            )}
          </div>
          
          <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100">
            <div className="flex items-start">
              <Info className="h-4 w-4 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-amber-800">{translations.policyTitle}</p>
                <p className="text-xs text-amber-700 mt-1">{translations.policyText}</p>
              </div>
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel className="border-gray-200 hover:bg-gray-100 text-gray-700">
            {translations.cancelButton}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                {translations.submittingText}
              </div>
            ) : translations.confirmButton}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingConfirmationModal;
