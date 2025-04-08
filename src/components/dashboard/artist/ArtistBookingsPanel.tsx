
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Booking, BookingCounts } from "./types/ArtistDashboardTypes";
import { CheckCircle2, XCircle, Clock, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const ArtistBookingsPanel = () => {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<BookingCounts>({ pending: 0, upcoming: 0 });
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [isVietamese, setIsVietnamese] = useState(userProfile?.preferred_language === "Vietnamese");

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      if (!user?.id) return;
      
      // Fetch bookings where artist is the recipient
      const { data: bookingsData, error } = await supabase
        .from("bookings")
        .select("*, sender:sender_id(full_name)")
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Prepare the bookings with customer names
      const formattedBookings = bookingsData.map(booking => ({
        ...booking,
        customer_name: booking.sender?.full_name || "Unknown Customer",
      }));
      
      setBookings(formattedBookings);
      
      // Calculate counts
      const pendingCount = formattedBookings.filter(b => b.status === "pending").length;
      const upcomingCount = formattedBookings.filter(b => b.status === "accepted").length;
      
      setCounts({
        pending: pendingCount,
        upcoming: upcomingCount
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'accepted' | 'declined') => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId);
      
      if (error) throw error;
      
      // Update local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
      
      // Update counts
      if (status === 'accepted') {
        setCounts(prev => ({ 
          pending: prev.pending - 1, 
          upcoming: prev.upcoming + 1 
        }));
      } else {
        setCounts(prev => ({ 
          pending: prev.pending - 1, 
          upcoming: prev.upcoming 
        }));
      }
      
      // Show success message
      toast.success(
        status === 'accepted' 
          ? (isVietamese ? "Đã chấp nhận lịch hẹn" : "Booking accepted") 
          : (isVietamese ? "Đã từ chối lịch hẹn" : "Booking declined")
      );
    } catch (error) {
      console.error(`Error ${status} booking:`, error);
      toast.error("Failed to update booking status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Clock className="w-3 h-3 mr-1" />
          {isVietamese ? "Đang chờ" : "Pending"}
        </Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {isVietamese ? "Đã chấp nhận" : "Accepted"}
        </Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          {isVietamese ? "Đã từ chối" : "Declined"}
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateStr; // If parsing fails, return original string
    }
  };

  if (loading) {
    return (
      <Card className="w-full shadow-sm bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle>{isVietamese ? "Lịch Hẹn Của Tôi" : "My Bookings"}</CardTitle>
          <CardDescription>
            {isVietamese ? "Đang tải..." : "Loading your bookings..."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm bg-white/70 backdrop-blur-sm border border-purple-100 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{isVietamese ? "Lịch Hẹn Của Tôi" : "My Bookings"}</span>
          <div className="flex space-x-3">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {isVietamese ? "Đang chờ" : "Pending"}: {counts.pending}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {isVietamese ? "Xác nhận" : "Upcoming"}: {counts.upcoming}
            </Badge>
          </div>
        </CardTitle>
        <CardDescription>
          {isVietamese 
            ? "Xem và quản lý tất cả các yêu cầu đặt lịch từ khách hàng" 
            : "View and manage all booking requests from customers"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {isVietamese 
              ? "Bạn chưa có yêu cầu đặt lịch nào" 
              : "You don't have any booking requests yet"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isVietamese ? "Khách hàng" : "Customer"}</TableHead>
                  <TableHead>{isVietamese ? "Dịch vụ" : "Service"}</TableHead>
                  <TableHead>{isVietamese ? "Ngày" : "Date"}</TableHead>
                  <TableHead>{isVietamese ? "Thời gian" : "Time"}</TableHead>
                  <TableHead>{isVietamese ? "Trạng thái" : "Status"}</TableHead>
                  <TableHead>{isVietamese ? "Ghi chú" : "Note"}</TableHead>
                  <TableHead>{isVietamese ? "Tác vụ" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-purple-50/40">
                    <TableCell className="font-medium">{booking.customer_name}</TableCell>
                    <TableCell>{booking.service_name || "Not specified"}</TableCell>
                    <TableCell>{formatDate(booking.date_requested)}</TableCell>
                    <TableCell>{booking.time_requested || "Not specified"}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      {booking.note ? (
                        <div className="relative">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="p-0 h-auto" 
                            onClick={() => setExpandedNote(expandedNote === booking.id ? null : booking.id)}
                          >
                            <MessageSquare className="w-4 h-4 text-gray-500" />
                          </Button>
                          
                          {expandedNote === booking.id && (
                            <div className="absolute z-50 bg-white rounded-md shadow-lg p-3 w-64 mt-1 border border-gray-200">
                              <Textarea 
                                readOnly 
                                value={booking.note} 
                                className="w-full text-sm resize-none"
                              />
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-2 w-full text-xs"
                                onClick={() => setExpandedNote(null)}
                              >
                                {isVietamese ? "Đóng" : "Close"}
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {booking.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                            onClick={() => updateBookingStatus(booking.id, 'accepted')}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {isVietamese ? "Chấp Nhận" : "Accept"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                            onClick={() => updateBookingStatus(booking.id, 'declined')}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            {isVietamese ? "Từ Chối" : "Decline"}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistBookingsPanel;
