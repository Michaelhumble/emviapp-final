
import { BookingCounts } from "@/components/dashboard/artist/hooks/useArtistBookings";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface BookingCountsDisplayProps {
  counts: BookingCounts;
}

const BookingCountsDisplay = ({ counts }: BookingCountsDisplayProps) => {
  const { isVietnamese } = useTranslation();
  
  // Translations
  const pendingText = isVietnamese ? "Đang chờ" : "Pending";
  const acceptedText = isVietnamese ? "Đã chấp nhận" : "Accepted";
  const completedText = isVietnamese ? "Đã hoàn thành" : "Completed";
  
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-amber-500 mr-1" />
        <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">
          {counts.pending} {pendingText}
        </Badge>
      </div>
      
      <div className="flex items-center">
        <CalendarCheck className="h-4 w-4 text-blue-500 mr-1" />
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
          {counts.accepted} {acceptedText}
        </Badge>
      </div>
      
      <div className="flex items-center">
        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
          {counts.completed} {completedText}
        </Badge>
      </div>
    </div>
  );
};

export default BookingCountsDisplay;
