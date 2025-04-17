
import React from "react";
import { 
  Table, TableBody, TableCaption 
} from "@/components/ui/table";
import { Booking } from "@/components/dashboard/artist/hooks/useArtistBookings";
import BookingTableHeader from "./BookingTableHeader";
import BookingTableRow from "./BookingTableRow";
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
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-500">{t({ english: "Loading bookings...", vietnamese: "Đang tải lịch hẹn..." })}</p>
      </div>
    );
  }
  
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-gray-50">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {t({ english: "No bookings found", vietnamese: "Không tìm thấy lịch hẹn nào" })}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {t({
            english: "When clients book your services, they will appear here.",
            vietnamese: "Khi khách hàng đặt lịch dịch vụ của bạn, họ sẽ xuất hiện ở đây."
          })}
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t({ english: "Client", vietnamese: "Khách hàng" })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t({ english: "Service", vietnamese: "Dịch vụ" })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t({ english: "Date", vietnamese: "Ngày" })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t({ english: "Time", vietnamese: "Thời gian" })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t({ english: "Status", vietnamese: "Trạng thái" })}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t({ english: "Actions", vietnamese: "Hành động" })}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={booking.client_avatar || ""} />
                      <AvatarFallback>{getInitials(booking.client_name || "")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.client_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.service_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(booking.date_requested)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{booking.time_requested || "Flexible"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1 capitalize">{booking.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {booking.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleAccept(booking.id)} 
                        size="sm" 
                        variant="default"
                      >
                        {t({ english: "Accept", vietnamese: "Chấp nhận" })}
                      </Button>
                      <Button 
                        onClick={() => handleDecline(booking.id)} 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        {t({ english: "Decline", vietnamese: "Từ chối" })}
                      </Button>
                    </div>
                  )}
                  
                  {booking.status === 'accepted' && (
                    <Button size="sm" variant="outline">
                      {t({ english: "View Details", vietnamese: "Xem chi tiết" })}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingsTable;
