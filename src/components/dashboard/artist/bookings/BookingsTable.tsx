
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Booking } from "../types/ArtistDashboardTypes";
import { format, parseISO } from "date-fns";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import BookingReminderStatus from "../../bookings/BookingReminderStatus";
import ManualReminderButton from "../../bookings/ManualReminderButton";
import ReminderSettingsModal from "../../bookings/ReminderSettingsModal";
import { Settings } from "lucide-react";

interface BookingsTableProps {
  bookings: Booking[];
  loading: boolean;
  handleAccept: (bookingId: string) => Promise<void>;
  handleDecline: (bookingId: string) => Promise<void>;
}

const BookingsTable = ({ 
  bookings, 
  loading, 
  handleAccept, 
  handleDecline 
}: BookingsTableProps) => {
  const { t } = useTranslation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM dd, yyyy");
    } catch (error) {
      return dateStr;
    }
  };

  // Get translated status labels
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return t({ english: "Pending", vietnamese: "Đang Chờ" });
      case "accepted":
        return t({ english: "Accepted", vietnamese: "Đã Chấp Nhận" });
      case "declined":
        return t({ english: "Declined", vietnamese: "Đã Từ Chối" });
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {t({
          english: "No bookings match your filters",
          vietnamese: "Không tìm thấy lịch hẹn nào phù hợp với bộ lọc"
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          {t({
            english: "Reminder Settings",
            vietnamese: "Cài đặt nhắc nhở"
          })}
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t({ english: "Customer", vietnamese: "Khách Hàng" })}</TableHead>
              <TableHead>{t({ english: "Service", vietnamese: "Dịch Vụ" })}</TableHead>
              <TableHead>{t({ english: "Date", vietnamese: "Ngày" })}</TableHead>
              <TableHead>{t({ english: "Time", vietnamese: "Giờ" })}</TableHead>
              <TableHead>{t({ english: "Status", vietnamese: "Trạng Thái" })}</TableHead>
              <TableHead>{t({ english: "Reminder", vietnamese: "Nhắc nhở" })}</TableHead>
              <TableHead>{t({ english: "Actions", vietnamese: "Hành Động" })}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-gray-50">
                <TableCell>{booking.customer_name}</TableCell>
                <TableCell>{booking.service_name || t({ english: "Not specified", vietnamese: "Không xác định" })}</TableCell>
                <TableCell>{formatDate(booking.date_requested)}</TableCell>
                <TableCell>{booking.time_requested}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    booking.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusLabel(booking.status)}
                  </span>
                </TableCell>
                <TableCell>
                  <BookingReminderStatus 
                    reminderSent={booking.reminder_sent || false}
                    reminderSentAt={booking.created_at}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                          onClick={() => handleAccept(booking.id)}
                        >
                          {t({ english: "Accept", vietnamese: "Chấp Nhận" })}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleDecline(booking.id)}
                        >
                          {t({ english: "Decline", vietnamese: "Từ Chối" })}
                        </Button>
                      </>
                    )}
                    
                    {booking.status === 'accepted' && !booking.reminder_sent && (
                      <ManualReminderButton booking={booking} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ReminderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default BookingsTable;
