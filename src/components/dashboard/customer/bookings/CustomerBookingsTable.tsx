import { format, parseISO } from "date-fns";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

interface CustomerBookingsTableProps {
  bookings: Booking[];
  loading: boolean;
}

const CustomerBookingsTable = ({ bookings, loading }: CustomerBookingsTableProps) => {
  const { t } = useTranslation();
  
  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM dd, yyyy");
    } catch (error) {
      return dateStr;
    }
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t({ english: 'Pending', vietnamese: 'Đang Chờ' });
      case 'accepted':
        return t({ english: 'Confirmed', vietnamese: 'Đã Xác Nhận' });
      case 'declined':
        return t({ english: 'Declined', vietnamese: 'Đã Từ Chối' });
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
          english: "You haven't made any booking requests yet",
          vietnamese: "Bạn chưa tạo yêu cầu đặt lịch nào"
        })}
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t({
              english: "Artist",
              vietnamese: "Nghệ Sĩ"
            })}</TableHead>
            <TableHead>{t({
              english: "Service",
              vietnamese: "Dịch Vụ"
            })}</TableHead>
            <TableHead>{t({
              english: "Date",
              vietnamese: "Ngày"
            })}</TableHead>
            <TableHead>{t({
              english: "Time",
              vietnamese: "Giờ"
            })}</TableHead>
            <TableHead>{t({
              english: "Status",
              vietnamese: "Trạng Thái"
            })}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-gray-50">
              <TableCell>{booking.artist_name || "Artist"}</TableCell>
              <TableCell>{booking.service_name || t({
                english: "Not specified",
                vietnamese: "Không xác định"
              })}</TableCell>
              <TableCell>{formatDate(booking.date_requested)}</TableCell>
              <TableCell>{booking.time_requested}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                  {getStatusLabel(booking.status)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerBookingsTable;
