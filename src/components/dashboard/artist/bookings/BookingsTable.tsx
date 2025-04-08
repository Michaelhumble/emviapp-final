
import React from "react";
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t({ english: "Customer", vietnamese: "Khách Hàng" })}</TableHead>
            <TableHead>{t({ english: "Service", vietnamese: "Dịch Vụ" })}</TableHead>
            <TableHead>{t({ english: "Date", vietnamese: "Ngày" })}</TableHead>
            <TableHead>{t({ english: "Time", vietnamese: "Giờ" })}</TableHead>
            <TableHead>{t({ english: "Status", vietnamese: "Trạng Thái" })}</TableHead>
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
                {booking.status === 'pending' && (
                  <div className="flex gap-2">
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
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
