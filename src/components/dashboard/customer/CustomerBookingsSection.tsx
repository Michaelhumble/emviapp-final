
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import BookingFilters from "../bookings/BookingFilters";
import { ServiceTypeFilter, BookingFilters as BookingFiltersType, BookingStatus, DateFilter, ClientType } from "@/hooks/useBookingFilters";
import { useFilteredBookings } from "@/hooks/useFilteredBookings";
import { useTranslation } from "@/hooks/useTranslation";

const CustomerBookingsSection = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeFilter[]>([]);
  const [filters, setFilters] = useState<BookingFiltersType>({
    status: 'all' as BookingStatus,
    dateFilter: 'all' as DateFilter,
    dateRange: { from: undefined, to: undefined },
    clientType: 'all' as ClientType,
    serviceType: 'all',
    search: '',
    serviceTypes: []
  });
  
  // Apply filters to bookings
  const filteredBookings = useFilteredBookings(bookings, filters);
  
  const fetchBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get bookings where the user is the sender
      const { data, error } = await supabase
        .from('bookings')
        .select(`*`)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Transform data to include artist and service details
        const bookingsWithDetails = await Promise.all(
          data.map(async (booking) => {
            // Get artist name
            const { data: artistData, error: artistError } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booking.recipient_id)
              .single();
            
            if (artistError) {
              console.error("Error fetching artist details:", artistError);
            }
            
            // Get service details if possible
            let serviceName = "";
            if (booking.service_id) {
              const { data: serviceData, error: serviceError } = await supabase
                .from('services')
                .select('title')
                .eq('id', booking.service_id)
                .single();
                
              if (!serviceError && serviceData) {
                serviceName = serviceData.title;
              }
            }
            
            return {
              ...booking,
              artist_name: artistData?.full_name || "Unknown Artist",
              service_name: serviceName,
              customer_name: "You" // For consistency with artist panel
            } as Booking;
          })
        );
        
        setBookings(bookingsWithDetails);
        
        // Extract unique service types for filtering
        const uniqueServices = Array.from(
          new Map(
            bookingsWithDetails
              .filter(b => b.service_id && b.service_name)
              .map(b => [b.service_id, { id: b.service_id || '', label: b.service_name || '' }])
          ).values()
        );
        
        setServiceTypes(uniqueServices);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(t({
        english: "Failed to load bookings",
        vietnamese: "Không thể tải lịch hẹn"
      }));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBookings();
  }, [user]);
  
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
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>{t({
          english: "My Bookings",
          vietnamese: "Lịch Hẹn Của Tôi"
        })}</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Booking Filters */}
        <div className="mb-4">
          <BookingFilters 
            serviceTypes={serviceTypes}
            onFilterChange={setFilters}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t({
              english: "You haven't made any booking requests yet",
              vietnamese: "Bạn chưa tạo yêu cầu đặt lịch nào"
            })}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {t({
              english: "No bookings match your current filters",
              vietnamese: "Không có lịch hẹn nào phù hợp với bộ lọc hiện tại"
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium text-gray-600">{t({
                    english: "Artist",
                    vietnamese: "Nghệ Sĩ"
                  })}</th>
                  <th className="pb-2 font-medium text-gray-600">{t({
                    english: "Service",
                    vietnamese: "Dịch Vụ"
                  })}</th>
                  <th className="pb-2 font-medium text-gray-600">{t({
                    english: "Date",
                    vietnamese: "Ngày"
                  })}</th>
                  <th className="pb-2 font-medium text-gray-600">{t({
                    english: "Time",
                    vietnamese: "Giờ"
                  })}</th>
                  <th className="pb-2 font-medium text-gray-600">{t({
                    english: "Status",
                    vietnamese: "Trạng Thái"
                  })}</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{booking.artist_name}</td>
                    <td className="py-3">{booking.service_name || t({
                      english: "Not specified",
                      vietnamese: "Không xác định"
                    })}</td>
                    <td className="py-3">{formatDate(booking.date_requested)}</td>
                    <td className="py-3">{booking.time_requested}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Notes from bookings */}
        {filteredBookings.some(b => b.note) && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">{t({
              english: "Your Notes",
              vietnamese: "Ghi Chú Của Bạn"
            })}</h3>
            <div className="space-y-3">
              {filteredBookings
                .filter(b => b.note)
                .slice(0, 3)
                .map(b => (
                  <div key={`note-${b.id}`} className="p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">
                      {b.artist_name} - {formatDate(b.date_requested)}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">{b.note}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsSection;
