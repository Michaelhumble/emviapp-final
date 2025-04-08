
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Booking, BookingCounts } from "./types/ArtistDashboardTypes";
import { format, parseISO } from "date-fns";
import BookingFilters from "../bookings/BookingFilters";
import { ServiceTypeFilter, BookingFilters as BookingFiltersType, BookingStatus, DateFilter, ClientType } from "@/hooks/useBookingFilters";
import { useFilteredBookings } from "@/hooks/useFilteredBookings";

const ArtistBookingsPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [counts, setCounts] = useState<BookingCounts>({ pending: 0, upcoming: 0 });
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
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
    try {
      setLoading(true);
      
      if (!user) return;
      
      // Get bookings where the artist is the recipient
      const { data, error } = await supabase
        .from('bookings')
        .select(`*`)
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        // Transform data to include customer names
        const bookingsWithUserDetails = await Promise.all(
          data.map(async (booking) => {
            // Get customer name
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booking.sender_id)
              .single();
            
            // Check for errors but don't throw
            if (userError) {
              console.error("Error fetching customer details:", userError);
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
              customer_name: userData?.full_name || "Unknown",
              service_name: serviceName
            } as Booking;
          })
        );
        
        setBookings(bookingsWithUserDetails);
        
        // Calculate counts
        const pendingCount = bookingsWithUserDetails.filter(b => b.status === 'pending').length;
        const upcomingCount = bookingsWithUserDetails.filter(b => 
          b.status === 'accepted' && 
          new Date(b.date_requested) >= new Date()
        ).length;
        
        setCounts({
          pending: pendingCount,
          upcoming: upcomingCount
        });
        
        // Extract unique service types for filtering
        const uniqueServices = Array.from(
          new Map(
            bookingsWithUserDetails
              .filter(b => b.service_id && b.service_name)
              .map(b => [b.service_id, { id: b.service_id || '', label: b.service_name || '' }])
          ).values()
        );
        
        setServiceTypes(uniqueServices);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBookings();
  }, [user]);
  
  const handleAccept = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'accepted' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast.success("Booking accepted");
      
      // Update the local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'accepted' as const } 
            : booking
        )
      );
      
      // Update counts
      setCounts(prev => ({
        pending: Math.max(0, prev.pending - 1),
        upcoming: prev.upcoming + 1
      }));
    } catch (error) {
      console.error("Error accepting booking:", error);
      toast.error("Failed to accept booking");
    }
  };
  
  const handleDecline = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'declined' })
        .eq('id', bookingId);
      
      if (error) throw error;
      
      toast.success("Booking declined");
      
      // Update the local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'declined' as const } 
            : booking
        )
      );
      
      // Update counts
      setCounts(prev => ({
        pending: Math.max(0, prev.pending - 1),
        upcoming: prev.upcoming
      }));
    } catch (error) {
      console.error("Error declining booking:", error);
      toast.error("Failed to decline booking");
    }
  };
  
  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM dd, yyyy");
    } catch (error) {
      return dateStr;
    }
  };
  
  // Define UI text based on Vietnamese preference
  const isVietnamese = userProfile?.preferred_language === 'vi';
  
  const translations = {
    title: isVietnamese ? "Lịch Hẹn Của Tôi" : "My Bookings",
    pending: isVietnamese ? "Đang Chờ" : "Pending",
    upcoming: isVietnamese ? "Sắp Tới" : "Upcoming",
    accept: isVietnamese ? "Chấp Nhận" : "Accept",
    decline: isVietnamese ? "Từ Chối" : "Decline",
    noBookings: isVietnamese ? "Chưa có lịch hẹn nào" : "No bookings yet",
    noFilteredBookings: isVietnamese ? "Không tìm thấy lịch hẹn nào phù hợp với bộ lọc" : "No bookings match your filters",
    customer: isVietnamese ? "Khách Hàng" : "Customer",
    service: isVietnamese ? "Dịch Vụ" : "Service",
    date: isVietnamese ? "Ngày" : "Date",
    time: isVietnamese ? "Giờ" : "Time",
    status: isVietnamese ? "Trạng Thái" : "Status",
    note: isVietnamese ? "Ghi Chú" : "Note",
    actions: isVietnamese ? "Hành Động" : "Actions",
    filters: isVietnamese ? "Bộ Lọc" : "Filters"
  };
  
  const statusLabels = {
    pending: isVietnamese ? "Đang Chờ" : "Pending",
    accepted: isVietnamese ? "Đã Chấp Nhận" : "Accepted",
    declined: isVietnamese ? "Đã Từ Chối" : "Declined"
  };
  
  return (
    <Card className="overflow-hidden bg-white/85 backdrop-blur-sm shadow-md border-0 mb-8">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-lg font-serif font-semibold">{translations.title}</h2>
          
          <div className="flex gap-4 mt-2 md:mt-0">
            <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200 text-amber-800 text-sm">
              {translations.pending}: {counts.pending}
            </div>
            <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-emerald-800 text-sm">
              {translations.upcoming}: {counts.upcoming}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
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
            {translations.noBookings}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {translations.noFilteredBookings}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium text-gray-600">{translations.customer}</th>
                  <th className="pb-2 font-medium text-gray-600">{translations.service}</th>
                  <th className="pb-2 font-medium text-gray-600">{translations.date}</th>
                  <th className="pb-2 font-medium text-gray-600">{translations.time}</th>
                  <th className="pb-2 font-medium text-gray-600">{translations.status}</th>
                  <th className="pb-2 font-medium text-gray-600">{translations.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{booking.customer_name}</td>
                    <td className="py-3">{booking.service_name || "Not specified"}</td>
                    <td className="py-3">{formatDate(booking.date_requested)}</td>
                    <td className="py-3">{booking.time_requested}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                        booking.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {statusLabels[booking.status]}
                      </span>
                    </td>
                    <td className="py-3">
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            onClick={() => handleAccept(booking.id)}
                          >
                            {translations.accept}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => handleDecline(booking.id)}
                          >
                            {translations.decline}
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Note section */}
        {filteredBookings.some(b => b.note) && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">{translations.note}</h3>
            <div className="space-y-3">
              {filteredBookings
                .filter(b => b.note)
                .slice(0, 3)
                .map(b => (
                  <div key={`note-${b.id}`} className="p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">{b.customer_name} - {formatDate(b.date_requested)}</div>
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

export default ArtistBookingsPanel;
