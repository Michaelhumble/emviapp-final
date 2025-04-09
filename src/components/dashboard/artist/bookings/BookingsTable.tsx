
import { Booking } from "@/components/dashboard/artist/hooks/useArtistBookings";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { format } from "date-fns";
import { CheckCircle, Clock, X, XCircle } from "lucide-react";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [declineReason, setDeclineReason] = useState("");
  
  // Confirm decline booking
  const confirmDecline = async () => {
    if (selectedBookingId) {
      await handleDecline(selectedBookingId);
      setDeclineDialogOpen(false);
      setSelectedBookingId(null);
      setDeclineReason("");
    }
  };
  
  // Open decline dialog
  const openDeclineDialog = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setDeclineDialogOpen(true);
  };
  
  // Get status badge class
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "declined":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "declined":
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };
  
  // Format date from string
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Not specified";
    
    try {
      return format(new Date(dateStr), "MMM d, yyyy");
    } catch (error) {
      return dateStr;
    }
  };
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
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
                        onClick={() => openDeclineDialog(booking.id)} 
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
      
      {/* Decline Dialog */}
      <Dialog open={declineDialogOpen} onOpenChange={setDeclineDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t({ english: "Decline Booking", vietnamese: "Từ chối lịch hẹn" })}
            </DialogTitle>
            <DialogDescription>
              {t({
                english: "Are you sure you want to decline this booking? The client will be notified.",
                vietnamese: "Bạn có chắc chắn muốn từ chối lịch hẹn này? Khách hàng sẽ được thông báo."
              })}
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder={t({
              english: "Reason for declining (optional)",
              vietnamese: "Lý do từ chối (không bắt buộc)"
            })}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            className="min-h-[100px]"
          />
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeclineDialogOpen(false)}
            >
              {t({ english: "Cancel", vietnamese: "Hủy" })}
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDecline}
            >
              {t({ english: "Decline Booking", vietnamese: "Từ chối lịch hẹn" })}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsTable;
